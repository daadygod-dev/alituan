"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiX, SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

// TODO: replace with your real profile URLs.
const socials = [
  { name: "X", href: "https://x.com/yourhandle", icon: SiX },
  { name: "LinkedIn", href: "https://linkedin.com/in/yourhandle", icon: FaLinkedin },
  { name: "GitHub", href: "https://github.com/alituan", icon: SiGithub },
];

export default function Footer() {
  // Starts as null, not a real time value — this is deliberate. Reading
  // the visitor's local time on the server would produce a different
  // string than the client re-render (server has no meaningful "local"
  // timezone), causing a React hydration mismatch. Rendering nothing
  // until the client mounts avoids that; the brief blank/empty state on
  // first paint is the correct tradeoff for a value that's inherently
  // client-only.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    };

    update();
    const interval = setInterval(update, 1000 * 30); // clock only needs minute precision
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 my-6">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6 sm:px-10">
        <span className="text-sm text-neutral-500 dark:text-neutral-400 tabular-nums">
          {time ?? "\u00A0"}
        </span>

        <div className="flex items-center gap-4">
          {socials.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-neutral-700 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}