import type { MetadataRoute } from "next";
import { notes } from "@/lib/notes-data-seo";

// Replace with your real deployed domain — same placeholder as in the
// blog page component, must match exactly (see note there).
const SITE_URL = "https://YOUR-DOMAIN.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${SITE_URL}/blog/${note.slug}`,
    lastModified: note.updatedAt ?? note.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postEntries,
  ];
}