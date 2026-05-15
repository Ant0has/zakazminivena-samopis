import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingForm } from "@/components/BookingForm";
import { Card } from "@/components/ui/card";
import { fleetModels, getFleetModel } from "@/lib/fleet-data";
import { CheckIcon } from "lucide-react";
import { metaFleetModel } from "@/lib/content-engine/meta";

export function generateStaticParams() {
  return fleetModels.map((m) => ({ model: m.slug }));
}

type Props = { params: Promise<{ model: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { model } = await params;
  const m = getFleetModel(model);
  if (!m) return {};
  const minPrice = m.pricing[0]?.price ?? 4000;
  const meta = metaFleetModel({
    slug: model,
    fullName: m.fullName,
    brand: m.brand,
    model: m.model,
    tier: m.tier,
    seats: m.seats,
    luggageL: m.luggageL,
    minPrice,
  });
  return { ...meta, alternates: { canonical: `https://zakazminivena.ru/fleet/${model}` } };
}

export default async function FleetModelPage({ params }: Props) {
  const { model } = await params;
  const m = getFleetModel(model);
  if (!m) notFound();
  const alternatives = m.alternatives.map((s) => fleetModels.find((x) => x.slug === s)).filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: m.fullName,
    description: m.description,
    brand: { "@type": "Brand", name: m.brand },
    offers: {
      "@type": "Offer",
      price: String(m.pricing[0]?.price ?? 4000),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Парк", href: "/fleet" },
            { label: m.model },
          ]}
        />
        <section className="py-10 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:px-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded bg-emerald/10 px-2 py-1 text-xs font-medium uppercase text-emerald">
                {m.tier}
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {m.fullName} — {m.tier} минивэн на {m.seats} пассажиров
              </h1>
              <p className="mb-6 text-base text-muted-foreground sm:text-lg">{m.description}</p>

              <h2 className="mb-3 text-xl font-semibold">Технические характеристики</h2>
              <div className="mb-6 grid gap-2 text-sm sm:grid-cols-2">
                <div className="border-b py-2"><span className="text-muted-foreground">Пассажиров:</span> {m.seats}</div>
                <div className="border-b py-2"><span className="text-muted-foreground">Багаж:</span> {m.luggageL} л</div>
                <div className="border-b py-2"><span className="text-muted-foreground">КПП:</span> {m.transmission}</div>
                <div className="border-b py-2"><span className="text-muted-foreground">Двигатель:</span> {m.engine}</div>
                <div className="border-b py-2"><span className="text-muted-foreground">Расход:</span> {m.fuelConsumption} л/100 км</div>
                <div className="border-b py-2"><span className="text-muted-foreground">Парк:</span> {m.yearRange}</div>
              </div>

              <h2 className="mb-3 text-xl font-semibold">Особенности</h2>
              <ul className="mb-6 grid gap-2 sm:grid-cols-2">
                {m.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckIcon className="h-4 w-4 text-emerald" /> {f}
                  </li>
                ))}
              </ul>

              <h2 className="mb-3 text-xl font-semibold">Когда подходит {m.model}</h2>
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {m.whenSuitable.map((w) => (
                  <Card key={w.title} className="p-4">
                    <div className="mb-1 font-semibold">{w.title}</div>
                    <div className="text-sm text-muted-foreground">{w.description}</div>
                  </Card>
                ))}
              </div>

              <h2 className="mb-3 text-xl font-semibold">Цены на {m.model}</h2>
              <div className="mb-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    {m.pricing.map((p) => (
                      <tr key={p.scenario} className="border-b">
                        <td className="py-2 pr-4">{p.scenario}</td>
                        <td className="py-2 pr-4 text-right font-semibold">
                          {p.note} {p.price.toLocaleString("ru-RU")} ₽
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {m.popularRoutes.length > 0 && (
                <>
                  <h2 className="mb-3 text-xl font-semibold">Маршруты, где чаще работает {m.model}</h2>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {m.popularRoutes.map((r) => (
                      <Link
                        key={r}
                        href={`/airport/${r}`}
                        className="rounded-md border px-3 py-1.5 text-xs hover:border-emerald hover:text-emerald"
                      >
                        /{r}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BookingForm />
            </aside>
          </div>
        </section>

        {alternatives.length > 0 && (
          <section className="border-t bg-muted/30 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-4 text-xl font-semibold">Альтернативы в нашем парке</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {alternatives.map((alt) => (
                  alt ? (
                    <Link key={alt.slug} href={`/fleet/${alt.slug}`}>
                      <Card className="h-full p-4 transition-colors hover:border-emerald">
                        <div className="mb-1 text-xs uppercase text-muted-foreground">{alt.tier}</div>
                        <div className="font-semibold">{alt.fullName}</div>
                        <div className="text-sm text-muted-foreground">
                          {alt.seats} пасс. · {alt.luggageL} л
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
