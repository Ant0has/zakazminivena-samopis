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
  destinationHubs,
  getDestinationHub,
  getDestinationRoutesByRegion,
} from "@/lib/destinations-data";
import { fleetBySlug } from "@/lib/fleet-data";
import { calcPrice, formatPrice } from "@/lib/routes-data";
import { getDestinationHubHeroImage } from "@/lib/hero-images";
import { FleetTariffCards } from "@/components/FleetTariffCards";
import { HowItWorks3Steps } from "@/components/HowItWorks3Steps";
import { PaymentMethods } from "@/components/PaymentMethods";
import {
  CheckIcon,
  MapPinIcon,
  CompassIcon,
  CameraIcon,
  CalendarIcon,
  PackageIcon,
} from "lucide-react";

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
  const minPrice = routes.length > 0 ? Math.min(...routes.map((r) => calcPrice(r.km))) : 4000;
  const fleet = hub.fleetModels.map((s) => fleetBySlug[s]).filter(Boolean);
  const heroImage = getDestinationHubHeroImage(region);

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

        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <HeroBackground />
          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="order-1 lg:order-1">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-emerald/30 bg-emerald/5 text-emerald">
                    <MapPinIcon className="mr-1 h-3 w-3" /> Туркластер
                  </Badge>
                  <Badge variant="outline" className="border-emerald/30 bg-emerald/5 text-emerald">
                    <CompassIcon className="mr-1 h-3 w-3" /> Водитель знает регион
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Минивэн в {hub.regionName} из {hub.hubCity}{" "}
                  <span className="text-gradient">от {formatPrice(minPrice)} ₽</span>
                </h1>
              </div>

              <div className="order-2 lg:order-2 lg:row-span-2">
                <HeroVehicleImage
                  src={heroImage}
                  alt={`Минивэн в ${hub.regionName}`}
                  captionLabel="Регион"
                  captionValue={hub.regionName}
                  priority
                />
              </div>

              <div className="order-3 lg:order-3 lg:col-start-1">
                <p className="text-base font-medium text-foreground sm:text-lg">
                  {hub.topPointsShort}
                </p>
                <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {hub.heroIntro}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#routes" className="rounded-lg bg-emerald px-6 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90">
                    Все маршруты ({routes.length})
                  </a>
                  <a href="#booking" className="rounded-lg border bg-background/70 backdrop-blur px-6 py-3 text-sm font-medium hover:border-emerald hover:text-emerald">
                    Узнать цену
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ПРЕИМУЩЕСТВА ТУРКЛАСТЕРА ===== */}
        <section className="border-t bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Что входит в туристическую поездку
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Отличие от обычного такси — формат для путешествия
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: CompassIcon, title: "Водитель знает регион", desc: "Рассказы и рекомендации в дороге" },
                { icon: CameraIcon, title: "Остановки для фото", desc: "Без дополнительной оплаты" },
                { icon: MapPinIcon, title: "Гибкий маршрут", desc: "Меняйте по ходу поездки" },
                { icon: CheckIcon, title: "До 8 пассажиров", desc: "С местом под рюкзаки и багаж" },
              ].map((a) => (
                <Card key={a.title} className="p-6">
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                    <a.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 font-semibold">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== МАРШРУТЫ ===== */}
        <section id="routes" className="py-16 sm:py-24 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Популярные маршруты в {hub.regionName}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Цена за машину 6–8 мест. Можно менять маршрут в дороге.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((r) => (
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

        {/* ===== СЕЗОННОСТЬ ===== */}
        <section className="border-t bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Когда лучше поехать в {hub.regionName}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                Сезонные особенности и рекомендации по месяцам
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hub.seasons.map((s) => (
                <Card key={s.months} className="p-5">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div className="text-sm uppercase tracking-wide text-emerald">{s.months}</div>
                  <div className="mt-1 text-sm">{s.description}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ===== МНОГОДНЕВНЫЕ ТУРЫ ===== */}
        {hub.multidayTours.length > 0 && (
          <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Многодневные туры с ночёвкой водителя
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  То, что Яндекс Go по определению не делает — готовые маршруты на 2+ дня
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {hub.multidayTours.map((t) => (
                  <Card key={t.name} className="p-6">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald">
                      <CalendarIcon className="h-3 w-3" /> {t.days} {t.days === 1 ? "день" : "дня"}
                    </div>
                    <h3 className="text-xl font-semibold">{t.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.description}</p>
                    <div className="mt-4 text-2xl font-bold">от {formatPrice(t.priceFrom)} ₽</div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== ЧТО ВЗЯТЬ С СОБОЙ ===== */}
        <section className="border-t bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <PackageIcon className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Что взять с собой
              </h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {hub.packingList.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg bg-card p-4 border">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== ПАРК ===== */}
        {fleet.length > 0 && (
          <section className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Парк на {hub.regionNameAcc}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {fleet.map((m) => (
                  <Link key={m.slug} href={`/fleet/${m.slug}`}>
                    <Card className="h-full p-5 transition-all hover:border-emerald hover:shadow-md">
                      <div className="mb-2 text-xs uppercase tracking-wide text-emerald">
                        {m.tier}
                      </div>
                      <div className="text-lg font-semibold">{m.fullName}</div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {m.seats} пасс. · {m.luggageL} л багаж
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== ТАРИФНЫЕ КАРТОЧКИ ===== */}
        <FleetTariffCards
          title={`Минивэны для поездок в ${hub.regionNameAcc}`}
          subtitle="Выберите класс. Цена за машину, не за пассажира."
          contextLabel={hub.regionName}
          bg="default"
        />

        {/* ===== КАК ЗАКАЗАТЬ ===== */}
        <HowItWorks3Steps bg="muted" />

        {/* ===== CTA / ФОРМА ===== */}
        <section id="booking" className="py-16 sm:py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Заказать поездку в {hub.regionNameAcc}
                </h2>
                <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                  Менеджер подберёт водителя, знающего регион, и пришлёт фикс цену за 5 минут.
                </p>
              </div>
              <BookingForm defaultFrom={hub.hubCity} />
            </div>
          </div>
        </section>

        {/* ===== ВИДЫ ОПЛАТЫ ===== */}
        <PaymentMethods />

        <B2bCtaBlock />
      </main>
      <Footer />
    </div>
  );
}
