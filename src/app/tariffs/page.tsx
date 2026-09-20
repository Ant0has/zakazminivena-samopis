import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TariffsSection } from '@/components/TariffsSection';
import { TripConstructor } from '@/components/TripConstructor';
import { tariff, pricingYear } from '@/lib/route-pricing';
import { routeOffer } from '@/lib/route-seo';

const title = `Цены на минивэн в ${pricingYear} году — «Комфорт» от 3 000 ₽`;
const description = `Цены ${pricingYear}: минивэн «Комфорт» до 7 пассажиров от 3 000 ₽ за автомобиль. Базовая ставка 60 ₽/км, коэффициенты и округление. Итоговую цену подтвердим до заказа.`;
export const metadata: Metadata = { title, description, alternates: { canonical: 'https://zakazminivena.ru/tariffs' }, openGraph: { title, description, url: 'https://zakazminivena.ru/tariffs' }, twitter: { title, description } };

export default function TariffsPage() {
  return <div><Header /><main className="pt-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'Минивэн «Комфорт» с водителем', provider: { '@type': 'Organization', name: 'ЗаказМинивэна.ru', url: 'https://zakazminivena.ru' }, offers: routeOffer(tariff.minimum) }) }} />
    <div className="mx-auto max-w-4xl px-4">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Тарифы' }]} />
      <h1 className="mt-6 text-4xl font-bold">Цены на минивэн в {pricingYear} году: тариф «Комфорт»</h1>
      <p className="mt-4 text-muted-foreground">Сейчас онлайн рассчитывается только «Комфорт». Другие классы в этот расчёт не входят.</p>
    </div>
    <TariffsSection />
    <section className="mx-auto max-w-4xl space-y-6 px-4 pb-12">
      <h2 className="text-3xl font-bold">Как получается цена «от»</h2>
      <p>Для известных маршрутов используем дорожное расстояние из каталога. На странице показываем его с округлением вверх до 10 км. Адреса в пределах города могут изменить длину поездки.</p>
      <div className="overflow-x-auto rounded-2xl border"><table className="w-full text-left"><thead className="bg-muted"><tr><th className="p-4">Исходное расстояние</th><th className="p-4">Коэффициент</th></tr></thead><tbody>{[['Менее 100 км', '1,5'], ['От 100 до 150 км, не включая 150', '1,2'], ['От 150 до 200 км, не включая 200', '1,1'], ['От 200 км', '1,0']].map(([distance, coefficient]) => <tr key={distance} className="border-t"><td className="p-4">{distance}</td><td className="p-4">{coefficient}</td></tr>)}</tbody></table></div>
      <p>Округлённое расстояние умножаем на 60 ₽/км и коэффициент. Минимум — от 3 000 ₽. Сумму округляем вверх до 500 ₽. Если округлённое расстояние больше 300 км, из результата однократно вычитаем 1 000 ₽.</p>
      <p>Например, маршрут ровно 300 км — от 18 000 ₽ за весь минивэн; 329,36 км — 330 км на странице и от 19 000 ₽. Цена не умножается на число пассажиров.</p>
      <p className="rounded-2xl bg-muted p-5">Это предварительный расчёт в одну сторону, не подтверждённая бронь. Итоговую цену фиксируем до заказа после уточнения адресов, даты, платных дорог и дополнительных условий. Обратную поездку рассчитываем отдельно. Сложение кресел и вместимость багажа зависят от конкретного автомобиля.</p>
    </section>
    <TripConstructor />
  </main><Footer /></div>;
}
