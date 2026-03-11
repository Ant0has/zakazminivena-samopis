import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, ScaleIcon } from "lucide-react";
import { comparisons } from "@/lib/comparison-data";

export const metadata: Metadata = {
  title: "Сравнение: минивэн vs другие виды транспорта | ЗаказМинивена.ru",
  description:
    "Честное сравнение минивэна с поездом, автобусом и BlaBlaCar. Что выбрать для семьи, группы или поездки с детьми? Комфорт, безопасность, стоимость — все параметры.",
  openGraph: {
    title: "Сравнение: минивэн vs другие виды транспорта | ЗаказМинивена.ru",
    description: "Честное сравнение минивэна с поездом, автобусом и BlaBlaCar. Что выбрать для семьи, группы или поездки с детьми? Комфорт, безопасность, стоимость — все параметры.",
    url: "https://zakazminivena.ru/compare",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/compare",
  },
};

export default function ComparePage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Сравнение" },
              ]}
            />

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <ScaleIcon className="mr-1 h-3 w-3" />
              Сравнение
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Минивэн vs другие виды транспорта
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Мы подготовили честные сравнения минивэна с популярными
              альтернативами. Узнайте, какой транспорт лучше подходит именно для
              вашей ситуации — семейной поездки, путешествия группой или
              междугороднего трансфера.
            </p>

            <div className="mt-12 grid gap-8">
              {comparisons.map((item) => (
                <Link
                  key={item.slug}
                  href={`/compare/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-emerald/40 hover:shadow-lg"
                >
                  <div className="sm:flex">
                    <div className="relative h-48 sm:h-auto sm:w-72 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.h1}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <Badge className="mb-3 bg-emerald/10 text-emerald hover:bg-emerald/10">
                        <ScaleIcon className="mr-1 h-3 w-3" />
                        Сравнение
                      </Badge>
                      <h2 className="text-xl font-bold sm:text-2xl group-hover:text-emerald transition-colors">
                        Минивэн vs {item.alternativeName}
                      </h2>
                      <p className="mt-2 text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-emerald">
                        Читать сравнение
                        <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
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
