// Exact legacy airport hub aliases. KUF and ROV have no replacement here.
export const airportAliases: Record<string, string> = {
  sheremetyevo:'svo', domodedovo:'dme', vnukovo:'vko', pulkovo:'led', koltsovo:'svx',
  'adler-airport':'aer', pashkovskiy:'krr', tolmachyovo:'ovb',
  'simferopol-airport':'sip', 'mineralnye-vody-airport':'mrv',
};
export function airportHref(slug: string): string {
  return Object.hasOwn(airportAliases,slug) ? `/airport/${airportAliases[slug]}` : `/airports/${slug}`;
}
