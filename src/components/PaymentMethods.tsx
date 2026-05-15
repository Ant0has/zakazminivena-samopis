import type { LucideIcon } from "lucide-react";
import {
  CreditCard,
  Banknote,
  Smartphone,
  Building2,
  Clock,
  ShieldCheck,
} from "lucide-react";

// Виды оплаты (паттерн 11).

export interface PaymentMethod {
  icon: LucideIcon;
  title: string;
  description: string;
  badges?: string[];
}

interface PaymentMethodsProps {
  title?: string;
  intro?: string;
  methods?: PaymentMethod[];
}

const DEFAULT_METHODS: PaymentMethod[] = [
  {
    icon: CreditCard,
    title: "Картой онлайн",
    description: "Защищённая платёжная форма Юкассы или Тинькофф",
    badges: ["МИР", "Visa", "Mastercard", "СБП"],
  },
  {
    icon: Smartphone,
    title: "СБП по номеру телефона",
    description: "Быстрый перевод СБП в любой банк, без комиссии",
  },
  {
    icon: Banknote,
    title: "Наличными водителю",
    description: "После поездки. Чек ККТ электронный — на email или SMS сразу",
  },
  {
    icon: Building2,
    title: "Безналичный перевод (для юрлиц)",
    description: "По реквизитам. Договор, счёт, акт, УПД, ККТ-чек по запросу",
  },
  {
    icon: Clock,
    title: "Постоплата до 14 дней",
    description: "Для корпоративных клиентов после 3-х оплаченных поездок",
  },
];

export function PaymentMethods({
  title = "Виды оплаты",
  intro = "Принимаем все основные способы оплаты — выбирайте удобный. Для юрлиц — полный пакет документов и постоплата до 14 дней.",
  methods = DEFAULT_METHODS,
}: PaymentMethodsProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">{intro}</p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {methods.map((m) => (
            <li
              key={m.title}
              className="flex items-start gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-emerald/40"
            >
              <span
                aria-hidden
                className="mt-1 inline-flex h-3 w-3 shrink-0 rounded-sm bg-amber-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <m.icon className="h-5 w-5 text-emerald" />
                  <h3 className="font-semibold">{m.title}</h3>
                </div>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{m.description}</p>
                {m.badges && m.badges.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Security row */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald" />
            PCI DSS — реквизиты карты не хранятся
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald" />
            ККТ-чек электронный (54-ФЗ)
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald" />
            Возврат при отмене за 24 часа
          </span>
        </div>
      </div>
    </section>
  );
}
