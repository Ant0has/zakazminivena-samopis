"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TelegramIcon, MaxIcon } from "@/components/icons";
import {
  PlaneIcon,
  PlaneTakeoffIcon,
  CalculatorIcon,
  PhoneIcon,
} from "lucide-react";

interface AirportHeroFormProps {
  iata: string;
  /** Полное название аэропорта, для подстановки в заголовки таба. */
  airportShort: string;
  /** Поле «Куда едем» / «Откуда летите» — предзаполнение. */
  defaultDestination?: string;
}

export function AirportHeroForm({ iata, airportShort, defaultDestination = "" }: AirportHeroFormProps) {
  const [direction, setDirection] = useState<"arrival" | "departure">("arrival");
  const [destination, setDestination] = useState(defaultDestination);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [flight, setFlight] = useState("");
  const [pax, setPax] = useState("5");

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
    return parts.join(", ");
  }

  function submit(channel: "wa" | "tg" | "max") {
    const msg = `Заявка с сайта: ${buildMessage()}`;
    const enc = encodeURIComponent(msg);
    let url = "";
    if (channel === "wa") url = `https://wa.me/79185875454?text=${enc}`;
    if (channel === "tg") url = `https://t.me/zakazminivena?text=${enc}`;
    if (channel === "max") url = `https://max.ru/zakazminivena`;
    window.open(url, "_blank");
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-6">
      {/* Tabs */}
      <div className="mb-5 inline-flex w-full rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setDirection("arrival")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            direction === "arrival"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <PlaneIcon className="h-4 w-4" />
          Прилетаю в {iata.toUpperCase()}
        </button>
        <button
          type="button"
          onClick={() => setDirection("departure")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            direction === "departure"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <PlaneTakeoffIcon className="h-4 w-4" />
          Лечу из {iata.toUpperCase()}
        </button>
      </div>

      {/* Куда едем / Откуда едем */}
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          {direction === "arrival" ? "Куда едем" : "Откуда едем"}
        </label>
        <Input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder={direction === "arrival" ? "Центр Москвы" : "Адрес посадки"}
          className="h-11 bg-slate-50"
        />
      </div>

      {/* Дата + время */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            {direction === "arrival" ? "Дата прилёта" : "Дата вылета"}
          </label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="h-11 bg-slate-50"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Время
          </label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="h-11 bg-slate-50"
          />
        </div>
      </div>

      {/* № рейса */}
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          № рейса (опц.)
        </label>
        <Input
          value={flight}
          onChange={(e) => setFlight(e.target.value)}
          placeholder="SU 1234"
          className="h-11 bg-slate-50"
        />
      </div>

      {/* Пассажиры */}
      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Пассажиров
        </label>
        <Select value={pax} onValueChange={setPax}>
          <SelectTrigger className="h-11 w-full bg-slate-50">
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

      {/* CTA */}
      <Button
        type="button"
        size="lg"
        onClick={() => submit("tg")}
        className="h-12 w-full bg-emerald text-base font-semibold text-emerald-foreground hover:bg-emerald/90"
      >
        <CalculatorIcon className="mr-2 h-5 w-5" />
        Рассчитать стоимость →
      </Button>
      <p className="mt-2 text-center text-xs text-slate-500">
        Ответ за 5 минут. Без предоплаты — оплата по факту
      </p>

      {/* Мессенджеры */}
      <div className="mt-4">
        <div className="mb-2 text-center text-xs font-medium text-slate-500">Или напишите:</div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => submit("wa")}
            className="flex h-11 items-center justify-center rounded-lg bg-[#25D366] text-white transition-opacity hover:opacity-90"
            aria-label="WhatsApp"
          >
            <PhoneIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => submit("tg")}
            className="flex h-11 items-center justify-center rounded-lg bg-[#26A5E4] text-white transition-opacity hover:opacity-90"
            aria-label="Telegram"
          >
            <TelegramIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => submit("max")}
            className="flex h-11 items-center justify-center rounded-lg bg-[#0077FF] text-white transition-opacity hover:opacity-90"
            aria-label="MAX"
          >
            <MaxIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
