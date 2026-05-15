import type { LucideIcon } from "lucide-react";
import { Check, Lightbulb } from "lucide-react";

// Лонгрид «Всё, что нужно знать о поездке» (паттерн 3).
// Разбит на секции с иконками, каждая может иметь параграф, выноску-совет и/или список с ✓.

export interface LongreadSection {
  icon: LucideIcon;
  title: string;
  paragraph?: string;
  /** Выноска «💡 Совет» внутри секции — светло-зелёная плашка */
  callout?: string;
  /** Список «преимуществ» с зелёным ✓ */
  list?: Array<{ title: string; description?: string }>;
}

interface RouteFactsLongreadProps {
  title: string;
  /** Опциональный подзаголовок-вступление */
  intro?: string;
  sections: LongreadSection[];
}

export function RouteFactsLongread({ title, intro, sections }: RouteFactsLongreadProps) {
  return (
    <section className="bg-muted/40 border-y py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
              {intro}
            </p>
          )}
        </header>

        <div className="space-y-12">
          {sections.map((s) => (
            <LongreadBlock key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LongreadBlock({
  icon: Icon,
  title,
  paragraph,
  callout,
  list,
}: LongreadSection) {
  return (
    <article>
      <div className="mb-4 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold uppercase tracking-wide text-emerald sm:text-lg">
          {title}
        </h3>
      </div>

      {paragraph && (
        <p className="mb-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          {paragraph}
        </p>
      )}

      {callout && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald/20 bg-emerald/5 p-4 text-sm sm:text-base">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
          <span className="leading-6">
            <strong className="font-semibold text-emerald">Совет:</strong> {callout}
          </span>
        </div>
      )}

      {list && list.length > 0 && (
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {list.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald" strokeWidth={2.5} />
              <span className="text-sm leading-6 sm:text-base">
                <strong className="font-semibold">{item.title}</strong>
                {item.description && (
                  <span className="text-muted-foreground">: {item.description}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
