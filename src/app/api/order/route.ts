import { NextRequest, NextResponse } from "next/server";
import { cleanAttribution, safePage, type Attribution } from '@/lib/lead-attribution';

// CRM — основной канал. Успех только после приёма CRM или настроенным SMTP.
//
// Конфигурация через .env на сервере:
//   ORDER_EMAIL_TO       — куда слать (например, orders@zakazminivena.ru)
//   ORDER_SMTP_HOST      — SMTP-хост (smtp.yandex.ru / smtp.gmail.com)
//   ORDER_SMTP_PORT      — 465 / 587
//   ORDER_SMTP_USER      — логин SMTP
//   ORDER_SMTP_PASSWORD  — пароль приложения
//   ORDER_SMTP_FROM      — адрес From (часто = ORDER_SMTP_USER)
//

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
  consent?: boolean;
  tariff?: string;
  website?: string;
  attribution?: Attribution | null;
  requestId?: string;
  metricaClientId?: string;
}

function attributionNote(p: OrderPayload): string {
  const a=p.attribution;
  return [p.requestId ? `Номер обращения: ${p.requestId}` : '',p.metricaClientId ? `Метрика ClientID: ${p.metricaClientId}` : '',
    a ? `Первый вход: ${a.first.landing}; источник: ${a.first.utm.utm_source || 'прямой / неизвестен'}; канал: ${a.first.utm.utm_medium || 'не указан'}; кампания: ${a.first.utm.utm_campaign || 'не указана'}` : '',
    a ? `Последний значимый вход: ${a.last.landing}; ${new Date(a.last.at).toISOString()}` : '',
    p.pageUrl ? `Страница заявки: ${p.pageUrl}` : ''].filter(Boolean).join('\n');
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
    ["Источник обращения", attributionNote(p)],
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
    return { ok: false };
  }

  try {
    const nodemailer = await import("nodemailer").catch(() => null);
    if (!nodemailer) {
      return { ok: false };
    }
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 12000,
    });

    await transporter.sendMail({
      from,
      to,
      subject: `Заявка с сайта: ${payload.from ?? "?"} → ${payload.to ?? "?"}`,
      html: buildEmailHtml(payload),
    });
    return { ok: true };
  } catch (err) {
    console.error("[ORDER email error]", err instanceof Error ? err.name : "unknown");
    return { ok: false };
  }
}

// Создание лида в CRM (раздел «Лиды», проект ZAKAZMINIVENA).
// Дожидаемся ответа CRM; конфигурация и ключ остаются на сервере.
//   CRM_LEADS_API     — endpoint (https://crm-taxi.ru/api/public/leads)
//   CRM_LEADS_API_KEY — x-api-key проекта ZAKAZMINIVENA
async function sendCrmLead(p: OrderPayload): Promise<{ ok: boolean }> {
  const api = process.env.CRM_LEADS_API;
  const key = process.env.CRM_LEADS_API_KEY;
  if (!api || !key) return { ok: false };

  const trip = [p.date, p.time].filter(Boolean).join(" ").trim();
  const comment = [p.comment, p.passengers ? `Пассажиров: ${p.passengers}` : "", attributionNote(p)]
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
    referrer: p.attribution?.last.referrer || undefined,
  };

  try {
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });
    const result=await res.json().catch(()=>null);
    const accepted=res.ok && result?.success === true && Number.isSafeInteger(result?.leadId) && result.leadId > 0;
    if (!accepted) console.error("[ORDER crm response not confirmed]", res.status);
    return { ok: accepted };
  } catch (err) {
    console.error("[ORDER crm error]", err instanceof Error ? err.name : "unknown");
    return { ok: false };
  }
}

export async function POST(req: NextRequest) {
  let body: OrderPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Некорректная заявка" }, { status: 400 });
  }
  for (const field of ["from", "to", "date", "time", "name", "phone", "pageUrl", "comment"] as const) {
    if (body[field] !== undefined && (typeof body[field] !== "string" || body[field]!.length > (field === "comment" ? 6000 : field === "pageUrl" ? 3000 : 300))) {
      return NextResponse.json({ ok: false, error: "Некорректные поля заявки" }, { status: 400 });
    }
  }
  if (!body.phone || !/^\d{10,15}$/.test(body.phone.replace(/\D/g, ""))) {
    return NextResponse.json({ ok: false, error: "Укажите телефон с кодом страны" }, { status: 400 });
  }
  if (body.tariff && (body.tariff !== "comfort" || body.consent !== true || !body.from || !body.to || !/^\d{4}-\d{2}-\d{2}$/.test(body.date ?? "") || !Number.isInteger(body.passengers) || Number(body.passengers) < 1 || Number(body.passengers) > 7)) {
    return NextResponse.json({ ok: false, error: "Проверьте маршрут, дату, пассажиров и согласие" }, { status: 400 });
  }
  if (body.utm && (typeof body.utm !== "object" || Array.isArray(body.utm) || Object.values(body.utm).some(v => typeof v !== "string" || v.length > 500))) {
    return NextResponse.json({ ok: false, error: "Некорректные параметры источника" }, { status: 400 });
  }
  if ((body.requestId !== undefined && (typeof body.requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(body.requestId))) || (body.metricaClientId !== undefined && (typeof body.metricaClientId !== 'string' || !/^\d{1,30}$/.test(body.metricaClientId)))) {
    return NextResponse.json({ok:false,error:'Некорректный идентификатор обращения'},{status:400});
  }
  if (body.attribution) {
    const attribution=cleanAttribution(body.attribution);
    if(!attribution) return NextResponse.json({ok:false,error:'Некорректные данные источника'},{status:400});
    body.attribution=attribution;
    body.utm=attribution.last.utm;
  }
  body.pageUrl=safePage(body.pageUrl);

  // Honeypot против ботов (доп. поле — должно быть пустым)
  if ((body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Лид в CRM (основной канал) + email (резерв) — параллельно.
  const results = await Promise.all([sendEmail(body), sendCrmLead(body)]);
  const ok = results.some(result => result.ok);
  return NextResponse.json(ok ? { ok: true } : { ok: false, error: "Не удалось передать заявку. Попробуйте позже или позвоните нам." }, { status: ok ? 200 : 503 });
}
