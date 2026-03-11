import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { seasonalPages } from "@/lib/seasonal-data";

export const metadata: Metadata = {
  title: "Сезонные предложения — минивэн на праздники, свадьбы и отпуск | ЗаказМинивена.ru",
  description:
    "Сезонные предложения на заказ минивэна: новогодние трансферы, свадебный сезон, летний отпуск к морю. Специальные маршруты и комфортные условия для каждого сезона.",
  openGraph: {
    title: "Сезонные предложения — минивэн на праздники, свадьбы и отпуск | ЗаказМинивена.ru",
    description: "Сезонные предложения на заказ минивэна: новогодние трансферы, свадебный сезон, летний отпуск к морю. Специальные маршруты и комфортные условия для каждого сезона.",
    url: "https://zakazminivena.ru/seasonal",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/seasonal",
  },
};

export default function SeasonalIndexPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Сезонные предложения" },
              ]}
            />

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Сезонные предложения
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Специальные маршруты и условия для каждого сезона. Выберите
              подходящее предложение и закажите минивэн для комфортной поездки.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              {seasonalPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/seasonal/${page.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-emerald/40 hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={page.heroImage}
                      alt={page.h1}
                      width={600}
                      height={375}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block rounded-full bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald">
                      {page.season}
                    </span>
                    <h2 className="mt-3 text-xl font-bold tracking-tight group-hover:text-emerald transition-colors">
                      {page.h1}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {page.description}
                    </p>
                  </div>
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
