import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, UsersIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Групповой трансфер на минивэне 7 мест — ЗаказМинивена.ru",
  description:
    "Групповой трансфер на минивэне с водителем для 7 пассажиров. Межгородние поездки, корпоративные перевозки, экскурсии. Фиксированная цена. Звоните +7 (918) 587-54-54",
  openGraph: {
    title: "Групповой трансфер на минивэне 7 мест — ЗаказМинивена.ru",
    description: "Групповой трансфер на минивэне с водителем для 7 пассажиров. Межгородние поездки, корпоративные перевозки, экскурсии. Фиксированная цена. Звоните +7 (918) 587-54-54",
    url: "https://zakazminivena.ru/services/group-transfer",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/services/group-transfer",
  },
};

export default function GroupTransferPage() {
  const advantages = [
    "7 комфортных мест в одном автомобиле",
    "Фиксированная стоимость на всю группу",
    "Экономия до 70% по сравнению с несколькими такси",
    "Большой багажник для вещей всей группы",
    "Кондиционер и USB-зарядка для каждого",
    "Опытный водитель, знающий маршрут",
    "Остановки по пути по вашему желанию",
    "Без предоплаты — оплата по факту",
  ];

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Групповой трансфер на минивэне 7 мест",
            "description": "Групповой трансфер на минивэне с водителем для 7 пассажиров. Межгородние поездки, корпоративные перевозки, экскурсии.",
            "provider": {
              "@type": "Organization",
              "name": "ЗаказМинивена.ru",
              "url": "https://zakazminivena.ru"
            },
            "areaServed": "Россия",
            "serviceType": "Транспортные услуги"
          }) }}
        />
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: "/services/airport" },
              { label: "Групповой трансфер" },
            ]} />

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              <UsersIcon className="mr-1 h-3 w-3" />
              Услуга
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Групповой трансфер на минивэне
            </h1>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <Image src="/images/services/group-transfer.webp" alt="Групповой трансфер на минивэне" width={1024} height={576} className="w-full h-auto object-cover" priority />
            </div>

            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Групповой трансфер на минивэне — это оптимальный способ перевезти
                компанию из 5-7 человек между городами или из аэропорта. Вместо
                того чтобы заказывать два-три обычных такси, вы размещаетесь в
                одном просторном минивэне с комфортом и экономией.
              </p>
              <p>
                Наши минивэны рассчитаны на 7 пассажирских мест с полноценными
                ремнями безопасности. Каждое сиденье — с достаточным пространством
                для ног. Большой багажник вмещает чемоданы всей группы без
                проблем.
              </p>
              <p>
                Групповой трансфер идеально подходит для корпоративных поездок,
                семейных путешествий, экскурсионных групп и спортивных команд. Мы
                обеспечиваем подачу точно к назначенному времени и гарантируем
                фиксированную стоимость без скрытых доплат.
              </p>
              <p>
                Стоимость поездки рассчитывается на весь минивэн, а не на каждого
                пассажира. Это значит, что при полной загрузке цена на человека
                получается в 2-3 раза ниже, чем при поездке на обычном такси.
              </p>
            </div>

            {/* Advantages */}
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">
                Преимущества группового трансфера
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

            <B2bCtaBlock />

            {/* Reviews */}
            <ReviewsSection tags={["group"]} />

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать групповой трансфер
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Напишите маршрут, количество пассажиров и дату — рассчитаем
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
