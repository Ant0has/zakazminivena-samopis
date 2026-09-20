import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumbs } from './Breadcrumbs';
import { TripConstructor } from './TripConstructor';
import { PricingNote } from './PricingNote';
import { pricingYear, priceForDistance } from '@/lib/route-pricing';

const variants = {
  5: { fold: 'Два кресла третьего ряда можно сложить', intro: 'Пятеро едут вместе, а два неиспользуемых места можно отдать под увеличенную багажную зону — если это допускает конструкция салона.', use: 'Семья с коляской или компания с крупными чемоданами', detail: 'В конструкторе оставлено одно кресло третьего ряда и сложены два. Выберите чемоданы или коляску: схема покажет, помещается ли ваш набор в условную зону багажа. В реальном автомобиле размеры и механизм складывания могут отличаться.' },
  6: { fold: 'Одно кресло третьего ряда можно сложить', intro: 'Шесть пассажиров — удобный вариант для друзей или двух семей. Остаётся одно место, которое в совместимом салоне можно сложить для вещей.', use: 'Две семьи, друзья или небольшая рабочая группа', detail: 'В конструкторе два кресла третьего ряда подняты, одно сложено. Узкая дополнительная зона помогает разместить часть вещей, но не превращает салон в большой багажник. Длину лыжных чехлов и объём чемоданов нужно проверять отдельно.' },
  7: { fold: 'Все пассажирские кресла остаются поднятыми', intro: 'Семь пассажиров — максимальная вместимость этого конструктора. Водитель занимает отдельное место. При полной посадке особенно важно заранее посчитать багаж.', use: 'Вся компания в одной машине', detail: 'Третий ряд занят пассажирами, поэтому длинный груз нельзя размещать на их местах или в проходе. Если вещей слишком много, уменьшите количество пассажиров в конструкторе или запросите отдельное решение. Семь человек и семь больших чемоданов не считаются автоматически совместимой загрузкой.' },
} as const;

export function capacityMetadata(count: 5 | 6 | 7): Metadata {
  const title = `Минивэн на ${count} человек с водителем — цены ${pricingYear}`;
  const description = `${count} пассажиров в одном минивэне «Комфорт». ${variants[count].fold}. Расчёт от 3 000 ₽ за автомобиль; проверьте детей и багаж в конструкторе.`;
  const url = `https://zakazminivena.ru/minivan-${count}-mest`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url }, twitter: { title, description, card: 'summary_large_image' } };
}

export function CapacityPage({ count }: { count: 5 | 6 | 7 }) {
  const v = variants[count];
  const examplePrice = priceForDistance(300);
  const faq = [
    { q: `Водитель входит в ${count} мест?`, a: `Нет. Это ${count} пассажиров, водитель отдельно. Каждый ребёнок также занимает отдельное пассажирское место.` },
    { q: 'Как рассчитывается цена?', a: 'Стоимость указана за автомобиль, а не за билет или отдельное место. Базовая ставка — 60 ₽/км; применяются коэффициенты, округление и минимальная стоимость. Итоговую цену согласуем по адресам и условиям поездки.' },
    { q: 'Сколько чемоданов поместится?', a: v.detail },
    { q: 'Можно ли поставить несколько детских кресел?', a: 'Укажите количество детей, возраст, рост и вес каждого. Подходящие кресла, соседние пассажирские места и место для коляски подтвердим для выбранной машины.' },
  ];
  return <div><Header /><main className="pt-20">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: `На ${count} человек` }]} />
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-emerald">{v.use}</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Минивэн на {count} человек с водителем</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{v.intro}</p>
      <p className="mt-5 rounded-xl bg-emerald/5 p-4 font-medium">{v.fold}. Конкретную компоновку и багаж согласуем перед заказом.</p>
      <div className="mt-4"><PricingNote /></div>
      <a href="#trip-constructor" className="mt-6 inline-flex rounded-full bg-emerald px-6 py-3 font-semibold text-white">Посмотреть свою компанию и багаж ↓</a>
    </section>
    <TripConstructor passengers={count} emptyRoute contextNote={`Выбрано ${count} пассажиров. Укажите маршрут, детей и вещи; количество поднятых кресел можно изменить.`} />
    <section className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6">
      <div><h2 className="text-2xl font-bold">Сколько стоит поездка на {count} человек</h2><p className="mt-3 leading-relaxed">Пример расчёта: ровно 300 км по правилам тарифа — от {examplePrice.toLocaleString('ru-RU')} ₽ за минивэн. Если разделить между {count} пассажирами, получится около {Math.round(examplePrice / count).toLocaleString('ru-RU')} ₽ на человека. Это арифметический пример, не продажа мест и не гарантия цены на любой маршрут длиной 300 км.</p><p className="mt-3 leading-relaxed">Несколько такси, поезд и минивэн сравнивайте по фактическим ценам на вашу дату, включая подачу, багаж и поездки до вокзала. Главное преимущество минивэна — одна компания, один маршрут и согласованные остановки.</p></div>
      <div><h2 className="text-2xl font-bold">Как распределяются места и вещи</h2><p className="mt-3 leading-relaxed">{v.detail} Багаж должен быть закреплён и не мешать пассажирам, ремням и выходу из салона.</p></div>
      <div><h2 className="text-2xl font-bold">Частые вопросы</h2><div className="mt-4 space-y-3">{faq.map(f => <details key={f.q} className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div></div>
      <nav className="flex flex-wrap gap-3" aria-label="Другие варианты поездки">{([5,6,7] as const).filter(n => n !== count).map(n => <Link className="rounded-full border px-4 py-2" key={n} href={`/minivan-${n}-mest`}>На {n} человек</Link>)}<Link className="rounded-full border px-4 py-2" href="/service/luggage">Много багажа</Link><Link className="rounded-full border px-4 py-2" href="/services/children">С детьми</Link><Link className="rounded-full border px-4 py-2" href="/routes">Маршруты с ценами</Link></nav>
    </section>
  </main><Footer /></div>;
}
