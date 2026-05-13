// Подбор фоновых изображений для Hero-блоков новой иерархии.
// Изображения уже есть в public/images/routes/ — переиспользуем по теме.

const iataToImage: Record<string, string> = {
  svo: "/images/routes/moscow.webp",
  vko: "/images/routes/moscow.webp",
  dme: "/images/routes/moscow.webp",
  zia: "/images/routes/moscow.webp",
  led: "/images/routes/spb.webp",
  aer: "/images/routes/sochi-coast.webp",
  mrv: "/images/routes/kavkaz.webp",
  aaq: "/images/routes/krasnodar.webp",
  krr: "/images/routes/krasnodar.webp",
  sip: "/images/routes/crimea.webp",
  kgd: "/images/routes/spb.webp",
  kzn: "/images/routes/volga.webp",
  svx: "/images/routes/ural.webp",
  ovb: "/images/routes/siberia-winter.webp",
  ikt: "/images/routes/siberia-winter.webp",
  mmk: "/images/routes/winter.webp",
};

const regionToImage: Record<string, string> = {
  karelia: "/images/routes/highway.webp",
  kmv: "/images/routes/kavkaz.webp",
  altai: "/images/routes/mountains.webp",
  baikal: "/images/routes/siberia-winter.webp",
  crimea: "/images/routes/crimea.webp",
  "krasnodar-coast": "/images/routes/krasnodar.webp",
  kaliningrad: "/images/routes/spb.webp",
  north: "/images/routes/winter.webp",
};

export function getAirportHeroImage(iata: string): string {
  return iataToImage[iata.toLowerCase()] ?? "/images/services/airport.webp";
}

export function getDestinationHeroImage(region: string): string {
  return regionToImage[region] ?? "/images/services/hero.webp";
}

const fleetImages: Record<string, string> = {
  "toyota-alphard": "/images/fleet/alphard.webp",
  "vw-caravelle": "/images/fleet/caravelle.webp",
  "hyundai-staria": "/images/fleet/staria.webp",
};

export function getFleetHeroImage(slug: string): string {
  return fleetImages[slug] ?? "/images/services/hero.webp";
}

const serviceImages: Record<string, string> = {
  "airport-transfer": "/images/services/airport.webp",
  wedding: "/images/services/wedding.webp",
};

export function getServiceHeroImage(slug: string): string {
  return serviceImages[slug] ?? "/images/services/hero.webp";
}
