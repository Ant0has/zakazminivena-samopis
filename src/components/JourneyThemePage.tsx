import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumbs } from './Breadcrumbs';
import { JourneyHero } from './JourneyHero';
import { TripConstructor } from './TripConstructor';
import { journeyThemes } from '@/lib/journey-themes';
import { getJourneyIllustration, journeySocialImage } from '@/lib/journey-illustrations';
import { allRoutes, formatPrice, calcPrice } from '@/lib/routes-data';
import { destinationRoutes } from '@/lib/destinations-data';

type Slug = keyof typeof journeyThemes;
export function journeyThemeMetadata(slug: Slug): Metadata {
  const theme = journeyThemes[slug];
  const path = '/service/' + slug;
  const image = journeySocialImage(path)!;
  return { title: theme.title, description: theme.description, alternates: { canonical: 'https://zakazminivena.ru' + path }, openGraph: { title: theme.title, description: theme.description, url: 'https://zakazminivena.ru' + path, images: [image] }, twitter: { card: 'summary_large_image', title: theme.title, description: theme.description, images: [image.url] } };
}
export function JourneyThemePage({ slug }: { slug: Slug }) {
  const theme = journeyThemes[slug];
  const routes = slug === 'ski-transfer'
    ? destinationRoutes.filter(r => /dombay|arkhyz|elbrus|manzherok|kirovsk/.test(r.routeSlug)).slice(0,6).map(r => ({ path: `/destination/${r.regionSlug}/${r.routeSlug}`, name: `${r.fromCity} → ${r.toCity}`, km: r.km, pricingDistanceM: r.pricingDistanceM }))
    : allRoutes.filter(r => ['kazan-samara','ekaterinburg-chelyabinsk','tyumen-ekaterinburg','krasnodar-yalta'].includes(r.slug)).map(r => ({ path: '/routes/' + r.slug, name: `${r.from} → ${r.to}`, km: r.km, pricingDistanceM: r.pricingDistanceM }));
  return <div><Header /><main className="pt-20">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: theme.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />
    <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6"><Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Сценарии', href: '/service' }, { label: slug === 'luggage' ? 'Большой багаж' : 'Лыжи и сноуборды' }]} /></div>
    <JourneyHero image={getJourneyIllustration('/service/' + slug)} title={theme.title} description={theme.description} eyebrow={theme.eyebrow} />
    <TripConstructor scenario={theme.scenario} emptyRoute contextNote="Уже выбран пример багажа. Укажите свой маршрут и измените параметры — это эскиз поездки, не подтверждённая вместимость." />
    <section className="mx-auto max-w-5xl space-y-9 px-4 py-12 sm:px-6">
      <p className="text-lg leading-relaxed">{theme.intro}</p>
      {theme.sections.map(s => <article key={s.title}><h2 className="text-2xl font-bold">{s.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p></article>)}
      <div><h2 className="text-2xl font-bold">Маршруты с расчётом стоимости</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{routes.map(r => <Link key={r.path} href={r.path} className="rounded-xl border p-4 hover:border-emerald"><span className="block font-semibold">{r.name}</span><span className="mt-2 block text-sm text-muted-foreground">Около {r.km} км · от {formatPrice(calcPrice(r.km, r.pricingDistanceM))} ₽ за минивэн</span></Link>)}</div></div>
      <div><h2 className="text-2xl font-bold">Частые вопросы</h2><div className="mt-4 space-y-3">{theme.faq.map(f => <details key={f.q} className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div></div>
      <nav aria-label="Смежные сценарии" className="flex flex-wrap gap-3">{[5,6,7].map(n => <Link key={n} href={`/minivan-${n}-mest`} className="rounded-full border px-4 py-2">На {n} человек</Link>)}<Link className="rounded-full border px-4 py-2" href="/services/children">С детьми</Link><Link className="rounded-full border px-4 py-2" href={slug === 'luggage' ? '/service/ski-transfer' : '/service/luggage'}>{slug === 'luggage' ? 'Лыжи и сноуборды' : 'Много багажа'}</Link></nav>
    </section>
  </main><Footer /></div>;
}
