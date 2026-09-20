export const TRACKING_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'yclid'] as const;
const STORAGE_KEY = 'zm:attribution:v1';
const TTL = 90 * 24 * 60 * 60 * 1000;
export type Touch = { at: number; landing: string; referrer: string; utm: Record<string, string> };
export type Attribution = { version: 1; first: Touch; last: Touch };
type TrackingWindow = Window & { __zmAttributionRuntime?: { href: string; memory: Attribution | null } };

export function safePage(value: unknown): string {
  if (typeof value !== 'string') return '';
  try {
    const u = new URL(value);
    if (!['https:', 'http:'].includes(u.protocol) || u.username || u.password || /^\/(work|api|docs)(\/|$)/.test(u.pathname)) return '';
    return (u.origin + u.pathname).slice(0, 1500);
  } catch { return ''; }
}
export function cleanTouch(value: unknown): Touch | null {
  if (!value || typeof value !== 'object') return null;
  const t = value as Partial<Touch>;
  const landing = safePage(t.landing);
  if (!landing || !Number.isFinite(t.at) || !t.utm || typeof t.utm !== 'object' || Array.isArray(t.utm)) return null;
  const utm: Record<string,string> = {};
  for (const k of TRACKING_KEYS) if (typeof t.utm[k] === 'string' && t.utm[k].trim()) utm[k] = t.utm[k].replace(/[\r\n\u0000]/g, '').trim().slice(0,500);
  return { at: Number(t.at), landing, referrer: safePage(t.referrer), utm };
}
export function cleanAttribution(value: unknown, now = Date.now()): Attribution | null {
  if (!value || typeof value !== 'object') return null;
  const a = value as Partial<Attribution>, first = cleanTouch(a.first), last = cleanTouch(a.last);
  if (a.version !== 1 || !first || !last || first.at > now + 60_000 || last.at > now + 60_000 || now - first.at > TTL || now - last.at > TTL) return null;
  return { version: 1, first, last };
}
export function advanceAttribution(previous: unknown, href: string, referrer: string, isDocumentEntry: boolean, now = Date.now()): Attribution | null {
  const landing = safePage(href); if (!landing) return null;
  const url = new URL(href), utm: Record<string,string> = {};
  for (const k of TRACKING_KEYS) { const v = url.searchParams.get(k); if (v?.trim()) utm[k] = v.replace(/[\r\n\u0000]/g,'').trim().slice(0,500); }
  let source = safePage(referrer);
  if (source && new URL(source).hostname.replace(/^www\./,'') === url.hostname.replace(/^www\./,'')) source = '';
  if (isDocumentEntry && source && !Object.keys(utm).length) {
    const host = new URL(source).hostname.toLowerCase();
    if (/^(www\.)?yandex\.(ru|com|by|kz|uz)$/.test(host) || host === 'ya.ru') { utm.utm_source='yandex'; utm.utm_medium='organic'; }
    else if (/^(www\.)?google\.(com|ru|co\.uk)$/.test(host)) { utm.utm_source='google'; utm.utm_medium='organic'; }
    else if (/^(www\.)?bing\.com$/.test(host)) { utm.utm_source='bing'; utm.utm_medium='organic'; }
    else { utm.utm_source=host; utm.utm_medium='referral'; }
  }
  const touch: Touch = { at:now, landing, referrer:source, utm };
  const existing = cleanAttribution(previous, now);
  if (!existing) return { version:1, first:touch, last:touch };
  // Replace the whole campaign, never mix a new source with old campaign/yclid values.
  return Object.keys(utm).length ? { ...existing, last:touch } : existing;
}
export function captureAttribution(target?: Window): Attribution | null {
  if (typeof window === 'undefined' && !target) return null;
  const w = (target || window) as TrackingWindow;
  try {
    if (!safePage(w.location.href)) return null;
    let current = cleanAttribution(w.__zmAttributionRuntime?.memory);
    for (const storage of ['localStorage','sessionStorage'] as const) {
      try { const raw=w[storage].getItem(STORAGE_KEY); const parsed=raw ? cleanAttribution(JSON.parse(raw)) : null; if(parsed && (!current || parsed.last.at>=current.last.at)) current=parsed; } catch {}
    }
    // Shared on the parent Window: Next and the separately bundled iframe must
    // not count the same document referrer as a second organic entry after SPA navigation.
    const lastHref=w.__zmAttributionRuntime?.href;
    if (lastHref !== w.location.href) current=advanceAttribution(current,w.location.href,lastHref ? '' : w.document.referrer,!lastHref);
    w.__zmAttributionRuntime={href:w.location.href,memory:current};
    if (current) for (const storage of ['localStorage','sessionStorage'] as const) { try { w[storage].setItem(STORAGE_KEY,JSON.stringify(current)); } catch {} }
    return current;
  } catch { return null; }
}
export async function leadTracking(target?: Window) {
  if (typeof window === 'undefined' && !target) return {};
  const w = target || window, attribution=captureAttribution(w);
  const requestId = w.crypto.randomUUID();
  const clientId = await new Promise<string>(resolve => {
    const timer=setTimeout(()=>resolve(''),500);
    try {
      const ym=(w as Window & {ym?: (...args: unknown[])=>void}).ym;
      if (typeof ym !== 'function') { clearTimeout(timer); resolve(''); return; }
      ym(79701640,'getClientID',(id: unknown)=>{clearTimeout(timer);resolve(typeof id==='string'&&/^\d{1,30}$/.test(id)?id:'');});
    } catch { clearTimeout(timer); resolve(''); }
  });
  return { pageUrl:safePage(w.location.href), utm:attribution?.last.utm || {}, attribution, requestId, metricaClientId:clientId || undefined };
}
