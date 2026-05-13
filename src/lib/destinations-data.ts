// Туркластер: 8 региональных хабов /destination/{region}/ и ~35 туристических маршрутов /destination/{region}/{route}/

export interface DestinationHubData {
  slug: string;
  regionName: string;
  regionNameAcc: string;
  hubCity: string;
  hubCitySlug: string;
  topPointsShort: string;
  heroIntro: string;
  seasons: { months: string; description: string }[];
  packingList: string[];
  multidayTours: { name: string; days: number; priceFrom: number; description: string }[];
  fleetModels: string[];
  routes: string[];
  relatedRegions: string[];
  airportLinks?: string[];
}

export interface DestinationRouteData {
  regionSlug: string;
  routeSlug: string;
  fromCity: string;
  toCity: string;
  toCityAcc: string;
  km: number;
  hours: string;
  uniqueIntro: string;
  uniqueRouteDesc: string;
  pointsOfInterest: { name: string; description: string }[];
  specifics: string;
  seasonalNotes?: string;
  airportLink?: string;
}

export const destinationHubs: DestinationHubData[] = [
  {
    slug: "karelia",
    regionName: "Карелия",
    regionNameAcc: "Карелию",
    hubCity: "СПб",
    hubCitySlug: "spb",
    topPointsShort: "Сортавала, Рускеала, Кижи, Валаам",
    heroIntro:
      "Минивэн в Карелию из СПб — самый частый туристический маршрут на северо-западе. Сортавала, мраморный каньон Рускеала, Валаам, Кижи. Однодневные и многодневные поездки с водителем, знающим регион.",
    seasons: [
      { months: "май–сентябрь", description: "основной сезон, лучшая погода для пеших прогулок" },
      { months: "июнь–август", description: "пик, лучше бронировать минивэн за 2–3 недели" },
      { months: "февраль–март", description: "Валаам и Кижи по льду, северное сияние шансы" },
      { months: "конец сентября", description: "золотая осень в Рускеале — фотогенично" },
    ],
    packingList: [
      "Тёплая одежда (+5°C даже летом ночью)",
      "Репеллент в июле–августе",
      "Удобная обувь для пешеходных троп Рускеалы",
      "Документы (паспорт) для Валаама — погранзона",
      "Дождевик, влажные салфетки",
    ],
    multidayTours: [
      {
        name: "СПб → Сортавала → Рускеала → Валаам (2 дня)",
        days: 2,
        priceFrom: 45000,
        description: "Двухдневный тур с ночёвкой водителя в Сортавале. Включает посещение мраморного каньона и водный рейс на Валаам.",
      },
      {
        name: "СПб → Петрозаводск → Кижи (3 дня)",
        days: 3,
        priceFrom: 65000,
        description: "Большой тур: Петрозаводск, водный рейс на Кижи, остановка у водопадов Кивач.",
      },
    ],
    fleetModels: ["vw-multivan", "mercedes-v-class", "hyundai-h1", "toyota-hiace"],
    routes: ["spb-sortavala", "spb-ruskeala", "spb-petrozavodsk", "spb-kizhi", "spb-valaam", "spb-priozersk"],
    relatedRegions: ["north", "kaliningrad"],
    airportLinks: ["led/sortavala", "led/petrozavodsk"],
  },
  {
    slug: "kmv",
    regionName: "Кавказские Минеральные Воды",
    regionNameAcc: "Кавказские Минеральные Воды",
    hubCity: "Минеральные Воды",
    hubCitySlug: "mineralnye-vody",
    topPointsShort: "Кисловодск, Пятигорск, Ессентуки, Железноводск, Архыз, Домбай, Эльбрус",
    heroIntro:
      "Минивэн по Кавказским Минеральным Водам — Кисловодск, Пятигорск, Ессентуки и Железноводск в одном туре. Зимой — Архыз, Домбай, Эльбрус. Водитель, знающий регион и пограничные нюансы.",
    seasons: [
      { months: "май–октябрь", description: "лучшие месяцы для прогулок и санаторного отдыха" },
      { months: "декабрь–март", description: "горнолыжный сезон в Архызе, Домбае и Приэльбрусье" },
      { months: "июль–август", description: "пик летнего сезона, особенно в Ессентуках" },
    ],
    packingList: [
      "Удобная обувь для горных троп и нарзанной галереи",
      "Тёплая одежда для гор (Архыз, Эльбрус) — даже летом",
      "Зимой — лыжный комплект (можно арендовать на курорте)",
      "Купальник для бассейнов санаториев",
      "Документы для проезда в погранзону Эльбруса",
    ],
    multidayTours: [
      {
        name: "Большой круг по КМВ (1 день)",
        days: 1,
        priceFrom: 18000,
        description: "Пятигорск → Ессентуки → Кисловодск → Железноводск за один день с водителем-проводником.",
      },
      {
        name: "Горнолыжный КМВ — Архыз + Домбай (2 дня)",
        days: 2,
        priceFrom: 35000,
        description: "Зимний тур с ночёвкой водителя на курорте. Подходит для семьи с детьми и групп 4–8 человек.",
      },
    ],
    fleetModels: ["vw-multivan", "hyundai-h1", "vw-caravelle"],
    routes: ["mineralnye-vody-kislovodsk", "mineralnye-vody-pyatigorsk", "mineralnye-vody-essentuki", "mineralnye-vody-zheleznovodsk", "mineralnye-vody-dombay", "mineralnye-vody-arkhyz", "mineralnye-vody-elbrus"],
    relatedRegions: ["crimea", "krasnodar-coast"],
    airportLinks: ["mrv/kislovodsk", "mrv/pyatigorsk", "mrv/dombay"],
  },
  {
    slug: "altai",
    regionName: "Алтай",
    regionNameAcc: "Алтай",
    hubCity: "Барнаул",
    hubCitySlug: "barnaul",
    topPointsShort: "Чемал, Манжерок, Чулышман, Белуха",
    heroIntro:
      "Минивэн по Алтаю из Барнаула или Горно-Алтайска. Чемал, Манжерок, Чулышман, подъезд к Белухе. Дальние трассы, водитель, знающий горные дороги и сезонные особенности.",
    seasons: [
      { months: "июнь–сентябрь", description: "основной сезон, проходимы все горные участки" },
      { months: "июль–август", description: "пик, лучшие фото у Манжерока и Чемала" },
      { months: "май, октябрь", description: "переходные сезоны, возможны снежные участки" },
    ],
    packingList: [
      "Тёплая одежда (в горах ночью +5°C даже летом)",
      "Удобная обувь с протектором",
      "Дождевик и плед",
      "Документы — пропуска в погранзону для отдельных маршрутов",
      "Аптечка от укусов клещей (май–июль)",
    ],
    multidayTours: [
      {
        name: "Барнаул → Чемал → Манжерок (1 день)",
        days: 1,
        priceFrom: 25000,
        description: "Однодневный тур с водителем-проводником. Включает остановки у Чемальского ГЭС и катамарана.",
      },
      {
        name: "Большой Алтай: Барнаул → Чулышман (3 дня)",
        days: 3,
        priceFrom: 75000,
        description: "Многодневный тур с ночёвкой водителя. Подходит группам 4–8 человек.",
      },
    ],
    fleetModels: ["toyota-hiace", "hyundai-h1", "vw-multivan"],
    routes: ["barnaul-chemal", "barnaul-manzherok", "barnaul-belukha", "barnaul-chulyshman", "novosibirsk-gorno-altaysk"],
    relatedRegions: ["baikal"],
  },
  {
    slug: "baikal",
    regionName: "Байкал",
    regionNameAcc: "Байкал",
    hubCity: "Иркутск",
    hubCitySlug: "irkutsk",
    topPointsShort: "Листвянка, Ольхон, МРС, зимний ледовый сезон",
    heroIntro:
      "Минивэн на Байкал из Иркутска. Листвянка, остров Ольхон, посёлок Малое Море. Зимой — лёд, ледовые скульптуры. Летом — пляжный отдых, треккинг. Водитель, знающий проездные участки.",
    seasons: [
      { months: "июль–сентябрь", description: "тёплый летний сезон, проходимы все маршруты" },
      { months: "февраль–март", description: "ледовый Байкал, поездка по льду на Ольхон" },
      { months: "май–июнь", description: "ранний сезон, цветение, мало туристов" },
    ],
    packingList: [
      "Зимой: ботинки с шипами, термос, очки от блика на льду",
      "Летом: купальник, репеллент, тёплая куртка на вечер",
      "Удобная обувь для пеших троп (Ольхон, Чивыркуйский залив)",
      "Документы и наличные — банкоматов на Ольхоне нет",
    ],
    multidayTours: [
      {
        name: "Иркутск → Листвянка (1 день)",
        days: 1,
        priceFrom: 12000,
        description: "Самый частый однодневный тур. Подача из любого района Иркутска, прогулка по Листвянке, рыба омуль.",
      },
      {
        name: "Иркутск → Ольхон (2 дня)",
        days: 2,
        priceFrom: 40000,
        description: "Поездка на паром МРС → Ольхон с ночёвкой водителя в Хужире.",
      },
    ],
    fleetModels: ["hyundai-h1", "toyota-hiace", "vw-multivan"],
    routes: ["irkutsk-listvyanka", "irkutsk-olkhon", "irkutsk-baikal-mrs", "irkutsk-arshan"],
    relatedRegions: ["altai", "north"],
    airportLinks: ["ikt/listvyanka", "ikt/olkhon"],
  },
  {
    slug: "crimea",
    regionName: "Крым",
    regionNameAcc: "Крым",
    hubCity: "Симферополь",
    hubCitySlug: "simferopol",
    topPointsShort: "Ялта, Алушта, Севастополь, Судак, Феодосия, Евпатория",
    heroIntro:
      "Минивэн по Крыму из Симферополя. Южный берег Крыма — Ялта, Алушта, Гурзуф. Севастополь, Балаклава, Бахчисарай. Восточный Крым — Феодосия, Судак, Коктебель. Водитель с опытом крымских дорог.",
    seasons: [
      { months: "май–октябрь", description: "основной сезон" },
      { months: "июль–август", description: "пик, лучше бронировать заранее" },
      { months: "сентябрь–октябрь", description: "бархатный сезон" },
    ],
    packingList: [
      "Купальник и пляжные принадлежности",
      "Кепка и солнцезащитный крем",
      "Удобная обувь для пеших экскурсий (Чуфут-Кале, Ласточкино гнездо)",
      "Деньги наличными — карта МИР принимается, но не везде",
    ],
    multidayTours: [
      {
        name: "Большой Южный Берег (1 день)",
        days: 1,
        priceFrom: 15000,
        description: "Ялта → Алупка → Воронцовский дворец → Ласточкино гнездо за один день.",
      },
      {
        name: "Севастополь и Бахчисарай (1 день)",
        days: 1,
        priceFrom: 18000,
        description: "Севастополь, Балаклава, Бахчисарай — историческая программа с водителем-гидом.",
      },
    ],
    fleetModels: ["vw-multivan", "hyundai-h1", "vw-caravelle"],
    routes: ["simferopol-yalta", "simferopol-alushta", "simferopol-sevastopol", "simferopol-feodosiya", "simferopol-sudak", "simferopol-evpatoriya"],
    relatedRegions: ["krasnodar-coast", "kmv"],
    airportLinks: ["sip/yalta", "sip/alushta", "sip/sevastopol", "sip/sudak"],
  },
  {
    slug: "krasnodar-coast",
    regionName: "Краснодарское побережье",
    regionNameAcc: "Краснодарское побережье",
    hubCity: "Краснодар",
    hubCitySlug: "krasnodar",
    topPointsShort: "Анапа, Геленджик, Темрюк, Тамань",
    heroIntro:
      "Минивэн по Краснодарскому побережью из Краснодара или прямо из аэропорта. Анапа, Геленджик, Новороссийск, Темрюк, Тамань. Летом — пляжи, виноградники. Круглый год — гастрономический туризм.",
    seasons: [
      { months: "май–октябрь", description: "основной сезон Чёрного моря" },
      { months: "июнь–август", description: "пик, бронировать заранее" },
      { months: "сентябрь–октябрь", description: "бархатный сезон, виноделие" },
    ],
    packingList: [
      "Купальник, пляжные принадлежности",
      "Удобная обувь для дегустаций (Абрау-Дюрсо, Тамань)",
      "Документы для гостевых дегустаций на винодельнях",
    ],
    multidayTours: [
      {
        name: "Винный тур Тамань (1 день)",
        days: 1,
        priceFrom: 22000,
        description: "Виноградники и винодельни Тамани с водителем-проводником.",
      },
      {
        name: "Краснодар → Геленджик → Анапа (1 день)",
        days: 1,
        priceFrom: 25000,
        description: "Большой круг по Черноморскому побережью.",
      },
    ],
    fleetModels: ["vw-multivan", "hyundai-h1", "vw-caravelle"],
    routes: ["krasnodar-anapa", "krasnodar-gelendzhik", "krasnodar-novorossiysk", "krasnodar-temryuk"],
    relatedRegions: ["crimea"],
    airportLinks: ["krr/anapa", "krr/gelendzhik", "aaq/anapa"],
  },
  {
    slug: "kaliningrad",
    regionName: "Калининградская область",
    regionNameAcc: "Калининградскую область",
    hubCity: "Калининград",
    hubCitySlug: "kaliningrad",
    topPointsShort: "Зеленоградск, Светлогорск, Куршская коса, Янтарный",
    heroIntro:
      "Минивэн по Калининградской области из Калининграда. Куршская коса, Зеленоградск, Светлогорск, Янтарный. Балтийское побережье, янтарные шахты, прусская архитектура.",
    seasons: [
      { months: "май–сентябрь", description: "основной сезон" },
      { months: "июль–август", description: "пик пляжного отдыха" },
      { months: "октябрь, декабрь", description: "штормовая Балтика — для любителей атмосферы" },
    ],
    packingList: [
      "Ветровка — Балтика часто холодная",
      "Удобная обувь для прогулок по Куршской косе",
      "Купальник для бальнеологических процедур в Светлогорске",
    ],
    multidayTours: [
      {
        name: "Куршская коса (1 день)",
        days: 1,
        priceFrom: 15000,
        description: "Калининград → Зеленоградск → Куршская коса → возврат. Включает въезд в нацпарк.",
      },
      {
        name: "Прибрежный круг (1 день)",
        days: 1,
        priceFrom: 18000,
        description: "Калининград → Зеленоградск → Светлогорск → Янтарный.",
      },
    ],
    fleetModels: ["vw-multivan", "hyundai-h1"],
    routes: ["kaliningrad-zelenogradsk", "kaliningrad-svetlogorsk", "kaliningrad-curonian-spit", "kaliningrad-yantarny"],
    relatedRegions: ["karelia", "north"],
    airportLinks: ["kgd/zelenogradsk", "kgd/svetlogorsk", "kgd/curonian-spit"],
  },
  {
    slug: "north",
    regionName: "Север (Мурманская область)",
    regionNameAcc: "Север",
    hubCity: "Мурманск",
    hubCitySlug: "murmansk",
    topPointsShort: "Териберка, Хибины, Кировск, северное сияние",
    heroIntro:
      "Минивэн по Мурманской области из Мурманска. Териберка, Хибины, Кировск. Зимой — северное сияние, ледовые катания. Летом — белые ночи, треккинг, рыбалка в Баренцевом море.",
    seasons: [
      { months: "ноябрь–март", description: "сезон северного сияния (Aurora Borealis)" },
      { months: "декабрь–апрель", description: "горнолыжный сезон в Хибинах" },
      { months: "июнь–август", description: "белые ночи, треккинг" },
    ],
    packingList: [
      "Зимой: −25°C и ниже, термоодежда, термос, фотоаппарат",
      "Летом: тёплая куртка даже при +20°C",
      "Удобная обувь для каменистых пляжей Териберки",
      "Документы и наличные",
    ],
    multidayTours: [
      {
        name: "Мурманск → Териберка (1 ночь)",
        days: 1,
        priceFrom: 22000,
        description: "Ночной выезд на охоту за северным сиянием. Тёплые пледы, термос с чаем.",
      },
      {
        name: "Хибины: горнолыжный (2 дня)",
        days: 2,
        priceFrom: 38000,
        description: "Мурманск → Кировск с ночёвкой водителя. Подача к подъёмникам Большого Вудъявра.",
      },
    ],
    fleetModels: ["vw-multivan", "hyundai-h1"],
    routes: ["murmansk-teriberka", "murmansk-khibiny", "murmansk-kirovsk", "aurora-borealis"],
    relatedRegions: ["karelia"],
    airportLinks: ["mmk/teriberka", "mmk/khibiny", "mmk/kirovsk"],
  },
];

