import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Card } from "@/components/ui/card";
import { CreditCardIcon, BanknoteIcon, ShieldCheckIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Способы оплаты минивэна — наличные, карта, безнал | ЗаказМинивена.ru",
  description:
    "Способы оплаты заказа минивэна: онлайн картой, СБП, наличные, безналичный перевод для юрлиц. Постоплата для B2B клиентов после 3 поездок.",
  alternates: { canonical: "https://zakazminivena.ru/payment" },
};

export default function PaymentPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Оплата" }]} />
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Способы оплаты</h1>
            <p className="mb-8 text-base text-muted-foreground">
              Принимаем все основные способы: онлайн картой, СБП по номеру телефона, наличные водителю,
              банковский перевод для юрлиц. Для постоянных корпоративных клиентов — постоплата до 14 дней.
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              <Card className="p-5">
                <CreditCardIcon className="mb-3 h-6 w-6 text-emerald" />
                <h3 className="mb-2 font-semibold">Картой онлайн</h3>
                <p className="text-sm text-muted-foreground">
                  Оплата через защищённую платёжную форму (Юкасса/Тинькофф). Карты МИР, Visa, Mastercard.
                </p>
              </Card>
              <Card className="p-5">
                <BanknoteIcon className="mb-3 h-6 w-6 text-emerald" />
                <h3 className="mb-2 font-semibold">СБП по номеру телефона</h3>
                <p className="text-sm text-muted-foreground">
                  Быстрый перевод СБП по номеру телефона менеджера. Без комиссии для отправителя.
                </p>
              </Card>
              <Card className="p-5">
                <BanknoteIcon className="mb-3 h-6 w-6 text-emerald" />
                <h3 className="mb-2 font-semibold">Наличными водителю</h3>
                <p className="text-sm text-muted-foreground">
                  Расчёт после поездки. Чек ККТ — на email или в Telegram сразу же.
                </p>
              </Card>
              <Card className="p-5">
                <ShieldCheckIcon className="mb-3 h-6 w-6 text-emerald" />
                <h3 className="mb-2 font-semibold">Безналичный перевод (для юрлиц)</h3>
                <p className="text-sm text-muted-foreground">
                  По реквизитам после выставления счёта. Договор, счёт, акт, УПД — по запросу.
                </p>
              </Card>
            </div>

            <h2 className="mb-3 text-xl font-semibold">Постоплата для B2B</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              После 3 оплаченных поездок — постоплата до 14 дней. Лимит — по согласованию.
              Просрочка не блокирует следующие заказы, но снижает лимит.
            </p>

            <h2 className="mb-3 text-xl font-semibold">Безопасность платежа</h2>
            <ul className="mb-6 space-y-2 text-sm">
              <li>• Платёжная форма соответствует PCI DSS</li>
              <li>• Реквизиты карты не хранятся на стороне сайта</li>
              <li>• Чек ККТ электронный — на email или SMS</li>
              <li>• Возврат при отмене за 24 часа — полный, за 6 часов — 50%</li>
            </ul>
          </div>
        </section>
        <B2bCtaBlock />
      </main>
      <Footer />
    </div>
  );
}
