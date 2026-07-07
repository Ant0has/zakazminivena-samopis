import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Card } from "@/components/ui/card";
import { servicesData, getService } from "@/lib/services-data";
import { fleetBySlug } from "@/lib/fleet-data";
import { allRoutes, calcPrice, formatPrice, type RouteData } from "@/lib/routes-data";
import { PriceCalculator } from "@/components/PriceCalculator";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, ArrowRightIcon } from "lucide-react";
import { metaService } from "@/lib/content-engine/meta";

export function generateStaticParams() {
  return servicesData.map((s) => ({ scenario: s.slug }));
}

type Props = { params: Promise<{ scenario: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { scenario } = await params;
  const s = getService(scenario);
  if (!s) return {};
  const minPrice = s.pricing[0]?.price ?? 4000;
  const meta = metaService({
    slug: scenario,
    scenarioGenitive: s.scenarioGenitive,
    minPrice,
  });
  return { ...meta, alternates: { canonical: `https://zakazminivena.ru/service/${scenario}` } };
}

export default async function ServicePage({ params }: Props) {
  const { scenario } = await params;
  const s = getService(scenario);
  if (!s) notFound();
  const fleet = s.fleetModels.map((slug) => fleetBySlug[slug]).filter(Boolean);
  const related = s.relatedServices
    .map((slug) => servicesData.find((x) => x.slug === slug))
    .filter(Boolean);

  // Для абстрактного сценария «межгород» даём конкретные маршруты —
  // перехватываем интент «откуда-куда» и поднимаем глубину/конверсию.
  const FEATURED_INTERCITY = [
    "moskva-spb",
    "moskva-nizhniy-novgorod",
    "moskva-kazan",
    "kazan-samara",
    "ekaterinburg-tyumen",
    "krasnodar-sochi",
    "rostov-krasnodar",
    "moskva-voronezh",
    "ekaterinburg-perm",
  ];
  let intercityRoutes: RouteData[] = [];
  if (scenario === "intercity") {
    const bySlug = new Map(allRoutes.map((r) => [r.slug, r]));
    intercityRoutes = FEATURED_INTERCITY.map((sl) => bySlug.get(sl)).filter(
      (r): r is RouteData => Boolean(r),
    );
    if (intercityRoutes.length < 6) {
      const seen = new Set(intercityRoutes.map((r) => r.slug));
      for (const r of allRoutes) {
        if (r.fromSlug !== r.toSlug && !seen.has(r.slug)) {
          intercityRoutes.push(r);
          seen.add(r.slug);
        }
        if (intercityRoutes.length >= 9) break;
      }
    }
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Сценарии", href: "/service" },
            { label: `Минивэн на ${s.scenarioGenitive}` },
          ]}
        />

        <section className="py-10 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:px-8">
            <div>
              {s.isB2B && (
                <div className="mb-3 inline-block rounded bg-emerald/10 px-2 py-1 text-xs font-medium uppercase text-emerald">
                  B2B
                </div>
              )}
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{s.h1}</h1>
              <p className="mb-6 text-base text-muted-foreground sm:text-lg">{s.heroSubtitle}</p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {s.trustBadges.map((b) => (
                  <li
                    key={b}
                    className="rounded bg-emerald/10 px-2 py-1 text-xs font-medium text-emerald"
                  >
                    {b}
                  </li>
                ))}
              </ul>

              {intercityRoutes.length > 0 && (
                <>
                  <h2 className="mb-3 text-xl font-semibold">
                    Популярные межгородние маршруты
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Фиксированная цена за минивэн 7 мест. Нет вашего маршрута —
                    напишите в форме справа, рассчитаем за 5 минут.
                  </p>
                  <div className="mb-6 grid gap-3 sm:grid-cols-2">
                    {intercityRoutes.map((r) => (
                      <Link key={r.slug} href={`/routes/${r.slug}`}>
                        <Card className="flex h-full items-center justify-between gap-3 p-4 transition-colors hover:border-emerald">
                          <div className="min-w-0">
                            <div className="font-semibold leading-tight">
                              {r.from} → {r.to}
                            </div>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {r.km} км
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {r.hours}
                              </Badge>
                            </div>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="text-lg font-bold text-emerald">
                              {formatPrice(calcPrice(r.km))} ₽
                            </div>
                            <ArrowRightIcon className="ml-auto h-4 w-4 text-muted-foreground" />
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  <h2 className="mb-3 text-xl font-semibold">
                    Рассчитать свой маршрут
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Нет вашего направления в списке? Укажите города — покажем
                    расстояние, время в пути и фиксированную цену за минивэн.
                  </p>
                  <div className="mb-6">
                    <PriceCalculator />
                  </div>
                </>
              )}

              <h2 className="mb-3 text-xl font-semibold">Сценарии использования</h2>
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {s.subscenarios.map((sub) => (
                  <Card key={sub.title} className="p-4">
                    <div className="mb-1 font-semibold">{sub.title}</div>
                    <div className="text-sm text-muted-foreground">{sub.description}</div>
                  </Card>
                ))}
              </div>

              <h2 className="mb-3 text-xl font-semibold">Что включено</h2>
              <ul className="mb-6 grid gap-2 sm:grid-cols-2">
                {s.whatIncluded.map((w) => (
                  <li key={w} className="flex items-center gap-2 text-sm">
                    <CheckIcon className="h-4 w-4 text-emerald" /> {w}
                  </li>
                ))}
              </ul>

              {s.pricing.length > 0 && (
                <>
                  <h2 className="mb-3 text-xl font-semibold">Цены</h2>
                  <div className="mb-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {s.pricing.map((p) => (
                          <tr key={p.name} className="border-b">
                            <td className="py-2 pr-4">{p.name}</td>
                            <td className="py-2 pr-4 text-right font-semibold">
                              {p.note} {p.price.toLocaleString("ru-RU")} ₽
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {fleet.length > 0 && (
                <>
                  <h2 className="mb-3 text-xl font-semibold">Парк под этот сценарий</h2>
                  <div className="mb-6 grid gap-3 sm:grid-cols-3">
                    {fleet.map((m) => (
                      <Link key={m.slug} href={`/fleet/${m.slug}`}>
                        <Card className="h-full p-3 transition-colors hover:border-emerald">
                          <div className="mb-1 text-xs uppercase text-muted-foreground">{m.tier}</div>
                          <div className="text-sm font-semibold">{m.fullName}</div>
                          <div className="text-xs text-muted-foreground">{m.seats} пасс.</div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <h2 className="mb-3 text-xl font-semibold">Частые вопросы</h2>
              <div className="mb-6 space-y-3">
                {s.faq.map((f) => (
                  <details key={f.q} className="rounded-md border p-4">
                    <summary className="cursor-pointer font-medium">{f.q}</summary>
                    <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BookingForm />
            </aside>
          </div>
        </section>

        {s.isB2B && <B2bCtaBlock />}

        {related.length > 0 && (
          <section className="border-t py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-4 text-xl font-semibold">Похожие сценарии</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  r ? (
                    <Link key={r.slug} href={`/service/${r.slug}`}>
                      <Card className="h-full p-4 transition-colors hover:border-emerald">
                        <div className="font-semibold">Минивэн на {r.scenarioGenitive}</div>
                        <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {r.heroSubtitle}
                        </div>
                      </Card>
                    </Link>
                  ) : null
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
