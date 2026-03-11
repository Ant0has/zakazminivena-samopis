import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TelegramIcon } from "@/components/icons";
import { seasonalPages, getSeasonalPage } from "@/lib/seasonal-data";
import { allRoutes, calcPrice, formatPrice } from "@/lib/routes-data";
import {
  PhoneIcon,
  Thermometer,
  Snowflake,
  Moon,
  Baby,
  Clock,
  BadgeRussianRuble,
  Users,
  MapPin,
  Palette,
  Wine,
  Repeat,
  Camera,
  Wind,
  Luggage,
  Umbrella,
  Hotel,
  MapPinned,
  ChevronDown,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Thermometer,
  Snowflake,
  Moon,
  Baby,
  Clock,
  BadgeRussianRuble,
  Users,
  MapPin,
  Palette,
  Wine,
  Repeat,
  Camera,
  Wind,
  Luggage,
  Umbrella,
  Hotel,
  MapPinned,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seasonalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeasonalPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `https://zakazminivena.ru/seasonal/${page.slug}`,
    },
  };
}

export default async function SeasonalSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeasonalPage(slug);
  if (!page) notFound();

  const routes = page.popularRoutes
    .map((s) => allRoutes.find((r) => r.slug === s))
    .filter(Boolean);

  const reviewTags =
    page.slug === "svadebnyy-sezon"
      ? ["wedding"]
      : page.slug === "letniy-otpusk"
        ? ["resort", "family"]
        : ["intercity"];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    image: `https://zakazminivena.ru${page.heroImage}`,
    publisher: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
    },
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Сезонные предложения", href: "/seasonal" },
                { label: page.h1 },
              ]}
            />

            <span className="inline-block rounded-full bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald mb-4">
              {page.season}
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {page.h1}
            </h1>

            {/* Hero image */}
            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image
                src={page.heroImage}
                alt={page.h1}
                width={1024}
                height={576}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Features grid */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Преимущества</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.features.map((f) => {
                  const Icon = iconMap[f.icon];
                  return (
                    <div
                      key={f.title}
                      className="rounded-xl border border-border bg-card p-5"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald/10">
                        {Icon ? (
                          <Icon className="h-5 w-5 text-emerald" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-emerald" />
                        )}
                      </div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {f.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div
              className="mt-12 space-y-4 text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />

            {/* Popular routes */}
            {routes.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">
                  Популярные маршруты
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {routes.map((route) => {
                    if (!route) return null;
                    const price = calcPrice(route.km);
                    return (
                      <Link
                        key={route.slug}
                        href={`/routes/${route.slug}`}
                        className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-emerald/40"
                      >
                        <div>
                          <div className="font-semibold">
                            {route.from} → {route.to}
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {route.km} км &middot; {route.hours}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald">
                            {formatPrice(price)} ₽
                          </div>
                          <div className="text-xs text-muted-foreground">
                            от {Math.ceil(price / 7).toLocaleString("ru-RU")} ₽/чел
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">
                Часто задаваемые вопросы
              </h2>
              <div className="space-y-4">
                {page.faq.map((f, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-border bg-card"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-5 font-medium">
                      {f.question}
                      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {f.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <ReviewsSection tags={reviewTags} />

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать минивэн
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Расскажите о маршруте и датах — подготовим предложение за 5
                минут
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
