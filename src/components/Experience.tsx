import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp } from './motion'

const tabs = ['Contexto', 'Solución', 'Impacto', 'Stack'] as const
type Tab = typeof tabs[number]

const tabContent: Record<Tab, React.ReactNode> = {
  Contexto: (
    <div className="space-y-3 text-slate-600 leading-relaxed">
      <p>El SENA necesitaba una solución digital institucional que centralizara procesos administrativos dispersos en múltiples centros de formación a lo largo del país.</p>
      <p>Los centros operaban con procesos manuales y herramientas desconectadas, lo que generaba ineficiencias, errores y pérdida de tiempo para instructores y aprendices.</p>
      <p className="flex items-start gap-2">
        <span className="text-blue-500 mt-0.5 shrink-0">→</span>
        <span><strong>Desafío:</strong> Diseñar una aplicación multi-tenant que funcionara para múltiples centros con diferentes necesidades operativas.</span>
      </p>
    </div>
  ),
  Solución: (
    <div className="space-y-3 text-slate-600 leading-relaxed">
      <p>Desarrollé una aplicación web full stack con <strong>PHP + MySQL</strong> en el backend y una interfaz responsiva en el frontend usando <strong>JavaScript y Bootstrap</strong>.</p>
      <p>La arquitectura permite que un solo despliegue sirva a múltiples centros con datos aislados por centro, garantizando privacidad y rendimiento.</p>
      <div className="grid grid-cols-2 gap-3 mt-4">
        {[
          { label: 'Arquitectura', value: 'Multi-tenant MVC' },
          { label: 'Base de Datos', value: 'MySQL relacional' },
          { label: 'Autenticación', value: 'Roles y permisos' },
          { label: 'Deploy', value: 'Servidor compartido' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
            <p className="text-xs text-slate-400 font-medium">{label}</p>
            <p className="text-sm font-semibold text-slate-700">{value}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  Impacto: (
    <div className="space-y-4">
      {[
        { icon: '🏢', metric: '3', desc: 'Centros del SENA usando la aplicación en producción diariamente', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
        { icon: '⏱️', metric: '11 meses', desc: 'En producción continua sin interrupciones críticas', color: 'text-blue-600 bg-blue-50 border-blue-200' },
        { icon: '👥', metric: '+', desc: 'Instructores y aprendices beneficiados en CIMM, Petroquímico y Náutico Cartagena', color: 'text-violet-600 bg-violet-50 border-violet-200' },
      ].map(({ icon, metric, desc, color }) => (
        <div key={metric} className={`flex items-start gap-4 p-4 rounded-xl border ${color}`}>
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-2xl font-black leading-none">{metric}</p>
            <p className="text-sm mt-1 text-slate-600">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  Stack: (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {[
        { name: 'PHP', color: '#777BB4' },
        { name: 'MySQL', color: '#4479A1' },
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'Bootstrap', color: '#7952B3' },
        { name: 'HTML5', color: '#E34F26' },
        { name: 'CSS3', color: '#1572B6' },
        { name: 'Git', color: '#F05032' },
        { name: 'GitHub', color: '#181717' },
      ].map(({ name, color }) => (
        <div
          key={name}
          style={{ borderLeft: `3px solid ${color}` }}
          className="bg-slate-50 rounded-lg p-3 text-center"
        >
          <p className="text-sm font-bold text-slate-700">{name}</p>
        </div>
      ))}
    </div>
  ),
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState<Tab>('Contexto')

  return (
    <section id="experiencia" className="py-24 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-14">
            💼 Experiencia Profesional
          </h2>
        </FadeUp>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100"
        >
          {/* Card header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-2 font-medium tracking-wide uppercase">
                  Abril 2025 – Actualidad
                </p>
                <h3 className="text-2xl font-black text-white">
                  Desarrollador Full Stack
                </h3>
                <p className="text-blue-400 font-semibold mt-1">
                  Proyecto SENA — Sistema Institucional
                </p>
              </div>

              {/* Live badge */}
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                EN PRODUCCIÓN
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              {[
                { n: '3', label: 'Centros SENA' },
                { n: '11', label: 'Meses activo' },
                { n: '100%', label: 'Uptime' },
              ].map(({ n, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-white">{n}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-100">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-0 cursor-pointer relative ${
                    activeTab === tab
                      ? 'text-blue-600 bg-blue-50/50'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 bg-transparent'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
