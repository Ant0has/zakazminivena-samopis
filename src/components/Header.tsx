"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, PhoneIcon, MailIcon, ClockIcon, MoonIcon } from "lucide-react";
import { TelegramIcon, MaxIcon } from "@/components/icons";

const navLinks = [
  { href: "/airport", label: "Аэропорты" },
  { href: "/destination", label: "Направления" },
  { href: "/service", label: "Сценарии" },
  { href: "/cities", label: "Города" },
  { href: "/fleet", label: "Автопарк" },
  { href: "/tariffs", label: "Тарифы" },
  { href: "/b2b", label: "Для бизнеса" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8 xl:gap-4">
        {/* Лого + название */}
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="ЗаказМинивэна.ru">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt=""
            width={480}
            height={414}
            className="h-10 w-auto shrink-0"
          />
          <span className="hidden text-base font-semibold tracking-tight lg:inline-block xl:text-lg">
            ЗаказМинивэна<span className="text-emerald">.ru</span>
          </span>
        </Link>

        {/* Телефон */}
        <a
          href="tel:+79185875454"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald/30 bg-emerald/5 px-2 py-2 text-sm font-semibold text-emerald transition-colors hover:bg-emerald/10 sm:px-3 lg:flex-none lg:px-3"
          aria-label="Позвонить +7 (918) 587-54-54"
        >
          <PhoneIcon className="h-4 w-4 shrink-0" />
          <span className="truncate">+7 (918) 587-54-54</span>
        </a>

        {/* Почта — десктоп */}
        <a
          href="mailto:mini@zakazminivena.ru"
          className="hidden items-center gap-1.5 rounded-lg border border-emerald/20 bg-emerald/5 px-3 py-2 text-sm font-medium text-emerald transition-colors hover:bg-emerald/10 lg:inline-flex"
        >
          <MailIcon className="h-4 w-4 shrink-0" />
          <span className="hidden xl:inline">mini@zakazminivena.ru</span>
          <span className="xl:hidden">Почта</span>
        </a>

        {/* Время работы — десктоп */}
        <div className="hidden flex-col gap-0.5 text-[11px] leading-tight text-muted-foreground lg:flex">
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3 w-3 text-emerald" />
            Заказы: <strong className="font-semibold text-foreground">08:00 — 22:00</strong>
          </span>
          <span className="inline-flex items-center gap-1">
            <MoonIcon className="h-3 w-3 text-emerald" />
            Трансферы: <strong className="font-semibold text-foreground">24/7</strong>
          </span>
        </div>

        {/* Мессенджеры */}
        <div className="flex shrink-0 items-center gap-1">
          <a
            href="https://t.me/ZakazMinivena"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#26A5E4] transition-colors hover:bg-[#26A5E4]/10"
            aria-label="Telegram"
          >
            <TelegramIcon className="h-5 w-5" />
          </a>
          <a
            href="https://max.ru/zakazminivena"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#0077FF] transition-colors hover:bg-[#0077FF]/10"
            aria-label="MAX"
          >
            <MaxIcon className="h-5 w-5" />
          </a>
        </div>

        {/* Бургер-меню */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background">
            <SheetHeader>
              <SheetTitle className="text-left">
                ЗаказМинивэна<span className="text-emerald">.ru</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-secondary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-border px-4 pt-4 pb-6">
              <a
                href="tel:+79185875454"
                className="flex items-center gap-3 rounded-lg bg-emerald/5 px-3 py-3 text-base font-semibold text-emerald transition-colors hover:bg-emerald/10"
              >
                <PhoneIcon className="h-5 w-5" />
                +7 (918) 587-54-54
              </a>
              <a
                href="mailto:mini@zakazminivena.ru"
                className="mt-2 flex items-center gap-3 rounded-lg bg-emerald/5 px-3 py-3 text-sm font-medium text-emerald transition-colors hover:bg-emerald/10"
              >
                <MailIcon className="h-4 w-4" />
                mini@zakazminivena.ru
              </a>
              <div className="mt-3 space-y-1.5 px-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="h-3.5 w-3.5 text-emerald" />
                  Приём заказов: <strong className="font-semibold text-foreground">08:00 — 22:00</strong> ежедневно
                </div>
                <div className="flex items-center gap-1.5">
                  <MoonIcon className="h-3.5 w-3.5 text-emerald" />
                  Трансферы: <strong className="font-semibold text-foreground">круглосуточно</strong>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <a
                  href="https://t.me/ZakazMinivena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#26A5E4]/10 text-sm font-medium text-[#26A5E4] transition-colors hover:bg-[#26A5E4]/20"
                >
                  <TelegramIcon className="h-4 w-4" />
                  Telegram
                </a>
                <a
                  href="https://max.ru/zakazminivena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#0077FF]/10 text-sm font-medium text-[#0077FF] transition-colors hover:bg-[#0077FF]/20"
                >
                  <MaxIcon className="h-4 w-4" />
                  MAX
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
