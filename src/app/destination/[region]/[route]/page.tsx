import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Card } from "@/components/ui/card";
import {
  destinationRoutes,
  getDestinationRoute,
  getDestinationRoutesByRegion,
  getDestinationHub,
} from "@/lib/destinations-data";
import { calcPrice, calcRoundTripTotal, formatPrice } from "@/lib/routes-data";
import { CheckIcon, ClockIcon, MapPinIcon, RulerIcon } from "lucide-react";

export function generateStaticParams() {
  return destinationRoutes.map((r) => ({ region: r.regionSlug, route: r.routeSlug }));
}

type Props = { params: Promise<{ region: string; route: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, route } = await params;
  const data = getDestinationRoute(region, route);
  if (!data) return {};
  const price = formatPrice(calcPrice(data.km));
  return {
    title: `Минивэн ${data.fromCity} → ${data.toCity} — от ${price} ₽ за машину | ЗаказМинивена.ru`,
    description: `Маршрут ${data.fromCity} → ${data.toCity} на минивэне: ${data.km} км, ${data.hours}. 6–8 мест с багажом. Возможны остановки. Цена от ${price} ₽.`,
    alternates: { canonical: `https://zakazminivena.ru/destination/${region}/${route}` },
  };
}

export default async function DestinationRoutePage({ params }: Props) {
  const { region, route } = await params;
  const data = getDestinationRoute(region, route);
  const hub = getDestinationHub(region);
  if (!data || !hub) notFound();
  const price = formatPrice(calcPrice(data.km));
  const priceRoundTrip = formatPrice(calcRoundTripTotal(data.km));
  const relatedRoutes = getDestinationRoutesByRegion(region)
    .filter((r) => r.routeSlug !== route)
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `Минивэн ${data.fromCity} → ${data.toCity}`,
    description: `Минивэн на 6–8 мест из ${data.fromCity} в ${data.toCity}. Фикс цена от ${price} ₽.`,
    provider: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
    },
    offers: {
      "@type": "Offer",
      price: String(calcPrice(data.km)),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Туристические направления", href: "/destination" },
            { label: hub.regionName, href: `/destination/${region}` },
            { label: `${data.fromCity} – ${data.toCity}` },
          ]}
        />

        <section className="py-10 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:px-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded bg-emerald/10 px-2 py-1 text-xs font-medium uppercase text-emerald">
                <MapPinIcon className="h-4 w-4" /> {hub.regionName}
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Минивэн {data.fromCity} → {data.toCity} — от {price} ₽ за машину
              </h1>
              <p className="mb-6 text-base text-muted-foreground sm:text-lg">
                {data.km} км, {data.hours} в пути. До 8 пассажиров с багажом. Возможны остановки.
              </p>
              <p className="mb-4 text-sm leading-6 text-muted-foreground">{data.uniqueIntro}</p>

              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <Card className="p-4 text-center">
                  <RulerIcon className="mx-auto mb-1 h-5 w-5 text-emerald" />
                  <div className="text-xs text-muted-foreground">Расстояние</div>
                  <div className="text-base font-semibold">{data.km} км</div>
                </Card>
                <Card className="p-4 text-center">
                  <ClockIcon className="mx-auto mb-1 h-5 w-5 text-emerald" />
                  <div className="text-xs text-muted-foreground">Время</div>
                  <div className="text-base font-semibold">{data.hours}</div>
                </Card>
                <Card className="p-4 text-center">
                  <MapPinIcon className="mx-auto mb-1 h-5 w-5 text-emerald" />
                  <div className="text-xs text-muted-foreground">Цена за машину</div>
                  <div className="text-base font-semibold">от {price} ₽</div>
                </Card>
              </div>

              <h2 className="mb-3 text-xl font-semibold">Что в этой поездке</h2>
              <p className="mb-4 text-sm leading-6 text-muted-foreground">{data.uniqueRouteDesc}</p>

              <h2 className="mb-3 text-xl font-semibold">Цена и варианты</h2>
              <p className="mb-2 text-sm">
                <span className="font-medium">Цена в одну сторону:</span> от {price} ₽ за машину.
              </p>
              <p className="mb-2 text-sm">
                <span className="font-medium">Туда-обратно за день:</span> {priceRoundTrip} ₽.
              </p>
              <p className="mb-4 text-sm">
                <span className="font-medium">С ночёвкой водителя:</span> от {formatPrice(calcPrice(data.km) + 8000)} ₽
                (зависит от стоимости размещения).
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Доплаты: ночь (+20%), праздничные дни, доп.остановки (+500 ₽ каждая).
              </p>

              <h2 className="mb-3 text-xl font-semibold">Что посмотреть в {data.toCity}</h2>
              <ul className="mb-6 space-y-2 text-sm">
                {data.pointsOfInterest.map((p) => (
                  <li key={p.name}>
                    <span className="font-medium">{p.name}</span> — {p.description}
                  </li>
                ))}
              </ul>

              <h2 className="mb-3 text-xl font-semibold">Особенности поездки</h2>
              <p className="mb-6 text-sm leading-6 text-muted-foreground">{data.specifics}</p>

              {data.seasonalNotes && (
                <>
                  <h2 className="mb-3 text-xl font-semibold">Когда лучше ехать</h2>
                  <p className="mb-6 text-sm leading-6 text-muted-foreground">
                    {data.seasonalNotes}
                  </p>
                </>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BookingForm defaultFrom={data.fromCity} defaultTo={data.toCity} />
            </aside>
          </div>
        </section>

        {relatedRoutes.length > 0 && (
          <section className="border-t bg-muted/30 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-4 text-xl font-semibold">Другие маршруты в {hub.regionName}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedRoutes.map((r) => (
                  <Link key={r.routeSlug} href={`/destination/${region}/${r.routeSlug}`}>
                    <Card className="p-4 transition-colors hover:border-emerald">
                      <div className="font-medium">
                        {r.fromCity} → {r.toCity}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {r.km} км · {r.hours} · от {formatPrice(calcPrice(r.km))} ₽
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {data.airportLink && (
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-3 text-xl font-semibold">Прилетаете в аэропорт?</h2>
              <p className="mb-3 text-sm text-muted-foreground">
                Смотрите соответствующий аэропортовый трансфер — тот же маршрут, но из аэропорта.
              </p>
              <Link
                href={`/airport/${data.airportLink}`}
                className="inline-block rounded-md border px-4 py-2 text-sm hover:border-emerald hover:text-emerald"
              >
                /airport/{data.airportLink}
              </Link>
            </div>
          </section>
        )}

        <B2bCtaBlock />
      </main>
      <Footer />
    </div>
  );
}
