// Single source for Next.js pages and the approved visual constructor.
// Matches city2city public-price.ts MINIVAN, verified on its live server 2026-09-17.
export const tariff = Object.freeze({ id: 'comfort', name: 'Комфорт', rate: 60, minimum: 3000, roundRub: 500, revision: 'zm-c2c-2026-09-17' });
export function calculateQuote(distanceM) {
  if (typeof distanceM !== 'number' || !Number.isFinite(distanceM) || distanceM <= 0) throw new Error('Нужно положительное дорожное расстояние');
  const km = distanceM / 1000;
  const distanceKm = Math.ceil(km / 10) * 10;
  const coefficient = km < 100 ? 1.5 : km < 150 ? 1.2 : km < 200 ? 1.1 : 1;
  const calculatedPrice = Math.ceil(Math.max(tariff.minimum, distanceKm * tariff.rate * coefficient) / tariff.roundRub) * tariff.roundRub;
  const discount = distanceKm > 300 ? 1000 : 0;
  return { distanceM, distanceKm, coefficient, calculatedPrice, discount, price: Math.max(tariff.minimum, calculatedPrice - discount), tariff: tariff.id, revision: tariff.revision };
}
export function formatFromPrice(price) { return `От ${price.toLocaleString('ru-RU')} ₽`; }