// Все туристические маршруты (~30)
// Цена считается calcPrice(km) — формула не меняется. На странице маршрута показывается цена «от X ₽ за машину».
export const destinationRoutes: DestinationRouteData[] = [
  // ============ Карелия ============
  {
    regionSlug: "karelia",
    routeSlug: "spb-sortavala",
    fromCity: "СПб",
    toCity: "Сортавала",
    toCityAcc: "Сортавалу",
    km: 300,
    hours: "4 ч",
    uniqueIntro:
      "Минивэн СПб → Сортавала — самый частый маршрут в Карелию. Подача из любой точки Питера, поездка по Приморскому шоссе или через Приозерск. До 8 пассажиров с багажом, водитель, знающий регион.",
    uniqueRouteDesc:
      "Приморское шоссе → Приозерск → Сортавала. 1–2 санитарные остановки. Возможны доп.остановки: Линдуловская роща, Кирха в Лумиваара, мраморный карьер Рускеала.",
    pointsOfInterest: [
      { name: "Исторический центр Сортавалы", description: "финская архитектура начала XX века" },
      { name: "Набережная Ладоги", description: "виды на озеро, лодочная станция" },
      { name: "Парк Ваккосалми", description: "близкий к городу лесопарк с дорожками" },
      { name: "Музей Северного Приладожья", description: "история региона, артефакты карелов" },
      { name: "Рейс на Валаам", description: "от причала Сортавалы, 1 ч 15 мин" },
    ],
    specifics:
      "Сортавала — пограничная зона: для российских граждан паспорт не нужен внутри города, но при поездке к границе или на Валаам нужен паспорт. Зимой возможны снежные участки, водитель с зимней резиной.",
    seasonalNotes: "Лучше всего ехать май–сентябрь. Зимой — короткий световой день, удобнее с ночёвкой в Сортавале.",
    airportLink: "led/sortavala",
  },
  {
    regionSlug: "karelia",
    routeSlug: "spb-ruskeala",
    fromCity: "СПб",
    toCity: "Рускеала",
    toCityAcc: "Рускеалу",
    km: 380,
    hours: "5 ч",
    uniqueIntro:
      "Минивэн СПб → горный парк Рускеала через Сортавалу. Мраморный каньон, заполненный водой, подсветка вечером, прогулочные тропы. Поездка на день или с ночёвкой в Сортавале.",
    uniqueRouteDesc:
      "СПб → Сортавала → Рускеала. Дорога идёт через Приозерск и Сортавалу. От Сортавалы до Рускеалы — около 30 км по асфальтовой трассе.",
    pointsOfInterest: [
      { name: "Мраморный каньон", description: "главная локация парка, прогулка по краю" },
      { name: "Подземный маршрут", description: "экскурсия в штольни (по предварительной записи)" },
      { name: "Зиплайн над каньоном", description: "для любителей экстрима" },
      { name: "Водопады Ахвенкоски", description: "по пути, бесплатная остановка" },
    ],
    specifics:
      "Билеты в Горный парк покупаются на месте или онлайн. Лучшее время — утро (меньше людей). Зимой парк с подсветкой особенно красив.",
    seasonalNotes: "Открыт круглый год. Летом — основной сезон. Зимой — короткий световой день, лучше с ночёвкой.",
  },
  {
    regionSlug: "karelia",
    routeSlug: "spb-petrozavodsk",
    fromCity: "СПб",
    toCity: "Петрозаводск",
    toCityAcc: "Петрозаводск",
    km: 430,
    hours: "5.5 ч",
    uniqueIntro:
      "Минивэн СПб → Петрозаводск — прямой трансфер в столицу Карелии. По трассе М18 «Кола». 1–2 санитарные остановки. До 8 пассажиров с багажом.",
    uniqueRouteDesc:
      "Из СПб → КАД → М18 «Кола» → Петрозаводск. Трасса современная, без серпантинов.",
    pointsOfInterest: [
      { name: "Онежская набережная", description: "променад вдоль Онежского озера" },
      { name: "Кижи (на катере)", description: "от речного вокзала Петрозаводска" },
      { name: "Музей Кижи в городе", description: "филиал, если нет времени на остров" },
      { name: "Парк культуры", description: "центральная зона отдыха" },
    ],
    specifics:
      "Кижи — отдельная экскурсия на катере летом или по льду зимой. Билеты лучше бронировать заранее.",
    airportLink: "led/petrozavodsk",
  },
  {
    regionSlug: "karelia",
    routeSlug: "spb-kizhi",
    fromCity: "СПб",
    toCity: "Кижи (через Петрозаводск)",
    toCityAcc: "Кижи",
    km: 450,
    hours: "6 ч",
    uniqueIntro:
      "Минивэн СПб → Петрозаводск → катер на Кижи. Деревянная архитектура XVIII века, объект ЮНЕСКО. Поездка на 2 дня с ночёвкой водителя в Петрозаводске.",
    uniqueRouteDesc:
      "СПб → Петрозаводск (на минивэне) → катер на остров Кижи → обратно в Петрозаводск → СПб. Катер занимает 1 ч 15 мин в одну сторону.",
    pointsOfInterest: [
      { name: "Преображенская церковь", description: "22 купола, шедевр деревянного зодчества" },
      { name: "Покровская церковь", description: "9 куполов, рядом с Преображенской" },
      { name: "Колокольня", description: "виды на ансамбль и Онежское озеро" },
      { name: "Дом крестьянина Ошевнева", description: "типичный карельский дом XIX века" },
    ],
    specifics:
      "Катера ходят с мая по октябрь. Зимой — только по льду на хивусах (специальная техника). Билеты лучше брать заранее.",
  },
  {
    regionSlug: "karelia",
    routeSlug: "spb-valaam",
    fromCity: "СПб",
    toCity: "Валаам (через Сортавалу)",
    toCityAcc: "Валаам",
    km: 320,
    hours: "5 ч",
    uniqueIntro:
      "Минивэн СПб → Сортавала → рейс на Валаам. Спасо-Преображенский монастырь, скиты, природа. Поездка на день или с ночёвкой на острове.",
    uniqueRouteDesc:
      "СПб → Сортавала → причал → рейс на Валаам (1 ч 15 мин). Возврат тем же путём.",
    pointsOfInterest: [
      { name: "Спасо-Преображенский монастырь", description: "главный храм Валаама" },
      { name: "Никольский скит", description: "на отдельном острове, добраться лодкой" },
      { name: "Гефсиманский скит", description: "пешая прогулка" },
      { name: "Святой остров", description: "монашеская обитель" },
    ],
    specifics:
      "Зимой — только по льду на хивусах. Летом — обычный пассажирский рейс. Документы нужны для прохода на остров (паспорт).",
  },
  {
    regionSlug: "karelia",
    routeSlug: "spb-priozersk",
    fromCity: "СПб",
    toCity: "Приозерск",
    toCityAcc: "Приозерск",
    km: 145,
    hours: "2 ч",
    uniqueIntro:
      "Минивэн СПб → Приозерск — короткий трансфер к крепости Корела на Ладоге. Удобен как самостоятельная поездка или промежуточный пункт по дороге в Сортавалу.",
    uniqueRouteDesc:
      "СПб → КАД → А-121 «Сортавала» → Приозерск. Дорога вдоль Ладоги, виды на озеро.",
    pointsOfInterest: [
      { name: "Крепость Корела", description: "средневековая шведская крепость" },
      { name: "Городской пляж", description: "у Ладоги, песчаный" },
      { name: "Лютеранская кирха", description: "архитектура XIX века" },
    ],
    specifics: "Хорошее место для семейной поездки. Зимой — крепость особенно атмосферна.",
  },

  // ============ КМВ ============
  {
    regionSlug: "kmv",
    routeSlug: "mineralnye-vody-kislovodsk",
    fromCity: "Минеральные Воды",
    toCity: "Кисловодск",
    toCityAcc: "Кисловодск",
    km: 60,
    hours: "1 ч",
    uniqueIntro:
      "Минивэн Минводы → Кисловодск — самый частый трансфер из аэропорта. До 8 пассажиров с багажом. Подача к терминалу с табличкой по фамилии.",
    uniqueRouteDesc:
      "По А-157 через Ессентуки и Пятигорск или прямо в Кисловодск. Дорога — современная двухполосная.",
    pointsOfInterest: [
      { name: "Курортный парк", description: "крупнейший парк России" },
      { name: "Нарзанная галерея", description: "источник минеральной воды" },
      { name: "Гора Кольцо", description: "природный памятник" },
      { name: "Долина Роз", description: "цветение в июне–октябре" },
    ],
    specifics: "Кисловодск — главный курорт КМВ. Здесь много санаториев, лучшие отели — на ул. Ермолова и Курортной.",
    airportLink: "mrv/kislovodsk",
  },
  {
    regionSlug: "kmv",
    routeSlug: "mineralnye-vody-pyatigorsk",
    fromCity: "Минеральные Воды",
    toCity: "Пятигорск",
    toCityAcc: "Пятигорск",
    km: 25,
    hours: "30 мин",
    uniqueIntro:
      "Минивэн Минводы → Пятигорск — короткий трансфер. До 8 пассажиров. Подача к терминалу.",
    uniqueRouteDesc:
      "Прямая дорога по А-157, без серпантинов. Время в пути зависит от пробок в Пятигорске.",
    pointsOfInterest: [
      { name: "Гора Машук", description: "канатная дорога, обзорная площадка" },
      { name: "Грот Лермонтова", description: "литературный памятник" },
      { name: "Цветник", description: "центр Пятигорска с галереями" },
      { name: "Бесстыжие ванны", description: "природные тёплые ванны на горе" },
    ],
    specifics: "Пятигорск — самый «лермонтовский» город КМВ. Здесь поэт провёл последние годы.",
    airportLink: "mrv/pyatigorsk",
  },
  {
    regionSlug: "kmv",
    routeSlug: "mineralnye-vody-essentuki",
    fromCity: "Минеральные Воды",
    toCity: "Ессентуки",
    toCityAcc: "Ессентуки",
    km: 45,
    hours: "45 мин",
    uniqueIntro:
      "Минивэн Минводы → Ессентуки — трансфер к курортной части КМВ. До 8 пассажиров. Подача к санаторию по согласованию.",
    uniqueRouteDesc: "По А-157, прямая дорога.",
    pointsOfInterest: [
      { name: "Грязелечебница Ессентуки", description: "архитектурный памятник, лечебная грязь" },
      { name: "Курортный парк", description: "питьевые галереи №17, №4" },
      { name: "Колоннада", description: "центр Ессентуков" },
    ],
    specifics: "Ессентуки — питьевые курорты, главные источники №17 и №4.",
    airportLink: "mrv/essentuki",
  },
  {
    regionSlug: "kmv",
    routeSlug: "mineralnye-vody-zheleznovodsk",
    fromCity: "Минеральные Воды",
    toCity: "Железноводск",
    toCityAcc: "Железноводск",
    km: 30,
    hours: "40 мин",
    uniqueIntro:
      "Минивэн Минводы → Железноводск — короткий трансфер. До 8 пассажиров. Самый маленький и уютный курорт КМВ.",
    uniqueRouteDesc: "По А-157, развязка на Железноводск.",
    pointsOfInterest: [
      { name: "Каскадная лестница", description: "новая, открыта в 2019, виды на гору Бештау" },
      { name: "Курортный парк", description: "источники у подножия горы Железной" },
      { name: "Дворец Эмира Бухарского", description: "архитектурный памятник" },
    ],
    specifics: "Железноводск — самый компактный курорт КМВ, удобен для пожилых.",
  },
  {
    regionSlug: "kmv",
    routeSlug: "mineralnye-vody-dombay",
    fromCity: "Минеральные Воды",
    toCity: "Домбай",
    toCityAcc: "Домбай",
    km: 220,
    hours: "3.5 ч",
    uniqueIntro:
      "Минивэн Минводы → Домбай — горнолыжный трансфер. Зимой — лыжи/сноуборды, летом — горные походы. Багаж + лыжи внутри салона или на крыше.",
    uniqueRouteDesc:
      "Минводы → Карачаевск → Тебердинский нацпарк → Домбай. Серпантин с видами на горы.",
    pointsOfInterest: [
      { name: "Канатные дороги Домбая", description: "до 3168 м, виды на Кавказский хребет" },
      { name: "Тебердинский заповедник", description: "по пути, остановка для фото" },
      { name: "Озеро Туманлы-Кёль", description: "горное озеро у Домбая" },
    ],
    specifics: "Зимой — обязательна зимняя резина, водитель с опытом горного вождения. Билеты на канатки бронируются на месте.",
    airportLink: "mrv/dombay",
  },
  {
    regionSlug: "kmv",
    routeSlug: "mineralnye-vody-arkhyz",
    fromCity: "Минеральные Воды",
    toCity: "Архыз",
    toCityAcc: "Архыз",
    km: 200,
    hours: "3.5 ч",
    uniqueIntro:
      "Минивэн Минводы → Архыз — современный горнолыжный курорт. До 8 пассажиров с лыжами. Подача к подъёмникам или отелям.",
    uniqueRouteDesc:
      "Минводы → Невинномысск → Зеленчукская → Архыз. Дорога в основном по равнине, последние 30 км — горный серпантин.",
    pointsOfInterest: [
      { name: "Северный склон", description: "основная зона катания" },
      { name: "Южный склон", description: "более лёгкие трассы для семей с детьми" },
      { name: "Софийские озёра", description: "летом — пеший маршрут" },
    ],
    specifics: "Архыз — самый современный курорт Кавказа. Гостиницы в основном новые. Зимой — пиковый сезон.",
    airportLink: "mrv/arkhyz",
  },
  {
    regionSlug: "kmv",
    routeSlug: "mineralnye-vody-elbrus",
    fromCity: "Минеральные Воды",
    toCity: "Приэльбрусье",
    toCityAcc: "Приэльбрусье",
    km: 200,
    hours: "3.5 ч",
    uniqueIntro:
      "Минивэн Минводы → Приэльбрусье — к самой высокой горе Европы. Терскол, поляна Азау. Зимой — лыжи, летом — треккинг и восхождения.",
    uniqueRouteDesc:
      "Минводы → Нальчик → Терскол. Последние 20 км — горный серпантин. Возможна остановка в Нальчике.",
    pointsOfInterest: [
      { name: "Канатная дорога Эльбруса", description: "до 3847 м, виды на двуглавую вершину" },
      { name: "Поляна Азау", description: "основной центр катания" },
      { name: "Терскольская обсерватория", description: "по пути на канатке" },
    ],
    specifics: "Погранзона — нужен паспорт. Зимой возможны закрытия дороги при сильных снегопадах.",
    airportLink: "mrv/elbrus",
  },

  // ============ Алтай (5 маршрутов) ============
  {
    regionSlug: "altai",
    routeSlug: "barnaul-chemal",
    fromCity: "Барнаул",
    toCity: "Чемал",
    toCityAcc: "Чемал",
    km: 380,
    hours: "5 ч",
    uniqueIntro:
      "Минивэн Барнаул → Чемал — на курорт Чемальский. Острова Патмос, ГЭС, треккинговые тропы.",
    uniqueRouteDesc:
      "Барнаул → Бийск → Горно-Алтайск → Чемал по Чуйскому тракту. Дорога живописная, после Бийска — горные виды.",
    pointsOfInterest: [
      { name: "Остров Патмос", description: "храм на отдельном утёсе" },
      { name: "Чемальская ГЭС", description: "историческая электростанция" },
      { name: "Голубые озёра", description: "природный памятник по дороге" },
    ],
    specifics: "Чемал — самый цивилизованный курорт Алтая. Много гостевых домов и кафе.",
  },
  {
    regionSlug: "altai",
    routeSlug: "barnaul-manzherok",
    fromCity: "Барнаул",
    toCity: "Манжерок",
    toCityAcc: "Манжерок",
    km: 320,
    hours: "4 ч",
    uniqueIntro:
      "Минивэн Барнаул → Манжерок — на молодой горнолыжный курорт и озеро Манжерокское.",
    uniqueRouteDesc: "По Чуйскому тракту через Бийск.",
    pointsOfInterest: [
      { name: "Озеро Манжерокское", description: "тихое горное озеро" },
      { name: "Канатная дорога Манжерок", description: "до Малой Синюхи, виды" },
      { name: "Скала Чёрный Камень", description: "видовая точка" },
    ],
    specifics: "Манжерок — современный курорт, гостиницы новые, инфраструктура развита.",
  },
  {
    regionSlug: "altai",
    routeSlug: "barnaul-belukha",
    fromCity: "Барнаул",
    toCity: "Тюнгур (подъезд к Белухе)",
    toCityAcc: "Тюнгур",
    km: 750,
    hours: "11 ч",
    uniqueIntro:
      "Минивэн Барнаул → Тюнгур — подъезд к Белухе, высшей точке Сибири. Только многодневный тур с ночёвками. До 8 пассажиров.",
    uniqueRouteDesc:
      "Длинная поездка по Чуйскому тракту → Усть-Кокса → Тюнгур. Возможны санитарные остановки и обеды.",
    pointsOfInterest: [
      { name: "Тюнгур", description: "начальная точка треккинговых маршрутов к Белухе" },
      { name: "Гора Белуха", description: "видна из села в ясную погоду" },
      { name: "Долина Катуни", description: "верхний участок реки" },
    ],
    specifics: "Только летом (июнь–сентябрь). Зимой дорога перекрыта снегом. Документы — погранзона.",
  },
  {
    regionSlug: "altai",
    routeSlug: "barnaul-chulyshman",
    fromCity: "Барнаул",
    toCity: "Долина Чулышмана",
    toCityAcc: "Долину Чулышмана",
    km: 700,
    hours: "10 ч",
    uniqueIntro:
      "Минивэн Барнаул → долина Чулышмана — одно из самых живописных мест Алтая. Перевал Кату-Ярык, водопад Учар.",
    uniqueRouteDesc:
      "По Чуйскому тракту до Акташа → горный перевал Кату-Ярык → долина Чулышмана. Последние участки — гравий и серпантин.",
    pointsOfInterest: [
      { name: "Перевал Кату-Ярык", description: "крутой серпантин, виды" },
      { name: "Долина Чулышмана", description: "уникальный ландшафт" },
      { name: "Водопад Учар", description: "пеший маршрут от южного берега Телецкого" },
    ],
    specifics: "Только летом. Полный привод желателен (не на всех минивэнах). Многодневный тур.",
  },
  {
    regionSlug: "altai",
    routeSlug: "novosibirsk-gorno-altaysk",
    fromCity: "Новосибирск",
    toCity: "Горно-Алтайск",
    toCityAcc: "Горно-Алтайск",
    km: 460,
    hours: "6 ч",
    uniqueIntro:
      "Минивэн Новосибирск → Горно-Алтайск — прямой трансфер из аэропорта Толмачёво в столицу Алтая. До 8 пассажиров.",
    uniqueRouteDesc: "По М52 через Бийск.",
    pointsOfInterest: [
      { name: "Национальный музей Алтая", description: "включая мумию Принцессы Укока" },
      { name: "Парк культуры", description: "обзорная гора Тугая" },
    ],
    specifics: "Горно-Алтайск — отправная точка во все алтайские маршруты.",
  },

  // ============ Байкал (4 маршрута) ============
  {
    regionSlug: "baikal",
    routeSlug: "irkutsk-listvyanka",
    fromCity: "Иркутск",
    toCity: "Листвянка",
    toCityAcc: "Листвянку",
    km: 70,
    hours: "1.5 ч",
    uniqueIntro:
      "Минивэн Иркутск → Листвянка — самый частый Байкальский маршрут. Подача из любой точки города. До 8 пассажиров.",
    uniqueRouteDesc: "По Байкальскому тракту, прямая дорога.",
    pointsOfInterest: [
      { name: "Шаман-камень", description: "у истока Ангары" },
      { name: "Байкальский музей", description: "история и фауна озера" },
      { name: "Канатная дорога на Камень Черского", description: "обзорная точка" },
      { name: "Рыбный рынок", description: "омуль свежий и копчёный" },
    ],
    specifics: "Зимой — лёд у берега, отличные виды. Летом — пляжный отдых.",
    airportLink: "ikt/listvyanka",
  },
  {
    regionSlug: "baikal",
    routeSlug: "irkutsk-olkhon",
    fromCity: "Иркутск",
    toCity: "Ольхон",
    toCityAcc: "Ольхон",
    km: 300,
    hours: "5–6 ч",
    uniqueIntro:
      "Минивэн Иркутск → Ольхон — главный остров Байкала. Через паромную переправу МРС. Зимой — по льду.",
    uniqueRouteDesc:
      "Иркутск → МРС (паром) → Хужир (главный посёлок Ольхона). Зимой — по льду без парома.",
    pointsOfInterest: [
      { name: "Скала Шаманка", description: "символ Ольхона" },
      { name: "Мыс Хобой", description: "северная оконечность острова" },
      { name: "Песчаное", description: "пляж" },
      { name: "Хужирский музей", description: "история острова" },
    ],
    specifics: "Лето — паром (очереди). Зима — лёд. Межсезонье (ноябрь, апрель) — труднодоступен.",
    airportLink: "ikt/olkhon",
  },
  {
    regionSlug: "baikal",
    routeSlug: "irkutsk-baikal-mrs",
    fromCity: "Иркутск",
    toCity: "Малое Море (МРС)",
    toCityAcc: "Малое Море",
    km: 240,
    hours: "4 ч",
    uniqueIntro:
      "Минивэн Иркутск → Малое Море (МРС) — береговая часть Байкала, отели и базы отдыха. До 8 пассажиров.",
    uniqueRouteDesc: "По Качугскому тракту → Еланцы → МРС.",
    pointsOfInterest: [
      { name: "Базы отдыха", description: "много гостевых домов и кэмпингов" },
      { name: "Курыкская пещера", description: "по пути" },
      { name: "Тажеранская степь", description: "уникальный ландшафт" },
    ],
    specifics: "Хорошее место для длительного отдыха. Свежая байкальская рыба.",
  },
  {
    regionSlug: "baikal",
    routeSlug: "irkutsk-arshan",
    fromCity: "Иркутск",
    toCity: "Аршан",
    toCityAcc: "Аршан",
    km: 200,
    hours: "3.5 ч",
    uniqueIntro:
      "Минивэн Иркутск → Аршан — курорт минеральных источников у Тункинской долины. До 8 пассажиров.",
    uniqueRouteDesc: "Через Култук → Тункинская долина → Аршан.",
    pointsOfInterest: [
      { name: "Источники минеральной воды", description: "целебные, бесплатные" },
      { name: "Буддийский дацан", description: "архитектура" },
      { name: "Тропа на пик Любви", description: "пеший маршрут" },
    ],
    specifics: "Курорт круглый год, но летом — пик. Зимой — лыжные базы.",
  },

  // ============ Крым (6 маршрутов) ============
  {
    regionSlug: "crimea",
    routeSlug: "simferopol-yalta",
    fromCity: "Симферополь",
    toCity: "Ялта",
    toCityAcc: "Ялту",
    km: 85,
    hours: "1.5 ч",
    uniqueIntro:
      "Минивэн Симферополь → Ялта — самый частый крымский трансфер. До 8 пассажиров. Подача к терминалу аэропорта или в город.",
    uniqueRouteDesc:
      "По Ангарскому перевалу → Гурзуф → Ялта. Дорога — горный серпантин с видами на Чёрное море.",
    pointsOfInterest: [
      { name: "Ласточкино гнездо", description: "символ Крыма, замок над морем" },
      { name: "Воронцовский дворец", description: "в Алупке, по пути" },
      { name: "Никитский ботанический сад", description: "уникальная коллекция растений" },
      { name: "Набережная Ялты", description: "центр города" },
    ],
    specifics: "Зимой — могут быть гололёд на Ангарском перевале. Водитель с зимней резиной.",
    airportLink: "sip/yalta",
  },
  {
    regionSlug: "crimea",
    routeSlug: "simferopol-alushta",
    fromCity: "Симферополь",
    toCity: "Алушта",
    toCityAcc: "Алушту",
    km: 50,
    hours: "1 ч",
    uniqueIntro:
      "Минивэн Симферополь → Алушта — короткий трансфер. До 8 пассажиров.",
    uniqueRouteDesc: "По Ангарскому перевалу.",
    pointsOfInterest: [
      { name: "Набережная Алушты", description: "центральная" },
      { name: "Долина привидений", description: "природный памятник" },
      { name: "Крепость Алустон", description: "историческая часть" },
    ],
    specifics: "Алушта — частые семейные курорты, домашние гостиницы.",
    airportLink: "sip/alushta",
  },
  {
    regionSlug: "crimea",
    routeSlug: "simferopol-sevastopol",
    fromCity: "Симферополь",
    toCity: "Севастополь",
    toCityAcc: "Севастополь",
    km: 80,
    hours: "1.5 ч",
    uniqueIntro:
      "Минивэн Симферополь → Севастополь — трансфер в город-герой и Балаклаву.",
    uniqueRouteDesc: "По трассе «Таврида» — современная скоростная.",
    pointsOfInterest: [
      { name: "Графская пристань", description: "исторический центр Севастополя" },
      { name: "Балаклавская бухта", description: "уникальная закрытая бухта" },
      { name: "Херсонес Таврический", description: "археологический комплекс" },
      { name: "35-я береговая батарея", description: "мемориал" },
    ],
    specifics: "Севастополь — флотский город, есть особенности с фото и режимными объектами.",
    airportLink: "sip/sevastopol",
  },
  {
    regionSlug: "crimea",
    routeSlug: "simferopol-feodosiya",
    fromCity: "Симферополь",
    toCity: "Феодосия",
    toCityAcc: "Феодосию",
    km: 115,
    hours: "2 ч",
    uniqueIntro:
      "Минивэн Симферополь → Феодосия — на восточный Крым. Картинная галерея Айвазовского, древняя крепость.",
    uniqueRouteDesc: "По трассе «Таврида».",
    pointsOfInterest: [
      { name: "Галерея Айвазовского", description: "крупнейшая коллекция работ художника" },
      { name: "Генуэзская крепость", description: "средневековые стены" },
      { name: "Набережная Феодосии", description: "пляжная зона" },
    ],
    specifics: "Феодосия — спокойный семейный курорт.",
  },
  {
    regionSlug: "crimea",
    routeSlug: "simferopol-sudak",
    fromCity: "Симферополь",
    toCity: "Судак",
    toCityAcc: "Судак",
    km: 100,
    hours: "2 ч",
    uniqueIntro:
      "Минивэн Симферополь → Судак — на восточный Крым к Генуэзской крепости.",
    uniqueRouteDesc: "Через Белогорск.",
    pointsOfInterest: [
      { name: "Генуэзская крепость Судак", description: "крупнейшая в Крыму" },
      { name: "Новый Свет", description: "посёлок с дегустационным заводом шампанского" },
      { name: "Тропа Голицына", description: "пешеходный маршрут вдоль моря" },
    ],
    specifics: "Хорошее место для гастротуризма — шампанское «Новый Свет».",
    airportLink: "sip/sudak",
  },
  {
    regionSlug: "crimea",
    routeSlug: "simferopol-evpatoriya",
    fromCity: "Симферополь",
    toCity: "Евпатория",
    toCityAcc: "Евпаторию",
    km: 65,
    hours: "1 ч",
    uniqueIntro:
      "Минивэн Симферополь → Евпатория — на западный Крым. Песчаные пляжи, мелководье, семейный курорт.",
    uniqueRouteDesc: "По трассе через Саки.",
    pointsOfInterest: [
      { name: "Старый город", description: "татарская архитектура" },
      { name: "Грязевые лечебницы Сак", description: "по пути" },
      { name: "Песчаные пляжи", description: "лучшие для семей с детьми" },
    ],
    specifics: "Евпатория — самый семейный курорт Крыма.",
  },

  // ============ Краснодарское побережье (4 маршрута) ============
  {
    regionSlug: "krasnodar-coast",
    routeSlug: "krasnodar-anapa",
    fromCity: "Краснодар",
    toCity: "Анапа",
    toCityAcc: "Анапу",
    km: 165,
    hours: "2.5 ч",
    uniqueIntro:
      "Минивэн Краснодар → Анапа — семейный курорт с песчаными пляжами. До 8 пассажиров.",
    uniqueRouteDesc: "По А-290 через Темрюк.",
    pointsOfInterest: [
      { name: "Центральный пляж Анапы", description: "песчаный, мелководный" },
      { name: "Археологический музей «Горгиппия»", description: "античные раскопки" },
      { name: "Утриш", description: "природный заповедник" },
    ],
    specifics: "Анапа — семейный курорт, много детских санаториев.",
  },
  {
    regionSlug: "krasnodar-coast",
    routeSlug: "krasnodar-gelendzhik",
    fromCity: "Краснодар",
    toCity: "Геленджик",
    toCityAcc: "Геленджик",
    km: 200,
    hours: "3 ч",
    uniqueIntro:
      "Минивэн Краснодар → Геленджик — курортная бухта Чёрного моря. До 8 пассажиров.",
    uniqueRouteDesc: "По М4 «Дон» → Новороссийск → Геленджик. Последние 25 км — серпантин через Маркотхский хребет.",
    pointsOfInterest: [
      { name: "Канатная дорога «Олимп»", description: "виды на бухту" },
      { name: "Сафари-парк", description: "семейная локация" },
      { name: "Скала «Парус»", description: "природный памятник" },
    ],
    specifics: "Геленджик — закрытая бухта, хорошие пляжи, шумные летом.",
  },
  {
    regionSlug: "krasnodar-coast",
    routeSlug: "krasnodar-novorossiysk",
    fromCity: "Краснодар",
    toCity: "Новороссийск",
    toCityAcc: "Новороссийск",
    km: 150,
    hours: "2.5 ч",
    uniqueIntro:
      "Минивэн Краснодар → Новороссийск — портовый город-герой. Виноградники Абрау-Дюрсо.",
    uniqueRouteDesc: "По М4.",
    pointsOfInterest: [
      { name: "Цемесская бухта", description: "крупнейший порт Юга" },
      { name: "Винодельня Абрау-Дюрсо", description: "дегустации, экскурсии" },
      { name: "Мемориал «Малая земля»", description: "память героев войны" },
    ],
    specifics: "Не пляжный город, но интересный для гастротуризма и истории.",
  },
  {
    regionSlug: "krasnodar-coast",
    routeSlug: "krasnodar-temryuk",
    fromCity: "Краснодар",
    toCity: "Темрюк / Тамань",
    toCityAcc: "Темрюк",
    km: 130,
    hours: "2 ч",
    uniqueIntro:
      "Минивэн Краснодар → Темрюк / Тамань — винные туры, азовские пляжи. До 8 пассажиров.",
    uniqueRouteDesc: "По А-290.",
    pointsOfInterest: [
      { name: "Винодельни Тамани", description: "Гай-Кодзор, Шато Тамань" },
      { name: "Тамань (станица)", description: "лермонтовские места" },
      { name: "Грязевой вулкан Тиздар", description: "природный памятник" },
    ],
    specifics: "Лучше совмещать с винодельнями. Многие места требуют записи.",
  },

  // ============ Калининград (4 маршрута) ============
  {
    regionSlug: "kaliningrad",
    routeSlug: "kaliningrad-zelenogradsk",
    fromCity: "Калининград",
    toCity: "Зеленоградск",
    toCityAcc: "Зеленоградск",
    km: 35,
    hours: "45 мин",
    uniqueIntro:
      "Минивэн Калининград → Зеленоградск — самый ближний морской курорт. До 8 пассажиров.",
    uniqueRouteDesc: "Прямая трасса.",
    pointsOfInterest: [
      { name: "Курортный променад", description: "пешеходная зона у моря" },
      { name: "Музей кошек", description: "символ Зеленоградска" },
      { name: "Бювет минеральной воды", description: "бесплатно" },
    ],
    specifics: "Уютный курорт, лучше других сохранил прусскую архитектуру.",
    airportLink: "kgd/zelenogradsk",
  },
  {
    regionSlug: "kaliningrad",
    routeSlug: "kaliningrad-svetlogorsk",
    fromCity: "Калининград",
    toCity: "Светлогорск",
    toCityAcc: "Светлогорск",
    km: 45,
    hours: "1 ч",
    uniqueIntro:
      "Минивэн Калининград → Светлогорск — морской курорт с бальнеологией. До 8 пассажиров.",
    uniqueRouteDesc: "Прямая дорога.",
    pointsOfInterest: [
      { name: "Канатная дорога к морю", description: "удобный спуск" },
      { name: "Водонапорная башня", description: "архитектурный памятник" },
      { name: "Орган в Кирхе Раушен", description: "концерты органной музыки" },
    ],
    specifics: "Светлогорск — самый бальнеологический курорт побережья.",
    airportLink: "kgd/svetlogorsk",
  },
  {
    regionSlug: "kaliningrad",
    routeSlug: "kaliningrad-curonian-spit",
    fromCity: "Калининград",
    toCity: "Куршская коса",
    toCityAcc: "Куршскую косу",
    km: 50,
    hours: "1.5 ч",
    uniqueIntro:
      "Минивэн Калининград → Куршская коса — национальный парк, объект ЮНЕСКО. Танцующий лес, дюна Эфа.",
    uniqueRouteDesc: "Через Зеленоградск, далее в нацпарк.",
    pointsOfInterest: [
      { name: "Танцующий лес", description: "загадочно искривлённые сосны" },
      { name: "Дюна Эфа", description: "крупнейшая в Европе" },
      { name: "Орнитологическая станция", description: "птичье кольцевание" },
    ],
    specifics: "Въезд в нацпарк — платный. Билет включается в чек по согласованию.",
    airportLink: "kgd/curonian-spit",
  },
  {
    regionSlug: "kaliningrad",
    routeSlug: "kaliningrad-yantarny",
    fromCity: "Калининград",
    toCity: "Янтарный",
    toCityAcc: "Янтарный",
    km: 50,
    hours: "1 ч",
    uniqueIntro:
      "Минивэн Калининград → Янтарный — посёлок с янтарным комбинатом и лучшими пляжами Балтики.",
    uniqueRouteDesc: "Прямая трасса.",
    pointsOfInterest: [
      { name: "Янтарный комбинат", description: "крупнейшее месторождение янтаря в мире" },
      { name: "Голубой флаг — пляж Янтарного", description: "лучший пляж Балтики" },
      { name: "Парк Беккера", description: "историческая часть" },
    ],
    specifics: "Хорошо совмещать с поездкой на Куршскую косу.",
  },

  // ============ Север (4 маршрута / лендинга) ============
  {
    regionSlug: "north",
    routeSlug: "murmansk-teriberka",
    fromCity: "Мурманск",
    toCity: "Териберка",
    toCityAcc: "Териберку",
    km: 120,
    hours: "2.5 ч",
    uniqueIntro:
      "Минивэн Мурманск → Териберка — на Баренцево море. Знаменитая «Левиафанская» деревня. Сезон сияния — ноябрь–март.",
    uniqueRouteDesc:
      "Из Мурманска по Кольской трассе. Дорога — асфальт, последние 40 км — гравий. Зимой — снежные участки.",
    pointsOfInterest: [
      { name: "Кладбище кораблей", description: "ржавые корпуса на берегу" },
      { name: "Артпарк «Териберка»", description: "арт-инсталляции" },
      { name: "Батарейский водопад", description: "пеший маршрут от посёлка" },
      { name: "Качели у моря", description: "знаменитая фотолокация" },
    ],
    specifics: "Зимой — мощные ветра. Полный привод желателен. Сейчас популярное направление, бронировать заранее.",
    airportLink: "mmk/teriberka",
  },
  {
    regionSlug: "north",
    routeSlug: "murmansk-khibiny",
    fromCity: "Мурманск",
    toCity: "Хибины (Кировск)",
    toCityAcc: "Хибины",
    km: 240,
    hours: "3.5 ч",
    uniqueIntro:
      "Минивэн Мурманск → Кировск — горнолыжный курорт Большой Вудъявр. До 8 пассажиров с лыжами.",
    uniqueRouteDesc: "По М18 «Кола» → Апатиты → Кировск.",
    pointsOfInterest: [
      { name: "Канатная дорога Большой Вудъявр", description: "12 трасс" },
      { name: "Снежная деревня", description: "ледовые скульптуры (зима)" },
      { name: "Музей камня Сейдозеро", description: "коллекция минералов" },
    ],
    specifics: "Сезон ноябрь–май. Длинные склоны, перепад высот 550 м.",
    airportLink: "mmk/khibiny",
  },
  {
    regionSlug: "north",
    routeSlug: "murmansk-kirovsk",
    fromCity: "Мурманск",
    toCity: "Кировск",
    toCityAcc: "Кировск",
    km: 220,
    hours: "3 ч",
    uniqueIntro:
      "Минивэн Мурманск → Кировск — главный горнолыжный город Хибин. До 8 пассажиров.",
    uniqueRouteDesc: "Прямая трасса М18.",
    pointsOfInterest: [
      { name: "Полярно-альпийский ботанический сад", description: "уникальная коллекция" },
      { name: "Озеро Большой Вудъявр", description: "горное озеро" },
      { name: "Парк Кировска", description: "центральная зона отдыха" },
    ],
    specifics: "Кировск — старый шахтёрский город с интересной советской архитектурой.",
    airportLink: "mmk/kirovsk",
  },
  {
    regionSlug: "north",
    routeSlug: "aurora-borealis",
    fromCity: "Мурманск",
    toCity: "Охота за северным сиянием",
    toCityAcc: "сияние",
    km: 120,
    hours: "1 ночь",
    uniqueIntro:
      "Минивэн на охоту за северным сиянием. Из Мурманска в Териберку или в район Хибин — где меньше засветка. Сезон ноябрь–март. До 8 человек, тёплые пледы, термос с чаем.",
    uniqueRouteDesc:
      "Из Мурманска по маршруту в Териберку или в окрестности Кировска. Водитель следит за прогнозом активности и подбирает точку. Возможны несколько остановок.",
    pointsOfInterest: [
      { name: "Точка наблюдения", description: "выбирается по прогнозу" },
      { name: "Тёплая база", description: "обогрев между выходами" },
      { name: "Точки фото", description: "лучшие ракурсы по сезону" },
    ],
    specifics:
      "Гарантии сияния нет — это природное явление. Лучшее время — после 22:00. Если не увидели — рекомендация повторной поездки со скидкой 30%.",
    seasonalNotes: "Сезон: ноябрь–март. Пик активности: декабрь–февраль.",
  },
];

export function getDestinationHub(slug: string): DestinationHubData | null {
  return destinationHubs.find((h) => h.slug === slug) ?? null;
}

export function getDestinationRoute(regionSlug: string, routeSlug: string): DestinationRouteData | null {
  return (
    destinationRoutes.find(
      (r) => r.regionSlug === regionSlug && r.routeSlug === routeSlug
    ) ?? null
  );
}

export function getDestinationRoutesByRegion(regionSlug: string): DestinationRouteData[] {
  return destinationRoutes.filter((r) => r.regionSlug === regionSlug);
}

export const destinationHubsBySlug: Record<string, DestinationHubData> = destinationHubs.reduce(
  (acc, h) => {
    acc[h.slug] = h;
    return acc;
  },
  {} as Record<string, DestinationHubData>
);
