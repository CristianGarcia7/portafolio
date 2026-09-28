import { Badge, Reveal, SectionHeading } from "@/components/ui";
import { skillGroups } from "@/content/profile";

/**
 * `skillGroups` rendered as grouped badge clouds — one card per category,
 * each item a `Badge`.
 */
export function Skills() {
  return (
    <section id="habilidades" className="px-6 py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <SectionHeading eyebrow="// 04 · habilidades" title="Habilidades" />

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <Reveal key={group.category}>
              <div className="rounded-2xl border border-border bg-surface p-6 backdrop-blur-md">
                <h3 className="font-mono text-sm tracking-wide text-accent">
                  {group.category}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
