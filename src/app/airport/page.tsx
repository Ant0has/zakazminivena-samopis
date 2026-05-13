import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { PlaneIcon, MapPinIcon } from "lucide-react";
import { iataAirports } from "@/lib/iata-airports";

export const metadata: Metadata = {
  title: "Минивэн в аэропорт — 14 хабов России | ЗаказМинивена.ru",
  description:
    "Минивэн в аэропорты России: SVO, VKO, DME, LED, AER, MRV и другие. 14 хабов с подробным прайсом и маршрутами. Фикс цена, встреча с табличкой.",
  alternates: { canonical: "https://zakazminivena.ru/airport" },
  openGraph: {
    title: "Минивэн в аэропорт — 14 хабов России",
    description: "Минивэн в аэропорты России: SVO, VKO, DME, LED, AER, MRV и другие. Фикс цена, встреча с табличкой.",
    url: "https://zakazminivena.ru/airport",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
};

export default function AirportIndexPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Аэропорты" }]} />
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Минивэн в аэропорт — 14 хабов России
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Аэропортовые трансферы на минивэне 6–8 мест по фикс цене. Встреча с табличкой,
                бесплатное ожидание при задержке рейса, дет.кресла. Выберите аэропорт — увидите
                все направления и цены.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {iataAirports.map((a) => (
                <Link key={a.iata} href={`/airport/${a.iata}`} className="block">
                  <Card className="h-full p-5 transition-colors hover:border-emerald">
                    <div className="mb-3 flex items-center gap-2">
                      <PlaneIcon className="h-5 w-5 text-emerald" />
                      <span className="rounded bg-emerald/10 px-2 py-0.5 text-xs font-medium uppercase text-emerald">
                        {a.iata}
                      </span>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold">{a.nameFull}</h3>
                    <p className="text-sm text-muted-foreground">
                      <MapPinIcon className="inline h-4 w-4" /> {a.city} · {a.kmToCenter} км
                      до центра
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
