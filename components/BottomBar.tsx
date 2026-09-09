"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { House, Mail, Mic, Moon, Play, Pause, Square, Sun, Loader2 } from "lucide-react"
import {
    segmentedControlItemVariants,
    segmentedControlRootClassName,
} from "@/lib/segmented-control"
import {
    Tooltip,
    TooltipTrigger,
    TooltipPopup,
    TooltipProvider,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogTrigger,
    DialogPopup,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogPanel,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerTrigger,
    DrawerPopup,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerPanel,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-media-query"
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils"

type ActiveAction = "home" | "mail" | null
type VoiceState = "idle" | "recording" | "recorded"
type ContactStatus = "idle" | "sending" | "sent" | "error"

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
}

function VoiceMessageDialog() {
    const [open, setOpen] = useState(false)
    const [voiceState, setVoiceState] = useState<VoiceState>("idle")
    const [elapsed, setElapsed] = useState(0)
    const [email, setEmail] = useState("")
    const [isPlaying, setIsPlaying] = useState(false)
    const [playTime, setPlayTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const audioUrlRef = useRef<string | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    function cleanupStream() {
        streamRef.current?.getTracks().forEach((t) => t.stop())
        streamRef.current = null
    }

    function resetAll() {
        if (timerRef.current) clearInterval(timerRef.current)
        cleanupStream()
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current)
            audioUrlRef.current = null
        }
        chunksRef.current = []
        setVoiceState("idle")
        setElapsed(0)
        setEmail("")
        setIsPlaying(false)
        setPlayTime(0)
        setDuration(0)
    }

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            streamRef.current = stream
            chunksRef.current = []

            const recorder = new MediaRecorder(stream)
            mediaRecorderRef.current = recorder

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data)
            }

            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" })
                audioUrlRef.current = URL.createObjectURL(blob)
                cleanupStream()
                setVoiceState("recorded")
            }

            recorder.start()
            setVoiceState("recording")
            setElapsed(0)
            timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000)
        } catch (err) {
            console.error("Mic permission denied or unavailable:", err)
        }
    }

    function stopRecording() {
        if (timerRef.current) clearInterval(timerRef.current)
        mediaRecorderRef.current?.stop()
    }

    function reRecord() {
        if (audioUrlRef.current) {
            URL.revokeObjectURL(audioUrlRef.current)
            audioUrlRef.current = null
        }
        setIsPlaying(false)
        setPlayTime(0)
        setDuration(0)
        setVoiceState("idle")
    }

    function togglePlay() {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
    }

    async function sendMessage() {
        if (!chunksRef.current.length || !email) return
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })

        // TODO: replace with your real upload — e.g. FormData to an API route
        const formData = new FormData()
        formData.append("audio", blob, "voice-message.webm")
        formData.append("email", email)

        try {
            // await fetch("/api/voice-message", { method: "POST", body: formData })
            console.log("Would send voice message", { email, size: blob.size })
            setOpen(false)
            resetAll()
        } catch (err) {
            console.error("Failed to send voice message:", err)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(next) => {
                setOpen(next)
                if (!next) resetAll()
            }}
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger
                        aria-label="Record voice"
                        render={<DialogTrigger />}
                        className={`${segmentedControlItemVariants({ state: "pressed" })} aspect-square !px-0`}
                    >
                        <Mic className="size-5" />
                    </TooltipTrigger>
                    <TooltipPopup>Record voice</TooltipPopup>
                </Tooltip>
            </TooltipProvider>

            <DialogPopup>
                <DialogHeader>
                    <DialogTitle className={"text-neutral-200"}>Send a voice message</DialogTitle>
                    <DialogDescription>
                        Record a message and I&apos;ll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>

                <DialogPanel>
                    {voiceState === "recording" && (
                        <div className="flex items-center justify-center gap-2 py-2">
                            <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-muted-foreground text-sm tabular-nums">
                                {formatTime(elapsed)}
                            </span>
                        </div>
                    )}

                    {voiceState === "recorded" && (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 rounded-lg border p-3">
                                <button
                                    type="button"
                                    onClick={togglePlay}
                                    aria-label={isPlaying ? "Pause" : "Play"}
                                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted"
                                >
                                    {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                                </button>
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    value={playTime}
                                    onChange={(e) => {
                                        const t = Number(e.target.value)
                                        if (audioRef.current) audioRef.current.currentTime = t
                                        setPlayTime(t)
                                    }}
                                    className="flex-1 accent-foreground"
                                />
                                <span className="text-muted-foreground text-xs tabular-nums">
                                    {formatTime(duration - playTime > 0 ? duration - playTime : 0)}
                                </span>
                                <audio
                                    ref={audioRef}
                                    src={audioUrlRef.current ?? undefined}
                                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                                    onTimeUpdate={(e) => setPlayTime(e.currentTarget.currentTime)}
                                    onPlay={() => setIsPlaying(true)}
                                    onPause={() => setIsPlaying(false)}
                                    onEnded={() => {
                                        setIsPlaying(false)
                                        setPlayTime(0)
                                    }}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="voice-email" className="text-sm font-medium">
                                    Email address
                                </label>
                                <input
                                    id="voice-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            <Button
                                onClick={sendMessage}
                                disabled={!email}
                                className="w-full"
                            >
                                Send Message
                            </Button>
                        </div>
                    )}
                </DialogPanel>

                <DialogFooter variant="bare">
                    {voiceState === "idle" && (
                        <>
                            <Button onClick={startRecording} className="gap-1.5 border-none" variant={"default"}>
                                <span className="size-2 rounded-full bg-red-500" />
                                Record Message
                            </Button>
                            <DialogClose render={<Button variant="outline" />}>
                                Cancel
                            </DialogClose>
                        </>
                    )}

                    {voiceState === "recording" && (
                        <>
                            <Button onClick={stopRecording} className="gap-1.5">
                                <Square className="size-3.5 fill-current" />
                                Stop Recording
                            </Button>
                            <DialogClose render={<Button variant="outline" />}>
                                Cancel
                            </DialogClose>
                        </>
                    )}

                    {voiceState === "recorded" && (
                        <>
                            <Button variant="outline" onClick={reRecord}>
                                Re-Record
                            </Button>
                            <DialogClose render={<Button variant="outline" />}>
                                Cancel
                            </DialogClose>
                        </>
                    )}
                </DialogFooter>
            </DialogPopup>
        </Dialog>
    )
}

