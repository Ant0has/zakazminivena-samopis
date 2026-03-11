import Link from "next/link";
import { ArrowRightIcon, MapPinIcon, ClockIcon, RouteIcon } from "lucide-react";
import { allRoutes, calcPrice, formatPrice } from "@/lib/routes-data";

// Топ-12 маршрутов для главной
const featuredSlugs = [
  "kazan-samara",
  "ekaterinburg-chelyabinsk",
  "moskva-sochi",
  "krasnodar-simferopol",
  "adler-roza-khutor",
  "sochi-krasnaya-polyana",
  "simferopol-yalta",
  "voronezh-moskva",
  "moskva-yaroslavl",
  "tyumen-ekaterinburg",
  "moskva-nizhniy-novgorod",
  "moskva-suzdal",
];

const popularRoutes = allRoutes.filter((r) => featuredSlugs.includes(r.slug));

export function RoutesSection() {
  return (
    <section className="relative py-20 sm:py-28" id="routes">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Популярные маршруты на минивэне
            </h2>
            <p className="mt-3 text-muted-foreground">
              Фиксированная цена за минивэн целиком — до 7 пассажиров, без скрытых доплат
            </p>
          </div>
          <Link
            href="/routes"
            className="flex items-center gap-1 text-sm font-medium text-emerald transition-colors hover:text-emerald/80"
          >
            Все {allRoutes.length} маршрутов
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((route) => (
            <Link
              key={route.slug}
              href={`/routes/${route.slug}`}
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-emerald/30 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
                  <MapPinIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {route.from} — {route.to}
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <RouteIcon className="h-3 w-3" />
                      {route.km} км
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      {route.hours}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold tabular-nums">
                  {formatPrice(calcPrice(route.km))}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    руб.
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
