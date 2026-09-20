import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { CheckIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import { ReviewsSection } from "@/components/ReviewsSection";
import { JourneyHero } from "@/components/JourneyHero";
import { TripConstructor } from "@/components/TripConstructor";
import { getJourneyIllustration, journeySocialImage } from "@/lib/journey-illustrations";

export const metadata: Metadata = {
  title:
    "Детские перевозки на минивэне — с детским креслом бесплатно | ЗаказМинивэна.ru",
  description:
    "Безопасные детские перевозки на минивэне с детским автокреслом бесплатно. 7 мест, кондиционер, плавная езда. Межгородние поездки с детьми по фиксированной цене. Звоните +7 (918) 587-54-54",
  openGraph: {
    title: "Детские перевозки на минивэне — с детским креслом бесплатно | ЗаказМинивэна.ru",
    description: "Безопасные детские перевозки на минивэне с детским автокреслом бесплатно. 7 мест, кондиционер, плавная езда. Межгородние поездки с детьми по фиксированной цене. Звоните +7 (918) 587-54-54",
    url: "https://zakazminivena.ru/services/children",
    siteName: "ЗаказМинивэна.ru",
    locale: "ru_RU",
    type: "website",
    images: [journeySocialImage('/services/children')!],
  },
  twitter: { card: 'summary_large_image', images: [journeySocialImage('/services/children')!] },
  alternates: {
    canonical: "https://zakazminivena.ru/services/children",
  },
};

export default function ChildrenServicePage() {
  const advantages = [
    "Подбор кресла по возрасту, росту и весу ребёнка",
    "Количество и тип кресел согласуем заранее",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Детские перевозки на минивэне",
            "description": "Безопасные детские перевозки на минивэне с детским автокреслом бесплатно. 7 мест, кондиционер, плавная езда.",
            "provider": {
              "@type": "Organization",
              "name": "ЗаказМинивэна.ru",
              "url": "https://zakazminivena.ru"
            },
            "areaServed": "Россия",
            "serviceType": "Транспортные услуги"
          }) }}
        />
          <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
            <Breadcrumbs items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: "/services/airport" },
              { label: "Детские перевозки" },
            ]} />

          </div>
        <JourneyHero image={getJourneyIllustration('/services/children')} title="Семейная поездка на минивэне — с детским креслом" description="Мама, папа, дети и любимые вещи — едем вместе. Заранее подберём детские кресла и обсудим место для коляски, чемоданов и остановки в дороге." eyebrow="Большая поездка для маленьких пассажиров" />
        <TripConstructor scenario="family" emptyRoute contextNote="Для примера выбрана семья: двое взрослых, двое детей и коляска. Укажите маршрут и измените состав поездки под себя." />
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Content */}
            <div className="mt-10 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Поездка с детьми на дальнее расстояние требует особого комфорта и
                безопасности. Наши минивэны идеально подходят для семей с
                детьми: просторный салон, где ребёнку не будет тесно, и
                бесплатное детское автокресло нужной возрастной группы.
              </p>
              <p>
                Укажите возраст, рост и вес каждого ребёнка при заказе.
                Подтвердим подходящие кресла и их размещение в конкретном
                автомобиле. Коляску посчитаем отдельно как часть багажа;
                пришлите её размеры в сложенном виде.
              </p>
              <p>
                Наши водители привыкли к поездкам с маленькими пассажирами: они
                ведут машину плавно и аккуратно, делают остановки по пути для
                отдыха ребёнка. В салоне есть кондиционер с индивидуальной
                настройкой температуры и бутылки с водой.
              </p>
              <p>
                Минивэн помогает семье ехать вместе. Дети входят в общее число
                пассажиров; водитель — отдельно. Максимум этого конструктора —
                7 пассажиров, а при большом багаже мест может потребоваться меньше.
                Перед заказом согласуем и кресла, и вещи.
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

            <B2bCtaBlock />

            {/* Reviews */}
            <ReviewsSection tags={["children"]} />

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
