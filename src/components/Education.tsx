import { motion } from 'framer-motion'
import { FadeUp, SlideLeft, SlideRight, Stagger, StaggerItem } from './motion'

const education = [
  {
    degree: 'Tecnólogo en Análisis y Desarrollo de Software',
    institution: 'Servicio Nacional de Aprendizaje – SENA',
    period: '2024 – Actualidad',
    border: 'border-l-blue-500',
    icon: '🎓',
  },
  {
    degree: 'Técnico en Instalación de Sistemas Eléctricos',
    institution: 'Servicio Nacional de Aprendizaje – SENA',
    period: '2022 – 2023',
    border: 'border-l-emerald-500',
    icon: '⚡',
  },
  {
    degree: 'Bachiller Técnico en Electricidad',
    institution: 'I.E. Héctor Julio Rangel Quintero',
    period: '2018 – 2023',
    border: 'border-l-violet-500',
    icon: '🏫',
  },
]

const certifications = [
  { title: 'Programación con JavaScript', issuer: 'Meta', year: '2025' },
  { title: 'JavaScript Interactivo', issuer: 'Curso Especializado', year: '2024' },
  { title: 'SQL Interactivo', issuer: 'Curso Especializado', year: '2024' },
]

export default function Education() {
  return (
    <section id="educacion" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-14">
            🎓 Educación & Certificaciones
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education timeline */}
          <SlideLeft>
            <h3 className="text-2xl font-bold text-slate-700 mb-6">Educación</h3>
            <Stagger className="flex flex-col gap-4">
              {education.map(({ degree, institution, period, border, icon }) => (
                <StaggerItem key={degree}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`flex gap-4 p-5 bg-slate-50 rounded-xl border-l-4 ${border} shadow-sm transition-all`}
                  >
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm leading-snug">{degree}</p>
                      <p className="text-blue-600 text-xs font-semibold mt-1">{institution}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{period}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </SlideLeft>

          {/* Certifications */}
          <SlideRight>
            <h3 className="text-2xl font-bold text-slate-700 mb-6">Certificaciones</h3>
            <Stagger className="flex flex-col gap-4">
              {certifications.map(({ title, issuer, year }) => (
                <StaggerItem key={title}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex gap-4 items-center p-5 bg-slate-50 rounded-xl border-l-4 border-l-amber-400 shadow-sm transition-all"
                  >
                    <span className="text-2xl flex-shrink-0">🏆</span>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{title}</p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {issuer} • {year}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>
          </SlideRight>
        </div>
      </div>
    </section>
  )
}
