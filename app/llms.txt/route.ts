// app/llms.txt/route.ts
//
// Per current (2026) guidance from Google and Bing: this file is cheap
// to ship but doesn't move rankings — Google Search has stated it
// doesn't use llms.txt at all. It's read by non-Google AI crawlers
// (Anthropic's fetcher, Perplexity's crawler, coding agents), so ship
// it for them, not as an SEO lever. Generated from real data, not
// hand-written, so it can't silently go stale the next time a post is
// added — same principle as the sitemap.
//
// Deliberately NOT shipping per-page .md twin routes alongside this —
// Google's own generative-AI guidance and Bing engineers have both
// stated separate markdown pages waste crawl budget for no ranking
// benefit, since crawlers still fetch them to diff against the
// canonical HTML page. This file is the one AEO/GEO artifact that
// current guidance actually supports.

import { notes } from "@/lib/notes-data-seo";

export const dynamic = "force-static";

const SITE_URL = "https://alituan.me"; // keep in sync with layout.tsx / sitemap.ts / robots.ts
const SITE_NAME = "Samuel's Umuhoza Portifolio";
const SITE_DESCRIPTION = "Personal Website to showcase my works,skills and achievements with different worldwide";

export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Blog",
    ...notes.map((note) => `- [${note.title}](${SITE_URL}/blog/${note.slug}): ${note.summary}`),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}