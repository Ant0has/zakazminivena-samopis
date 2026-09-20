import registry from './route-registry.json';
import { calculateQuote, tariff } from '../../public/trip-constructor/pricing.mjs';

export { calculateQuote, tariff };
// The year follows the reviewed catalogue revision, not the visitor's clock.
export const pricingRevision = registry.revision;
export const pricingYear = Number(pricingRevision.slice(0, 4));
export function publishedRoutePricing(path: string, fallbackKm: number) {
  const row = registry.byPath[path as keyof typeof registry.byPath];
  return row ?? { km: calculateQuote(fallbackKm * 1000).distanceKm, rawDistanceM: null, pricingDistanceM: fallbackKm * 1000, distanceStatus: 'legacy-estimate-needs-road-check' };
}
export function priceForDistance(km: number, pricingDistanceM?: number): number {
  return calculateQuote(pricingDistanceM ?? km * 1000).price;
}
export function publicPriceNote() {
  return 'Цена «от» за весь минивэн «Комфорт» в одну сторону. Адреса, дату, платные участки, багаж и дополнительные условия подтверждаем до заказа. Обратная поездка рассчитывается отдельно.';
}
