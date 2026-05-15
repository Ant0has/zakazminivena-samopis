import { ChevronDown } from "lucide-react";
import { VehiclePlaceholder } from "@/components/VehiclePlaceholder";

// Таблица тарифа + фото машины + доп.услуги (паттерн 7).

export interface TariffRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface TariffTableProps {
  modelName?: string;
  modelImage?: string;
  /** Заголовок секции */
  title?: string;
  /** Базовый тариф — ожидание, остановки, ночь */
  baseFare: TariffRow[];
  /** Дополнительные услуги — раскрывающийся блок */
  extras?: TariffRow[];
}

export function TariffTable({
  modelName = "Минивэн",
  modelImage,
  title = "Тариф и дополнительные услуги",
  baseFare,
  extras = [],
}: TariffTableProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Что включено в базовую цену и сколько стоят доп.опции
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr] lg:gap-12 lg:items-start">
          {/* Левая колонка — таблица */}
          <div>
            <div className="rounded-2xl border bg-card p-1">
              <div className="rounded-xl bg-muted/40 px-5 py-3">
                <div className="text-sm font-semibold">Тариф {modelName}</div>
              </div>
              <ul className="divide-y">
                {baseFare.map((row) => (
                  <li
                    key={row.label}
                    className={`flex items-center justify-between px-5 py-3 text-sm ${
                      row.highlight ? "bg-emerald/5" : ""
                    }`}
                  >
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className={`font-semibold ${row.highlight ? "text-emerald" : ""}`}>
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {extras.length > 0 && (
              <details className="group mt-5 rounded-2xl border bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-medium">
                  <span>Дополнительные услуги ({extras.length})</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="divide-y border-t">
                  {extras.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between px-5 py-3 text-sm"
                    >
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-semibold">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>

          {/* Правая колонка — фото машины + перечень */}
          <aside className="space-y-4">
            <VehiclePlaceholder
              src={modelImage}
              modelName={modelName}
              variant="light"
              className="aspect-[4/3]"
            />
            <div className="rounded-2xl border bg-card p-5">
              <div className="text-sm font-semibold">Что включено в базу</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>· Подача в указанную точку</li>
                <li>· Бесплатное ожидание 60 мин при задержке рейса</li>
                <li>· Детское кресло (бустер / 9–18 / 18–36 кг)</li>
                <li>· Помощь с багажом</li>
                <li>· ККТ-чек электронный</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// Дефолтные строки тарифа для использования по умолчанию.
export function defaultBaseFare(): TariffRow[] {
  return [
    { label: "Ожидание при подаче 15 минут", value: "Бесплатно", highlight: true },
    { label: "1 час ожидания", value: "1 000 ₽" },
    { label: "Остановка в пути более 15 минут", value: "1 000 ₽" },
    { label: "Ночной тариф (00:00–06:00)", value: "+20%" },
  ];
}

export function defaultExtras(): TariffRow[] {
  return [
    { label: "Детское кресло (бустер / автокресло)", value: "Бесплатно" },
    { label: "Встреча с табличкой в аэропорту", value: "Бесплатно" },
    { label: "Встреча у вагона на ж/д вокзале", value: "800 ₽" },
    { label: "Помощь с багажом", value: "Бесплатно" },
    { label: "Животное в переноске", value: "Бесплатно" },
    { label: "Собака до 10 кг", value: "1 000 ₽" },
    { label: "Собака 10–25 кг", value: "1 500 ₽" },
    { label: "Дополнительный адрес посадки/высадки", value: "500 ₽" },
  ];
}
