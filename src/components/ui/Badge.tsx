import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "default" | "accent" | "success";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-border bg-surface text-foreground/70",
  accent: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  success: "border-accent/30 bg-accent/10 text-accent",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      data-variant={variant}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
