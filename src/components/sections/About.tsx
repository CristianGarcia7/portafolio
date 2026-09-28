import { Badge, SectionHeading } from "@/components/ui";
import { heroStats, languages, profile } from "@/content/profile";

export function About() {
  return (
    <section id="sobre-mi" className="px-6 py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <SectionHeading
          eyebrow="// 01 · sobre mí"
          title="Sobre mí"
          subtitle={profile.summary}
        />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {heroStats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-xl border border-border bg-surface p-4 text-center backdrop-blur-md"
            >
              <p className="text-2xl font-semibold text-gradient-accent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-foreground/60">{stat.label}</p>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          {languages.map((language) => (
            <Badge key={language.label}>
              {language.label} · {language.level}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
