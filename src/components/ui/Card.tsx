import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CardSpotlight } from "./CardSpotlight";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

/**
 * Glass-surface card with a pointer-following spotlight. Stays a server
 * component; the interactive part lives in `CardSpotlight`, and the base
 * surface, border and content are fully usable without JavaScript.
 */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 backdrop-blur-md",
        className
      )}
      {...props}
    >
      <CardSpotlight />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
