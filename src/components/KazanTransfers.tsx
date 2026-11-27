import Link from 'next/link';
import { Header } from './Header';
import { Footer } from './Footer';
import { TripConstructor } from './TripConstructor';
import { JourneyHero } from './JourneyHero';
import { Breadcrumbs } from './Breadcrumbs';
import { kazanTransfers, type KazanTransfer } from '@/lib/kazan-transfers';
import { kazanArtUrl } from '@/lib/kazan-art-calendar';
import { getJourneyIllustration } from '@/lib/journey-illustrations';
import { routeOffer, routeMetadata } from '@/lib/route-seo';

const money = (n: number) => n.toLocaleString('ru-RU');
const airport = 'Аэропорт Казани';
export function kazanTransferMeta(route: KazanTransfer) {
  const { record, path } = route;
  return routeMetadata({from: route.toAirport ? route.city.name : airport, to: route.toAirport ? airport : route.city.name, km: record.km, pricingDistanceM: record.pricingDistanceM, path, imageUrl: 'https://zakazminivena.ru' + kazanArtUrl(route.city.slug)});

}

export function KazanDestinations() {
  return <section aria-labelledby="kzn-directions" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <h2 id="kzn-directions" className="text-2xl font-bold tracking-tight sm:text-3xl">Межгород через аэропорт Казани</h2>
    <p className="mt-2 max-w-3xl text-muted-foreground">Выберите город и направление. Цена указана за весь минивэн с водителем в одну сторону.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{kazanTransfers.filter(r => !r.toAirport).map(outward => {
      const back = kazanTransfers.find(r => r.toAirport && r.city.slug === outward.city.slug)!;
      return <article key={outward.path} className="rounded-2xl border border-[#d3dfd3] bg-[#f4f7ef] p-4">
        <h3 className="text-lg font-semibold">{outward.city.name}</h3>
        {[outward, back].map(r => <Link key={r.path} href={r.path} aria-label={r.title} className="flex min-h-12 items-center justify-between gap-2 border-t border-[#d3dfd3] py-2 text-sm text-emerald-900 underline underline-offset-4">
          <span>{r.toAirport ? 'В аэропорт' : 'Из аэропорта'}</span><span className="whitespace-nowrap">от {money(r.price)} ₽</span>
        </Link>)}
      </article>;
    })}</div>
  </section>;
}

export function KazanTransferPage({route}: {route: KazanTransfer}) {
  const { record, city, toAirport, path, price, title } = route;
  const other = kazanTransfers.find(r => r.city.slug === city.slug && r.toAirport !== toAirport)!;
  const image = { ...getJourneyIllustration(path), src: kazanArtUrl(city.slug) };
  const details = toAirport ? city.departure : city.arrival;
  const description = 'Минивэн «Комфорт» целиком для вашей компании. До семи пассажиров, включая детей. Отдельные места не продаём.';
  const ld = {'@context': 'https://schema.org', '@type': 'TaxiService', name: title, url: 'https://zakazminivena.ru'+path, image:'https://zakazminivena.ru'+image.src, description, offers: routeOffer(price), provider: {'@type':'Organization', name:'ЗаказМинивэна.ru', url:'https://zakazminivena.ru'}};
  return <><Header /><main className="pt-16">
    <div className="mx-auto max-w-7xl px-4 py-3"><Breadcrumbs items={[{label:'Казань',href:'/cities/kazan'},{label:'Аэропорт Казани',href:'/airport/kzn'},{label:toAirport ? city.name + ' → KZN' : 'KZN → ' + city.name}]} /></div>
    <JourneyHero image={image} mobileImageSrc={image.src + '?size=mobile'} title={title} description={description} price={money(price)} distance={record.km} duration={record.hours} eyebrow={toAirport ? 'К вылету из Казани' : 'Встреча по прилёте в Казань'} />
    <TripConstructor routePath={path} defaultFrom={record.from} defaultTo={record.to} contextNote={details}/>
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h2 className="text-2xl font-bold">Как согласовать поездку</h2>
      <p className="mt-3">{toAirport ? 'Оставьте адрес подачи, дату и номер рейса. Диспетчер уточнит местное время вылета, согласует место высадки у терминала и время выезда.' : 'Укажите номер рейса, время прилёта и адрес назначения. Диспетчер согласует терминал, точку встречи и порядок действий, если рейс задержится.'}</p>
      <p className="mt-3">Укажите всех детей, количество кресел, крупные чемоданы и коляску. Вместимость зависит от компоновки. Предварительная цена от {money(price)} ₽ рассчитана между аэропортом и центром города. Точный адрес, остановки, платные участки и итоговую сумму согласуем до заказа.</p>
      <Link className="mt-5 inline-flex min-h-12 items-center font-semibold text-emerald-800 underline" href={other.path}>Обратное направление · {other.title}</Link>
    </section><KazanDestinations />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ld)}} />
  </main><Footer /></>;
}
