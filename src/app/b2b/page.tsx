import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ReviewsSection } from "@/components/ReviewsSection";
import { TelegramIcon } from "@/components/icons";
import { allRoutes, calcPrice, formatPrice } from "@/lib/routes-data";
import { b2bPillars } from "@/lib/b2b-data";
import { b2bCases } from "@/lib/b2b-cases-data";
import {
  CheckIcon,
  PhoneIcon,
  XIcon,
  ArrowRightIcon,
  FileTextIcon,
  CreditCardIcon,
  Building2Icon,
  PartyPopperIcon,
  HardHatIcon,
  PlaneIcon,
  HeartIcon,
  BabyIcon,
  ShieldCheckIcon,
  ClockIcon,
  UsersIcon,
  CarIcon,
  SparklesIcon,
  SendIcon,
  FileCheckIcon,
  CalendarCheckIcon,
  CarFrontIcon,
  ChevronRightIcon,
  PackageIcon,
  TruckIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Минивэн для бизнеса — корпоративные трансферы | ЗаказМинивена.ru",
  description:
    "Корпоративные трансферы на минивэнах 7 мест: закрывающие документы, фиксированная цена, персональный менеджер. Работаем по договору с юридическими лицами.",
  openGraph: {
    title: "Минивэн для бизнеса — корпоративные трансферы | ЗаказМинивена.ru",
    description:
      "Корпоративные трансферы на минивэнах 7 мест: закрывающие документы, фиксированная цена, персональный менеджер. Работаем по договору с юридическими лицами.",
    url: "https://zakazminivena.ru/b2b",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/b2b",
  },
};

const corporateRouteSlugs = [
  "moskva-spb",
  "rostov-krasnodar",
  "kazan-samara",
  "ekaterinburg-chelyabinsk",
  "krasnodar-sochi",
  "moskva-sochi",
];

const faqItems = [
  {
    q: "Какие документы нужны для заключения договора?",
    a: "Для заключения договора потребуются реквизиты компании, карточка организации и доверенность на подписанта (если подписывает не генеральный директор).",
  },
  {
    q: "Какие способы оплаты доступны?",
    a: "Мы принимаем безналичный расчёт по счёту, банковские карты (онлайн или по ссылке), наличные и СБП. Для постоянных клиентов доступна постоплата.",
  },
  {
    q: "Можно ли организовать регулярные поездки?",
    a: "Да, мы организуем корпоративный транспорт, вахтовые перевозки и ежедневные маршруты для руководителей. Составим удобный график и закрепим персонального менеджера.",
  },
  {
    q: "Какие автомобили в автопарке?",
    a: "Toyota Alphard (Премиум), Hyundai Staria (Комфорт), Volkswagen Caravelle (Бизнес) — все минивэны на 7 мест с кондиционером, USB-зарядками и просторным багажником.",
  },
  {
    q: "Есть ли скидки для постоянных клиентов?",
    a: "Да, мы предлагаем индивидуальные условия, скидку 20% на обратный путь и специальные тарифы при регулярных заказах. Обсудим детали при заключении договора.",
  },
];

const pillarIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "corporate-transport": Building2Icon,
  "airport-vip": PlaneIcon,
  events: PartyPopperIcon,
  "shift-workers": HardHatIcon,
  medical: HeartIcon,
  cargo: PackageIcon,
};

