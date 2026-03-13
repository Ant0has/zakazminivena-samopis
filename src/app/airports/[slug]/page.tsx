import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlaneIcon,
  MapPinIcon,
  PhoneIcon,
  CheckIcon,
  ClockIcon,
} from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { allAirports, allRoutes, type AirportData } from "@/lib/routes-data";
import { getAirportContent } from "@/lib/airport-content";
import { ReviewsSection } from "@/components/ReviewsSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allAirports.map((airport) => ({ slug: airport.slug }));
}

function getAirport(slug: string): AirportData | undefined {
  return allAirports.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const airport = getAirport(slug);
  if (!airport) return {};

  return {
    title: `Трансфер минивэн — аэропорт ${airport.name} (${airport.code}), ${airport.city}`,
    description: getAirportContent(slug)?.metaDescription || `Трансфер на минивэне 7 мест в аэропорт ${airport.name} (${airport.code}), ${airport.city}. Фиксированная цена, встреча с табличкой, детское кресло бесплатно. +7 (918) 587-54-54`,
    openGraph: {
      title: `Трансфер минивэн — аэропорт ${airport.name} (${airport.code}), ${airport.city}`,
      description: getAirportContent(slug)?.metaDescription || `Трансфер на минивэне 7 мест в аэропорт ${airport.name} (${airport.code}), ${airport.city}. Фиксированная цена, встреча с табличкой, детское кресло бесплатно. +7 (918) 587-54-54`,
      url: `https://zakazminivena.ru/airports/${slug}`,
      siteName: "ЗаказМинивена.ru",
      locale: "ru_RU",
      type: "article",
    },
    alternates: {
      canonical: `https://zakazminivena.ru/airports/${slug}`,
    },
  };
}


function getAirportTags(citySlug: string): string[] {
  const tags: string[] = ["airport"];
  if (/sochi|krasnodar|adler|anapa|gelendzhik|rostov/.test(citySlug)) {
    tags.push("south");
  } else if (/simferopol|yalta|sevastopol/.test(citySlug)) {
    tags.push("south");
  } else if (/mineralnye-vody|kislovodsk|pyatigorsk/.test(citySlug)) {
    tags.push("kmv");
  } else if (/ekaterinburg|chelyabinsk|tyumen|perm/.test(citySlug)) {
    tags.push("ural");
  } else if (/novosibirsk|barnaul|tomsk/.test(citySlug)) {
    tags.push("siberia");
  } else if (/moskva/.test(citySlug)) {
    tags.push("moscow");
  } else if (/spb|sankt-peterburg/.test(citySlug)) {
    tags.push("spb");
  }
  return tags;
}

