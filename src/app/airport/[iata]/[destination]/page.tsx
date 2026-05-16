import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackground, HeroVehicleImage } from "@/components/HeroBackground";
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
import { FleetTariffCards } from "@/components/FleetTariffCards";
import { TariffTable, defaultBaseFare, defaultExtras } from "@/components/TariffTable";
import { RouteFactsLongread } from "@/components/RouteFactsLongread";
import { HowItWorks3Steps } from "@/components/HowItWorks3Steps";
import { PaymentMethods } from "@/components/PaymentMethods";
import { RouteFaq } from "@/components/RouteFaq";
import { metaAirportRoute } from "@/lib/content-engine/meta";
import { generateAirportRouteContent } from "@/lib/content-engine/copy-airport";
import { iconFor } from "@/lib/content-engine/icon-map";
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
  Clock,
  Backpack,
  Sparkles,
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
  // Уникальные мета через content-engine: учитывают цену, км, время и точное название аэропорта.
  const meta = metaAirportRoute({
    iata,
    airportName: airport.name,
    airportNameFull: airport.nameFull,
    destinationName: route.destinationName,
    km: route.km,
    hours: route.hours,
    city: airport.city,
  });
  return {
    ...meta,
    alternates: { canonical: `https://zakazminivena.ru/airport/${iata}/${destination}` },
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

  // Уникальные тексты от content-engine с подстановкой данных маршрута.
  const content = generateAirportRouteContent({
    iata,
    airportName: airport.name,
    airportNameFull: airport.nameFull,
    destinationName: route.destinationName,
    destinationCity: airport.city,
    km: route.km,
    hours: route.hours,
    uniqueIntro: route.uniqueIntro,
    uniqueRouteDesc: route.uniqueRouteDesc,
  });

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
          <HeroBackground />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Бейджи + H1 — всегда первыми */}
              <div className="order-1 lg:order-1">
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
                {/* SR-only расширенный H1-контекст для контентного веса */}
                <p className="sr-only">{content.h1}</p>
              </div>

              {/* Картинка — на мобильном сразу под H1, на десктопе справа */}
              <div className="order-2 lg:order-2 lg:row-span-2">
                <HeroVehicleImage
                  src={heroImage}
                  alt={`Минивэн ${airport.name} → ${route.destinationName}`}
                  captionLabel="Маршрут"
                  captionValue={`${airport.name} → ${route.destinationName}`}
                  priority
                />
              </div>

              {/* Подзаголовок + метрики + CTA — на мобильном после картинки, на десктопе под H1 в левой колонке */}
              <div className="order-3 lg:order-3 lg:col-start-1">
                <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
                  {content.heroSubtitle}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="rounded-xl border bg-card/80 backdrop-blur p-4 text-center">
                    <RulerIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
                    <div className="text-xs text-muted-foreground">Расстояние</div>
                    <div className="text-base font-semibold sm:text-lg">{route.km} км</div>
                  </div>
                  <div className="rounded-xl border bg-card/80 backdrop-blur p-4 text-center">
                    <ClockIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
                    <div className="text-xs text-muted-foreground">Время</div>
                    <div className="text-base font-semibold sm:text-lg">{route.hours}</div>
                  </div>
                  <div className="rounded-xl border bg-card/80 backdrop-blur p-4 text-center">
                    <WalletIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
                    <div className="text-xs text-muted-foreground">Цена</div>
                    <div className="text-base font-semibold sm:text-lg">от {price} ₽</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#booking" className="rounded-lg bg-emerald px-6 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90">
                    Узнать точную цену
                  </a>
                  <a href="https://wa.me/79185875454" className="rounded-lg border bg-background/70 backdrop-blur px-6 py-3 text-sm font-medium hover:border-emerald hover:text-emerald">
                    Заказать в WhatsApp
                  </a>
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

        {/* ===== ТАРИФНЫЕ КАРТОЧКИ ===== */}
        <FleetTariffCards
          title="Какой минивэн подаём"
          subtitle={`Выберите класс для маршрута ${airport.name} → ${route.destinationName}`}
          contextLabel={`Аэропорт ${airport.name}`}
        />

        {/* ===== ЛОНГРИД «ВСЁ, ЧТО НУЖНО ЗНАТЬ» ===== */}
        <RouteFactsLongread
          title={`Всё, что нужно знать о поездке ${airport.name} → ${route.destinationName}`}
          intro={content.intro}
          sections={[
            {
              icon: Clock,
              title: "Маршрут и время в пути",
              paragraph: content.routeDescription,
              callout: content.longreadCallout,
            },
            ...content.sections.map((s) => ({
              icon: iconFor(s.iconKey),
              title: s.title,
              paragraph: s.body,
            })),
          ]}
        />

        {/* ===== ТАРИФНАЯ ТАБЛИЦА ===== */}
        <TariffTable
          modelName="Минивэн 7–8 мест"
          title="Тариф и дополнительные услуги"
          baseFare={[
            { label: "В одну сторону", value: `от ${price} ₽`, highlight: true },
            { label: "Туда-обратно за день (скидка 20%)", value: `${priceRoundTrip} ₽` },
            ...defaultBaseFare(),
          ]}
          extras={defaultExtras()}
        />

        {/* ===== КАК ЗАКАЗАТЬ ===== */}
        <HowItWorks3Steps bg="muted" />

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

        {/* ===== FAQ ===== */}
        <RouteFaq
          title={`Частые вопросы про маршрут ${airport.name} → ${route.destinationName}`}
          items={content.faq}
          bg="muted"
        />

        {/* ===== ВИДЫ ОПЛАТЫ ===== */}
        <PaymentMethods
          title="Как оплатить заказ"
          intro="Все основные способы оплаты — наличные, карта, безналичный для юрлиц. После 3 поездок открываем постоплату до 14 дней."
        />

        <B2bCtaBlock />
      </main>
      <Footer />
    </div>
  );
}
