import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iataAirports, getIataAirport } from "@/lib/iata-airports";
import { getAirportRoutesByIata } from "@/lib/airport-routes-data";
import { calcPrice, formatPrice } from "@/lib/routes-data";
import { fleetBySlug } from "@/lib/fleet-data";
import { getAirportHeroImage } from "@/lib/hero-images";
import {
  PlaneIcon,
  MapPinIcon,
  CheckIcon,
  ShieldCheckIcon,
  UsersIcon,
  BabyIcon,
  ClockIcon,
} from "lucide-react";

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
  const heroImage = getAirportHeroImage(iata);

  const otherMoscowAirports = ["svo", "vko", "dme", "zia"].filter((c) => c !== iata);
  const sameRegionAirports =
    airport.region === "Краснодарский край"
      ? ["aer", "krr", "aaq"].filter((c) => c !== iata)
      : otherMoscowAirports.includes(iata)
      ? otherMoscowAirports
      : [];

  const trustItems = [
    { icon: ShieldCheckIcon, title: "Фикс цена за машину" },
    { icon: UsersIcon, title: "6–8 пассажиров с багажом" },
    { icon: BabyIcon, title: "Дет.кресла бесплатно" },
    { icon: ClockIcon, title: "Ожидание 60 мин при задержке" },
    { icon: CheckIcon, title: "Встреча с табличкой" },
    { icon: CheckIcon, title: "Безнал и для юрлиц" },
  ];

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

        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-emerald/30 bg-emerald/5 text-emerald">
                    <PlaneIcon className="mr-1 h-3 w-3" /> {iata.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-emerald/30 bg-emerald/5 text-emerald">
                    <MapPinIcon className="mr-1 h-3 w-3" /> {airport.city}
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Минивэн в аэропорт {airport.name}{" "}
                  <span className="text-gradient">от {formatPrice(minPrice)} ₽</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
                  6–8 пассажиров с багажом. Подача к терминалу. Бесплатное ожидание 60 минут при
                  задержке рейса. Расстояние до центра — {airport.kmToCenter} км.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#routes" className="rounded-lg bg-emerald px-6 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90">
                    Все направления
                  </a>
                  <a href="#booking" className="rounded-lg border px-6 py-3 text-sm font-medium hover:border-emerald hover:text-emerald">
                    Узнать цену
                  </a>
                </div>
              </div>

              <div className="relative h-72 overflow-hidden rounded-2xl shadow-xl sm:h-96 lg:h-[480px]">
                <Image
                  src={heroImage}
                  alt={`Минивэн в ${airport.name}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="text-xs uppercase tracking-wide text-white/80">Аэропорт</div>
                  <div className="text-xl font-semibold text-white sm:text-2xl">
                    {airport.nameFull}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ЧТО ВКЛЮЧЕНО ===== */}
        <section className="border-t bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Что входит в цену
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Без скрытых доплат — всё в фиксированной цене за машину
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trustItems.map((t) => (
                <Card key={t.title} className="flex items-center gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <div className="font-medium">{t.title}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== НАПРАВЛЕНИЯ ===== */}
        <section id="routes" className="py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Направления из {airport.name}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Цена за машину 6–8 мест, не за пассажира
              </p>
            </div>
            {routes.length === 0 ? (
              <Card className="mx-auto max-w-2xl p-8 text-center">
                <p className="text-base text-muted-foreground">
                  Маршруты добавим в ближайшее время. Уточните цену по форме заказа.
                </p>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {routes.map((r) => (
                  <Link key={r.destinationSlug} href={`/airport/${iata}/${r.destinationSlug}`}>
                    <Card className="h-full p-5 transition-all hover:border-emerald hover:shadow-md">
                      <div className="text-xs uppercase tracking-wide text-emerald">
                        {airport.name} →
                      </div>
                      <div className="mt-1 text-lg font-semibold">{r.destinationName}</div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {r.km} км · {r.hours}
                      </div>
                      <div className="mt-3 text-base font-bold">
                        от {formatPrice(calcPrice(r.km))} ₽
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===== ТЕРМИНАЛЫ ===== */}
        <section className="border-t bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Терминалы {airport.name}
            </h2>
            <p className="mb-8 text-base text-muted-foreground sm:text-lg">
              Подаём минивэн к любому терминалу аэропорта. Точное место встречи водитель сообщает
              за 30 минут до прибытия рейса.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {airport.terminals.map((t) => (
                <Card key={t.code} className="p-5">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <PlaneIcon className="h-5 w-5" />
                  </div>
                  <div className="text-sm uppercase tracking-wide text-muted-foreground">
                    Терминал {t.code}
                  </div>
                  <div className="mt-1 text-sm">{t.description}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ПАРК ===== */}
        {fleetForHub.length > 0 && (
          <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Какие минивэны подаём в {airport.name}
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  От универсальных до премиума — под любой бюджет и сценарий
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {fleetForHub.map((m) => (
                  <Link key={m.slug} href={`/fleet/${m.slug}`}>
                    <Card className="h-full p-5 transition-all hover:border-emerald hover:shadow-md">
                      <div className="mb-2 text-xs uppercase tracking-wide text-emerald">
                        {m.tier}
                      </div>
                      <div className="text-lg font-semibold">{m.fullName}</div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {m.seats} пассажиров · {m.luggageL} л багажа
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== CTA / ФОРМА ===== */}
        <section id="booking" className="border-t bg-muted/30 py-16 sm:py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Заказать минивэн в {airport.name}
                </h2>
                <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                  Укажите дату, время прилёта и пункт назначения — пришлём фикс цену за 5 минут.
                </p>
              </div>
              <BookingForm defaultTo={airport.name} />
            </div>
          </div>
        </section>

        <B2bCtaBlock />

        {/* ===== ДРУГИЕ АЭРОПОРТЫ ===== */}
        {sameRegionAirports.length > 0 && (
          <section className="border-t py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Другие аэропорты рядом
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {sameRegionAirports.map((c) => {
                  const a = getIataAirport(c);
                  if (!a) return null;
                  return (
                    <Link
                      key={c}
                      href={`/airport/${c}`}
                      className="rounded-md border px-4 py-2 text-sm transition-colors hover:border-emerald hover:text-emerald"
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