export default function B2BPage() {
  const corporateRoutes = corporateRouteSlugs
    .map((slug) => allRoutes.find((r) => r.slug === slug))
    .filter(Boolean);

  const featuredCases = b2bCases.slice(0, 4);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Корпоративные трансферы на минивэнах",
    provider: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
      telephone: "+79185875454",
    },
    description:
      "Корпоративные трансферы на минивэнах 7 мест с водителем. Закрывающие документы, фиксированная цена, персональный менеджер. Работаем по договору с юридическими лицами.",
    areaServed: "RU",
    serviceType: "Корпоративный трансфер",
  };

  return (
    <div className="relative min-h-screen">
      <Header />

      <div className="b2b-dark bg-[var(--background)] text-[var(--foreground)] min-h-screen">
        <main className="pt-16">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />

          {/* === HERO === */}
          <section className="relative overflow-hidden py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Breadcrumbs
                items={[
                  { label: "Главная", href: "/" },
                  { label: "Для бизнеса" },
                ]}
              />

              <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Минивэн для бизнеса
                  </h1>
                  <p className="mt-4 text-lg text-zinc-400">
                    Корпоративные трансферы на 7-местных минивэнах с водителем
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      "Фиксированная цена при бронировании",
                      "Закрывающие документы с QR-чеком",
                      "Персональный менеджер",
                    ].map((point) => (
                      <div key={point} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                          <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
                        </div>
                        <span className="text-sm font-medium text-zinc-200">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { value: "7 мест", label: "в каждом авто" },
                      { value: "112+", label: "маршрутов" },
                      { value: "−20%", label: "обратный путь" },
                      { value: "0 ₽", label: "предоплата" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-3 text-center">
                        <div className="text-xl font-bold text-emerald-400">{stat.value}</div>
                        <div className="mt-0.5 text-xs text-zinc-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Button
                      size="lg"
                      className="h-14 bg-[#26A5E4] text-base font-semibold text-white hover:bg-[#26A5E4]/90"
                      asChild
                    >
                      <a href="https://t.me/zakazminivena">
                        <TelegramIcon className="mr-2 h-5 w-5" />
                        Оставить заявку в Telegram
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src="/images/services/group-transfer.webp"
                    alt="Корпоративный трансфер на минивэне"
                    width={1024}
                    height={576}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>

          {/* === НАПРАВЛЕНИЯ (PILLAR PAGES) === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                Направления
              </h2>
              <p className="mt-3 text-center text-zinc-400">
                Выберите подходящий тип транспортного обслуживания
              </p>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {b2bPillars.map((pillar) => {
                  const PillarIcon = pillarIcons[pillar.slug] || Building2Icon;
                  return (
                    <Link
                      key={pillar.slug}
                      href={`/b2b/${pillar.slug}`}
                      className="group overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 transition-colors hover:border-emerald-500/30"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={pillar.heroImage}
                          alt={pillar.h1}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 backdrop-blur-sm">
                            <PillarIcon className="h-5 w-5 text-emerald-400" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-white">{pillar.h1}</h3>
                        <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                          {pillar.description}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald-400">
                          Подробнее
                          <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* === PROBLEM-SOLUTION === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                Почему агрегаторы не подходят для бизнес-поездок
              </h2>

              <div className="mt-12 space-y-6">
                {[
                  {
                    problem: "Водитель отменяет за час до поездки",
                    solution: "Гарантированное назначение водителя при бронировании",
                  },
                  {
                    problem: "Цена выросла в 2 раза из-за праздников",
                    solution: "Фиксированная стоимость — платите ровно столько, сколько договорились",
                  },
                  {
                    problem: "Нет закрывающих документов для бухгалтерии",
                    solution: "Полный пакет: QR-чек, акт, счёт, договор",
                  },
                ].map((pair, i) => (
                  <div key={i} className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-xl border border-red-900/40 bg-red-950/20 p-5">
                      <XIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                      <span className="text-sm text-zinc-300">{pair.problem}</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-5">
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                      <span className="text-sm text-zinc-300">{pair.solution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === DOCUMENTS & PAYMENT === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Card 1 — Contract */}
                <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                    <FileTextIcon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Работа по договору</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Полный пакет закрывающих документов
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Договор на транспортное обслуживание",
                      "Акт выполненных работ",
                      "Счёт на оплату",
                      "Кассовый чек с QR-кодом",
                      "Путевой лист (по запросу)",
                    ].map((doc) => (
                      <li key={doc} className="flex items-center gap-3 text-sm text-zinc-300">
                        <CheckIcon className="h-4 w-4 shrink-0 text-emerald-400" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 space-y-2 rounded-lg bg-zinc-900/50 p-4">
                    <p className="text-sm text-zinc-300">
                      <span className="font-medium text-white">ЭДО:</span> Диадок, СБИС
                    </p>
                    <p className="text-sm text-zinc-300">
                      <span className="font-medium text-white">Постоплата</span> для постоянных клиентов
                    </p>
                  </div>
                </div>

                {/* Card 2 — Payment */}
                <div className="rounded-2xl border border-zinc-700/50 bg-zinc-800/50 p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                    <CreditCardIcon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Способы оплаты</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Удобный расчёт для любой ситуации
                  </p>
                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="font-medium text-sm text-white">Оплата при посадке</div>
                      <p className="mt-1 text-sm text-zinc-400">
                        Наличные, карта, СБП — моментальный QR-чек
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-white">Банковская карта</div>
                      <p className="mt-1 text-sm text-zinc-400">
                        Оплата онлайн или по ссылке
                      </p>
                    </div>
                    <div>
                      <div className="font-medium text-sm text-white">Безналичный расчёт</div>
                      <p className="mt-1 text-sm text-zinc-400">
                        По счёту для юридических лиц, возможна постоплата
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* === USE CASES === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                Для каких задач подходит
              </h2>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Building2Icon,
                    title: "Корпоративный транспорт",
                    desc: "Доставка сотрудников на встречи, конференции и деловые мероприятия",
                  },
                  {
                    icon: PartyPopperIcon,
                    title: "Корпоративные мероприятия",
                    desc: "Трансфер гостей после банкетов, тимбилдингов и корпоративов",
                  },
                  {
                    icon: HardHatIcon,
                    title: "Вахтовые перевозки",
                    desc: "Доставка персонала на объекты и обратно по расписанию",
                  },
                  {
                    icon: PlaneIcon,
                    title: "Трансфер в аэропорт",
                    desc: "Встреча партнёров и VIP-гостей с табличкой в аэропорту",
                  },
                  {
                    icon: HeartIcon,
                    title: "Медицинский трансфер",
                    desc: "Комфортная перевозка пациентов на госпитализацию и реабилитацию",
                  },
                  {
                    icon: PackageIcon,
                    title: "Срочная доставка грузов",
                    desc: "Доставка грузов до 500 кг между городами за 2-8 часов",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 transition-colors hover:border-emerald-500/30"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <item.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === POPULAR ROUTES === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                Популярные корпоративные маршруты
              </h2>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {corporateRoutes.map((route) => {
                  if (!route) return null;
                  const price = calcPrice(route.km);
                  return (
                    <Link
                      key={route.slug}
                      href={`/routes/${route.slug}`}
                      className="group rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5 transition-colors hover:border-emerald-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">
                            {route.from} → {route.to}
                          </div>
                          <div className="mt-1 text-xs text-zinc-500">
                            {route.km} км · {route.hours}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-400">
                            {formatPrice(price)} ₽
                          </div>
                          <div className="text-xs text-zinc-500">за минивэн</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                        Подробнее
                        <ArrowRightIcon className="h-3 w-3" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* === КЕЙСЫ КЛИЕНТОВ === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                Кейсы клиентов
              </h2>
              <p className="mt-3 text-center text-zinc-400">
                Реальные примеры сотрудничества с компаниями из разных отраслей
              </p>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredCases.map((caseItem) => (
                  <Link
                    key={caseItem.slug}
                    href={`/b2b/cases/${caseItem.slug}`}
                    className="group overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 transition-colors hover:border-emerald-500/30"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={caseItem.image}
                        alt={caseItem.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400 backdrop-blur-sm">
                          {caseItem.industry}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                        {caseItem.title}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        {caseItem.company}
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-1">
                        {caseItem.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xs font-bold text-emerald-400">
                              {stat.value}
                            </div>
                            <div className="text-[10px] text-zinc-500 leading-tight">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100">
                        Читать кейс
                        <ChevronRightIcon className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/b2b/cases"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  Все кейсы клиентов
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* === HOW IT WORKS === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                Как начать работу
              </h2>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: "1",
                    icon: SendIcon,
                    title: "Заявка",
                    desc: "Оставьте заявку в Telegram или позвоните — менеджер свяжется в течение 15 минут",
                  },
                  {
                    step: "2",
                    icon: FileCheckIcon,
                    title: "Договор",
                    desc: "Подписание договора через ЭДО или в обычном порядке",
                  },
                  {
                    step: "3",
                    icon: CalendarCheckIcon,
                    title: "Бронирование",
                    desc: "Заказывайте через Telegram, менеджера или по телефону",
                  },
                  {
                    step: "4",
                    icon: CarFrontIcon,
                    title: "Поездка",
                    desc: "Водитель подаётся вовремя, электронный чек и документы по итогам",
                  },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                      <item.icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Шаг {item.step}
                    </div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === WHY CHOOSE US === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                Почему выбирают нас
              </h2>
              <div className="mt-12 space-y-4">
                {[
                  {
                    icon: ClockIcon,
                    title: "Пунктуальность",
                    desc: "Подача вовремя, отслеживание рейсов при встрече в аэропорту",
                  },
                  {
                    icon: UsersIcon,
                    title: "Опытные водители",
                    desc: "Стаж от 5 лет, знание делового этикета, аккуратная езда",
                  },
                  {
                    icon: ShieldCheckIcon,
                    title: "Безопасность",
                    desc: "КАСКО, регулярное ТО, проверенные водители с чистой историей",
                  },
                  {
                    icon: CarIcon,
                    title: "Комфортный автопарк",
                    desc: "Toyota Alphard, Hyundai Staria, VW Caravelle — кондиционер, USB, Wi-Fi",
                  },
                  {
                    icon: SparklesIcon,
                    title: "Гибкость",
                    desc: "Изменение маршрута, остановки по пути, ожидание — всё по вашим потребностям",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                      <item.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === FAQ === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                Часто задаваемые вопросы
              </h2>
              <div className="mt-12 space-y-4">
                {faqItems.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-zinc-700/50 bg-zinc-800/50"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-white [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <ArrowRightIcon className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-5 pb-5 text-sm text-zinc-400">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* === REVIEWS === */}
          <section className="border-t border-zinc-800 py-16 sm:py-24">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <ReviewsSection tags={["group", "intercity"]} />
            </div>
          </section>

          {/* === CTA === */}
          <section className="border-t border-zinc-800 bg-emerald-950/20 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Готовы начать сотрудничество?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-400">
                Оставьте заявку — мы подготовим коммерческое предложение за 1 рабочий день
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
                  className="h-14 text-base font-semibold border-zinc-600 text-white hover:bg-white/10"
                  asChild
                >
                  <a href="tel:+79185875454">
                    <PhoneIcon className="mr-2 h-5 w-5 text-emerald-400" />
                    +7 (918) 587-54-54
                  </a>
                </Button>
              </div>
              <p className="mt-6 text-sm text-zinc-500">
                +7 (918) 587-54-54 · Ежедневно 08:00–22:00
              </p>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
