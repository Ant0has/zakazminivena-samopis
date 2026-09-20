const destinations: Record<string, string> = {
  karelia: 'в Карелию', kmv: 'по КМВ', altai: 'на Алтай', baikal: 'на Байкал',
  crimea: 'в Крым', 'krasnodar-coast': 'на побережье Краснодарского края',
  kaliningrad: 'по Калининградской области', north: 'на Кольский полуостров',
};
const origins: Record<string, string> = {
  'Санкт-Петербург': 'Санкт-Петербурга', 'СПб': 'Санкт-Петербурга', 'Минеральные Воды': 'Минеральных Вод',
  'Барнаул': 'Барнаула', 'Иркутск': 'Иркутска', 'Симферополь': 'Симферополя',
  'Краснодар': 'Краснодара', 'Калининград': 'Калининграда', 'Мурманск': 'Мурманска',
};
export const destinationPhrase = (slug: string, name: string) => destinations[slug] ?? `в регион ${name}`;
export const originPhrase = (city: string) => origins[city] ? `из ${origins[city]}` : `с отправлением: ${city}`;
