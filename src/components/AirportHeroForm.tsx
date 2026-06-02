"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { TelegramIcon, MaxIcon } from "@/components/icons";
import {
  PlaneIcon,
  PlaneTakeoffIcon,
  CalculatorIcon,
  PhoneIcon,
  RulerIcon,
  ClockIcon,
  LoaderIcon,
} from "lucide-react";
import { dadataOsrmService } from "@/lib/dadata-osrm";
import { CUSTOM_POI } from "@/lib/custom-poi";
import { calcPrice, formatPrice } from "@/lib/routes-data";
import { submitLead } from "@/lib/lead";

interface AirportHeroFormProps {
  iata: string;
  airportShort: string;
  defaultDestination?: string;
}

interface CalcResult {
  km: number;
  minutes: number;
  price: number;
}

export function AirportHeroForm({ iata, airportShort, defaultDestination = "" }: AirportHeroFormProps) {
  const [direction, setDirection] = useState<"arrival" | "departure">("arrival");
  const [destination, setDestination] = useState(defaultDestination);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [flight, setFlight] = useState("");
  const [pax, setPax] = useState("5");
  const [calc, setCalc] = useState<CalcResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // Координаты выбранного аэропорта (из CUSTOM_POI по iata).
  const airportPoi = CUSTOM_POI.find(
    (p) => p.iata?.toLowerCase() === iata.toLowerCase(),
  );

  // Дебаунс-расчёт: при выборе адреса (из autocomplete) геокодируем и считаем
  // расстояние. Срабатывает только когда адрес валидный и айропорт известен.
  useEffect(() => {
    if (!airportPoi || destination.trim().length < 3) {
      setCalc(null);
      return;
    }
    const tid = setTimeout(async () => {
      setCalculating(true);
      try {
        const coords = await dadataOsrmService.getCoords(destination);
        if (!coords) {
          setCalc(null);
          return;
        }
        const dist = await dadataOsrmService.getDistance(
          airportPoi.lat,
          airportPoi.lon,
          coords.lat,
          coords.lon,
        );
        if (dist) {
          setCalc({ km: dist.km, minutes: dist.minutes, price: calcPrice(dist.km) });
        } else {
          setCalc(null);
        }
      } finally {
        setCalculating(false);
      }
    }, 500);
    return () => clearTimeout(tid);
  }, [destination, airportPoi]);

  function buildMessage(): string {
    const parts: string[] = [];
    parts.push(direction === "arrival" ? `Прилёт ${iata.toUpperCase()}` : `Вылет ${iata.toUpperCase()}`);
    if (direction === "arrival") {
      if (destination) parts.push(`в ${destination}`);
    } else if (destination) {
      parts.push(`из ${destination}`);
    }
    if (date) parts.push(date);
    if (time) parts.push(time);
    if (flight) parts.push(`рейс ${flight}`);
    parts.push(`${pax} чел.`);
    if (calc) parts.push(`${calc.km} км, ~${calc.minutes} мин, ${formatPrice(calc.price)} ₽`);
    return parts.join(", ");
  }

  function submit(channel: "wa" | "tg" | "max") {
    const msg = `Заявка с сайта: ${buildMessage()}`;
    const enc = encodeURIComponent(msg);
    let url = "";
    if (channel === "wa") url = `https://wa.me/79185875454?text=${enc}`;
    if (channel === "tg") url = `https://t.me/ZakazMinivena?text=${enc}`;
    if (channel === "max") url = `https://max.ru/zakazminivena`;
    window.open(url, "_blank");
  }

  // Заказ через сервер → лид в CRM (с маршрутом, ценой, рейсом)
  async function order() {
    if (!phone.trim()) return;
    setSubmitting(true);
    const airport = `${airportShort} (${iata.toUpperCase()})`;
    const ok = await submitLead({
      from: direction === "arrival" ? airport : destination || "—",
      to: direction === "arrival" ? destination || "—" : airport,
      date,
      time,
      passengers: pax,
      phone: phone.trim(),
      comment: buildMessage(),
    });
    setSubmitting(false);
    if (ok) setSent(true);
    else submit("tg"); // резерв
  }

  const labelCls = "mb-2 block text-sm font-semibold uppercase tracking-wide text-slate-600";
  const inputCls = "h-12 text-base bg-slate-50";

  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:p-7 lg:p-8">
      {/* Tabs */}
      <div className="mb-6 inline-flex w-full rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setDirection("arrival")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
            direction === "arrival"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <PlaneIcon className="h-5 w-5" />
          Прилетаю в {iata.toUpperCase()}
        </button>
        <button
          type="button"
          onClick={() => setDirection("departure")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
            direction === "departure"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <PlaneTakeoffIcon className="h-5 w-5" />
          Лечу из {iata.toUpperCase()}
        </button>
      </div>

      {/* Плашка-предупреждение при вылете */}
      {direction === "departure" && (
        <div className="mb-5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
          <strong className="font-semibold">Внимание:</strong> нужно быть в аэропорту за{" "}
          <strong className="font-semibold">2 часа до вылета</strong>. Учтём время в подаче.
        </div>
      )}

      {/* Куда едем / Откуда едем — с DaData подсказками */}
      <div className="mb-5">
        <label className={labelCls}>
          {direction === "arrival" ? "Куда едем" : "Откуда едем"}
        </label>
        <AddressAutocomplete
          value={destination}
          onChange={setDestination}
          placeholder={direction === "arrival" ? "Например, Тверская, 5" : "Адрес посадки"}
        />
      </div>

      {/* Карточка расчёта — показывается при успешном расчёте */}
      {(calculating || calc) && (
        <div className="mb-5 rounded-lg border border-emerald/30 bg-emerald/5 p-3">
          {calculating ? (
            <div className="flex items-center gap-2 text-sm text-emerald">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              Считаем стоимость…
            </div>
          ) : calc ? (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <RulerIcon className="h-4 w-4 text-emerald" />
                <strong className="font-semibold">{calc.km} км</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 text-slate-700">
                <ClockIcon className="h-4 w-4 text-emerald" />
                ~{calc.minutes} мин
              </span>
              <span className="ml-auto text-lg font-bold text-emerald">
                {formatPrice(calc.price)} ₽
              </span>
            </div>
          ) : null}
        </div>
      )}

      {/* Дата + время */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>
            {direction === "arrival" ? "Дата прилёта" : "Дата вылета"}
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Время</label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* № рейса — критичен для arrival, опционален для departure */}
      <div className="mb-5">
        <label className={labelCls}>
          № рейса {direction === "departure" ? "(опц.)" : ""}
        </label>
        <Input
          value={flight}
          onChange={(e) => setFlight(e.target.value)}
          placeholder="SU 1234"
          className={inputCls}
        />
      </div>

      {/* Пассажиры */}
      <div className="mb-6">
        <label className={labelCls}>Пассажиров</label>
        <Select value={pax} onValueChange={setPax}>
          <SelectTrigger className="h-12 w-full bg-slate-50 text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-2">1–2 пассажира</SelectItem>
            <SelectItem value="3-4">3–4 пассажира</SelectItem>
            <SelectItem value="5">5–6 пассажиров</SelectItem>
            <SelectItem value="7-8">7–8 пассажиров</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Заказ через сервер → лид в CRM */}
      {sent ? (
        <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-4 text-center">
          <p className="text-base font-semibold text-emerald">Заявка принята ✅</p>
          <p className="mt-1 text-sm text-slate-600">
            Перезвоним на {phone.trim()} за 5 минут и подтвердим цену.
          </p>
        </div>
      ) : (
        <>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ваш телефон — перезвоним за 5 минут"
            className={`${inputCls} mb-3`}
          />
          <Button
            type="button"
            size="lg"
            disabled={submitting || !phone.trim()}
            onClick={order}
            className="h-14 w-full bg-emerald text-lg font-semibold text-emerald-foreground hover:bg-emerald/90"
          >
            <CalculatorIcon className="mr-2 h-6 w-6" />
            {submitting
              ? "Отправляем…"
              : calc
                ? `Заказать за ${formatPrice(calc.price)} ₽ →`
                : "Оставить заявку →"}
          </Button>
          <p className="mt-3 text-center text-sm text-slate-500">
            {calc
              ? "Цена фиксированная — за машину, не за пассажира"
              : "Введите адрес — рассчитаем цену за 2 секунды"}
          </p>
        </>
      )}

      {/* Мессенджеры */}
      <div className="mt-auto pt-5">
        <div className="mb-2 text-center text-sm font-medium text-slate-500">Или напишите:</div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => submit("wa")}
            className="flex h-12 items-center justify-center rounded-lg bg-[#25D366] text-white transition-opacity hover:opacity-90"
            aria-label="WhatsApp"
          >
            <PhoneIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => submit("tg")}
            className="flex h-12 items-center justify-center rounded-lg bg-[#26A5E4] text-white transition-opacity hover:opacity-90"
            aria-label="Telegram"
          >
            <TelegramIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => submit("max")}
            className="flex h-12 items-center justify-center rounded-lg bg-[#0077FF] text-white transition-opacity hover:opacity-90"
            aria-label="MAX"
          >
            <MaxIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
