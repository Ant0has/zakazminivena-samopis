import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { CheckIcon, HandshakeIcon, FileTextIcon, BanknoteIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Партнёрская программа для турагентств — 10% комиссия | ЗаказМинивена.ru",
  description:
    "Партнёрская программа для турагентств, гидов, отелей. Комиссия 10% за каждого клиента. Договор, отчёты, прозрачные выплаты.",
  alternates: { canonical: "https://zakazminivena.ru/partnership" },
};

export default function PartnershipPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Партнёрство" }]} />
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Партнёрская программа для турагентств
            </h1>
            <p className="mb-8 text-base text-muted-foreground">
              Комиссия 10% от заказа за каждого клиента. Договор, прозрачные выплаты, доступ к
              календарю занятости. Подходит турагентствам, гидам и отелям.
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4">
                <HandshakeIcon className="mb-2 h-6 w-6 text-emerald" />
                <div className="text-sm font-semibold">Комиссия 10%</div>
                <div className="text-xs text-muted-foreground">от каждого заказа</div>
              </Card>
              <Card className="p-4">
                <FileTextIcon className="mb-2 h-6 w-6 text-emerald" />
                <div className="text-sm font-semibold">Договор</div>
                <div className="text-xs text-muted-foreground">с ИП или юрлицом</div>
              </Card>
              <Card className="p-4">
                <BanknoteIcon className="mb-2 h-6 w-6 text-emerald" />
                <div className="text-sm font-semibold">Выплаты раз в месяц</div>
                <div className="text-xs text-muted-foreground">на расчётный счёт</div>
              </Card>
              <Card className="p-4">
                <CheckIcon className="mb-2 h-6 w-6 text-emerald" />
                <div className="text-sm font-semibold">Прозрачная отчётность</div>
                <div className="text-xs text-muted-foreground">Excel за каждый месяц</div>
              </Card>
            </div>

            <h2 className="mb-3 text-xl font-semibold">Условия</h2>
            <ul className="mb-6 space-y-2 text-sm">
              <li>• Комиссия 10% от чека (по факту оплаты клиентом)</li>
              <li>• Без минимального объёма поездок</li>
              <li>• Выплата раз в месяц (до 10 числа следующего месяца)</li>
              <li>• Договор с ИП или юрлицом</li>
              <li>• Промокод партнёра или уникальная UTM-ссылка</li>
              <li>• Отчётность в формате Excel за каждый месяц</li>
            </ul>

            <h2 className="mb-3 text-xl font-semibold">Кому подходит</h2>
            <ul className="mb-6 space-y-2 text-sm">
              <li>• Турагентствам — продаёте туры с трансфером, мы возим</li>
              <li>• Туроператорам — групповые программы с минивэном</li>
              <li>• Гидам — рекомендуете клиентам трансфер</li>
              <li>• Отелям — рекомендуете трансфер с/в аэропорт</li>
            </ul>

            <h2 className="mb-3 text-xl font-semibold">Как мы работаем</h2>
            <ol className="mb-6 list-decimal space-y-2 pl-5 text-sm">
              <li>Оставляете заявку с реквизитами агентства</li>
              <li>Согласовываем договор за 1–2 рабочих дня</li>
              <li>Получаете промокод и UTM-ссылку</li>
              <li>Передаёте клиентам</li>
              <li>Раз в месяц — отчёт + выплата комиссии</li>
            </ol>

            <Link
              href="/contacts"
              className="inline-block rounded-md bg-emerald px-5 py-3 text-sm font-medium text-emerald-foreground hover:bg-emerald/90"
            >
              Стать партнёром →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
