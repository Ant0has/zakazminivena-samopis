// Генератор уникального контента для туристического маршрута /destination/{region}/{route}/.

import {
  durationPhrase,
  kmPhrase,
  priceFromKm,
  priceRoundTripFromKm,
} from "./format";
import { calcPrice, formatPrice } from "@/lib/routes-data";

export interface DestinationRouteContent {
  h1: string;
  heroSubtitle: string;
  intro: string;
  routeDescription: string;
  /** Совет/выноска для лонгрида */
  callout: string;
  faq: Array<{ q: string; a: string }>;
}

interface Input {
  regionName: string;
  fromCity: string;
  toCity: string;
  km: number;
  hours: string;
  uniqueIntro?: string;
  uniqueRouteDesc?: string;
  specifics?: string;
  seasonalNotes?: string;
}

export function generateDestinationRouteContent(opts: Input): DestinationRouteContent {
  const price = priceFromKm(opts.km);
  const priceRT = priceRoundTripFromKm(opts.km);
  const price2Day = formatPrice(calcPrice(opts.km) + 8000);
  const duration = durationPhrase(opts.hours);

  const h1 = `Минивэн ${opts.fromCity} → ${opts.toCity} — от ${price} ₽ за машину`;

  const heroSubtitle =
    `Туристическая поездка ${kmPhrase(opts.km)} за ${duration}. Минивэн до 8 пассажиров с багажом. ` +
    `Водитель знает регион, остановки для фото бесплатно, гибкий маршрут.`;

  const baseIntro =
    `Поездка ${opts.fromCity} → ${opts.toCity} на минивэне с водителем — для семьи, друзей ` +
    `или туристической группы. Заказ за фикс цену ${price} ₽ за всю машину 6–8 пассажиров, ` +
    `без сюрпризов по итогу поездки. Водитель знает дорогу в ${opts.regionName}, расскажет ` +
    `по пути о достопримечательностях и подскажет, где остановиться для фото.`;

  const intro = opts.uniqueIntro ? `${opts.uniqueIntro}\n\n${baseIntro}` : baseIntro;

  const baseRouteDesc =
    `Подача в любую точку ${opts.fromCity} в назначенное время. По дороге ${duration} ` +
    `делаем 1–2 санитарные остановки. Маршрут гибкий: можете попросить заехать в дополнительные ` +
    `точки — каждая стоит 500 ₽, без скрытых наценок. Поездка туда-обратно за день — ${priceRT} ₽ ` +
    `(скидка 20% на обратный путь). С ночёвкой водителя в ${opts.toCity} — от ${price2Day} ₽.`;

  const routeDescription = opts.uniqueRouteDesc
    ? `${opts.uniqueRouteDesc}\n\n${baseRouteDesc}`
    : baseRouteDesc;

  const callout =
    opts.seasonalNotes ||
    `Берите тёплую куртку и удобную обувь — даже летом в ${opts.regionName} погода может ` +
    `поменяться за час. Водитель остановится для нужных вам пауз — фото, обед, санитарная.`;

  const faq: Array<{ q: string; a: string }> = [
    {
      q: `Сколько стоит минивэн ${opts.fromCity} → ${opts.toCity}?`,
      a:
        `Фикс цена от ${price} ₽ за машину 6–8 мест. Туда-обратно за день — ${priceRT} ₽ ` +
        `(со скидкой 20% на обратный путь). С ночёвкой водителя — от ${price2Day} ₽ (плюс ` +
        `гостиница для водителя по факту).`,
    },
    {
      q: `Сколько по времени поездка ${opts.fromCity} → ${opts.toCity}?`,
      a:
        `${duration} в одну сторону, расстояние ${opts.km} км. Время с остановками ` +
        `считаем отдельно — на пути в ${opts.regionName} обычно делаем 1–2 санитарные паузы.`,
    },
    {
      q: "Можно ли менять маршрут в дороге?",
      a:
        `Да. Это и есть преимущество индивидуального минивэна перед Яндекс Go: меняйте ` +
        `точки, делайте остановки для фото, заезжайте в кафе — водитель ждёт без доплаты ` +
        `до 15 минут на каждой остановке.`,
    },
    {
      q: opts.specifics
        ? `Что особенного на маршруте ${opts.fromCity} → ${opts.toCity}?`
        : `Что взять с собой в поездку?`,
      a:
        opts.specifics ||
        `Удобную обувь, тёплую куртку (даже летом), документы, наличные на сувениры. ` +
        `Дет.кресла предоставляем бесплатно — указывайте тип в заявке.`,
    },
    {
      q: "Можно ли с детьми?",
      a:
        `Да. Дет.кресла любого типа (бустер / 9–18 / 18–36 кг) — бесплатно. ` +
        `Минивэн просторный, у детей есть место для игр или сна в дороге.`,
    },
    {
      q: "Кто будет за рулём?",
      a:
        `Опытный водитель со стажем 5+ лет, знающий регион ${opts.regionName}. ` +
        `Перед каждой сменой медосмотр, проверка по базам ГИБДД и судимости. ` +
        `Знание дороги — главное отличие от обычного такси.`,
    },
    {
      q: "Как оплатить?",
      a:
        `Картой онлайн при заказе, СБП по телефону, наличные водителю или банковский ` +
        `перевод для юрлиц. По запросу — договор, счёт, акт, УПД, ККТ-чек электронный.`,
    },
    {
      q: "Что если придётся отменить заказ?",
      a:
        `За 24 часа до подачи — полный возврат. За 6–24 часа — 50%. Меньше 6 часов — ` +
        `без возврата, потому что водитель уже выехал. В случае нелётной погоды — полный ` +
        `возврат без вопросов.`,
    },
  ];

  return {
    h1,
    heroSubtitle,
    intro,
    routeDescription,
    callout,
    faq,
  };
}
