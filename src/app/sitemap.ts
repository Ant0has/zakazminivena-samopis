import type { MetadataRoute } from "next";
import { allRoutes, allCities, allAirports } from "@/lib/routes-data";
import { blogPosts } from "@/lib/blog-data";
import { seasonalPages } from "@/lib/seasonal-data";
import { comparisons } from "@/lib/comparison-data";

const BASE = "https://zakazminivena.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/routes`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/cities`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/airports`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/tariffs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/b2b`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/fleet`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/airport`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/children`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/group-transfer`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/services/wedding`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/yandex-taxi-minivan`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/seasonal`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const seasonalPageEntries: MetadataRoute.Sitemap = seasonalPages.map((p) => ({
    url: `${BASE}/seasonal/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const routePages: MetadataRoute.Sitemap = allRoutes.map((r) => ({
    url: `${BASE}/routes/${r.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = allCities.map((c) => ({
    url: `${BASE}/cities/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const airportPages: MetadataRoute.Sitemap = allAirports.map((a) => ({
    url: `${BASE}/airports/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const comparePages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE}/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...seasonalPageEntries, ...routePages, ...cityPages, ...airportPages, ...blogPages, ...comparePages];
}
