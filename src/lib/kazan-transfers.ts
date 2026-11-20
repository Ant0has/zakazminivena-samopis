import { priceForDistance } from './route-pricing';
import registry from './route-registry.json';

const destinations = [
  {slug: 'yoshkar-ola', name: 'Йошкар-Ола', from: 'Йошкар-Олы', to: 'Йошкар-Олу',
    arrival: 'Доедем до дома или отеля в Йошкар-Оле. Если везёте коляску, укажите её размер в сложенном виде вместе с количеством чемоданов.',
    departure: 'Укажите адрес в Йошкар-Оле и время вылета. Диспетчер предложит время подачи с запасом на дорогу и регистрацию.'},
  {slug: 'ulyanovsk', name: 'Ульяновск', from: 'Ульяновска', to: 'Ульяновск',
    arrival: 'Укажите, на каком берегу Волги находится ваш адрес в Ульяновске. Точка высадки влияет на километраж и время в пути.',
    departure: 'При заказе укажите район Ульяновска и местное время вылета в Казани. Диспетчер согласует время подачи по местному времени Ульяновска.'},
  {slug: 'tolyatti', name: 'Тольятти', from: 'Тольятти', to: 'Тольятти',
    arrival: 'Едете в Автозаводский, Центральный или Комсомольский район? Укажите точный адрес в Тольятти. Для нескольких больших чемоданов заранее подберём компоновку салона.',
    departure: 'Назовите район подачи в Тольятти, номер рейса и число чемоданов. Время подачи и вылета согласуем с указанием местного времени каждого города.'},
  {slug: 'saransk', name: 'Саранск', from: 'Саранска', to: 'Саранск',
    arrival: 'Для длинного переезда в Саранск можно заранее согласовать остановку в пути. Укажите детские кресла и крупный багаж при расчёте.',
    departure: 'При раннем вылете из Казани дата подачи в Саранске может приходиться на предыдущий вечер. Укажите дату рейса и желаемое время отправления.'},
];

export const kazanTransfers = destinations.flatMap(city => [false, true].map(toAirport => {
  const path = toAirport ? '/routes/' + city.slug + '-aeroport-kazan' : '/airport/kzn/' + city.slug;
  const record = registry.records.find(row => row.id === path);
  if (!record) throw new Error('В каталоге отсутствует ' + path);
  return {
    city, toAirport, path, slug: path.split('/').pop()!, record,
    title: toAirport ? 'Минивэн из ' + city.from + ' в аэропорт Казани' : 'Минивэн из аэропорта Казани в ' + city.to,
    price: priceForDistance(record.km, record.pricingDistanceM),
  };
}));

export type KazanTransfer = typeof kazanTransfers[number];
export function kazanTransferAt(path: string) {
  return kazanTransfers.find(route => route.path === path);
}
