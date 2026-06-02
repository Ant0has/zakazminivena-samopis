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

  // ============= DME (Домодедово) =============
  {
    iata: "dme",
    destinationSlug: "moscow-center",
    destinationName: "Центр Москвы",
    destinationNameAcc: "Центр Москвы",
    km: 45,
    hours: "55–90 мин",
    direction: "both",
    uniqueIntro:
      "Домодедово → Центр Москвы — стандартный трансфер по М-4 через ЮВАО. Подача к терминалам ДМЕ с табличкой по фамилии в зоне прилёта. Время поездки зависит от участка от Каширского шоссе до ТТК.",
    uniqueRouteDesc:
      "М-4 «Дон» → МКАД → Каширское шоссе → ТТК → центр. В будни 7–10 утра МКАД растянут на 20–30 минут. По М-4 с платным участком — на 15 минут быстрее.",
    relatedSameHub: ["podolsk", "moscow-city", "ramenskoe"],
  },
  {
    iata: "dme",
    destinationSlug: "podolsk",
    destinationName: "Подольск",
    destinationNameAcc: "Подольск",
    km: 25,
    hours: "30–55 мин",
    direction: "both",
    uniqueIntro:
      "Домодедово → Подольск — короткий трансфер через Симферопольское шоссе. Удобен для прилетающих в южное Подмосковье на производственные площадки или к родным.",
    uniqueRouteDesc:
      "А-105 → Симферопольское шоссе → Подольск. В часы пик от Расторгуево возможна задержка на 10–15 минут.",
    relatedSameHub: ["moscow-center", "ramenskoe", "stupino"],
  },
  {
    iata: "dme",
    destinationSlug: "ramenskoe",
    destinationName: "Раменское",
    destinationNameAcc: "Раменское",
    km: 35,
    hours: "45–70 мин",
    direction: "both",
    uniqueIntro:
      "Домодедово → Раменское — поездка по Новорязанскому шоссе. Часто заказывают семьи прилетающие к родственникам или на дачи юго-востока области.",
    uniqueRouteDesc:
      "А-107 → Новорязанское шоссе → Раменское. По второму бетонному кольцу обходится без пробок.",
    relatedSameHub: ["zhukovskiy", "moscow-center"],
  },
  {
    iata: "dme",
    destinationSlug: "zhukovskiy",
    destinationName: "Жуковский",
    destinationNameAcc: "Жуковский",
    km: 40,
    hours: "50–80 мин",
    direction: "both",
    uniqueIntro:
      "Домодедово → Жуковский (город) — частый запрос для пассажиров авиасалона МАКС и сотрудников ЛИИ им. Громова. По Новорязанскому шоссе с заездом в Жуковский.",
    uniqueRouteDesc:
      "А-107 → Новорязанское шоссе → Жуковский. Время сильно зависит от выезда с А-107 — в МАКС-неделю возможны пробки.",
    relatedSameHub: ["ramenskoe", "moscow-center"],
  },
  {
    iata: "dme",
    destinationSlug: "stupino",
    destinationName: "Ступино",
    destinationNameAcc: "Ступино",
    km: 50,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Домодедово → Ступино — трансфер на юг Московской области. Удобен для логистических центров и подмосковных производств южного направления.",
    uniqueRouteDesc:
      "А-105 → М-4 «Дон» (платный участок) → Ступино. По выходным и ночью время поездки сокращается до часа.",
    relatedSameHub: ["podolsk", "serpukhov"],
  },
  {
    iata: "dme",
    destinationSlug: "serpukhov",
    destinationName: "Серпухов",
    destinationNameAcc: "Серпухов",
    km: 75,
    hours: "1.5–2 ч",
    direction: "both",
    uniqueIntro:
      "Домодедово → Серпухов — дальний трансфер по М-2. Часто заказывают для деловых поездок на предприятия Серпуховского района и в Приокско-Террасный заповедник.",
    uniqueRouteDesc:
      "А-105 → М-2 «Крым» → Серпухов. По платной М-2 от Подольска — самый быстрый вариант.",
    relatedSameHub: ["podolsk", "stupino"],
  },

  // ============= VKO (Внуково) =============
  {
    iata: "vko",
    destinationSlug: "moscow-center",
    destinationName: "Центр Москвы",
    destinationNameAcc: "Центр Москвы",
    km: 30,
    hours: "40–70 мин",
    direction: "both",
    uniqueIntro:
      "Внуково → Центр Москвы — ближайший к МКАДу аэропорт. По Боровскому шоссе или Киевке доходим до центра быстрее всего из всех московских аэропортов в нерабочие часы.",
    uniqueRouteDesc:
      "Боровское шоссе → МКАД → Кутузовский проспект → Центр. По Киевке через ТТК — на 5 минут дольше, но без МКАД.",
    relatedSameHub: ["moscow-city", "odintsovo"],
  },
  {
    iata: "vko",
    destinationSlug: "moscow-city",
    destinationName: "Москва-Сити",
    destinationNameAcc: "Москва-Сити",
    km: 32,
    hours: "40–65 мин",
    direction: "both",
    uniqueIntro:
      "Внуково → Москва-Сити — короткий деловой трансфер по Боровскому шоссе. Удобен для иностранных делегаций и сотрудников башен ММДЦ, прилетающих корпоративными рейсами.",
    uniqueRouteDesc:
      "Боровское шоссе → МКАД → Кутузовский → Краснопресненская набережная → ММДЦ.",
    relatedSameHub: ["moscow-center"],
    relatedToSamePoint: ["svo/moscow-city", "dme/moscow-city"],
  },
  {
    iata: "vko",
    destinationSlug: "odintsovo",
    destinationName: "Одинцово",
    destinationNameAcc: "Одинцово",
    km: 25,
    hours: "30–55 мин",
    direction: "both",
    uniqueIntro:
      "Внуково → Одинцово — короткий трансфер на запад Подмосковья. Заказывают семьи прилетающие к родным в Одинцовский район и на дачи Рублёво-Успенского направления.",
    uniqueRouteDesc:
      "Боровское шоссе → МКАД → Можайское шоссе → Одинцово. По М-1 «Беларусь» — альтернативный вариант через Минскую развязку.",
    relatedSameHub: ["moscow-center", "vnukovo-derevnya"],
  },
  {
    iata: "vko",
    destinationSlug: "aprelevka",
    destinationName: "Апрелевка",
    destinationNameAcc: "Апрелевку",
    km: 18,
    hours: "25–40 мин",
    direction: "both",
    uniqueIntro:
      "Внуково → Апрелевка — самый короткий трансфер из аэропорта. Удобен для прилетающих на загородные базы отдыха и в коттеджные посёлки Наро-Фоминского района.",
    uniqueRouteDesc:
      "Киевское шоссе → Апрелевка. По М-3 «Украина» — без пробок круглые сутки.",
    relatedSameHub: ["moscow-center", "odintsovo"],
  },
  {
    iata: "vko",
    destinationSlug: "balashikha",
    destinationName: "Балашиха",
    destinationNameAcc: "Балашиху",
    km: 55,
    hours: "1.5–2 ч",
    direction: "both",
    uniqueIntro:
      "Внуково → Балашиха — длинный кросс-городской трансфер через всю Москву. По МКАДу против часовой стрелки. Заказывают редко, но удобно одной машиной.",
    uniqueRouteDesc:
      "Боровское шоссе → МКАД (внешняя сторона) → Горьковское шоссе → Балашиха. На МКАДе в часы пик растянуто до 2.5 часов.",
    relatedSameHub: ["moscow-center"],
  },
  {
    iata: "vko",
    destinationSlug: "vnukovo-derevnya",
    destinationName: "Внуково (деревня)",
    destinationNameAcc: "Внуково",
    km: 5,
    hours: "10–15 мин",
    direction: "both",
    uniqueIntro:
      "Внуково → деревня Внуково и коттеджные посёлки рядом с аэропортом. Минимальный трансфер для тех кто живёт или арендует жильё прямо у аэропорта.",
    uniqueRouteDesc:
      "По местным дорогам от аэропорта. Готовы подать к воротам коттеджа.",
    relatedSameHub: ["odintsovo", "aprelevka"],
  },

  // ============= ZIA (Жуковский) =============
  {
    iata: "zia",
    destinationSlug: "moscow-center",
    destinationName: "Центр Москвы",
    destinationNameAcc: "Центр Москвы",
    km: 65,
    hours: "1.5–2.5 ч",
    direction: "both",
    uniqueIntro:
      "Жуковский → Центр Москвы — самый дальний аэропорт от центра. Едем по Новорязанскому шоссе с заходом на МКАД. Часто прилетают на лоукостерах AzurAir, NordWind.",
    uniqueRouteDesc:
      "Новорязанское шоссе → МКАД (внешняя сторона) → Рязанский проспект → ТТК → центр. В часы пик растянуто до 3 часов.",
    relatedSameHub: ["zhukovskiy-city", "ramenskoe"],
  },
  {
    iata: "zia",
    destinationSlug: "zhukovskiy-city",
    destinationName: "Жуковский (город)",
    destinationNameAcc: "Жуковский",
    km: 6,
    hours: "10–15 мин",
    direction: "both",
    uniqueIntro:
      "Жуковский аэропорт → город Жуковский — короткий трансфер для местных жителей и тех кто прилетает на МАКС или работает в ЦАГИ/ЛИИ.",
    uniqueRouteDesc:
      "По местным дорогам от аэропорта до города Жуковский. Подача к нужному адресу.",
    relatedSameHub: ["ramenskoe", "moscow-center"],
  },
  {
    iata: "zia",
    destinationSlug: "ramenskoe",
    destinationName: "Раменское",
    destinationNameAcc: "Раменское",
    km: 12,
    hours: "15–25 мин",
    direction: "both",
    uniqueIntro:
      "Жуковский аэропорт → Раменское — короткий хоп между соседними городами. Удобен для тех кто прилетает к родным в Раменский район.",
    uniqueRouteDesc:
      "Местные дороги → Раменское. Без выхода на платные трассы.",
    relatedSameHub: ["zhukovskiy-city", "moscow-center"],
  },
  {
    iata: "zia",
    destinationSlug: "elektrostal",
    destinationName: "Электросталь",
    destinationNameAcc: "Электросталь",
    km: 45,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Жуковский → Электросталь — поездка на восток Московской области через ЦКАД или М-7. Заказывают сотрудники предприятий и пассажиры из Ногинского района.",
    uniqueRouteDesc:
      "Новорязанское шоссе → ЦКАД → М-7 «Волга» → Электросталь. Через ЦКАД быстрее.",
    relatedSameHub: ["ramenskoe", "moscow-center"],
  },

  // ============= KZN (Казань) =============
  {
    iata: "kzn",
    destinationSlug: "kazan-center",
    destinationName: "Центр Казани",
    destinationNameAcc: "Центр Казани",
    km: 25,
    hours: "30–50 мин",
    direction: "both",
    uniqueIntro:
      "Аэропорт Казани → центр города — поездка к Кремлю, гостиницам Бауман или Кул-Шариф. Подача к терминалу 1А с табличкой по фамилии.",
    uniqueRouteDesc:
      "От аэропорта по Оренбургскому тракту → проспект Победы → центр. На М-7 в час пик возможна задержка на 10–15 минут.",
    relatedSameHub: ["innopolis", "zelenodolsk"],
  },
  {
    iata: "kzn",
    destinationSlug: "innopolis",
    destinationName: "Иннополис",
    destinationNameAcc: "Иннополис",
    km: 40,
    hours: "40–60 мин",
    direction: "both",
    uniqueIntro:
      "Казань → Иннополис — поездка в IT-кластер для конференций и встреч с резидентами. По М-7 в обход Казани через объездную.",
    uniqueRouteDesc:
      "М-7 «Волга» → объездная Казани → Иннополис. Дорога новая, без светофоров, время предсказуемое.",
    relatedSameHub: ["kazan-center"],
  },
  {
    iata: "kzn",
    destinationSlug: "zelenodolsk",
    destinationName: "Зеленодольск",
    destinationNameAcc: "Зеленодольск",
    km: 55,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Казань → Зеленодольск — поездка на запад Татарстана. Заказывают на завод «Зеленодольский» и в посёлки Раифского леса.",
    uniqueRouteDesc:
      "Через объездную Казани → М-7 в сторону Нижнего → Зеленодольск.",
    relatedSameHub: ["kazan-center", "innopolis"],
  },
  {
    iata: "kzn",
    destinationSlug: "bolgar",
    destinationName: "Болгар",
    destinationNameAcc: "Болгар",
    km: 180,
    hours: "2.5–3.5 ч",
    direction: "both",
    uniqueIntro:
      "Казань → Болгар — туристический трансфер к памятникам Болгарского городища (UNESCO). Дорога красивая через сёла южного Татарстана.",
    uniqueRouteDesc:
      "М-7 → Алексеевское → Болгар. Часть пути по местным дорогам — рекомендуем минивэн с хорошей подвеской.",
    relatedSameHub: ["kazan-center"],
  },

  // ============= SVX (Екатеринбург, Кольцово) =============
  {
    iata: "svx",
    destinationSlug: "ekaterinburg-center",
    destinationName: "Центр Екатеринбурга",
    destinationNameAcc: "Центр Екатеринбурга",
    km: 17,
    hours: "25–45 мин",
    direction: "both",
    uniqueIntro:
      "Кольцово → центр Екатеринбурга — короткий трансфер по Кольцовскому тракту. Подача к терминалам с табличкой по фамилии.",
    uniqueRouteDesc:
      "Кольцовский тракт → ул. Декабристов → центр. В часы пик растянуто на 10–15 минут.",
    relatedSameHub: ["verkhnyaya-pyshma", "berezovskiy"],
  },
  {
    iata: "svx",
    destinationSlug: "verkhnyaya-pyshma",
    destinationName: "Верхняя Пышма",
    destinationNameAcc: "Верхнюю Пышму",
    km: 35,
    hours: "45–70 мин",
    direction: "both",
    uniqueIntro:
      "Кольцово → Верхняя Пышма — частый трансфер для сотрудников УГМК и пассажиров военно-технического музея. Через Екатеринбург по Серовскому тракту.",
    uniqueRouteDesc:
      "Кольцовский тракт → центр Екатеринбурга → Серовский тракт → Верхняя Пышма. Объезд через ЕКАД — на 10 минут быстрее в час пик.",
    relatedSameHub: ["ekaterinburg-center", "berezovskiy"],
  },
  {
    iata: "svx",
    destinationSlug: "berezovskiy",
    destinationName: "Берёзовский",
    destinationNameAcc: "Берёзовский",
    km: 30,
    hours: "40–60 мин",
    direction: "both",
    uniqueIntro:
      "Кольцово → Берёзовский — короткий трансфер на северо-восток Екатеринбурга. Удобен для прилетающих в коттеджные посёлки и на промышленные площадки.",
    uniqueRouteDesc:
      "Кольцовский тракт → ЕКАД → Берёзовский. Без захода в центр.",
    relatedSameHub: ["ekaterinburg-center", "verkhnyaya-pyshma"],
  },
  {
    iata: "svx",
    destinationSlug: "nizhniy-tagil",
    destinationName: "Нижний Тагил",
    destinationNameAcc: "Нижний Тагил",
    km: 150,
    hours: "2.5–3.5 ч",
    direction: "both",
    uniqueIntro:
      "Кольцово → Нижний Тагил — дальний трансфер на север области. Часто заказывают сотрудники Уралвагонзавода и пассажиры на семейные поездки.",
    uniqueRouteDesc:
      "ЕКАД → Серовский тракт → Нижний Тагил. Дорога 4-полосная, в зимнее время может быть скользко — выезжаем заранее.",
    relatedSameHub: ["verkhnyaya-pyshma"],
  },

  // ============= OVB (Новосибирск, Толмачёво) =============
  {
    iata: "ovb",
    destinationSlug: "novosibirsk-center",
    destinationName: "Центр Новосибирска",
    destinationNameAcc: "Центр Новосибирска",
    km: 20,
    hours: "30–55 мин",
    direction: "both",
    uniqueIntro:
      "Толмачёво → центр Новосибирска — поездка к Оперному, Краснопроспектной, гостинице Новосибирск. По Толмачёвскому шоссе и Северному обходу.",
    uniqueRouteDesc:
      "Толмачёвское шоссе → Северный обход → Большевистская → центр. В будни 8–10 утра возможна пробка на въезде в город.",
    relatedSameHub: ["akademgorodok", "berdsk"],
  },
  {
    iata: "ovb",
    destinationSlug: "akademgorodok",
    destinationName: "Академгородок",
    destinationNameAcc: "Академгородок",
    km: 50,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Толмачёво → Академгородок — частый запрос для приезжающих на конференции, в НГУ или СО РАН. По объездной и Бердскому шоссе.",
    uniqueRouteDesc:
      "Толмачёвское шоссе → объездная → Бердское шоссе → Академгородок. Через центр на 20–30 минут дольше.",
    relatedSameHub: ["novosibirsk-center", "berdsk"],
  },
  {
    iata: "ovb",
    destinationSlug: "berdsk",
    destinationName: "Бердск",
    destinationNameAcc: "Бердск",
    km: 35,
    hours: "45–70 мин",
    direction: "both",
    uniqueIntro:
      "Толмачёво → Бердск — поездка к Обскому морю и базам отдыха южнее Новосибирска. По Бердскому шоссе.",
    uniqueRouteDesc:
      "Толмачёвское шоссе → объездная → Бердское шоссе → Бердск.",
    relatedSameHub: ["novosibirsk-center", "akademgorodok"],
  },
  {
    iata: "ovb",
    destinationSlug: "koltsovo",
    destinationName: "Кольцово",
    destinationNameAcc: "Кольцово",
    km: 35,
    hours: "45–70 мин",
    direction: "both",
    uniqueIntro:
      "Толмачёво → наукоград Кольцово — поездка к центру биотехнологий и Векторам. По объездной и Восточному обходу.",
    uniqueRouteDesc:
      "Толмачёвское шоссе → объездная → Восточный обход → Кольцово.",
    relatedSameHub: ["novosibirsk-center"],
  },

  // ============= IKT (Иркутск) =============
  {
    iata: "ikt",
    destinationSlug: "irkutsk-center",
    destinationName: "Центр Иркутска",
    destinationNameAcc: "Центр Иркутска",
    km: 12,
    hours: "20–35 мин",
    direction: "both",
    uniqueIntro:
      "Аэропорт Иркутска → центр — короткий трансфер к набережной Ангары, музею декабристов, гостинице Иркутск. Один из самых компактных трансферов по стране.",
    uniqueRouteDesc:
      "Ширямова → ул. Байкальская → центр. Город небольшой, пробки только в час пик.",
    relatedSameHub: ["listvyanka", "shelekhov"],
  },
  {
    iata: "ikt",
    destinationSlug: "listvyanka",
    destinationName: "Листвянка",
    destinationNameAcc: "Листвянку",
    km: 70,
    hours: "1.5–2 ч",
    direction: "both",
    uniqueIntro:
      "Иркутск → Листвянка — главный туристический трансфер к Байкалу. По Байкальскому тракту через тайгу. Часто берут с остановкой в Тальцах.",
    uniqueRouteDesc:
      "Байкальский тракт → Тальцы → Листвянка. Зимой дорога чистится, но колея возможна — едем аккуратно.",
    relatedSameHub: ["irkutsk-center"],
  },
  {
    iata: "ikt",
    destinationSlug: "shelekhov",
    destinationName: "Шелехов",
    destinationNameAcc: "Шелехов",
    km: 40,
    hours: "50–80 мин",
    direction: "both",
    uniqueIntro:
      "Иркутск → Шелехов — поездка к алюминиевому заводу и в посёлки на юге Иркутской области. По М-55 и Култукскому тракту.",
    uniqueRouteDesc:
      "М-55 → Култукский тракт → Шелехов.",
    relatedSameHub: ["irkutsk-center", "angarsk"],
  },
  {
    iata: "ikt",
    destinationSlug: "angarsk",
    destinationName: "Ангарск",
    destinationNameAcc: "Ангарск",
    km: 50,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Иркутск → Ангарск — частый трансфер для сотрудников АНХК и пассажиров на семейные поездки. По М-53 «Байкал».",
    uniqueRouteDesc:
      "М-53 «Байкал» → Ангарск. Дорога 4-полосная, без проблем зимой и летом.",
    relatedSameHub: ["shelekhov", "irkutsk-center"],
  },

  // ============= MMK (Мурманск, Мурмаши) =============
  {
    iata: "mmk",
    destinationSlug: "murmansk-center",
    destinationName: "Центр Мурманска",
    destinationNameAcc: "Центр Мурманска",
    km: 25,
    hours: "35–55 мин",
    direction: "both",
    uniqueIntro:
      "Мурмаши → центр Мурманска — поездка к Кольскому проспекту, морскому вокзалу, гостинице Меридиан. По шоссе Кола (Р-21).",
    uniqueRouteDesc:
      "Аэропорт Мурмаши → Р-21 «Кола» → центр Мурманска.",
    relatedSameHub: ["teriberka", "apatity"],
  },
  {
    iata: "mmk",
    destinationSlug: "teriberka",
    destinationName: "Териберка",
    destinationNameAcc: "Териберку",
    km: 150,
    hours: "3–4.5 ч",
    direction: "both",
    uniqueIntro:
      "Мурманск → Териберка — туристический трансфер к Баренцеву морю. Зимой — главная цель искателей северного сияния. Дорога серьёзная, водитель местный.",
    uniqueRouteDesc:
      "Р-21 → Серебрянская трасса → Териберка. Зимой едем только в светлое время и с прогнозом погоды. С декабря по март возможны снежные заносы.",
    relatedSameHub: ["murmansk-center"],
  },
  {
    iata: "mmk",
    destinationSlug: "kirovsk",
    destinationName: "Кировск",
    destinationNameAcc: "Кировск",
    km: 200,
    hours: "3–4 ч",
    direction: "both",
    uniqueIntro:
      "Мурманск → Кировск — трансфер на горнолыжный курорт Хибины. Зимой главное направление для лыжников и сноубордистов.",
    uniqueRouteDesc:
      "Р-21 → Кировск через Апатиты. Зимой шипованная резина — обязательна.",
    relatedSameHub: ["murmansk-center", "apatity"],
  },
  {
    iata: "mmk",
    destinationSlug: "apatity",
    destinationName: "Апатиты",
    destinationNameAcc: "Апатиты",
    km: 180,
    hours: "3–3.5 ч",
    direction: "both",
    uniqueIntro:
      "Мурманск → Апатиты — поездка к Кольскому НЦ РАН и Хибинам. Часто заказывают учёные на конференции и спортсмены на тренировочные базы.",
    uniqueRouteDesc:
      "Р-21 → Апатиты. По дороге заезд в Мончегорск возможен.",
    relatedSameHub: ["kirovsk", "murmansk-center"],
  },

  // ============= MRV (Минеральные Воды) =============
  {
    iata: "mrv",
    destinationSlug: "kislovodsk",
    destinationName: "Кисловодск",
    destinationNameAcc: "Кисловодск",
    km: 55,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Минводы → Кисловодск — главный курортный трансфер региона КМВ. По А-157 через Пятигорск и Ессентуки. Часто заказывают на санатории «Долина Нарзанов», «Целебный Нарзан».",
    uniqueRouteDesc:
      "А-157 → Пятигорск → Ессентуки → Кисловодск. По прямой дороге без серпантина.",
    relatedSameHub: ["pyatigorsk", "essentuki"],
  },
  {
    iata: "mrv",
    destinationSlug: "pyatigorsk",
    destinationName: "Пятигорск",
    destinationNameAcc: "Пятигорск",
    km: 25,
    hours: "30–50 мин",
    direction: "both",
    uniqueIntro:
      "Минводы → Пятигорск — короткий трансфер к санаториям и провалу Лермонтова. По А-157 с заездом в нужный микрорайон.",
    uniqueRouteDesc:
      "А-157 → Пятигорск. Подача к санаторию или гостинице по адресу.",
    relatedSameHub: ["essentuki", "kislovodsk"],
  },
  {
    iata: "mrv",
    destinationSlug: "essentuki",
    destinationName: "Ессентуки",
    destinationNameAcc: "Ессентуки",
    km: 15,
    hours: "20–35 мин",
    direction: "both",
    uniqueIntro:
      "Минводы → Ессентуки — самый короткий курортный трансфер КМВ. По А-157, без серпантина. Часто заказывают семьи на лечение.",
    uniqueRouteDesc:
      "А-157 → Ессентуки. Подача прямо к санаторию или санатории.",
    relatedSameHub: ["pyatigorsk", "kislovodsk"],
  },
  {
    iata: "mrv",
    destinationSlug: "zheleznovodsk",
    destinationName: "Железноводск",
    destinationNameAcc: "Железноводск",
    km: 20,
    hours: "25–40 мин",
    direction: "both",
    uniqueIntro:
      "Минводы → Железноводск — трансфер к санаториям у горы Бештау. По местным дорогам без выезда на платные участки.",
    uniqueRouteDesc:
      "От аэропорта → А-157 → Железноводск.",
    relatedSameHub: ["pyatigorsk", "essentuki"],
  },

  // ============= SIP (Симферополь) =============
  {
    iata: "sip",
    destinationSlug: "yalta",
    destinationName: "Ялта",
    destinationNameAcc: "Ялту",
    km: 85,
    hours: "1.5–2 ч",
    direction: "both",
    uniqueIntro:
      "Симферополь → Ялта — главный туристический трансфер Крыма. Через Тавриду и Ангарский перевал. Один из самых востребованных маршрутов в летний сезон.",
    uniqueRouteDesc:
      "Таврида (Р-260) → Алушта → ЮБК → Ялта. Серпантин от Алушты — едем аккуратно, никого не укачивает.",
    relatedSameHub: ["alushta", "sevastopol", "feodosia"],
  },
  {
    iata: "sip",
    destinationSlug: "sevastopol",
    destinationName: "Севастополь",
    destinationNameAcc: "Севастополь",
    km: 80,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Симферополь → Севастополь — поездка к Графской пристани, музеям и Балаклаве. По Тавриде в обход через Бахчисарай.",
    uniqueRouteDesc:
      "Таврида (Р-260) → Бахчисарай → Севастополь. Дорога новая, без проблем.",
    relatedSameHub: ["yalta", "yevpatoria"],
  },
  {
    iata: "sip",
    destinationSlug: "alushta",
    destinationName: "Алушта",
    destinationNameAcc: "Алушту",
    km: 50,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Симферополь → Алушта — короткий трансфер к ЮБК. Через Ангарский перевал. Удобен для семей с детьми, едущих на отдых в пансионаты Профессорского уголка.",
    uniqueRouteDesc:
      "Таврида (Р-260) → Ангарский перевал → Алушта. Серпантин короткий — 20 минут.",
    relatedSameHub: ["yalta", "feodosia"],
  },
  {
    iata: "sip",
    destinationSlug: "feodosia",
    destinationName: "Феодосия",
    destinationNameAcc: "Феодосию",
    km: 115,
    hours: "2–2.5 ч",
    direction: "both",
    uniqueIntro:
      "Симферополь → Феодосия — поездка на восток Крыма. Часто заказывают семьи в Коктебель, Орджоникидзе и санатории Крымского Приморья.",
    uniqueRouteDesc:
      "Таврида (Р-260) → Феодосия. Прямая трасса без серпантина.",
    relatedSameHub: ["sudak", "yevpatoria"],
  },
  {
    iata: "sip",
    destinationSlug: "sudak",
    destinationName: "Судак",
    destinationNameAcc: "Судак",
    km: 105,
    hours: "2–2.5 ч",
    direction: "both",
    uniqueIntro:
      "Симферополь → Судак — поездка к Генуэзской крепости и пляжам восточного побережья. Через Белогорск и Грушевку.",
    uniqueRouteDesc:
      "Таврида (Р-260) → Белогорск → Судак. По объездной без захода в город Старого Крыма.",
    relatedSameHub: ["feodosia", "alushta"],
  },
  {
    iata: "sip",
    destinationSlug: "yevpatoria",
    destinationName: "Евпатория",
    destinationNameAcc: "Евпаторию",
    km: 65,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Симферополь → Евпатория — трансфер к семейным курортам западного Крыма. Часто едут с детьми на грязевые ванны и Мойнакское озеро.",
    uniqueRouteDesc:
      "Через Сакское шоссе → Евпатория. Дорога ровная, без перепадов.",
    relatedSameHub: ["sevastopol", "feodosia"],
  },

  // ============= KGD (Калининград, Храброво) =============
  {
    iata: "kgd",
    destinationSlug: "kaliningrad-center",
    destinationName: "Центр Калининграда",
    destinationNameAcc: "Центр Калининграда",
    km: 25,
    hours: "30–50 мин",
    direction: "both",
    uniqueIntro:
      "Храброво → центр Калининграда — поездка к Кафедральному собору, Рыбной деревне, гостиницам Москва и Калининград.",
    uniqueRouteDesc:
      "От Храброво → Зеленоградское шоссе → ул. Невского → центр Калининграда.",
    relatedSameHub: ["svetlogorsk", "zelenogradsk"],
  },
  {
    iata: "kgd",
    destinationSlug: "svetlogorsk",
    destinationName: "Светлогорск",
    destinationNameAcc: "Светлогорск",
    km: 40,
    hours: "45–70 мин",
    direction: "both",
    uniqueIntro:
      "Храброво → Светлогорск — главный курортный трансфер Калининградской области. К Янтарь-холлу, Морской набережной, санаториям. Без необходимости транзита через границы.",
    uniqueRouteDesc:
      "От Храброво → Приморское кольцо → Светлогорск. Дорога ровная, без серпантина.",
    relatedSameHub: ["zelenogradsk", "yantarniy"],
  },
  {
    iata: "kgd",
    destinationSlug: "zelenogradsk",
    destinationName: "Зеленоградск",
    destinationNameAcc: "Зеленоградск",
    km: 30,
    hours: "30–55 мин",
    direction: "both",
    uniqueIntro:
      "Храброво → Зеленоградск — поездка к балтийским пляжам и музею кошек. Один из самых коротких курортных трансферов области.",
    uniqueRouteDesc:
      "От Храброво → Зеленоградское шоссе → Зеленоградск.",
    relatedSameHub: ["svetlogorsk", "kaliningrad-center"],
  },
  {
    iata: "kgd",
    destinationSlug: "yantarniy",
    destinationName: "Янтарный",
    destinationNameAcc: "Янтарный",
    km: 55,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Храброво → Янтарный — поездка к янтарному комбинату и Голубой бухте. Через Светлогорск или прямой объездной.",
    uniqueRouteDesc:
      "От Храброво → Приморское кольцо → Янтарный.",
    relatedSameHub: ["svetlogorsk", "kaliningrad-center"],
  },

  // ============= AAQ (Анапа, Витязево) =============
  {
    iata: "aaq",
    destinationSlug: "anapa-center",
    destinationName: "Центр Анапы",
    destinationNameAcc: "Центр Анапы",
    km: 15,
    hours: "20–35 мин",
    direction: "both",
    uniqueIntro:
      "Витязево → центр Анапы — короткий трансфер к санаториям, пансионатам и пляжам. По местным дорогам без выезда на М-4.",
    uniqueRouteDesc:
      "Витязевское шоссе → Анапа. Подача к санаторию или гостинице.",
    relatedSameHub: ["gelendzhik", "vityazevo"],
  },
  {
    iata: "aaq",
    destinationSlug: "gelendzhik",
    destinationName: "Геленджик",
    destinationNameAcc: "Геленджик",
    km: 50,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Витязево → Геленджик — поездка к гостиницам Толстого мыса, Сафари-парку и Геленджикской набережной. По объездной Новороссийска.",
    uniqueRouteDesc:
      "Витязево → М-4 → объездная Новороссийска → Геленджик.",
    relatedSameHub: ["anapa-center"],
  },
  {
    iata: "aaq",
    destinationSlug: "vityazevo",
    destinationName: "Витязево",
    destinationNameAcc: "Витязево",
    km: 10,
    hours: "15–20 мин",
    direction: "both",
    uniqueIntro:
      "Аэропорт Витязево → курортный посёлок Витязево — минимальный трансфер. К песчаным пляжам и семейным гостиницам.",
    uniqueRouteDesc:
      "От аэропорта по местным дорогам → Витязево.",
    relatedSameHub: ["anapa-center"],
  },

  // ============= KRR (Краснодар, Пашковский) =============
  {
    iata: "krr",
    destinationSlug: "krasnodar-center",
    destinationName: "Центр Краснодара",
    destinationNameAcc: "Центр Краснодара",
    km: 15,
    hours: "20–40 мин",
    direction: "both",
    uniqueIntro:
      "Пашковский → центр Краснодара — поездка к Красной улице, парку Галицкого, гостинице Москва. По Уральской улице.",
    uniqueRouteDesc:
      "Уральская → ул. Селезнёва → центр Краснодара. В будни 8–9 утра возможна пробка на Селезнёва.",
    relatedSameHub: ["goryachiy-klyuch", "kropotkin"],
  },
  {
    iata: "krr",
    destinationSlug: "goryachiy-klyuch",
    destinationName: "Горячий Ключ",
    destinationNameAcc: "Горячий Ключ",
    km: 60,
    hours: "1–1.5 ч",
    direction: "both",
    uniqueIntro:
      "Краснодар → Горячий Ключ — трансфер к курортной зоне Кубани. По М-4 в сторону Сочи.",
    uniqueRouteDesc:
      "Уральская → Объездная → М-4 «Дон» → Горячий Ключ.",
    relatedSameHub: ["krasnodar-center"],
  },
  {
    iata: "krr",
    destinationSlug: "kropotkin",
    destinationName: "Кропоткин",
    destinationNameAcc: "Кропоткин",
    km: 145,
    hours: "2–2.5 ч",
    direction: "both",
    uniqueIntro:
      "Краснодар → Кропоткин — дальний трансфер на восток Краснодарского края. Часто заказывают сотрудники предприятий и пассажиры с пересадкой.",
    uniqueRouteDesc:
      "Уральская → М-4 «Дон» → Кропоткин.",
    relatedSameHub: ["krasnodar-center"],
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
