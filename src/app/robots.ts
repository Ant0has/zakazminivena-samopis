import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/docs/", "/work/"],
      },
      // Block aggressive SEO crawlers
      {
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "SERankingBacklinksBot",
        disallow: "/",
      },
      // Block AI scrapers
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/docs/", "/work/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/", "/docs/", "/work/"],
      },
      {
        userAgent: "Amazonbot",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      // Block irrelevant search engines
      {
        userAgent: "Baiduspider",
        disallow: "/",
      },
      {
        userAgent: "PetalBot",
        disallow: "/",
      },
      // Block Facebook aggressive crawler
      {
        userAgent: "meta-externalagent",
        disallow: "/",
      },
    ],
    sitemap: "https://zakazminivena.ru/sitemap.xml",
    host: "https://zakazminivena.ru",
  };
}
