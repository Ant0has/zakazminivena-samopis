// Сетка 4 фишек под Hero airport-страниц (по скрину прототипа):
// Встреча с табличкой / Ожидание 60 мин / Контакт за 30 мин / Дет.кресла.

import { ClipboardCheckIcon, RadarIcon, CarFrontIcon, BabyIcon } from "lucide-react";

interface AirportFeaturesGridProps {
  airportShort: string;
}

export function AirportFeaturesGrid({ airportShort }: AirportFeaturesGridProps) {
  const items = [
    {
      icon: ClipboardCheckIcon,
      title: "Встреча с табличкой",
      desc: "По запросу — табличка с именем у выхода",
    },
    {
      icon: RadarIcon,
      title: "Отслеживание рейса",
      desc: "Следим за статусом, подача под фактическое время",
    },
    {
      icon: CarFrontIcon,
      title: "Назначение авто",
      desc: "За день до поездки сообщим водителя и номер",
    },
    {
      icon: BabyIcon,
      title: "Дет.кресла",
      desc: "Бесплатно по запросу",
    },
  ];

  return (
    <div className="grid h-full auto-rows-fr grid-cols-2 gap-3 sm:gap-4">
      {items.map((it) => (
        <div
          key={it.title}
          className="flex flex-col rounded-xl bg-white/10 p-4 backdrop-blur ring-1 ring-white/20"
        >
          <it.icon className="mb-2 h-6 w-6 text-white" />
          <div className="text-base font-semibold text-white">{it.title}</div>
          <div className="mt-1 text-sm leading-5 text-white/80">{it.desc}</div>
        </div>
      ))}
    </div>
  );
}
