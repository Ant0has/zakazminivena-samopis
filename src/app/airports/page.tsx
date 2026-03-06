import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlaneIcon, MapPinIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { allAirports } from "@/lib/routes-data";

export const metadata: Metadata = {
  title: "Трансфер минивэн в аэропорт — ЗаказМинивена.ru",
  description:
    "Трансфер на минивэне 7 мест в аэропорты России: Шереметьево, Домодедово, Внуково, Пулково, Кольцово и другие. Фиксированная цена, встреча с табличкой, детское кресло бесплатно.",
  alternates: {
    canonical: "https://zakazminivena.ru/airports",
  },
};

export default function AirportsPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center sm:mb-16">
              <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
                <PlaneIcon className="mr-1 h-3 w-3" />
                Аэропорты
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Трансфер минивэн в аэропорт
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Комфортный трансфер на минивэне 7 мест в аэропорты по всей
                России. Встреча с табличкой, помощь с багажом, детское кресло
                бесплатно.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allAirports.map((airport) => (
                <Link
                  key={airport.slug}
                  href={`/airports/${airport.slug}`}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-emerald/40 hover:bg-emerald/5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="font-mono text-xs"
                    >
                      {airport.code}
                    </Badge>
                    <PlaneIcon className="h-4 w-4 text-muted-foreground group-hover:text-emerald" />
                  </div>
                  <h2 className="text-lg font-semibold group-hover:text-emerald">
                    {airport.name}
                  </h2>
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    {airport.city} — {airport.km} км от центра
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="mb-6 text-muted-foreground">
                Не нашли свой аэропорт? Напишите нам — подберём минивэн для
                любого направления.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
                  <a href="tel:+79185875454">+7 (918) 587-54-54</a>
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
