/**
 * Single source of truth for all portfolio copy and structured data.
 * Components stay presentational and read from here — edit this file to
 * update the site's content, not the components.
 */

export type ContactLink = {
  label: string;
  href: string;
  icon: "mail" | "whatsapp" | "github" | "instagram" | "linkedin";
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export type EducationItem = {
  title: string;
  institution: string;
  period: string;
};

export type CertificationItem = {
  title: string;
  issuer?: string;
  year: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Stat = {
  label: string;
  value: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  tags: string[];
  status: "public" | "private";
  href?: string;
  featured?: boolean;
};

export const profile = {
  name: "Cristian Yohani García Rincón",
  shortName: "Cristian García",
  title: "Backend Developer",
  location: "Bogotá D.C., Colombia",
  experienceLabel: "+1.5 años de experiencia",
  summary:
    "Backend Developer con un año y medio construyendo APIs y sistemas web en entornos de producción reales. Especializado en PHP/Laravel, NestJS y Python; bases de datos relacionales (MySQL, PostgreSQL); Docker; despliegue en Linux y AWS. He aportado a una aplicación institucional activa en tres centros del SENA a nivel nacional y al backend del sitio corporativo de Darnel sobre Laravel (WinterCMS). Comprometido con el código limpio, las arquitecturas escalables y las buenas prácticas de DevOps.",
  photoUrl:
    "https://cpro7.wordpress.com/wp-content/uploads/2025/01/img_20240520_121732.jpg",
  photoAlt: "Foto de perfil de Cristian García",
  initials: "CG",
} as const;

/**
 * The owner may correct this address later — it lives in exactly one place.
 */
export const contactEmail = "criatiangarcia637@gmail.com";

export const contactLinks: ContactLink[] = [
  { label: "Email", href: `mailto:${contactEmail}`, icon: "mail" },
  {
    label: "WhatsApp",
    href: "https://wa.me/573124314119",
    icon: "whatsapp",
  },
  {
    label: "GitHub",
    href: "https://github.com/CristianGarcia7",
    icon: "github",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nosoycris_7/",
    icon: "instagram",
  },
  // LinkedIn: unknown for now. Add { label: "LinkedIn", href: "...", icon: "linkedin" }
  // above once the owner has a profile — sections only render links that exist.
];

export const heroStats: Stat[] = [
  { label: "centros SENA en producción", value: "3" },
  { label: "tests unitarios", value: "47" },
  { label: "años de experiencia", value: "1.5" },
  { label: "proveedores de IA integrados", value: "3" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Backend Developer",
    company: "OMC Production",
    period: "Junio 2026 — Actualidad",
    bullets: [
      "APIs REST con NestJS aplicando buenas prácticas de arquitectura, escalabilidad y código limpio.",
      "Construcción e integración de agentes de IA en producción dentro de servicios backend.",
      "Despliegues con pipelines CI/CD sobre AWS.",
      "Modelado y administración de MySQL y PostgreSQL.",
      "Mantenimiento del sitio corporativo de Darnel con Laravel (WinterCMS).",
    ],
  },
  {
    role: "Práctica profesional, Desarrollador Backend",
    company: "OMC Production",
    period: "Diciembre 2025 — Junio 2026",
    bullets: [
      "Backend del sitio corporativo de Darnel (Laravel/WinterCMS): gestión de contenido, formularios, soporte multilenguaje.",
      "Plugin de WordPress con sistema RAG completo: indexa el contenido del sitio y responde preguntas con IA (OpenAI, Gemini o Claude).",
      "Búsqueda híbrida (vectorial + fulltext) con reranking y streaming en tiempo real vía Server-Sent Events.",
      "Enfoque de producción: cifrado AES-256-CBC de claves API, rate limiting por IP, cola de indexación asíncrona, 47 tests unitarios con PHPUnit.",
      "Git flow en equipo (ramas, PRs, code review); refactor de módulos reduciendo deuda técnica.",
    ],
  },
  {
    role: "Desarrollador Backend",
    company: "SENA, Proyecto SgdCimm",
    period: "Abril 2025 — Diciembre 2025",
    bullets: [
      "App PHP + MySQL en producción usada en tres centros del SENA: CIMM Sogamoso, Centro para la Industria Petroquímica y Centro Internacional Náutico, Fluvial y Portuario (Cartagena).",
      "Configuración y mantenimiento del despliegue en servidor Linux.",
      "Funcionalidades backend para automatizar procesos administrativos.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    title: "Ingeniería de Software",
    institution: "Politécnico Grancolombiano",
    period: "Jul 2025 — Actualidad (6.º semestre)",
  },
  {
    title: "Tecnólogo en Análisis y Desarrollo de Software",
    institution: "SENA",
    period: "2024 — 2026",
  },
  {
    title: "Técnico en Instalación de Sistemas Eléctricos Residenciales y Comerciales",
    institution: "SENA",
    period: "2022 — 2023",
  },
  {
    title: "Bachiller Técnico en Electricidad",
    institution: "I.E. Héctor Julio Rangel Quintero",
    period: "2018 — 2023",
  },
];

export const certifications: CertificationItem[] = [
  { title: "Programación con JavaScript", issuer: "Meta", year: "2025" },
  { title: "JavaScript Interactivo", year: "2024" },
  { title: "SQL Interactivo", year: "2024" },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend",
    items: ["PHP", "Laravel", "NestJS", "Node.js", "Python", "TypeScript"],
  },
  {
    category: "IA",
    items: [
      "Agentes de IA",
      "RAG",
      "OpenAI",
      "Gemini",
      "Claude",
      "LangChain",
      "Búsqueda vectorial",
    ],
  },
  {
    category: "Bases de datos",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    category: "DevOps",
    items: ["Docker", "Linux", "AWS", "CI/CD", "Git/GitHub", "Nginx"],
  },
  {
    category: "Frontend",
    items: ["React", "Angular", "Vue", "Tailwind CSS"],
  },
];

export const languages = [
  { label: "Español", level: "Nativo" },
  { label: "Inglés", level: "Básico, en fortalecimiento" },
];

export const projects: ProjectItem[] = [
  {
    name: "Asistente RAG para WordPress",
    description:
      "Plugin de WordPress con un sistema RAG completo: indexa el contenido del sitio y responde preguntas con IA (OpenAI, Gemini o Claude). Búsqueda híbrida vectorial + fulltext con reranking, streaming en tiempo real vía Server-Sent Events, cifrado AES-256-CBC de claves API, rate limiting por IP, cola de indexación asíncrona y 47 tests unitarios con PHPUnit.",
    tags: ["PHP", "WordPress", "RAG", "SSE", "OpenAI", "Gemini", "Claude", "PHPUnit"],
    status: "private",
    featured: true,
  },
  {
    name: "SgdCimm — SENA",
    description:
      "Aplicación PHP + MySQL en producción para automatizar procesos administrativos, activa en tres centros del SENA a nivel nacional. Incluye configuración y mantenimiento del despliegue en servidor Linux.",
    tags: ["PHP", "MySQL", "Linux"],
    status: "private",
    featured: true,
  },
  {
    name: "vcsiigo",
    description:
      "Backend en NestJS con autenticación JWT, colas en segundo plano con BullMQ, caché con Redis, subida de archivos a AWS S3, documentación con Swagger y parsing de CSV/XML.",
    tags: ["NestJS", "TypeORM", "PostgreSQL", "Redis", "BullMQ", "AWS S3", "JWT", "Swagger"],
    status: "public",
    href: "https://github.com/CristianGarcia7/vcsiigo",
  },
  {
    name: "EpsLaravel",
    description:
      "API REST en Laravel para la gestión de citas médicas, con autenticación JWT multi-guard y control de acceso por roles (doctor, paciente): agenda de horarios, aprobación de citas y perfiles.",
    tags: ["PHP", "Laravel", "JWT", "API REST", "MySQL"],
    status: "public",
    href: "https://github.com/CristianGarcia7/EpsLaravel",
  },
  {
    name: "langchain-mini",
    description:
      "Backend en Django que integra LangChain con Gemini (langchain-google-genai) para generar respuestas de IA, junto a módulos de usuarios y contenido.",
    tags: ["Python", "Django", "LangChain", "Gemini"],
    status: "public",
    href: "https://github.com/CristianGarcia7/langchain-mini",
  },
  {
    name: "aws-security-skill",
    description:
      "Skill para agentes de codificación con IA que enseña buenas prácticas de seguridad en AWS por defecto: roles IAM en lugar de credenciales de larga duración, manejo seguro de .env, puertos, S3, SES y Bedrock.",
    tags: ["AWS", "Seguridad", "IAM", "Bash", "Agentes de IA"],
    status: "public",
    href: "https://github.com/CristianGarcia7/aws-security-skill",
  },
  {
    name: "wp-backup-cli",
    description:
      "Herramienta de línea de comandos para automatizar backups de sitios WordPress hacia AWS S3, con soporte para múltiples sitios en un mismo servidor, monitoreo, recuperación ante desastres y restauración completa.",
    tags: ["Bash", "AWS S3", "WordPress", "CLI", "DevOps"],
    status: "public",
    href: "https://github.com/CristianGarcia7/wp-backup-cli",
  },
];

/**
 * Lines shown in the Hero "terminal" card, simulating a real request to the
 * RAG agent described in `experience` and `projects` below. Every technical
 * detail here (hybrid search, reranking, SSE streaming, the providers, the
 * 47 unit tests) is already stated elsewhere in this file — nothing new is
 * claimed here, this is just a presentational reframing of those facts.
 */
export const terminalLog: string[] = [
  "$ curl -N https://api/agentes/consulta -d '{\"pregunta\":\"...\"}'",
  "> conectando con el pipeline RAG...",
  "> busqueda hibrida: vectorial + fulltext",
  "> reranking de resultados antes de responder",
  "> streaming de la respuesta via Server-Sent Events",
  "> proveedor de IA: OpenAI | Gemini | Claude",
  "> 47 tests unitarios con PHPUnit ✓",
];

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Educación", href: "#educacion" },
  { label: "Contacto", href: "#contacto" },
];
