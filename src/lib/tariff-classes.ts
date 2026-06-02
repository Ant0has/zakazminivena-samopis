// Классы минивэна — группировка для блока тарифных карточек (паттерн 5 из best-practices).
// 4 класса по бюджету + назначению.

export interface LuggageScenario {
  /** Короткое название сценария — для таба */
  label: string;
  /** Описание раскладки */
  description: string;
}

export interface TariffClass {
  /** Уникальный slug — например "comfort" */
  slug: string;
  /** Бейдж заголовка — ALLCAPS короткий */
  classLabel: string;
  /** Подзаголовок с примерами моделей */
  modelExamples: string[];
  /** Slug-и моделей из fleetModels — для линка «Подробнее» и подгрузки фото */
  fleetSlugs: string[];
  /** Пассажиров */
  seats: number;
  /** Багажа (мест) — упрощённая цифра для иконки */
  luggage: number;
  /** Минимальная цена «от X ₽ за машину» (для аэропорт-трансфера). 0 — «по запросу». */
  priceFrom: number;
  /** Изображение карточки. */
  image?: string;
  /** Краткое описание класса */
  description?: string;
  /** Объём багажника / комментарий */
  trunkNote?: string;
  /** Три сценария багажа — Максимум крупного / Стандартный на каждого / Семейная поездка. */
  luggageOptions?: LuggageScenario[];
  /** Если true — цены нет, кнопка «Запросить расчёт». */
  requestOnly?: boolean;
}

export const tariffClasses: TariffClass[] = [
  {
    slug: "comfort",
    classLabel: "КОМФОРТ",
    modelExamples: ["Hyundai Starex", "VW Caravelle"],
    fleetSlugs: ["hyundai-h1", "vw-caravelle"],
    seats: 7,
    luggage: 5,
    priceFrom: 4000,
    image: "/images/fleet-classes/H-1.webp",
    description: "Базовый класс. Идеален для семьи или небольшой группы коллег.",
    trunkNote: "7 пассажиров + водитель. Большой багажник, складные кресла 3-го ряда.",
    luggageOptions: [
      {
        label: "Максимум крупного",
        description: "4 больших чемодана (XL/L) + 7 мест под ручную кладь",
      },
      {
        label: "Стандартный на каждого",
        description: "7 средних чемоданов (M) + 7 мест под ручную кладь",
      },
      {
        label: "Семейная поездка",
        description:
          "2 больших чемодана (XL/L) + 2–3 дорожные сумки + детская коляска + 7 мест под ручную кладь",
      },
    ],
  },
  {
    slug: "comfort-plus",
    classLabel: "КОМФОРТ+",
    modelExamples: ["VW Multivan", "Hyundai Staria"],
    fleetSlugs: ["vw-multivan", "hyundai-staria"],
    seats: 7,
    luggage: 6,
    priceFrom: 4500,
    image: "/images/fleet-classes/multivan.webp",
    description: "Премиум-комфорт для группы 6–8 человек.",
    trunkNote:
      "7 пассажиров + водитель. Багажник за третьим рядом: Staria — 831 л, Multivan — 469 л.",
    luggageOptions: [
      {
        label: "Максимум крупного",
        description: "4 больших чемодана (XL/L) + 7 мест под ручную кладь",
      },
      {
        label: "Стандартный на каждого",
        description: "7 средних чемоданов (M) + 7 мест под ручную кладь",
      },
      {
        label: "Семейная поездка",
        description:
          "2 больших чемодана (XL/L) + 2–3 дорожные сумки + детская коляска + 7 мест под ручную кладь",
      },
    ],
  },
  {
    slug: "business",
    classLabel: "БИЗНЕС-КЛАСС",
    modelExamples: ["Mercedes V-Class"],
    fleetSlugs: ["mercedes-v-class", "toyota-alphard"],
    seats: 6,
    luggage: 8,
    priceFrom: 5500,
    image: "/images/fleet-classes/v-class.webp",
    description: "VIP-комфорт. Кожаный салон, индивидуальные кресла, климат.",
    trunkNote:
      "6 пассажиров + водитель (VIP-компоновка 2+2+2). Багажник за последним рядом до 1030 л.",
    luggageOptions: [
      {
        label: "Максимум крупного",
        description: "5 больших чемоданов (XL/L) + 6 мест под ручную кладь",
      },
      {
        label: "Стандартный на каждого",
        description: "8 средних чемоданов (M) + 6 мест под ручную кладь",
      },
      {
        label: "Семейная поездка",
        description:
          "2 больших чемодана (XL/L) + 3–4 дорожные сумки + детская коляска + 6 мест под ручную кладь",
      },
    ],
  },
  {
    slug: "minibus",
    classLabel: "МИКРОАВТОБУС",
    modelExamples: ["Toyota HiAce", "Mercedes Sprinter"],
    fleetSlugs: ["toyota-hiace", "mercedes-sprinter"],
    seats: 20,
    luggage: 20,
    priceFrom: 0,
    image: "/images/fleet-classes/hiace.webp",
    description: "8–20 пассажиров. Для команд, групп, мероприятий.",
    trunkNote:
      "8–20 пассажиров. Подача под запрос с подбором машины под количество и багаж.",
    luggageOptions: [
      {
        label: "Группа 8–12 чел.",
        description:
          "До 12 средних чемоданов + ручная кладь у каждого пассажира",
      },
      {
        label: "Группа 13–20 чел.",
        description:
          "До 20 средних чемоданов или 10 больших + ручная кладь у каждого",
      },
      {
        label: "С реквизитом/оборудованием",
        description:
          "Часть посадочных мест свободна под груз: подбор машины индивидуально",
      },
    ],
    requestOnly: true,
  },
];

export function getTariffClass(slug: string): TariffClass | null {
  return tariffClasses.find((t) => t.slug === slug) ?? null;
}
