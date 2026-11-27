const localDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Europe/Moscow',
  month: 'numeric',
  day: 'numeric',
});

export function kazanArtSeason(at: Date) {
  const parts = localDate.formatToParts(at);
  const month = Number(parts.find(part => part.type === 'month')?.value);
  const day = Number(parts.find(part => part.type === 'day')?.value);
  if ((month === 12 && day >= 10) || (month === 1 && day <= 13)) return 'newyear';
  if (month === 12 || month === 1 || month === 2) return 'winter';
  return 'standard';
}

export function kazanArtUrl(city: string) {
  return '/seasonal-images/kazan/' + city;
}
