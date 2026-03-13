import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { allCities, allRoutes } from "@/lib/routes-data";
import { MapPinIcon, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Минивэн с водителем — города России | ЗаказМинивена.ru",
  description:
    "Заказать минивэн с водителем в городах России. Межгородние поездки и трансферы в аэропорт на комфортном минивэне 7 мест. Фиксированная цена.",
  alternates: {
    canonical: "https://zakazminivena.ru/cities",
  },
  openGraph: {
    title: "Минивэн с водителем — города России | ЗаказМинивена.ru",
    description:
      "Заказать минивэн с водителем в городах России. Межгородние поездки и трансферы в аэропорт на комфортном минивэне 7 мест.",
    url: "https://zakazminivena.ru/cities",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
};

export default function CitiesPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Минивэн с водителем — города России",
            "description": "Заказать минивэн с водителем в городах России. Межгородние поездки и трансферы в аэропорт на комфортном минивэне 7 мест.",
            "url": "https://zakazminivena.ru/cities",
            "isPartOf": {
              "@type": "WebSite",
              "name": "ЗаказМинивена.ru",
              "url": "https://zakazminivena.ru"
            }
          }) }}
        />
        <Breadcrumbs items={[
          { label: "Главная", href: "/" },
          { label: "Города" },
        ]} />
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Минивэн с водителем — города России
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Выберите город отправления — мы покажем доступные маршруты,
            аэропорты и цены на трансфер минивэном
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allCities.map((city) => {
            const routeCount = allRoutes.filter(
              (r) => r.fromSlug === city.slug
            ).length;

            return (
              <Link key={city.slug} href={`/cities/${city.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md hover:border-emerald/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPinIcon className="h-5 w-5 shrink-0 text-emerald" />
                      {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {city.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant="secondary">
                        {routeCount}{" "}
                        {routeCount === 1
                          ? "маршрут"
                          : routeCount >= 2 && routeCount <= 4
                            ? "маршрута"
                            : "маршрутов"}
                      </Badge>
                      <span className="flex items-center text-sm font-medium text-emerald">
                        Подробнее
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
