// components/ai-assistant.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { SiChatbot } from "react-icons/si";
import { X, Send, Paperclip, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PROFILE = { name: "Samuel Umuhoza" };

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  id: "initial",
  role: "assistant",
  content: `Hi, I'm ${PROFILE.name}'s AI assistant. Ask me about his stack, projects, or background — or attach a file and it'll go straight to his inbox.`,
};

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-500"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  // Auto-grow textarea, capped so it doesn't take over the panel
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  function handleAttachClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
    e.target.value = "";
  }

  function handleStop() {
    abortControllerRef.current?.abort();
  }

  async function sendAttachment(message: string) {
    if (!attachedFile) return;
    const file = attachedFile;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: message || `Sent a file: ${file.name}` },
    ]);
    setInput("");
    setAttachedFile(null);
    setIsThinking(true);

    const formData = new FormData();
    formData.append("message", message);
    formData.append("file", file);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: formData });
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: res.ok
            ? `Got it — I've sent that straight to ${PROFILE.name}'s inbox. He'll get back to you soon.`
            : "Sorry, that didn't send. Try again in a moment.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Sorry, that didn't send. Try again in a moment." },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  async function handleSend() {
    const question = input.trim();
    if ((!question && !attachedFile) || isThinking || isStreaming) return;

    if (attachedFile) {
      await sendAttachment(question);
      return;
    }

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: question }]);
    setInput("");
    setIsThinking(true);

    const assistantId = crypto.randomUUID();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: "Sorry, I couldn't process that right now." } : m
          )
        );
        return;
      }

      setIsThinking(false);
      setIsStreaming(true);
      setStreamingId(assistantId);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
        );
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId && !m.content
              ? { ...m, content: "Sorry, I couldn't process that right now." }
              : m
          )
        );
      }
    } finally {
      setIsThinking(false);
      setIsStreaming(false);
      setStreamingId(null);
      abortControllerRef.current = null;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const isBusy = isThinking || isStreaming;

  return (
    <>
      <Button
        onClick={() => setIsOpen((v) => !v)}
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg transition-transform hover:scale-105 ",
          isOpen && "rotate-90"
        )}
        aria-label={isOpen ? "Close assistant" : "Open AI assistant"}
      >
        {isOpen ? <X size={18} /> : <SiChatbot size={18} />}
      </Button>

      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 sm:bottom-18 right-6 z-50 flex h-[35rem] w-[24rem] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl",
            "sm:h-[38rem] sm:w-[28rem]",
            "dark:border-neutral-800 dark:bg-neutral-900",
            "animate-in fade-in slide-in-from-bottom-4 duration-200"
          )}
        >
          <div className="flex items-center gap-2 shadow-sm  px-4 py-3 dark:border-neutral-800 h-15">
            <SiChatbot size={16} className="text-neutral-500 dark:text-neutral-400" />
            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Ask about {PROFILE.name}
            </span>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) =>
              message.role === "assistant" ? (
                <div
                  key={message.id}
                  className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-neutral-100 px-3.5 py-2 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"
                >
                  {message.content}
                  {isStreaming && streamingId === message.id && (
                    <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-neutral-400 align-middle" />
                  )}
                </div>
              ) : (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-neutral-900 px-3.5 py-2 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900">
                    {message.content}
                  </div>
                </div>
              )
            )}

            {isThinking && (
              <div className="w-fit rounded-2xl rounded-bl-sm bg-neutral-100 dark:bg-neutral-800">
                <ThinkingDots />
              </div>
            )}
          </div>

          <div className="border-t border-neutral-200 p-3 dark:border-neutral-800">
            {attachedFile && (
              <div className="mb-2 flex w-fit items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                <Paperclip size={12} />
                <span className="max-w-[10rem] truncate">{attachedFile.name}</span>
                <button
                  onClick={() => setAttachedFile(null)}
                  aria-label="Remove attachment"
                  className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="flex items-end gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-neutral-800/50">
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
              <button
                type="button"
                onClick={handleAttachClick}
                className="shrink-0 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
                aria-label="Attach file"
              >
                <Paperclip size={16} />
              </button>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                rows={1}
                className="max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
              />

              {isBusy ? (
                <Button
                  size="icon"
                  onClick={handleStop}
                  className="h-8 w-8 shrink-0 rounded-full"
                  aria-label="Stop generating"
                >
                  <Square size={14} />
                </Button>
              ) : (
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim() && !attachedFile}
                  className="h-8 w-8 shrink-0 rounded-full"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}