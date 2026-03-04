import { motion } from 'framer-motion'
import { FadeUp, SlideLeft, Stagger, StaggerItem } from './motion'

const contactInfo = [
  { icon: '📱', text: '+57 312 431 4119', href: 'https://wa.me/3124314119', border: 'border-l-blue-500' },
  { icon: '📧', text: 'cristiangarcia637@gmail.com', href: 'mailto:cristiangarcia637@gmail.com', border: 'border-l-emerald-500' },
  { icon: '🌐', text: 'cpro7.wordpress.com', href: 'https://cpro7.wordpress.com', border: 'border-l-violet-500' },
  { icon: '📷', text: '@nosoycris_7', href: 'https://www.instagram.com/nosoycris_7/', border: 'border-l-pink-500' },
]

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-14">
            👤 Sobre Mí
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-[3fr_2fr] gap-10 items-start">
          {/* Text */}
          <SlideLeft>
            <div className="bg-slate-50 rounded-2xl p-8 space-y-5 border border-slate-100 shadow-sm">
              <p className="text-slate-700 text-lg leading-relaxed">
                Desarrollador Full Stack en formación con experiencia práctica en desarrollo
                web utilizando tecnologías modernas como{' '}
                <strong className="text-blue-600">React, Angular, Vite, Deno, PHP y MySQL</strong>.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed">
                Actualmente lidero un{' '}
                <strong className="text-emerald-600">proyecto en producción</strong> desplegado en
                tres centros del SENA, diseñando y manteniendo una aplicación que resuelve
                necesidades institucionales reales.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed">
                Mi enfoque se centra en crear{' '}
                <strong className="text-violet-600">soluciones escalables, eficientes</strong>{' '}
                y orientadas a mejorar la experiencia del usuario, con bases sólidas en
                algoritmos y estructuras de datos.
              </p>
            </div>
          </SlideLeft>

          {/* Contact cards */}
          <Stagger className="flex flex-col gap-3">
            {contactInfo.map(({ icon, text, href, border }) => (
              <StaggerItem key={href}>
                <motion.a
                  whileHover={{ x: 6, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 bg-white rounded-xl border-l-4 ${border} shadow-sm no-underline text-slate-700 transition-all`}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium">{text}</span>
                </motion.a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
