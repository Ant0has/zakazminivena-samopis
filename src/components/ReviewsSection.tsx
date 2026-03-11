import { StarIcon } from "lucide-react";
import { allReviews, type Review } from "@/lib/reviews-data";

interface ReviewsSectionProps {
  tags: string[];
  title?: string;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function selectReviews(tags: string[], count: number = 4): Review[] {
  // Score reviews by tag match count
  const scored = allReviews.map((review) => {
    const matchCount = tags.filter((tag) => review.tags.includes(tag)).length;
    return { review, matchCount };
  });

  // Filter to only reviews with at least one tag match
  const matching = scored.filter((s) => s.matchCount > 0);

  if (matching.length === 0) {
    // Fallback: return first N reviews from the general pool
    return allReviews.slice(0, count);
  }

  // Sort by match count descending
  matching.sort((a, b) => b.matchCount - a.matchCount);

  // Use deterministic hash to pick diverse reviews
  const tagKey = tags.sort().join(",");
  const seed = hashString(tagKey);

  // Group by match count tiers
  const topMatches = matching.filter((s) => s.matchCount === matching[0].matchCount);
  const otherMatches = matching.filter((s) => s.matchCount < matching[0].matchCount);

  const selected: Review[] = [];
  const usedIndices = new Set<number>();

  // Pick from top matches first using deterministic selection
  for (let i = 0; i < Math.min(count, topMatches.length); i++) {
    const idx = (seed + i * 7) % topMatches.length;
    // Find nearest unused
    let j = idx;
    let tries = 0;
    while (usedIndices.has(j) && tries < topMatches.length) {
      j = (j + 1) % topMatches.length;
      tries++;
    }
    if (!usedIndices.has(j)) {
      usedIndices.add(j);
      selected.push(topMatches[j].review);
    }
  }

  // Fill remaining from other matches
  if (selected.length < count && otherMatches.length > 0) {
    const remaining = count - selected.length;
    for (let i = 0; i < Math.min(remaining, otherMatches.length); i++) {
      const idx = (seed + i * 11) % otherMatches.length;
      selected.push(otherMatches[idx].review);
    }
  }

  return selected.slice(0, count);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-emerald text-emerald"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection({ tags, title = "Отзывы наших клиентов" }: ReviewsSectionProps) {
  const reviews = selectReviews(tags);

  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ЗаказМинивена.ru",
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.name },
      "datePublished": r.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating.toString(),
        "bestRating": "5",
      },
      "reviewBody": r.text,
    })),
  };

  return (
    <section className="py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-card p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{review.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {review.city} &middot; {formatDate(review.date)}
                  </div>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {review.text}
              </p>
              {review.route && (
                <div className="mt-3 text-xs text-emerald font-medium">
                  Маршрут: {review.route}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
