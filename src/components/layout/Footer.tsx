import { profile } from "@/content/profile";

/**
 * Site footer: copyright with the year computed at render time, the
 * owner's name, and a short attribution line. Rendered as a sibling of
 * `<main>` (not nested inside it), so the `<footer>` element keeps its
 * implicit `contentinfo` landmark role.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 text-center text-xs text-foreground/60 sm:flex-row sm:justify-between sm:text-left">
        <p>
          © {year} {profile.name}
        </p>
        <p>Hecho con Next.js</p>
      </div>
    </footer>
  );
}
