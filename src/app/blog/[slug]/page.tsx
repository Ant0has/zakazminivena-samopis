import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewsSection } from "@/components/ReviewsSection";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PhoneIcon, ArrowRightIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ЗаказМинивена.ru`,
    description: post.description,
    alternates: {
      canonical: `https://zakazminivena.ru/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `https://zakazminivena.ru/blog/${post.slug}`,
      images: [{ url: `https://zakazminivena.ru${post.image}` }],
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getRelatedPosts(currentSlug: string, currentTags: string[], count: number = 3) {
  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      relevance: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, count);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.tags);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `https://zakazminivena.ru${post.image}`,
    url: `https://zakazminivena.ru/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
    },
    publisher: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
      logo: {
        "@type": "ImageObject",
        url: "https://zakazminivena.ru/favicon.ico",
      },
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        {/* Hero image */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <article className="py-8 sm:py-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Блог", href: "/blog" },
                { label: post.title },
              ]}
            />

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>

            <div
              className="prose-custom mt-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* CTA block */}
        <section className="py-12 sm:py-16 bg-secondary/30">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Закажите минивэн прямо сейчас
            </h2>
            <p className="mt-3 text-muted-foreground">
              Рассчитаем стоимость за 5 минут. Фиксированная цена, комфортный
              автомобиль, опытный водитель.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://t.me/zakazminivena"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-emerald hover:bg-emerald/90 text-emerald-foreground gap-2">
                  <TelegramIcon className="h-5 w-5" />
                  Написать в Telegram
                </Button>
              </a>
              <a href="tel:+79185875454">
                <Button size="lg" variant="outline" className="gap-2">
                  <PhoneIcon className="h-4 w-4" />
                  +7 (918) 587-54-54
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
                Читайте также
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((relPost) => (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}`}
                    className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-emerald/40"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={relPost.image}
                        alt={relPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {relPost.category}
                        </Badge>
                        <span>{formatDate(relPost.date)}</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold leading-snug group-hover:text-emerald transition-colors">
                        {relPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ReviewsSection tags={post.tags} />
      </main>
      <Footer />
    </>
  );
}
