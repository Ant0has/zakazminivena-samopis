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
  destinationHubs,
  getDestinationHub,
  getDestinationRoutesByRegion,
} from "@/lib/destinations-data";
import { fleetBySlug } from "@/lib/fleet-data";
import { calcPrice, formatPrice } from "@/lib/routes-data";
import { CheckIcon, MapPinIcon } from "lucide-react";

export function generateStaticParams() {
  return destinationHubs.map((h) => ({ region: h.slug }));
}

type Props = { params: Promise<{ region: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const hub = getDestinationHub(region);
  if (!hub) return {};
  const routes = getDestinationRoutesByRegion(region);
  const minPrice = routes.length > 0 ? Math.min(...routes.map((r) => calcPrice(r.km))) : 4000;
  return {
    title: `Минивэн в ${hub.regionName} из ${hub.hubCity} — туры и трансферы | ЗаказМинивена.ru`,
    description: `Минивэн с водителем в ${hub.regionName}: однодневные и многодневные поездки из ${hub.hubCity}. До 8 мест. Водитель, знающий регион. От ${formatPrice(minPrice)} ₽`,
    alternates: { canonical: `https://zakazminivena.ru/destination/${region}` },
  };
}

export default async function DestinationHubPage({ params }: Props) {
  const { region } = await params;
  const hub = getDestinationHub(region);
  if (!hub) notFound();
  const routes = getDestinationRoutesByRegion(region);
  const fleet = hub.fleetModels.map((s) => fleetBySlug[s]).filter(Boolean);

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Туристические направления", href: "/destination" },
            { label: hub.regionName },
          ]}
        />
        <section className="py-10 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:px-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded bg-emerald/10 px-2 py-1 text-xs font-medium uppercase text-emerald">
                <MapPinIcon className="h-4 w-4" /> Туркластер
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Минивэн в {hub.regionName} из {hub.hubCity}
              </h1>
              <p className="mb-2 text-base text-muted-foreground sm:text-lg">
                {hub.topPointsShort}
              </p>
              <p className="mb-4 text-sm leading-6 text-muted-foreground">{hub.heroIntro}</p>
              <ul className="mb-6 grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Водитель знает регион
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Гибкий маршрут
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> Остановки для фото
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-emerald" /> До 8 пассажиров
                </li>
              </ul>
            </div>
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BookingForm defaultFrom={hub.hubCity} />
            </aside>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              Популярные маршруты в {hub.regionName}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((r) => (
                <Link key={r.routeSlug} href={`/destination/${region}/${r.routeSlug}`}>
                  <Card className="h-full p-4 transition-colors hover:border-emerald">
                    <div className="font-medium">
                      {r.fromCity} → {r.toCity}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {r.km} км · {r.hours}
                    </div>
                    <div className="mt-2 text-sm font-semibold">
                      от {formatPrice(calcPrice(r.km))} ₽
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Лучшее время для поездки
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Сезонные особенности и рекомендации по месяцам
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hub.seasons.map((s) => (
                <Card key={s.months} className="p-4">
                  <div className="mb-1 text-xs uppercase text-emerald">{s.months}</div>
                  <div className="text-sm">{s.description}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {hub.multidayTours.length > 0 && (
          <section className="border-t bg-muted/30 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
                Многодневные туры с ночёвкой водителя
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Готовые пакеты — мы делаем то, что Яндекс Go по определению не делает
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {hub.multidayTours.map((t) => (
                  <Card key={t.name} className="p-5">
                    <div className="mb-1 text-xs uppercase text-emerald">{t.days} {t.days === 1 ? "день" : "дня"}</div>
                    <h3 className="mb-2 text-lg font-semibold">{t.name}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{t.description}</p>
                    <div className="text-base font-semibold">от {formatPrice(t.priceFrom)} ₽</div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              Что взять с собой
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {hub.packingList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {fleet.length > 0 && (
          <section className="border-t bg-muted/30 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
                Парк на {hub.regionNameAcc}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {fleet.map((m) => (
                  <Link key={m.slug} href={`/fleet/${m.slug}`}>
                    <Card className="h-full p-4 transition-colors hover:border-emerald">
                      <div className="mb-1 text-xs uppercase text-muted-foreground">{m.tier}</div>
                      <div className="font-semibold">{m.fullName}</div>
                      <div className="text-sm text-muted-foreground">
                        {m.seats} пасс. · {m.luggageL} л
                      </div>
                    </Card>
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
