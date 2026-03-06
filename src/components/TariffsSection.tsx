import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, UsersIcon, StarIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";

const tariffs = [
  {
    name: "Минивэн",
    subtitle: "Стандарт",
    seats: "7 мест",
    description: "Комфортный минивэн для семьи или группы",
    features: [
      "Кондиционер",
      "Большой багажник",
      "Детское кресло бесплатно",
      "Бутылки воды",
      "USB-зарядка",
      "Встреча с табличкой",
    ],
    popular: false,
  },
  {
    name: "Минивэн",
    subtitle: "Комфорт+",
    seats: "7 мест VIP",
    description: "Премиум минивэн для особых поездок",
    features: [
      "Всё из Стандарта",
      "Кожаный салон",
      "Климат-контроль по зонам",
      "Wi-Fi в салоне",
      "Напитки и снеки",
      "Приоритетная подача",
    ],
    popular: true,
  },
];

export function TariffsSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Тарифы
          </h2>
          <p className="mt-3 text-muted-foreground">
            Выберите уровень комфорта для вашей поездки
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {tariffs.map((tariff) => (
            <div
              key={tariff.subtitle}
              className={`relative rounded-2xl border p-6 shadow-sm sm:p-8 ${
                tariff.popular
                  ? "border-emerald/40 bg-emerald/5"
                  : "border-border bg-card"
              }`}
            >
              {tariff.popular && (
                <Badge className="absolute -top-3 left-6 bg-emerald text-emerald-foreground">
                  <StarIcon className="mr-1 h-3 w-3" />
                  Популярный
                </Badge>
              )}
              <div className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {tariff.name}
              </div>
              <h3 className="text-2xl font-bold">{tariff.subtitle}</h3>
              <div className="mt-2 flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-emerald" />
                <span className="text-sm text-muted-foreground">
                  {tariff.seats}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {tariff.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {tariff.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckIcon className="h-4 w-4 shrink-0 text-emerald" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full ${
                  tariff.popular
                    ? "bg-emerald text-emerald-foreground hover:bg-emerald/90"
                    : ""
                }`}
                variant={tariff.popular ? "default" : "outline"}
                size="lg"
                asChild
              >
                <a href="https://t.me/zakazminivena">
                  <TelegramIcon className="mr-2 h-4 w-4" />
                  Заказать
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
