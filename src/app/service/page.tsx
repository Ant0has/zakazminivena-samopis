import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { servicesData } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Сценарии заказа минивэна — все варианты с водителем | ЗаказМинивэна.ru",
  description:
    "Минивэн под любой сценарий: аэропорт, межгород, свадьба, корпоратив, делегации, конференции, экскурсии, почасовая, многодневная, спорткоманды, съёмочные группы.",
  alternates: { canonical: "https://zakazminivena.ru/service" },
};

export default function ServiceIndexPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Сценарии" }]} />
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Сценарии заказа минивэна
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                Минивэн под любой сценарий — от аэропортового трансфера до съёмочной группы и
                спортивной команды. Выберите свой случай — увидите цены и описание.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((s) => (
                <Link key={s.slug} href={`/service/${s.slug}`}>
                  <Card className="h-full p-5 transition-colors hover:border-emerald">
                    {s.isB2B && (
                      <div className="mb-2 inline-block rounded bg-emerald/10 px-2 py-0.5 text-xs font-medium uppercase text-emerald">
                        B2B
                      </div>
                    )}
                    <h3 className="mb-2 text-lg font-semibold">Минивэн на {s.scenarioGenitive}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{s.heroSubtitle}</p>
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
