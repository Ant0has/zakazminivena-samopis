"use client";

import { PhoneIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";

export function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-lg sm:hidden">
      <div className="flex h-14 items-stretch">
        <a
          href="tel:+79185875454"
          className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold transition-colors active:bg-secondary"
        >
          <PhoneIcon className="h-5 w-5 text-emerald" />
          Позвонить
        </a>
        <div className="w-px bg-border" />
        <a
          href="https://t.me/zakazminivena"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-[#26A5E4] text-sm font-semibold text-white transition-colors active:bg-[#26A5E4]/90"
        >
          <TelegramIcon className="h-5 w-5" />
          Написать
        </a>
      </div>
    </div>
  );
}
