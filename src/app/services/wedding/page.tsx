import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, HeartIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Минивэн на свадьбу — трансфер гостей на минивэне | ЗаказМинивена.ru",
  description:
    "Минивэн на свадьбу для трансфера гостей: 7 мест, кондиционер, большой багажник. Развозка гостей из аэропорта, в ЗАГС, ресторан и обратно. Фиксированная цена.",
  alternates: {
    canonical: "https://zakazminivena.ru/services/wedding",
  },
};

export default function WeddingServicePage() {
  const advantages = [
    "7 мест — все гости в одном автомобиле",
    "Чистый ухоженный минивэн представительского класса",
    "Почасовая аренда или фиксированная цена за маршрут",
    "Трансфер гостей из аэропорта и вокзала",
    "Развозка: ЗАГС, фотосессия, ресторан, гостиница",
    "Водитель в костюме по запросу",
    "Большой багажник для подарков и цветов",
    "Работаем без выходных, включая праздники",
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
              <span className="text-foreground">Минивэн на свадьбу</span>
            </nav>

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <HeartIcon className="mr-1 h-3 w-3" />
              Услуга
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Минивэн на свадьбу — трансфер гостей
            </h1>

            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Свадьба — это событие, где важна каждая деталь. Трансфер гостей
                на минивэне решает одну из главных логистических задач:
                комфортная перевозка группы гостей между площадками без суеты и
                задержек.
              </p>
              <p>
                Минивэн на 7 мест идеально подходит для свадебного трансфера:
                встреча иногородних гостей в аэропорту или на вокзале, доставка
                в гостиницу, затем в ЗАГС, на фотосессию и в ресторан. Один
                автомобиль вместо нескольких такси — все гости вместе и приезжают
                вовремя.
              </p>
              <p>
                Мы предлагаем как почасовую аренду минивэна на весь день свадьбы,
                так и фиксированную цену за конкретный маршрут. Водитель
                приедет заблаговременно и будет в вашем распоряжении на
                протяжении всего мероприятия.
              </p>
              <p>
                Наши минивэны всегда чистые и ухоженные, с кондиционером и
                просторным багажником для подарков, цветов и свадебных
                аксессуаров. По запросу водитель приедет в строгом костюме.
              </p>
            </div>

            {/* Advantages */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">
                Преимущества минивэна на свадьбу
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
                Заказать минивэн на свадьбу
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Расскажите о дате, маршруте и количестве гостей — подготовим
                предложение за 5 минут
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
