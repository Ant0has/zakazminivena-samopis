import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title:
    "О сервисе ЗаказМинивена.ru — минивэн с водителем по России",
  description:
    "ЗаказМинивена.ru — сервис заказа минивэнов с водителем на 7 мест для межгородних поездок и трансфера в аэропорт. Фиксированные цены, 21+ регион России.",
  openGraph: {
    title: "О сервисе ЗаказМинивена.ru — минивэн с водителем по России",
    description: "ЗаказМинивена.ru — сервис заказа минивэнов с водителем на 7 мест для межгородних поездок и трансфера в аэропорт. Фиксированные цены, 21+ регион России.",
    url: "https://zakazminivena.ru/about",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/about",
  },
};

export default function AboutPage() {
  const whyUs = [
    {
      icon: ShieldCheckIcon,
      title: "Фиксированные цены",
      text: "Стоимость поездки известна заранее и не меняется. Никаких наценок за ночное время, праздники или пробки.",
    },
    {
      icon: UsersIcon,
      title: "7 мест в одном автомобиле",
      text: "Вся семья или компания едет вместе. Не нужно заказывать несколько такси и разделяться.",
    },
    {
      icon: MapPinIcon,
      title: "21+ регион России",
      text: "Работаем по всей стране: от Москвы и Санкт-Петербурга до Сочи, Казани, Екатеринбурга и Новосибирска.",
    },
    {
      icon: ClockIcon,
      title: "Быстрый ответ",
      text: "Отвечаем на заявки за 5 минут в Telegram. Рассчитываем стоимость и подтверждаем бронирование сразу.",
    },
  ];

  const facts = [
    "Межгородние перевозки и трансферы в аэропорты",
    "Детское автокресло бесплатно по запросу",
    "Встреча с табличкой в аэропорту",
    "Бесплатное ожидание 30 минут",
    "Кондиционер, USB-зарядка, вода в салоне",
    "Без предоплаты — оплата по факту",
    "Работаем ежедневно с 08:00 до 22:00",
    "Опытные водители со стажем от 5 лет",
  ];


  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "TransportationService",
    "name": "ЗаказМинивена.ru",
    "url": "https://zakazminivena.ru",
    "telephone": "+79185875454",
    "description": "Сервис заказа минивэнов с водителем на 7 мест для межгородних поездок и трансфера в аэропорт по России",
    "areaServed": { "@type": "Country", "name": "Russia" },
    "serviceType": "Minivan Transfer",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2000" },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+79185875454",
      "contactType": "customer service",
      "availableLanguage": "Russian",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "08:00",
        "closes": "22:00"
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Главная", href: "/" },
              { label: "О нас" },
            ]} />

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              О сервисе
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              О сервисе ЗаказМинивена.ru
            </h1>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image src="/images/services/about.png" alt="Минивэн ЗаказМинивена.ru с водителем" width={1024} height={576} className="w-full h-auto object-cover" priority />
            </div>

            {/* Description */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">ЗаказМинивена.ru</strong>{" "}
                — это специализированный сервис заказа минивэнов с водителем
                на 7 мест для межгородних поездок и трансферов в аэропорт по
                всей России.
              </p>
              <p>
                Мы создали сервис, потому что знаем главную проблему: заказать
                минивэн через обычные агрегаторы такси практически невозможно.
                Тариф «минивэн» часто недоступен, количество мест ограничено,
                а цены непредсказуемы из-за динамического ценообразования.
              </p>
              <p>
                У нас всё просто: вы пишете маршрут и дату — мы за 5 минут
                называем фиксированную цену. Без скрытых доплат, без сюрпризов
                при оплате, без предоплаты. Стоимость рассчитывается на весь минивэн целиком, а не на человека.
              </p>
            </div>

            {/* Why us cards */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Почему выбирают нас</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {whyUs.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <item.icon className="mb-3 h-6 w-6 text-emerald" />
                    <h3 className="mb-2 font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Facts */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Что мы предлагаем</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {facts.map((item) => (
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

            {/* Stats */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Наши цифры</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { value: "2 000+", label: "выполненных поездок" },
                  { value: "67", label: "маршрутов по России" },
                  { value: "21+", label: "регионов присутствия" },
                  { value: "4.9", label: "средняя оценка клиентов" },
                ].map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-xl border border-border p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-emerald">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <ReviewsSection tags={["intercity", "airport"]} />

            {/* Contacts */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 sm:p-10">
              <h2 className="mb-6 text-2xl font-bold text-center sm:text-3xl">
                Контакты
              </h2>
              <div className="mx-auto max-w-md space-y-4 text-center">
                <p className="text-muted-foreground">
                  Свяжитесь с нами любым удобным способом — ответим за 5 минут
                </p>
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
                <p className="text-sm text-muted-foreground">
                  <ClockIcon className="mr-1 inline h-4 w-4" />
                  Ежедневно 08:00 — 22:00
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
