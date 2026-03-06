import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PhoneIcon, HomeIcon, MapPinIcon } from "lucide-react";
import { TelegramIcon, MaxIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="flex min-h-[70vh] items-center justify-center px-4 pt-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="mb-6 text-8xl font-bold text-emerald/20">404</div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Страница не найдена
          </h1>
          <p className="mt-3 text-muted-foreground">
            Возможно, страница была перемещена или вы перешли по неверной ссылке.
            Свяжитесь с нами — поможем найти нужный маршрут.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Button
              size="lg"
              className="h-12 bg-emerald text-base font-semibold text-emerald-foreground hover:bg-emerald/90"
              asChild
            >
              <Link href="/">
                <HomeIcon className="mr-2 h-5 w-5" />
                На главную
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 text-base font-semibold"
              asChild
            >
              <Link href="/routes">
                <MapPinIcon className="mr-2 h-5 w-5 text-emerald" />
                Все маршруты
              </Link>
            </Button>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <p className="mb-4 text-sm font-medium">
              Или напишите нам — подберём маршрут:
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button
                size="sm"
                className="bg-[#26A5E4] text-white hover:bg-[#26A5E4]/90"
                asChild
              >
                <a href="https://t.me/zakazminivena">
                  <TelegramIcon className="mr-2 h-4 w-4" />
                  Telegram
                </a>
              </Button>
              <Button
                size="sm"
                className="bg-[#0077FF] text-white hover:bg-[#0077FF]/90"
                asChild
              >
                <a href="https://max.ru/zakazminivena">
                  <MaxIcon className="mr-2 h-4 w-4" />
                  MAX
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="tel:+79185875454">
                  <PhoneIcon className="mr-2 h-4 w-4 text-emerald" />
                  +7 (918) 587-54-54
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
