"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "lucide-react";

interface AirportConsultationFormProps {
  /** Контекст для лида: куда/откуда. Подмешивается в сообщение. */
  context?: string;
}

export function AirportConsultationForm({ context = "" }: AirportConsultationFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setStatus("sending");
    const ok = await submitLead({
      name: name.trim() || "—",
      phone: phone.trim(),
      comment: `Запрос консультации${context ? ` (${context})` : ""}`,
    });
    setStatus(ok ? "ok" : "err");
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-7"
    >
      <h3 className="mb-1 text-xl font-bold text-slate-900 sm:text-2xl">
        Получить консультацию
      </h3>
      <p className="mb-5 text-sm text-slate-600">
        Перезвоним в течение 7 минут, ответим на вопросы и назовём цену
      </p>

      <div className="mb-3">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Имя</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как к вам обращаться"
          className="h-12 bg-slate-50"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Телефон</label>
        <Input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          className="h-12 bg-slate-50"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending" || status === "ok"}
        className="h-14 w-full bg-emerald text-lg font-semibold text-emerald-foreground hover:bg-emerald/90"
      >
        <PhoneIcon className="mr-2 h-5 w-5" />
        {status === "ok" ? "Заявка отправлена" : status === "sending" ? "Отправляем…" : "Получить консультацию"}
      </Button>

      {status === "ok" && (
        <p className="mt-3 text-center text-sm text-emerald">
          Спасибо! Перезвоним в течение 7 минут.
        </p>
      )}
      {status === "err" && (
        <p className="mt-3 text-center text-sm text-red-600">
          Не получилось отправить. Позвоните по номеру в шапке.
        </p>
      )}
    </form>
  );
}
