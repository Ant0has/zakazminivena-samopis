import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { PhoneIcon, ClockIcon } from "lucide-react";
import { TelegramIcon, MaxIcon } from "@/components/icons";

const routeLinks = [
  { href: "/routes/kazan-samara", label: "Казань — Самара" },
  { href: "/routes/ekaterinburg-chelyabinsk", label: "Екатеринбург — Челябинск" },
  { href: "/routes/moskva-sochi", label: "Москва — Сочи" },
  { href: "/routes/krasnodar-simferopol", label: "Краснодар — Симферополь" },
  { href: "/routes/adler-roza-khutor", label: "Адлер — Роза Хутор" },
  { href: "/routes/voronezh-moskva", label: "Воронеж — Москва" },
];

const cityLinks = [
  { href: "/cities/moskva", label: "Москва" },
  { href: "/cities/ekaterinburg", label: "Екатеринбург" },
  { href: "/cities/kazan", label: "Казань" },
  { href: "/cities/krasnodar", label: "Краснодар" },
  { href: "/cities/sochi", label: "Сочи" },
  { href: "/cities/spb", label: "Санкт-Петербург" },
];

const serviceLinks = [
  { href: "/services/group-transfer", label: "Групповой трансфер" },
  { href: "/services/airport", label: "Трансфер в аэропорт" },
  { href: "/services/children", label: "Детские перевозки" },
  { href: "/services/wedding", label: "Минивэн на свадьбу" },
  { href: "/yandex-taxi-minivan", label: "Минивэн vs Яндекс Такси" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Routes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Маршруты
            </h3>
            <ul className="space-y-2.5">
              {routeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Города
            </h3>
            <ul className="space-y-2.5">
              {cityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Услуги
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Контакты
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+79185875454"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <PhoneIcon className="h-4 w-4 text-emerald" />
                  +7 (918) 587-54-54
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/zakazminivena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <TelegramIcon className="h-4 w-4 text-[#26A5E4]" />
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://max.ru/zakazminivena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MaxIcon className="h-4 w-4 text-[#0077FF]" />
                  MAX
                </a>
              </li>
              <li className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
                <ClockIcon className="h-4 w-4 text-emerald" />
                Ежедневно 08:00 — 22:00
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald text-xs font-bold text-emerald-foreground">
              M
            </div>
            <span className="text-sm font-medium">
              ЗаказМинивена<span className="text-emerald">.ru</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Пользовательское соглашение
            </Link>
            <Link href="/offer" className="hover:text-foreground">
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
