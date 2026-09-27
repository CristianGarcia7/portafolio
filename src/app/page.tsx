import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

// Navbar is rendered here (not in layout.tsx) because this is a single-page
// site: layout.tsx stays focused on the document shell, fonts, and
// metadata, while page.tsx composes the visible sections in scroll order.
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        {/* Education, Contact, Footer land in T6. */}
      </main>
    </>
  );
}
