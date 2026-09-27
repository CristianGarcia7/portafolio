import { ExternalLink } from "lucide-react";
import { contactLinks, profile, terminalLog } from "@/content/profile";
import { ProfilePhoto } from "./ProfilePhoto";
import { TerminalCard } from "./TerminalCard";

/**
 * Extracts a short tagline from the CV summary paragraph (up to and
 * including its first sentence) instead of writing new copy — every word
 * still comes from `profile.summary`.
 */
function getTagline(summary: string): string {
  const firstSentenceEnd = summary.indexOf(". ");
  if (firstSentenceEnd === -1) return summary;
  return summary.slice(0, firstSentenceEnd + 1);
}

export function Hero() {
  const githubLink = contactLinks.find((link) => link.icon === "github");
  const tagline = getTagline(profile.summary);

  return (
    <section
      id="inicio"
      className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-40"
    >
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="flex flex-col items-start gap-5">
          <ProfilePhoto />

          <p className="font-mono text-sm tracking-wide text-accent">
            {profile.title} · {profile.experienceLabel}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-gradient-accent">{profile.shortName}</span>
          </h1>

          <p className="text-sm text-foreground/60">{profile.location}</p>

          <p className="max-w-xl text-base text-foreground/70 sm:text-lg">
            {tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#proyectos"
              className="rounded-full bg-gradient-to-r from-accent-emerald to-accent-cyan px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              Ver proyectos
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-cyan hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            >
              Contacto
            </a>
            {githubLink ? (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-colors hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <TerminalCard lines={terminalLog} />
      </div>
    </section>
  );
}
