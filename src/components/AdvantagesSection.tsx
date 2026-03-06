import {
  ShieldCheckIcon,
  UsersIcon,
  BabyIcon,
  CalendarXIcon,
  UserCheckIcon,
  WalletIcon,
} from "lucide-react";

const advantages = [
  {
    icon: ShieldCheckIcon,
    title: "Фиксированная цена",
    description: "Стоимость известна до поездки и не меняется",
  },
  {
    icon: UsersIcon,
    title: "7 комфортных мест",
    description: "Просторный салон для семьи или компании",
  },
  {
    icon: BabyIcon,
    title: "Детское кресло",
    description: "Бесплатно предоставляем для маленьких пассажиров",
  },
  {
    icon: CalendarXIcon,
    title: "Отмена за 24 часа",
    description: "Бесплатная отмена или перенос поездки",
  },
  {
    icon: UserCheckIcon,
    title: "Встреча с табличкой",
    description: "Водитель встретит вас в аэропорту или на вокзале",
  },
  {
    icon: WalletIcon,
    title: "Без предоплаты",
    description: "Оплата водителю по факту поездки",
  },
];

export function AdvantagesSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Почему выбирают нас
          </h2>
          <p className="mt-3 text-muted-foreground">
            Всё включено в стоимость поездки
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv) => (
            <div
              key={adv.title}
              className="group rounded-2xl border border-border/50 bg-card/30 p-6 transition-all hover:border-emerald/30 hover:bg-card/60"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald transition-colors group-hover:bg-emerald/15">
                <adv.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{adv.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
