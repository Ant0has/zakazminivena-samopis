"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TelegramIcon } from "@/components/icons";
import {
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  MapPinIcon,
} from "lucide-react";

interface BookingFormProps {
  defaultFrom?: string;
  defaultTo?: string;
}

export function BookingForm({ defaultFrom = "", defaultTo = "" }: BookingFormProps) {
  const [from] = useState(defaultFrom);
  const [to] = useState(defaultTo);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("7");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "Укажите имя";
    if (!phone.trim()) newErrors.phone = "Укажите телефон";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    const ok = await submitLead({
      from,
      to,
      date,
      time,
      passengers,
      name: name.trim(),
      phone: phone.trim(),
    });
    setSubmitting(false);

    if (ok) {
      setSent(true);
    } else {
      // Резерв: если сервер недоступен — открываем Telegram, чтобы заявка не потерялась
      const msg = [
        `Заявка: ${from} → ${to}`,
        date || "дата не указана",
        time || "время не указано",
        `${passengers} чел.`,
        name.trim(),
        phone.trim(),
      ].join(", ");
      window.open(`https://t.me/ZakazMinivena?text=${encodeURIComponent(msg)}`, "_blank");
    }
  }

  if (sent) {
    return (
      <Card className="border-emerald/20 p-6 shadow-sm sm:p-8">
        <h3 className="mb-2 text-xl font-bold tracking-tight sm:text-2xl">Заявка принята ✅</h3>
        <p className="text-sm text-muted-foreground">
          Спасибо, {name.trim()}! Менеджер перезвонит на {phone.trim()} в течение 5 минут и
          подтвердит детали поездки.
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-emerald/20 p-6 shadow-sm sm:p-8">
      <h3 className="mb-1 text-xl font-bold tracking-tight sm:text-2xl">
        Оставить заявку
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        {from && to
          ? `Маршрут: ${from} → ${to}`
          : "Заполните форму — мы свяжемся за 5 минут"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Route display */}
        {from && to && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald/5 p-3 text-sm">
            <MapPinIcon className="h-4 w-4 text-emerald" />
            <span className="font-medium">
              {from} → {to}
            </span>
          </div>
        )}

        {/* Date & Time */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label className="mb-1.5 flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3" />
              Дата
            </Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 bg-secondary"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <Label className="mb-1.5 flex items-center gap-1 text-xs text-muted-foreground">
              <ClockIcon className="h-3 w-3" />
              Время
            </Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-11 bg-secondary"
            />
          </div>
        </div>

        {/* Passengers */}
        <div>
          <Label className="mb-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <UsersIcon className="h-3 w-3" />
            Пассажиры
          </Label>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger className="h-11 w-full bg-secondary">
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

        {/* Name */}
        <div>
          <Label className="mb-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <UserIcon className="h-3 w-3" />
            Ваше имя *
          </Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
            placeholder="Иван"
            className={`h-11 bg-secondary ${errors.name ? "border-destructive" : ""}`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label className="mb-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <PhoneIcon className="h-3 w-3" />
            Телефон *
          </Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: undefined })); }}
            placeholder="+7 (___) ___-__-__"
            className={`h-11 bg-secondary ${errors.phone ? "border-destructive" : ""}`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-12 w-full bg-emerald text-base font-semibold text-white hover:bg-emerald/90"
        >
          {submitting ? "Отправляем…" : "Оставить заявку"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Перезвоним за 5 минут. Или напишите в{" "}
          <a
            href="https://t.me/ZakazMinivena"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#26A5E4] underline"
          >
            <TelegramIcon className="h-3.5 w-3.5" /> Telegram
          </a>
        </p>
      </form>
    </Card>
  );
}
