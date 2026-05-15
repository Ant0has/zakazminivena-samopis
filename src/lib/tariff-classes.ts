// Классы минивэна — группировка для блока тарифных карточек (паттерн 5 из best-practices).
// 10 моделей парка собираются в 4 класса по бюджету + назначению.

export interface TariffClass {
  /** Уникальный slug — например "minivan-7" */
  slug: string;
  /** Бейдж заголовка — ALLCAPS короткий */
  classLabel: string;
  /** Подзаголовок с примерами моделей */
  modelExamples: string[];
  /** Slug-и моделей из fleetModels — для линка «Подробнее» и подгрузки фото */
  fleetSlugs: string[];
  /** Пассажиров */
  seats: number;
  /** Багажа (мест) */
  luggage: number;
  /** Минимальная цена «от X ₽ за машину» (для аэропорт-трансфера) */
  priceFrom: number;
  /** Изображение карточки (пока пусто — placeholder; потом AI-картинка). */
  image?: string;
  /** Краткое описание класса */
  description?: string;
}

export const tariffClasses: TariffClass[] = [
  {
    slug: "economy-6",
    classLabel: "МИНИВЭН 5–6 МЕСТ",
    modelExamples: ["VW Caravelle", "Hyundai H-1"],
    fleetSlugs: ["vw-caravelle", "hyundai-h1"],
    seats: 6,
    luggage: 5,
    priceFrom: 4000,
    description: "Базовый класс. Идеален для семьи или небольшой группы коллег.",
  },
  {
    slug: "standard-7",
    classLabel: "МИНИВЭН 7–8 МЕСТ",
    modelExamples: ["VW Multivan", "Hyundai Staria"],
    fleetSlugs: ["vw-multivan", "hyundai-staria", "ford-tourneo", "peugeot-traveller"],
    seats: 8,
    luggage: 6,
    priceFrom: 4500,
    description: "Универсальный класс. Премиум-комфорт для группы 6–8 человек.",
  },
  {
    slug: "business-7",
    classLabel: "БИЗНЕС-МИНИВЭН",
    modelExamples: ["Mercedes V-Class", "Toyota Alphard"],
    fleetSlugs: ["mercedes-v-class", "toyota-alphard"],
    seats: 7,
    luggage: 5,
    priceFrom: 5500,
    description: "VIP-комфорт. Кожаный салон, индивидуальные кресла, климат.",
  },
  {
    slug: "large-8",
    classLabel: "БОЛЬШОЙ МИНИВЭН 8 МЕСТ",
    modelExamples: ["Mercedes Vito", "Toyota Hiace"],
    fleetSlugs: ["mercedes-vito", "toyota-hiace"],
    seats: 8,
    luggage: 8,
    priceFrom: 4500,
    description: "8 пассажиров + большой багажник. Для команд и съёмочных групп.",
  },
];

export function getTariffClass(slug: string): TariffClass | null {
  return tariffClasses.find((t) => t.slug === slug) ?? null;
}
