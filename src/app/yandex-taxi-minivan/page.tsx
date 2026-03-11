import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckIcon,
  XIcon,
  PhoneIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title:
    "Минивэн в Яндекс Такси — почему не всегда доступен и как заказать напрямую",
  description:
    "Почему минивэн в Яндекс Такси часто недоступен, особенно на межгород. Ограничения по местам, динамическое ценообразование. Альтернатива: минивэн 7 мест напрямую с фиксированной ценой.",
  openGraph: {
    title: "Минивэн в Яндекс Такси — почему не всегда доступен и как заказать напрямую",
    description: "Почему минивэн в Яндекс Такси часто недоступен, особенно на межгород. Ограничения по местам, динамическое ценообразование. Альтернатива: минивэн 7 мест напрямую с фиксированной ценой.",
    url: "https://zakazminivena.ru/yandex-taxi-minivan",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/yandex-taxi-minivan",
  },
};

export default function YandexTaxiMinivanPage() {
  const yandexLimitations = [
    "Минивэн доступен не во всех городах и не в любое время",
    "Обычно 4-6 мест, а не полноценные 7",
    "Динамическое ценообразование — наценка в часы пик до 3x",
    "Нет гарантии подачи минивэна — могут прислать седан",
    "Межгородние поездки часто невозможны через приложение",
    "Нет встречи с табличкой в аэропорту",
    "Детское кресло не гарантировано",
    "Нет фиксированной цены — итог может отличаться от оценки",
  ];

  const ourAdvantages = [
    "Гарантированно 7 полноценных мест",
    "Фиксированная цена без наценок и сюрпризов",
    "Детское автокресло бесплатно по запросу",
    "Встреча с табличкой в аэропорту",
    "Межгородние поездки — наша специализация",
    "Бесплатное ожидание 30 минут",
    "Кондиционер, USB-зарядка, вода в салоне",
    "Опытные водители, знающие маршрут",
  ];

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Главная", href: "/" },
              { label: "Минивэн vs Яндекс Такси" },
            ]} />

            <Badge className="mb-4 bg-amber-500/10 text-amber-600 hover:bg-amber-500/10">
              <AlertTriangleIcon className="mr-1 h-3 w-3" />
              Сравнение
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Минивэн в Яндекс Такси — ограничения и альтернатива
            </h1>

            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Многие ищут минивэн через Яндекс Такси — это логично, ведь
                приложение всегда под рукой. Но на практике заказать именно
                минивэн через Яндекс Такси получается далеко не всегда,
                особенно для межгородних поездок.
              </p>
              <p>
                Тариф «Минивэн» в Яндекс Такси доступен не во всех городах и не
                в любое время суток. Даже когда тариф есть, приложение часто
                предлагает машины на 4-6 мест, а не полноценные 7-местные
                минивэны. Для семьи с детьми или компании из 6-7 человек этого
                недостаточно.
              </p>
              <p>
                Главная проблема — динамическое ценообразование. В часы пик,
                праздники или при высоком спросе стоимость минивэна через Яндекс
                может вырасти в 2-3 раза. А для межгородних маршрутов цена и
                вовсе непредсказуема: приложение либо не предлагает такой
                вариант, либо выставляет завышенный счётчик.
              </p>
              <p>
                Наш сервис — это специализированный заказ минивэнов на 7 мест.
                Мы работаем с фиксированной ценой, которая не
                зависит от времени суток или загруженности. Вы точно знаете
                стоимость поездки ещё до посадки в автомобиль.
              </p>
            </div>

            {/* Comparison */}
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Yandex limitations */}
              <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-bold text-red-700">
                  Яндекс Такси — ограничения
                </h2>
                <ul className="space-y-3">
                  {yandexLimitations.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <span className="text-red-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our advantages */}
              <div className="rounded-2xl border border-emerald/20 bg-emerald/5 p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-bold text-emerald-700">
                  ЗаказМинивена.ru — преимущества
                </h2>
                <ul className="space-y-3">
                  {ourAdvantages.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Закажите минивэн напрямую — без посредников
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Фиксированная цена, 7 мест, детское кресло бесплатно. Напишите
                маршрут — ответим за 5 минут.
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
