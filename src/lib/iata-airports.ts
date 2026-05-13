// Справочник 14 IATA-хабов с метаданными для новой иерархии /airport/{iata}/

export interface IataAirport {
  iata: string;
  name: string;
  nameFull: string;
  city: string;
  citySlug: string;
  region: string;
  kmToCenter: number;
  terminals: { code: string; description: string }[];
  fleet: string[];
  legacyAirportSlug?: string;
}

export const iataAirports: IataAirport[] = [
  {
    iata: "svo",
    name: "Шереметьево",
    nameFull: "Шереметьево (SVO)",
    city: "Москва",
    citySlug: "moskva",
    region: "Московская область",
    kmToCenter: 35,
    terminals: [
      { code: "B", description: "внутренние рейсы (бывший Шереметьево-1)" },
      { code: "C", description: "международные, Аэрофлот и SkyTeam" },
      { code: "D", description: "хаб Аэрофлота, внутренние и международные" },
      { code: "E", description: "международные, второстепенные направления" },
      { code: "F", description: "грузовой и чартерный (временно ограничен)" },
    ],
    fleet: ["mercedes-v-class", "vw-multivan", "hyundai-h1", "toyota-alphard", "vw-caravelle"],
    legacyAirportSlug: "sheremetyevo",
  },
  {
    iata: "vko",
    name: "Внуково",
    nameFull: "Внуково (VKO)",
    city: "Москва",
    citySlug: "moskva",
    region: "Московская область",
    kmToCenter: 30,
    terminals: [
      { code: "A", description: "основной пассажирский, внутренние и международные" },
    ],
    fleet: ["mercedes-v-class", "vw-multivan", "hyundai-h1", "vw-caravelle"],
    legacyAirportSlug: "vnukovo",
  },
  {
    iata: "dme",
    name: "Домодедово",
    nameFull: "Домодедово (DME)",
    city: "Москва",
    citySlug: "moskva",
    region: "Московская область",
    kmToCenter: 45,
    terminals: [
      { code: "T1", description: "единый пассажирский терминал" },
    ],
    fleet: ["mercedes-v-class", "vw-multivan", "hyundai-h1", "vw-caravelle"],
    legacyAirportSlug: "domodedovo",
  },
  {
    iata: "zia",
    name: "Жуковский",
    nameFull: "Жуковский (ZIA)",
    city: "Москва",
    citySlug: "moskva",
    region: "Московская область",
    kmToCenter: 65,
    terminals: [
      { code: "T1", description: "единый пассажирский терминал" },
    ],
    fleet: ["vw-multivan", "hyundai-h1", "vw-caravelle"],
  },
  {
    iata: "led",
    name: "Пулково",
    nameFull: "Пулково (LED)",
    city: "Санкт-Петербург",
    citySlug: "spb",
    region: "Ленинградская область",
    kmToCenter: 20,
    terminals: [
      { code: "T1", description: "международные и внутренние рейсы" },
      { code: "T2", description: "лоукостеры и сезонные направления" },
    ],
    fleet: ["mercedes-v-class", "vw-multivan", "hyundai-h1", "toyota-alphard"],
    legacyAirportSlug: "pulkovo",
  },
  {
    iata: "aer",
    name: "Сочи (Адлер)",
    nameFull: "Сочи (Адлер, AER)",
    city: "Сочи",
    citySlug: "sochi",
    region: "Краснодарский край",
    kmToCenter: 30,
    terminals: [
      { code: "T1", description: "международный пассажирский" },
      { code: "T2", description: "внутренние рейсы и VIP" },
    ],
    fleet: ["mercedes-v-class", "vw-multivan", "hyundai-h1", "toyota-alphard"],
    legacyAirportSlug: "adler-airport",
  },
  {
    iata: "mrv",
    name: "Минеральные Воды",
    nameFull: "Минеральные Воды (MRV)",
    city: "Минеральные Воды",
    citySlug: "mineralnye-vody",
    region: "Ставропольский край",
    kmToCenter: 10,
    terminals: [
      { code: "T1", description: "основной пассажирский" },
    ],
    fleet: ["vw-multivan", "hyundai-h1", "vw-caravelle"],
    legacyAirportSlug: "mineralnye-vody-airport",
  },
  {
    iata: "aaq",
    name: "Анапа",
    nameFull: "Анапа (AAQ)",
    city: "Анапа",
    citySlug: "anapa",
    region: "Краснодарский край",
    kmToCenter: 15,
    terminals: [
      { code: "T1", description: "основной пассажирский" },
    ],
    fleet: ["vw-multivan", "hyundai-h1", "vw-caravelle"],
  },
  {
    iata: "krr",
    name: "Краснодар",
    nameFull: "Краснодар (Пашковский, KRR)",
    city: "Краснодар",
    citySlug: "krasnodar",
    region: "Краснодарский край",
    kmToCenter: 15,
    terminals: [
      { code: "T1", description: "основной пассажирский (временно ограничен)" },
    ],
    fleet: ["vw-multivan", "hyundai-h1", "vw-caravelle"],
    legacyAirportSlug: "pashkovskiy",
  },
  {
    iata: "sip",
    name: "Симферополь",
    nameFull: "Симферополь (SIP)",
    city: "Симферополь",
    citySlug: "simferopol",
    region: "Республика Крым",
    kmToCenter: 15,
    terminals: [
      { code: "T1", description: "новый терминал «Крымская волна»" },
    ],
    fleet: ["vw-multivan", "hyundai-h1", "vw-caravelle"],
    legacyAirportSlug: "simferopol-airport",
  },
  {
    iata: "kgd",
    name: "Калининград",
    nameFull: "Калининград (Храброво, KGD)",
    city: "Калининград",
    citySlug: "kaliningrad",
    region: "Калининградская область",
    kmToCenter: 25,
    terminals: [
      { code: "T1", description: "пассажирский терминал" },
    ],
    fleet: ["vw-multivan", "hyundai-h1"],
  },
  {
    iata: "kzn",
    name: "Казань",
    nameFull: "Казань (KZN)",
    city: "Казань",
    citySlug: "kazan",
    region: "Республика Татарстан",
    kmToCenter: 25,
    terminals: [
      { code: "T1A", description: "международные рейсы" },
      { code: "T2", description: "внутренние рейсы" },
    ],
    fleet: ["vw-multivan", "hyundai-h1"],
  },
  {
    iata: "svx",
    name: "Екатеринбург (Кольцово)",
    nameFull: "Кольцово (SVX)",
    city: "Екатеринбург",
    citySlug: "ekaterinburg",
    region: "Свердловская область",
    kmToCenter: 20,
    terminals: [
      { code: "T1", description: "международные рейсы" },
      { code: "T2", description: "внутренние рейсы" },
    ],
    fleet: ["vw-multivan", "hyundai-h1"],
    legacyAirportSlug: "koltsovo",
  },
  {
    iata: "ovb",
    name: "Новосибирск (Толмачёво)",
    nameFull: "Толмачёво (OVB)",
    city: "Новосибирск",
    citySlug: "novosibirsk",
    region: "Новосибирская область",
    kmToCenter: 25,
    terminals: [
      { code: "T1", description: "международные рейсы" },
      { code: "T2", description: "внутренние рейсы" },
    ],
    fleet: ["vw-multivan", "hyundai-h1"],
    legacyAirportSlug: "tolmachyovo",
  },
  {
    iata: "ikt",
    name: "Иркутск",
    nameFull: "Иркутск (IKT)",
    city: "Иркутск",
    citySlug: "irkutsk",
    region: "Иркутская область",
    kmToCenter: 10,
    terminals: [
      { code: "T1", description: "пассажирский терминал" },
    ],
    fleet: ["vw-multivan", "hyundai-h1"],
  },
  {
    iata: "mmk",
    name: "Мурманск",
    nameFull: "Мурманск (MMK)",
    city: "Мурманск",
    citySlug: "murmansk",
    region: "Мурманская область",
    kmToCenter: 25,
    terminals: [
      { code: "T1", description: "пассажирский терминал" },
    ],
    fleet: ["vw-multivan", "hyundai-h1"],
  },
];

export function getIataAirport(iata: string): IataAirport | null {
  return iataAirports.find((a) => a.iata === iata.toLowerCase()) ?? null;
}

export function getIataByLegacySlug(legacySlug: string): IataAirport | null {
  return iataAirports.find((a) => a.legacyAirportSlug === legacySlug) ?? null;
}

export const iataList = iataAirports.map((a) => a.iata);
