"use client";

import { useState, useMemo } from "react";
import { allRoutes, calcPrice, calcReturnPrice, calcRoundTripTotal, formatPrice } from "@/lib/routes-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TelegramIcon } from "@/components/icons";
import {
  MapPinIcon,
  RulerIcon,
  ClockIcon,
  PhoneIcon,
  UsersIcon,
  CalendarIcon,
  ArrowRightIcon,
  PercentIcon,
} from "lucide-react";

export function PriceCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(7);

  // Extract unique city names sorted alphabetically
  const cities = useMemo(() => {
    const set = new Set<string>();
    allRoutes.forEach((r) => {
      set.add(r.from);
      set.add(r.to);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ru"));
  }, []);

  // Find matching route
  const route = useMemo(() => {
    if (!from || !to) return null;
    return allRoutes.find((r) => r.from === from && r.to === to) || null;
  }, [from, to]);

  // Filter "to" cities: show available destinations first, then others
  const toCities = useMemo(() => {
    if (!from) return { available: cities, unavailable: [] as string[] };
    const available = new Set<string>();
    allRoutes.forEach((r) => {
      if (r.from === from) available.add(r.to);
    });
    return {
      available: cities.filter(c => available.has(c) && c !== from),
      unavailable: cities.filter(c => !available.has(c) && c !== from),
    };
  }, [from, cities]);

  const bothSelected = from !== "" && to !== "" && from !== to;
  const price = route ? calcPrice(route.km) : null;
  const perPerson = price ? Math.ceil(price / passengers) : null;
  const returnPrice = route ? calcReturnPrice(route.km) : null;
  const roundTripTotal = route ? calcRoundTripTotal(route.km) : null;

  // Build Telegram booking link
  const telegramLink = useMemo(() => {
    if (!from || !to) return "https://t.me/zakazminivena";
    const parts = [`Заявка: ${from} → ${to}`];
    if (date) parts.push(date);
    parts.push(`${passengers} чел.`);
    if (price) parts.push(`Цена: ${formatPrice(price)} руб.`);
    const msg = parts.join(", ");
    return `https://t.me/zakazminivena?text=${encodeURIComponent(msg)}`;
  }, [from, to, date, passengers, price]);

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        {/* Row 1: From / To */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              <MapPinIcon className="mr-1 inline h-3 w-3" />
              Откуда
            </label>
            <Select value={from} onValueChange={(v) => { setFrom(v); if (v === to) setTo(""); }}>
              <SelectTrigger className="h-12 w-full bg-secondary text-base">
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              <MapPinIcon className="mr-1 inline h-3 w-3" />
              Куда
            </label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="h-12 w-full bg-secondary text-base">
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                {(from ? toCities.available : toCities.available).map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
                {from && toCities.unavailable.length > 0 && toCities.available.length > 0 && (
                  <SelectItem value="__separator__" disabled className="text-xs text-muted-foreground">
                    — Рассчитаем индивидуально —
                  </SelectItem>
                )}
                {from && toCities.unavailable.map((city) => (
                  <SelectItem key={city} value={city} className="text-muted-foreground">{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Date / Passengers */}
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              <CalendarIcon className="mr-1 inline h-3 w-3" />
              Дата поездки
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 bg-secondary text-base"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              <UsersIcon className="mr-1 inline h-3 w-3" />
              Пассажиры
            </label>
            <Select
              value={passengers.toString()}
              onValueChange={(v) => setPassengers(parseInt(v))}
            >
              <SelectTrigger className="h-12 w-full bg-secondary text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n} {n === 1 ? "пассажир" : n < 5 ? "пассажира" : "пассажиров"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {bothSelected && (
          <div className="mt-4 overflow-hidden rounded-xl transition-all duration-300 ease-out">
            {route ? (
              /* Route found — show price */
              <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-4 sm:p-6">
                {/* Route stats */}
                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <RulerIcon className="h-4 w-4 text-emerald" />
                    {route.km} км
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4 text-emerald" />
                    {route.hours}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UsersIcon className="h-4 w-4 text-emerald" />
                    {passengers} {passengers === 1 ? "пассажир" : passengers < 5 ? "пассажира" : "пассажиров"}
                  </span>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-4">
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {formatPrice(price!)} <span className="text-xl text-emerald">руб.</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      за весь минивэн
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="w-fit bg-emerald/10 text-emerald hover:bg-emerald/15"
                  >
                    {formatPrice(perPerson!)} руб/чел
                  </Badge>
                </div>

                {/* Return trip discount */}
                <div className="mt-4 rounded-lg border border-emerald/30 bg-emerald/10 p-3">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-emerald">
                    <PercentIcon className="h-3.5 w-3.5" />
                    Скидка 20% на обратный путь
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Обратно: <span className="font-semibold text-foreground">{formatPrice(returnPrice!)} руб.</span>{" "}
                    Туда-обратно: <span className="font-semibold text-foreground">{formatPrice(roundTripTotal!)} руб.</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 flex-1 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                    asChild
                  >
                    <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                      <TelegramIcon className="mr-2 h-5 w-5" />
                      Заказать в Telegram
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 flex-1 text-base font-semibold"
                    asChild
                  >
                    <a href="tel:+79185875454">
                      <PhoneIcon className="mr-2 h-4 w-4 text-emerald" />
                      +7 (918) 587-54-54
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              /* Route not found */
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-6">
                <p className="mb-1 text-lg font-semibold">
                  {from} → {to}
                </p>
                <p className="mb-4 text-muted-foreground">
                  Напишите нам — рассчитаем за 5 минут
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    size="lg"
                    className="h-12 flex-1 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                    asChild
                  >
                    <a href={telegramLink} target="_blank" rel="noopener noreferrer">
                      <TelegramIcon className="mr-2 h-5 w-5" />
                      Написать в Telegram
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 flex-1 text-base font-semibold"
                    asChild
                  >
                    <a href="tel:+79185875454">
                      <PhoneIcon className="mr-2 h-4 w-4 text-emerald" />
                      +7 (918) 587-54-54
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Phone link below */}
      {!bothSelected && (
        <p className="mt-3 text-sm text-muted-foreground">
          Или позвоните:{" "}
          <a
            href="tel:+79185875454"
            className="font-medium text-emerald transition-colors hover:text-emerald/80"
          >
            +7 (918) 587-54-54
          </a>
        </p>
      )}
    </div>
  );
}
