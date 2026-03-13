import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { b2bCases } from "@/lib/b2b-cases-data";
import { TelegramIcon } from "@/components/icons";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Кейсы B2B-клиентов | ЗаказМинивена.ru",
  description:
    "Реальные кейсы корпоративных клиентов: IT-компании, строительство, фармацевтика, event-индустрия. Узнайте, как минивэн решает бизнес-задачи.",
  openGraph: {
    title: "Кейсы B2B-клиентов | ЗаказМинивена.ru",
    description:
      "Реальные кейсы корпоративных клиентов: IT-компании, строительство, фармацевтика, event-индустрия. Узнайте, как минивэн решает бизнес-задачи.",
    url: "https://zakazminivena.ru/b2b/cases",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/b2b/cases",
  },
};

export default function B2bCasesPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="b2b-dark bg-[var(--background)] text-[var(--foreground)] min-h-screen">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Кейсы наших B2B-клиентов",
              "description": "Реальные кейсы корпоративных клиентов: IT-компании, строительство, фармацевтика, event-индустрия.",
              "url": "https://zakazminivena.ru/b2b/cases",
              "isPartOf": {
                "@type": "WebSite",
                "name": "ЗаказМинивена.ru",
                "url": "https://zakazminivena.ru"
              }
            }) }}
          />
          {/* Hero */}
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Breadcrumbs
                items={[
                  { label: "Главная", href: "/" },
                  { label: "Для бизнеса", href: "/b2b" },
                  { label: "Кейсы клиентов" },
                ]}
              />

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Кейсы наших B2B-клиентов
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Реальные примеры того, как минивэн решает бизнес-задачи в разных
                отраслях
              </p>
            </div>
          </section>

          {/* Cases Grid */}
          <section className="pb-16 sm:pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {b2bCases.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/b2b/cases/${c.slug}`}
                    className="group overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 transition-colors hover:border-emerald/40"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-block rounded-full bg-emerald/20 px-3 py-1 text-xs font-medium text-emerald">
                          {c.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-sm font-medium text-muted-foreground">
                        {c.company}
                      </div>
                      <h2 className="mt-1 text-lg font-semibold leading-snug">
                        {c.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {c.challenge}
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {c.stats.map((s, i) => (
                          <div key={i} className="text-center">
                            <div className="text-lg font-bold text-emerald">
                              {s.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald">
                        Читать кейс
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-zinc-700/50 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Хотите стать следующим успешным кейсом?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                Расскажите о вашей задаче — мы подготовим индивидуальное решение
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="h-14 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                  asChild
                >
                  <a href="https://t.me/zakazminivena">
                    <TelegramIcon className="mr-2 h-5 w-5" />
                    Обсудить в Telegram
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
