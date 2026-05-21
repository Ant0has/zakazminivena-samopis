// Сетка 4 фишек под Hero airport-страниц (по скрину прототипа):
// Встреча с табличкой / Ожидание 60 мин / Контакт за 30 мин / Дет.кресла.

import { ClipboardCheckIcon, ClockIcon, PhoneIcon, BabyIcon } from "lucide-react";

interface AirportFeaturesGridProps {
  airportShort: string;
}

export function AirportFeaturesGrid({ airportShort }: AirportFeaturesGridProps) {
  const items = [
    {
      icon: ClipboardCheckIcon,
      title: "Встреча с табличкой",
      desc: `Водитель ждёт у выхода с вашим именем`,
    },
    {
      icon: ClockIcon,
      title: "Ожидание 60 мин",
      desc: "Бесплатно при задержке рейса",
    },
    {
      icon: PhoneIcon,
      title: "Контакт за 30 мин",
      desc: "Водитель свяжется до прилёта",
    },
    {
      icon: BabyIcon,
      title: "Дет.кресла",
      desc: "Бесплатно по запросу",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {items.map((it) => (
        <div
          key={it.title}
          className="rounded-xl bg-white/10 p-4 backdrop-blur ring-1 ring-white/20"
        >
          <it.icon className="mb-2 h-5 w-5 text-white" />
          <div className="text-sm font-semibold text-white">{it.title}</div>
          <div className="mt-1 text-xs leading-5 text-white/80">{it.desc}</div>
        </div>
      ))}
    </div>
  );
}
