import type { CSSProperties } from "react";

type TerminalCardProps = {
  lines: string[];
};

/**
 * Decorative "terminal" card that illustrates a real request/response
 * against the RAG agent described in the CV. Fully server-rendered: every
 * line ships in the initial HTML, with no client-side state, no interval,
 * nothing to hydrate — it works identically with JavaScript disabled.
 *
 * Under `prefers-reduced-motion: no-preference`, CSS staggers each line's
 * reveal using the `--i` custom property set on it here (see
 * `.terminal-line` / `.terminal-cursor` in `globals.css`). With reduced
 * motion, every line and the cursor render statically and immediately.
 */
export function TerminalCard({ lines }: TerminalCardProps) {
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
        {lines.map((line, index) => (
          <span
            key={index}
            className="terminal-line block"
            style={{ "--i": index } as CSSProperties}
          >
            {line}
          </span>
        ))}
        <span aria-hidden="true" className="terminal-cursor text-accent">
          ▊
        </span>
      </pre>
    </div>
  );
}
