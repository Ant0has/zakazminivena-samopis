import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon, MinusIcon, ScaleIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { ReviewsSection } from "@/components/ReviewsSection";
import { comparisons, getComparisonBySlug } from "@/lib/comparison-data";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `https://zakazminivena.ru/compare/${page.slug}`,
    },
  };
}

function WinnerIcon({ winner, side }: { winner: string; side: "minivan" | "alternative" }) {
  if (winner === "draw") {
    return <MinusIcon className="h-5 w-5 text-amber-500" />;
  }
  if (winner === side) {
    return <CheckIcon className="h-5 w-5 text-emerald" />;
  }
  return <XIcon className="h-5 w-5 text-muted-foreground/40" />;
}

export default async function ComparisonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getComparisonBySlug(slug);
  if (!page) notFound();

  const minivanWins = page.items.filter((i) => i.winner === "minivan").length;
  const altWins = page.items.filter((i) => i.winner === "alternative").length;
  const draws = page.items.filter((i) => i.winner === "draw").length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    image: `https://zakazminivena.ru${page.image}`,
    author: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
    },
    publisher: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
    },
    mainEntityOfPage: `https://zakazminivena.ru/compare/${page.slug}`,
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Сравнение", href: "/compare" },
                { label: `Минивэн vs ${page.alternativeName}` },
              ]}
            />

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <ScaleIcon className="mr-1 h-3 w-3" />
              Сравнение
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {page.h1}
            </h1>

            {/* Hero image */}
            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image
                src={page.image}
                alt={page.h1}
                width={1024}
                height={576}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Intro */}
            <div
              className="mt-10 space-y-4 text-muted-foreground leading-relaxed [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: page.intro }}
            />

            {/* Score summary */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border bg-card p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald">{minivanWins}</div>
                <div className="text-sm text-muted-foreground">Минивэн лучше</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">{draws}</div>
                <div className="text-sm text-muted-foreground">Ничья</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-muted-foreground">{altWins}</div>
                <div className="text-sm text-muted-foreground">{page.alternativeName} лучше</div>
              </div>
            </div>

            {/* Comparison table */}
            <div className="mt-10">
              <h2 className="mb-6 text-2xl font-bold">
                Таблица сравнения: Минивэн vs {page.alternativeName}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left font-semibold">Параметр</th>
                      <th className="px-4 py-3 text-left font-semibold text-emerald">Минивэн</th>
                      <th className="px-4 py-3 text-left font-semibold">{page.alternativeName}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-border last:border-0 ${
                          idx % 2 === 0 ? "bg-card" : "bg-muted/20"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium">{item.feature}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5 shrink-0">
                              <WinnerIcon winner={item.winner} side="minivan" />
                            </span>
                            <span>{item.minivan}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5 shrink-0">
                              <WinnerIcon winner={item.winner} side="alternative" />
                            </span>
                            <span>{item.alternative}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* When minivan / when alternative */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="mb-4 text-xl font-bold text-emerald">
                  Когда лучше минивэн
                </h2>
                <ul className="space-y-2">
                  {page.whenMinivan.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-xl font-bold">
                  Когда лучше {page.alternativeName}
                </h2>
                <ul className="space-y-2">
                  {page.whenAlternative.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verdict */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8">
              <h2 className="mb-4 text-2xl font-bold">Вердикт</h2>
              <div
                className="space-y-4 text-muted-foreground leading-relaxed [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: page.verdict }}
              />
            </div>

            {/* Reviews */}
            <ReviewsSection tags={["intercity"]} />

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Рассчитать стоимость поездки
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Посмотрите маршруты с фиксированными ценами или свяжитесь с нами
                для расчёта индивидуального маршрута
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-14 bg-emerald text-base font-semibold text-white hover:bg-emerald/90"
                  asChild
                >
                  <Link href="/routes">Смотреть маршруты и цены</Link>
                </Button>
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
                  <a href="tel:+79185875454">
                    <PhoneIcon className="mr-2 h-5 w-5 text-emerald" />
                    +7 (918) 587-54-54
                  </a>
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
