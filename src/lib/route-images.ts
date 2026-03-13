// Map route slugs to appropriate category images
const RESORT_SLUGS = [
  "sochi", "krasnodar", "simferopol", "yalta", "anapa", "gelendzhik",
  "novorossiysk", "adler", "alushta", "evpatoriya", "feodosiya", "sudak",
  "sevastopol", "rostov",
];

const MOUNTAIN_SLUGS = [
  "mineralnye-vody", "dombay", "kislovodsk", "pyatigorsk", "nalchik",
];

const URAL_SLUGS = [
  "ekaterinburg", "chelyabinsk", "tyumen", "perm", "kurgan",
];

const SIBERIA_SLUGS = [
  "novosibirsk", "barnaul", "tomsk", "kemerovo", "omsk",
];

export function getRouteImage(fromSlug: string, toSlug: string): string {
  if (RESORT_SLUGS.some(s => fromSlug.includes(s) || toSlug.includes(s))) {
    return "/images/routes/resort.webp";
  }
  if (MOUNTAIN_SLUGS.some(s => fromSlug.includes(s) || toSlug.includes(s))) {
    return "/images/routes/mountains.webp";
  }
  if (URAL_SLUGS.some(s => fromSlug.includes(s) || toSlug.includes(s))) {
    return "/images/routes/ural.webp";
  }
  if (SIBERIA_SLUGS.some(s => fromSlug.includes(s) || toSlug.includes(s))) {
    return "/images/routes/winter.webp";
  }
  return "/images/routes/highway.webp";
}
