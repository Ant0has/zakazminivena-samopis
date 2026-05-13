import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { B2bCtaBlock } from "@/components/B2bCtaBlock";
import { Card } from "@/components/ui/card";
import { FileTextIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Документы для отчётности — договор, счёт, акт, ККТ-чек | ЗаказМинивена.ru",
  description:
    "Документы при заказе минивэна для юрлиц: договор оферты или индивидуальный, счёт на оплату, акт, ККТ-чек электронный, УПД, путевой лист.",
  alternates: { canonical: "https://zakazminivena.ru/documents" },
};

const documents = [
  { name: "Договор оферты", desc: "Общий, доступен по запросу или скачивается с сайта. Действителен при оплате." },
  { name: "Индивидуальный договор", desc: "С НДС или без, с уникальными условиями. Готовится за 1–2 рабочих дня." },
  { name: "Счёт на оплату", desc: "С НДС или без — по запросу. На реквизиты вашей компании." },
  { name: "Акт оказания услуг", desc: "После завершения поездки. Электронный или оригинал по почте." },
  { name: "Универсальный передаточный документ (УПД)", desc: "По запросу, заменяет счёт-фактуру и акт." },
  { name: "ККТ-чек электронный", desc: "Сразу после оплаты — на email или SMS. Соответствует 54-ФЗ." },
  { name: "Путевой лист", desc: "Для машин 9+ мест — по запросу. Используется в строгой отчётности." },
];

export default function DocumentsPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Документы" }]} />
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Документы для отчётности
            </h1>
            <p className="mb-8 text-base text-muted-foreground">
              Минивэн с водителем — официальный сервис. Предоставляем все документы для бухгалтерии:
              договор, счёт, акт, ККТ-чек. Можем работать с НДС и без.
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              {documents.map((d) => (
                <Card key={d.name} className="p-5">
                  <FileTextIcon className="mb-3 h-6 w-6 text-emerald" />
                  <h3 className="mb-2 font-semibold">{d.name}</h3>
                  <p className="text-sm text-muted-foreground">{d.desc}</p>
                </Card>
              ))}
            </div>

            <h2 className="mb-3 text-xl font-semibold">Сроки</h2>
            <ul className="mb-6 space-y-2 text-sm">
              <li>• ККТ-чек — сразу после оплаты</li>
              <li>• Счёт на оплату — в течение дня</li>
              <li>• Договор — стандартная оферта сразу, индивидуальный 1–2 рабочих дня</li>
              <li>• Акт оказания услуг — в течение 3 рабочих дней после поездки</li>
              <li>• УПД — по запросу 1–2 рабочих дня</li>
            </ul>

            <h2 className="mb-3 text-xl font-semibold">С НДС или без?</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Уточняйте при оформлении договора. Можем работать в обоих режимах — указывайте требование
              вашей бухгалтерии. Если требование меняется по ходу сотрудничества — переоформляем договор.
            </p>

            <Link
              href="/b2b"
              className="inline-block rounded-md bg-emerald px-5 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90"
            >
              Запросить документы для моего случая →
            </Link>
          </div>
        </section>
        <B2bCtaBlock />
      </main>
      <Footer />
    </div>
  );
}
