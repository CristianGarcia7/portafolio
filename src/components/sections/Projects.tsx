import { ExternalLink } from "lucide-react";
import { Badge, Card, Reveal, SectionHeading } from "@/components/ui";
import { projects } from "@/content/profile";
import { cn } from "@/lib/cn";

/**
 * Grid of `projects`, rendered in data order (featured projects come first
 * in the data and span two columns here, so they read as larger cards).
 * Public projects link out to their exact GitHub `href`; live projects link
 * out to their real site with a "Ver sitio" link and a status badge
 * (`badgeLabel`, defaulting to "En producción · sitio web"); private ones
 * show a "Privado · En producción" badge instead of a link, since there is
 * nothing public to send visitors to.
 */
export function Projects() {
  return (
    <section id="proyectos" className="px-6 py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <SectionHeading eyebrow="// 03 · proyectos" title="Proyectos" />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Reveal
              key={project.name}
              className={cn(project.featured && "sm:col-span-2")}
            >
              <Card
                data-testid={`project-card-${project.name}`}
                className="flex h-full flex-col gap-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.name}
                  </h3>
                  {project.status === "private" ? (
                    <Badge variant="default">Privado · En producción</Badge>
                  ) : project.status === "live" ? (
                    <Badge variant="success">
                      {project.badgeLabel ?? "En producción · sitio web"}
                    </Badge>
                  ) : null}
                </div>

                <p className="text-sm text-foreground/70">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="accent">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {project.status === "public" && project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${project.name} en GitHub`}
                    className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Ver en GitHub
                  </a>
                ) : null}

                {project.status === "live" && project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver sitio de ${project.name}`}
                    className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-medium text-accent-cyan transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Ver sitio
                  </a>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
