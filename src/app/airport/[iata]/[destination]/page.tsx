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
  airportRoutes,
  getAirportRoute,
  getAirportRoutesByIata,
} from "@/lib/airport-routes-data";
import { getIataAirport } from "@/lib/iata-airports";
import { calcPrice, calcRoundTripTotal, formatPrice } from "@/lib/routes-data";
import {
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  RulerIcon,
  PlaneIcon,
} from "lucide-react";

export function generateStaticParams() {
  return airportRoutes.map((r) => ({ iata: r.iata, destination: r.destinationSlug }));
}

type Props = { params: Promise<{ iata: string; destination: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { iata, destination } = await params;
  const airport = getIataAirport(iata);
  const route = getAirportRoute(iata, destination);
  if (!airport || !route) return {};
  const price = formatPrice(calcPrice(route.km));
  return {
    title: `Минивэн ${airport.name} → ${route.destinationName} от ${price} ₽ | ЗаказМинивена.ru`,
    description: `Минивэн из аэропорта ${airport.nameFull} в ${route.destinationName}: ${route.km} км, ${route.hours}. Цена от ${price} ₽ за машину 6–8 мест. Встреча с табличкой. Заказ онлайн.`,
    alternates: { canonical: `https://zakazminivena.ru/airport/${iata}/${destination}` },
    openGraph: {
      title: `Минивэн ${airport.name} → ${route.destinationName} — от ${price} ₽`,
      description: `Маршрут ${airport.nameFull} → ${route.destinationName}. ${route.km} км, ${route.hours}. Фикс цена ${price} ₽.`,
      url: `https://zakazminivena.ru/airport/${iata}/${destination}`,
      siteName: "ЗаказМинивена.ru",
      locale: "ru_RU",
      type: "website",
    },
  };
}

export default async function AirportRoutePage({ params }: Props) {
  const { iata, destination } = await params;
  const airport = getIataAirport(iata);
  const route = getAirportRoute(iata, destination);
  if (!airport || !route) notFound();

  const price = formatPrice(calcPrice(route.km));
  const priceRoundTrip = formatPrice(calcRoundTripTotal(route.km));
  const sameHubRoutes = getAirportRoutesByIata(iata)
    .filter((r) => r.destinationSlug !== destination)
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `Минивэн ${airport.name} → ${route.destinationName}`,
    description: `Минивэн на 6–8 мест из аэропорта ${airport.nameFull} в ${route.destinationName}. Фикс цена от ${price} ₽ за машину.`,
    provider: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
    },
    areaServed: [{ "@type": "City", name: airport.city }],
    offers: {
      "@type": "Offer",
      price: String(calcPrice(route.km)),
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
            { label: "Аэропорты", href: "/airport" },
            { label: airport.name, href: `/airport/${iata}` },
            { label: route.destinationName },
          ]}
        />

        <section className="py-10 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:px-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded bg-emerald/10 px-2 py-1 text-xs font-medium uppercase text-emerald">
                <PlaneIcon className="h-4 w-4" /> {iata.toUpperCase()} → {route.destinationName}
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Минивэн из {airport.nameFull} в {route.destinationName} — от {price} ₽
              </h1>
              <p className="mb-6 text-base text-muted-foreground sm:text-lg">
                6–8 мест с багажом. Время в пути {route.hours}. {route.km} км. Фикс цена за машину,
                не за пассажира.
              </p>
              <p className="mb-4 text-sm leading-6 text-muted-foreground">{route.uniqueIntro}</p>

              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <Card className="p-4 text-center">
                  <RulerIcon className="mx-auto mb-1 h-5 w-5 text-emerald" />
                  <div className="text-xs text-muted-foreground">Расстояние</div>
                  <div className="text-base font-semibold">{route.km} км</div>
                </Card>
                <Card className="p-4 text-center">
                  <ClockIcon className="mx-auto mb-1 h-5 w-5 text-emerald" />
                  <div className="text-xs text-muted-foreground">Время</div>
                  <div className="text-base font-semibold">{route.hours}</div>
                </Card>
                <Card className="p-4 text-center">
                  <MapPinIcon className="mx-auto mb-1 h-5 w-5 text-emerald" />
                  <div className="text-xs text-muted-foreground">Цена за машину</div>
                  <div className="text-base font-semibold">от {price} ₽</div>
                </Card>
              </div>

              <h2 className="mb-3 text-xl font-semibold">Цена и что включено</h2>
              <p className="mb-2 text-sm">
                <span className="font-medium">Цена:</span> от {price} ₽ за машину (минивэн до 8
                пассажиров с водителем).
              </p>
              <p className="mb-2 text-sm">
                <span className="font-medium">Туда-обратно за день:</span> {priceRoundTrip} ₽.
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Доплаты: ночной тариф (00:00–06:00) +20%, доп.остановка в пути +500 ₽.
              </p>
              <ul className="mb-6 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Подача в указанную точку
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Ожидание 60 мин при задержке рейса
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Дет.кресло бесплатно
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Табличка с фамилией
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Помощь с багажом
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Безналичный расчёт + ККТ-чек
                </li>
              </ul>

              <h2 className="mb-3 text-xl font-semibold">Маршрут</h2>
              <p className="mb-6 text-sm leading-6 text-muted-foreground">{route.uniqueRouteDesc}</p>

              <h2 className="mb-3 text-xl font-semibold">Как заказать</h2>
              <ol className="mb-8 list-decimal space-y-2 pl-5 text-sm">
                <li>Заполните форму на этой странице</li>
                <li>Получите подтверждение от менеджера в WhatsApp/Telegram в течение 5 минут</li>
                <li>Водитель встретит вас в зоне прилёта с табличкой по фамилии</li>
              </ol>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BookingForm defaultFrom={airport.nameFull} defaultTo={route.destinationName} />
            </aside>
          </div>
        </section>

        {sameHubRoutes.length > 0 && (
          <section className="border-t bg-muted/30 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-4 text-xl font-semibold">Другие направления из {airport.name}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sameHubRoutes.map((r) => (
                  <Link key={r.destinationSlug} href={`/airport/${iata}/${r.destinationSlug}`}>
                    <Card className="p-4 transition-colors hover:border-emerald">
                      <div className="text-sm text-muted-foreground">{airport.name} →</div>
                      <div className="font-medium">{r.destinationName}</div>
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

        {route.relatedToSamePoint && route.relatedToSamePoint.length > 0 && (
          <section className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-4 text-xl font-semibold">
                Другие аэропорты в {route.destinationName}
              </h2>
              <div className="flex flex-wrap gap-3">
                {route.relatedToSamePoint.map((pair) => {
                  const [otherIata, otherDest] = pair.split("/");
                  const otherAirport = getIataAirport(otherIata);
                  if (!otherAirport) return null;
                  return (
                    <Link
                      key={pair}
                      href={`/airport/${otherIata}/${otherDest}`}
                      className="rounded-md border px-4 py-2 text-sm hover:border-emerald hover:text-emerald"
                    >
                      {otherAirport.name} ({otherIata.toUpperCase()}) → {route.destinationName}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {route.airportLinks && route.airportLinks.length > 0 && (
          <section className="border-t py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-4 text-xl font-semibold">Связанные туристические маршруты</h2>
              <div className="flex flex-wrap gap-3">
                {route.airportLinks.map((link) => (
                  <Link
                    key={link}
                    href={`/${link}`}
                    className="rounded-md border px-4 py-2 text-sm hover:border-emerald hover:text-emerald"
                  >
                    /{link}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <B2bCtaBlock />
      </main>
      <Footer />
    </div>
  );
}
