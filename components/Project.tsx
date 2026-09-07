import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar"

export default function Projects() {
    return (
        <div className="w-full flex flex-col gap-2 py-2 my-3">
            <h2 className="mb-1.5 dark:text-neutral-700 text-neutral-600">
                MY WORKS
            </h2>

            <div className="flex flex-row items-center justify-between gap-7 py-2 w-full border-b border-neutral-700">
                <div className="flex items-center gap-1.5">
                    <Avatar className="h-10 w-10 border dark:border-zinc-800 border-neutral-300 bg-zinc-900 transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:border-zinc-700 group-hover:shadow-lg group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-zinc-500">
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <p  className="text-lg leading-relaxed dark:text-zinc-100 text-neutral-700 sm:text-lg font-thi">AI ToolsHQ</p>
                        <span className="text-neutral-600 text-sm">
                            Ai Tools directory for multiworking Tasks
                        </span>
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <Link
                        href="https://aitoolshq.space"
                        className="flex items-center gap-0.5 text-neutral-500"
                    >
                        VISIT Site
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-7 py-2 w-full">
                <div className="flex items-center gap-1.5">
                    <Avatar className="h-10 w-10 border dark:border-zinc-800 border-neutral-300 bg-zinc-900 transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:border-zinc-700 group-hover:shadow-lg group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-zinc-500">
                        <AvatarFallback>PJ</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-lg leading-relaxed dark:text-zinc-100 text-neutral-700 sm:text-lg font-thi">Project Name</p>
                        <span className="text-neutral-600 text-sm">
                            Short description
                        </span>
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <Link
                        href="https://example.com"
                        className="flex items-center gap-0.5 text-neutral-500"
                    >
                        VISIT Site
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    )
}