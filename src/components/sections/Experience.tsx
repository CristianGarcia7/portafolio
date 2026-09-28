import { Badge, Reveal, SectionHeading } from "@/components/ui";
import { experience } from "@/content/profile";
import { cn } from "@/lib/cn";

/**
 * Semantic <ol> timeline of `experience`, most recent role first (the data
 * order already reflects that). The current role — the one whose period
 * includes "Actualidad" — gets an explicit "Actual" badge and a highlighted
 * border; that's the only visual/text difference from past roles.
 */
export function Experience() {
  return (
    <section id="experiencia" className="px-6 py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <SectionHeading eyebrow="// 02 · experiencia" title="Experiencia" />

        <ol className="flex flex-col gap-6 border-l border-border pl-6">
          {experience.map((item) => {
            const isCurrent = item.period.includes("Actualidad");
            return (
              <li key={`${item.company}-${item.period}`}>
                <Reveal>
                  <div
                    className={cn(
                      "rounded-2xl border border-border bg-surface p-6 backdrop-blur-md",
                      isCurrent && "border-accent-cyan/40"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {item.role}
                      </h3>
                      {isCurrent ? (
                        <Badge variant="accent">Actual</Badge>
                      ) : null}
                    </div>
                    <p className="mt-1 font-mono text-sm text-accent">
                      {item.company}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {item.period}
                    </p>
                    <ul className="mt-4 flex flex-col gap-2 text-sm text-foreground/70">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span aria-hidden="true" className="text-accent">
                            ▸
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
