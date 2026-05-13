import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { destinationHubs } from "@/lib/destinations-data";
import { MapPinIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Туристические направления — минивэн по регионам России | ЗаказМинивена.ru",
  description:
    "Минивэн в туристические регионы: Карелия, КМВ, Алтай, Байкал, Крым, Краснодарское побережье, Калининград, Север. Однодневные и многодневные туры.",
  alternates: { canonical: "https://zakazminivena.ru/destination" },
};

export default function DestinationIndexPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Туристические направления" }]} />
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Туристические направления России на минивэне
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Минивэн с водителем, знающим регион. Однодневные и многодневные туры. Карелия,
                Кавказские Минеральные Воды, Алтай, Байкал, Крым, Черноморское побережье, Калининград,
                Север с северным сиянием.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {destinationHubs.map((h) => (
                <Link key={h.slug} href={`/destination/${h.slug}`}>
                  <Card className="h-full p-5 transition-colors hover:border-emerald">
                    <div className="mb-2 flex items-center gap-2 text-xs uppercase text-emerald">
                      <MapPinIcon className="h-4 w-4" /> {h.routes.length} маршрутов
                    </div>
                    <h3 className="mb-1 text-lg font-semibold">{h.regionName}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{h.topPointsShort}</p>
                    <p className="mt-2 text-xs text-muted-foreground">из {h.hubCity}</p>
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
