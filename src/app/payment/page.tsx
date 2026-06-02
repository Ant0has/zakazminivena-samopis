import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { PaymentMethods } from "@/components/PaymentMethods";

export const metadata: Metadata = {
  title: "Способы оплаты минивэна — наличные, карта, безнал | ЗаказМинивэна.ru",
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
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Способы оплаты</h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              Принимаем все основные способы — выбирайте удобный. Для юрлиц — полный пакет
              документов и постоплата в течение 5 рабочих дней.
            </p>
          </div>
        </section>

        <PaymentMethods
          title="Способы оплаты"
          intro="Карта, СБП, наличные водителю, безналичный перевод для юрлиц. После 3 поездок открываем постоплату в течение 5 рабочих дней."
        />

        <section className="border-y bg-muted/40 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">Документы для юрлиц</h2>
            <p className="text-base leading-7 text-muted-foreground">
              По запросу предоставляем договор оферты или индивидуальный договор, счёт на оплату,
              акт оказания услуг, УПД, ККТ-чек электронный, путевой лист (для машин 9+ мест). С НДС
              или без — по требованию вашей бухгалтерии.
            </p>
            <Link
              href="/documents"
              className="mt-5 inline-block rounded-md bg-emerald px-5 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90"
            >
              Все документы →
            </Link>
          </div>
        </section>

        <B2bCtaBlock />
      </main>
      <Footer />
    </div>
  );
}
