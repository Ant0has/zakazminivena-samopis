import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Отзывы клиентов — минивэн с водителем | ЗаказМинивэна.ru",
  description:
    "Реальные отзывы клиентов: аэропортовые трансферы, туристические туры, свадьбы, корпоративные поездки. Маршрут, сценарий, оценка.",
  alternates: { canonical: "https://zakazminivena.ru/reviews" },
};

export default function ReviewsPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Отзывы" }]} />
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Отзывы клиентов
            </h1>
            <p className="mb-8 text-base text-muted-foreground">
              Реальные отзывы с указанием маршрута, сценария и даты. Без модерации — пишем как
              получили.
            </p>
            <ReviewsSection tags={["all"]} title="Все отзывы" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
