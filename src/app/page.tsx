import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PriceComparisonSection } from "@/components/PriceComparisonSection";
import { RoutesSection } from "@/components/RoutesSection";
import { StatsSection } from "@/components/StatsSection";
import { TariffsSection } from "@/components/TariffsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

import type { Metadata } from "next";
import { pricingYear, tariff } from '@/lib/route-pricing';
import { routeOffer } from '@/lib/route-seo';

const title = 'Минивэн с водителем — межгород и аэропорт от 3 000 ₽';
const description = `Минивэн «Комфорт» до 7 пассажиров: межгород и аэропорт от 3 000 ₽ за автомобиль. Цены ${pricingYear}. Выберите детей и багаж в конструкторе, условия подтвердим до заказа.`;

export const metadata: Metadata = {
  title, description,
  openGraph: { title, description, url: 'https://zakazminivena.ru', type: 'website', images: [{ url: 'https://zakazminivena.ru/images/heroes/family-journey-20260919.webp', width: 1536, height: 1024 }] },
  twitter: { card: 'summary_large_image', title, description, images: ['https://zakazminivena.ru/images/heroes/family-journey-20260919.webp'] },
  alternates: {
    canonical: "https://zakazminivena.ru",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TransportationService",
  name: "ЗаказМинивэна.ru",
  description:
    "Заказ минивэна с водителем на 7 мест для межгородних поездок и трансфера в аэропорт по России",
  url: "https://zakazminivena.ru",
  telephone: "+79185875454",
  priceRange: "Фиксированная цена",
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
  offers: routeOffer(tariff.minimum),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2000",
    bestRating: "5",
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
        <HowItWorksSection />
        <PriceComparisonSection />
        <RoutesSection />
        <StatsSection />
        <TariffsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
