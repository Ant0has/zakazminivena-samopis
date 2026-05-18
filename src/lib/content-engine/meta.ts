// Генератор уникальных meta-тегов (Title, Description, OG) для всех типов страниц.
// Учитывает: цену по km, время, расстояние, ключевые СЯ-фразы, длину для SERP.

import type { Metadata } from "next";
import {
  BRAND,
  clampDescription,
  clampTitle,
  durationPhrase,
  priceFromKm,
  priceRoundTripFromKm,
} from "./format";

const SITE = "https://zakazminivena.ru";

interface MetaCommon {
  canonical: string;
  ogType?: "website" | "article";
}

function buildMeta(
  title: string,
  description: string,
  common: MetaCommon
): Metadata {
  const t = clampTitle(title, 70);
  const d = clampDescription(description, 165);
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
    },
    twitter: { card: "summary_large_image", title: t, description: d },
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
  hours: string;
  city: string;
}): Metadata {
  const { iata, airportName, airportNameFull, destinationName, km, hours, city } = opts;
  const price = priceFromKm(km);
  const duration = durationPhrase(hours);
  const iataUpper = iata.toUpperCase();

  // Title: цена + маршрут + бренд. До 70 символов после clamp.
  const title = `Минивэн ${airportName} (${iataUpper}) → ${destinationName} от ${price} ₽ | ${BRAND}`;

  // Description: км, время, УТП «фикс цена», 60 мин ожидание.
  const description =
    `Заказать минивэн с водителем из аэропорта ${airportNameFull} в ${destinationName}. ` +
    `${km} км, ${duration}. Фикс цена ${price} ₽ за машину 6–8 мест. ` +
    `Встреча с табличкой, ожидание при задержке рейса бесплатно. Заказ онлайн.`;

  return buildMeta(title, description, {
    canonical: `${SITE}/airport/${iata}/${slugify(destinationName, city)}`,
  });
}

// ============= Хаб аэропорта =============
// СЯ: "минивэн аэропорт шереметьево", "минивэн в аэропорт домодедово"

export function metaAirportHub(opts: {
  iata: string;
  airportName: string;
  airportNameFull: string;
  city: string;
  minPrice: number;
}): Metadata {
  const { iata, airportName, airportNameFull, city, minPrice } = opts;
  const iataUpper = iata.toUpperCase();

  const title = `Минивэн в аэропорт ${airportName} (${iataUpper}) — от ${formatRub(minPrice)} ₽ | ${BRAND}`;
  const description =
    `Заказать минивэн с водителем в ${airportNameFull}, ${city}. ` +
    `Трансфер 6–8 пассажиров от ${formatRub(minPrice)} ₽ за машину. ` +
    `Встреча с табличкой, бесплатное ожидание при задержке рейса, дет.кресла, безналичный расчёт.`;

  return buildMeta(title, description, { canonical: `${SITE}/airport/${iata}` });
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
  const acc = opts.regionNameAcc ?? regionName;

  const title = `Минивэн в ${acc} из ${hubCity} — от ${formatRub(minPrice)} ₽ | ${BRAND}`;
  const description =
    `Туристические поездки на минивэне в ${acc}: ${topPointsShort}. ` +
    `Однодневные и многодневные туры из ${hubCity}. До 8 мест с багажом. ` +
    `Водитель знает регион. Цена от ${formatRub(minPrice)} ₽ за машину.`;

  return buildMeta(title, description, { canonical: `${SITE}/destination/${regionSlug}` });
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
  hours: string;
}): Metadata {
  const { regionSlug, routeSlug, regionName, fromCity, toCity, km, hours } = opts;
  const price = priceFromKm(km);
  const priceRT = priceRoundTripFromKm(km);
  const duration = durationPhrase(hours);

  const title = `Минивэн ${fromCity} → ${toCity}: ${km} км, от ${price} ₽ | ${BRAND}`;
  const description =
    `Заказать минивэн с водителем по маршруту ${fromCity} → ${toCity} (${regionName}). ` +
    `${km} км, ${duration}. Цена от ${price} ₽ за машину 6–8 мест. ` +
    `Возможны остановки для фото, водитель знает регион.`;

  return buildMeta(title, description, {
    canonical: `${SITE}/destination/${regionSlug}/${routeSlug}`,
    ogType: "article",
  });
}

// ============= Сценарная страница =============

export function metaService(opts: {
  slug: string;
  scenarioGenitive: string;
  primaryCity?: string;
  minPrice?: number;
}): Metadata {
  const { slug, scenarioGenitive, primaryCity = "Москве", minPrice = 4000 } = opts;

  const title = `Минивэн на ${scenarioGenitive} — заказать с водителем в ${primaryCity} | ${BRAND}`;
  const description =
    `Минивэн на ${scenarioGenitive} в ${primaryCity}: 6–8 пассажирских мест, ` +
    `безналичный расчёт, документы для отчётности, дет.кресла бесплатно. ` +
    `Фикс цена от ${formatRub(minPrice)} ₽ за машину. Заказ онлайн.`;

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

  const title = `${fullName} с водителем — от ${formatRub(minPrice)} ₽ | ${BRAND}`;
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
    `Фикс цена за машину 6–8 мест. Документы для юрлиц.`;

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
