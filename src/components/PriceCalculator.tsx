"use client";

import { useState, useMemo, useCallback } from "react";
import { calcPrice, formatPrice } from "@/lib/routes-data";
import { submitLead } from "@/lib/lead";
import { dadataOsrmService } from "@/lib/dadata-osrm";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
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
  ArrowLeftRightIcon,
  CalculatorIcon,
  LoaderIcon,
} from "lucide-react";

interface CalcResult {
  km: number;
  minutes: number;
  price: number;
}

export function PriceCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(7);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const calculate = useCallback(async () => {
    setError(null);
    if (!from || !to) {
      setError("Укажите точку отправления и точку прибытия");
      return;
    }
    if (from === to) {
      setError("Точки отправления и прибытия совпадают");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const [fromCoords, toCoords] = await Promise.all([
        dadataOsrmService.getCoords(from),
        dadataOsrmService.getCoords(to),
      ]);
      if (!fromCoords || !toCoords) {
        setError("Не удалось определить координаты — уточните адрес");
        return;
      }
      const dist = await dadataOsrmService.getDistance(
        fromCoords.lat,
        fromCoords.lon,
        toCoords.lat,
        toCoords.lon,
      );
      if (!dist) {
        setError("Не удалось рассчитать маршрут — напишите менеджеру");
        return;
      }
      setResult({ km: dist.km, minutes: dist.minutes, price: calcPrice(dist.km) });
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  async function order() {
    if (!phone.trim()) return;
    setSubmitting(true);
    const ok = await submitLead({
      from,
      to,
      date,
      passengers,
      phone: phone.trim(),
      comment: result
        ? `Расчёт: ${result.km} км, ${durationText}, ${formatPrice(result.price)} ₽`
        : undefined,
    });
    setSubmitting(false);
    if (ok) setSent(true);
    else window.open(telegramLink, "_blank");
  }

  const price = result?.price ?? null;
  const perPerson = price ? Math.ceil(price / passengers) : null;
  const durationText = useMemo(() => {
    if (!result) return "";
    const h = Math.floor(result.minutes / 60);
    const m = result.minutes % 60;
    if (h === 0) return `${m} мин`;
    if (m === 0) return `${h} ч`;
    return `${h} ч ${m} мин`;
  }, [result]);

  const telegramLink = useMemo(() => {
    if (!from || !to) return "https://t.me/ZakazMinivena";
    const parts = [`Заявка: ${from} → ${to}`];
    if (date) parts.push(date);
    parts.push(`${passengers} чел.`);
    if (price) parts.push(`Цена: ${formatPrice(price)} ₽`);
    if (result) parts.push(`${result.km} км · ${durationText}`);
    return `https://t.me/ZakazMinivena?text=${encodeURIComponent(parts.join(", "))}`;
  }, [from, to, date, passengers, price, result, durationText]);

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              <MapPinIcon className="mr-1 inline h-3 w-3" />
              Откуда
            </label>
            <AddressAutocomplete
              value={from}
              onChange={(v) => {
                setFrom(v);
                setResult(null);
              }}
              placeholder="Город, адрес или аэропорт"
            />
          </div>
          <button
            type="button"
            onClick={handleSwap}
            disabled={!from && !to}
            className="hidden h-11 w-11 items-center justify-center rounded-lg border bg-secondary transition-colors hover:bg-emerald/10 disabled:cursor-not-allowed disabled:opacity-40 sm:flex"
            aria-label="Поменять местами"
            title="Поменять местами"
          >
            <ArrowLeftRightIcon className="h-4 w-4" />
          </button>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              <MapPinIcon className="mr-1 inline h-3 w-3" />
              Куда
            </label>
            <AddressAutocomplete
              value={to}
              onChange={(v) => {
                setTo(v);
                setResult(null);
              }}
              placeholder="Город, адрес или аэропорт"
            />
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              <CalendarIcon className="mr-1 inline h-3 w-3" />
              Дата поездки
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 bg-secondary"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              <UsersIcon className="mr-1 inline h-3 w-3" />
              Пассажиры
            </label>
            <Select
              value={passengers.toString()}
              onValueChange={(v) => setPassengers(parseInt(v))}
            >
              <SelectTrigger className="h-11 w-full bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n} {n === 1 ? "пассажир" : n < 5 ? "пассажира" : "пассажиров"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="button"
          size="lg"
          onClick={calculate}
          disabled={loading || !from || !to}
          className="mt-4 h-12 w-full bg-emerald text-base font-semibold text-emerald-foreground hover:bg-emerald/90"
        >
          {loading ? (
            <>
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              Рассчитываем…
            </>
          ) : (
            <>
              <CalculatorIcon className="mr-2 h-5 w-5" />
              Рассчитать стоимость
            </>
          )}
        </Button>

        {error && (
          <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 overflow-hidden rounded-xl border border-emerald/30 bg-emerald/5 p-4 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <RulerIcon className="h-4 w-4 text-emerald" />
                {result.km} км
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-4 w-4 text-emerald" />
                {durationText}
              </span>
              <span className="flex items-center gap-1.5">
                <UsersIcon className="h-4 w-4 text-emerald" />
                {passengers}{" "}
                {passengers === 1 ? "пассажир" : passengers < 5 ? "пассажира" : "пассажиров"}
              </span>
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-4">
              <div>
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {formatPrice(price!)} <span className="text-xl text-emerald">₽</span>
                </div>
                <div className="text-sm text-muted-foreground">за весь минивэн</div>
              </div>
              {perPerson && (
                <Badge variant="secondary" className="w-fit bg-emerald/10 text-emerald">
                  {formatPrice(perPerson)} ₽ / чел
                </Badge>
              )}
            </div>

            {sent ? (
              <div className="mt-5 rounded-xl border border-emerald/30 bg-emerald/10 p-4 text-center">
                <p className="text-base font-semibold text-emerald">Заявка принята ✅</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Перезвоним на {phone.trim()} за 5 минут и подтвердим цену.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ваш телефон"
                    className="h-12 flex-1 bg-secondary text-base"
                  />
                  <Button
                    size="lg"
                    disabled={submitting || !phone.trim()}
                    onClick={order}
                    className="h-12 flex-1 bg-emerald text-base font-semibold text-emerald-foreground hover:bg-emerald/90"
                  >
                    {submitting ? "Отправляем…" : "Заказать — перезвоним"}
                  </Button>
                </div>
                <div className="mt-2 flex items-center justify-center gap-4 text-sm">
                  <a href="tel:+79185875454" className="inline-flex items-center gap-1 font-medium text-emerald">
                    <PhoneIcon className="h-4 w-4" /> +7 (918) 587-54-54
                  </a>
                  <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#26A5E4]">
                    <TelegramIcon className="h-4 w-4" /> Telegram
                  </a>
                </div>
              </>
            )}

            <p className="mt-3 text-xs text-muted-foreground">
              Расчёт по реальным дорогам (OSRM). Цена ориентировочная — финальная подтверждается менеджером.
            </p>
          </div>
        )}
      </div>

      {!result && (
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
