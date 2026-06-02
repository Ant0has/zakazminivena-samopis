import { NextRequest, NextResponse } from "next/server";

// Email-канал заявок. По решению Антона на MVP — только email.
// Telegram-бот и интеграция с CRM подключаются позже.
//
// Конфигурация через .env на сервере:
//   ORDER_EMAIL_TO       — куда слать (например, orders@zakazminivena.ru)
//   ORDER_SMTP_HOST      — SMTP-хост (smtp.yandex.ru / smtp.gmail.com)
//   ORDER_SMTP_PORT      — 465 / 587
//   ORDER_SMTP_USER      — логин SMTP
//   ORDER_SMTP_PASSWORD  — пароль приложения
//   ORDER_SMTP_FROM      — адрес From (часто = ORDER_SMTP_USER)
//
// До настройки SMTP — лид пишется в server logs (видно в `pm2 logs zakazminivena`).

interface OrderPayload {
  from?: string;
  to?: string;
  date?: string;
  time?: string;
  passengers?: string | number;
  name?: string;
  phone?: string;
  pageUrl?: string;
  utm?: Record<string, string>;
  comment?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(p: OrderPayload): string {
  const rows: [string, string | undefined][] = [
    ["Маршрут", `${p.from ?? "-"} → ${p.to ?? "-"}`],
    ["Дата", p.date],
    ["Время", p.time],
    ["Пассажиров", String(p.passengers ?? "-")],
    ["Имя", p.name],
    ["Телефон", p.phone],
    ["Страница", p.pageUrl],
    ["UTM source", p.utm?.utm_source],
    ["UTM campaign", p.utm?.utm_campaign],
    ["UTM term", p.utm?.utm_term],
    ["Комментарий", p.comment],
  ];

  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${rows
  .filter(([, v]) => v && v !== "-")
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 12px;border:1px solid #ddd;background:#f7f7f7;font-weight:600">${escapeHtml(
        k
      )}</td><td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(v ?? "")}</td></tr>`
  )
  .join("\n")}
</table>`;
}

async function sendEmail(payload: OrderPayload): Promise<{ ok: boolean; error?: string }> {
  const host = process.env.ORDER_SMTP_HOST;
  const port = Number(process.env.ORDER_SMTP_PORT ?? "587");
  const user = process.env.ORDER_SMTP_USER;
  const pass = process.env.ORDER_SMTP_PASSWORD;
  const to = process.env.ORDER_EMAIL_TO;
  const from = process.env.ORDER_SMTP_FROM ?? user;

  if (!host || !user || !pass || !to || !from) {
    // SMTP не настроен — пишем в лог, возвращаем ok (лид не потерян, видно в pm2 logs)
    console.log("[ORDER]", JSON.stringify(payload));
    return { ok: true };
  }

  try {
    const nodemailer = await import("nodemailer").catch(() => null);
    if (!nodemailer) {
      console.log("[ORDER nodemailer not installed]", JSON.stringify(payload));
      return { ok: true };
    }
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject: `Заявка с сайта: ${payload.from ?? "?"} → ${payload.to ?? "?"}`,
      html: buildEmailHtml(payload),
    });
    return { ok: true };
  } catch (err) {
    console.error("[ORDER email error]", err);
    return { ok: false, error: (err as Error).message };
  }
}

// Создание лида в CRM (раздел «Лиды», проект ZAKAZMINIVENA).
// По образцу city2city: не блокируем ответ клиенту.
//   CRM_LEADS_API     — endpoint (https://crm-taxi.ru/api/public/leads)
//   CRM_LEADS_API_KEY — x-api-key проекта ZAKAZMINIVENA
async function sendCrmLead(p: OrderPayload): Promise<void> {
  const api = process.env.CRM_LEADS_API;
  const key = process.env.CRM_LEADS_API_KEY;
  if (!api || !key) return; // CRM не сконфигурирован — пропускаем

  const trip = [p.date, p.time].filter(Boolean).join(" ").trim();
  const comment = [p.comment, p.passengers ? `Пассажиров: ${p.passengers}` : ""]
    .filter(Boolean)
    .join(" · ");

  const payload = {
    source: "website",
    fromAddress: p.from || "Не указано",
    toAddress: p.to || "",
    tripDatetime: trip || undefined,
    clientPhone: p.phone,
    clientName: p.name,
    comment: comment || undefined,
    landingPage: p.pageUrl,
    utmSource: p.utm?.utm_source,
    utmMedium: p.utm?.utm_medium,
    utmCampaign: p.utm?.utm_campaign,
    utmContent: p.utm?.utm_content,
    utmTerm: p.utm?.utm_term,
    yclid: p.utm?.yclid,
  };

  try {
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error("[ORDER crm error]", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("[ORDER crm error]", (err as Error).message);
  }
}

export async function POST(req: NextRequest) {
  let body: OrderPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  // Простая валидация
  if (!body.name || !body.phone) {
    return NextResponse.json({ ok: false, error: "name and phone required" }, { status: 400 });
  }

  // Honeypot против ботов (доп. поле — должно быть пустым)
  if ((body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Лид в CRM (основной канал) + email (резерв) — параллельно.
  const [result] = await Promise.all([sendEmail(body), sendCrmLead(body)]);
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
