import { CheckIcon, XIcon } from "lucide-react";

export function PriceComparisonSection() {
  // Екатеринбург — Челябинск, 210 км
  // Минивэн: 210 × 60 = 12 600 руб (за всех)
  // 2 такси: ~7 000 × 2 = 14 000 руб
  return (
    <section className="relative py-20 sm:py-28" id="prices">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Минивэн дешевле, чем 2 такси
          </h2>
          <p className="mt-3 text-muted-foreground">
            Сравните на примере маршрута Екатеринбург — Челябинск (210 км)
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Taxi option - bad */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8">
            <div className="mb-6 text-sm font-medium uppercase tracking-wider text-destructive/70">
              2 обычных такси
            </div>
            <div className="mb-2 text-4xl font-bold text-destructive/80 line-through decoration-2 sm:text-5xl">
              14 000 <span className="text-2xl">руб.</span>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              2 машины x 7 000 руб.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <XIcon className="h-4 w-4 text-destructive/60" />
                Семья в разных машинах
              </li>
              <li className="flex items-center gap-2">
                <XIcon className="h-4 w-4 text-destructive/60" />
                Нет места для багажа
              </li>
              <li className="flex items-center gap-2">
                <XIcon className="h-4 w-4 text-destructive/60" />
                Детское кресло — доплата
              </li>
            </ul>
          </div>

          {/* Minivan option - good */}
          <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-6 sm:p-8">
            <div className="mb-6 text-sm font-medium uppercase tracking-wider text-emerald">
              1 минивэн — 7 мест
            </div>
            <div className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
              13 000 <span className="text-2xl text-emerald">руб.</span>
            </div>
            <p className="mb-6 text-sm text-emerald">
              1 857 руб/чел при 7 пассажирах
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-emerald" />
                Вся семья в одной машине
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-emerald" />
                Просторный багажник
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-emerald" />
                Детское кресло бесплатно
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg font-semibold">
            Экономия:{" "}
            <span className="text-gradient">1 000 руб.</span>
            {" "}+ все едут вместе
          </p>
        </div>
      </div>
    </section>
  );
}
