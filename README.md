# Portafolio · Cristian García

Mi portafolio personal como Backend Developer. Reúne mi perfil, experiencia, proyectos (incluidos trabajos para clientes en producción), habilidades, formación y contacto.

## 🧩 Secciones

Inicio · Sobre mí · Experiencia · Proyectos · Habilidades · Educación · Contacto

## 🧱 Stack

Next.js 16 (App Router, Server Components) · React 19 · TypeScript · Tailwind CSS 4 · Vitest + Testing Library

- Todo el contenido vive en `src/content/profile.ts`; los componentes solo lo presentan.
- Las animaciones son CSS puro (scroll-driven animations con `@supports` y `prefers-reduced-motion`), sin JavaScript en el cliente, así que el sitio se ve completo aunque JS no cargue.
- La página se genera como estática en el build.

## 🚀 Desarrollo local

```bash
pnpm install
pnpm dev       # http://localhost:3000
```

## ✅ Calidad

```bash
pnpm test      # tests unitarios (Vitest + Testing Library)
pnpm lint
pnpm build
```

Los tests también protegen el contenido: por ejemplo, que los enlaces públicos apunten a los repos reales, que no se publiquen datos de terceros y que los proyectos destacados vayan primero.

## 📁 Seguimiento del trabajo

`odd/tasks/portfolio-v2.md` registra las tareas, la evidencia de tests y las revisiones de cada paso de esta versión.
