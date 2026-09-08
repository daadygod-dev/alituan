// context/AccessibilityContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

type AccessibilityState = {
  highContrast: boolean;
  dyslexiaFont: boolean;
  textSize: number; // percentage, 80-150
  lofiMode: boolean;
  cursorTrail: boolean;
};

const DEFAULTS: AccessibilityState = {
  highContrast: true,
  dyslexiaFont: false,
  textSize: 100,
  lofiMode: false,
  cursorTrail: false,
};

type AccessibilityContextValue = AccessibilityState & {
  setHighContrast: (v: boolean) => void;
  setDyslexiaFont: (v: boolean) => void;
  setTextSize: (v: number) => void;
  setLofiMode: (v: boolean) => void;
  setCursorTrail: (v: boolean) => void;
  resetAll: () => void;
  celebrate: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null
);

const STORAGE_KEY = "a11y-prefs";

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted prefs on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist + apply to <html> whenever state changes
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    const root = document.documentElement;

    root.classList.toggle("a11y-high-contrast", state.highContrast);
    root.classList.toggle("a11y-dyslexia-font", state.dyslexiaFont);
    root.classList.toggle("a11y-lofi", state.lofiMode);
    root.style.setProperty("--a11y-scale", `${state.textSize}%`);
  }, [state, hydrated]);

  const setHighContrast = useCallback(
    (v: boolean) => setState((s) => ({ ...s, highContrast: v })),
    []
  );
  const setDyslexiaFont = useCallback(
    (v: boolean) => setState((s) => ({ ...s, dyslexiaFont: v })),
    []
  );
  const setTextSize = useCallback(
    (v: number) =>
      setState((s) => ({ ...s, textSize: Math.min(150, Math.max(80, v)) })),
    []
  );
  const setLofiMode = useCallback(
    (v: boolean) => setState((s) => ({ ...s, lofiMode: v })),
    []
  );
  const setCursorTrail = useCallback(
    (v: boolean) => setState((s) => ({ ...s, cursorTrail: v })),
    []
  );
  const resetAll = useCallback(() => setState(DEFAULTS), []);

  const celebrate = useCallback(() => {
    window.dispatchEvent(new CustomEvent("a11y-celebrate"));
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        setHighContrast,
        setDyslexiaFont,
        setTextSize,
        setLofiMode,
        setCursorTrail,
        resetAll,
        celebrate,
      }}
    >
      {children}
      {state.cursorTrail && <CursorTrail />}
      <Celebration />
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return ctx;
}

// --- Cursor trail: a small dot that eases toward the pointer ---

function CursorTrail() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white/60 mix-blend-difference transition-transform duration-150 ease-out"
      style={{
        transform: `translate3d(${pos.x - 6}px, ${pos.y - 6}px, 0)`,
      }}
    />
  );
}

// --- Celebration: a short confetti-style burst, no extra deps ---

function Celebration() {
  const [particles, setParticles] = useState<
    { id: number; x: number; rotate: number; color: string }[]
  >([]);

  useEffect(() => {
    const handler = () => {
      const colors = ["#f43f5e", "#facc15", "#22c55e", "#3b82f6", "#a855f7"];
      const next = Array.from({ length: 24 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        rotate: Math.random() * 360,
        color: colors[i % colors.length],
      }));
      setParticles(next);
      setTimeout(() => setParticles([]), 1200);
    };
    window.addEventListener("a11y-celebrate", handler);
    return () => window.removeEventListener("a11y-celebrate", handler);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 h-2 w-2 animate-[a11y-fall_1.1s_ease-in_forwards] rounded-sm"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}