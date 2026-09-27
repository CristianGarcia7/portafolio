import { Badge, Card, Reveal, SectionHeading } from "@/components/ui";
import { certifications, education } from "@/content/profile";

/**
 * `education` and `certifications` rendered as two columns of cards.
 * Languages already show in `About` (see `heroStats`/`languages` there), so
 * they're intentionally not repeated here.
 */
export function Education() {
  return (
    <section id="educacion" className="px-6 py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <SectionHeading eyebrow="// 05 · educación" title="Educación" />

        <div className="grid gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-sm tracking-wide text-accent">
              Formación académica
            </h3>
            <ol className="flex flex-col gap-4">
              {education.map((item) => (
                <li key={item.title}>
                  <Reveal>
                    <Card
                      data-testid={`education-item-${item.title}`}
                      className="p-5"
                    >
                      <h4 className="text-base font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-1 font-mono text-sm text-accent">
                        {item.institution}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {item.period}
                      </p>
                    </Card>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-sm tracking-wide text-accent">
              Certificaciones
            </h3>
            <ul className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <li key={cert.title}>
                  <Reveal>
                    <Card
                      data-testid={`certification-item-${cert.title}`}
                      className="p-5"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {cert.title}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {cert.issuer ? (
                          <Badge variant="accent">{cert.issuer}</Badge>
                        ) : null}
                        <Badge>{cert.year}</Badge>
                      </div>
                    </Card>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
