// Генератор уникального текстового контента для маршрута аэропорта.
// Используется на /airport/{iata}/{destination}/ — заголовки, абзацы, FAQ.

import {
  BRAND,
  durationPhrase,
  kmPhrase,
  priceFromKm,
  pricePerPersonFromKm,
  priceRoundTripFromKm,
} from "./format";

export interface AirportRouteContent {
  /** H1 на Hero */
  h1: string;
  /** Подзаголовок Hero */
  heroSubtitle: string;
  /** «О маршруте» — 2 абзаца, для лонгрида + общего описания */
  intro: string;
  routeDescription: string;
  /** Полезные советы — для callout в лонгриде */
  tipForTravel: string;
  /** Полные секции лонгрида (если уникального intro не передали — сольёмся с дефолтом) */
  longreadCallout: string;
  /** 8 FAQ — с подстановкой данных маршрута */
  faq: Array<{ q: string; a: string }>;
}

interface Input {
  iata: string;
  airportName: string;
  airportNameFull: string;
  destinationName: string;
  destinationCity: string;
  km: number;
  hours: string;
  /** Уникальный «авторский» абзац от data-файла, если задан — встраиваем как первый */
  uniqueIntro?: string;
  uniqueRouteDesc?: string;
}

export function generateAirportRouteContent(opts: Input): AirportRouteContent {
  const price = priceFromKm(opts.km);
  const priceRT = priceRoundTripFromKm(opts.km);
  const pricePer = pricePerPersonFromKm(opts.km, 7);
  const duration = durationPhrase(opts.hours);
  const iataUpper = opts.iata.toUpperCase();

  const h1 = `Минивэн из ${opts.airportNameFull} в ${opts.destinationName} — от ${price} ₽`;

  const heroSubtitle =
    `Трансфер с водителем на ${opts.km} км за ${duration}. Минивэн 6–8 пассажиров с багажом. ` +
    `Фикс цена за машину, не за пассажира. Встреча в зоне прилёта с табличкой по фамилии.`;

  // intro — первый параграф. Объединяет «авторский» (если есть) и сгенерированный.
  const baseIntro =
    `Минивэн ${opts.airportName} (${iataUpper}) → ${opts.destinationName} — самый удобный способ ` +
    `перевезти семью или группу коллег от терминала до пункта назначения. Расстояние ${kmPhrase(opts.km)}, ` +
    `время в пути ${duration}. Цена ${price} ₽ за весь минивэн до 8 мест — это около ${pricePer} ₽ ` +
    `на пассажира при полной загрузке, что выгоднее, чем заказывать две машины такси. ` +
    `В стоимость уже включены детское кресло, табличка по фамилии и бесплатное ожидание ` +
    `60 минут при задержке рейса.`;

  const intro = opts.uniqueIntro ? `${opts.uniqueIntro}\n\n${baseIntro}` : baseIntro;

  // routeDescription — второй абзац о самой дороге.
  const baseRouteDesc =
    `Водитель выезжает к терминалу заранее, отслеживает рейс через табло онлайн и встречает ` +
    `пассажиров сразу после прохождения паспортного контроля. По дороге в ${opts.destinationName} ` +
    `можно сделать одну остановку без доплаты — например, у супермаркета или АЗС. Для поездки ` +
    `туда-обратно за день действует скидка 20% на обратный путь — общая стоимость ${priceRT} ₽.`;

  const routeDescription = opts.uniqueRouteDesc
    ? `${opts.uniqueRouteDesc}\n\n${baseRouteDesc}`
    : baseRouteDesc;

  // Совет-callout для лонгрида (паттерн 3 best-practices)
  const tipForTravel =
    `Бронируйте минивэн заранее — за 2–24 часа до подачи, особенно в пиковые часы прилёта ` +
    `(вечер пятницы, утро воскресенья). Контакт водителя приходит за 30 минут до прибытия рейса, ` +
    `поэтому потерь в зоне прилёта не бывает.`;

  const longreadCallout =
    `Бесплатное ожидание 60 минут при задержке рейса — это уже включено в фикс цену. ` +
    `Дольше — по часовому тарифу 500 ₽/час, что в 2–3 раза дешевле обычного такси.`;

  // FAQ — 8 вопросов с подстановкой
  const faq: Array<{ q: string; a: string }> = [
    {
      q: `Сколько стоит минивэн из ${opts.airportName} в ${opts.destinationName}?`,
      a:
        `Фикс цена — от ${price} ₽ за машину 6–8 пассажиров. Не зависит от количества пассажиров ` +
        `и времени в пути. Туда-обратно за день со скидкой 20% — ${priceRT} ₽.`,
    },
    {
      q: `Сколько времени едет минивэн ${opts.airportName} → ${opts.destinationName}?`,
      a:
        `${duration} в зависимости от пробок и времени суток. Расстояние ${opts.km} км. ` +
        `Водитель отслеживает дорожную ситуацию и выбирает оптимальный маршрут.`,
    },
    {
      q: "Что если самолёт задерживается?",
      a:
        `Бесплатно ждём 60 минут от времени прилёта. Дольше — 500 ₽/час. ` +
        `Время отсчитываем от факта приземления, а не от расписания — задержка рейса не ваша вина.`,
    },
    {
      q: `Как водитель найдёт меня в ${opts.airportName}?`,
      a:
        `В зоне прилёта с табличкой по вашей фамилии. За 30 минут до прибытия рейса вы получите ` +
        `имя и контакт водителя в WhatsApp/Telegram + фото машины и номер.`,
    },
    {
      q: "Можно ли с детским креслом?",
      a:
        `Да, бесплатно. Указывайте тип в форме: бустер (6+ лет), кресло 9–18 кг или 18–36 кг. ` +
        `До 4 кресел одновременно — зависит от модели минивэна.`,
    },
    {
      q: "Принимаете ли безналичный расчёт?",
      a:
        `Да. Картой онлайн (Юкасса/Тинькофф), СБП по телефону, наличными водителю или ` +
        `банковским переводом для юрлиц. Документы для отчётности — договор, счёт, акт, ` +
        `ККТ-чек, УПД по запросу.`,
    },
    {
      q: "Можно ли заехать по пути в другой адрес?",
      a:
        `Одна короткая остановка — бесплатно (магазин, АЗС). Дополнительный адрес посадки/высадки — ` +
        `500 ₽. Большие отклонения от маршрута пересчитываются по ${pricePer === priceFromKm(opts.km) ? "₽/км" : "почасовому тарифу"}.`,
    },
    {
      q: "Можно ли с домашним питомцем?",
      a:
        `Да. В переноске — бесплатно. Собака до 10 кг — 1 000 ₽, 10–25 кг — 1 500 ₽. ` +
        `Заранее предупредите менеджера, чтобы подобрать минивэн с подходящим салоном.`,
    },
  ];

  return {
    h1,
    heroSubtitle,
    intro,
    routeDescription,
    tipForTravel,
    longreadCallout,
    faq,
  };
}

// Хелпер, что вернуть «УТП-маркеры» для бейджей под H1
export function airportRouteBadges(_iata: string): string[] {
  return ["Фикс цена", "Встреча с табличкой", "60 мин ожидания", "Дет.кресла"];
}

// Хелпер для блока «связанных» — короткая подпись (используется в карточках)
export function airportRouteCardSubtitle(opts: { km: number; hours: string }): string {
  return `${opts.km} км · ${durationPhrase(opts.hours)} · от ${priceFromKm(opts.km)} ₽`;
}

export const AIRPORT_BRAND = BRAND;
