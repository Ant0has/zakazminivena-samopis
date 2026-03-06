"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneIcon } from "lucide-react";
import { TelegramIcon, MaxIcon } from "@/components/icons";

export function CTASection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald/3 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-emerald/20 bg-card p-6 shadow-sm sm:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
              {/* Left: Quick contact */}
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Заказать минивэн
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Напишите нам в мессенджер или позвоните — ответим за 5 минут
                </p>

                <div className="mt-8 flex flex-col gap-3">
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
                    className="h-14 bg-[#0077FF] text-base font-semibold text-white hover:bg-[#0077FF]/90"
                    asChild
                  >
                    <a href="https://max.ru/zakazminivena">
                      <MaxIcon className="mr-2 h-5 w-5" />
                      Написать в MAX
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 text-base font-semibold"
                    asChild
                  >
                    <a href="tel:+79185875454">
                      <PhoneIcon className="mr-2 h-5 w-5 text-emerald" />
                      +7 (918) 587-54-54
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <h3 className="mb-6 text-lg font-semibold">
                  Или оставьте заявку
                </h3>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      className="h-11 bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="h-11 bg-secondary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route">Маршрут</Label>
                    <Input
                      id="route"
                      placeholder="Откуда — Куда"
                      className="h-11 bg-secondary"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="mt-2 h-12 bg-emerald text-base font-semibold text-emerald-foreground hover:bg-emerald/90"
                  >
                    Отправить заявку
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/privacy" className="underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
