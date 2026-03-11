import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
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
import {
  MapPinIcon,
  PlaneIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PhoneIcon,
} from "lucide-react";
import { TelegramIcon } from "@/components/icons";

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
    title: `Минивэн с водителем в ${city.nameIn} — заказать от 60 руб/км`,
    description: `Заказать минивэн с водителем в ${city.nameIn}. ${city.description}. Фиксированная цена от 60 руб/км, 7 мест, детское кресло бесплатно. +7 (918) 587-54-54`,
    alternates: {
      canonical: `https://zakazminivena.ru/cities/${slug}`,
    },
    openGraph: {
      title: `Минивэн с водителем в ${city.nameIn} — заказать от 60 руб/км`,
      description: `Заказать минивэн с водителем в ${city.nameIn}. ${city.description}. Фиксированная цена от 60 руб/км.`,
      url: `https://zakazminivena.ru/cities/${slug}`,
      siteName: "ЗаказМинивена.ru",
      locale: "ru_RU",
      type: "website",
    },
  };
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

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Back link */}
        <Link
          href="/cities"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="mr-1 h-4 w-4" />
          Все города
        </Link>

        {/* H1 + description */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Минивэн с водителем в {city.nameIn}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {city.description}. Комфортный минивэн на 7 мест с водителем —
            фиксированная цена от 60 руб/км, детское кресло бесплатно, без
            предоплаты.
          </p>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            Мы выполняем межгородние перевозки из {city.name} по{" "}
            {cityRoutes.length} направлениям. Стоимость поездки рассчитывается от
            60 руб/км на весь минивэн — при 7 пассажирах это дешевле, чем два
            обычных такси. Напишите маршрут и дату в Telegram — назовём точную
            цену за 5 минут.
          </p>
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl">
          <Image src="/images/cities/default.png" alt={`Минивэн с водителем в ${city.nameIn}`} width={1024} height={576} className="w-full h-auto object-cover" priority />
        </div>

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

        {/* How to order */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Как заказать минивэн в {city.nameIn}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                step: 1,
                title: "Напишите маршрут",
                desc: "Укажите откуда, куда, дату и количество пассажиров в Telegram или по телефону.",
              },
              {
                step: 2,
                title: "Получите цену за 5 мин",
                desc: "Рассчитаем стоимость и пришлём точную цену — фиксированную, без доплат.",
              },
              {
                step: 3,
                title: "Поездка без предоплаты",
                desc: "Водитель подъедет в назначенное время. Оплата наличными или переводом по факту.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

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
              <a href="https://t.me/zakazminivena">
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
      </main>
      <Footer />
    </div>
  );
}
