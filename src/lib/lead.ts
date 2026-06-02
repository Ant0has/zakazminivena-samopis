// Единая отправка заявки с сайта на сервер (/api/order → email + CRM «Лиды»).
// Автоматически добавляет URL страницы и UTM/yclid из адресной строки.

export interface LeadInput {
  from?: string;
  to?: string;
  date?: string;
  time?: string;
  passengers?: string | number;
  name?: string;
  phone?: string;
  comment?: string;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid"];

function collectUtm(): Record<string, string> {
  const utm: Record<string, string> = {};
  if (typeof window === "undefined") return utm;
  const params = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) utm[k] = v;
  }
  return utm;
}

/** Отправляет заявку на /api/order (email + CRM). Возвращает true при успехе. */
export async function submitLead(input: LeadInput): Promise<boolean> {
  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        utm: collectUtm(),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
