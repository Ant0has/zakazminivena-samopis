import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackground } from "@/components/HeroBackground";
import { AirportHeroForm } from "@/components/AirportHeroForm";
import { AirportPhotoCard } from "@/components/AirportPhotoCard";
import { AirportFeaturesGrid } from "@/components/AirportFeaturesGrid";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AirportConsultationForm } from "@/components/AirportConsultationForm";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iataAirports, getIataAirport } from "@/lib/iata-airports";
import { getAirportRoutesByIata } from "@/lib/airport-routes-data";
import { calcPrice, formatPrice } from "@/lib/routes-data";
import { fleetBySlug } from "@/lib/fleet-data";
import { getAirportHubHeroImage } from "@/lib/hero-images";
import { FleetTariffCards } from "@/components/FleetTariffCards";
import { HowItWorks3Steps } from "@/components/HowItWorks3Steps";
import { PaymentMethods } from "@/components/PaymentMethods";
import { RouteFaq } from "@/components/RouteFaq";
import { RouteFactsLongread } from "@/components/RouteFactsLongread";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { getReviewsByIata, allReviews, pickReviews } from "@/lib/reviews-data";
import { metaAirportHub } from "@/lib/content-engine/meta";
import { generateAirportHubContent } from "@/lib/content-engine/copy-airport-hub";
import { iconFor } from "@/lib/content-engine/icon-map";
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
  const meta = metaAirportHub({
    iata,
    airportName: airport.name,
    airportNameFull: airport.nameFull,
    city: airport.city,
    minPrice,
  });
  return { ...meta, alternates: { canonical: `https://zakazminivena.ru/airport/${iata}` } };
}

