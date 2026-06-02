"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalculatorIcon, TrendingDownIcon, UsersIcon, SendIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { submitLead } from "@/lib/lead";

const POPULAR_ROUTES = [
  { label: "Казань — Самара", km: 375 },
  { label: "Екатеринбург — Челябинск", km: 210 },
  { label: "Москва — Санкт-Петербург", km: 700 },
  { label: "Краснодар — Сочи", km: 320 },
  { label: "Москва — Нижний Новгород", km: 460 },
  { label: "Ростов — Краснодар", km: 275 },
  { label: "Москва — Ярославль", km: 265 },
  { label: "Симферополь — Ялта", km: 82 },
  { label: "Минеральные Воды — Кисловодск", km: 60 },
  { label: "Москва — Сочи", km: 1650 },
];

function calcPrice(km: number) {
  const total = Math.ceil((km * 60) / 500) * 500;
  const perPerson = Math.ceil(total / 7);
  const perKm = Math.round(total / km);
  const taxiPrice = Math.ceil((km * 70 * 2) / 500) * 500;
  const savings = taxiPrice - total;
  return { total, perPerson, perKm, taxiPrice, savings };
}

function formatPrice(n: number) {
  return n.toLocaleString("ru-RU");
}

export function CalculatorSection() {
  const [km, setKm] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function handleInputChange(value: string) {
    const num = parseInt(value, 10);
    setInputValue(value);
    setSelectedRoute("");
    if (!isNaN(num) && num > 0) {
      setKm(num);
    } else {
      setKm(null);
    }
  }

  function handleRouteSelect(value: string) {
    setSelectedRoute(value);
    const route = POPULAR_ROUTES.find((r) => r.label === value);
    if (route) {
      setKm(route.km);
      setInputValue(String(route.km));
    }
  }

  async function handleOrder() {
    if (!km || !phone.trim()) return;
    const { total } = calcPrice(km);
    const routeName = selectedRoute || `${km} км`;
    setSubmitting(true);
    const ok = await submitLead({
      from: selectedRoute || undefined,
      phone: phone.trim(),
      comment: `Расчёт: ${routeName}, ${km} км, ${formatPrice(total)} ₽`,
    });
    setSubmitting(false);
    if (ok) setSent(true);
    else
      window.open(
        `https://t.me/ZakazMinivena?text=${encodeURIComponent(
          `Заказ минивэна, ${routeName}, ${km} км, ${formatPrice(total)} руб., тел. ${phone.trim()}`,
        )}`,
        "_blank",
      );
  }

  const result = km && km > 0 ? calcPrice(km) : null;

  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald/3 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-4 py-1.5 text-sm font-medium text-emerald">
            <CalculatorIcon className="h-4 w-4" />
            Калькулятор стоимости
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Рассчитать стоимость поездки
          </h2>
          <p className="mt-3 text-muted-foreground">
            Введите расстояние маршрута — мы покажем точную цену
          </p>
        </div>

        {/* Calculator */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-3xl border border-emerald/20 bg-card p-6 shadow-sm sm:p-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Distance input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Расстояние (км)
                </label>
                <Input
                  type="number"
                  min={1}
                  placeholder="Расстояние в км"
                  className="h-12 bg-secondary text-base"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              </div>

              {/* Route select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Или выберите маршрут
                </label>
                <Select value={selectedRoute} onValueChange={handleRouteSelect}>
                  <SelectTrigger className="h-12 w-full bg-secondary text-base">
                    <SelectValue placeholder="Популярные маршруты" />
                  </SelectTrigger>
                  <SelectContent>
                    {POPULAR_ROUTES.map((route) => (
                      <SelectItem key={route.label} value={route.label}>
                        {route.label} ({route.km} км)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <Card className="border-emerald/20 bg-gradient-to-br from-emerald/5 to-transparent">
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      {/* Main price */}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Стоимость поездки
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-4xl font-bold tracking-tight text-emerald sm:text-5xl">
                            {formatPrice(result.total)}
                          </span>
                          <span className="text-lg text-muted-foreground">
                            руб. за минивэн
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <Badge className="bg-emerald/10 text-emerald border-emerald/20 hover:bg-emerald/10">
                            <UsersIcon className="mr-1 h-3 w-3" />
                            {formatPrice(result.perPerson)} руб./чел. (7 мест)
                          </Badge>
                          <Badge variant="secondary">
                            {formatPrice(result.perKm)} руб./км
                          </Badge>
                        </div>
                      </div>

                      {/* Savings */}
                      <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-4 text-center sm:min-w-[200px]">
                        <TrendingDownIcon className="mx-auto h-6 w-6 text-emerald" />
                        <p className="mt-1 text-2xl font-bold text-emerald">
                          -{formatPrice(result.savings)} руб.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          экономия vs 2 такси
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          (2 такси = {formatPrice(result.taxiPrice)} руб.)
                        </p>
                      </div>
                    </div>

                    {/* CTA — заявка в CRM */}
                    {sent ? (
                      <div className="mt-6 rounded-2xl border border-emerald/30 bg-emerald/5 p-4 text-center">
                        <p className="text-base font-semibold text-emerald">Заявка принята ✅</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Перезвоним на {phone.trim()} за 5 минут и подтвердим цену.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ваш телефон"
                          className="h-14 bg-secondary text-base sm:max-w-[240px]"
                        />
                        <Button
                          size="lg"
                          disabled={submitting || !phone.trim()}
                          className="h-14 bg-emerald text-base font-semibold text-emerald-foreground hover:bg-emerald/90"
                          onClick={handleOrder}
                        >
                          {submitting ? "Отправляем…" : `Заказать за ${formatPrice(result.total)} руб.`}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
