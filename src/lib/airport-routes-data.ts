// Маршруты /airport/{iata}/{destination}/ — новая иерархия из §1 исследования
// Цена считается calcPrice(km) из routes-data.ts

export interface AirportRouteData {
  iata: string;
  destinationSlug: string;
  destinationName: string;
  destinationNameAcc: string;
  km: number;
  hours: string;
  direction: "to" | "from" | "both";
  uniqueIntro: string;
  uniqueRouteDesc: string;
  relatedSameHub?: string[];
  relatedToSamePoint?: string[];
  airportLinks?: string[];
}

export const airportRoutes: AirportRouteData[] = [
  // ============= SVO (Шереметьево) =============
  {
    iata: "svo",
    destinationSlug: "moscow-center",
    destinationName: "центр Москвы",
    destinationNameAcc: "центр Москвы",
    km: 35,
    hours: "45–75 мин",
    direction: "both",
    uniqueIntro:
      "Минивэн из Шереметьево в центр Москвы — самый частый трансфер: семьи, группы коллег, делегации. Едем по Ленинградке или по платной М11, в зависимости от пробок. В цену включено ожидание 60 минут при задержке рейса — отдельная плата за это не берётся.",
    uniqueRouteDesc:
      "Шереметьевское шоссе → Ленинградское шоссе → ТТК → пункт назначения. По М11 — быстрее на 15–25 минут, особенно в вечерний час пик. Платный участок: 350–500 ₽, оплачивается отдельно либо включается в чек по согласованию.",
    relatedSameHub: ["moscow-city", "vdnh", "podolsk", "zelenograd", "tver"],
    relatedToSamePoint: ["vko/moscow-center", "dme/moscow-center"],
  },
  {
    iata: "svo",
    destinationSlug: "moscow-city",
    destinationName: "Москва-Сити",
    destinationNameAcc: "Москва-Сити",
    km: 38,
    hours: "50–80 мин",
    direction: "both",
    uniqueIntro:
      "Шереметьево → Москва-Сити — деловой трансфер для топ-менеджмента и иностранных делегаций. Подача к терминалам B/C/D/E с табличкой по фамилии. Заезд к башням Москва-Сити по согласованному адресу (Башня Федерация, ОКО, Меркурий и др.).",
    uniqueRouteDesc:
      "Ленинградское шоссе → ТТК (Третье транспортное кольцо) → Краснопресненская набережная → ММДЦ. По М11 — выходим через Большую Академическую → ТТК. Время в пути сильно зависит от ТТК — в пятницу вечером может растянуться до 90 минут.",
    relatedSameHub: ["moscow-center", "vdnh", "tver"],
    relatedToSamePoint: ["vko/moscow-city", "dme/moscow-city"],
  },
  {
    iata: "svo",
    destinationSlug: "vdnh",
    destinationName: "ВДНХ",
    destinationNameAcc: "ВДНХ",
    km: 20,
    hours: "30–55 мин",
    direction: "both",
    uniqueIntro:
      "Минивэн из Шереметьево до ВДНХ или гостиниц «Космос», «Калужская» — короткий и предсказуемый трансфер. Удобен семьям с детьми, прилетающим к Олимпийскому проспекту, и группам, останавливающимся возле выставки.",
    uniqueRouteDesc:
      "Ленинградское шоссе → улица Поляны → Дмитровское шоссе → ВДНХ. Альтернатива через Алтуфьевское шоссе — на 5–10 минут дольше, но без правого крана.",
    relatedSameHub: ["moscow-center", "moscow-city", "sergiev-posad"],
  },
  {
    iata: "svo",
    destinationSlug: "podolsk",
    destinationName: "Подольск",
    destinationNameAcc: "Подольск",
    km: 70,
    hours: "1.5–2 ч",
    direction: "both",
    uniqueIntro:
      "Шереметьево → Подольск — частый маршрут для семей, едущих к родным в южное Подмосковье, и для корпоративных гостей крупных производственных площадок. По МКАДу + Симферопольскому шоссе.",
    uniqueRouteDesc:
      "Ленинградка → МКАД → Симферопольское шоссе → Подольск. На МКАДе зависит от часа: вечером пятницы 90 минут, в воскресенье утром — 70 минут.",
    relatedSameHub: ["moscow-center", "zelenograd", "tver"],
  },
  {
    iata: "svo",
    destinationSlug: "zelenograd",
    destinationName: "Зеленоград",
    destinationNameAcc: "Зеленоград",
    km: 22,
    hours: "30–50 мин",
    direction: "both",
    uniqueIntro:
      "Минивэн Шереметьево → Зеленоград — ближний трансфер. Подходит сотрудникам IT-парков и студентам МИЭТ. Подача к корпусам по согласованию.",
    uniqueRouteDesc:
      "Ленинградка → ЦКАД → въезд в Зеленоград. Через М11 — на 10 минут быстрее, особенно в час пик.",
    relatedSameHub: ["moscow-center", "tver", "podolsk"],
  },
  {
    iata: "svo",
    destinationSlug: "tver",
    destinationName: "Тверь",
    destinationNameAcc: "Тверь",
    km: 170,
    hours: "2.5–3.5 ч",
    direction: "both",
    uniqueIntro:
      "Из Шереметьево напрямую в Тверь — без заезда в Москву и пробок ТТК. Удобно семьям с детьми и группам, прилетающим на свадьбу, конференцию, к родным в Тверской области.",
    uniqueRouteDesc:
      "М11 «Нева» (платный участок) — самая быстрая дорога. По М10 — на 30–40 минут дольше, но без оплаты. Стоимость платного участка 850–1200 ₽ в зависимости от дня недели.",
    relatedSameHub: ["moscow-center", "sergiev-posad", "zelenograd"],
  },

  // ============= LED (Пулково, СПб) =============
  {
    iata: "led",
    destinationSlug: "spb-center",
    destinationName: "центр СПб",
    destinationNameAcc: "центр Санкт-Петербурга",
    km: 20,
    hours: "30–50 мин",
    direction: "both",
    uniqueIntro:
      "Минивэн Пулково → центр СПб — самый частый трансфер: гости города, туристические группы, делегации на форумы и конференции. Подача к T1 или T2, встреча в зоне прилёта с табличкой.",
    uniqueRouteDesc:
      "Пулковское шоссе → Московский проспект → Невский. В час пик через Витебский проспект и Лиговский — на 10 минут быстрее.",
    relatedSameHub: ["sortavala", "petrozavodsk", "vyborg", "priozersk"],
  },
  {
    iata: "led",
    destinationSlug: "sortavala",
    destinationName: "Сортавала",
    destinationNameAcc: "Сортавалу",
    km: 320,
    hours: "4–5 ч",
    direction: "both",
    uniqueIntro:
      "Пулково → Сортавала на минивэне — туристический маршрут в Карелию. Удобно для группы 6–8 человек, прилетающей в Питер и сразу едущей на отдых. Без заезда в город, по Приморскому шоссе или через Приозерск.",
    uniqueRouteDesc:
      "Из Пулково на КАД → Приморское шоссе → Приозерск → Сортавала. Возможны остановки: Линдуловская роща, Кирха в Лумиваара. Санитарная остановка в районе Приозерска.",
    relatedSameHub: ["spb-center", "petrozavodsk", "priozersk"],
    airportLinks: ["destination/karelia/spb-sortavala"],
  },
  {
    iata: "led",
    destinationSlug: "petrozavodsk",
    destinationName: "Петрозаводск",
    destinationNameAcc: "Петрозаводск",
    km: 440,
    hours: "5.5–6 ч",
    direction: "both",
    uniqueIntro:
      "Пулково → Петрозаводск напрямую на минивэне. Подходит группам, едущим на Кижи или к Онежскому озеру. По М18 «Кола» без пересадок.",
    uniqueRouteDesc:
      "Пулково → КАД → М18 «Кола» → Петрозаводск. Две санитарные остановки. Зимой — особое внимание к погодным условиям, водитель готов задержать выезд при сложной обстановке.",
    relatedSameHub: ["spb-center", "sortavala"],
    airportLinks: ["destination/karelia/spb-petrozavodsk"],
  },
  {
    iata: "led",
    destinationSlug: "vyborg",
    destinationName: "Выборг",
    destinationNameAcc: "Выборг",
    km: 145,
    hours: "2–2.5 ч",
    direction: "both",
    uniqueIntro:
      "Из Пулково в Выборг на минивэне — для туристов, едущих к Выборгскому замку, парку Монрепо, или дальше к финской границе. По Скандинавии (А-181).",
    uniqueRouteDesc:
      "Пулково → КАД → А-181 «Скандинавия» → Выборг. Дорога — современная, две полосы в каждую сторону. Возможны очереди на платных участках в выходные.",
    relatedSameHub: ["spb-center", "priozersk"],
  },
  {
    iata: "led",
    destinationSlug: "priozersk",
    destinationName: "Приозерск",
    destinationNameAcc: "Приозерск",
    km: 165,
    hours: "2.5 ч",
    direction: "both",
    uniqueIntro:
      "Пулково → Приозерск — короткий трансфер для туристов, едущих к крепости Корела, на Ладогу или дальше в Карелию. Удобен как промежуточный пункт по пути в Сортавалу.",
    uniqueRouteDesc:
      "КАД → А-121 «Сортавала» → Приозерск. Прямая дорога вдоль Ладоги, виды на озеро. Зимой — основная трасса до Сортавалы, бесплатная альтернатива М11.",
    relatedSameHub: ["spb-center", "sortavala", "vyborg"],
  },
  {
    iata: "led",
    destinationSlug: "finlandia-border",
    destinationName: "финская граница (Торфяновка/Брусничное)",
    destinationNameAcc: "финскую границу",
    km: 200,
    hours: "3–4 ч",
    direction: "both",
    uniqueIntro:
      "Пулково → пункт пропуска Торфяновка или Брусничное на минивэне. Доставка к границе для пассажиров с финскими/шенгенскими визами. Время прохода границы не входит в цену поездки.",
    uniqueRouteDesc:
      "КАД → Скандинавия (А-181) → Торфяновка или Брусничное. Возможны очереди в зависимости от пограничной обстановки. Перед выездом обязательно уточнить актуальную ситуацию у пограничной службы.",
    relatedSameHub: ["spb-center", "vyborg"],
  },

  // ============= AER (Сочи / Адлер) =============
  {
    iata: "aer",
    destinationSlug: "sochi-center",
    destinationName: "центр Сочи",
    destinationNameAcc: "центр Сочи",
    km: 30,
    hours: "30–60 мин",
    direction: "both",
    uniqueIntro:
      "Минивэн Адлер → центр Сочи — самый частый трансфер: гости города, семьи на отдых, группы коллег на корпоратив. Встреча в T1 или T2 с табличкой по фамилии. Бесплатное ожидание при задержке рейса.",
    uniqueRouteDesc:
      "Из аэропорта по Курортному проспекту вдоль моря — самый красивый и предсказуемый маршрут. В сезон (июнь–август) возможны пробки в Хосте — закладываем дополнительно 20 минут.",
    relatedSameHub: ["krasnaya-polyana", "rosa-khutor", "abkhazia", "gagra"],
  },
  {
    iata: "aer",
    destinationSlug: "krasnaya-polyana",
    destinationName: "Красная Поляна",
    destinationNameAcc: "Красную Поляну",
    km: 50,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Минивэн Адлер → Красная Поляна — горнолыжный трансфер зимой и горный курорт летом. До 8 человек с лыжами или сноубордами. Багажные системы внутри салона + место для крупного багажа в багажнике.",
    uniqueRouteDesc:
      "Из аэропорта по А-149 «Сочи – Красная Поляна» — новая трасса с тоннелями. Дорога живописная, идёт вдоль реки Мзымта. Зимой — водитель с зимней резиной и опытом горного вождения.",
    relatedSameHub: ["sochi-center", "rosa-khutor", "abkhazia"],
  },
  {
    iata: "aer",
    destinationSlug: "rosa-khutor",
    destinationName: "Роза Хутор",
    destinationNameAcc: "Роза Хутор",
    km: 55,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Адлер → Роза Хутор на минивэне — прямой горнолыжный трансфер к самому крупному курорту. Подача к подъёмникам или к отелям в Эсто-Садке. До 8 пассажиров с лыжами/сноубордами.",
    uniqueRouteDesc:
      "А-149 → Эсто-Садок → Роза Хутор. Дорога — современный 2-полосный серпантин, в пиковые часы возможны заторы у развязок.",
    relatedSameHub: ["sochi-center", "krasnaya-polyana"],
  },
  {
    iata: "aer",
    destinationSlug: "abkhazia",
    destinationName: "Абхазия (граница / Гагра)",
    destinationNameAcc: "Абхазию",
    km: 60,
    hours: "1.5–3 ч",
    direction: "both",
    uniqueIntro:
      "Адлер → Абхазия (граница Псоу или Гагра) — на минивэне с трансфером через пограничный пункт. Время прохождения границы зависит от сезона и пограничной обстановки, не включается в цену поездки.",
    uniqueRouteDesc:
      "До границы Псоу — 15 минут. Дальше — пеший переход и продолжение поездки на абхазской машине, либо ожидание у границы (по согласованию). Документы пассажиров — паспорта РФ или загранпаспорта.",
    relatedSameHub: ["sochi-center", "gagra", "sukhum"],
  },
  {
    iata: "aer",
    destinationSlug: "gagra",
    destinationName: "Гагра",
    destinationNameAcc: "Гагру",
    km: 80,
    hours: "2–3 ч",
    direction: "both",
    uniqueIntro:
      "Минивэн Адлер → Гагра — самый частый запрос в Абхазию. Подача от аэропорта, переход границы Псоу, продолжение поездки в Гагру. Уточняем порядок до выезда — нюансы пограничного контроля.",
    uniqueRouteDesc:
      "А-147 (Курортный проспект) → граница Псоу → М-27 → Гагра. Время от границы до Гагры — 30–45 минут.",
    relatedSameHub: ["abkhazia", "sukhum", "sochi-center"],
  },
  {
    iata: "aer",
    destinationSlug: "sukhum",
    destinationName: "Сухум",
    destinationNameAcc: "Сухум",
    km: 145,
    hours: "3.5–5 ч",
    direction: "both",
    uniqueIntro:
      "Минивэн Адлер → Сухум — длинный трансфер столицы Абхазии. Уточняем порядок до выезда: пограничный контроль, состояние дороги, возможные остановки в Пицунде или Новом Афоне.",
    uniqueRouteDesc:
      "Из Адлера → граница → М-27 через Гагру, Пицунду, Новый Афон → Сухум. Возможны остановки для отдыха и фото.",
    relatedSameHub: ["gagra", "abkhazia"],
  },
];

export function getAirportRoute(iata: string, destinationSlug: string): AirportRouteData | null {
  return (
    airportRoutes.find(
      (r) => r.iata === iata.toLowerCase() && r.destinationSlug === destinationSlug
    ) ?? null
  );
}

export function getAirportRoutesByIata(iata: string): AirportRouteData[] {
  return airportRoutes.filter((r) => r.iata === iata.toLowerCase());
}

export const airportRoutesByHub: Record<string, AirportRouteData[]> = airportRoutes.reduce(
  (acc, r) => {
    (acc[r.iata] ??= []).push(r);
    return acc;
  },
  {} as Record<string, AirportRouteData[]>
);
