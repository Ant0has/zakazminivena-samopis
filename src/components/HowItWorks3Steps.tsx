import Image from "next/image";
import { Smartphone, PhoneCall, MessageSquare } from "lucide-react";

// «Как заказать» в 3 шага с iPhone-мокапами (паттерн 9).

export interface HowItWorksStep {
  number: 1 | 2 | 3;
  title: string;
  description: string;
  /** Опциональный скрин экрана для рамки телефона */
  mockupImage?: string;
  /** Иконка-заглушка вместо мокапа */
  iconFallback?: "form" | "call" | "sms";
}

interface HowItWorks3StepsProps {
  title?: string;
  subtitle?: string;
  steps?: HowItWorksStep[];
  bg?: "default" | "muted";
}

const DEFAULT_STEPS: HowItWorksStep[] = [
  {
    number: 1,
    title: "Отправьте онлайн-заявку",
    description: "Заполните форму на сайте или напишите в WhatsApp/Telegram",
    iconFallback: "form",
  },
  {
    number: 2,
    title: "Вам перезвонит менеджер",
    description: "В течение 5 минут подтвердит фикс цену и пришлёт контакт водителя",
    iconFallback: "call",
  },
  {
    number: 3,
    title: "Поступит сообщение с информацией",
    description: "Модель машины, госномер, имя водителя и точное место встречи",
    iconFallback: "sms",
  },
];

export function HowItWorks3Steps({
  title = "Оформить заказ быстро и удобно",
  subtitle = "Три шага от заявки до встречи с водителем",
  steps = DEFAULT_STEPS,
  bg = "default",
}: HowItWorks3StepsProps) {
  return (
    <section className={`py-16 sm:py-20 ${bg === "muted" ? "bg-muted/40 border-y" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: HowItWorksStep }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* iPhone-frame */}
      <div className="relative mx-auto mb-6 w-56 max-w-full">
        <div className="relative rounded-[2.25rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-900" />
          <div className="aspect-[9/19] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-50 to-slate-100">
            {step.mockupImage ? (
              <Image
                src={step.mockupImage}
                alt={step.title}
                width={360}
                height={780}
                className="h-full w-full object-cover"
              />
            ) : (
              <MockupFallback variant={step.iconFallback ?? "form"} />
            )}
          </div>
        </div>
      </div>

      {/* Step number badge */}
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald text-base font-bold text-emerald-foreground shadow-lg shadow-emerald/30">
        {step.number}
      </div>

      <h3 className="text-lg font-semibold">{step.title}</h3>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">{step.description}</p>
    </div>
  );
}

function MockupFallback({ variant }: { variant: "form" | "call" | "sms" }) {
  if (variant === "form") {
    return (
      <div className="flex h-full flex-col p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2 w-12 rounded bg-slate-300" />
          <Smartphone className="h-3 w-3 text-slate-400" />
        </div>
        <div className="space-y-2.5">
          <div className="h-2.5 w-3/4 rounded bg-slate-200" />
          <div className="h-9 w-full rounded-md bg-white ring-1 ring-slate-200" />
          <div className="h-9 w-full rounded-md bg-white ring-1 ring-slate-200" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 rounded-md bg-white ring-1 ring-slate-200" />
            <div className="h-9 rounded-md bg-white ring-1 ring-slate-200" />
          </div>
          <div className="h-9 w-full rounded-md bg-white ring-1 ring-slate-200" />
          <div className="mt-2 h-10 w-full rounded-md bg-emerald" />
        </div>
      </div>
    );
  }
  if (variant === "call") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-emerald/10 to-emerald/5 p-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald text-white shadow-lg">
          <PhoneCall className="h-7 w-7" />
        </div>
        <div className="text-center">
          <div className="text-xs font-semibold">Менеджер</div>
          <div className="mt-1 text-[10px] text-slate-500">Входящий вызов…</div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-red-500/90" />
          <div className="h-9 w-9 rounded-full bg-emerald" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[10px] font-medium text-slate-600">Минивэн ru</div>
        <MessageSquare className="h-3 w-3 text-slate-400" />
      </div>
      <div className="space-y-2">
        <div className="ml-auto w-2/3 rounded-2xl rounded-tr-sm bg-emerald/15 p-2 text-[9px] leading-tight text-slate-700">
          Заказ подтверждён. VW Caravelle. Водитель свяжется за 30 мин до подачи.
        </div>
        <div className="w-2/3 rounded-2xl rounded-tl-sm bg-slate-200 p-2 text-[9px] leading-tight text-slate-700">
          А777АА · Алексей · +7 918 ...
        </div>
      </div>
    </div>
  );
}
