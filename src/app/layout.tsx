import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.shortName} — Backend Developer`;
const description = `${profile.title} (${profile.experienceLabel}) construyendo APIs backend con NestJS, Laravel y Python, y agentes de IA con sistemas RAG en produccion.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div aria-hidden className="bg-grid-glow" />
        {children}
      </body>
    </html>
  );
}
