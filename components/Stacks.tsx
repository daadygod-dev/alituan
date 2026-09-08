"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Base UI wrapper, not Radix — see usage notes below
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SiFigma,
  SiWebflow,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiCloudflare,
  SiBlender,
  SiThreedotjs,
  SiN8N,
  SiAstro,
  SiClaude,
  SiClaudecode,
  SiCursor,
  SiDocker,
  SiGoogleanalytics
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { HelpCircle } from "lucide-react";


type StackItem = {
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  bg?: string; // fixed brand hex — omit for monochrome icons, use `themed` instead
  themed?: boolean; // true for icons with no official brand color (they're black/white marks) — resolves to a theme-aware gray instead of a fixed hex, since a fixed color inverts to invisible in one mode
  unresolved?: boolean;
};

const stack: StackItem[] = [
  { name: "Figma", description: "UI/UX design & prototyping", icon: SiFigma, bg: "#F24E1E" },
  { name: "Webflow", description: "Visual web design & CMS", icon: SiWebflow, bg: "#4353FF" },
  { name: "React", description: "Frontend UI library", icon: SiReact, bg: "#61DAFB" },
  { name: "Next.js", description: "React framework for production", icon: RiNextjsFill, themed: true },
  { name: "Astro", description: "Content-focused web framework", icon: SiAstro, bg: "#BC52EE" },
  { name: "TypeScript", description: "Typed JavaScript at scale", icon: SiTypescript, bg: "#3178C6" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: SiTailwindcss, bg: "#38BDF8" },
  { name: "Node.js", description: "JavaScript runtime for backend", icon: SiNodedotjs, bg: "#5FA04E" },
  { name: "Python", description: "Scripting, AI & automation", icon: SiPython, bg: "#3776AB" },
  { name: "PostgreSQL", description: "Relational database", icon: SiPostgresql, bg: "#4169E1" },
  { name: "Cloudflare", description: "Edge, CDN & R2 storage", icon: SiCloudflare, bg: "#F38020" },
  { name: "Blender", description: "3D modeling & rendering", icon: SiBlender, bg: "#F5792A" },
  { name: "Three.js", description: "3D graphics for the web", icon: SiThreedotjs, themed: true },
  { name: "n8n", description: "Workflow automation", icon: SiN8N, bg: "#EA4B71" },
  {
    name: "Docker",
    description:
      "Docker Containers",
    icon: SiDocker,
    themed: true,
  },
  {
    name: "Cursor",
    description: "Cursor coding agent and IDE",
    icon: SiCursor,
    themed:true,
  },
  
{
  name: "Claude",
  description: "AI pair-programmer and assistant, used across ideation and content review.",
  icon: SiClaude,
  bg: "#D97757", // verified: simple-icons dataset, siClaude.hex
},
{
  name: "Claude Code",
  description: "Agentic coding tool for delegating dev tasks from the terminal.",
  icon: SiClaudecode,
  bg: "#D97757", // same brand color as Claude — verified via siClaudecode.hex
},
{
  name: "Google Analytics",
  description: "Web traffic and audience analytics.",
  icon: SiGoogleanalytics,
  bg: "#E37400", // verified: simple-icons dataset, siGoogleanalytics.hex
},
];

export default function StackShowcase() {
  return (
    <section className="w-full bg-white  py-16 dark:bg-transparent ">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-medium tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
          STACK
        </p>
        <h2 className=" mb-8 text-base leading-relaxed text-neutral-700 dark:text-zinc-100 sm:text-lg">
          The tools and apps I work in every day. Design, code, and the AI
          that connects it.
        </h2>

        {/*
          Base UI tooltip API differs from Radix — verified against
          @base-ui/react 1.8.0 type definitions directly, not assumed:
          - No `delayDuration` prop anywhere. `delay`/`closeDelay` exist on
            TooltipProvider (shared across all tooltips) AND on
            TooltipTrigger (per-trigger override). TooltipRoot itself takes
            NEITHER — only open-state/behavior props.
          - TooltipTrigger has no asChild/Slot merging — it renders its own
            <button> and takes children directly, so the Avatar goes INSIDE
            the trigger rather than the trigger being merged onto one.
        */}
        <TooltipProvider delay={150}>
          <div className="flex flex-wrap gap-4">
            {stack.map((item) => {
              const Icon = item.icon;
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger
                    className="group relative outline-none"
                    aria-label={item.name}
                  >
                    <Avatar
                      className={`h-14 w-14 border border-zinc-200 bg-zinc-50 transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:border-zinc-300 group-hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover:border-zinc-700 group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-zinc-400 dark:group-focus-visible:ring-zinc-500 ${
                        item.unresolved ? "opacity-50" : ""
                      }`}
                    >
                      <AvatarFallback className="bg-transparent">
                        {Icon ? (
                          item.themed || item.unresolved ? (
                            // No official brand color (Next.js, Three.js) or
                            // brand unconfirmed: use a Tailwind text-color
                            // class instead of a fixed hex + CSS var. This
                            // one DOES need to respond to light/dark, unlike
                            // the brand-colored icons below — a fixed value
                            // here would either vanish on a matching
                            // background or clash with the theme.
                            <Icon className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
                          ) : (
                            // Fixed brand color via a CSS custom property on
                            // a wrapper <span>, consumed by the SVG's fill.
                            // Deliberately NOT a Tailwind arbitrary class
                            // like text-[#F24E1E] built from a template
                            // string — Tailwind's JIT scans source files
                            // statically, so a dynamically interpolated
                            // class name is invisible to it and gets
                            // purged, silently shipping every icon
                            // colorless in production. Also NOT `style` on
                            // the react-icons component itself — SiFigma
                            // etc. only type `className`, not `style`, so
                            // that prop doesn't exist on them.
                            // Brand colors are intentionally NOT swapped
                            // per light/dark — Figma's mark shouldn't
                            // change orange at night any more than the
                            // physical logo would.
                            <span
                              className="flex h-6 w-6 items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-[var(--icon-color)]"
                              style={{ "--icon-color": item.bg } as React.CSSProperties}
                            >
                              <Icon />
                            </span>
                          )
                        ) : (
                          <HelpCircle className="h-6 w-6 text-zinc-500" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[220px] border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                  >
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}