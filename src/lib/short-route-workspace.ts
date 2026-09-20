import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, rmdir, writeFile } from "node:fs/promises";
import path from "node:path";
import registry from "./route-registry.json";

export const workspaceDir = () => process.env.ZM_SHORT_ROUTES_DATA_DIR || path.resolve(process.cwd(), "../.zm-short-route-prices");
export const shortRoutes = registry.records.filter(r => r.pricingDistanceM <= 60_000)
  .map(r => ({ id: r.id, from: r.from, to: r.to, sourceKm: r.pricingDistanceM / 1000,
    displayKm: r.km, autoPrice: r.price, distanceStatus: r.distanceStatus, pages: r.pages }))
  .sort((a, b) => `${a.from} ${a.to}`.localeCompare(`${b.from} ${b.to}`, "ru"));
const ids = new Set(shortRoutes.map(r => r.id));
export type Draft = { price: number | null; comment: string; version: number; updatedAt: string };
export type State = { schema: 1; revision: number; updatedAt: string | null; entries: Record<string, Draft> };
type Change = { id: string; price: number | null; comment: string; expectedVersion: number };
export class WorkspaceError extends Error {
  constructor(public status: number, message: string, public conflicts: string[] = []) { super(message); }
}
const blank = (): State => ({ schema: 1, revision: 0, updatedAt: null, entries: {} });
const errorCode = (e: unknown) => (e as NodeJS.ErrnoException).code;

export async function authorize(header: string | null) {
  const key = header?.match(/^Bearer ([A-Za-z0-9_-]{43})$/)?.[1];
  if (!key) throw new WorkspaceError(401, "Откройте полную ссылку доступа, которую передал Антон.");
  let hash: string;
  try { hash = JSON.parse(await readFile(path.join(workspaceDir(), "access.json"), "utf8")).keyHash; }
  catch { throw new WorkspaceError(503, "Рабочая таблица временно недоступна. Обратитесь к Антону."); }
  if (!/^[a-f0-9]{64}$/.test(hash)) throw new WorkspaceError(503, "Ошибка настройки доступа.");
  if (!timingSafeEqual(Buffer.from(hash, "hex"), createHash("sha256").update(key).digest()))
    throw new WorkspaceError(401, "Ссылка доступа неверна или была заменена. Запросите новую у Антона.");
}

export async function readState(): Promise<State> {
  try {
    const value = JSON.parse(await readFile(path.join(workspaceDir(), "drafts.json"), "utf8"));
    if (value.schema !== 1 || !Number.isSafeInteger(value.revision) || !value.entries || Array.isArray(value.entries))
      throw new Error("Invalid draft store");
    return value;
  } catch (e) { if (errorCode(e) === "ENOENT") return blank(); throw e; }
}

export function parseChanges(input: unknown): Change[] {
  if (!Array.isArray(input) || input.length < 1 || input.length > shortRoutes.length)
    throw new WorkspaceError(400, "Некорректный список изменений.");
  const seen = new Set<string>();
  return input.map(v => {
    if (!v || typeof v !== "object" || !ids.has(v.id) || seen.has(v.id))
      throw new WorkspaceError(400, "Неизвестное или повторяющееся направление.");
    seen.add(v.id);
    if (v.price !== null && (!Number.isSafeInteger(v.price) || v.price < 1 || v.price > 1_000_000))
      throw new WorkspaceError(400, "Введите целую цену от 1 до 1 000 000 ₽ или оставьте поле пустым.");
    if (typeof v.comment !== "string" || v.comment.length > 1000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v.comment))
      throw new WorkspaceError(400, "Комментарий: не более 1 000 символов без служебных знаков.");
    if (!Number.isSafeInteger(v.expectedVersion) || v.expectedVersion < 0)
      throw new WorkspaceError(400, "Неизвестная версия строки. Обновите таблицу.");
    return { id: v.id, price: v.price, comment: v.comment.trim(), expectedVersion: v.expectedVersion };
  });
}

export async function saveChanges(input: unknown): Promise<State> {
  const changes = parseChanges(input);
  const dir = workspaceDir();
  // A filesystem lock serializes writers even when more than one Node worker is running.
  const lock = path.join(dir, "write.lock");
  try { await mkdir(lock, { mode: 0o700 }); }
  catch (e) { if (errorCode(e) === "EEXIST") throw new WorkspaceError(423, "Идёт другое сохранение. Подождите несколько секунд и повторите."); throw e; }
  try {
    const previous = await readState();
    const conflicts = changes.filter(v => (previous.entries[v.id]?.version || 0) !== v.expectedVersion).map(v => v.id);
    if (conflicts.length) throw new WorkspaceError(409, "Эти строки уже изменены в другом окне. Ваши данные не перезаписаны. Скопируйте нужные значения и обновите таблицу.", conflicts);
    const updatedAt = new Date().toISOString();
    const next: State = { ...previous, revision: previous.revision + 1, updatedAt, entries: { ...previous.entries } };
    for (const v of changes) next.entries[v.id] = { price: v.price, comment: v.comment, version: v.expectedVersion + 1, updatedAt };
    const history = path.join(dir, "history");
    await mkdir(history, { recursive: true, mode: 0o700 });
    // Preserve the exact prior revision before atomically replacing the active draft.
    await writeFile(path.join(history, `${previous.revision}-${randomUUID()}.json`), JSON.stringify(previous, null, 2), { flag: "wx", mode: 0o600 });
    const temporary = path.join(dir, `drafts-${randomUUID()}.tmp`);
    await writeFile(temporary, JSON.stringify(next, null, 2), { flag: "wx", mode: 0o600 });
    await rename(temporary, path.join(dir, "drafts.json"));
    return next;
  } finally { await rmdir(lock); }
}

export async function snapshot() {
  return { routes: shortRoutes, registryRevision: registry.revision, state: await readState() };
}