export default async function AirportPage({ params }: Props) {
  const { slug } = await params;
  const airport = getAirport(slug);
  if (!airport) notFound();

  // Find routes from this airport's city
  const cityRoutes = allRoutes.filter(
    (r) => r.fromSlug === airport.citySlug || r.toSlug === airport.citySlug
  );
  const reviewTags = getAirportTags(airport.citySlug);
  const airportContent = getAirportContent(slug);

  const advantages = [
    "Встреча с табличкой в зоне прилёта",
    "Помощь с багажом до автомобиля",
    "Детское кресло бесплатно",
    "Отслеживание рейса — подъедем к прилёту",
    "Фиксированная цена без доплат",
    "7 комфортных мест + большой багажник",
    "Бесплатное ожидание 30 минут",
    "Кондиционер, USB-зарядка, Wi-Fi",
  ];


  const airportJsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": `Трансфер в аэропорт ${airport.name} — ЗаказМинивена.ru`,
    "url": `https://zakazminivena.ru/airports/${slug}`,
    "telephone": "+79185875454",
    "description": `Трансфер на минивэне 7 мест в аэропорт ${airport.name} (${airport.code}), ${airport.city}`,
    "areaServed": {
      "@type": "City",
      "name": airport.city,
    },
    "provider": {
      "@type": "Organization",
      "name": "ЗаказМинивена.ru",
      "url": "https://zakazminivena.ru",
    },
    "serviceType": "Airport Transfer",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://t.me/zakazminivena",
      "servicePhone": "+79185875454",
    },
  };

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(airportJsonLd) }}
      />
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Главная", href: "/" },
              { label: "Аэропорты", href: "/airports" },
              { label: airport.name },
            ]} />

            {/* Header */}
            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <PlaneIcon className="mr-1 h-3 w-3" />
              {airport.code}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Трансфер минивэн — аэропорт {airport.name}
            </h1>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image src="/images/airports/default.webp" alt={`Трансфер в аэропорт ${airport.name} на минивэне`} width={1024} height={576} className="w-full h-auto object-cover" priority />
            </div>

            {/* Info cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 text-sm text-muted-foreground">Город</div>
                <div className="flex items-center gap-2 font-semibold">
                  <MapPinIcon className="h-4 w-4 text-emerald" />
                  {airport.city}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 text-sm text-muted-foreground">
                  Расстояние от центра
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <ClockIcon className="h-4 w-4 text-emerald" />
                  {airport.km} км
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-2 text-sm text-muted-foreground">
                  Код аэропорта
                </div>
                <div className="flex items-center gap-2 font-mono font-semibold">
                  <PlaneIcon className="h-4 w-4 text-emerald" />
                  {airport.code}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10 space-y-4 text-muted-foreground">
              {airportContent ? (
                <>
                  {airportContent.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-6">
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Терминалы</div>
                      <p className="text-sm">{airportContent.terminalInfo}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Расстояние</div>
                      <p className="text-sm">{airportContent.distanceInfo}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Зона встречи</div>
                      <p className="text-sm">{airportContent.pickupZone}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4">
                      <div className="text-sm font-medium text-muted-foreground mb-1">Популярные направления</div>
                      <p className="text-sm">{airportContent.popularRoutes}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    Закажите комфортный минивэн на 7 мест для трансфера из аэропорта{" "}
                    {airport.name} ({airport.code}) в {airport.city} и обратно.
                    Водитель встретит вас с табличкой в зоне прилёта, поможет с
                    багажом и доставит по адресу без лишних остановок.
                  </p>
                  <p>
                    Мы отслеживаем ваш рейс и подъезжаем к моменту прилёта —
                    бесплатное ожидание 30 минут. Фиксированная цена без счётчика и
                    наценок за ночное время.
                  </p>
                </>
              )}
            </div>

            {/* Advantages */}
            <div className="mt-10">
              <h2 className="mb-6 text-2xl font-bold">
                Преимущества трансфера в аэропорт {airport.name}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {advantages.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <CheckIcon className="h-5 w-5 shrink-0 text-emerald" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="mt-10">
              <h2 className="mb-6 text-2xl font-bold">
                Как это работает
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: 1,
                    title: "Бронирование",
                    desc: "Напишите рейс, дату и количество пассажиров",
                  },
                  {
                    step: 2,
                    title: "Отслеживание",
                    desc: "Мы следим за вашим рейсом и подъезжаем к прилёту",
                  },
                  {
                    step: 3,
                    title: "Встреча",
                    desc: "Водитель ждёт с табличкой в зоне прилёта",
                  },
                  {
                    step: 4,
                    title: "Поездка",
                    desc: "Доставим по адресу с комфортом, оплата по факту",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex flex-col items-center text-center rounded-xl border border-border bg-card p-5"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-white font-bold text-lg">
                      {item.step}
                    </div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related routes */}
            {cityRoutes.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-6 text-2xl font-bold">
                  Маршруты из {airport.city}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cityRoutes.slice(0, 6).map((route) => (
                    <Link
                      key={route.slug}
                      href={`/routes/${route.slug}`}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:border-emerald/40 hover:bg-emerald/5"
                    >
                      <span className="text-sm font-medium">
                        {route.from} — {route.to}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {route.km} км
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <B2bCtaBlock airportName={airport.name} />

            {/* Reviews */}
            <ReviewsSection tags={reviewTags} />

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать трансфер в аэропорт {airport.name}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Напишите нам маршрут и дату — рассчитаем стоимость за 5 минут.
                Фиксированная цена, никаких доплат.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-14 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                  asChild
                >
                  <a href="https://t.me/zakazminivena">
                    <TelegramIcon className="mr-2 h-5 w-5" />
                    Написать в Telegram
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 text-base font-semibold"
                  asChild
                >
                  <a href="tel:+79185875454">
                    <PhoneIcon className="mr-2 h-5 w-5 text-emerald" />
                    +7 (918) 587-54-54
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
