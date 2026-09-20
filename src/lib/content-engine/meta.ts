// Генератор уникальных meta-тегов (Title, Description, OG) для всех типов страниц.
// Учитывает: цену по km, время, расстояние, ключевые СЯ-фразы, длину для SERP.

import type { Metadata } from "next";
import { pricingYear } from '@/lib/route-pricing';
import { destinationPhrase, originPhrase } from './place-forms';
import {
  BRAND,
  clampDescription,
  clampTitle,
  durationPhrase,
  priceFromKm,
} from "./format";

const SITE = "https://zakazminivena.ru";

interface MetaCommon {
  canonical: string;
  ogType?: "website" | "article";
  /** Абсолютный URL изображения для превью в соцсетях (Telegram/VK/WhatsApp/Twitter). */
  image?: string;
}

function buildMeta(
  title: string,
  description: string,
  common: MetaCommon
): Metadata {
  const t = clampTitle(title, 70);
  const d = clampDescription(description, 155);
  const imgUrl = common.image
    ? common.image.startsWith("http")
      ? common.image
      : `${SITE}${common.image}`
    : `${SITE}/logo.webp`;

  return {
    title: t,
    description: d,
    alternates: { canonical: common.canonical },
    openGraph: {
      title: t,
      description: d,
      url: common.canonical,
      siteName: BRAND,
      locale: "ru_RU",
      type: common.ogType ?? "website",
      images: [{ url: imgUrl, width: 1200, height: 630, alt: t }],
    },
    twitter: {
      card: "summary_large_image",
      title: t,
      description: d,
      images: [imgUrl],
    },
  };
}

// ============= Маршрут аэропорта =============
// СЯ: "минивэн svo москва", "трансфер шереметьево минивэн", "заказать минивэн в аэропорт"
//
// Лучшие паттерны конкурентов:
//   "Минивэн трансфер - онлайн бронирование фиксированная цена" (uniontransfer)
//   "Трансфер минивэн микроавтобус - Заказать в Москве Недорого" (minivenvaeroport)
//
// Наша уникализация — цена «от X ₽» + км + время в title.

export function metaAirportRoute(opts: {
  iata: string;
  airportName: string;
  airportNameFull: string;
  destinationName: string;
  km: number;
  pricingDistanceM?: number;
  hours: string;
  city: string;
}): Metadata {
  const { iata, airportName, airportNameFull, destinationName, km, hours, city } = opts;
  const price = priceFromKm(km, opts.pricingDistanceM);
  const duration = durationPhrase(hours);
  const iataUpper = iata.toUpperCase();

  // Title: цена + маршрут + бренд. До 70 символов после clamp.
  const title = `Минивэн ${airportName} (${iataUpper}) → ${destinationName} от ${price} ₽ | ${BRAND}`;

  // Description: км, время, УТП «фикс цена», 60 мин ожидание. Уложиться в 155.
  const description =
    `Минивэн из ${airportNameFull} в ${destinationName}. ${km} км, ${duration}. ` +
    `Фикс цена ${price} ₽. Встреча с табличкой, ожидание при задержке рейса.`;

  return buildMeta(title, description, {
    canonical: `${SITE}/airport/${iata}/${slugify(destinationName, city)}`,
    image: `/images/heroes/${iata}.webp`,
  });
}

// ============= Хаб аэропорта =============
// СЯ: "минивэн аэропорт шереметьево", "минивэн в аэропорт домодедово"

/** IATA, для которых «минивэн {город}» / «минивэны {город}» — топ-частотный
 *  Wordstat-ключ (≥120 запросов/мес). Поднимаем эту фразу в начало title.
 *  Источник: seo_research/minivan_freq.csv (Yandex Cloud Search API, 2026-05). */
const IATA_HIGH_FREQ_TITLES: Record<string, (city: string, iataUpper: string, minPrice: number) => string> = {
  // «минивэн казань» — 2 201/мес (топ-1 минивэн-фразой по всему сайту)
  kzn: (city, iataUpper, p) => `Минивэн ${city} (${iataUpper}) — заказать в аэропорт от ${formatRub(p)} ₽ | ${BRAND}`,
  // «минивэны симферополь» — 326/мес (форма с «ы»)
  sip: (city, iataUpper, p) => `Минивэны ${city} (${iataUpper}) — заказать в аэропорт от ${formatRub(p)} ₽ | ${BRAND}`,
  // «минивэны иркутск» — 323/мес (форма с «ы»)
  ikt: (city, iataUpper, p) => `Минивэны ${city} (${iataUpper}) — заказать в аэропорту от ${formatRub(p)} ₽ | ${BRAND}`,
};

export function metaAirportHub(opts: {
  iata: string;
  airportName: string;
  airportNameFull: string;
  city: string;
  minPrice: number;
}): Metadata {
  const { iata, airportName, airportNameFull, city, minPrice } = opts;
  const iataUpper = iata.toUpperCase();

  // Для IATA с топ-частотной «минивэн {город}» используем особый title.
  const customTitle = IATA_HIGH_FREQ_TITLES[iata];
  const title = customTitle
    ? customTitle(city, iataUpper, minPrice)
    : `Минивэн в аэропорт ${airportName} (${iataUpper}) — от ${formatRub(minPrice)} ₽ | ${BRAND}`;

  const description = `Минивэн: ${airportNameFull}, ${city}. От ${formatRub(minPrice)} ₽ за автомобиль, до 7 пассажиров. Цены ${pricingYear} года. Адреса, багаж и условия встречи согласуем до заказа.`;

  return buildMeta(title, description, {
    canonical: `${SITE}/airport/${iata}`,
    image: `/images/heroes/${iata}.webp`,
  });
}

