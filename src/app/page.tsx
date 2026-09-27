import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-24">
      <SectionHeading
        eyebrow="// 00 · en construccion"
        title={profile.shortName}
        subtitle="Las secciones completas del portafolio llegan en las siguientes tareas."
      />
    </main>
  );
}
