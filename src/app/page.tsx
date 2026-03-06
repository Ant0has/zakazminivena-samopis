import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { PriceComparisonSection } from "@/components/PriceComparisonSection";
import { RoutesSection } from "@/components/RoutesSection";
import { TariffsSection } from "@/components/TariffsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TransportationService",
  name: "ЗаказМинивена.ru",
  description:
    "Заказ минивэна с водителем на 7 мест для межгородних поездок и трансфера в аэропорт по России",
  url: "https://zakazminivena.ru",
  telephone: "+79185875454",
  priceRange: "от 60 руб/км",
  areaServed: {
    "@type": "Country",
    name: "Россия",
  },
  openingHours: "Mo-Su 08:00-22:00",
  serviceType: [
    "Межгородний трансфер на минивэне",
    "Трансфер в аэропорт",
    "Групповой трансфер",
    "Детские перевозки",
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "RUB",
    price: "60",
    unitText: "руб/км",
    description: "Минивэн с водителем, 7 мест, фиксированная цена",
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <PriceComparisonSection />
        <RoutesSection />
        <TariffsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
