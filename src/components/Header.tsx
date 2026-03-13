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
import { MenuIcon, PhoneIcon } from "lucide-react";
import { TelegramIcon, MaxIcon } from "@/components/icons";

const navLinks = [
  { href: "/routes", label: "Маршруты" },
  { href: "/cities", label: "Города" },
  { href: "/airports", label: "Аэропорты" },
  { href: "/fleet", label: "Автопарк" },
  { href: "/tariffs", label: "Тарифы" },
  { href: "/b2b", label: "Для бизнеса" },
  { href: "/about", label: "О нас" },
  { href: "/blog", label: "Блог" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald text-emerald-foreground font-bold text-sm">
            M
          </div>
          <span className="hidden text-lg font-semibold tracking-tight sm:inline-block">
            ЗаказМинивена
            <span className="text-emerald">.ru</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Mobile phone button - visible on small screens only */}
          <a
            href="tel:+79185875454"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-emerald transition-colors hover:bg-emerald/10 sm:hidden"
            aria-label="Позвонить"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <a
            href="https://t.me/zakazminivena"
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
          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right text-xs text-muted-foreground leading-tight">
              <div>Ежедневно</div>
              <div>08:00 — 22:00</div>
            </div>
            <a
              href="tel:+79185875454"
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <PhoneIcon className="h-4 w-4 text-emerald" />
              +7 (918) 587-54-54
            </a>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetHeader>
                <SheetTitle className="text-left">
                  ЗаказМинивена<span className="text-emerald">.ru</span>
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
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-secondary"
                >
                  <PhoneIcon className="h-5 w-5 text-emerald" />
                  +7 (918) 587-54-54
                </a>
                <div className="mt-3 flex gap-2 px-3">
                  <a
                    href="https://t.me/zakazminivena"
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
      </div>
    </header>
  );
}
