"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { SiAstro } from "react-icons/si";
import { HelpCircle } from "lucide-react";

/**
 * NOTE FROM CLAUDE — READ BEFORE SHIPPING:
 * I could positively identify the icons below from your screenshot.
 * FOUR of the original 20 glyphs were too small / ambiguous for me to
 * confirm as a specific brand (I'm not going to guess-and-label a logo,
 * that's how you end up shipping a wrong trademark on a public site).
 * They're stubbed with a placeholder "?" avatar and a note in the
 * tooltip — swap in the correct icon + name once you confirm which
 * tools they are. Search the icon at https://simpleicons.org or
 * https://react-icons.github.io/react-icons/icons/si/ and drop the
 * import in.
 */

type StackItem = {
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  bg: string; // icon tint color
  unresolved?: boolean;
};

const stack: StackItem[] = [
  { name: "Figma", description: "UI/UX design & prototyping", icon: SiFigma, bg: "#F24E1E" },
  { name: "Webflow", description: "Visual web design & CMS", icon: SiWebflow, bg: "#4353FF" },
  { name: "React", description: "Frontend UI library", icon: SiReact, bg: "#61DAFB" },
  { name: "Next.js", description: "React framework for production", icon: RiNextjsFill, bg: "#FFFFFF" },
  { name: "Astro", description: "Content-focused web framework", icon: SiAstro, bg: "#BC52EE" },
  { name: "TypeScript", description: "Typed JavaScript at scale", icon: SiTypescript, bg: "#3178C6" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: SiTailwindcss, bg: "#38BDF8" },
  { name: "Node.js", description: "JavaScript runtime for backend", icon: SiNodedotjs, bg: "#5FA04E" },
  { name: "Python", description: "Scripting, AI & automation", icon: SiPython, bg: "#3776AB" },
  { name: "PostgreSQL", description: "Relational database", icon: SiPostgresql, bg: "#4169E1" },
  { name: "Cloudflare", description: "Edge, CDN & R2 storage", icon: SiCloudflare, bg: "#F38020" },
  { name: "Blender", description: "3D modeling & rendering", icon: SiBlender, bg: "#F5792A" },
  { name: "Three.js", description: "3D graphics for the web", icon: SiThreedotjs, bg: "#FFFFFF" },
  { name: "n8n", description: "Workflow automation", icon: SiN8N, bg: "#EA4B71" },
  { name: "Adobe", description: "Creative Cloud suite", bg: "#FF0000" },
  {
    name: "Unconfirmed #1",
    description: "Couldn't confirm this brand from the source image — replace with the correct icon.",
    unresolved: true,
    bg: "#666",
  },
  {
    name: "Unconfirmed #2",
    description: "Ambiguous glyph (looked like a bar-chart / analytics tool) — please confirm the exact brand.",
    unresolved: true,
    bg: "#666",
  },
  {
    name: "Unconfirmed #3",
    description: "Colorful clapperboard-style icon — likely a video tool (CapCut/DaVinci-style), unconfirmed.",
    unresolved: true,
    bg: "#666",
  },
  {
    name: "Unconfirmed #4",
    description: "Dotted-square glyph — unclear brand, possibly a custom/internal mark.",
    unresolved: true,
    bg: "#666",
  },
];

export default function StackShowcase() {
  return (
    <section className="w-full  py-16">
      <div className="mx-auto max-w-3xl w-full">
        <p className="mb-1.5 dark:text-neutral-700 text-neutral-600">
          STACK
        </p>
        <h2 className="mb-10 text-lg leading-relaxed dark:text-zinc-100 text-neutral-700 sm:text-lg font-thi">
          The tools and apps I work in every day. Design, code, and the AI
          that connects it.
        </h2>

        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            {stack.map((item) => {
              const Icon = item.icon;
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger >
                    <button
                      type="button"
                      className="group relative outline-none"
                      aria-label={item.name}
                    >
                      <Avatar
                        className={`h-14 w-14 border dark:border-zinc-800 border-neutral-300 bg-zinc-900 transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:border-zinc-700 group-hover:shadow-lg group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-zinc-500 ${
                        item.unresolved ? "opacity-50" : ""
                      }`}
                      >
                        <AvatarFallback className="dark:bg-transparent bg-white">
                          {Icon ? (
                            <Icon
                              className="h-6 w-6"
                              
                            />
                          ) : (
                            <HelpCircle className="h-6 w-6 text-zinc-500" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[220px] border-zinc-800 bg-zinc-900 text-zinc-100"
                  >
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-zinc-400">{item.description}</p>
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