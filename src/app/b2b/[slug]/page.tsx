import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewsSection } from "@/components/ReviewsSection";
import { b2bPillars, getB2bPillar } from "@/lib/b2b-data";
import { b2bCases } from "@/lib/b2b-cases-data";
import { allRoutes, calcPrice, formatPrice } from "@/lib/routes-data";
import { TelegramIcon } from "@/components/icons";
import {
  Clock,
  Shield,
  FileText,
  Users,
  Headphones,
  MapPin,
  Plane,
  Wifi,
  Car,
  Package,
  Truck,
  Heart,
  Building2,
  CreditCard,
  CalendarDays,
  Navigation,
  Baby,
  Thermometer,
  Eye,
  Phone,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Star,
  Lock,
  Zap,
  Weight,
  Sunrise,
  Luggage,
  Radio,
  Shuffle,
  UserCheck,
  CalendarClock,
  Banknote,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  Shield,
  FileText,
  Users,
  Headphones,
  MapPin,
  Plane,
  Wifi,
  Car,
  Package,
  Truck,
  Heart,
  Building2,
  CreditCard,
  CalendarDays,
  Navigation,
  Baby,
  Thermometer,
  Eye,
  Phone,
  AlertTriangle,
  Star,
  Lock,
  Zap,
  Weight,
  Sunrise,
  Luggage,
  Radio,
  Shuffle,
  UserCheck,
  CalendarClock,
  Banknote,
};

const reviewTagsMap: Record<string, string[]> = {
  "corporate-transport": ["group", "intercity"],
  "airport-vip": ["airport", "group"],
  events: ["group", "intercity"],
  "shift-workers": ["intercity", "group"],
  medical: ["intercity", "comfort"],
  cargo: ["intercity", "group"],
};

export function generateStaticParams() {
  return b2bPillars.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getB2bPillar(slug);
  if (!pillar) return {};
  return {
    title: pillar.title,
    description: pillar.description,
    openGraph: {
      title: pillar.h1,
      description: pillar.description,
      url: `https://zakazminivena.ru/b2b/${slug}`,
      siteName: "ЗаказМинивена.ru",
      locale: "ru_RU",
      type: "article",
    },
    alternates: {
      canonical: `https://zakazminivena.ru/b2b/${slug}`,
    },
  };
}

export default async function B2bPillarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pillar = getB2bPillar(slug);
  if (!pillar) notFound();

  const routes = pillar.popularRouteSlugs
    .map((s) => allRoutes.find((r) => r.slug === s))
    .filter(Boolean);

  const relatedCases = b2bCases.filter((c) => c.pillarSlug === slug).slice(0, 3);

  const reviewTags = reviewTagsMap[slug] || ["group", "intercity"];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pillar.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pillar.h1,
    provider: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
      telephone: "+79185875454",
    },
    description: pillar.description,
    areaServed: "RU",
    serviceType: pillar.h1,
  };

  return (
    <div className="relative min-h-screen">
      <Header />

      <div className="b2b-dark bg-[var(--background)] text-[var(--foreground)] min-h-screen">
        <main className="pt-16">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          {/* === HERO === */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={pillar.heroImage}
                alt={pillar.h1}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            </div>
            <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {pillar.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-300">
                {pillar.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://t.me/zakazminivena"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#26A5E4] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#26A5E4]/90"
                >
                  <TelegramIcon className="h-5 w-5" />
                  Оставить заявку
                </a>
                <a
                  href="tel:+79185875454"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="h-5 w-5 text-emerald-400" />
                  +7 (918) 587-54-54
                </a>
              </div>
            </div>
          </section>

          {/* === BREADCRUMBS === */}
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Для бизнеса", href: "/b2b" },
                { label: pillar.h1 },
              ]}
            />
          </div>

          {/* === INTRO === */}
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div
                className="prose prose-invert prose-lg max-w-none [&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p+p]:mt-4"
                dangerouslySetInnerHTML={{ __html: pillar.intro }}
              />
            </div>
          </section>

          {/* === BENEFITS === */}
          <section className="border-t border-zinc-800 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold sm:text-3xl">
                Наши преимущества
              </h2>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pillar.benefits.map((benefit, idx) => {
                  const IconComponent = iconMap[benefit.icon] || Shield;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 transition-colors hover:border-emerald-500/30"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                        <IconComponent className="h-5 w-5 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-white">{benefit.title}</h3>
                      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                        {benefit.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* === INDUSTRIES === */}
          <section className="border-t border-zinc-800 py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Для каких отраслей
              </h2>
              <p className="mt-3 text-zinc-400">
                Услуга востребована в различных сферах бизнеса
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {pillar.industries.map((industry) => (
                  <span
                    key={industry}
                    className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-sm font-medium text-zinc-200"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* === POPULAR ROUTES === */}
          {routes.length > 0 && (
            <section className="border-t border-zinc-800 py-16 sm:py-20">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold sm:text-3xl">
                  Популярные маршруты
                </h2>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {routes.map((route) => {
                    if (!route) return null;
                    const price = calcPrice(route.km);
                    return (
                      <Link
                        key={route.slug}
                        href={`/routes/${route.slug}`}
                        className="group rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5 transition-colors hover:border-emerald-500/30"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-white">
                              {route.from} → {route.to}
                            </div>
                            <div className="mt-1 text-xs text-zinc-500">
                              {route.km} км · {route.hours}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-400">
                              {formatPrice(price)} ₽
                            </div>
                            <div className="text-xs text-zinc-500">за минивэн</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                          Подробнее
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* === RELATED CASES === */}
          {relatedCases.length > 0 && (
            <section className="border-t border-zinc-800 py-16 sm:py-20">
              <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold sm:text-3xl">
                  Кейсы клиентов
                </h2>
                <p className="mt-3 text-center text-zinc-400">
                  Реальные примеры работы с компаниями
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedCases.map((caseItem) => (
                    <Link
                      key={caseItem.slug}
                      href={`/b2b/cases/${caseItem.slug}`}
                      className="group overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 transition-colors hover:border-emerald-500/30"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={caseItem.image}
                          alt={caseItem.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                            {caseItem.industry}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-white leading-snug">
                          {caseItem.title}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-500">
                          {caseItem.company}
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {caseItem.stats.map((stat, i) => (
                            <div key={i} className="text-center">
                              <div className="text-sm font-bold text-emerald-400">
                                {stat.value}
                              </div>
                              <div className="text-xs text-zinc-500">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-sm text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                          Читать кейс
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* === FAQ === */}
          <section className="border-t border-zinc-800 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold sm:text-3xl">
                Часто задаваемые вопросы
              </h2>
              <div className="mt-12 space-y-4">
                {pillar.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-zinc-700/50 bg-zinc-800/50"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-white [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <ArrowRight className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* === CTA === */}
          <section className="border-t border-zinc-800 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Готовы начать?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-400">
                Оставьте заявку — мы подготовим коммерческое предложение за 1 рабочий день
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="https://t.me/zakazminivena"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#26A5E4] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#26A5E4]/90"
                >
                  <TelegramIcon className="h-5 w-5" />
                  Написать в Telegram
                </a>
                <a
                  href="tel:+79185875454"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="h-5 w-5 text-emerald-400" />
                  +7 (918) 587-54-54
                </a>
              </div>
              <p className="mt-6 text-sm text-zinc-500">
                Ежедневно 08:00–22:00
              </p>
            </div>
          </section>

          {/* === REVIEWS === */}
          <section className="border-t border-zinc-800 py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <ReviewsSection tags={reviewTags} />
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
