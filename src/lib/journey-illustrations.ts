export type JourneyIllustration = { src: string; alt: string; width: number; height: number };

const illustration = (id: string, alt: string): JourneyIllustration => ({
  src: `/images/journeys/${id}-v1.webp`, alt: `${alt} — рисованная иллюстрация`, width: 1536, height: 1024,
});

// Explicit URL assignments: do not silently reuse a different destination's image.
export const journeyIllustrations: Record<string, JourneyIllustration> = {
  '/routes/ekaterinburg-perm': illustration('ekaterinburg-perm', 'Пара путешественников и водитель у минивэна на фоне Камы в Перми'),
  '/routes/ekaterinburg-kurgan': illustration('ekaterinburg-kurgan', 'Мама с дочерью и бабушка с багажом после поездки на минивэне в Курган'),
  '/routes/kazan-nizhniy-novgorod': illustration('kazan-nizhniy-novgorod', 'Семья с двумя детьми у минивэна на фоне речной панорамы Нижнего Новгорода'),
  '/routes/rostov-krasnodar': illustration('rostov-krasnodar', 'Семья с коляской и чемоданами у минивэна рядом с зелёным городским парком Краснодара'),
  '/routes/spb-velikiy-novgorod': illustration('spb-velikiy-novgorod', 'Семья с мальчиком у минивэна перед прогулкой по Великому Новгороду'),
  '/routes/spb-pskov': illustration('spb-pskov', 'Друзья с дорожными сумками у минивэна на фоне речного пейзажа Пскова'),
  '/routes/novosibirsk-tomsk': illustration('novosibirsk-tomsk', 'Путешественники с чемоданами у минивэна на тихой улице с деревянными домами Томска'),
  '/routes/novosibirsk-barnaul': illustration('novosibirsk-barnaul', 'Родители с мальчиком и багажом рядом с минивэном после поездки в Барнаул'),
  '/routes/volgograd-saratov': illustration('volgograd-saratov', 'Старшая пара с внучкой и водитель у минивэна на фоне Волги в Саратове'),
  '/routes/volgograd-elista': illustration('volgograd-elista', 'Компания путешественников у минивэна на фоне степного неба и буддийской архитектуры Элисты'),
  '/airport/led': illustration('led', 'Пара путешественников в плащах встречает водителя у минивэна в Пулково'),
  '/airport/aer': illustration('aer', 'Родители и девочка с летним багажом у минивэна среди южной зелени'),
  '/airport/mrv': illustration('mrv', 'Водитель помогает старшей паре с чемоданами перед поездкой из Минеральных Вод'),
  '/airport/kgd': illustration('kgd', 'Семья с мальчиком и дорожными чемоданами готовится к поездке из Храброво'),
  '/airport/kzn': illustration('kzn', 'Семья с дочерью и водитель у минивэна перед поездкой из аэропорта Казани'),
  '/airport/svx': illustration('svx', 'Небольшая компания с багажом встречается у минивэна в Кольцово'),
  '/airport/ovb': illustration('ovb', 'Родители со школьником и крупным багажом рядом с минивэном в Толмачёво'),
  '/airport/ikt': illustration('ikt', 'Путешественники с рюкзаками и фотосумкой готовятся к поездке из аэропорта Иркутска'),
  '/airport/mmk': illustration('mmk', 'Друзья в тёплых куртках с зимними сумками у минивэна в Мурманске'),
  '/airport/zia': illustration('zia', 'Родители с ребёнком и чемоданами у минивэна в Жуковском'),
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
