import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReviewsSection } from "@/components/ReviewsSection";
import { blogPosts } from "@/lib/blog-data";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Блог о минивэнах и трансферах | ЗаказМинивена.ru",
  description:
    "Полезные статьи о путешествиях на минивэне, советы по организации трансфера, сравнение видов транспорта, обзоры маршрутов по России.",
  openGraph: {
    title: "Блог о минивэнах и трансферах",
    description:
      "Полезные статьи о путешествиях на минивэне, советы по организации трансфера, сравнение видов транспорта, обзоры маршрутов по России.",
    url: "https://zakazminivena.ru/blog",
    siteName: "ЗаказМинивена.ru",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://zakazminivena.ru/blog",
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default function BlogPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Блог ЗаказМинивена.ru",
    description:
      "Полезные статьи о путешествиях на минивэне, советы по организации трансфера и обзоры маршрутов.",
    url: "https://zakazminivena.ru/blog",
    publisher: {
      "@type": "Organization",
      name: "ЗаказМинивена.ru",
      url: "https://zakazminivena.ru",
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `https://zakazminivena.ru/blog/${post.slug}`,
      image: `https://zakazminivena.ru${post.image}`,
    })),
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Блог" },
              ]}
            />

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Блог о минивэнах и трансферах
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Полезные статьи, советы путешественникам и обзоры маршрутов по
              России. Всё, что нужно знать о поездках на минивэне.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-emerald/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-sm"
                      >
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      {formatDate(post.date)}
                    </div>
                    <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-emerald transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ReviewsSection tags={["intercity", "airport"]} title="Отзывы наших клиентов" />
      </main>
      <Footer />
    </>
  );
}
