import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckIcon,
  UsersIcon,
  StarIcon,
  PhoneIcon,
  CalculatorIcon,
  BanknoteIcon,
  CreditCardIcon,
  SmartphoneIcon,
} from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Тарифы на минивэн с водителем | ЗаказМинивена.ru",
  description:
    "Тарифы на минивэн с водителем: Стандарт и Комфорт+. Фиксированная цена на 7 мест. Индивидуальный расчёт, детское кресло бесплатно, без предоплаты.",
  alternates: {
    canonical: "https://zakazminivena.ru/tariffs",
  },
};

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

export default function TariffsPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Главная
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Тарифы</span>
            </nav>

            <div className="mb-12 text-center sm:mb-16">
              <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
                <CalculatorIcon className="mr-1 h-3 w-3" />
                Тарифы
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Тарифы на минивэн с водителем
              </h1>
              <p className="mt-4 text-muted-foreground">
                Выберите уровень комфорта для вашей поездки
              </p>
            </div>

            {/* Tariff cards */}
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
                  <h2 className="text-2xl font-bold">{tariff.subtitle}</h2>
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

            {/* Price explanation */}
            <div className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
              <h2 className="mb-6 text-2xl font-bold">
                Как формируется цена
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Стоимость рассчитывается на весь минивэн (не на человека) и зависит от
                  расстояния маршрута. Цена округляется до 500 рублей.
                </p>
                <p>
                  Цена фиксируется при заказе и не меняется. Нет наценок за
                  ночное время, праздники или пробки. Нет доплат за детское
                  кресло, встречу с табличкой или ожидание в аэропорту.
                </p>
                <p>
                  При полной загрузке минивэна (7 человек) стоимость на одного
                  пассажира получается значительно ниже, чем при поездке на
                  обычном такси. Например, маршрут 300 км обойдётся примерно
                  в 18 500 рублей на весь минивэн — около 2 650 рублей на
                  человека.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-5 text-center">
                  <div className="text-2xl font-bold text-emerald">
                    Индивидуальный
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    расчёт цены
                  </div>
                </div>
                <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-5 text-center">
                  <div className="text-3xl font-bold text-emerald">7 мест</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    в одном минивэне
                  </div>
                </div>
                <div className="rounded-xl border border-emerald/20 bg-emerald/5 p-5 text-center">
                  <div className="text-3xl font-bold text-emerald">0 руб</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    за детское кресло
                  </div>
                </div>
              </div>
            </div>


            {/* Payment methods */}
            <div className="mt-16">
              <h2 className="mb-6 text-center text-2xl font-bold">
                Способы оплаты
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                    <BanknoteIcon className="h-6 w-6 text-emerald" />
                  </div>
                  <h3 className="mb-2 font-semibold">Наличные водителю</h3>
                  <p className="text-sm text-muted-foreground">
                    Оплата наличными водителю по завершении поездки
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                    <CreditCardIcon className="h-6 w-6 text-emerald" />
                  </div>
                  <h3 className="mb-2 font-semibold">Перевод на карту</h3>
                  <p className="text-sm text-muted-foreground">
                    СберБанк, Тинькофф — переводом перед или после поездки
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                    <SmartphoneIcon className="h-6 w-6 text-emerald" />
                  </div>
                  <h3 className="mb-2 font-semibold">СБП</h3>
                  <p className="text-sm text-muted-foreground">
                    Система быстрых платежей — мгновенный перевод по номеру телефона
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Узнать точную стоимость
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Напишите маршрут и дату — рассчитаем точную цену за 5 минут
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-14 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                  asChild
                >
                  <a href="https://t.me/zakazminivena">
                    <TelegramIcon className="mr-2 h-5 w-5" />
                    Написать в Telegram
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 text-base font-semibold"
                  asChild
                >
                  <a href="tel:+79185875454">
                    <PhoneIcon className="mr-2 h-5 w-5 text-emerald" />
                    +7 (918) 587-54-54
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
