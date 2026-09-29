export type JourneyIllustration = { src: string; alt: string; width: number; height: number };

const illustration = (id: string, alt: string, version = 1): JourneyIllustration => ({
  src: `/images/journeys/${id}-v${version}.webp`, alt: `${alt} — рисованная иллюстрация`, width: 1536, height: 1024,
});

// Explicit URL assignments: do not silently reuse a different destination's image.
export const journeyIllustrations: Record<string, JourneyIllustration> = {
  '/routes/moskva-tver': illustration('moskva-tver', 'Семья с дорожными чемоданами у светлого минивэна на фоне тихого исторического квартала Твери'),
  '/routes/volgograd-rostov': illustration('volgograd-rostov', 'Компания путешественников с багажом рядом с минивэном в тёплом южном Ростове-на-Дону'),
  '/routes/krasnodar-adler': illustration('krasnodar-adler', 'Семья с чемоданами прибывает на минивэне в зелёный приморский Адлер'),
  '/routes/moskva-nizhniy-novgorod': illustration('moskva-nizhniy-novgorod', 'Путешественники с багажом рядом с минивэном на фоне речного Нижнего Новгорода'),
  '/routes/yaroslavl-moskva': illustration('yaroslavl-moskva', 'Семья и чемоданы у минивэна на фоне московского городского пейзажа'),
  '/routes/moskva-tula': illustration('moskva-tula', 'Семья с дорожными сумками у минивэна среди уютных старых улиц Тулы', 2),
  '/routes/moskva-ryazan': illustration('moskva-ryazan', 'Путешественники с чемоданами у минивэна на фоне зелёной Рязани'),
  '/routes/moskva-kaluga': illustration('moskva-kaluga', 'Родители с ребёнком и чемоданами у минивэна после поездки в Калугу'),
  '/routes/moskva-kostroma': illustration('moskva-kostroma', 'Семья с багажом рядом с минивэном на тихой исторической улице Костромы', 2),
  '/routes/nizhniy-novgorod-moskva': illustration('nizhniy-novgorod-moskva', 'Компания с дорожными чемоданами у минивэна на фоне Москвы'),
  '/routes/krasnodar-simferopol': illustration('krasnodar-simferopol', 'Путешественники с багажом у минивэна в залитом солнцем южном городе'),
  '/routes/rostov-anapa': illustration('rostov-anapa', 'Родители с дочерью и чемоданами рядом с минивэном среди сосен и морского света Анапы'),
  '/routes/chelyabinsk-ekaterinburg': illustration('chelyabinsk-ekaterinburg', 'Небольшая компания с дорожными сумками у минивэна на фоне городского пруда Екатеринбурга'),
  '/routes/nizhniy-novgorod-kazan': illustration('nizhniy-novgorod-kazan', 'Мама, папа и дочь с чемоданами у минивэна в старом квартале Казани'),
  '/routes/moskva-suzdal': illustration('moskva-suzdal', 'Пара и их взрослая дочь с багажом у минивэна среди деревянных домов Суздаля'),
  '/routes/krasnodar-sochi': illustration('krasnodar-sochi', 'Семья с двумя детьми и чемоданами у светлого минивэна среди субтропической зелени Сочи'),
  '/routes/krasnodar-novorossiysk': illustration('krasnodar-novorossiysk', 'Компания друзей с дорожными сумками у минивэна на фоне бухты Новороссийска'),
  '/routes/ekaterinburg-tyumen': illustration('ekaterinburg-tyumen', 'Мама, сын и бабушка у минивэна на фоне уютной улицы Тюмени'),
  '/routes/samara-kazan': illustration('samara-kazan', 'Пара путешественников с багажом у минивэна на фоне речной панорамы Казани'),
  '/routes/spb-petrozavodsk': illustration('spb-petrozavodsk', 'Семья с подростком и рюкзаками у минивэна на фоне Онежского озера в Петрозаводске'),
  '/routes/volgograd-astrakhan': illustration('volgograd-astrakhan', 'Семья с мальчиком у минивэна среди набережной и зелени Астрахани'),
  '/routes/moskva-yaroslavl': illustration('moskva-yaroslavl', 'Родители с двумя детьми и чемоданами у минивэна в историческом Ярославле'),
  '/routes/moskva-vladimir': illustration('moskva-vladimir', 'Пара с дочерью и багажом у минивэна на фоне белокаменного Владимира'),
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
