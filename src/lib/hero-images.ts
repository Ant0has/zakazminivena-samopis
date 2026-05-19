// Hero-изображения для v3-страниц.
//
// Все тематические фото лежат в /public/images/heroes/ и сгенерированы
// под конкретные URL (см. link-pict_name.docx из архива от 2026-05-19).
// На каждом фото — пассажирский минивэн в контексте локации.

const HEROES = "/images/heroes";

const airportHeroByIata: Record<string, string> = {
  svo: `${HEROES}/svo.webp`,
  vko: `${HEROES}/vko.webp`,
  dme: `${HEROES}/dme.webp`,
  zia: `${HEROES}/zia.webp`,
  led: `${HEROES}/led.webp`,
  aer: `${HEROES}/aer.webp`,
  mrv: `${HEROES}/mrv.webp`,
  aaq: `${HEROES}/aaq.webp`,
  krr: `${HEROES}/krr.webp`,
  sip: `${HEROES}/sip.webp`,
  kgd: `${HEROES}/kgd.webp`,
  kzn: `${HEROES}/kzn.webp`,
  svx: `${HEROES}/svx.webp`,
  ovb: `${HEROES}/ovb.webp`,
  ikt: `${HEROES}/ikt.webp`,
  mmk: `${HEROES}/mmk.webp`,
};

const destinationHeroByRegion: Record<string, string> = {
  karelia: `${HEROES}/karelia.webp`,
  kmv: `${HEROES}/kmv.webp`,
  altai: `${HEROES}/altai.webp`,
  baikal: `${HEROES}/baikal.webp`,
  crimea: `${HEROES}/crimea.webp`,
  "krasnodar-coast": `${HEROES}/krasnodar-coast.webp`,
  kaliningrad: `${HEROES}/kaliningrad.webp`,
  north: `${HEROES}/north.webp`,
};

/** Hero на главной (/) — общая заставка. */
export const HOME_HERO_IMAGE = `${HEROES}/zastavka.webp`;

/** Хаб аэропорта /airport/{iata}/. */
export function getAirportHubHeroImage(iata: string): string {
  return airportHeroByIata[iata.toLowerCase()] ?? HOME_HERO_IMAGE;
}

/** Маршрут /airport/{iata}/{dest}/ — наследует Hero хаба. */
export function getAirportRouteHeroImage(iata: string): string {
  return getAirportHubHeroImage(iata);
}

/** Хаб региона /destination/{region}/. */
export function getDestinationHubHeroImage(region: string): string {
  return destinationHeroByRegion[region] ?? HOME_HERO_IMAGE;
}

/** Маршрут /destination/{region}/{route}/ — наследует Hero региона. */
export function getDestinationRouteHeroImage(region: string): string {
  return getDestinationHubHeroImage(region);
}

// Обратная совместимость:
export function getAirportHeroImage(iata: string): string {
  return getAirportRouteHeroImage(iata);
}
export function getDestinationHeroImage(region: string): string {
  return getDestinationRouteHeroImage(region);
}

// ── Прочие легаси-функции (используются в небольшом наборе мест) ──

const fleetImages: Record<string, string> = {
  "toyota-alphard": "/images/fleet/alphard.webp",
  "vw-caravelle": "/images/fleet/caravelle.webp",
  "hyundai-staria": "/images/fleet/staria.webp",
};
export function getFleetHeroImage(slug: string): string {
  return fleetImages[slug] ?? HOME_HERO_IMAGE;
}

const serviceImages: Record<string, string> = {
  "airport-transfer": "/images/services/airport.webp",
  wedding: "/images/services/wedding.webp",
};
export function getServiceHeroImage(slug: string): string {
  return serviceImages[slug] ?? "/images/services/hero.webp";
}
