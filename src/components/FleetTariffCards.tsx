"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Briefcase } from "lucide-react";
import { VehiclePlaceholder } from "@/components/VehiclePlaceholder";
import { tariffClasses, type TariffClass } from "@/lib/tariff-classes";
import { formatPrice } from "@/lib/routes-data";

// Карточки классов минивэна с табами багажных сценариев.

interface FleetTariffCardsProps {
  title?: string;
  subtitle?: string;
  classes?: TariffClass[];
  ctaHref?: string;
  contextLabel?: string;
  bg?: "default" | "muted";
}

export function FleetTariffCards({
  title = "Какой минивэн подаём",
  subtitle = "Выберите класс — цена за машину, не за пассажира",
  classes = tariffClasses,
  ctaHref = "#booking",
  contextLabel,
  bg = "muted",
}: FleetTariffCardsProps) {
  return (
    <section className={`py-16 sm:py-20 ${bg === "muted" ? "bg-muted/40 border-y" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          {contextLabel && (
            <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald">
              {contextLabel}
            </div>
          )}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((c) => (
            <TariffCard key={c.slug} data={c} ctaHref={ctaHref} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald/30 bg-emerald/5 px-5 py-3 text-sm font-medium text-emerald transition-colors hover:bg-emerald/10"
          >
            Запросить другой класс или маршрут →
          </Link>
        </div>
      </div>
    </section>
  );
}

function TariffCard({ data, ctaHref }: { data: TariffClass; ctaHref: string }) {
  const [tab, setTab] = useState(0);
  const opts = data.luggageOptions ?? [];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-[oklch(0.20_0.04_245)] p-5 text-white shadow-xl ring-1 ring-white/5 transition-transform hover:-translate-y-1 sm:p-6">
      {/* Заголовок класса */}
      <div className="text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-white">
          {data.classLabel}
        </div>
        <div className="mt-2 min-h-10 text-sm text-white/70">
          {data.modelExamples.join(" · ")}
        </div>
      </div>

      {/* Иконки пассажиров / багажа */}
      <div className="mt-4 flex items-center justify-center gap-5 text-sm text-white/85">
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          <span className="font-semibold">{data.seats}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="h-4 w-4" />
          <span className="font-semibold">{data.luggage}</span>
        </span>
      </div>

      {/* Фото */}
      <div className="my-5">
        <VehiclePlaceholder
          src={data.image}
          modelName={data.modelExamples[0]}
          variant="card"
          className="aspect-[16/9]"
        />
      </div>

      {/* Объём багажника */}
      {data.trunkNote && (
        <p className="mb-3 text-xs leading-5 text-white/70">{data.trunkNote}</p>
      )}

      {/* Вместимость багажника + табы сценариев */}
      {opts.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/70">
            Вместимость багажника:
          </div>
          <div className="mb-2 flex flex-wrap gap-1">
            {opts.map((o, i) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setTab(i)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  tab === i
                    ? "bg-emerald text-emerald-foreground"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className="min-h-12 text-xs leading-5 text-white/85">{opts[tab].description}</p>
        </div>
      )}

      {/* Цена */}
      <div className="mt-auto text-center">
        {data.requestOnly ? (
          <>
            <div className="text-2xl font-extrabold tracking-tight">По запросу</div>
            <div className="mt-1 text-xs text-white/55">подбор под группу</div>
          </>
        ) : (
          <>
            <div className="text-3xl font-extrabold tracking-tight">
              от {formatPrice(data.priceFrom)} ₽
            </div>
            <div className="mt-1 text-xs text-white/55">за машину</div>
          </>
        )}
      </div>

      {/* CTA */}
      <Link
        href={ctaHref}
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-amber-400 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 transition-colors hover:bg-amber-300"
      >
        {data.requestOnly ? "Запросить расчёт" : "Заказать"}
      </Link>
    </article>
  );
}
