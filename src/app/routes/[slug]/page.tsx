import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { TelegramIcon, MaxIcon } from "@/components/icons";
import {
  allRoutes,
  calcPrice,
  calcReturnPrice,
  calcRoundTripTotal,
  formatPrice,
  pricePerPerson,
  RouteData,
} from "@/lib/routes-data";
import { getRouteImage } from "@/lib/route-images";
import { getRouteContent, getRouteMetaDescription } from "@/lib/route-content";
import {
  ShieldCheckIcon,
  UsersIcon,
  BabyIcon,
  CalendarXIcon,
  UserCheckIcon,
  WalletIcon,
  MapPinIcon,
  ClockIcon,
  RulerIcon,
  PhoneIcon,
  ArrowLeftIcon,
  PercentIcon,
  CheckIcon,
  XIcon,
  HelpCircleIcon,
} from "lucide-react";
import { ReviewsSection } from "@/components/ReviewsSection";

export function generateStaticParams() {
  return allRoutes.map((route) => ({
    slug: route.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = allRoutes.find((r) => r.slug === slug);
  if (!route) return {};

  const price = formatPrice(calcPrice(route.km));

  return {
    title: `Заказать минивэн ${route.from} — ${route.to}: цена ${price} руб., ${route.km} км`,
    description: getRouteMetaDescription(slug, route.fromSlug, route.toSlug, route.from, route.to, route.km, route.hours, price),
    alternates: {
      canonical: `https://zakazminivena.ru/routes/${slug}`,
    },
    openGraph: {
      title: `Заказать минивэн ${route.from} — ${route.to} | ${price} руб.`,
      description: `Заказать минивэн с водителем ${route.from} — ${route.to}. ${route.km} км, ${route.hours}. Фиксированная цена ${price} руб. за минивэн 7 мест. Звоните: +7 (918) 587-54-54`,
      url: `https://zakazminivena.ru/routes/${slug}`,
      siteName: "ЗаказМинивена.ru",
      locale: "ru_RU",
      type: "website",
    },
  };
}

function getRouteDescription(route: RouteData, priceFormatted: string, perPerson: string): string[] {
  const content = getRouteContent(route.slug, route.fromSlug, route.toSlug);
  const priceParagraph = `Стоимость поездки на минивэне ${route.from} — ${route.to} — ${priceFormatted} рублей за весь автомобиль. При полной загрузке 7 пассажиров это всего ${perPerson} рублей на человека — значительно дешевле, чем заказывать два обычных такси. Цена фиксируется при заказе и не меняется: никаких наценок за время суток, праздники или пробки. В стоимость включены детское кресло, встреча с табличкой, кондиционер и бутылки воды.`;

  // Insert price paragraph after first content paragraph
  const result = [content.description[0], priceParagraph, ...content.description.slice(1)];

  // Add road info and landmarks as final paragraph
  if (content.roadInfo || content.landmarks) {
    result.push(`Дорожные условия: ${content.roadInfo} Достопримечательности по маршруту: ${content.landmarks}.`);
  }

  return result;
}

const advantages = [
  {
    icon: ShieldCheckIcon,
    title: "Фиксированная цена",
    description: "Стоимость известна до поездки и не меняется",
  },
  {
    icon: UsersIcon,
    title: "7 комфортных мест",
    description: "Просторный салон для семьи или компании",
  },
  {
    icon: BabyIcon,
    title: "Детское кресло",
    description: "Бесплатно предоставляем для маленьких пассажиров",
  },
  {
    icon: CalendarXIcon,
    title: "Отмена за 24 часа",
    description: "Бесплатная отмена или перенос поездки",
  },
  {
    icon: UserCheckIcon,
    title: "Встреча с табличкой",
    description: "Водитель встретит вас в аэропорту или на вокзале",
  },
  {
    icon: WalletIcon,
    title: "Без предоплаты",
    description: "Оплата водителю по факту поездки",
  },
];


function getRouteTags(fromSlug: string, toSlug: string): string[] {
  const slugs = fromSlug + " " + toSlug;
  const tags: string[] = [];
  if (/sochi|krasnodar|adler|anapa|gelendzhik/.test(slugs)) {
    tags.push("resort", "south");
  } else if (/simferopol|yalta|sevastopol/.test(slugs)) {
    tags.push("resort", "south");
  } else if (/mineralnye-vody|kislovodsk|pyatigorsk|dombay|essentuki|elbrus/.test(slugs)) {
    tags.push("kmv");
  } else if (/ekaterinburg|chelyabinsk|tyumen|perm/.test(slugs)) {
    tags.push("ural");
  } else if (/novosibirsk|barnaul|tomsk|gorno-altaysk/.test(slugs)) {
    tags.push("siberia");
  } else if (/moskva/.test(slugs)) {
    tags.push("moscow");
  } else if (/spb|sankt-peterburg/.test(slugs)) {
    tags.push("spb");
  }
  if (tags.length === 0) tags.push("intercity");
  else if (!tags.includes("intercity")) tags.push("intercity");
  return tags;
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const route = allRoutes.find((r) => r.slug === slug);

  if (!route) {
    notFound();
  }

  const price = calcPrice(route.km);
  const priceFormatted = formatPrice(price);
  const perPerson = pricePerPerson(route.km);
  const reviewTags = getRouteTags(route.fromSlug, route.toSlug);

  const returnPrice = calcReturnPrice(route.km);
  const returnPriceFormatted = formatPrice(returnPrice);
  const roundTripTotal = calcRoundTripTotal(route.km);
  const roundTripFormatted = formatPrice(roundTripTotal);
  const fullPriceRoundTrip = price * 2;
  const roundTripSavings = fullPriceRoundTrip - roundTripTotal;

  // Taxi comparison: 2 taxis at ~70 rub/km each
  const taxiPrice = Math.ceil((route.km * 70 * 2) / 500) * 500;
  const savings = taxiPrice - price;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Минивэн ${route.from} — ${route.to}`,
    description: `Трансфер на минивэне ${route.from} — ${route.to}, ${route.km} км, ${route.hours}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: price.toString(),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "ЗаказМинивена.ru",
        telephone: "+79185875454",
      },
    },
  };

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": `Сколько стоит минивэн ${route.from} — ${route.to}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Стоимость поездки на минивэне ${route.from} — ${route.to} составляет ${priceFormatted} рублей за весь автомобиль на 7 мест. Цена фиксированная и не меняется. При полной загрузке это ${perPerson} рублей на человека.`
              }
            },
            {
              "@type": "Question",
              "name": `Сколько ехать на минивэне ${route.from} — ${route.to}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Расстояние ${route.from} — ${route.to} составляет ${route.km} км. Время в пути на минивэне — около ${route.hours}.`
              }
            },
            {
              "@type": "Question",
              "name": `Можно ли заказать детское кресло на маршрут ${route.from} — ${route.to}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Да, детское автокресло предоставляется бесплатно по запросу. Укажите возраст ребёнка при заказе — мы подберём подходящее кресло."
              }
            },
            {
              "@type": "Question",
              "name": `Как заказать минивэн ${route.from} — ${route.to}?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Напишите нам в Telegram (@zakazminivena) или позвоните по номеру +7 (918) 587-54-54. Укажите маршрут, дату и количество пассажиров — мы подтвердим заказ за 5 минут. Предоплата не требуется."
              }
            }
          ]
        }) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Главная", href: "/" },
              { label: "Маршруты", href: "/routes" },
              { label: `${route.from} — ${route.to}` },
            ]} />
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Минивэн {route.from} — {route.to}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Комфортный трансфер на минивэне 7 мест с водителем
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image src={getRouteImage(route.fromSlug, route.toSlug)} alt={`Минивэн ${route.from} — ${route.to}`} width={1024} height={576} className="w-full h-auto object-cover" />
            </div>
          </div>
        </section>

        {/* Price + Route info */}
        <section className="pb-12 sm:pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {/* Price card */}
              <Card className="border-emerald/30 bg-emerald/5 p-6 sm:p-8 lg:col-span-1">
                <div className="text-sm font-medium uppercase tracking-wider text-emerald">
                  Стоимость поездки
                </div>
                <div className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
                  {priceFormatted}
                </div>
                <div className="mt-1 text-xl text-muted-foreground">
                  руб. за минивэн
                </div>
                <Badge
                  variant="secondary"
                  className="mt-4 bg-emerald/10 text-emerald hover:bg-emerald/15"
                >
                  {perPerson} руб/чел при 7 пассажирах
                </Badge>
              </Card>

              {/* Route details */}
              <Card className="p-6 sm:p-8 lg:col-span-2">
                <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Информация о маршруте
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                      <RulerIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{route.km} км</div>
                      <div className="text-sm text-muted-foreground">
                        Расстояние
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                      <ClockIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{route.hours}</div>
                      <div className="text-sm text-muted-foreground">
                        Время в пути
                      </div>
                    </div>
                  </div>

                </div>
              </Card>
            </div>
            {/* Return trip discount */}
            <div className="mt-4 relative overflow-hidden rounded-2xl border-2 border-emerald/40 bg-gradient-to-r from-emerald/5 via-emerald/10 to-emerald/5 p-6 sm:p-8">
              <div className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald/20">
                <span className="text-lg font-bold text-emerald">−20%</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <PercentIcon className="h-5 w-5 text-emerald" />
                <h3 className="text-xl font-bold text-emerald">Скидка 20% на обратный путь</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <div className="text-sm text-muted-foreground">Обратный путь</div>
                  <div className="text-2xl font-bold">{returnPriceFormatted} <span className="text-base text-emerald">руб.</span></div>
                  <div className="text-xs text-emerald font-medium">скидка 20%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Туда-обратно</div>
                  <div className="text-2xl font-bold">{roundTripFormatted} <span className="text-base text-emerald">руб.</span></div>
                  <div className="text-xs text-muted-foreground line-through">{formatPrice(fullPriceRoundTrip)} руб.</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Экономия</div>
                  <div className="text-2xl font-bold text-emerald">{formatPrice(roundTripSavings)} <span className="text-base">руб.</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Route description */}
        <section className="pb-12 sm:pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
              О маршруте {route.from} — {route.to}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {getRouteDescription(route, priceFormatted, perPerson).map(
                (paragraph, i) => (
                  <p key={i} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              )}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
              Почему выбирают нас
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {advantages.map((adv) => (
                <div
                  key={adv.title}
                  className="group rounded-2xl border border-border/50 bg-card/30 p-6 transition-all hover:border-emerald/30 hover:bg-card/60"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald transition-colors group-hover:bg-emerald/15">
                    <adv.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{adv.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why minivan vs 2 taxis */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Почему минивэн, а не 2 такси
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              Сравните на примере маршрута {route.from} — {route.to} ({route.km}{" "}
              км)
            </p>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Taxi option */}
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8">
                <div className="mb-6 text-sm font-medium uppercase tracking-wider text-destructive/70">
                  2 обычных такси
                </div>
                <div className="mb-2 text-4xl font-bold text-destructive/80 line-through decoration-2 sm:text-5xl">
                  {formatPrice(taxiPrice)}{" "}
                  <span className="text-2xl">руб.</span>
                </div>
                <p className="mb-6 text-sm text-muted-foreground">
                  2 машины x {formatPrice(Math.round(taxiPrice / 2))} руб.
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <XIcon className="h-4 w-4 text-destructive/60" />
                    Семья в разных машинах
                  </li>
                  <li className="flex items-center gap-2">
                    <XIcon className="h-4 w-4 text-destructive/60" />
                    Нет места для багажа
                  </li>
                  <li className="flex items-center gap-2">
                    <XIcon className="h-4 w-4 text-destructive/60" />
                    Детское кресло — доплата
                  </li>
                </ul>
              </div>

              {/* Minivan option */}
              <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-6 sm:p-8">
                <div className="mb-6 text-sm font-medium uppercase tracking-wider text-emerald">
                  1 минивэн — 7 мест
                </div>
                <div className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
                  {priceFormatted}{" "}
                  <span className="text-2xl text-emerald">руб.</span>
                </div>
                <p className="mb-6 text-sm text-emerald">
                  {perPerson} руб/чел при 7 пассажирах
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-emerald" />
                    Вся семья в одной машине
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-emerald" />
                    Просторный багажник
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-emerald" />
                    Детское кресло бесплатно
                  </li>
                </ul>
              </div>
            </div>

            {savings > 0 && (
              <div className="mt-8 text-center">
                <p className="text-lg font-semibold">
                  Экономия:{" "}
                  <span className="text-gradient">
                    {formatPrice(savings)} руб.
                  </span>{" "}
                  + все едут вместе
                </p>
                <p className="mt-2 text-sm text-emerald font-medium">
                  А при заказе туда-обратно — скидка 20% на обратный путь!
                </p>
              </div>
            )}
          </div>
        </section>


        <B2bCtaBlock routeName={`${route.from} — ${route.to}`} />

        {/* Reviews */}
        <ReviewsSection tags={reviewTags} />

        {/* FAQ */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-3xl">
              <HelpCircleIcon className="mr-2 inline h-7 w-7 text-emerald" />
              Часто задаваемые вопросы
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold">Сколько стоит минивэн {route.from} — {route.to}?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Стоимость поездки на минивэне {route.from} — {route.to} составляет {priceFormatted} рублей за весь автомобиль на 7 мест. Цена фиксированная и не меняется. При полной загрузке это {perPerson} рублей на человека.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold">Сколько ехать на минивэне {route.from} — {route.to}?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Расстояние {route.from} — {route.to} составляет {route.km} км. Время в пути на минивэне — около {route.hours}. Водитель выбирает оптимальный маршрут с учётом дорожной обстановки.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold">Можно ли заказать детское кресло на маршрут {route.from} — {route.to}?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Да, детское автокресло предоставляется бесплатно по запросу. Укажите возраст ребёнка при заказе — мы подберём подходящее кресло (группа 0+, 1 или 2-3).
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold">Как заказать минивэн {route.from} — {route.to}?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Напишите нам в Telegram (@zakazminivena) или позвоните по номеру +7 (918) 587-54-54. Укажите маршрут, дату и количество пассажиров — мы подтвердим заказ за 5 минут. Предоплата не требуется, оплата по факту поездки.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="mx-auto max-w-2xl border-emerald/20 p-6 shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Заказать минивэн {route.from} — {route.to}
              </h2>
              <p className="mt-3 text-muted-foreground">
                Напишите нам в мессенджер или позвоните — ответим за 5 минут.
                Цена фиксированная:{" "}
                <span className="font-semibold text-foreground">
                  {priceFormatted} руб.
                </span>
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Button
                  size="lg"
                  className="h-14 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                  asChild
                >
                  <a href={`https://t.me/zakazminivena?text=${encodeURIComponent(`Заявка: ${route.from} → ${route.to}, ${priceFormatted} руб. (обратно со скидкой 20%: ${returnPriceFormatted} руб.)`)}`}>
                    <TelegramIcon className="mr-2 h-5 w-5" />
                    Заказать в Telegram
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="h-14 bg-[#0077FF] text-base font-semibold text-white hover:bg-[#0077FF]/90"
                  asChild
                >
                  <a href="https://max.ru/zakazminivena">
                    <MaxIcon className="mr-2 h-5 w-5" />
                    Написать в MAX
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
            </Card>
          </div>
        </section>

        {/* Back link */}
        <div className="pb-12 text-center">
          <Link
            href="/routes"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Все маршруты минивэна
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
