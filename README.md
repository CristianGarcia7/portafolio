# Portafolio · Cristian Garcia

Mi portafolio personal como desarrollador Full Stack. Es una SPA con animaciones que reúne mi perfil, experiencia, formación, habilidades y proyectos.

## 🧩 Secciones

Hero · Sobre mí · Habilidades · Experiencia · Educación · Proyectos · Contacto

## 🧱 Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Framer Motion

## 🚀 Desarrollo local

```bash
npm install
npm run dev
```

## 🐳 Despliegue con Docker

El `Dockerfile` hace el build con Node 20 y sirve el resultado estático con **nginx**.

```bash
docker compose up -d --build   # expone el sitio en el puerto 3000
```

El `docker-compose.yml` se conecta a una red externa `nginx-proxy` para ponerlo detrás de un proxy inverso. Si no la usas, crea la red (`docker network create nginx-proxy`) o quita esa sección del archivo.
