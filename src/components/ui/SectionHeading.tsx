import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Mono-styled label above the title, e.g. "// 02 · experiencia". */
  eyebrow: string;
  title: string;
  subtitle?: ReactNode;
  /** Applied to the wrapper element so sections can be linked/anchored. */
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div id={id} className={cn("flex flex-col gap-2", className)}>
      <p className="font-mono text-sm tracking-wide text-accent">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-sm text-foreground/70 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
