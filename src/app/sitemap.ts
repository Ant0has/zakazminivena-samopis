import type { MetadataRoute } from "next";
import { allRoutes, allCities, allAirports } from "@/lib/routes-data";
import { blogPosts } from "@/lib/blog-data";
import { seasonalPages } from "@/lib/seasonal-data";
import { comparisons } from "@/lib/comparison-data";
import { b2bPillars } from "@/lib/b2b-data";
import { b2bCases } from "@/lib/b2b-cases-data";
import { iataAirports } from "@/lib/iata-airports";
import { airportRoutes } from "@/lib/airport-routes-data";
import { destinationHubs, destinationRoutes } from "@/lib/destinations-data";
import { fleetModels } from "@/lib/fleet-data";
import { servicesData } from "@/lib/services-data";

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
    { url: `${BASE}/b2b/cases`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/offer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/fleet`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/drivers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/services/airport`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/children`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/group-transfer`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/services/wedding`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/yandex-taxi-minivan`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/seasonal`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    // Новая структура v3
    { url: `${BASE}/airport`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/destination`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/service`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/partnership`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/payment`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/documents`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contacts`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  // Новая иерархия v3
  const iataHubPages: MetadataRoute.Sitemap = iataAirports.map((a) => ({
    url: `${BASE}/airport/${a.iata}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const iataRoutePages: MetadataRoute.Sitemap = airportRoutes.map((r) => ({
    url: `${BASE}/airport/${r.iata}/${r.destinationSlug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationHubPages: MetadataRoute.Sitemap = destinationHubs.map((h) => ({
    url: `${BASE}/destination/${h.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationRoutePages: MetadataRoute.Sitemap = destinationRoutes.map((r) => ({
    url: `${BASE}/destination/${r.regionSlug}/${r.routeSlug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const fleetPages: MetadataRoute.Sitemap = fleetModels.map((m) => ({
    url: `${BASE}/fleet/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const servicePages: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${BASE}/service/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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

  const b2bPillarPages: MetadataRoute.Sitemap = b2bPillars.map((p) => ({
    url: `${BASE}/b2b/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const b2bCasePages: MetadataRoute.Sitemap = b2bCases.map((c) => ({
    url: `${BASE}/b2b/cases/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...seasonalPageEntries,
    ...routePages,
    ...cityPages,
    ...airportPages,
    ...blogPages,
    ...comparePages,
    ...b2bPillarPages,
    ...b2bCasePages,
    // Новая иерархия v3
    ...iataHubPages,
    ...iataRoutePages,
    ...destinationHubPages,
    ...destinationRoutePages,
    ...fleetPages,
    ...servicePages,
  ];
}
