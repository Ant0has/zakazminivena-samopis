import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckIcon,
  PhoneIcon,
  UsersIcon,
  SnowflakeIcon,
  BatteryChargingIcon,
  BabyIcon,
  WifiIcon,
  LuggageIcon,
} from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Автопарк минивэнов — ЗаказМинивена.ru",
  description:
    "Наш автопарк: Toyota Alphard, Hyundai Staria, Volkswagen Caravelle. Комфортные минивэны на 7 мест с кондиционером, USB-зарядками и вместительным багажником.",
  alternates: {
    canonical: "https://zakazminivena.ru/fleet",
  },
};

const vehicles = [
  {
    name: "Toyota Alphard",
    image: "/images/fleet/alphard.png",
    seats: 7,
    category: "Премиум",
    description:
      "Флагманский минивэн Toyota. Просторный кожаный салон, капитанские кресла второго ряда с электрорегулировкой, панорамная крыша, плавный ход на любой дороге.",
    features: [
      "Кожаный салон",
      "Капитанские кресла",
      "Электрические сдвижные двери",
      "Климат-контроль 3 зоны",
      "Большой багажник",
      "USB-зарядки на каждом ряду",
    ],
  },
  {
    name: "Hyundai Staria",
    image: "/images/fleet/staria.png",
    seats: 7,
    category: "Комфорт",
    description:
      "Футуристичный минивэн нового поколения. Сверхпросторный салон, низкий пол для удобной посадки, современные системы безопасности, тихий ход.",
    features: [
      "Футуристичный дизайн",
      "Низкий пол — удобная посадка",
      "Панорамное остекление",
      "Климат-контроль",
      "Просторный багажник",
      "USB-C зарядки",
    ],
  },
  {
    name: "Volkswagen Caravelle",
    image: "/images/fleet/caravelle.png",
    seats: 7,
    category: "Бизнес",
    description:
      "Немецкая надёжность и комфорт. Классический минивэн для деловых поездок и семейных путешествий. Отличная шумоизоляция, мощный двигатель для трассы.",
    features: [
      "Немецкое качество",
      "Отличная шумоизоляция",
      "Мощный двигатель",
      "Круиз-контроль",
      "Подогрев сидений",
      "Вместительный багажник",
    ],
  },
];

const commonFeatures = [
  { icon: UsersIcon, text: "7 комфортных мест" },
  { icon: SnowflakeIcon, text: "Кондиционер / климат-контроль" },
  { icon: BatteryChargingIcon, text: "USB-зарядки для телефонов" },
  { icon: BabyIcon, text: "Детское кресло бесплатно" },
  { icon: LuggageIcon, text: "Вместительный багажник" },
  { icon: WifiIcon, text: "Вода в салоне" },
];

export default function FleetPage() {

const fleetJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Автопарк минивэнов ЗаказМинивена.ru",
  "itemListElement": vehicles.map((v, i) => ({
    "@type": "Vehicle",
    "position": i + 1,
    "name": v.name,
    "vehicleConfiguration": v.category,
    "seatingCapacity": v.seats,
    "description": v.description,
    "brand": { "@type": "Brand", "name": v.name.split(" ")[0] },
  })),
};

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetJsonLd) }}
      />
      <Header />
      <main className="pt-16">
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Главная
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Автопарк</span>
            </nav>

            <Badge className="mb-4 bg-emerald/10 text-emerald hover:bg-emerald/10">
              Наши автомобили
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Автопарк минивэнов
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Все наши минивэны — комфортные, ухоженные и оборудованные для
              дальних поездок. Подберём подходящий автомобиль под ваш маршрут.
            </p>

            {/* Common features */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {commonFeatures.map((f) => (
                <div
                  key={f.text}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center"
                >
                  <f.icon className="h-6 w-6 text-emerald" />
                  <span className="text-xs font-medium">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Vehicle cards */}
            <div className="mt-16 space-y-12">
              {vehicles.map((v) => (
                <Card key={v.name} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[4/3] bg-muted lg:aspect-auto">
                      <Image
                        src={v.image}
                        alt={v.name}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                          {v.name}
                        </h2>
                        <Badge variant="outline" className="border-emerald/30 text-emerald">
                          {v.category}
                        </Badge>
                      </div>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {v.description}
                      </p>
                      <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {v.features.map((f) => (
                          <div key={f} className="flex items-center gap-2">
                            <CheckIcon className="h-4 w-4 shrink-0 text-emerald" />
                            <span className="text-sm">{f}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Badge className="bg-emerald/10 text-emerald hover:bg-emerald/10">
                          <UsersIcon className="mr-1 h-3 w-3" />
                          {v.seats} мест
                        </Badge>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center sm:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Заказать минивэн
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Напишите маршрут и дату — подберём лучший автомобиль и назовём
                точную цену за 5 минут
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
