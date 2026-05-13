// 10 моделей парка /fleet/{model}/

export type FleetTier = "премиум" | "комфорт" | "универсальный";

export interface FleetModel {
  slug: string;
  brand: string;
  model: string;
  fullName: string;
  tier: FleetTier;
  seats: number;
  seatsDriverIncluded?: number;
  luggageL: number;
  transmission: string;
  engine: string;
  fuelConsumption: number;
  yearRange: string;
  features: string[];
  description: string;
  whenSuitable: { title: string; description: string }[];
  pricing: { scenario: string; price: number; note: string }[];
  alternatives: string[];
  popularRoutes: string[];
}

export const fleetModels: FleetModel[] = [
  {
    slug: "mercedes-v-class",
    brand: "Mercedes-Benz",
    model: "V-class",
    fullName: "Mercedes-Benz V-class",
    tier: "премиум",
    seats: 6,
    seatsDriverIncluded: 7,
    luggageL: 1100,
    transmission: "автомат",
    engine: "2.1 turbodiesel",
    fuelConsumption: 8,
    yearRange: "2019–2023",
    features: ["Кожаный салон", "Климат 3 зоны", "Wi-Fi", "USB-зарядки", "Индивидуальные кресла", "Электропривод дверей"],
    description: "Самый комфортный минивэн в парке. Кожаный салон, климат, индивидуальные кресла. Идеален для VIP, делегаций и дальних поездок.",
    whenSuitable: [
      { title: "VIP-делегации", description: "представительский статус и комфорт" },
      { title: "Дальние поездки 500+ км", description: "комфортные кресла и шумоизоляция" },
      { title: "Свадьбы", description: "внешний вид и чистый салон" },
      { title: "Руководители компаний", description: "конфиденциальность и удобство" },
    ],
    pricing: [
      { scenario: "В аэропорт SVO/VKO/DME", price: 4500, note: "от" },
      { scenario: "Почасовая в Москве (мин 4 ч)", price: 1800, note: "за час" },
      { scenario: "Межгород", price: 65, note: "₽/км" },
      { scenario: "Сутки выезда", price: 35000, note: "от" },
    ],
    alternatives: ["vw-multivan", "toyota-alphard", "mercedes-vito"],
    popularRoutes: ["svo/moscow-center", "led/spb-center", "aer/sochi-center"],
  },
  {
    slug: "mercedes-vito",
    brand: "Mercedes-Benz",
    model: "Vito Tourer",
    fullName: "Mercedes-Benz Vito Tourer",
    tier: "комфорт",
    seats: 8,
    seatsDriverIncluded: 9,
    luggageL: 1300,
    transmission: "автомат",
    engine: "2.1 turbodiesel",
    fuelConsumption: 8.5,
    yearRange: "2018–2022",
    features: ["8 пассажиров", "Большой багажник", "Кондиционер", "USB-зарядки", "Шторки на окнах"],
    description: "Самый вместительный из премиум-парка. До 8 пассажиров с багажом. Подходит для делегаций, конференций и спортивных команд.",
    whenSuitable: [
      { title: "Группы 7–8 человек", description: "максимум пассажиров в премиум-комфорте" },
      { title: "Конференции и MICE", description: "вмещает делегацию и багаж" },
      { title: "Спортивные команды", description: "с инвентарём (баулы, рюкзаки)" },
    ],
    pricing: [
      { scenario: "В аэропорт", price: 4200, note: "от" },
      { scenario: "Почасовая в Москве", price: 1600, note: "за час" },
      { scenario: "Межгород", price: 60, note: "₽/км" },
    ],
    alternatives: ["vw-multivan", "hyundai-staria", "toyota-hiace"],
    popularRoutes: ["svo/moscow-center", "led/spb-center", "krr/anapa"],
  },
  {
    slug: "vw-multivan",
    brand: "Volkswagen",
    model: "Multivan",
    fullName: "Volkswagen Multivan T6.1",
    tier: "комфорт",
    seats: 7,
    seatsDriverIncluded: 8,
    luggageL: 900,
    transmission: "автомат / DSG",
    engine: "2.0 turbodiesel",
    fuelConsumption: 7.5,
    yearRange: "2019–2023",
    features: ["7 пассажиров", "Раздвижные двери с обеих сторон", "Климат 2 зоны", "Wi-Fi", "Поворотные кресла"],
    description: "Универсальный минивэн на 7 пассажиров. Поворотные кресла позволяют сделать переговорный салон. Идеален для туристических групп и семей.",
    whenSuitable: [
      { title: "Туристические группы 6–7 человек", description: "поездки по Карелии, Алтаю, Крыму" },
      { title: "Семьи с детьми", description: "поворотные кресла, дет.кресла бесплатно" },
      { title: "Корпоративные мероприятия", description: "переговорный салон" },
    ],
    pricing: [
      { scenario: "В аэропорт SVO/VKO/DME", price: 4000, note: "от" },
      { scenario: "Почасовая в Москве", price: 1500, note: "за час" },
      { scenario: "Межгород", price: 55, note: "₽/км" },
      { scenario: "Многодневный тур (сутки)", price: 28000, note: "от" },
    ],
    alternatives: ["mercedes-v-class", "hyundai-staria", "vw-caravelle"],
    popularRoutes: ["led/sortavala", "led/petrozavodsk", "aer/krasnaya-polyana", "mrv/dombay"],
  },
  {
    slug: "vw-caravelle",
    brand: "Volkswagen",
    model: "Caravelle",
    fullName: "Volkswagen Caravelle T6.1",
    tier: "универсальный",
    seats: 7,
    seatsDriverIncluded: 8,
    luggageL: 900,
    transmission: "автомат / механика",
    engine: "2.0 turbodiesel",
    fuelConsumption: 7.5,
    yearRange: "2017–2022",
    features: ["7 пассажиров", "Раздвижные двери", "Кондиционер", "USB-зарядки", "Тонировка"],
    description: "Универсальный минивэн начального уровня. По функционалу — почти как Multivan, но без премиум-отделки. Лучшее соотношение цены и качества.",
    whenSuitable: [
      { title: "Семейные поездки", description: "по комфорту достаточно" },
      { title: "Бюджетный трансфер в аэропорт", description: "до 6 пасс., минимальная цена" },
      { title: "Группы коллег", description: "корпоративные выезды" },
    ],
    pricing: [
      { scenario: "В аэропорт", price: 3500, note: "от" },
      { scenario: "Почасовая в Москве", price: 1300, note: "за час" },
      { scenario: "Межгород", price: 50, note: "₽/км" },
    ],
    alternatives: ["hyundai-h1", "ford-tourneo", "peugeot-traveller"],
    popularRoutes: ["svo/moscow-center", "vko/moscow-center", "dme/moscow-center"],
  },
  {
    slug: "toyota-alphard",
    brand: "Toyota",
    model: "Alphard",
    fullName: "Toyota Alphard",
    tier: "премиум",
    seats: 6,
    seatsDriverIncluded: 7,
    luggageL: 800,
    transmission: "автомат",
    engine: "3.5 бензин V6",
    fuelConsumption: 11,
    yearRange: "2018–2022",
    features: ["Кожаный салон", "Климат 4 зоны", "Подсветка салона", "Электропривод дверей", "Холодильник"],
    description: "Японский премиум-минивэн. Самый комфортный салон с индивидуальными reclining-креслами. Идеален для VIP-перевозок и долгих поездок.",
    whenSuitable: [
      { title: "VIP-делегации", description: "максимальный комфорт салона" },
      { title: "Японские/корейские гости", description: "знакомая модель" },
      { title: "Свадьбы в восточном стиле", description: "стиль и комфорт" },
    ],
    pricing: [
      { scenario: "В аэропорт", price: 5500, note: "от" },
      { scenario: "Почасовая в Москве", price: 2200, note: "за час" },
      { scenario: "Межгород", price: 80, note: "₽/км" },
    ],
    alternatives: ["mercedes-v-class", "vw-multivan"],
    popularRoutes: ["svo/moscow-center", "vko/moscow-center", "led/spb-center"],
  },
  {
    slug: "toyota-hiace",
    brand: "Toyota",
    model: "Hiace",
    fullName: "Toyota Hiace",
    tier: "универсальный",
    seats: 8,
    seatsDriverIncluded: 9,
    luggageL: 1500,
    transmission: "механика",
    engine: "2.7 бензин / 2.5 дизель",
    fuelConsumption: 9,
    yearRange: "2016–2021",
    features: ["8 пассажиров", "Огромный багажник", "Кондиционер салона", "Высокий потолок"],
    description: "Большой грузопассажирский минивэн. 8 мест + огромный багажник для съёмочной аппаратуры, спортивного инвентаря, групп с большим багажом.",
    whenSuitable: [
      { title: "Съёмочные группы", description: "оборудование внутри" },
      { title: "Спортивные команды", description: "8 человек + баулы" },
      { title: "Многодневные туры с багажом", description: "Алтай, Байкал" },
    ],
    pricing: [
      { scenario: "В аэропорт", price: 4000, note: "от" },
      { scenario: "Почасовая", price: 1500, note: "за час" },
      { scenario: "Межгород", price: 55, note: "₽/км" },
      { scenario: "Многодневный тур", price: 30000, note: "от за сутки" },
    ],
    alternatives: ["hyundai-h1", "hyundai-staria", "mercedes-vito"],
    popularRoutes: ["led/sortavala", "ikt/listvyanka"],
  },
  {
    slug: "hyundai-staria",
    brand: "Hyundai",
    model: "Staria",
    fullName: "Hyundai Staria",
    tier: "комфорт",
    seats: 8,
    seatsDriverIncluded: 9,
    luggageL: 1300,
    transmission: "автомат",
    engine: "2.2 turbodiesel",
    fuelConsumption: 8,
    yearRange: "2022–2023",
    features: ["8 пассажиров", "Большая панорамная крыша", "Климат", "USB-C зарядки", "Современный интерьер"],
    description: "Современный минивэн новой генерации. 8 пассажиров с комфортом, большая панорамная крыша, отличный обзор.",
    whenSuitable: [
      { title: "Туристические группы", description: "обзор пейзажей через панораму" },
      { title: "Семьи с детьми", description: "просторный салон" },
      { title: "Корпоративные группы", description: "8 человек с комфортом" },
    ],
    pricing: [
      { scenario: "В аэропорт", price: 4200, note: "от" },
      { scenario: "Почасовая", price: 1700, note: "за час" },
      { scenario: "Межгород", price: 60, note: "₽/км" },
    ],
    alternatives: ["vw-multivan", "mercedes-vito", "hyundai-h1"],
    popularRoutes: ["svo/moscow-center", "led/sortavala", "aer/krasnaya-polyana"],
  },
  {
    slug: "hyundai-h1",
    brand: "Hyundai",
    model: "H-1",
    fullName: "Hyundai H-1 / Grand Starex",
    tier: "универсальный",
    seats: 8,
    seatsDriverIncluded: 9,
    luggageL: 800,
    transmission: "автомат / механика",
    engine: "2.5 turbodiesel",
    fuelConsumption: 9,
    yearRange: "2015–2021",
    features: ["8 пассажиров", "Кондиционер", "Тонировка", "USB-зарядки"],
    description: "Универсальный минивэн начального уровня. 8 пассажиров, надёжный, проверенный. Лучшее предложение по цене на 8 мест.",
    whenSuitable: [
      { title: "Бюджетный групповой трансфер", description: "до 8 пасс. за минимум цену" },
      { title: "Регионы — туркластеры", description: "Алтай, Карелия, КМВ" },
      { title: "Семейные поездки", description: "функционально, без излишеств" },
    ],
    pricing: [
      { scenario: "В аэропорт", price: 3500, note: "от" },
      { scenario: "Почасовая", price: 1400, note: "за час" },
      { scenario: "Межгород", price: 50, note: "₽/км" },
    ],
    alternatives: ["vw-caravelle", "ford-tourneo", "peugeot-traveller"],
    popularRoutes: ["led/sortavala", "mrv/dombay", "ikt/listvyanka", "ovb/gorno-altaysk"],
  },
  {
    slug: "ford-tourneo",
    brand: "Ford",
    model: "Tourneo Custom",
    fullName: "Ford Tourneo Custom",
    tier: "универсальный",
    seats: 8,
    seatsDriverIncluded: 9,
    luggageL: 1000,
    transmission: "автомат",
    engine: "2.0 turbodiesel",
    fuelConsumption: 7.5,
    yearRange: "2017–2021",
    features: ["8 пассажиров", "Кондиционер", "Раздвижные двери", "USB-зарядки"],
    description: "Универсальный 8-местный минивэн. Сбалансированный по комфорту и цене, надёжный.",
    whenSuitable: [
      { title: "Группы коллег", description: "корпоративные выезды" },
      { title: "Конференции", description: "доставка делегаций" },
      { title: "Семейные поездки", description: "до 8 пассажиров" },
    ],
    pricing: [
      { scenario: "В аэропорт", price: 3800, note: "от" },
      { scenario: "Почасовая", price: 1500, note: "за час" },
      { scenario: "Межгород", price: 55, note: "₽/км" },
    ],
    alternatives: ["vw-caravelle", "hyundai-h1", "peugeot-traveller"],
    popularRoutes: ["svo/moscow-center", "vko/moscow-center"],
  },
  {
    slug: "peugeot-traveller",
    brand: "Peugeot",
    model: "Traveller",
    fullName: "Peugeot Traveller",
    tier: "универсальный",
    seats: 8,
    seatsDriverIncluded: 9,
    luggageL: 1000,
    transmission: "автомат",
    engine: "2.0 turbodiesel",
    fuelConsumption: 7,
    yearRange: "2018–2022",
    features: ["8 пассажиров", "Кондиционер", "Раздвижные двери", "Шумоизоляция"],
    description: "Французский минивэн на 8 пассажиров. Современный, экономичный, тихий.",
    whenSuitable: [
      { title: "Туристические группы 6–8 человек", description: "дальние поездки" },
      { title: "Корпоративные", description: "доставка сотрудников" },
    ],
    pricing: [
      { scenario: "В аэропорт", price: 3800, note: "от" },
      { scenario: "Почасовая", price: 1500, note: "за час" },
      { scenario: "Межгород", price: 55, note: "₽/км" },
    ],
    alternatives: ["ford-tourneo", "hyundai-h1", "vw-caravelle"],
    popularRoutes: ["svo/moscow-center", "vko/moscow-center"],
  },
];

export function getFleetModel(slug: string): FleetModel | null {
  return fleetModels.find((m) => m.slug === slug) ?? null;
}

export const fleetBySlug: Record<string, FleetModel> = fleetModels.reduce(
  (acc, m) => {
    acc[m.slug] = m;
    return acc;
  },
  {} as Record<string, FleetModel>
);
