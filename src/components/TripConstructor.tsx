"use client";

import { useEffect, useRef, useState } from 'react';
import { dadataOsrmService } from '@/lib/dadata-osrm';
import { calculateQuote } from '@/lib/route-pricing';
import { PricingNote } from '@/components/PricingNote';

export function TripConstructor({ routePath = '', defaultFrom = '', defaultTo = '', contextNote = '', scenario = '', passengers, emptyRoute = false }: { routePath?: string; defaultFrom?: string; defaultTo?: string; contextNote?: string; scenario?: 'family' | 'luggage' | 'ski' | ''; passengers?: 5 | 6 | 7; emptyRoute?: boolean }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1650);
  const query = new URLSearchParams({ embed: '1', route: routePath, from: defaultFrom, to: defaultTo });
  if (scenario) query.set('scenario', scenario);
  if (passengers) query.set('passengers', String(passengers));
  if (emptyRoute) query.set('empty', '1');
  useEffect(() => {
    let live = true;
    let busy = false;
    const receive = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || !event.data || typeof event.data !== 'object') return;
      const data = event.data;
      if (data.type === 'zm:lead-success') {
        const analytics = (window as unknown as { ym?: (...args: unknown[]) => void }).ym;
        if (typeof analytics === 'function') analytics(79701640, 'reachGoal', 'constructor_lead_success');
      }
      if (data.type === 'zm:height' && Number.isFinite(data.height)) setHeight(Math.max(900, Math.min(12000, Math.ceil(data.height))));
      if (data.type === 'zm:scroll' && Number.isFinite(data.offset) && data.offset >= 0 && data.offset < 12000) {
        window.scrollTo({ top: window.scrollY + (frame.current?.getBoundingClientRect().top ?? 0) + data.offset - 90, behavior: 'smooth' });
      }
      if (data.type !== 'zm:calculate' || busy || typeof data.id !== 'string' || typeof data.from !== 'string' || typeof data.to !== 'string' || !data.from.trim() || !data.to.trim() || data.from.length > 100 || data.to.length > 100) return;
      busy = true;
      const reply = (payload: object) => { if (live) frame.current?.contentWindow?.postMessage({ type: 'zm:quote', id: data.id, ...payload }, window.location.origin); };
      try {
        // Same DaData + OSRM adapter used by the existing ZM / city2city calculator.
        // Known published routes are resolved inside the constructor before this request.
        const [from, to] = await Promise.all([dadataOsrmService.getCoords(data.from), dadataOsrmService.getCoords(data.to)]);
        if (!from || !to) throw new Error('Уточните город, аэропорт или адрес.');
        const road = await dadataOsrmService.getDistance(from.lat, from.lon, to.lat, to.lon);
        if (!road || road.km <= 0) throw new Error('Не удалось рассчитать дорогу. Оставьте заявку для индивидуального расчёта.');
        reply({ quote: { ...calculateQuote(road.km * 1000), minutes: road.minutes } });
      } catch (error) { reply({ error: error instanceof Error ? error.message : 'Расчёт временно недоступен.' }); }
      finally { busy = false; }
    };
    window.addEventListener('message', receive);
    return () => { live = false; window.removeEventListener('message', receive); };
  }, []);
  return <section id="trip-constructor" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 py-8 sm:px-5" aria-label="Конструктор поездки — Комфорт">
    {contextNote && <p className="mb-4 px-3 text-sm leading-relaxed text-muted-foreground sm:px-5">{contextNote}</p>}
    <div className="mb-4 px-3 sm:px-5"><PricingNote /></div>
    <iframe ref={frame} title="Конструктор поездки на минивэне — тариф Комфорт" src={'/trip-constructor/constructor.html?' + query.toString()} loading="lazy" style={{ width: '100%', height, border: 0, borderRadius: 24, display: 'block', background: '#f4f4ef' }} />
    <noscript><p>Интерактивный подбор требует JavaScript. Для заказа используйте форму или телефон на странице.</p></noscript>
  </section>;
}
