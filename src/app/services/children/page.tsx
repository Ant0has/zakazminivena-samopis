import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, BabyIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title:
    "Детские перевозки на минивэне — с детским креслом бесплатно | ЗаказМинивена.ru",
  description:
    "Безопасные детские перевозки на минивэне с детским автокреслом бесплатно. 7 мест, кондиционер, плавная езда. Межгородние поездки с детьми по фиксированной цене. Звоните +7 (918) 587-54-54",
  alternates: {
    canonical: "https://zakazminivena.ru/services/children",
  },
};

export default function ChildrenServicePage() {
  const advantages = [
    "Детское автокресло бесплатно (0-12 лет)",
    "Бустер для детей старше 7 лет",
    "Плавная и аккуратная манера вождения",
    "Кондиционер с индивидуальной настройкой",
    "Бутылки воды в салоне",
    "Остановки по пути для отдыха ребёнка",
    "Опытные водители, привыкшие к поездкам с детьми",
    "Просторный салон — ребёнку не будет тесно",
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
              <span className="text-foreground">Детские перевозки</span>
            </nav>

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <BabyIcon className="mr-1 h-3 w-3" />
              Услуга
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Детские перевозки на минивэне — с детским креслом
            </h1>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image src="/images/services/children.png" alt="Детские перевозки на минивэне с автокреслом" width={1024} height={576} className="w-full h-auto object-cover" priority />
            </div>

            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Поездка с детьми на дальнее расстояние требует особого комфорта и
                безопасности. Наши минивэны идеально подходят для семей с
                детьми: просторный салон, где ребёнку не будет тесно, и
                бесплатное детское автокресло нужной возрастной группы.
              </p>
              <p>
                Мы предоставляем детские автокресла для детей от 0 до 12 лет и
                бустеры для детей старше 7 лет — абсолютно бесплатно. Достаточно
                указать возраст и вес ребёнка при заказе, и мы подготовим
                подходящее кресло заранее.
              </p>
              <p>
                Наши водители привыкли к поездкам с маленькими пассажирами: они
                ведут машину плавно и аккуратно, делают остановки по пути для
                отдыха ребёнка. В салоне есть кондиционер с индивидуальной
                настройкой температуры и бутылки с водой.
              </p>
              <p>
                Минивэн — единственный формат такси, где вся семья из 5-7 человек
                с детьми и багажом поместится в одном автомобиле. Не нужно
                разделять семью по разным машинам и переживать, что кресло не
                поместится в обычный седан.
              </p>
            </div>

            {/* Advantages */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">
                Почему выбирают наш минивэн для поездки с детьми
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

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать минивэн с детским креслом
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Укажите возраст ребёнка и маршрут — подберём кресло и рассчитаем
                стоимость за 5 минут
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