export default async function AirportHubPage({ params }: Props) {
  const { iata } = await params;
  const airport = getIataAirport(iata);
  if (!airport) notFound();
  const routes = getAirportRoutesByIata(iata);
  const minPrice = routes.length > 0 ? Math.min(...routes.map((r) => calcPrice(r.km))) : 4000;
  const fleetForHub = airport.fleet.map((s) => fleetBySlug[s]).filter(Boolean);
  const heroImage = getAirportHubHeroImage(iata);
  const hubContent = generateAirportHubContent({
    iata,
    airportName: airport.name,
    airportNameFull: airport.nameFull,
    city: airport.city,
    region: airport.region,
    kmToCenter: airport.kmToCenter,
    terminals: airport.terminals,
    routesCount: routes.length,
    routesMinPrice: minPrice,
  });

  const otherMoscowAirports = ["svo", "vko", "dme", "zia"].filter((c) => c !== iata);
  const sameRegionAirports =
    airport.region === "Краснодарский край"
      ? ["aer", "krr", "aaq"].filter((c) => c !== iata)
      : otherMoscowAirports.includes(iata)
      ? otherMoscowAirports
      : [];

  const trustItems = [
    { icon: ClockIcon, title: "Подача ко времени по адресу или к прилёту рейса" },
    { icon: BabyIcon, title: "Детские кресла и бустер по запросу" },
    { icon: CheckIcon, title: "Назначение водителя за день — при раннем бронировании" },
    { icon: UsersIcon, title: "6–7 пассажирских мест" },
    { icon: ShieldCheckIcon, title: "Место под багаж в каждой машине" },
  ];

  // TaxiService schema с aggregateRating и priceRange — для rich snippet в SERP.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `Минивэн в аэропорт ${airport.name}`,
    description:
      `Заказ минивэна с водителем в ${airport.nameFull}, ${airport.city}. ` +
      `Трансфер 6–8 пассажиров от ${formatPrice(minPrice)} ₽ за машину.`,
    image: `https://zakazminivena.ru/images/heroes/${iata}.webp`,
    provider: {
      "@type": "Organization",
      name: "ЗаказМинивэна.ru",
      url: "https://zakazminivena.ru",
      telephone: "+79185875454",
      email: "mini@zakazminivena.ru",
      logo: "https://zakazminivena.ru/icon-512.png",
    },
    areaServed: { "@type": "City", name: airport.city },
    priceRange: `от ${formatPrice(minPrice)} ₽`,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: String(minPrice),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "101",
      bestRating: "5",
      worstRating: "4",
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
            { label: "Аэропорты", href: "/airport" },
            { label: airport.name },
          ]}
        />

        {/* ===== HERO (airport hub) ===== */}
        <section className="relative overflow-hidden">
          <HeroBackground mobilePosition="top" />
          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-20">
            {/* Бейджи-чеклист */}
            <div className="mb-6 flex flex-wrap justify-center gap-2 sm:justify-start">
              {["Фиксированная цена", "До 7 пассажиров", "Дет.кресло бесплатно", "Без предоплаты"].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald/20 px-3 py-1 text-xs font-medium text-emerald-100 ring-1 ring-emerald-300/30"
                >
                  <CheckIcon className="h-3 w-3" /> {b}
                </span>
              ))}
            </div>

            {/* H1 */}
            <h1 className="mx-auto max-w-3xl text-center text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl sm:text-left lg:text-5xl">
              Минивэн в{" "}
              <span className="underline decoration-emerald-300 decoration-4 underline-offset-4">
                {airport.name} ({iata.toUpperCase()})
              </span>{" "}
              — встретим с табличкой, ждём при задержке рейса
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base text-white/85 sm:text-left sm:text-lg">
              Комфортная поездка для семьи или компании до 7 пассажиров с багажом. Подача к
              терминалу, фиксированная цена от{" "}
              <strong className="font-bold text-white">{formatPrice(minPrice)} ₽</strong> за трансфер.
            </p>

            {/* Сетка: форма слева, справа — фото + фичи под ним. На lg
                items-stretch + lg:h-full на правой колонке выравнивает низ
                обоих столбцов; фичи растягиваются (grow) до уровня формы. */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <AirportHeroForm iata={iata} airportShort={airport.name} />
              <div className="flex flex-col gap-4">
                <AirportPhotoCard
                  imageSrc={heroImage}
                  imageAlt={`Минивэн в ${airport.name}`}
                />
                <div className="grow">
                  <AirportFeaturesGrid airportShort={airport.name} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ЧТО ВКЛЮЧЕНО ===== */}
        <section className="border-t bg-emerald/5 py-16 sm:py-24">
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

        {/* ===== ТАРИФНЫЕ КАРТОЧКИ ===== */}
        <FleetTariffCards
          title={`Минивэны, которые подаём в ${airport.name}`}
          subtitle="Выберите класс — цена за машину, не за пассажира"
          contextLabel={`Аэропорт ${iata.toUpperCase()}`}
          bg="default"
        />

        {/* ===== ОТЗЫВЫ ===== */}
        <ReviewsCarousel
          title={`Отзывы пассажиров — ${airport.name}`}
          subtitle="Реальные поездки из аэропорта по Москве, Подмосковью и в другие города"
          reviews={(() => {
            const byHub = getReviewsByIata(iata);
            // дополняем общими интерсити-отзывами, если по конкретному IATA меньше 8
            const extra = byHub.length < 8
              ? pickReviews(
                  allReviews.filter((r) => !byHub.includes(r) && (r.tags.includes("intercity") || r.tags.includes("airport"))),
                  12 - byHub.length,
                  iata,
                )
              : [];
            return [...byHub, ...extra];
          })()}
        />

        {/* ===== ТЕРМИНАЛЫ ===== */}
        <section className="border-t bg-emerald/5 py-16 sm:py-24">
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

        {/* ===== CTA / КОМПАКТНАЯ КОНСУЛЬТАЦИЯ ===== */}
        <section id="booking" className="border-t bg-emerald/5 py-16 sm:py-20 scroll-mt-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Заказать минивэн в {airport.name}
              </h2>
              <p className="mt-3 text-base text-muted-foreground sm:text-lg">
                Оставьте имя и телефон — перезвоним в течение 7 минут.
              </p>
            </div>
            <AirportConsultationForm context={`Аэропорт ${airport.name}`} />
          </div>
        </section>

        {/* ===== ЛОНГРИД ХАБА ===== */}
        <RouteFactsLongread
          title={`Всё про минивэн в ${airport.nameFull}`}
          intro={hubContent.intro}
          sections={hubContent.sections.map((s) => ({
            icon: iconFor(s.iconKey),
            title: s.title,
            paragraph: s.body,
          }))}
        />

        {/* ===== КАК ЗАКАЗАТЬ ===== */}
        <HowItWorks3Steps bg="muted" />

        {/* ===== FAQ ===== */}
        <RouteFaq
          title={`Частые вопросы про трансфер в аэропорт ${airport.name}`}
          items={hubContent.faq.length > 0 ? hubContent.faq : [
            {
              q: `Сколько стоит минивэн в аэропорт ${airport.name}?`,
              a: `Цена зависит от точки подачи. Базовая стоимость — от ${formatPrice(minPrice)} ₽ за машину 6–8 мест. Для конкретной точки оставьте телефон — перезвоним в течение 7 минут и назовём фикс цену.`,
            },
            {
              q: `Сколько ждёте, если рейс задерживается?`,
              a: `Бесплатно 60 минут от времени прилёта. Свыше — 500 ₽/час. Время отсчитывается от факта приземления, не от расписания.`,
            },
            {
              q: `Как водитель найдёт меня в ${airport.name}?`,
              a: `Встреча в зоне прилёта с табличкой по вашей фамилии. За 30 минут до прибытия рейса вы получите имя водителя, номер машины и WhatsApp/Telegram-контакт.`,
            },
            {
              q: `К каким терминалам подаёте?`,
              a: `Ко всем терминалам ${airport.name}: ${airport.terminals.map((t) => t.code).join(", ")}. Точное место встречи водитель сообщает в момент подачи.`,
            },
            {
              q: `Можно ли с дет.креслом или питомцем?`,
              a: `Дет.кресло любого типа (бустер, 9–18 кг, 18–36 кг) — бесплатно. Питомец в переноске — бесплатно, собака до 10 кг — 1 000 ₽, до 25 кг — 1 500 ₽.`,
            },
            {
              q: `Принимаете ли безналичный расчёт?`,
              a: `Да. Картой онлайн (Юкасса/Тинькофф), СБП по телефону, наличные водителю, банковский перевод для юрлиц. Документы для отчётности: договор, счёт, акт, ККТ-чек.`,
            },
          ]}
          bg="muted"
        />

        {/* ===== ВИДЫ ОПЛАТЫ ===== */}
        <PaymentMethods />

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
