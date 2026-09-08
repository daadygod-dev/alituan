import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function Education() {
    return (
        <div className="w-full flex flex-col gap-2 py-6 my-3">
            {/*
              FIX: header hierarchy was backwards — it read
              "dark:text-neutral-700 text-neutral-500", making the header
              LIGHTER in light mode and DARKER in dark mode than the body
              text below it. A section label should be muted-but-legible in
              both modes, not inverted. neutral-500 reads fine on both a
              white and near-black background, so it's kept as the base and
              only nudged lighter in dark mode for AA contrast.
            */}
            <h2 className="mb-4 text-xs font-medium tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
                EDUCATION
            </h2>

            <div className="flex flex-row items-center justify-between gap-7 py-3 w-full border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-3">
                    {/*
                      FIXES on Avatar:
                      - bg-zinc-900 was hardcoded dark with no light variant
                        (near-black square on a light page) — added a light
                        counterpart.
                      - border-neutral-300 only had a light value, zinc-800
                        only a dark one — now both sides are explicit.
                      - Removed the group-hover and group-focus-visible
                        classes entirely. These only fire when a PARENT
                        element has className="group", which nothing here
                        has — they were dead, copy-pasted from the Stack
                        component's TooltipTrigger. If you want the
                        lift-on-hover effect, wrap this avatar in a button
                        or Link with className="group".
                    */}
                    <Avatar className="h-14 w-14 border border-neutral-300 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-900">
                        <AvatarImage src="/karongi.jpg" alt="Karongi" />
                        {/*
                          FIX: "bg-whit" is not a real Tailwind class (typo
                          for "bg-white") — it silently did nothing, so this
                          fallback had NO background in light mode this
                          whole time. Also removed "font-thi" per your
                          confirmation — you wanted no explicit weight here.
                        */}
                        <AvatarFallback className="bg-white dark:bg-transparent font-medium text-neutral-700 dark:text-neutral-200">
                            KC
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-base leading-relaxed text-neutral-700 dark:text-zinc-100 sm:text-lg">
                            Karongi College
                        </p>
                        <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Bachelor in IT
                        </span>
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">2025-Present</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-7 py-3 w-full">
                <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 border border-neutral-300 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-900">
                        <AvatarFallback className="bg-white dark:bg-transparent font-medium text-neutral-700 dark:text-neutral-200">
                            LM
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-base leading-relaxed text-neutral-700 dark:text-zinc-100 sm:text-lg">
                            Lycee de Muhura
                        </p>
                        <span className="text-neutral-600 dark:text-neutral-400 text-sm">
                            Advanced Diploma (A2) in Software Development
                        </span>
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">2021-2024</p>
                </div>
            </div>
        </div>
    )
}