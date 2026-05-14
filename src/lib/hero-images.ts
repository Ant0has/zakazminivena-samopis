// Hero-изображения для новой иерархии.
//
// ВАЖНО: в /images/routes/*.webp на многих кадрах ГРУЗОВЫЕ фургоны (без окон в салоне),
// что вводит клиента в заблуждение. Поэтому на Hero используем студийные фото
// настоящих пассажирских минивэнов из /images/fleet/.
//
// Ротация по типу страницы:
//   airport hub          → Caravelle  (универсальный для аэропортов)
//   airport route        → Alphard    (премиум — выделяется на посадочной)
//   destination hub      → Staria     (туристический образ — новая модель)
//   destination route    → Caravelle  (универсал для туров)
//   fleet model          → собственное фото модели

const PASSENGER_HERO = {
  alphard: "/images/fleet/alphard.webp",
  caravelle: "/images/fleet/caravelle.webp",
  staria: "/images/fleet/staria.webp",
} as const;

export function getAirportHubHeroImage(_iata: string): string {
  return PASSENGER_HERO.caravelle;
}

export function getAirportRouteHeroImage(_iata: string): string {
  return PASSENGER_HERO.alphard;
}

export function getDestinationHubHeroImage(_region: string): string {
  return PASSENGER_HERO.staria;
}

export function getDestinationRouteHeroImage(_region: string): string {
  return PASSENGER_HERO.caravelle;
}

// Обратная совместимость со старыми именами (используются в существующем коде):
export function getAirportHeroImage(iata: string): string {
  return getAirportRouteHeroImage(iata);
}

export function getDestinationHeroImage(region: string): string {
  return getDestinationRouteHeroImage(region);
}

const fleetImages: Record<string, string> = {
  "toyota-alphard": PASSENGER_HERO.alphard,
  "vw-caravelle": PASSENGER_HERO.caravelle,
  "hyundai-staria": PASSENGER_HERO.staria,
};

export function getFleetHeroImage(slug: string): string {
  return fleetImages[slug] ?? PASSENGER_HERO.caravelle;
}

const serviceImages: Record<string, string> = {
  "airport-transfer": "/images/services/airport.webp",
  wedding: "/images/services/wedding.webp",
};

export function getServiceHeroImage(slug: string): string {
  return serviceImages[slug] ?? "/images/services/hero.webp";
}
