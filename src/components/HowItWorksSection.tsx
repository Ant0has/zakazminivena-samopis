import {
  MessageSquareIcon,
  CalculatorIcon,
  CalendarCheckIcon,
  CarIcon,
} from "lucide-react";

const steps = [
  {
    num: 1,
    icon: MessageSquareIcon,
    title: "Напишите маршрут",
    description:
      "Укажите откуда и куда, дату и количество пассажиров в Telegram или по телефону",
  },
  {
    num: 2,
    icon: CalculatorIcon,
    title: "Получите цену",
    description:
      "За 5 минут назовём фиксированную стоимость поездки — без скрытых доплат",
  },
  {
    num: 3,
    icon: CalendarCheckIcon,
    title: "Подтвердите бронь",
    description:
      "Без предоплаты. Просто подтвердите дату и время — водитель будет назначен",
  },
  {
    num: 4,
    icon: CarIcon,
    title: "Поездка",
    description:
      "Водитель приедет вовремя. Оплата по факту наличными или переводом",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Как заказать минивэн
          </h2>
          <p className="mt-3 text-muted-foreground">
            4 простых шага — от заявки до поездки
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Connecting line - desktop only */}
          <div className="absolute left-0 right-0 top-8 hidden h-px border-t-2 border-dashed border-emerald/20 sm:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/10">
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-xs font-bold text-white">
                    {step.num}
                  </span>
                  <step.icon className="h-7 w-7 text-emerald" />
                </div>
                <h3 className="mb-2 text-base font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
