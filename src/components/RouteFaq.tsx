// FAQ-блок с Schema.org микроразметкой и аккордеоном (паттерн 3 из best-practices).

import { HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface RouteFaqProps {
  title?: string;
  intro?: string;
  items: FaqItem[];
  bg?: "default" | "muted";
}

export function RouteFaq({
  title = "Частые вопросы",
  intro,
  items,
  bg = "muted",
}: RouteFaqProps) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className={`py-16 sm:py-20 ${bg === "muted" ? "bg-muted/40 border-y" : ""}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {intro && (
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{intro}</p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((it, idx) => (
            <details
              key={it.q}
              className="group rounded-xl border bg-card p-5 transition-colors open:border-emerald/40"
              open={idx === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="text-base font-semibold leading-6 sm:text-lg">{it.q}</span>
                <span
                  aria-hidden
                  className="ml-auto inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
