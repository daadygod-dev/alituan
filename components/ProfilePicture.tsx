// components/ProfilePicture.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RiEqualizer2Line } from "react-icons/ri";
import {
    Contrast,
    Type,
    CaseSensitive,
    Mountain,
    Wand2,
    RotateCcw,
    PartyPopper,
} from "lucide-react";
import { Dialog, DialogPopup } from "@/components/ui/dialog";
import { Drawer, DrawerPopup } from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
import { useAccessibility } from "@/context/AccessibilityContext";

// Mirrors Tailwind's `sm` breakpoint (640px) so this stays in sync
// with whatever breakpoint the rest of the layout uses.
function useIsMobile(breakpoint = 640) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        setIsMobile(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, [breakpoint]);

    return isMobile;
}

function PanelRow({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 text-sm text-zinc-200">
                <span className="text-zinc-400">{icon}</span>
                {label}
            </div>
            {children}
        </div>
    );
}

export default function ProfilePicture() {
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();

    const {
        highContrast,
        dyslexiaFont,
        textSize,
        lofiMode,
        cursorTrail,
        setHighContrast,
        setDyslexiaFont,
        setTextSize,
        setLofiMode,
        setCursorTrail,
        resetAll,
        celebrate,
    } = useAccessibility();

    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!panelOpen) return;
        const handleClick = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setPanelOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [panelOpen]);

    const enlargedImage = (
        <div className="flex items-center justify-center p-6">
            <Image
                src="/profile.jpg"
                alt="Samuel Umuhoza"
                width={400}
                height={400}
                className="w-full max-w-sm rounded-3xl object-cover"
            />
        </div>
    );

    return (
        <div className="flex w-full flex-col items-start gap-3.5">
            {/* Avatar + accessibility trigger — spread across full width */}
            <div className="flex w-full items-center justify-between">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="View profile picture"
                    className="rounded-full outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <Image
                        src="/profile.jpg"
                        alt="Samuel Umuhoza"
                        priority
                        className="h-20 w-20 rounded-full object-cover outline outline-4 outline-muted"
                        width={80}
                        height={80}
                    />
                </button>

                <div className="relative" ref={panelRef}>
                    <button
                        type="button"
                        onClick={() => setPanelOpen((v) => !v)}
                        aria-label="Open display settings"
                        aria-expanded={panelOpen}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-200 outline-none transition-colors hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <RiEqualizer2Line size={18} />
                    </button>

                    <AnimatePresence>
                        {panelOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96, y: -6 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="absolute right-0 top-12 z-50 w-64 origin-top-right rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl"
                            >
                                <p className="mb-2 text-xs font-medium tracking-wide text-zinc-500">
                                    READABILITY &amp; FUN
                                </p>

                                <PanelRow icon={<Contrast size={16} />} label="Contrast">
                                    <div className="flex items-center rounded-full bg-zinc-800 p-0.5">
                                        <button
                                            type="button"
                                            onClick={() => setHighContrast(true)}
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${highContrast ? "bg-zinc-100 text-black" : "text-zinc-400"
                                                }`}
                                        >
                                            Aa
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setHighContrast(false)}
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${!highContrast ? "bg-zinc-100 text-black" : "text-zinc-400"
                                                }`}
                                        >
                                            Aa
                                        </button>
                                    </div>
                                </PanelRow>

                                <PanelRow icon={<CaseSensitive size={16} />} label="Dyslexia Font">
                                    <Switch
                                        checked={dyslexiaFont}
                                        onCheckedChange={setDyslexiaFont}
                                        aria-label="Dyslexia font"
                                    />
                                </PanelRow>

                                <PanelRow icon={<Type size={16} />} label="Text Size">
                                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                                        <button
                                            type="button"
                                            onClick={() => setTextSize(textSize - 10)}
                                            className="text-zinc-500 hover:text-zinc-200"
                                        >
                                            A-
                                        </button>
                                        <span className="w-7 text-center">{textSize}</span>
                                        <button
                                            type="button"
                                            onClick={() => setTextSize(textSize + 10)}
                                            className="text-zinc-500 hover:text-zinc-200"
                                        >
                                            A+
                                        </button>
                                    </div>
                                </PanelRow>

                                <p className="mb-1 mt-3 text-xs font-medium tracking-wide text-zinc-500">
                                    EXTRAS
                                </p>

                                <PanelRow icon={<Mountain size={16} />} label="Lo-fi Mode">
                                    <Switch
                                        checked={lofiMode}
                                        onCheckedChange={setLofiMode}
                                        aria-label="Lo-fi mode"
                                    />
                                </PanelRow>

                                <PanelRow icon={<Wand2 size={16} />} label="Cursor Trail">
                                    <Switch
                                        checked={cursorTrail}
                                        onCheckedChange={setCursorTrail}
                                        aria-label="Cursor trail"
                                    />
                                </PanelRow>

                                <PanelRow icon={<PartyPopper size={16} />} label="Celebrate">
                                    <button
                                        type="button"
                                        onClick={celebrate}
                                        aria-label="Celebrate"
                                        className="text-base"
                                    >
                                        🎉
                                    </button>
                                </PanelRow>

                                <button
                                    type="button"
                                    onClick={resetAll}
                                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-800 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
                                >
                                    <RotateCcw size={14} />
                                    Reset All
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="py-3 text-left">
                <h3 className="flex flex-row items-center gap-1">
                    <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Samuel Umuhoza
                    </span>
                    <Image src="/seal-check.svg" width={16} height={16} alt="" className="my-auto" />
                </h3>
                <p className="text-md text-neutral-700 dark:text-neutral-400">Software Engineer</p>
            </div>

            {isMobile ? (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerPopup showBar>{enlargedImage}</DrawerPopup>
                </Drawer>
            ) : (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogPopup className="max-w-md" bottomStickOnMobile={false}>
                        {enlargedImage}
                    </DialogPopup>
                </Dialog>
            )}
        </div>
    );
}