// ============= Хаб региона =============
// СЯ: "минивэн в карелию", "трансфер в кмв", "минивэн на байкал"

export function metaDestinationHub(opts: {
  regionSlug: string;
  regionName: string;
  /** Винительный падеж: «в Карелию», «в Алтай», «на Байкал». Если не передан — fallback на regionName. */
  regionNameAcc?: string;
  hubCity: string;
  topPointsShort: string;
  minPrice: number;
}): Metadata {
  const { regionSlug, regionName, hubCity, topPointsShort, minPrice } = opts;
  const direction = destinationPhrase(regionSlug, regionName);
  const title = `Минивэн ${direction} ${originPhrase(hubCity)} — от ${formatRub(minPrice)} ₽`;
  const description = `Минивэн ${direction}: ${topPointsShort}. От ${formatRub(minPrice)} ₽ за автомобиль, до 7 пассажиров. Цены ${pricingYear}; маршрут и багаж согласуем.`;

  return buildMeta(title, description, {
    canonical: `${SITE}/destination/${regionSlug}`,
    image: `/images/heroes/${regionSlug}.webp`,
  });
}

// ============= Маршрут региона =============
// СЯ: "минивэн спб сортавала", "трансфер минводы кисловодск"

export function metaDestinationRoute(opts: {
  regionSlug: string;
  routeSlug: string;
  regionName: string;
  fromCity: string;
  toCity: string;
  km: number;
  pricingDistanceM?: number;
  hours: string;
}): Metadata {
  const { regionSlug, routeSlug, regionName, fromCity, toCity, km, hours } = opts;
  const price = priceFromKm(km, opts.pricingDistanceM);
  const duration = durationPhrase(hours);

  const title = `Минивэн ${fromCity} → ${toCity}: ${km} км, от ${price} ₽ | ${BRAND}`;
  const description =
    `Минивэн ${fromCity} → ${toCity} (${regionName}). ${km} км, ${duration}. ` +
    `От ${price} ₽ за машину до 7 мест. Остановки для фото, водитель знает регион.`;

  return buildMeta(title, description, {
    canonical: `${SITE}/destination/${regionSlug}/${routeSlug}`,
    ogType: "article",
    image: `/images/heroes/${regionSlug}.webp`,
  });
}

// ============= Сценарная страница =============

export function metaService(opts: {
  slug: string;
  scenarioGenitive: string;
  primaryCity?: string;
  minPrice?: number;
}): Metadata {
  const { slug, scenarioGenitive, primaryCity } = opts;
  const location = primaryCity ? ` в ${primaryCity}` : '';
  const title = `Минивэн: ${scenarioGenitive} — с водителем${location}`;
  const description = `Минивэн с водителем: ${scenarioGenitive}${location}. До 7 пассажиров. Укажите маршрут, дату и багаж: наличие машины и итоговую цену подтвердим до заказа.`;

  return buildMeta(title, description, { canonical: `${SITE}/service/${slug}` });
}

// ============= Карточка модели парка =============

export function metaFleetModel(opts: {
  slug: string;
  fullName: string;
  brand: string;
  model: string;
  tier: string;
  seats: number;
  luggageL: number;
  minPrice: number;
  primaryCities?: string;
}): Metadata {
  const {
    slug,
    fullName,
    tier,
    seats,
    luggageL,
    minPrice,
    primaryCities = "Москве и СПб",
  } = opts;

  const title = `Минивэн ${fullName} с водителем — от ${formatRub(minPrice)} ₽`;
  const description =
    `Заказать ${fullName} с водителем в ${primaryCities}. ${tier} минивэн на ${seats} ` +
    `пассажиров, ${luggageL} л багажа. Аэропорт, межгород, почасовая аренда от ` +
    `${formatRub(minPrice)} ₽. Безналичный расчёт.`;

  return buildMeta(title, description, { canonical: `${SITE}/fleet/${slug}` });
}

// ============= Городской хаб =============

export function metaCityHub(opts: {
  citySlug: string;
  cityName: string;
  airportsCount?: number;
}): Metadata {
  const { citySlug, cityName, airportsCount } = opts;

  const title = `Минивэн с водителем в ${cityName} — заказать онлайн | ${BRAND}`;
  const apPart = airportsCount && airportsCount > 0
    ? `Трансфер в ${airportsCount === 1 ? "1 аэропорт" : `${airportsCount} аэропорта`} города, `
    : "";

  const description =
    `Заказать минивэн с водителем в ${cityName}: ${apPart}межгородские поездки, ` +
    `по городу, почасовая аренда, свадьбы, корпоратив. ` +
    `Фикс цена за машину до 7 мест. Документы для юрлиц.`;

  return buildMeta(title, description, { canonical: `${SITE}/cities/${citySlug}` });
}

// ============= Утилиты =============
function formatRub(p: number): string {
  return p.toLocaleString("ru-RU");
}

function slugify(_dest: string, _city: string): string {
  // Не используется — canonical передаётся явно. Заглушка для совместимости.
  return "";
}
