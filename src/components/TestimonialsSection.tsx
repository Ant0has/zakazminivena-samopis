import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Алексей М.",
    city: "Казань",
    initials: "АМ",
    color: "bg-blue-500",
    text: "Ехали семьёй из 6 человек из Казани в Самару. Водитель приехал вовремя, машина чистая и просторная. Дети ехали в своих креслах, всё было удобно. Цена как и договаривались, без сюрпризов.",
  },
  {
    name: "Елена К.",
    city: "Москва",
    initials: "ЕК",
    color: "bg-rose-500",
    text: "Заказывали минивэн в аэропорт Шереметьево — нас было 5 взрослых с большим багажом. Водитель встретил с табличкой, помог с чемоданами. Ехали с комфортом, не то что в обычном такси.",
  },
  {
    name: "Дмитрий С.",
    city: "Екатеринбург",
    initials: "ДС",
    color: "bg-amber-500",
    text: "Регулярно заказываю минивэн Екатеринбург — Челябинск для деловых поездок с коллегами. Всегда вовремя, всегда чисто, цена фиксированная. Рекомендую.",
  },
  {
    name: "Ольга П.",
    city: "Сочи",
    initials: "ОП",
    color: "bg-emerald-500",
    text: "Летели в Сочи всей семьёй — двое взрослых, трое детей, бабушка. В обычное такси не влезли бы. Минивэн — спасение! Детские кресла поставили бесплатно, водитель вежливый.",
  },
  {
    name: "Михаил Т.",
    city: "Нижний Новгород",
    initials: "МТ",
    color: "bg-violet-500",
    text: "Первый раз заказывал минивэн и очень доволен. Привыкли к обычному такси, но когда нас 7 человек — это просто невозможно. А тут все вместе, с багажом, и дешевле чем 2 такси.",
  },
  {
    name: "Анна В.",
    city: "Краснодар",
    initials: "АВ",
    color: "bg-sky-500",
    text: "Заказывали трансфер из аэропорта Краснодара в Сочи. 300 км пролетели незаметно — в салоне кондиционер, зарядки, вода. Дети даже поспали. Теперь всегда так будем ездить.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Отзывы наших клиентов
          </h2>
          <p className="mt-3 text-muted-foreground">
            Более 2 000 довольных пассажиров по всей России
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border/50 bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${t.color}`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
              <Stars />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                &laquo;{t.text}&raquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
