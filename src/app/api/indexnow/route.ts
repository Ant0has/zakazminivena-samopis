// API для отправки URL в IndexNow (Яндекс + Bing).
// Вызов:
//   POST /api/indexnow  { urls: ["https://zakazminivena.ru/airport/svo/moscow-center", ...] }
//
// Защита: можно дёрнуть только с правильным секретом в заголовке
//   x-indexnow-secret: <INDEXNOW_TRIGGER_SECRET из .env>
//
// Используется при деплое или после публикации нового маршрута.

import { NextResponse } from "next/server";

const KEY = "1b714a0570744310dc4ddbb57110eeed";
const HOST = "zakazminivena.ru";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINTS = [
  "https://yandex.com/indexnow",
  "https://api.indexnow.org/indexnow",
];

export async function POST(req: Request) {
  const secret = req.headers.get("x-indexnow-secret");
  const expected = process.env.INDEXNOW_TRIGGER_SECRET;
  if (expected && secret !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: { urls?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const urls = (body.urls ?? []).filter(
    (u) => typeof u === "string" && u.startsWith(`https://${HOST}/`),
  );
  if (urls.length === 0) {
    return NextResponse.json({ ok: false, error: "no valid urls" }, { status: 400 });
  }
  if (urls.length > 10000) {
    return NextResponse.json({ ok: false, error: "too many urls (max 10000)" }, { status: 400 });
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const results = await Promise.all(
    ENDPOINTS.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload),
        });
        return { endpoint, status: res.status, ok: res.ok };
      } catch (e) {
        return { endpoint, status: 0, ok: false, error: String(e) };
      }
    }),
  );

  return NextResponse.json({ ok: true, submitted: urls.length, results });
}
