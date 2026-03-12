import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewsSection } from "@/components/ReviewsSection";
import { b2bCases, getB2bCase } from "@/lib/b2b-cases-data";
import { allRoutes, calcPrice, formatPrice } from "@/lib/routes-data";
import { TelegramIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Quote,
  TrendingUp,
  Building2,
  CheckCircle2,
  ArrowRightIcon,
  PhoneIcon,
} from "lucide-react";

export async function generateStaticParams() {
  return b2bCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getB2bCase(slug);
  if (!c) return {};

  const title = `${c.title} — кейс ${c.company} | ЗаказМинивена.ru`;
  const description = `${c.challenge.slice(0, 150)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://zakazminivena.ru/b2b/cases/${slug}`,
      siteName: "ЗаказМинивена.ru",
      locale: "ru_RU",
      type: "article",
      images: [{ url: `https://zakazminivena.ru${c.image}`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://zakazminivena.ru/b2b/cases/${slug}`,
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getB2bCase(slug);
  if (!c) notFound();

  const caseRoutes = c.routeSlugs
    .map((rs) => allRoutes.find((r) => r.slug === rs))
    .filter(Boolean);

  const relatedCases = b2bCases
    .filter((other) => other.slug !== c.slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.challenge,
    image: `https://zakazminivena.ru${c.image}`,
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
    mainEntityOfPage: `https://zakazminivena.ru/b2b/cases/${slug}`,
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="b2b-dark bg-[var(--background)] text-[var(--foreground)] min-h-screen">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />

          {/* Breadcrumbs */}
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Для бизнеса", href: "/b2b" },
                { label: "Кейсы", href: "/b2b/cases" },
                { label: c.company },
              ]}
            />
          </div>

          {/* Hero */}
          <section className="relative mt-4 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[21/9] sm:aspect-[3/1]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <span className="inline-block rounded-full bg-emerald/20 px-3 py-1 text-xs font-medium text-emerald">
                    {c.industry}
                  </span>
                  <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    {c.title}
                  </h1>
                  <p className="mt-2 text-lg text-zinc-300">{c.company}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Bar */}
          <section className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 gap-4 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6">
                {c.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-emerald sm:text-3xl">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column */}
                <div className="space-y-8 lg:col-span-2">
                  {/* Challenge */}
                  <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 sm:p-8">
                    <h2 className="flex items-center gap-3 text-xl font-bold">
                      <TrendingUp className="h-5 w-5 text-emerald" />
                      Задача
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {c.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 sm:p-8">
                    <h2 className="flex items-center gap-3 text-xl font-bold">
                      <Building2 className="h-5 w-5 text-emerald" />
                      Решение
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {c.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 sm:p-8">
                    <h2 className="text-xl font-bold">Результаты</h2>
                    <ul className="mt-4 space-y-3">
                      {c.results.map((r, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                          <span className="text-muted-foreground">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Company Info */}
                  <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6">
                    <h3 className="font-semibold">О компании</h3>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Компания</dt>
                        <dd className="mt-0.5 font-medium">{c.company}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Отрасль</dt>
                        <dd className="mt-0.5">
                          <span className="inline-block rounded-full bg-emerald/20 px-2.5 py-0.5 text-xs font-medium text-emerald">
                            {c.industry}
                          </span>
                        </dd>
                      </div>
                    </dl>
                    <Link
                      href={`/b2b/${c.pillarSlug}`}
                      className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald hover:underline"
                    >
                      Подробнее об услуге
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* Related Routes */}
                  {caseRoutes.length > 0 && (
                    <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6">
                      <h3 className="font-semibold">Маршруты</h3>
                      <div className="mt-4 space-y-3">
                        {caseRoutes.map((route) => {
                          if (!route) return null;
                          const price = calcPrice(route.km);
                          return (
                            <Link
                              key={route.slug}
                              href={`/routes/${route.slug}`}
                              className="flex items-center justify-between rounded-lg border border-zinc-700/30 bg-zinc-900/50 p-3 transition-colors hover:border-emerald/30"
                            >
                              <div>
                                <div className="text-sm font-medium">
                                  {route.from} → {route.to}
                                </div>
                                <div className="mt-0.5 text-xs text-muted-foreground">
                                  {route.km} км · {route.hours}
                                </div>
                              </div>
                              <div className="text-sm font-bold text-emerald">
                                {formatPrice(price)} ₽
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-xl border-l-4 border-emerald bg-zinc-800/50 p-6 sm:p-8">
                <Quote className="mb-4 h-8 w-8 text-emerald/40" />
                <blockquote className="text-lg italic leading-relaxed text-muted-foreground sm:text-xl">
                  &laquo;{c.quote}&raquo;
                </blockquote>
                <div className="mt-6">
                  <div className="font-semibold">{c.quoteName}</div>
                  <div className="text-sm text-muted-foreground">
                    {c.quoteRole}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-zinc-700/50 py-16">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Хотите такой же результат?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Расскажите о вашей задаче — мы подготовим индивидуальное решение
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
          </section>

          {/* Related Cases */}
          <section className="border-t border-zinc-700/50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-bold">Другие кейсы</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedCases.map((rc) => (
                  <Link
                    key={rc.slug}
                    href={`/b2b/cases/${rc.slug}`}
                    className="group overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 transition-colors hover:border-emerald/40"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={rc.image}
                        alt={rc.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <span className="inline-block rounded-full bg-emerald/20 px-2.5 py-0.5 text-xs font-medium text-emerald">
                          {rc.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-medium text-muted-foreground">
                        {rc.company}
                      </div>
                      <h3 className="mt-1 text-sm font-semibold leading-snug">
                        {rc.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="border-t border-zinc-700/50">
            <ReviewsSection tags={["group", "intercity"]} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
