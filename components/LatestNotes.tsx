"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { notes } from "@/lib/notes-data";

// How many rows show before "Load more" is needed.
const PAGE_SIZE = 4;

export default function LatestNotes() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleNotes = notes.slice(0, visibleCount);
  const hasMore = visibleCount < notes.length;

  return (
    <section className="w-full py-2">
      <h2 className="mb-8 text-xs font-medium tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
        LATEST NOTES
      </h2>

      <div>
        {visibleNotes.map((note, i) => (
          <Link
            key={note.slug}
            href={`/blog/${note.slug}`}
            className={`group flex items-center justify-between gap-6 py-4 ${
              i !== visibleNotes.length - 1 || hasMore
                ? "border-b border-neutral-200 dark:border-neutral-800"
                : ""
            }`}
          >
            <span className="text-base font-medium text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300">
              {note.title}
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs font-medium tracking-wide text-neutral-500 transition-colors group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-neutral-200">
              READ NOTE
              <ArrowUpRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          LOAD MORE
          <ArrowDown size={14} />
        </button>
      )}
    </section>
  );
}