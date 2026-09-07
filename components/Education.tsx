
import { lazy } from "react"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "./ui/avatar"
import { AvatarFallback } from "./ui/avatar"
import Image from "next/image"
export default function Education() {
    return (
        <div className="w-full flex flex-col gap-2 py-2 my-3">
            <h2 className="mb-1.5 dark:text-neutral-700 text-neutral-500">
                EDUCATION
            </h2>

            <div className="flex flex-row items-center justify-between gap-7 py-2 w-full border-b border-neutral-700">
                <div className="flex items-center gap-1.5">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="/karongi.jpg" alt="Karongi" />
                        <AvatarFallback>KC</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <p>Karongi College</p>
                        <span className="text-neutral-600 text-sm">
                            Bachelor in IT
                        </span>
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-neutral-500">2025-Present</p>
                </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-7 py-2 w-full">
                <div className="flex items-center gap-1.5">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <p>Lycee de Muhura</p>
                        <span className="text-neutral-600 text-sm">
                            Advanced Diploma (A2) in Software Development
                        </span>
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-neutral-500">2021-2024</p>
                </div>
            </div>
        </div>
    )
}