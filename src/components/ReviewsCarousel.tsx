"use client";

import { useEffect, useRef, useState } from "react";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { Review } from "@/lib/reviews-data";

interface ReviewsCarouselProps {
  title?: string;
  subtitle?: string;
  reviews: Review[];
  /** Авто-прокрутка через N мс. 0 — выключить. */
  autoPlayMs?: number;
}

function formatDate(iso: string): string {
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  const d = new Date(iso);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ReviewsCarousel({
  title = "Отзывы клиентов",
  subtitle = "Реальные истории поездок за последние 2 года",
  reviews,
  autoPlayMs = 5000,
}: ReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Авто-прокрутка вправо. Когда дошли до конца — мягко перематываем в начало.
  useEffect(() => {
    if (!autoPlayMs || paused) return;
    const el = scrollRef.current;
    if (!el) return;
    const id = setInterval(() => {
      if (!scrollRef.current) return;
      const node = scrollRef.current;
      const cardWidth = node.firstElementChild
        ? (node.firstElementChild as HTMLElement).offsetWidth + 16
        : 360;
      if (node.scrollLeft + node.clientWidth >= node.scrollWidth - 10) {
        node.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        node.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, paused]);

  function step(dir: 1 | -1) {
    const node = scrollRef.current;
    if (!node) return;
    const cardWidth = node.firstElementChild
      ? (node.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    node.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  }

  // Schema.org разметка для отзывов — рендерим первые 10 для rich snippet'ов
  // (Google не рекомендует слишком много, плюс RSS-нагрузка). Среднее тащим из
  // фактической базы — пересчёт делает страница, мы здесь не дублируем рейтинг.
  const reviewsForLd = reviews.slice(0, 10).map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewBody: r.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(r.rating),
      bestRating: "5",
      worstRating: "1",
    },
    ...(r.route ? { itemReviewed: { "@type": "Service", name: r.route } } : {}),
  }));
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    numberOfItems: reviews.length,
    itemListElement: reviewsForLd.map((rev, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: rev,
    })),
  };

  return (
    <section className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-2 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-emerald hover:text-emerald"
              aria-label="Предыдущий отзыв"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:border-emerald hover:text-emerald"
              aria-label="Следующий отзыв"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 3000)}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]"
          style={{ scrollbarColor: "var(--border) transparent" }}
        >
          {reviews.map((r, idx) => (
            <article
              key={`${r.name}-${r.date}-${idx}`}
              className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border bg-card p-5 shadow-sm sm:w-[420px] sm:p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-sm font-bold text-emerald">
                  {initials(r.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold leading-tight">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {r.city} · {formatDate(r.date)}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {r.route && (
                <div className="mb-3 inline-flex w-fit items-center rounded-md bg-emerald/10 px-2 py-0.5 text-xs font-medium text-emerald">
                  {r.route}
                </div>
              )}

              <p className="grow text-sm leading-6 text-foreground/85">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
