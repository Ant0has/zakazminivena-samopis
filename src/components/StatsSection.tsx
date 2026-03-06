const stats = [
  { value: "2 000+", label: "выполненных поездок" },
  { value: "67", label: "маршрутов по России" },
  { value: "21+", label: "регионов присутствия" },
  { value: "5 мин", label: "среднее время ответа" },
];

export function StatsSection() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Нам доверяют
        </h2>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/50 bg-card p-6 text-center"
            >
              <div className="text-3xl font-bold text-emerald sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
