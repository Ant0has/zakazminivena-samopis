"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheckIcon,
  UsersIcon,
  BabyIcon,
  PercentIcon,
} from "lucide-react";
import { PriceCalculator } from "@/components/PriceCalculator";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="flex flex-col items-center text-center">
          {/* Tags */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="outline"
              className="border-emerald/30 bg-emerald/5 text-emerald"
            >
              <ShieldCheckIcon className="mr-1 h-3 w-3" />
              Фиксированная цена
            </Badge>
            <Badge
              variant="outline"
              className="border-emerald/30 bg-emerald/5 text-emerald"
            >
              <UsersIcon className="mr-1 h-3 w-3" />7 мест
            </Badge>
            <Badge
              variant="outline"
              className="border-emerald/30 bg-emerald/5 text-emerald"
            >
              <BabyIcon className="mr-1 h-3 w-3" />
              Детское кресло бесплатно
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            >
              <PercentIcon className="mr-1 h-3 w-3" />
              −20% на обратный путь
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            Заказать минивэн с водителем
            <br />
            <span className="text-gradient">межгород и аэропорт</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Комфортные поездки для семьи и компании до 7 человек по России.
            Фиксированная цена, детское кресло, встреча с табличкой, без предоплаты.
          </p>

          {/* Price Calculator */}
          <div className="mt-10 w-full flex justify-center">
            <PriceCalculator />
          </div>

          {/* Hero image */}
          <div className="mt-12 w-full max-w-4xl overflow-hidden rounded-2xl">
            <Image src="/images/services/hero.webp" alt="Минивэн с водителем для семейных поездок" width={1024} height={576} className="w-full h-auto object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
