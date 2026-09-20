import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const group = process.argv[2];
const noSave = process.argv.includes("--no-save");

if (!group || !["sources", "competitors"].includes(group)) {
  console.error("Usage: node scripts/watch-pages.mjs <sources|competitors> [--no-save]");
  process.exit(2);
}

const configPath = path.join(root, "config", `${group}.json`);
const config = JSON.parse(await readFile(configPath, "utf8"));
const statePath = path.join(root, "state", `${group}.json`);

async function readState() {
  try {
    return JSON.parse(await readFile(statePath, "utf8"));
  } catch {
    return {};
  }
}

function normalizeHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? normalizeHtml(match[1]).slice(0, 300) : "";
}

function relevantText(text, terms = []) {
  if (!terms.length) return text.slice(0, 200_000);
  const loweredTerms = terms.map((term) => term.toLowerCase());
  const fragments = text.split(/(?<=[.!?])\s+/);
  return fragments
    .filter((fragment) => loweredTerms.some((term) => fragment.toLowerCase().includes(term)))
    .join("\n")
    .slice(0, 100_000);
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function fetchPage(source) {
  const startedAt = Date.now();
  try {
    const response = await fetch(source.url, {
      headers: { "User-Agent": config.userAgent },
      redirect: "follow",
      signal: AbortSignal.timeout(config.timeoutMs ?? 15_000),
    });
    const html = (await response.text()).slice(0, 2_000_000);
    const text = normalizeHtml(html);
    const relevant = relevantText(text, source.terms);
    return {
      name: source.name,
      url: source.url,
      finalUrl: response.url,
      severity: source.severity ?? "P2",
      ok: response.ok,
      status: response.status,
      latencyMs: Date.now() - startedAt,
      title: extractTitle(html),
      bodyHash: hash(relevant),
      relevantExcerpt: relevant.slice(0, 1_000),
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      name: source.name,
      url: source.url,
      severity: source.severity ?? "P2",
      ok: false,
      status: null,
      latencyMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
      checkedAt: new Date().toISOString(),
    };
  }
}

const previous = await readState();
const results = [];

for (const source of config.sources) {
  if (source.enabled === false) {
    console.log(`SKIP\t${source.severity ?? "P2"}\t-\t${source.name}\t${source.disabledReason ?? "disabled"}`);
    continue;
  }
  const result = await fetchPage(source);
  const before = previous[source.url];
  result.change = !before
    ? "baseline"
    : before.bodyHash !== result.bodyHash || before.status !== result.status
      ? "changed"
      : "unchanged";
  results.push(result);

  const marker = result.ok ? (result.change === "changed" ? "CHANGE" : "OK") : "ERROR";
  console.log(`${marker}\t${result.severity}\t${result.status ?? "-"}\t${result.name}\t${result.latencyMs}ms`);
}

if (!noSave) {
  const now = new Date().toISOString();
  const snapshotDir = path.join(root, "snapshots", group);
  await mkdir(snapshotDir, { recursive: true });
  const snapshotName = `${now.replaceAll(":", "-")}.json`;
  await writeFile(path.join(snapshotDir, snapshotName), `${JSON.stringify({ group, checkedAt: now, results }, null, 2)}\n`);

  const nextState = Object.fromEntries(results.map((result) => [result.url, result]));
  await mkdir(path.dirname(statePath), { recursive: true });
  await writeFile(statePath, `${JSON.stringify(nextState, null, 2)}\n`);
}

if (results.some((result) => !result.ok && result.severity === "P1")) {
  process.exitCode = 1;
}
