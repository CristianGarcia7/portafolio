"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type TerminalCardProps = {
  lines: string[];
};

const LINE_INTERVAL_MS = 550;

/**
 * Decorative "terminal" card that types out `lines` one at a time to
 * illustrate a real request/response against the RAG agent described in
 * the CV. When the user prefers reduced motion, the full log is shown at
 * once instead of being typed out.
 */
export function TerminalCard({ lines }: TerminalCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    // Reduced motion: skip the interval subscription entirely. The render
    // below falls back to showing every line directly (no setState call
    // needed here for that case).
    if (shouldReduceMotion) return;

    const id = setInterval(() => {
      setTypedCount((count) => (count < lines.length ? count + 1 : count));
    }, LINE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [shouldReduceMotion, lines.length]);

  const visibleCount = shouldReduceMotion ? lines.length : typedCount;
  const isTyping = visibleCount < lines.length;

  return (
    <div
      role="group"
      aria-label="Terminal de ejemplo mostrando una consulta al agente de IA"
      className="overflow-hidden rounded-2xl border border-border bg-surface font-mono text-xs shadow-lg backdrop-blur-md sm:text-sm"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/20" />
      </div>
      <pre className="whitespace-pre-wrap break-words px-4 py-4 text-foreground/80">
        {lines.slice(0, visibleCount).join("\n")}
        {isTyping ? (
          <span aria-hidden="true" className="text-accent">
            ▊
          </span>
        ) : null}
      </pre>
    </div>
  );
}
