export type JourneyIllustration = { src: string; alt: string; width: number; height: number };

const illustration = (id: string, alt: string): JourneyIllustration => ({
  src: `/images/journeys/${id}-v1.webp`, alt: `${alt} — рисованная иллюстрация`, width: 1536, height: 1024,
});

// Explicit URL assignments: do not silently reuse a different destination's image.
export const journeyIllustrations: Record<string, JourneyIllustration> = {
  '/service/luggage': illustration('luggage', 'Семья из четырёх человек собирает чемоданы, коробки и коляску в минивэн'),
  '/service/ski-transfer': illustration('ski-transfer', 'Компания у минивэна с чехлами для лыж и сноуборда на зимнем курорте'),
  '/airport/vko': illustration('vko', 'Семья с детьми и чемоданами у минивэна перед поездкой из аэропорта'),
  '/airport/svo': illustration('svo', 'Водитель встречает маму с дочерью у минивэна в аэропорту'),
  '/airport/dme': illustration('dme', 'Две пары с багажом собираются в поездку на минивэне из аэропорта'),
  '/airport/vko/moscow-center': illustration('vko-moscow-center', 'Мама с дочерью и дедушка прибывают на минивэне к городскому отелю'),
  '/routes/kazan-samara': illustration('kazan-samara', 'Семья рядом с минивэном на фоне Волги после поездки в Самару'),
  '/routes/tyumen-ekaterinburg': illustration('tyumen-ekaterinburg', 'Компания у минивэна рассматривает карту на фоне городского пруда'),
  '/routes/ekaterinburg-chelyabinsk': illustration('ekaterinburg-chelyabinsk', 'Семья с багажом у светлого минивэна на зелёном городском бульваре'),
  '/routes/krasnodar-yalta': illustration('krasnodar-yalta', 'Компания путешественников у минивэна на фоне моря и южных гор'),
  '/destination/karelia/spb-ruskeala': illustration('spb-ruskeala', 'Семья начинает прогулку после поездки на минивэне к мраморному каньону'),
  '/destination/baikal/irkutsk-listvyanka': illustration('irkutsk-listvyanka', 'Путешественники рядом с минивэном любуются Байкалом'),
  '/services/children': illustration('children', 'Родители, мальчик и девочка готовят коляску и багаж к семейной поездке'),
};

export function getJourneyIllustration(path: string) { return journeyIllustrations[path]; }
export function journeySocialImage(path: string) {
  const image = getJourneyIllustration(path);
  return image ? { url: 'https://zakazminivena.ru' + image.src, width: image.width, height: image.height, alt: image.alt } : undefined;
}
