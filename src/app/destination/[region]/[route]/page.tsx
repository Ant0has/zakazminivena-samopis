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
  destinationRoutes,
  getDestinationRoute,
  getDestinationRoutesByRegion,
  getDestinationHub,
} from "@/lib/destinations-data";
import { calcPrice, formatPrice } from "@/lib/routes-data";
import { getDestinationRouteHeroImage } from "@/lib/hero-images";
import { FleetTariffCards } from "@/components/FleetTariffCards";
import { TariffTable, defaultBaseFare, defaultExtras } from "@/components/TariffTable";
import { RouteFactsLongread } from "@/components/RouteFactsLongread";
import { HowItWorks3Steps } from "@/components/HowItWorks3Steps";
import { PaymentMethods } from "@/components/PaymentMethods";
import { RouteFaq } from "@/components/RouteFaq";
import { metaDestinationRoute } from "@/lib/content-engine/meta";
import { generateDestinationRouteContent } from "@/lib/content-engine/copy-destination";
import { iconFor } from "@/lib/content-engine/icon-map";
import {
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  RulerIcon,
  CompassIcon,
  CameraIcon,
  PlaneIcon,
  Clock,
  Sparkles,
  Backpack,
} from "lucide-react";

export function generateStaticParams() {
  return destinationRoutes.map((r) => ({ region: r.regionSlug, route: r.routeSlug }));
}

type Props = { params: Promise<{ region: string; route: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, route } = await params;
  const data = getDestinationRoute(region, route);
  const hub = getDestinationHub(region);
  if (!data || !hub) return {};
  const meta = metaDestinationRoute({
    regionSlug: region,
    routeSlug: route,
    regionName: hub.regionName,
    fromCity: data.fromCity,
    toCity: data.toCity,
    km: data.km,
    hours: data.hours,
  });
  return {
    ...meta,
    alternates: { canonical: `https://zakazminivena.ru/destination/${region}/${route}` },
  };
}

