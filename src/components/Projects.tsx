import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, Stagger, StaggerItem } from './motion'

interface Project {
  title: string
  status: string
  statusStyle: string
  image: string | null
  description: string
  tags: string[]
  github: string | null
  featured?: boolean
}

const projects: Project[] = [
  {
    title: 'Aplicación SENA',
    status: '🚀 En Producción',
    statusStyle: 'text-emerald-600 bg-emerald-50 border-emerald-300',
    image: 'https://cpro7.wordpress.com/wp-content/uploads/2025/01/captura-de-pantalla.png?w=677',
    description:
      'Sistema web institucional multi-centro desplegado y en uso activo en tres centros del SENA. Gestiona procesos administrativos para instructores y aprendices en CIMM Sogamoso, Centro Petroquímico y Centro Náutico de Cartagena.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'MVC'],
    github: null,
    featured: true,
  },
  {
    title: 'Sistema de Gestión Veterinaria',
    status: '✅ Completado',
    statusStyle: 'text-blue-600 bg-blue-50 border-blue-200',
    image: 'https://cpro7.wordpress.com/wp-content/uploads/2025/01/m3.png',
    description:
      'Sistema completo para clínica veterinaria con gestión de mascotas, citas, expedientes médicos y usuarios con roles diferenciados.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/Cril727/Veterinaria',
  },
  {
    title: 'Juego de Dados Interactivo',
    status: '✅ Completado',
    statusStyle: 'text-blue-600 bg-blue-50 border-blue-200',
    image: 'https://cpro7.wordpress.com/wp-content/uploads/2025/01/captura-de-pantalla-2025-01-10-142517.png',
    description:
      'Juego de dados con animaciones fluidas, sistema de puntuación, efectos sonoros y múltiples modos de juego. Puro JavaScript vanilla.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Canvas'],
    github: 'https://github.com/Cril727',
  },
  {
    title: 'Sistema Drag and Drop',
    status: '✅ Completado',
    statusStyle: 'text-blue-600 bg-blue-50 border-blue-200',
    image: null,
    description:
      'Implementación avanzada de drag & drop con validaciones, feedback visual, persistencia en LocalStorage y múltiples zonas de destino.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
    github: 'https://github.com/Cril727',
  },
]

function FeaturedCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="col-span-full bg-white rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-xl shadow-emerald-100 mb-2"
    >
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden bg-slate-900 aspect-video md:aspect-auto">
          {project.image && (
            <motion.img
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-90"
            />
          )}
          {/* Overlay tags on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/70 flex items-center justify-center gap-3 flex-wrap p-6"
              >
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 300 }}
                    className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-amber-400 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                ⭐ Proyecto Destacado
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${project.statusStyle}`}>
                {project.status}
              </span>
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-3">🏢 {project.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{project.description}</p>

            <div className="space-y-2 mb-6">
              {['3 centros del SENA utilizando la app a diario', 'Sistema multi-rol para instructores y aprendices', '11 meses sin interrupciones en producción'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              En producción activa
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:shadow-slate-200/80 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-slate-100 aspect-video">
        {project.image ? (
          <motion.img
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.4 }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-slate-100 to-slate-200">
            🖱️
          </div>
        )}

        {/* Tech overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/65 flex items-center justify-center gap-2 flex-wrap p-4"
            >
              {project.tags.slice(0, 4).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 350 }}
                  className="px-2.5 py-1 bg-blue-500 text-white text-xs font-bold rounded-full"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
          <h3 className="text-base font-bold text-slate-800">{project.title}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${project.statusStyle} shrink-0`}>
            {project.status}
          </span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md border border-slate-200">
              {tag}
            </span>
          ))}
        </div>

        {project.github && (
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl no-underline transition-colors text-sm"
          >
            🔗 Ver en GitHub
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const featured = projects.find((p) => p.featured)!
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="proyectos" className="py-24 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-3">
            🚀 Proyectos Destacados
          </h2>
          <p className="text-center text-slate-400 text-base mb-14">
            Desde aplicaciones en producción hasta proyectos personales que demuestran mis habilidades
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Featured */}
          <FeaturedCard project={featured} />

          {/* Rest */}
          <Stagger className="contents">
            {rest.map((project) => (
              <StaggerItem key={project.title}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
