interface AirportHeroFormProps { iata: string; airportShort: string; defaultDestination?: string; }
export function AirportHeroForm({ iata, airportShort, defaultDestination = '' }: AirportHeroFormProps) {
  return <div className="rounded-2xl bg-white p-7 text-slate-900 shadow-xl">
    <p className="text-sm font-semibold uppercase text-emerald-700">Минивэн «Комфорт»</p>
    <h2 className="mt-3 text-2xl font-bold">Соберите вашу поездку</h2>
    <p className="mt-3">Аэропорт {airportShort} ({iata.toUpperCase()}){defaultDestination ? ' → ' + defaultDestination : ''}. Выберите пассажиров, детей и багаж в визуальном конструкторе.</p>
    <a className="mt-6 block rounded-xl bg-emerald-600 px-5 py-4 text-center font-semibold text-white hover:bg-emerald-700" href="#trip-constructor">Настроить поездку и узнать цену ↓</a>
    <p className="mt-4 text-sm text-slate-600">За весь автомобиль, не за место. Цену, терминал и конкретную машину подтвердим до заказа.</p>
  </div>;
}
