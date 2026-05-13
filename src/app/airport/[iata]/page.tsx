import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Card } from "@/components/ui/card";
import { iataAirports, getIataAirport } from "@/lib/iata-airports";
import { getAirportRoutesByIata } from "@/lib/airport-routes-data";
import { calcPrice, formatPrice } from "@/lib/routes-data";
import { fleetBySlug } from "@/lib/fleet-data";
import { PlaneIcon, MapPinIcon, CheckIcon, ClockIcon } from "lucide-react";

export function generateStaticParams() {
  return iataAirports.map((a) => ({ iata: a.iata }));
}

type Props = { params: Promise<{ iata: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { iata } = await params;
  const airport = getIataAirport(iata);
  if (!airport) return {};
  const routes = getAirportRoutesByIata(iata);
  const minPrice = routes.length > 0 ? Math.min(...routes.map((r) => calcPrice(r.km))) : 4000;
  return {
    title: `Минивэн в аэропорт ${airport.name} (${iata.toUpperCase()}) — заказ с водителем | ЗаказМинивена.ru`,
    description: `Минивэн в ${airport.name} и обратно. Фикс цена от ${formatPrice(
      minPrice
    )} ₽ за машину 6–8 мест. Встреча с табличкой, ожидание при задержке рейса. Заказ онлайн`,
    alternates: { canonical: `https://zakazminivena.ru/airport/${iata}` },
  };
}

export default async function AirportHubPage({ params }: Props) {
  const { iata } = await params;
  const airport = getIataAirport(iata);
  if (!airport) notFound();
  const routes = getAirportRoutesByIata(iata);
  const minPrice = routes.length > 0 ? Math.min(...routes.map((r) => calcPrice(r.km))) : 4000;
  const fleetForHub = airport.fleet.map((s) => fleetBySlug[s]).filter(Boolean);
  const otherMoscowAirports = ["svo", "vko", "dme", "zia"].filter((c) => c !== iata);
  const sameRegionAirports =
    airport.region === "Краснодарский край"
      ? ["aer", "krr", "aaq"].filter((c) => c !== iata)
      : otherMoscowAirports.includes(iata)
      ? otherMoscowAirports
      : [];

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Аэропорты", href: "/airport" },
            { label: airport.name },
          ]}
        />

        <section className="py-10 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded bg-emerald/10 px-2 py-1 text-xs font-medium uppercase text-emerald">
                <PlaneIcon className="h-4 w-4" /> {iata.toUpperCase()}
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Минивэн в аэропорт {airport.name} ({iata.toUpperCase()})
              </h1>
              <p className="mb-6 text-base text-muted-foreground sm:text-lg">
                6–8 пассажиров с багажом. Подача к терминалу. Бесплатное ожидание 60 минут при
                задержке рейса. Цена от {formatPrice(minPrice)} ₽ за машину.
              </p>
              <ul className="mb-6 grid grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-emerald" /> Фикс цена</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-emerald" /> Табличка с фамилией</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-emerald" /> Дет.кресла бесплатно</li>
                <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-emerald" /> Безнал и для юрлиц</li>
              </ul>
              <h2 className="mb-3 text-lg font-semibold">Терминалы {airport.name}</h2>
              <ul className="mb-2 space-y-1 text-sm text-muted-foreground">
                {airport.terminals.map((t) => (
                  <li key={t.code}>
                    <span className="font-medium text-foreground">Терминал {t.code}</span> — {t.description}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground">Расстояние до центра: ~{airport.kmToCenter} км</p>
            </div>
            <div>
              <BookingForm defaultTo={airport.name} />
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Направления из {airport.name}
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Все маршруты по фикс цене за машину 6–8 мест. Цены ниже — за машину, не за пассажира.
            </p>
            {routes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Маршруты добавим в ближайшее время. Уточните цену по форме заказа.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-3 pr-4 font-medium">Маршрут</th>
                      <th className="py-3 pr-4 font-medium">Расстояние</th>
                      <th className="py-3 pr-4 font-medium">Время</th>
                      <th className="py-3 pr-4 font-medium">Цена от</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.map((r) => (
                      <tr key={r.destinationSlug} className="border-b hover:bg-muted/40">
                        <td className="py-3 pr-4">
                          <Link
                            href={`/airport/${iata}/${r.destinationSlug}`}
                            className="font-medium text-emerald hover:underline"
                          >
                            {airport.name} → {r.destinationName}
                          </Link>
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">{r.km} км</td>
                        <td className="py-3 pr-4 text-muted-foreground">{r.hours}</td>
                        <td className="py-3 pr-4 font-semibold">{formatPrice(calcPrice(r.km))} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {fleetForHub.length > 0 && (
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
                Какие минивэны подаём в {airport.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {fleetForHub.map((m) => (
                  <Link key={m.slug} href={`/fleet/${m.slug}`}>
                    <Card className="h-full p-4 transition-colors hover:border-emerald">
                      <div className="mb-1 text-xs uppercase text-muted-foreground">{m.tier}</div>
                      <div className="font-semibold">{m.fullName}</div>
                      <div className="text-sm text-muted-foreground">
                        {m.seats} пасс. · {m.luggageL} л багаж
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <B2bCtaBlock />

        {sameRegionAirports.length > 0 && (
          <section className="border-t py-10 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-4 text-xl font-semibold">Другие аэропорты рядом</h2>
              <div className="flex flex-wrap gap-3">
                {sameRegionAirports.map((c) => {
                  const a = getIataAirport(c);
                  if (!a) return null;
                  return (
                    <Link
                      key={c}
                      href={`/airport/${c}`}
                      className="rounded-md border px-4 py-2 text-sm hover:border-emerald hover:text-emerald"
                    >
                      {a.name} ({c.toUpperCase()})
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
