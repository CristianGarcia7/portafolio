import { ExternalLink, Mail } from "lucide-react";
import { Card, Reveal, SectionHeading } from "@/components/ui";
import { contactLinks } from "@/content/profile";
import { CopyEmailButton } from "./CopyEmailButton";

/**
 * Contact CTA: one strong heading, a link per `contactLinks` entry (mailto
 * for email, `target="_blank"` + safe `rel` for everything else), and a
 * client `CopyEmailButton` for copying the address directly. lucide-react
 * has no brand icons in this version, so every external link pairs a
 * generic `ExternalLink` icon with its own visible label instead.
 */
export function Contact() {
  return (
    <section id="contacto" className="px-6 py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <SectionHeading
          eyebrow="// 06 · contacto"
          title="¿Construimos algo juntos?"
          subtitle="Escríbeme por el canal que prefieras — respondo rápido."
          className="items-center"
        />

        <Reveal className="w-full">
          <Card className="flex flex-col items-center gap-6 p-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {contactLinks.map((link) => {
                const isMail = link.icon === "mail";
                const Icon = isMail ? Mail : ExternalLink;

                return (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(isMail
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent-cyan hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </div>

            <CopyEmailButton />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
