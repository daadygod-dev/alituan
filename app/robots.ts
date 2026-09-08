import type { MetadataRoute } from "next";

const SITE_URL = "https://alituan.me"; // same placeholder — keep in sync with sitemap.ts

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}