/**
 * Contact form content shared between the desktop Dialog and mobile
 * Drawer — same fields, same submit logic, so behavior can't drift
 * between the two surfaces. Only the wrapping chrome (DialogPanel vs
 * DrawerPanel) differs, handled by the two call sites below.
 */
function ContactFormFields({
    name,
    email,
    message,
    onNameChange,
    onEmailChange,
    onMessageChange,
    status,
}: {
    name: string
    email: string
    message: string
    onNameChange: (v: string) => void
    onEmailChange: (v: string) => void
    onMessageChange: (v: string) => void
    status: ContactStatus
}) {
    const disabled = status === "sending" || status === "sent"

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm  text-neutral-500">
                    Name
                </label>
                <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    disabled={disabled}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="rounded-md border border-zinc-800 text-neutral-200 dark:bg-background bg-zinc-800 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-64"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-sm  text-neutral-500">
                    Email address
                </label>
                <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    disabled={disabled}
                    onChange={(e) => onEmailChange(e.target.value)}
                    className="rounded-md border border-zinc-800 text-neutral-200 dark:bg-background bg-zinc-800 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-64"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-sm  text-neutral-500">
                    Message
                </label>
                <textarea
                    id="contact-message"
                    placeholder="What's on your mind?"
                    value={message}
                    disabled={disabled}
                    onChange={(e) => onMessageChange(e.target.value)}
                    rows={3}
                    className="resize-none rounded-md border-zinc-800 text-neutral-200 dark:bg-background bg-zinc-800 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-64"
                />
            </div>

            {status === "error" && (
                <p className="text-destructive-foreground text-sm">
                    Something went wrong sending your message. Please try again.
                </p>
            )}
            {status === "sent" && (
                <p className="text-sm text-muted-foreground">
                    Message sent — thanks, I&apos;ll get back to you soon.
                </p>
            )}
        </div>
    )
}