export default async function DestinationRoutePage({ params }: Props) {
  const { region, route } = await params;
  const data = getDestinationRoute(region, route);
  const hub = getDestinationHub(region);
  if (!data || !hub) notFound();
  const price = formatPrice(calcPrice(data.km));
  const relatedRoutes = getDestinationRoutesByRegion(region)
    .filter((r) => r.routeSlug !== route)
    .slice(0, 6);
  const heroImage = getDestinationRouteHeroImage(region);

  // Уникальные тексты от content-engine.
  const content = generateDestinationRouteContent({
    regionName: hub.regionName,
    fromCity: data.fromCity,
    toCity: data.toCity,
    km: data.km,
    hours: data.hours,
    uniqueIntro: data.uniqueIntro,
    uniqueRouteDesc: data.uniqueRouteDesc,
    specifics: data.specifics,
    seasonalNotes: data.seasonalNotes,
    pointsOfInterest: data.pointsOfInterest,
  });

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Туристические направления", href: "/destination" },
            { label: hub.regionName, href: `/destination/${region}` },
            { label: `${data.fromCity} – ${data.toCity}` },
          ]}
        />

        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <HeroBackground />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-1 lg:order-1">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur">
                    <MapPinIcon className="mr-1 h-3 w-3" /> {hub.regionName}
                  </Badge>
                  <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur">
                    <CompassIcon className="mr-1 h-3 w-3" /> Водитель знает регион
                  </Badge>
                  <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur">
                    <CameraIcon className="mr-1 h-3 w-3" /> Остановки для фото
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
                  Минивэн {data.fromCity} → {data.toCity}{" "}
                  <span className="text-amber-300">от {price} ₽</span>
                </h1>
                <p className="sr-only">{content.h1}</p>
              </div>

              <div className="order-2 lg:order-2 lg:row-span-2">
                <HeroVehicleImage
                  src={heroImage}
                  alt={`${data.fromCity} → ${data.toCity}`}
                  captionLabel={hub.regionName}
                  captionValue={`${data.fromCity} → ${data.toCity}`}
                  priority
                />
              </div>

              <div className="order-3 lg:order-3 lg:col-start-1">
                <p className="max-w-xl text-lg text-white/90 sm:text-xl drop-shadow">
                  {content.heroSubtitle}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="rounded-xl border bg-card/80 backdrop-blur p-4 text-center">
                    <RulerIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
                    <div className="text-xs text-muted-foreground">Расстояние</div>
                    <div className="text-base font-semibold sm:text-lg">{data.km} км</div>
                  </div>
                  <div className="rounded-xl border bg-card/80 backdrop-blur p-4 text-center">
                    <ClockIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
                    <div className="text-xs text-muted-foreground">Время</div>
                    <div className="text-base font-semibold sm:text-lg">{data.hours}</div>
                  </div>
                  <div className="rounded-xl border bg-card/80 backdrop-blur p-4 text-center">
                    <MapPinIcon className="mx-auto mb-1.5 h-5 w-5 text-emerald" />
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
                  Заказать минивэн в {hub.regionName}
                </h2>
                <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                  Заполните форму — менеджер свяжется в течение 5 минут и пришлёт фикс цену с
                  контактом водителя.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-emerald" />
                    Водитель, знающий регион — рассказы и рекомендации
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-emerald" />
                    Остановки для фото — без доплат
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-emerald" />
                    Гибкий маршрут — меняйте по ходу поездки
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-emerald" />
                    Документы для отчётности — для юрлиц
                  </li>
                </ul>
              </div>
              <BookingForm defaultFrom={data.fromCity} defaultTo={data.toCity} />
            </div>
          </div>
        </section>

        {/* ===== ТАРИФНЫЕ КАРТОЧКИ ===== */}
        <FleetTariffCards
          title="Какой минивэн подаём"
          subtitle={`Выберите класс для поездки ${data.fromCity} → ${data.toCity}`}
          contextLabel={hub.regionName}
        />

        {/* ===== ЛОНГРИД «ВСЁ, ЧТО НУЖНО ЗНАТЬ» ===== */}
        <RouteFactsLongread
          title={`Всё, что нужно знать о поездке ${data.fromCity} → ${data.toCity}`}
          intro={content.intro}
          sections={[
            {
              icon: Clock,
              title: "Маршрут и время",
              paragraph: content.routeDescription,
              callout: content.callout,
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
          title="Цена и дополнительные услуги"
          baseFare={[
            { label: "В одну сторону", value: `от ${price} ₽`, highlight: true },
            { label: "Туда-обратно за день", value: "по согласованию" },
            { label: "С ночёвкой водителя (за машину + сутки)", value: `от ${formatPrice(calcPrice(data.km) + 8000)} ₽` },
            ...defaultBaseFare(),
          ]}
          extras={defaultExtras()}
        />

        {/* ===== КАК ЗАКАЗАТЬ ===== */}
        <HowItWorks3Steps bg="default" />

        {/* ===== ЧТО ПОСМОТРЕТЬ ===== */}
        <section className="border-t bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Что посмотреть в {data.toCity}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Точки, к которым водитель может заехать по согласованию
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.pointsOfInterest.map((p) => (
                <Card key={p.name} className="p-5">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <CameraIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ОСОБЕННОСТИ ПОЕЗДКИ ===== */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Особенности поездки
            </h2>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              {data.specifics}
            </p>
            {data.seasonalNotes && (
              <>
                <h3 className="mt-8 mb-3 text-xl font-semibold">Когда лучше ехать</h3>
                <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                  {data.seasonalNotes}
                </p>
              </>
            )}
          </div>
        </section>

        {/* ===== ДРУГИЕ МАРШРУТЫ ===== */}
        {relatedRoutes.length > 0 && (
          <section className="border-t bg-muted/30 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Другие маршруты в {hub.regionName}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedRoutes.map((r) => (
                  <Link key={r.routeSlug} href={`/destination/${region}/${r.routeSlug}`}>
                    <Card className="h-full p-5 transition-all hover:border-emerald hover:shadow-md">
                      <div className="text-xs uppercase tracking-wide text-emerald">
                        {hub.regionName}
                      </div>
                      <div className="mt-1 text-lg font-semibold">
                        {r.fromCity} → {r.toCity}
                      </div>
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

        {data.airportLink && (
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <PlaneIcon className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                Прилетаете на самолёте?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
                Тот же маршрут, но с подачей напрямую к терминалу аэропорта и встречей с табличкой.
              </p>
              <Link
                href={`/airport/${data.airportLink}`}
                className="mt-6 inline-block rounded-lg bg-emerald px-6 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90"
              >
                Аэропортовый трансфер →
              </Link>
            </div>
          </section>
        )}

        {/* ===== FAQ ===== */}
        <RouteFaq
          title={`Частые вопросы про маршрут ${data.fromCity} → ${data.toCity}`}
          items={content.faq}
          bg="muted"
        />

        {/* ===== ВИДЫ ОПЛАТЫ ===== */}
        <PaymentMethods
          title="Как оплатить поездку"
          intro="Карта, СБП, наличные водителю или безналичный для юрлиц с полным пакетом документов и постоплатой до 14 дней."
        />

        <B2bCtaBlock />
      </main>
      <Footer />
    </div>
  );
}
