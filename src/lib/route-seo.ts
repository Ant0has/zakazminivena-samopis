import type { Metadata } from 'next';
import { priceForDistance, publicPriceNote, pricingYear } from './route-pricing';
import { journeySocialImage } from './journey-illustrations';

export function routeMetadata({ from, to, km, pricingDistanceM, path }: { from: string; to: string; km: number; pricingDistanceM?: number; path: string }): Metadata {
  const price = priceForDistance(km, pricingDistanceM).toLocaleString('ru-RU');
  const baseTitle = `Минивэн ${from} — ${to} от ${price} ₽, ≈ ${km} км`;
  const title = baseTitle.length <= 65 ? `${baseTitle} — цены ${pricingYear}` : baseTitle;
  const description = `Минивэн ${from} — ${to}: от ${price} ₽ за автомобиль, около ${km} км. До 7 пассажиров. Цены ${pricingYear} года; багаж и итоговую стоимость подтвердим до заказа.`;
  const canonical = 'https://zakazminivena.ru' + path;
  const image = journeySocialImage(path);
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: 'website', siteName: 'ЗаказМинивэна.ru', locale: 'ru_RU', ...(image ? { images: [image] } : {}) }, twitter: { card: 'summary_large_image', title, description, ...(image ? { images: [image.url] } : {}) } };
}
export function routeOffer(price: number) {
  return { '@type': 'Offer', name: 'Минивэн «Комфорт» — цена от', price, priceCurrency: 'RUB', description: publicPriceNote(), priceSpecification: { '@type': 'PriceSpecification', minPrice: price, priceCurrency: 'RUB' } };
}
