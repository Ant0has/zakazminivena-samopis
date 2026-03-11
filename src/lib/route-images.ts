// Map route slugs to appropriate category images
const RESORT_SLUGS = [
  "sochi", "krasnodar", "simferopol", "yalta", "anapa", "gelendzhik",
  "novorossiysk", "adler", "alushta", "evpatoriya", "feodosiya", "sudak",
  "sevastopol",
];

const MOUNTAIN_SLUGS = [
  "mineralnye-vody", "dombay", "kislovodsk", "pyatigorsk", "nalchik",
];

const URAL_SLUGS = [
  "ekaterinburg", "chelyabinsk", "tyumen", "perm", "kurgan",
];

export function getRouteImage(fromSlug: string, toSlug: string): string {
  // Check if either endpoint is a resort destination
  if (RESORT_SLUGS.some(s => fromSlug.includes(s) || toSlug.includes(s))) {
    return "/images/routes/resort.png";
  }
  // Mountain / Caucasus
  if (MOUNTAIN_SLUGS.some(s => fromSlug.includes(s) || toSlug.includes(s))) {
    return "/images/routes/mountains.png";
  }
  // Ural
  if (URAL_SLUGS.some(s => fromSlug.includes(s) || toSlug.includes(s))) {
    return "/images/routes/ural.png";
  }
  // Default: highway
  return "/images/routes/highway.png";
}
