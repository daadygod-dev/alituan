import Link from "next/link"
import { ArrowUpRight, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"

// Every project here is real — no fabricated/placeholder companies.
// `href: null` means genuinely not deployed yet: renders a disabled
// "In development" badge instead of a fake or dead link. The moment a
// project actually goes live, flip its `href` to the real URL and it
// automatically becomes a clickable "Visit site" row — no other changes
// needed.
type Project = {
    initials: string
    name: string
    description: string
    href: string | null // null = not live yet
}

const projects: Project[] = [
    {
        initials: "AI",
        name: "AI ToolsHQ",
        description: "Directory of 500+ AI tools with hands-on reviews and comparisons.",
        href: "https://aitoolshq.space",
    },
    {
        initials: "FS",
        name: "FinSave AI",
        description: "Bank and mobile-money coaching for MSMEs in Rwanda.",
        href: "https://finsave.aitoolshq.space",
    },
    {
        initials: "IH",
        name: "Ihuriro",
        description: "Rwanda-first negotiation marketplace (formerly Murandasi).",
        href: null,
    },
    {
        initials: "SW",
        name: "ShiftWise",
        description: "Shift-worker scheduling and pay-tracking utility app.",
        href: null,
    },
]

export default function Projects() {
    return (
        <div className="w-full flex flex-col gap-2 py-6 my-3">
            <h2 className="mb-4 text-xs font-medium tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
                MY WORKS
            </h2>

            {projects.map((project, i) => (
                <div
                    key={project.name}
                    className={`flex flex-row items-center justify-between gap-7 py-3 w-full ${
                        i !== projects.length - 1
                            ? "border-b border-neutral-200 dark:border-neutral-700"
                            : ""
                    }`}
                >
                    <div className="flex items-center gap-3">
                        <Avatar className="h-14 w-14 border border-neutral-300 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-900">
                            <AvatarFallback className="bg-white dark:bg-transparent font-medium text-neutral-700 dark:text-neutral-200">
                                {project.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-base leading-relaxed text-neutral-700 dark:text-zinc-100 sm:text-lg">
                                {project.name}
                            </p>
                            <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                                {project.description}
                            </span>
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        {project.href ? (
                            <Link
                                href={project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors text-sm"
                            >
                                Visit site
                                <ArrowUpRight size={16} />
                            </Link>
                        ) : (
                            // Deliberately not a <Link> — nothing to click,
                            // no href to fake. A styled, disabled badge
                            // instead, so it can't be mistaken for a live
                            // deploy or a dead 404 link.
                            <span
                                className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-600 text-sm cursor-default select-none"
                                aria-label={`${project.name} is in development, not yet live`}
                            >
                                <Clock size={14} className="text-yellow-700" />
                                Under development
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}