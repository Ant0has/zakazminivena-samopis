import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, PlaneIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Трансфер в аэропорт на минивэне 7 мест — ЗаказМинивена.ru",
  description:
    "Трансфер в аэропорт на минивэне с водителем для семьи или группы до 7 человек. Встреча с табличкой, отслеживание рейса, детское кресло бесплатно. Фиксированная цена. Звоните +7 (918) 587-54-54",
  openGraph: {
    title: "Трансфер в аэропорт на минивэне 7 мест — ЗаказМинивена.ru",
    description: "Трансфер в аэропорт на минивэне с водителем для семьи или группы до 7 человек. Встреча с табличкой, отслеживание рейса, детское кресло бесплатно. Фиксированная цена. Звоните +7 (918) 587-54-54",
    url: "https://zakazminivena.ru/services/airport",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/services/airport",
  },
};

export default function AirportServicePage() {
  const advantages = [
    "Встреча с табличкой в зоне прилёта",
    "Отслеживание рейса — подъедем к моменту прилёта",
    "Бесплатное ожидание 30 минут после посадки",
    "Помощь с багажом до автомобиля",
    "Детское кресло бесплатно по запросу",
    "Фиксированная цена без наценок за ночное время",
    "7 мест + большой багажник для чемоданов",
    "Подача в любой терминал аэропорта",
  ];

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: "/services/airport" },
              { label: "Трансфер в аэропорт" },
            ]} />

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <PlaneIcon className="mr-1 h-3 w-3" />
              Услуга
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Трансфер в аэропорт на минивэне 7 мест
            </h1>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image src="/images/services/airport.png" alt="Встреча с табличкой в аэропорту" width={1024} height={576} className="w-full h-auto object-cover" priority />
            </div>

            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Трансфер в аэропорт на минивэне — идеальное решение для семьи с
                детьми или компании друзей. Один просторный автомобиль вместо
                двух-трёх обычных такси: все пассажиры и весь багаж едут вместе,
                без разделения и лишних хлопот.
              </p>
              <p>
                Мы отслеживаем ваш рейс в режиме реального времени и подъезжаем
                к моменту прилёта. Водитель ждёт с табличкой в зоне прилёта до
                30 минут бесплатно — вам не нужно торопиться на паспортном
                контроле или у ленты с багажом.
              </p>
              <p>
                Все наши минивэны оборудованы кондиционером, USB-зарядками и
                имеют вместительный багажник для нескольких чемоданов. По запросу
                предоставляем детское автокресло бесплатно — укажите возраст
                ребёнка при бронировании.
              </p>
              <p>
                Цена фиксируется при заказе и не меняется: никаких наценок за
                ночное время, праздники или пробки. Вы точно знаете стоимость
                поездки ещё до вылета.
              </p>
            </div>

            {/* Advantages */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">
                Почему выбирают наш трансфер в аэропорт
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {advantages.map((item) => (
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

            {/* Reviews */}
            <ReviewsSection tags={["airport"]} />

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать трансфер в аэропорт
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Укажите аэропорт, дату и количество пассажиров — ответим за 5
                минут с точной ценой
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
