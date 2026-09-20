import Link from 'next/link';
import { tariff, publicPriceNote } from '@/lib/route-pricing';

export function TariffsSection() {
  return <section className="py-16 sm:py-24">
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="rounded-3xl border border-emerald/30 bg-emerald/5 p-7 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald">Один понятный тариф</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Минивэн «Комфорт»</h2>
        <p className="mt-4 text-3xl font-bold">От {tariff.minimum.toLocaleString('ru-RU')} ₽ за автомобиль</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">До 7 пассажиров, включая детей. Hyundai Starex / H-1, Volkswagen Caravelle и Kia Carnival IV — примеры автомобилей для поездки. Конкретную модель, детские кресла и размещение багажа подтвердим до заказа.</p>
        <p className="mt-4 leading-relaxed text-muted-foreground">Базовая ставка — {tariff.rate} ₽/км. На коротких маршрутах действует коэффициент. Расчёт по маршруту доступен в конструкторе.</p>
        <p className="mt-3 text-sm text-muted-foreground">{publicPriceNote()}</p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link className="rounded-xl bg-emerald px-6 py-3 font-semibold text-emerald-foreground" href="/constructor">Собрать поездку →</Link>
          <Link className="rounded-xl border px-6 py-3 font-semibold" href="/tariffs">Правила расчёта</Link>
        </div>
      </div>
    </div>
  </section>;
}
