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
import {
  airportRoutes,
  getAirportRoute,
  getAirportRoutesByIata,
} from "@/lib/airport-routes-data";
import { getIataAirport } from "@/lib/iata-airports";
import { calcPrice, calcRoundTripTotal, formatPrice } from "@/lib/routes-data";
import { getAirportRouteHeroImage } from "@/lib/hero-images";
import {
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  RulerIcon,
  PlaneIcon,
  ShieldCheckIcon,
  UsersIcon,
  BabyIcon,
  WalletIcon,
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
  const heroImage = getAirportRouteHeroImage(iata);

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

  const advantages = [
    { icon: ShieldCheckIcon, title: "Фикс цена", desc: "Цена за машину, не зависит от пробок" },
    { icon: UsersIcon, title: "До 8 пассажиров", desc: "Просторный салон с местом для багажа" },
    { icon: BabyIcon, title: "Дет.кресла бесплатно", desc: "Бустер, 9–18 кг, 18–36 кг" },
    { icon: ClockIcon, title: "Ожидание 60 мин", desc: "Бесплатно при задержке рейса" },
    { icon: WalletIcon, title: "Безнал и онлайн", desc: "Карта, СБП, по реквизитам для юрлиц" },
    { icon: PlaneIcon, title: "Встреча с табличкой", desc: "В зоне прилёта по фамилии" },
  ];

  return (
    <div className="relative min-h-screen">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Аэропорты", href: "/airport" },
            { label: airport.name, href: `/airport/${iata}` },
            { label: route.destinationName },
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
                    <PlaneIcon className="mr-1 h-3 w-3" /> {iata.toUpperCase()} → {route.destinationName}
                  </Badge>
                  <Badge variant="outline" className="border-emerald/30 bg-emerald/5 text-emerald">
                    <ShieldCheckIcon className="mr-1 h-3 w-3" /> Фикс цена
                  </Badge>
                  <Badge variant="outline" className="border-emerald/30 bg-emerald/5 text-emerald">
                    <UsersIcon className="mr-1 h-3 w-3" /> До 8 мест
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Минивэн из {airport.nameFull} в {route.destinationName} —{" "}
                  <span className="text-gradient">от {price} ₽</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
                  6–8 мест с багажом. Время в пути {route.hours}. {route.km} км по маршруту.
                  Фикс цена за машину, не за пассажира.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="rounded-xl border bg-card p-4 text-center">
                    <RulerIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
                    <div className="text-xs text-muted-foreground">Расстояние</div>
                    <div className="text-base font-semibold sm:text-lg">{route.km} км</div>
                  </div>
                  <div className="rounded-xl border bg-card p-4 text-center">
                    <ClockIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
                    <div className="text-xs text-muted-foreground">Время</div>
                    <div className="text-base font-semibold sm:text-lg">{route.hours}</div>
                  </div>
                  <div className="rounded-xl border bg-card p-4 text-center">
                    <WalletIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
                    <div className="text-xs text-muted-foreground">Цена за машину</div>
                    <div className="text-base font-semibold sm:text-lg">от {price} ₽</div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#booking" className="rounded-lg bg-emerald px-6 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90">
                    Узнать точную цену
                  </a>
                  <a href="https://wa.me/79185875454" className="rounded-lg border px-6 py-3 text-sm font-medium hover:border-emerald hover:text-emerald">
                    Заказать в WhatsApp
                  </a>
                </div>
              </div>

              {/* Hero image — большая, занимает всю правую колонку */}
              <div className="relative h-72 overflow-hidden rounded-2xl shadow-xl sm:h-96 lg:h-[480px]">
                <Image
                  src={heroImage}
                  alt={`Минивэн ${airport.name} → ${route.destinationName}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="text-xs uppercase tracking-wide text-white/80">Маршрут</div>
                  <div className="text-xl font-semibold text-white sm:text-2xl">
                    {airport.name} → {route.destinationName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA / ФОРМА ===== */}
        <section id="booking" className="border-t bg-muted/30 py-16 sm:py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Заказать минивэн
                </h2>
                <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                  Заполните форму — менеджер свяжется в течение 5 минут и пришлёт фикс цену с
                  контактом водителя.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-emerald" />
                    Подтверждение в течение 5 минут
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-emerald" />
                    Безналичный расчёт и ККТ-чек электронный
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-emerald" />
                    Бесплатное ожидание 60 минут при задержке рейса
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-emerald" />
                    Бесплатные дет.кресла любого типа
                  </li>
                </ul>
              </div>
              <BookingForm defaultFrom={airport.nameFull} defaultTo={route.destinationName} />
            </div>
          </div>
        </section>

        {/* ===== ПРЕИМУЩЕСТВА ===== */}
        <section className="border-t bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Что входит в цену
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Без скрытых доплат. Всё включено в фиксированную цену за машину.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((a) => (
                <Card key={a.title} className="p-6">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                    <a.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== О МАРШРУТЕ ===== */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              О маршруте
            </h2>
            <p className="mb-4 text-base leading-7 text-muted-foreground sm:text-lg">
              {route.uniqueIntro}
            </p>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              {route.uniqueRouteDesc}
            </p>
          </div>
        </section>

        {/* ===== ЦЕНА И ВАРИАНТЫ ===== */}
        <section className="border-t bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Стоимость и варианты
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Цена за машину 6–8 мест. Не зависит от количества пассажиров.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-6">
                <div className="text-sm text-muted-foreground">В одну сторону</div>
                <div className="mt-1 text-3xl font-bold">от {price} ₽</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Минивэн с водителем · до 8 пасс. · бесплатное ожидание 60 мин
                </div>
              </Card>
              <Card className="p-6">
                <div className="text-sm text-muted-foreground">Туда-обратно за день</div>
                <div className="mt-1 text-3xl font-bold">{priceRoundTrip} ₽</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Подача + ожидание + обратный путь со скидкой 20%
                </div>
              </Card>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              <strong className="text-foreground">Доплаты:</strong> ночной тариф (00:00–06:00) +20% ·
              доп.остановка +500 ₽
            </p>
          </div>
        </section>

        {/* ===== КАК ЗАКАЗАТЬ ===== */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Как заказать
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Три шага — от заявки до встречи водителя в аэропорту
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { step: "1", title: "Заявка", desc: "Заполните форму или напишите в WhatsApp/Telegram" },
                { step: "2", title: "Подтверждение", desc: "Менеджер свяжется в течение 5 минут, пришлёт контакт водителя" },
                { step: "3", title: "Поездка", desc: "Водитель встретит вас в зоне прилёта с табличкой по фамилии" },
              ].map((s) => (
                <Card key={s.step} className="p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-lg font-bold text-emerald-foreground">
                    {s.step}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ДРУГИЕ НАПРАВЛЕНИЯ ===== */}
        {sameHubRoutes.length > 0 && (
          <section className="border-t bg-muted/30 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Другие направления из {airport.name}
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  Минивэн в любую точку Подмосковья и соседних регионов
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sameHubRoutes.map((r) => (
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
            </div>
          </section>
        )}

        {/* ===== ДРУГИЕ АЭРОПОРТЫ В ТУ ЖЕ ТОЧКУ ===== */}
        {route.relatedToSamePoint && route.relatedToSamePoint.length > 0 && (
          <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Из других аэропортов в {route.destinationName}
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {route.relatedToSamePoint.map((pair) => {
                  const [otherIata, otherDest] = pair.split("/");
                  const otherAirport = getIataAirport(otherIata);
                  if (!otherAirport) return null;
                  return (
                    <Link
                      key={pair}
                      href={`/airport/${otherIata}/${otherDest}`}
                      className="rounded-md border px-4 py-2 text-sm transition-colors hover:border-emerald hover:text-emerald"
                    >
                      {otherAirport.name} ({otherIata.toUpperCase()}) → {route.destinationName}
                    </Link>
                  );
                })}
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
