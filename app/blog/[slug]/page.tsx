import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notes } from "@/lib/notes-data";

// Pre-renders one static page per note at build time. With a hardcoded
// array this is straightforward; if you move to MDX/a CMS/a database
// later, swap the body of this function for the real fetch and this
// page component barely has to change.
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

// Next.js 15+ passes route params as a Promise — this matches the
// version already confirmed in use on Murandasi (Next.js 16 in your
// test build). If you're on Next 14 or earlier, params is a plain
// object instead and this needs `{ params }: { params: { slug: string } }`
// without the Promise/await.
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

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16 sm:px-10">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300"
      >
        <ArrowLeft size={14} />
        BACK
      </Link>

      <time
        dateTime={note.date}
        className="mb-3 block text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-500"
      >
        {new Date(note.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>

      <h1 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
        {note.title}
      </h1>

      <p className="mb-8 text-base text-neutral-600 dark:text-neutral-400">
        {note.summary}
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>{note.body}</p>
      </div>
    </article>
  );
}