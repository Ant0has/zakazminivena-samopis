"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  UsersIcon,
  BabyIcon,
} from "lucide-react";

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
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            Заказать минивэн с водителем
            <br />
            <span className="text-gradient">межгород и аэропорт</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Комфортные поездки для семьи и компании до 7 человек по России.
            Фиксированная цена от 60 руб/км, детское кресло, встреча с табличкой, без предоплаты.
          </p>

          {/* Search form */}
          <div className="mt-10 w-full max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Input
                    placeholder="Откуда"
                    className="h-12 border-0 bg-secondary pl-4 text-base placeholder:text-muted-foreground/60"
                  />
                </div>
                <div className="relative flex-1">
                  <Input
                    placeholder="Куда"
                    className="h-12 border-0 bg-secondary pl-4 text-base placeholder:text-muted-foreground/60"
                  />
                </div>
                <Button className="h-12 bg-emerald px-6 text-base font-semibold text-emerald-foreground hover:bg-emerald/90 sm:px-8">
                  Рассчитать
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Или позвоните:{" "}
              <a
                href="tel:+79185875454"
                className="font-medium text-emerald transition-colors hover:text-emerald/80"
              >
                +7 (918) 587-54-54
              </a>
            </p>
          </div>
          {/* Hero image */}
          <div className="mt-12 w-full max-w-4xl overflow-hidden rounded-2xl">
            <Image src="/images/services/hero.png" alt="Минивэн с водителем для семейных поездок" width={1024} height={576} className="w-full h-auto object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
