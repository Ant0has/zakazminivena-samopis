import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  PhoneIcon,
  StarIcon,
  ShieldCheckIcon,
  MapPinIcon,
  HeartPulseIcon,
  RouteIcon,
  UsersIcon,
  ClockIcon,
  CarIcon,
} from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { ReviewsSection } from "@/components/ReviewsSection";
import { drivers } from "@/lib/drivers-data";

export const metadata: Metadata = {
  title: "Наши водители | ЗаказМинивена.ru",
  description:
    "Профессиональные водители минивэнов с опытом от 6 лет. Средний рейтинг 4.9, более 20 000 выполненных поездок.",
  openGraph: {
    title: "Наши водители | ЗаказМинивена.ru",
    description:
      "Профессиональные водители минивэнов с опытом от 6 лет. Средний рейтинг 4.9, более 20 000 выполненных поездок.",
    url: "https://zakazminivena.ru/drivers",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/drivers",
  },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("");
}

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "bg-blue-600",
    "bg-emerald-600",
    "bg-violet-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-cyan-600",
    "bg-indigo-600",
    "bg-teal-600",
  ];
  return colors[Math.abs(hash) % colors.length];
}

function pluralYears(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return `${n} год`;
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
    return `${n} года`;
  return `${n} лет`;
}

export default function DriversPage() {
  const totalDrivers = drivers.length;
  const avgRating = (
    drivers.reduce((s, d) => s + d.rating, 0) / totalDrivers
  ).toFixed(1);
  const totalTrips = drivers.reduce((s, d) => s + d.trips, 0);
  const avgExperience = Math.round(
    drivers.reduce((s, d) => s + d.experience, 0) / totalDrivers
  );

  const driversJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ЗаказМинивена.ru",
    url: "https://zakazminivena.ru",
    employee: drivers.map((d) => ({
      "@type": "Person",
      name: d.name,
      jobTitle: "Водитель минивэна",
      description: d.bio,
      workLocation: {
        "@type": "Place",
        name: d.regions.join(", "),
      },
    })),
  };

  const advantages = [
    {
      icon: ClockIcon,
      title: "Стаж от 6 лет",
      text: "Все наши водители имеют многолетний опыт межгородних перевозок",
    },
    {
      icon: RouteIcon,
      title: "Знание маршрутов и дорог",
      text: "Водители отлично знают свои регионы, объезды и особенности трасс",
    },
    {
      icon: ShieldCheckIcon,
      title: "Деловой этикет и вежливость",
      text: "Опрятный внешний вид, помощь с багажом, тактичное общение",
    },
    {
      icon: HeartPulseIcon,
      title: "Регулярные медосмотры и ТО",
      text: "Все водители проходят медосмотры, автомобили — регулярное техобслуживание",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(driversJsonLd) }}
      />
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Наши водители" },
              ]}
            />

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              Команда
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Наши водители
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Профессиональные водители с опытом межгородних перевозок на
              комфортных минивэнах
            </p>

            {/* Stats bar */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  icon: UsersIcon,
                  value: totalDrivers.toString(),
                  label: "водителей в команде",
                },
                {
                  icon: StarIcon,
                  value: avgRating,
                  label: "средний рейтинг",
                },
                {
                  icon: MapPinIcon,
                  value: totalTrips.toLocaleString("ru-RU") + "+",
                  label: "поездок выполнено",
                },
                {
                  icon: ClockIcon,
                  value: pluralYears(avgExperience),
                  label: "средний стаж",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center"
                >
                  <stat.icon className="h-6 w-6 text-emerald" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Driver cards */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
              {drivers.map((driver) => (
                <Card key={driver.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Initials avatar */}
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ${getColorFromName(driver.name)}`}
                      >
                        {getInitials(driver.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold">{driver.name}</h2>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-emerald/30 text-emerald"
                          >
                            {pluralYears(driver.experience)} за рулём
                          </Badge>
                          <div className="flex items-center gap-1">
                            <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-semibold">
                              {driver.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Car */}
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <CarIcon className="h-4 w-4 text-emerald" />
                      <span>{driver.car}</span>
                      <span className="mx-1">·</span>
                      <span>{driver.trips.toLocaleString("ru-RU")}+ поездок</span>
                    </div>

                    {/* Regions */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {driver.regions.map((r) => (
                        <Badge
                          key={r}
                          variant="secondary"
                          className="text-xs"
                        >
                          {r}
                        </Badge>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {driver.bio}
                    </p>

                    {/* Specializations */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {driver.specializations.map((s) => (
                        <Badge
                          key={s}
                          className="bg-emerald/10 text-emerald hover:bg-emerald/10 text-xs"
                        >
                          {s}
                        </Badge>
                      ))}
                      {driver.languages.length > 1 && (
                        <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/10 text-xs">
                          {driver.languages.join(", ")}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Why our drivers are the best */}
            <div className="mt-20">
              <h2 className="text-center text-2xl font-bold sm:text-3xl">
                Почему наши водители лучшие
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {advantages.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-xl border border-border bg-card p-6 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                      <a.icon className="h-6 w-6 text-emerald" />
                    </div>
                    <h3 className="mt-4 font-semibold">{a.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {a.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <ReviewsSection tags={["intercity"]} />

            {/* CTA */}
            <div className="mt-16 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать минивэн с водителем
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Напишите маршрут и дату — подберём лучшего водителя и назовём
                точную цену за 5 минут
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
