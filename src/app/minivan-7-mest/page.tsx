import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, UsersIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title:
    "Минивэн на 7 человек с водителем — заказать от 60 руб/км | ЗаказМинивэна.ru",
  description:
    "Минивэн на 7 человек с водителем — максимальная вместимость, минимальная цена на человека. Всего 2571 руб/чел на 300 км. Детское кресло, вода, кондиционер включены. Заказать: +7 (918) 587-54-54.",
  alternates: {
    canonical: "https://zakazminivena.ru/minivan-7-mest",
  },
};

export default function Minivan7Page() {
  const includedItems = [
    "Детское автокресло бесплатно",
    "Бутылки воды в салоне",
    "Кондиционер / климат-контроль",
    "USB-зарядка для каждого пассажира",
    "Встреча с табличкой (аэропорт/вокзал)",
    "Бесплатное ожидание 30 минут",
    "Помощь с багажом",
    "Остановки по пути по вашему желанию",
  ];

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
              <span className="text-foreground">Минивэн на 7 человек</span>
            </nav>

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <UsersIcon className="mr-1 h-3 w-3" />
              7 пассажиров
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Минивэн на 7 человек с водителем
            </h1>

            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Семь пассажиров — это максимальная загрузка минивэна и самая
                выгодная цена на каждого. Когда группа из семи человек
                планирует межгородную поездку, минивэн становится
                единственным разумным вариантом: три обычных такси обойдутся
                в космическую сумму, а автобус избыточен для такой
                небольшой компании. Минивэн на 7 мест — точное попадание
                в потребность.
              </p>
              <p>
                Наши минивэны специально рассчитаны на 7 пассажирских мест.
                Это не переделанные легковые автомобили, а полноценные
                минивэны с заводской компоновкой салона: каждое сиденье
                имеет полноценный ремень безопасности, достаточное
                пространство для ног и подлокотник. Даже на последнем
                ряду сидеть удобно — это не откидные «табуретки», а
                полноценные кресла.
              </p>
              <p>
                Минивэн на семерых заказывают для самых разных поездок:
                большие семьи с детьми и бабушками-дедушками, компании
                друзей на отдых, спортивные команды на соревнования,
                корпоративные группы на выездные мероприятия. Если
                в группе есть дети — мы бесплатно устанавливаем детские
                автокресла нужного размера. Просто укажите возраст и вес
                ребёнка при бронировании.
              </p>

              <h2 className="text-2xl font-bold text-foreground">
                Стоимость поездки на 7 человек
              </h2>
              <p>
                При полной загрузке минивэна стоимость на человека —
                минимальная. Базовая ставка от 60 руб/км на весь автомобиль.
                На маршруте в 300 км это примерно 18 000 рублей. Разделите
                на семерых — и получите всего 2 571 рубль на человека.
                Это дешевле, чем билет на поезд или автобус, но при этом
                вы едете с комфортом, от двери до двери, без пересадок
                и ожиданий.
              </p>
              <p>
                Для сравнения: три такси на тот же маршрут в 300 км
                обойдутся минимум в 36 000 — 42 000 рублей, то есть
                по 5 000 — 6 000 на человека. Экономия при заказе
                минивэна для семи пассажиров — от 50 до 60 процентов
                по сравнению с несколькими такси. Это самый экономичный
                формат групповой поездки.
              </p>

              <h2 className="text-2xl font-bold text-foreground">
                Максимальная вместимость — максимальная выгода
              </h2>
              <p>
                Семь человек в минивэне — это полная загрузка, при которой
                стоимость на каждого пассажира достигает абсолютного
                минимума. Но при полной загрузке пассажирских мест
                учитывайте объём багажа: багажник минивэна вмещает
                5-6 стандартных чемоданов. Если у каждого из семи
                пассажиров большой чемодан, сообщите об этом при
                бронировании — мы подберём автомобиль с увеличенным
                багажным отделением или предложим багажник на крыше.
              </p>
              <p>
                На длинных маршрутах водитель делает регулярные остановки
                каждые 2-2,5 часа. В салоне работает климат-контроль
                с возможностью настройки температуры по зонам. У каждого
                сиденья — USB-зарядка для телефона. Мы предоставляем
                бутилированную воду для всех пассажиров. Кресла с
                хорошим расстоянием для ног позволяют комфортно
                перенести даже 6-7 часов в дороге.
              </p>
              <p>
                При заказе трансфера из аэропорта или вокзала водитель
                встретит всю группу с именной табличкой, поможет
                с чемоданами и проводит до минивэна. Бесплатное
                ожидание составляет 30 минут — достаточно, чтобы
                семь человек получили багаж и собрались вместе.
              </p>
            </div>

            {/* What's included */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">
                Что включено в поездку
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {includedItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <CheckIcon className="h-5 w-5 shrink-0 text-emerald" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular routes */}
            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold">
                Популярные маршруты для 7 пассажиров
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Минивэн на семерых — самый популярный формат заказа.
                Семьи, друзья, коллеги выбирают его для межгородних
                поездок, трансферов из аэропорта и поездок на отдых.
                Все маршруты с фиксированными ценами — на странице
                направлений.
              </p>
              <Button variant="outline" asChild>
                <Link href="/routes">Все маршруты с ценами</Link>
              </Button>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать минивэн на 7 человек
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Напишите маршрут, дату и количество багажа — рассчитаем
                стоимость за 5 минут
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-14 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                  asChild
                >
                  <a href="https://t.me/ZakazMinivena">
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
