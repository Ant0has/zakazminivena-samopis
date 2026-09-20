// Единая отправка заявки с сайта на сервер (/api/order → email + CRM «Лиды»).
// Сохраняет источник между переходами; успех требует подтверждения API.
import { leadTracking } from './lead-attribution';

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

const pending = new Map<string, Promise<boolean>>();

/** Отправляет заявку на /api/order (email + CRM). Возвращает true при успехе. */
export async function submitLead(input: LeadInput): Promise<boolean> {
  const signature=JSON.stringify(input);
  const existing=pending.get(signature); if(existing) return existing;
  const task=(async()=>{try {
    const tracking=await leadTracking();
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        ...tracking,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    const result=await res.json();
    if (res.ok && result.ok === true) {
      try { const ym=(window as Window & {ym?: (...args: unknown[])=>void}).ym; if(ym) ym(79701640,'reachGoal','site_lead_success'); } catch {}
      return true;
    }
    return false;
  } catch {
    return false;
  }})();
  pending.set(signature,task);
  try{return await task;}finally{pending.delete(signature);}
}
