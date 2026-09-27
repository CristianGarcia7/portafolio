"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useMounted } from "@/hooks/useMounted";

type TerminalCardProps = {
  lines: string[];
};

const LINE_INTERVAL_MS = 550;

/**
 * Decorative "terminal" card that types out `lines` one at a time to
 * illustrate a real request/response against the RAG agent described in
 * the CV.
 *
 * Server-rendered markup, no-JS clients, and the very first client render
 * (before `useMounted` flips, see `src/hooks/useMounted.ts`) all show the
 * full log at once — this keeps SSR and the first hydrated render
 * byte-for-byte identical (no hydration mismatch), and no-JS users never
 * see an empty terminal. Only once mounted, and only if the user doesn't
 * prefer reduced motion, does typing actually start (from an empty log).
 */
export function TerminalCard({ lines }: TerminalCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const mounted = useMounted();
  const [typedCount, setTypedCount] = useState(0);

  const isTypingAllowed = mounted && !shouldReduceMotion;

  useEffect(() => {
    // Typing always starts from an empty log: `typedCount` is still its
    // initial `0` the first time `isTypingAllowed` turns true (nothing else
    // in this component sets it before then), so there is no need to (and,
    // per the lint rule against synchronous setState-in-effect, no need to)
    // reset it here.
    if (!isTypingAllowed) return;

    const id = setInterval(() => {
      setTypedCount((count) => (count < lines.length ? count + 1 : count));
    }, LINE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isTypingAllowed, lines.length]);

  const visibleCount = isTypingAllowed ? typedCount : lines.length;
  const isTyping = isTypingAllowed && visibleCount < lines.length;

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