function MailContactDialog({
    active,
    onActiveChange,
}: {
    active: boolean
    onActiveChange: (active: boolean) => void
}) {
    const isMobile = useIsMobile()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<ContactStatus>("idle")

    const canSubmit =
        name.trim().length > 0 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        message.trim().length > 0 &&
        status !== "sending"

    function resetForm() {
        setName("")
        setEmail("")
        setMessage("")
        setStatus("idle")
    }

    async function handleSubmit() {
        if (!canSubmit) return
        setStatus("sending")

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            })

            if (!res.ok) {
                setStatus("error")
                return
            }

            setStatus("sent")
            // Brief pause so the "Message sent" confirmation is actually
            // visible before the dialog/drawer closes, rather than
            // vanishing instantly on success.
            setTimeout(() => {
                onActiveChange(false)
                resetForm()
            }, 1200)
        } catch (err) {
            console.error("Failed to send contact message:", err)
            setStatus("error")
        }
    }

    function handleOpenChange(next: boolean) {
        onActiveChange(next)
        if (!next) resetForm()
    }

    const trigger = (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    aria-label="Open email"
                    data-pressed={active || undefined}
                    render={
                        isMobile ? <DrawerTrigger /> : <DialogTrigger />
                    }
                    className={cn(
                        `${segmentedControlItemVariants({ state: "pressed" })} aspect-square !px-0`,
                        "relative",
                    )}
                >
                    {active && (
                        <motion.span
                            layoutId="nav-active-pill"
                            className="absolute inset-0 rounded-[inherit] bg-neutral-700"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                    )}
                    <Mail className="relative z-10 size-5 transition-transform active:scale-90" />
                </TooltipTrigger>
                <TooltipPopup>Open email</TooltipPopup>
            </Tooltip>
        </TooltipProvider>
    )

    const footerButtons = (
        <Button onClick={handleSubmit} disabled={!canSubmit} className="gap-1.5">
            {status === "sending" && <Loader2 className="size-3.5 animate-spin" />}
            {status === "sending" ? "Sending..." : "Send Message"}
        </Button>
    )

    if (isMobile) {
        return (
            <Drawer open={active} onOpenChange={handleOpenChange}>
                {trigger}
                <DrawerPopup showBar>
                    <DrawerHeader>
                        <DrawerTitle>Get in touch</DrawerTitle>
                        <DrawerDescription>
                            Send a message and I&apos;ll get back to you as soon as possible.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerPanel>
                        <ContactFormFields
                            name={name}
                            email={email}
                            message={message}
                            onNameChange={setName}
                            onEmailChange={setEmail}
                            onMessageChange={setMessage}
                            status={status}
                        />
                    </DrawerPanel>
                    <DrawerFooter variant="bare">
                        {footerButtons}
                        <DrawerClose render={<Button variant="outline" />}>
                            Cancel
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerPopup>
            </Drawer>
        )
    }

    return (
        <Dialog open={active} onOpenChange={handleOpenChange}>
            {trigger}
            <DialogPopup>
                <DialogHeader>
                    <DialogTitle className={"text-neutral-200"}>Get in touch</DialogTitle>
                    <DialogDescription>
                        Send a message and I&apos;ll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
                <DialogPanel>
                    <ContactFormFields
                        name={name}
                        email={email}
                        message={message}
                        onNameChange={setName}
                        onEmailChange={setEmail}
                        onMessageChange={setMessage}
                        status={status}
                    />
                </DialogPanel>
                <DialogFooter variant="bare">
                    {footerButtons}
                    <DialogClose render={<Button variant="outline" />}>
                        Cancel
                    </DialogClose>
                </DialogFooter>
            </DialogPopup>
        </Dialog>
    )
}

export default function Bottombar() {
    const [active, setActive] = useState<ActiveAction>("home")
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const itemClass = `${segmentedControlItemVariants({ state: "pressed" })} aspect-square !px-0`

    return (
      <TooltipProvider>
      <nav aria-label="quick actions" className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
        <div className={segmentedControlRootClassName}>
          <Tooltip>
            <TooltipTrigger
              aria-label="Home"
              data-pressed={active === "home" || undefined}
              className={cn(itemClass, "relative")}
              onClick={() => setActive("home")}
            >
              {active === "home" && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-[inherit] bg-neutral-700"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <House className="relative z-10 size-5 transition-transform active:scale-90" />
            </TooltipTrigger>
            <TooltipPopup>Home</TooltipPopup>
          </Tooltip>

          <VoiceMessageDialog />

          <MailContactDialog
            active={active === "mail"}
            onActiveChange={(isActive) => setActive(isActive ? "mail" : "home")}
          />

          <Tooltip>
            <TooltipTrigger
              aria-label="Toggle theme"
              className={cn(itemClass, "relative overflow-hidden")}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && resolvedTheme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <Sun className="size-5 text-yellow-500" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <Moon className="size-5 text-yellow-500" />
                  </motion.span>
                )}
              </AnimatePresence>
            </TooltipTrigger>
            <TooltipPopup>Toggle theme</TooltipPopup>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
    )
}