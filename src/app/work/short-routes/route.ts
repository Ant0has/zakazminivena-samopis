import { readFile } from "node:fs/promises";
import path from "node:path";
import { authorize, saveChanges, snapshot, WorkspaceError } from "@/lib/short-route-workspace";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control": "private, no-store, max-age=0",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};
const respond = (data: unknown, status = 200) => Response.json(data, { status, headers });

// Route-handler HTML intentionally bypasses the public layout, analytics and chat widgets.
export async function GET(request: Request) {
  const asset = new URL(request.url).searchParams.get("asset");
  const file = asset === "app" ? "workspace.js" : asset === "style" ? "workspace.css" : asset ? null : "workspace.html";
  if (!file) return respond({ error: "Не найдено" }, 404);
  const content = await readFile(path.join(process.cwd(), "src/workspaces/short-routes", file), "utf8");
  const type = asset === "app" ? "application/javascript" : asset === "style" ? "text/css" : "text/html";
  return new Response(content, { headers: { ...headers, "Content-Type": `${type}; charset=utf-8` } });
}

export async function POST(request: Request) {
  try {
    const allowedOrigins = ["https://zakazminivena.ru", "https://www.zakazminivena.ru"];
    if (process.env.ZM_SHORT_ROUTES_TEST_ORIGIN) allowedOrigins.push(process.env.ZM_SHORT_ROUTES_TEST_ORIGIN);
    if (!allowedOrigins.includes(request.headers.get("origin") || "")) throw new WorkspaceError(403, "Недопустимый источник запроса.");
    if (!(request.headers.get("content-type") || "").startsWith("application/json")) throw new WorkspaceError(415, "Ожидается JSON.");
    await authorize(request.headers.get("authorization"));
    const reader = request.body?.getReader();
    if (!reader) throw new WorkspaceError(400, "Пустой запрос.");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 180_000) { await reader.cancel(); throw new WorkspaceError(413, "Запрос слишком большой."); }
      chunks.push(value);
    }
    let body;
    try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
    catch { throw new WorkspaceError(400, "Некорректный запрос."); }
    if (body?.action === "load") return respond(await snapshot());
    if (body?.action === "save") return respond({ state: await saveChanges(body.changes) });
    throw new WorkspaceError(400, "Неизвестное действие.");
  } catch (e) {
    if (e instanceof WorkspaceError) return respond({ error: e.message, conflicts: e.conflicts }, e.status);
    // Never log the request, access key or staff comments.
    console.error("Short-route workspace storage failure");
    return respond({ error: "Не удалось прочитать или сохранить таблицу. Данные на экране оставлены: повторите позже или обратитесь к Антону." }, 500);
  }
}
