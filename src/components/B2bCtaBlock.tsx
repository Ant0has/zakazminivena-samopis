"use client";

import Link from "next/link";
import { Building2, FileText, Clock, CreditCard } from "lucide-react";

interface B2bCtaBlockProps {
  routeName?: string;
  cityName?: string;
  airportName?: string;
}

export function B2bCtaBlock({ routeName, cityName, airportName }: B2bCtaBlockProps) {
  let title = "Нужен минивэн для бизнеса?";
  if (routeName) title = `Маршрут ${routeName} для вашей организации?`;
  else if (cityName) title = `Корпоративные трансферы из города ${cityName}`;
  else if (airportName) title = `Бизнес-трансфер из аэропорта ${airportName}`;

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-zinc-900 p-8 sm:p-12 text-white">
          <h3 className="text-2xl font-bold sm:text-3xl">{title}</h3>
          <p className="mt-3 text-zinc-400 max-w-2xl">
            Работаем по договору с юридическими лицами — закрывающие документы, фиксированная цена, постоплата для постоянных клиентов
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <FileText className="h-4 w-4 text-emerald-400" />
              Договор и акты
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <CreditCard className="h-4 w-4 text-emerald-400" />
              Фиксированная цена
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <Clock className="h-4 w-4 text-emerald-400" />
              Постоплата
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/b2b"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600"
            >
              <Building2 className="h-5 w-5" />
              Заказать для бизнеса
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
