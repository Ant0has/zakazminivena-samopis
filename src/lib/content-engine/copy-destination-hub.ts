import { formatPrice } from "@/lib/routes-data";
import { destinationPhrase, originPhrase } from "./place-forms";
import { pricingYear } from "@/lib/route-pricing";
export interface DestinationHubSection {
  title: string;
  iconKey: "clock" | "car" | "sparkles" | "backpack" | "shield" | "compass" | "camera";
  body: string;
}
export interface DestinationHubContent { heroSubtitleLong: string; intro: string; sections: DestinationHubSection[]; faq: Array<{ q: string; a: string }>; }
interface Input {
  regionSlug: string; regionName: string; regionNameAcc: string; hubCity: string;
  topPointsShort: string; heroIntro: string; routesCount: number; minPrice: number;
  packingList: string[]; multidayTours: Array<{ name: string; days: number; priceFrom: number; description: string }>;
}
export function generateDestinationHubContent(opts: Input): DestinationHubContent {
  const { regionSlug, regionName, hubCity, topPointsShort, routesCount, minPrice, multidayTours } = opts;
  const direction = destinationPhrase(regionSlug, regionName);
  const price = formatPrice(minPrice);
  const cost = `Цены ${pricingYear} года по маршрутам каталога — от ${price} ₽ за минивэн «Комфорт» в одну сторону. Стоимость зависит от точных адресов и условий; её подтверждаем до заказа. Расчёт трансфера не включает автоматически экскурсионную программу, билеты и многодневное ожидание.`;
  const fleet = 'В онлайн-расчёте — только «Комфорт», до 7 пассажиров. Примеры моделей: Starex / H-1, Caravelle, Carnival IV. Конкретная машина, кресла и размещение вещей требуют подтверждения. При большом багаже или лыжах можно рассмотреть 4–6 пассажиров со сложенной частью третьего ряда.';
  return {
    heroSubtitleLong: `Минивэн ${direction} ${originPhrase(hubCity)}: до 7 пассажиров, от ${price} ₽ за автомобиль. Маршрут и багаж согласуем заранее.`,
    intro: `Поездка на минивэне ${direction} подходит семье или компании, которая хочет ехать вместе. Точки в каталоге: ${topPointsShort}. Здесь собраны ${routesCount} направлений с отправлением из города ${hubCity}.\n\n` + cost,
    sections: [
      { title: 'Как выбрать направление', iconKey: 'compass', body: `Выберите конечную точку: ${topPointsShort}. На странице маршрута указаны расстояние, ориентир времени и расчёт цены. Адрес отеля или базы отдыха может находиться дальше населённого пункта — укажите его при заказе. Для отдалённых мест возможность проезда проверяется отдельно.` },
      { title: 'Автомобиль и состав компании', iconKey: 'car', body: fleet },
      { title: 'Багаж для поездки', iconKey: 'backpack', body: 'Посчитайте чемоданы, сумки, коляски и спортивный инвентарь. Для длинных чехлов укажите размеры, для коробок — также массу. Конструктор показывает эскиз размещения, а не гарантированную вместимость. Сверьте список вещей с сезоном и выбранной программой.' },
      { title: 'Остановки и многодневный маршрут', iconKey: 'camera', body: 'Остановки, отклонения от маршрута и время ожидания согласуются заранее. Если нужен водитель на несколько дней, отправьте программу и места ночёвок: это отдельный расчёт. ' + (multidayTours.length ? `Идеи программ: ${multidayTours.map(t => t.name).join('; ')}. Наполнение, билеты и стоимость подтверждаются отдельно.` : 'Можно обсудить индивидуальную программу.') },
      { title: 'Что означает цена «от»', iconKey: 'sparkles', body: cost + ' Обратная поездка рассчитывается отдельно. До подтверждения перечислим дополнительные условия: платные дороги, ожидание, остановки и нестандартный багаж.' },
      { title: 'Подготовка к поездке', iconKey: 'clock', body: 'Укажите дату, точные адреса, число пассажиров и детей. Для детских кресел нужны возраст, рост и вес ребёнка. Время на странице не учитывает все возможные пробки, погоду и ограничения проезда; запланируйте запас и согласуйте отправление.' },
    ],
    faq: [
      { q: `Сколько стоит минивэн ${direction}?`, a: cost },
      { q: 'Какой автомобиль подадут?', a: fleet },
      { q: 'Можно ли ехать с лыжами, коляской или коробками?', a: 'Такую поездку можно обсудить заранее. Пришлите размеры и количество вещей, выберите пример в конструкторе. Размещение и массу груза подтвердим для конкретной машины.' },
      { q: 'Можно ли добавить остановки или обратную поездку?', a: 'Укажите их в заявке. Дополнительные адреса, ожидание и обратное направление согласуем и рассчитаем отдельно до подтверждения заказа.' },
      { q: 'Входит ли экскурсия в стоимость?', a: 'Нет, расчёт трансфера сам по себе не подтверждает экскурсионную программу, услуги гида или билеты. Для многодневной поездки нужен отдельный согласованный план.' },
    ],
  };
}
