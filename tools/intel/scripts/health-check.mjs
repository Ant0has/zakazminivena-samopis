import tls from "node:tls";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = JSON.parse(await readFile(path.join(root, "config", "health.json"), "utf8"));
const noSave = process.argv.includes("--no-save");

async function checkHttp(target) {
  const startedAt = Date.now();
  try {
    const response = await fetch(target.url, {
      redirect: "manual",
      headers: { "User-Agent": "ZM-Health/0.1 (+https://zakazminivena.ru/)" },
      signal: AbortSignal.timeout(15_000),
    });
    const body = (await response.text()).slice(0, 500_000);
    const location = response.headers.get("location");
    const errors = [];
    if (response.status !== target.expectedStatus) {
      errors.push(`status ${response.status}, expected ${target.expectedStatus}`);
    }
    if (target.contains && !body.toLowerCase().includes(target.contains.toLowerCase())) {
      errors.push(`control text not found: ${target.contains}`);
    }
    if (target.expectedLocation && location !== target.expectedLocation) {
      errors.push(`location ${location ?? "-"}, expected ${target.expectedLocation}`);
    }
    return {
      name: target.name,
      url: target.url,
      ok: errors.length === 0,
      status: response.status,
      location,
      latencyMs: Date.now() - startedAt,
      errors,
    };
  } catch (error) {
    return {
      name: target.name,
      url: target.url,
      ok: false,
      status: null,
      latencyMs: Date.now() - startedAt,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

function checkTls(host) {
  return new Promise((resolve) => {
    const socket = tls.connect({ host, port: 443, servername: host, timeout: 10_000 }, () => {
      const cert = socket.getPeerCertificate();
      const validTo = cert.valid_to ? new Date(cert.valid_to) : null;
      const daysRemaining = validTo ? Math.floor((validTo.getTime() - Date.now()) / 86_400_000) : null;
      socket.end();
      resolve({
        host,
        ok: daysRemaining !== null && daysRemaining >= config.tlsWarnDays,
        validTo: validTo?.toISOString() ?? null,
        daysRemaining,
      });
    });
    socket.on("timeout", () => socket.destroy(new Error("TLS timeout")));
    socket.on("error", (error) => resolve({ host, ok: false, error: error.message }));
  });
}

const http = [];
for (const target of config.targets) {
  if (target.enabled === false) {
    console.log(`SKIP\t-\t${target.name}\t${target.enableAfter ?? "disabled"}`);
    continue;
  }
  http.push(await checkHttp(target));
}
const certificate = await checkTls(config.tlsHost);
const checkedAt = new Date().toISOString();
const snapshot = { checkedAt, ok: http.every((item) => item.ok) && certificate.ok, http, certificate };

for (const result of http) {
  console.log(`${result.ok ? "OK" : "ALERT"}\t${result.status ?? "-"}\t${result.name}\t${result.latencyMs}ms${result.errors.length ? `\t${result.errors.join("; ")}` : ""}`);
}
console.log(`${certificate.ok ? "OK" : "ALERT"}\tTLS\t${certificate.host}\t${certificate.daysRemaining ?? "-"} days`);

if (!noSave) {
  const snapshotDir = path.join(root, "snapshots", "health");
  await mkdir(snapshotDir, { recursive: true });
  const name = `${checkedAt.replaceAll(":", "-")}.json`;
  await writeFile(path.join(snapshotDir, name), `${JSON.stringify(snapshot, null, 2)}\n`);
}

if (!snapshot.ok) process.exitCode = 1;
