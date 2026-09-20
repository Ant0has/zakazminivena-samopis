import type { MetadataRoute } from "next";
import { allRoutes, allCities, allAirports } from "@/lib/routes-data";
import { seasonalPages } from "@/lib/seasonal-data";
import { comparisons } from "@/lib/comparison-data";
import { b2bPillars } from "@/lib/b2b-data";
import { b2bCases } from "@/lib/b2b-cases-data";
import { iataAirports } from "@/lib/iata-airports";
import { airportRoutes } from "@/lib/airport-routes-data";
import { destinationHubs, destinationRoutes } from "@/lib/destinations-data";
import { fleetModels } from "@/lib/fleet-data";
import { servicesData } from "@/lib/services-data";
import { airportAliases } from '@/lib/airport-canonical';

const BASE = "https://zakazminivena.ru";

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages: MetadataRoute.Sitemap = [
    ...['minivan-5-mest', 'minivan-6-mest', 'minivan-7-mest', 'service/luggage', 'service/ski-transfer'].map(path => ({ url: `${BASE}/${path}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${BASE}/constructor`, changeFrequency: "monthly", priority: 0.8 },
    { url: BASE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/routes`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/cities`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/airports`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/tariffs`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/b2b`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/b2b/cases`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/offer`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/fleet`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/drivers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/services/airport`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/children`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/group-transfer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/services/wedding`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/yandex-taxi-minivan`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/compare`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/seasonal`, changeFrequency: "monthly", priority: 0.7 },
    // Новая структура v3
    { url: `${BASE}/airport`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/destination`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/service`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/partnership`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/payment`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/documents`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contacts`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/reviews`, changeFrequency: "weekly", priority: 0.6 },
  ];

  // Новая иерархия v3
  const iataHubPages: MetadataRoute.Sitemap = iataAirports.map((a) => ({
    url: `${BASE}/airport/${a.iata}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const iataRoutePages: MetadataRoute.Sitemap = airportRoutes.map((r) => ({
    url: `${BASE}/airport/${r.iata}/${r.destinationSlug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationHubPages: MetadataRoute.Sitemap = destinationHubs.map((h) => ({
    url: `${BASE}/destination/${h.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationRoutePages: MetadataRoute.Sitemap = destinationRoutes.map((r) => ({
    url: `${BASE}/destination/${r.regionSlug}/${r.routeSlug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const fleetPages: MetadataRoute.Sitemap = fleetModels.map((m) => ({
    url: `${BASE}/fleet/${m.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const servicePages: MetadataRoute.Sitemap = servicesData.map((s) => ({
    url: `${BASE}/service/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seasonalPageEntries: MetadataRoute.Sitemap = seasonalPages.map((p) => ({
    url: `${BASE}/seasonal/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const routePages: MetadataRoute.Sitemap = allRoutes.map((r) => ({
    url: `${BASE}/routes/${r.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const cityPages: MetadataRoute.Sitemap = allCities.map((c) => ({
    url: `${BASE}/cities/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const airportPages: MetadataRoute.Sitemap = allAirports.filter(a=>!Object.hasOwn(airportAliases,a.slug)).map((a) => ({
    url: `${BASE}/airports/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const comparePages: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE}/compare/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const b2bPillarPages: MetadataRoute.Sitemap = b2bPillars.map((p) => ({
    url: `${BASE}/b2b/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const b2bCasePages: MetadataRoute.Sitemap = b2bCases.map((c) => ({
    url: `${BASE}/b2b/cases/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...seasonalPageEntries,
    ...routePages,
    ...cityPages,
    ...airportPages,
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
