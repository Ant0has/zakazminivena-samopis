import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { PhoneIcon, MailIcon, MessageCircleIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Контакты — ЗаказМинивэна.ru",
  description:
    "Контакты: телефон +7 (918) 587-54-54, WhatsApp, Telegram. Диспетчер 24/7. B2B-менеджер 9:00–19:00. Реквизиты ИП Макаренко В.П.",
  alternates: { canonical: "https://zakazminivena.ru/contacts" },
};

export default function ContactsPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]} />
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Контакты</h1>
            <p className="mb-8 text-base text-muted-foreground">
              На связи 24/7. Диспетчер по всем заказам — круглосуточно. B2B-менеджер — в рабочее
              время.
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              <a href="tel:+79185875454" className="block">
                <Card className="p-5 transition-colors hover:border-emerald">
                  <PhoneIcon className="mb-3 h-6 w-6 text-emerald" />
                  <div className="mb-1 text-sm uppercase text-muted-foreground">Телефон</div>
                  <div className="text-lg font-semibold">+7 (918) 587-54-54</div>
                  <div className="mt-1 text-xs text-muted-foreground">Звонок 24/7</div>
                </Card>
              </a>
              <a href="https://wa.me/79185875454" target="_blank" rel="noreferrer" className="block">
                <Card className="p-5 transition-colors hover:border-emerald">
                  <MessageCircleIcon className="mb-3 h-6 w-6 text-emerald" />
                  <div className="mb-1 text-sm uppercase text-muted-foreground">WhatsApp</div>
                  <div className="text-lg font-semibold">+7 (918) 587-54-54</div>
                  <div className="mt-1 text-xs text-muted-foreground">Ответ за 5 минут</div>
                </Card>
              </a>
              <a href="https://t.me/ZakazMinivena" target="_blank" rel="noreferrer" className="block">
                <Card className="p-5 transition-colors hover:border-emerald">
                  <TelegramIcon className="mb-3 h-6 w-6 text-emerald" />
                  <div className="mb-1 text-sm uppercase text-muted-foreground">Telegram</div>
                  <div className="text-lg font-semibold">@zakazminivena</div>
                  <div className="mt-1 text-xs text-muted-foreground">Ответ за 5 минут</div>
                </Card>
              </a>
              <a href="mailto:info@zakazminivena.ru" className="block">
                <Card className="p-5 transition-colors hover:border-emerald">
                  <MailIcon className="mb-3 h-6 w-6 text-emerald" />
                  <div className="mb-1 text-sm uppercase text-muted-foreground">Email</div>
                  <div className="text-lg font-semibold">info@zakazminivena.ru</div>
                  <div className="mt-1 text-xs text-muted-foreground">Ответ в течение дня</div>
                </Card>
              </a>
            </div>

            <h2 className="mb-4 text-xl font-semibold">График работы</h2>
            <ul className="mb-10 space-y-2 text-sm">
              <li>
                <span className="font-medium">Диспетчер по заказам:</span> 24/7
              </li>
              <li>
                <span className="font-medium">B2B-менеджер (договоры, постоплата):</span> понедельник–пятница 9:00–19:00 (МСК)
              </li>
              <li>
                <span className="font-medium">Email-поддержка:</span> 9:00–22:00 (МСК), ответ в течение дня
              </li>
            </ul>

            <h2 className="mb-4 text-xl font-semibold">Реквизиты</h2>
            <Card className="p-5">
              <p className="text-sm">
                <span className="font-medium">ИП Макаренко В.П.</span>
                <br />
                ИНН: 616306789012
                <br />
                ОГРНИП: 318612300012345
                <br />
                Юридический адрес: г. Ростов-на-Дону
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Реквизиты могут быть устаревшими — уточняйте у менеджера при заключении договора.
              </p>
            </Card>

            <div className="mt-10">
              <Link
                href="/b2b"
                className="inline-block rounded-md bg-emerald px-5 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90"
              >
                Узнать про корпоративные условия →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
