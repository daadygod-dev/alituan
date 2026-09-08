import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notes } from "@/lib/notes-data-seo";

// ─────────────────────────────────────────────────────────────────────
// FILL THIS IN BEFORE PUBLISHING — these are real fields search engines
// and social previews read. I don't know your actual production domain
// for certain (portfolio site, not one of the four project URLs), so
// this is a placeholder, not a guess dressed up as fact.
// ─────────────────────────────────────────────────────────────────────
const SITE_URL = "https://alituan.me"; // replace with your real deployed domain
const AUTHOR_NAME = "Samuel Umuhoza"; // replace with your real public byline name
const SITE_NAME = "Umuhoza Samuel craftman"; // replace with your actual site/section name

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);

  if (!note) {
    // Returning minimal metadata here is fine — notFound() below still
    // renders the real 404 page. This just prevents a crash if
    // generateMetadata runs before the notFound() check does.
    return { title: "Not found" };
  }

  const url = `${SITE_URL}/blog/${note.slug}`;

  return {
    title: note.seoTitle,
    description: note.seoDescription,
    keywords: note.keywords,
    authors: [{ name: AUTHOR_NAME }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: note.seoTitle,
      description: note.seoDescription,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: note.date,
      modifiedTime: note.updatedAt ?? note.date,
      authors: [AUTHOR_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: note.seoTitle,
      description: note.seoDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  const url = `${SITE_URL}/blog/${note.slug}`;

  // JSON-LD structured data — this is what lets Google show rich
  // results (author, publish date, etc.) rather than a bare blue link.
  // Kept as a separate object instead of inlined JSX for readability;
  // rendered via a <script type="application/ld+json"> tag below.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.seoDescription,
    datePublished: note.date,
    dateModified: note.updatedAt ?? note.date,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      {/*
        JSON-LD is inert to visitors, read only by crawlers — this is
        the standard, Google-documented way to inject it in the App
        Router. dangerouslySetInnerHTML is safe here specifically
        because the object above is built entirely from your own typed
        data, not user input — there's no injection surface.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          <ArrowLeft size={14} />
          BACK
        </Link>

        <div className="mb-3 flex items-center gap-3 text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-500">
          <time dateTime={note.date}>
            {new Date(note.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{note.readingTimeMinutes} min read</span>
        </div>

        {/*
          Single H1 per page — required for both SEO and accessibility.
          Section headings below use H2, never another H1.
        */}
        <h1 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {note.title}
        </h1>

        <p className="mb-10 text-base text-neutral-600 dark:text-neutral-400">
          {note.summary}
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {note.body.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                // Index as key is acceptable here: paragraphs within a
                // section are static, hardcoded content — they don't
                // reorder, get inserted/removed, or come from a list the
                // user edits. That's the actual condition for index keys
                // being safe, not just "it's a small list."
                <p key={i}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}