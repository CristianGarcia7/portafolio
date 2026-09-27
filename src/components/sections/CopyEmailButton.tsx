"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { contactEmail } from "@/content/profile";

type Status = "idle" | "copied" | "unsupported";

/**
 * Copies `contactEmail` to the clipboard on click and announces the result
 * through an `aria-live="polite"` region ("Copiado"). Stays a client
 * component only for the click handler; when the Clipboard API is missing
 * or the write is rejected (permissions, insecure context, unsupported
 * browser), it degrades to showing the email as plain, selectable text
 * instead of a button that silently does nothing.
 */
export function CopyEmailButton() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleClick() {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      setStatus("unsupported");
      return;
    }

    try {
      await navigator.clipboard.writeText(contactEmail);
      setStatus("copied");
    } catch {
      setStatus("unsupported");
    }
  }

  if (status === "unsupported") {
    return (
      <p className="font-mono text-sm text-foreground/80">{contactEmail}</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-sm text-foreground/80 transition-colors hover:border-accent-cyan hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      >
        <Copy className="h-4 w-4" aria-hidden="true" />
        {contactEmail}
      </button>
      <span
        role="status"
        aria-live="polite"
        className="h-4 text-xs text-accent"
      >
        {status === "copied" ? "Copiado" : ""}
      </span>
    </div>
  );
}
