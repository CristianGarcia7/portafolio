"use client";

import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import { contactEmail } from "@/content/profile";

type Status = "idle" | "copied" | "failed";

const RESET_DELAY_MS = 2000;

/**
 * Copies `contactEmail` to the clipboard on click and announces the result
 * through a persistent `aria-live="polite"` region, which stays mounted in
 * every state so assistive tech never loses its reference to it.
 *
 * - Success: announces "Copiado" and resets back to idle after a short
 *   delay so the region is ready to announce a future copy again.
 * - Failure (Clipboard API missing, insecure context, permission denied,
 *   or the write promise rejects): announces a failure message in Spanish
 *   and replaces the button with a selectable `mailto:` link, moving focus
 *   to it so keyboard users don't land on `<body>`.
 */
export function CopyEmailButton() {
  const [status, setStatus] = useState<Status>("idle");
  const linkRef = useRef<HTMLAnchorElement>(null);

  async function handleClick() {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      setStatus("failed");
      return;
    }

    // Clear the status first so a second click re-announces "Copiado" to
    // assistive tech even if the live region already shows that text.
    setStatus("idle");

    try {
      await navigator.clipboard.writeText(contactEmail);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  useEffect(() => {
    if (status !== "copied") return;
    const timer = setTimeout(() => setStatus("idle"), RESET_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (status === "failed") {
      linkRef.current?.focus();
    }
  }, [status]);

  const message =
    status === "copied"
      ? "Copiado"
      : status === "failed"
        ? `No se pudo copiar. Escribe a: ${contactEmail}`
        : "";

  return (
    <div className="flex flex-col items-center gap-2">
      {status === "failed" ? (
        <a
          ref={linkRef}
          href={`mailto:${contactEmail}`}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-sm text-foreground/80 transition-colors hover:border-accent-cyan hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        >
          {contactEmail}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-sm text-foreground/80 transition-colors hover:border-accent-cyan hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        >
          <Copy className="h-4 w-4" aria-hidden="true" />
          {contactEmail}
        </button>
      )}
      <span
        role="status"
        aria-live="polite"
        className="min-h-4 text-center text-xs text-accent"
      >
        {message}
      </span>
    </div>
  );
}
