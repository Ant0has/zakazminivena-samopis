import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackground, HeroVehicleImage } from "@/components/HeroBackground";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  allCities,
  allRoutes,
  allAirports,
  calcPrice,
  formatPrice,
  type CityData,
} from "@/lib/routes-data";
import { getRouteImage } from "@/lib/route-images";
import { getCityContent } from "@/lib/city-content";
import { servicesData } from "@/lib/services-data";
import { PriceCalculator } from "@/components/PriceCalculator";
import { FleetTariffCards } from "@/components/FleetTariffCards";
import { HowItWorks3Steps } from "@/components/HowItWorks3Steps";
import { RouteFactsLongread, type LongreadSection } from "@/components/RouteFactsLongread";
import { RouteFaq } from "@/components/RouteFaq";
import { PaymentMethods } from "@/components/PaymentMethods";
import {
  MapPinIcon,
  PlaneIcon,
  ArrowRightIcon,
  PhoneIcon,
  CheckIcon,
  UsersIcon,
  BabyIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { ReviewsSection } from "@/components/ReviewsSection";

export function generateStaticParams() {
  return allCities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = allCities.find((c) => c.slug === slug);
  if (!city) return {};

  return {
    title: `Минивэн с водителем в ${city.nameIn} — заказать по фиксированной цене`,
    description: getCityContent(slug)?.metaDescription || `Заказать минивэн с водителем в ${city.nameIn}. ${city.description}. Фиксированная цена, 7 мест, детское кресло бесплатно. +7 (918) 587-54-54`,
    alternates: {
      canonical: `https://zakazminivena.ru/cities/${slug}`,
    },
    openGraph: {
      title: `Минивэн с водителем в ${city.nameIn} — заказать по фиксированной цене`,
      description: `Заказать минивэн с водителем в ${city.nameIn}. ${city.description}. Фиксированная цена.`,
      url: `https://zakazminivena.ru/cities/${slug}`,
      siteName: "ЗаказМинивэна.ru",
      locale: "ru_RU",
      type: "website",
    },
  };
}


function getCityTags(slug: string): string[] {
  const tags: string[] = [];
  if (/sochi|krasnodar|adler|anapa|gelendzhik|rostov/.test(slug)) {
    tags.push("resort", "south");
  } else if (/simferopol|yalta|sevastopol/.test(slug)) {
    tags.push("resort", "south");
  } else if (/mineralnye-vody|kislovodsk|pyatigorsk|essentuki/.test(slug)) {
    tags.push("kmv");
  } else if (/ekaterinburg|chelyabinsk|tyumen|perm/.test(slug)) {
    tags.push("ural");
  } else if (/novosibirsk|barnaul|tomsk/.test(slug)) {
    tags.push("siberia");
  } else if (/moskva/.test(slug)) {
    tags.push("moscow");
  } else if (/spb|sankt-peterburg/.test(slug)) {
    tags.push("spb");
  }
  if (tags.length === 0) tags.push("intercity");
  else if (!tags.includes("intercity")) tags.push("intercity");
  return tags;
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = allCities.find((c) => c.slug === slug);
  if (!city) notFound();

  const cityRoutes = allRoutes.filter((r) => r.fromSlug === city.slug);
  const cityAirports = allAirports.filter((a) => a.citySlug === city.slug);
  const reviewTags = getCityTags(city.slug);
  const cityContent = getCityContent(city.slug);

  // Минимальная цена по доступным маршрутам/аэропортам — для hero выше сгиба
  const priceCandidates = [
    ...cityRoutes.map((r) => calcPrice(r.km)),
    ...cityAirports.map((a) => calcPrice(a.km)),
  ];
  const minPrice =
    priceCandidates.length > 0 ? Math.min(...priceCandidates) : null;

  // Блок услуг — постоянные внутренние ссылки на каждой странице города
  // (лечит глубину просмотра: даже у городов с малым числом маршрутов
  // всегда есть 6+ релевантных ссылок).
  const FEATURED_SERVICES = [
    "airport-transfer",
    "intercity",
    "wedding",
    "corporate",
    "hourly",
    "excursion",
  ];
  const cityServices = FEATURED_SERVICES.map((slug) =>
    servicesData.find((s) => s.slug === slug),
  ).filter((s): s is (typeof servicesData)[number] => Boolean(s));

  // Связанные города — кросс-линковка по региональным тегам.
  // "intercity" общий почти для всех, поэтому для родства его исключаем.
  const cityTagSet = new Set(getCityTags(city.slug).filter((t) => t !== "intercity"));
  const relatedByRegion = allCities.filter(
    (c) =>
      c.slug !== city.slug &&
      getCityTags(c.slug).some((t) => cityTagSet.has(t)),
  );
  const otherCities = (
    relatedByRegion.length >= 3
      ? relatedByRegion
      : allCities.filter((c) => c.slug !== city.slug)
  ).slice(0, 7);

  // «Что входит в цену» — блок доверия (как на странице аэропорта)
  const includedItems = [
    { icon: UsersIcon, title: "Минивэн 6–8 мест — цена за машину" },
    { icon: BabyIcon, title: "Детское кресло любого типа — бесплатно" },
    { icon: ShieldCheckIcon, title: "Фиксированная цена, без доплат в пути" },
    { icon: CreditCardIcon, title: "Без предоплаты — оплата по факту" },
    { icon: MapPinIcon, title: "Подача по адресу в назначенное время" },
    { icon: CheckIcon, title: "Опытные водители, проверенные машины" },
  ];

  // Лонгрид — собираем из уникального контента города (+ общие факты)
  const longreadSections: LongreadSection[] = [];
  if (cityContent) {
    longreadSections.push(
      { icon: MapPinIcon, title: `Что посмотреть в ${city.nameIn}`, paragraph: cityContent.attractions },
      { icon: PlaneIcon, title: "Ближайшие аэропорты", paragraph: cityContent.nearbyAirports },
    );
  } else {
    longreadSections.push({
      icon: MapPinIcon,
      title: `Поездки из ${city.name}`,
      paragraph: `${city.description}. Возим по городу, области и в другие регионы — фиксированная цена за машину 6–8 мест, без предоплаты.`,
    });
  }
  longreadSections.push(
    {
      icon: UsersIcon,
      title: "Вся компания — в одной машине",
      paragraph:
        "Семья с детьми, компания друзей или делегация коллег едут вместе с багажом — без пересадок и без разделения на два такси.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Цена известна заранее",
      paragraph:
        "Стоимость фиксируется при заказе и не меняется из-за пробок, ночного времени или погоды. Оплата по факту — наличными, картой, СБП или переводом для юрлиц.",
    },
  );
  const longreadIntro =
    cityContent?.whyMinivan ??
    `Закажите минивэн с водителем в ${city.nameIn}: трансферы в аэропорт, межгородние поездки, обслуживание семей и компаний до 7 человек.`;

  // FAQ под город
  const cityFaq = [
    {
      q: `Сколько стоит минивэн в ${city.nameIn}?`,
      a: minPrice
        ? `Цена зависит от маршрута. Базовая стоимость — от ${formatPrice(minPrice)} ₽ за машину 6–8 мест. Напишите точку подачи и направление — назовём фиксированную цену за 5 минут.`
        : `Цена зависит от маршрута и километража. Напишите, откуда и куда едете, — назовём фиксированную цену за 5 минут, без скрытых доплат.`,
    },
    {
      q: "Детское кресло входит в стоимость?",
      a: "Да. Кресло или бустер под возраст ребёнка (9–18 кг, 18–36 кг) — бесплатно. Укажите возраст детей при заказе.",
    },
    {
      q: "Нужна ли предоплата?",
      a: "Нет. Оплата по факту поездки — наличными водителю, картой онлайн, по СБП или банковским переводом для юрлиц.",
    },
    {
      q: "Сколько пассажиров и багажа поместится?",
      a: "До 7 пассажиров плюс багаж в просторном салоне. Для большой компании или объёмного багажа подберём минивэн нужного класса.",
    },
    {
      q: `Можно заказать поездку из ${city.nameIn} в другой город?`,
      a: `Да, выполняем межгородние поездки${cityRoutes.length > 0 ? ` — у нас ${cityRoutes.length} готовых направлений из ${city.name}` : ""}. Назовите маршрут — рассчитаем цену и время в пути.`,
    },
  ];


  const cityJsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": `Минивэн с водителем в ${city.nameIn} — ЗаказМинивэна.ru`,
    "url": `https://zakazminivena.ru/cities/${slug}`,
    "telephone": "+79185875454",
    "description": `Заказать минивэн с водителем в ${city.nameIn}. ${city.description}`,
    "areaServed": {
      "@type": "City",
      "name": city.name,
    },
    "provider": {
      "@type": "Organization",
      "name": "ЗаказМинивэна.ru",
      "url": "https://zakazminivena.ru",
    },
    "serviceType": "Minivan Transfer",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://t.me/ZakazMinivena",
      "servicePhone": "+79185875454",
    },
  };

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityJsonLd) }}
      />
      <Header />
      <main>
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <HeroBackground />
          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8 lg:pb-20">
            <div className="mb-6 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white">
              <Breadcrumbs items={[
                { label: "Главная", href: "/" },
                { label: "Города", href: "/cities" },
                { label: city.name },
              ]} />
            </div>

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

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Минивэн с водителем в {city.nameIn}
                </h1>
                <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">
                  Комфортная поездка для семьи или компании до 7 пассажиров с багажом.{" "}
                  {minPrice ? (
                    <>
                      Фиксированная цена от{" "}
                      <strong className="font-bold text-white">{formatPrice(minPrice)} ₽</strong> за поездку, без предоплаты.
                    </>
                  ) : (
                    <>Фиксированная цена, детское кресло бесплатно, без предоплаты.</>
                  )}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                    asChild
                  >
                    <a href="https://t.me/ZakazMinivena">
                      <TelegramIcon className="mr-2 h-5 w-5" />
                      Написать в Telegram
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    className="h-12 bg-white text-base font-semibold text-emerald hover:bg-white/90"
                    asChild
                  >
                    <a href="tel:+79185875454">
                      <PhoneIcon className="mr-2 h-5 w-5" />
                      +7 (918) 587-54-54
                    </a>
                  </Button>
                </div>
                <p className="mt-3 text-sm text-white/70">
                  Напишите маршрут и дату — назовём точную цену за 5 минут.
                </p>
              </div>
              <HeroVehicleImage
                src={getRouteImage(city.slug, city.slug)}
                alt={`Минивэн с водителем в ${city.nameIn}`}
                captionLabel="Минивэн 7 мест с водителем"
                captionValue={minPrice ? `от ${formatPrice(minPrice)} ₽` : city.name}
                priority
              />
            </div>
          </div>
        </section>

        {/* ===== ОПИСАНИЕ + КАЛЬКУЛЯТОР ===== */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-12">
            {cityContent ? (
              cityContent.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 max-w-3xl text-lg text-muted-foreground first:mt-0">
                  {p}
                </p>
              ))
            ) : (
              <>
                <p className="mt-4 max-w-3xl text-lg text-muted-foreground first:mt-0">
                  {city.description}. Комфортный минивэн на 7 мест с водителем —
                  фиксированная цена, детское кресло бесплатно, без предоплаты.
                </p>
                <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
                  Мы выполняем межгородние перевозки из {city.name} по{" "}
                  {cityRoutes.length} направлениям. Напишите маршрут и дату в Telegram — назовём точную цену за 5 минут.
                </p>
              </>
            )}
          </div>

          {/* Калькулятор — отправление предзаполнено городом */}
          <section>
            <h2 className="mb-2 text-2xl font-bold tracking-tight">
              Рассчитать стоимость поездки из {city.name}
            </h2>
            <p className="mb-6 max-w-2xl text-muted-foreground">
              Укажите, куда едете — покажем расстояние, время в пути и фиксированную
              цену за минивэн. Без предоплаты, детское кресло бесплатно.
            </p>
            <PriceCalculator defaultFrom={city.name} />
          </section>
        </div>

        {/* ===== ЧТО ВХОДИТ В ЦЕНУ ===== */}
        <section className="border-y bg-muted/40 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Что входит в цену</h2>
              <p className="mt-3 text-base text-muted-foreground">
                Без скрытых доплат — всё в фиксированной цене за машину
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {includedItems.map((t) => (
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

        {/* ===== МАРШРУТЫ · АЭРОПОРТЫ · УСЛУГИ ===== */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Routes section */}
        {cityRoutes.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              Маршруты из {city.name}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cityRoutes.map((route) => {
                const price = calcPrice(route.km);
                return (
                  <Link key={route.slug} href={`/routes/${route.slug}`}>
                    <Card className="h-full transition-shadow hover:shadow-md hover:border-emerald/40">
                      <CardContent className="flex items-center justify-between gap-3 p-4">
                        <div className="min-w-0">
                          <p className="font-semibold leading-tight">
                            {route.from} → {route.to}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {route.km} км
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {route.hours}
                            </Badge>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-lg font-bold text-emerald">
                            {formatPrice(price)} ₽
                          </p>
                          <ArrowRightIcon className="ml-auto h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Airports section */}
        {cityAirports.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              Аэропорты
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cityAirports.map((airport) => {
                const price = calcPrice(airport.km);
                return (
                  <Link
                    key={airport.slug}
                    href={`/airports/${airport.slug}`}
                  >
                    <Card className="h-full transition-shadow hover:shadow-md hover:border-emerald/40">
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald/10">
                          <PlaneIcon className="h-5 w-5 text-emerald" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold leading-tight">
                            {airport.name}{" "}
                            <span className="text-muted-foreground">
                              ({airport.code})
                            </span>
                          </p>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {airport.km} км от центра — от{" "}
                            <span className="font-medium text-emerald">
                              {formatPrice(price)} ₽
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Services — постоянные внутренние ссылки (драйвер глубины) */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Минивэн в {city.nameIn} под любую задачу
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cityServices.map((s) => (
              <Link key={s.slug} href={`/service/${s.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md hover:border-emerald/40">
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <p className="font-semibold leading-tight">
                      Минивэн на {s.scenarioGenitive}
                    </p>
                    <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        </div>

        {/* ===== ТАРИФНЫЕ КАРТОЧКИ ===== */}
        <FleetTariffCards
          title={`Минивэны, которые подаём в ${city.nameIn}`}
          subtitle="Выберите класс — цена за машину, не за пассажира"
          contextLabel={city.name}
          bg="default"
        />

        {/* ===== ОТЗЫВЫ ===== */}
        <ReviewsSection tags={reviewTags} />

        {/* ===== КАК ЗАКАЗАТЬ ===== */}
        <HowItWorks3Steps bg="muted" />

        {/* ===== ЛОНГРИД ===== */}
        <RouteFactsLongread
          title={`Всё про минивэн в ${city.nameIn}`}
          intro={longreadIntro}
          sections={longreadSections}
        />

        {/* ===== FAQ ===== */}
        <RouteFaq
          title={`Частые вопросы о минивэне в ${city.nameIn}`}
          items={cityFaq}
          bg="default"
        />

        {/* ===== ВИДЫ ОПЛАТЫ ===== */}
        <PaymentMethods />

        <B2bCtaBlock cityName={city.name} />

        {/* ===== ДРУГИЕ ГОРОДА + ФИНАЛЬНЫЙ CTA ===== */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Other cities — кросс-линковка между городами */}
          {otherCities.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">
                Минивэн в других городах
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cities/${c.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-emerald/40 hover:text-emerald"
                  >
                    <MapPinIcon className="h-3.5 w-3.5 text-emerald" />
                    {c.name}
                  </Link>
                ))}
                <Link
                  href="/cities"
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/5 px-4 py-2 text-sm font-medium text-emerald transition-colors hover:bg-emerald/10"
                >
                  Все города <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>
          )}

          {/* CTA section */}
          <section className="rounded-2xl border border-emerald/20 bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Заказать минивэн в {city.nameIn}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Напишите нам в мессенджер или позвоните — ответим за 5 минут.
              Фиксированная цена, без скрытых доплат.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                asChild
              >
                <a href="https://t.me/ZakazMinivena">
                  <TelegramIcon className="mr-2 h-5 w-5" />
                  Написать в Telegram
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 text-base font-semibold"
                asChild
              >
                <a href="tel:+79185875454">
                  <PhoneIcon className="mr-2 h-5 w-5 text-emerald" />
                  +7 (918) 587-54-54
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
