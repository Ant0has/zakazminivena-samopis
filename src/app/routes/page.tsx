import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  allRoutes,
  calcPrice,
  formatPrice,
  pricePerPerson,
} from "@/lib/routes-data";
import {
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Все маршруты минивэна по России — цены и расстояния | ЗаказМинивена.ru",
  description:
    "Маршруты минивэна с водителем по России: цены, расстояния, время в пути. Более 80 направлений из Москвы, Краснодара, Сочи, Казани, Екатеринбурга и других городов. Фиксированная цена.",
  alternates: {
    canonical: "https://zakazminivena.ru/routes",
  },
  openGraph: {
    title: "Все маршруты минивэна по России | ЗаказМинивена.ru",
    description:
      "Более 80 маршрутов на минивэне 7 мест с водителем. Фиксированные цены, детское кресло бесплатно.",
    url: "https://zakazminivena.ru/routes",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
};

// Group routes by region
interface RouteGroup {
  name: string;
  routes: typeof allRoutes;
}

function groupRoutes(): RouteGroup[] {
  const groups: Record<string, typeof allRoutes> = {};

  const regionMap: Record<string, string> = {
    // Курортные
    "adler-roza-khutor": "Курорты Юга",
    "sochi-krasnaya-polyana": "Курорты Юга",
    "simferopol-yalta": "Крым",
    "simferopol-alushta": "Крым",
    "simferopol-evpatoriya": "Крым",
    "simferopol-feodosiya": "Крым",
    "simferopol-sudak": "Крым",
    "simferopol-sevastopol": "Крым",
    "krasnodar-sochi": "Краснодарский край",
    "krasnodar-adler": "Краснодарский край",
    "krasnodar-simferopol": "Краснодарский край",
    "krasnodar-anapa": "Краснодарский край",
    "krasnodar-gelendzhik": "Краснодарский край",
    "krasnodar-novorossiysk": "Краснодарский край",
    "krasnodar-yalta": "Краснодарский край",
    "rostov-krasnodar": "Ростов и Юг",
    "rostov-sochi": "Ростов и Юг",
    "rostov-adler": "Ростов и Юг",
    "rostov-anapa": "Ростов и Юг",
    "moskva-sochi": "Москва и Центральная Россия",
    // КМВ
    "mineralnye-vody-dombay": "Кавказские Минеральные Воды",
    "mineralnye-vody-kislovodsk": "Кавказские Минеральные Воды",
    "mineralnye-vody-pyatigorsk": "Кавказские Минеральные Воды",
    "mineralnye-vody-nalchik": "Кавказские Минеральные Воды",
    // Поволжье
    "kazan-samara": "Поволжье",
    "samara-kazan": "Поволжье",
    "kazan-nizhniy-novgorod": "Поволжье",
    "nizhniy-novgorod-kazan": "Поволжье",
    "kazan-ekaterinburg": "Поволжье",
    // Урал
    "ekaterinburg-chelyabinsk": "Урал",
    "chelyabinsk-ekaterinburg": "Урал",
    "ekaterinburg-tyumen": "Урал",
    "tyumen-ekaterinburg": "Урал",
    "ekaterinburg-perm": "Урал",
    "ekaterinburg-kurgan": "Урал",
    // Москва
    "moskva-spb": "Москва и Центральная Россия",
    "spb-moskva": "Москва и Центральная Россия",
    "moskva-nizhniy-novgorod": "Москва и Центральная Россия",
    "nizhniy-novgorod-moskva": "Москва и Центральная Россия",
    "moskva-voronezh": "Москва и Центральная Россия",
    "voronezh-moskva": "Москва и Центральная Россия",
    "moskva-kazan": "Москва и Центральная Россия",
    "kazan-moskva": "Москва и Центральная Россия",
    "moskva-yaroslavl": "Москва и Центральная Россия",
    "yaroslavl-moskva": "Москва и Центральная Россия",
    "moskva-suzdal": "Москва и Центральная Россия",
    "moskva-vladimir": "Москва и Центральная Россия",
    "moskva-tver": "Москва и Центральная Россия",
    "moskva-tula": "Москва и Центральная Россия",
    "moskva-ryazan": "Москва и Центральная Россия",
    "moskva-kaluga": "Москва и Центральная Россия",
    "moskva-kostroma": "Москва и Центральная Россия",
    // СПб
    "spb-velikiy-novgorod": "Санкт-Петербург и Северо-Запад",
    "spb-pskov": "Санкт-Петербург и Северо-Запад",
    "spb-petrozavodsk": "Санкт-Петербург и Северо-Запад",
    // Воронеж
    "voronezh-lipetsk": "Чернозёмный край",
    "voronezh-belgorod": "Чернозёмный край",
    "voronezh-kursk": "Чернозёмный край",
    "voronezh-tambov": "Чернозёмный край",
    // Новосибирск
    "novosibirsk-barnaul": "Сибирь",
    "novosibirsk-tomsk": "Сибирь",
    "novosibirsk-kemerovo": "Сибирь",
    "novosibirsk-omsk": "Сибирь",
    // Волгоград
    "volgograd-rostov": "Нижнее Поволжье",
    "volgograd-saratov": "Нижнее Поволжье",
    "volgograd-astrakhan": "Нижнее Поволжье",
    "volgograd-elista": "Нижнее Поволжье",
  };

  // Desired display order
  const regionOrder = [
    "Москва и Центральная Россия",
    "Санкт-Петербург и Северо-Запад",
    "Краснодарский край",
    "Курорты Юга",
    "Крым",
    "Ростов и Юг",
    "Кавказские Минеральные Воды",
    "Поволжье",
    "Чернозёмный край",
    "Нижнее Поволжье",
    "Урал",
    "Сибирь",
  ];

  for (const route of allRoutes) {
    const region = regionMap[route.slug] || "Другие";
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(route);
  }

  return regionOrder
    .filter((name) => groups[name])
    .map((name) => ({
      name,
      routes: groups[name],
    }));
}

export default function RoutesListPage() {
  const routeGroups = groupRoutes();
  const totalRoutes = allRoutes.length;


  const routesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Все маршруты минивэна по России",
    "numberOfItems": totalRoutes,
    "itemListElement": allRoutes.map((route, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": `${route.from} — ${route.to}`,
      "url": `https://zakazminivena.ru/routes/${route.slug}`,
    })),
  };

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(routesJsonLd) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Все маршруты минивэна по России
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              {totalRoutes} направлений с фиксированными ценами. Минивэн на 7
              мест с водителем, детское кресло бесплатно.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-emerald/10 text-emerald hover:bg-emerald/15"
              >
                Фиксированная цена
              </Badge>
              <Badge variant="secondary">Без предоплаты</Badge>
              <Badge variant="secondary">Детское кресло бесплатно</Badge>
            </div>
          </div>
        </section>

        {/* Route groups */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {routeGroups.map((group) => (
                <div key={group.name}>
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl">
                    <MapPinIcon className="h-5 w-5 text-emerald" />
                    {group.name}
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.routes.map((route) => {
                      const price = calcPrice(route.km);

                      return (
                        <Link
                          key={route.slug}
                          href={`/routes/${route.slug}`}
                          className="group"
                        >
                          <Card className="flex h-full items-center justify-between gap-3 p-4 transition-all hover:border-emerald/30 hover:bg-emerald/5">
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold group-hover:text-emerald transition-colors truncate">
                                {route.from} — {route.to}
                              </div>
                              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                                <span>{route.km} км</span>
                                <span className="flex items-center gap-0.5">
                                  <ClockIcon className="h-3 w-3" />
                                  {route.hours}
                                </span>
                              </div>
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="text-lg font-bold">
                                {formatPrice(price)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                руб.
                              </div>
                            </div>
                            <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-emerald" />
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="mx-auto max-w-2xl border-emerald/20 p-6 text-center shadow-sm sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Не нашли свой маршрут?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Напишите нам — рассчитаем стоимость любого маршрута за 5 минут
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-12 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                  asChild
                >
                  <a href="https://t.me/zakazminivena">
                    Написать в Telegram
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 text-base font-semibold"
                  asChild
                >
                  <a href="tel:+79185875454">+7 (918) 587-54-54</a>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
