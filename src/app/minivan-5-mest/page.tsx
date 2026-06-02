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
    "Минивэн на 5 человек с водителем — заказать от 60 руб/км | ЗаказМинивэна.ru",
  description:
    "Заказать минивэн на 5 человек с водителем для межгородней поездки. Все пассажиры в одном автомобиле, дешевле 2 такси. Детское кресло, вода, кондиционер бесплатно. Цена от 60 руб/км на весь минивэн.",
  alternates: {
    canonical: "https://zakazminivena.ru/minivan-5-mest",
  },
};

export default function Minivan5Page() {
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
              <span className="text-foreground">Минивэн на 5 человек</span>
            </nav>

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <UsersIcon className="mr-1 h-3 w-3" />
              5 пассажиров
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Минивэн на 5 человек с водителем
            </h1>

            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Компания из 5 человек — это как раз тот случай, когда минивэн
                становится идеальным решением для поездки. В обычное такси
                5 пассажиров не поместятся: придётся заказывать две машины,
                координировать два экипажа и платить двойную цену. Минивэн
                решает эту проблему — все пять пассажиров едут вместе,
                в просторном салоне, с комфортом и без переплат.
              </p>
              <p>
                Наши минивэны вмещают до 7 пассажиров, поэтому при поездке
                впятером у вас остаётся два свободных места. Это дополнительное
                пространство для сумок, рюкзаков или просто для комфорта —
                каждый сидит свободно, без ощущения тесноты. Большой
                багажник легко вместит 5 чемоданов или дорожных сумок.
              </p>
              <p>
                Минивэн на 5 человек особенно удобен для семейных поездок:
                двое взрослых и трое детей (или наоборот) комфортно
                размещаются в салоне. Мы бесплатно предоставляем детские
                автокресла — достаточно указать возраст детей при заказе.
                Также минивэн на пятерых часто заказывают друзья для
                совместных поездок на отдых, рыбалку или загородные
                мероприятия.
              </p>

              <h2 className="text-2xl font-bold text-foreground">
                Стоимость поездки на 5 человек
              </h2>
              <p>
                Цена минивэна рассчитывается на весь автомобиль, а не за каждого
                пассажира. Базовая ставка — от 60 руб/км. Это значит, что
                при поездке на 300 км стоимость составит примерно 18 000 рублей
                на весь минивэн. Разделите на пятерых — и получится всего
                3 600 рублей на человека.
              </p>
              <p>
                Для сравнения: два обычных такси на тот же маршрут обойдутся
                в 24 000 — 30 000 рублей. Экономия при заказе минивэна на
                пятерых — от 6 000 до 12 000 рублей. При этом вы получаете
                не просто перевозку, а комфортный трансфер с водой,
                кондиционером, остановками по пути и помощью с багажом.
              </p>

              <h2 className="text-2xl font-bold text-foreground">
                Почему минивэн, а не два такси
              </h2>
              <p>
                Главное преимущество — вы едете все вместе. Не нужно делиться
                на две группы, координировать два автомобиля, ждать друг
                друга на остановках. Водитель минивэна делает остановки по
                вашему желанию, подстраивается под темп вашей группы. Вся
                компания общается, играет в дорожные игры, проводит время
                вместе — а не разговаривает по телефону между машинами.
              </p>
              <p>
                Кроме того, два такси на межгороде — это всегда риск: машины
                могут разминуться, один водитель может опоздать, у другого
                может сломаться кондиционер. С минивэном вы получаете одну
                надёжную машину, одного проверенного водителя и фиксированную
                цену без сюрпризов.
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
                Популярные маршруты для 5 пассажиров
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Минивэн на пятерых чаще всего заказывают для межгородних
                поездок: семейные путешествия, поездки на отдых, трансфер
                из аэропорта. Посмотрите все доступные направления с ценами
                на нашей странице маршрутов.
              </p>
              <Button variant="outline" asChild>
                <Link href="/routes">Все маршруты с ценами</Link>
              </Button>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать минивэн на 5 человек
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
