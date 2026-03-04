import { motion } from 'framer-motion'
import { FadeUp } from './motion'

const links = [
  { label: '📧 Email', href: 'mailto:cristiangarcia637@gmail.com', primary: true },
  { label: '🔗 GitHub', href: 'https://github.com/Cril727', primary: false },
  { label: '📷 Instagram', href: 'https://www.instagram.com/nosoycris_7/', primary: false },
]

export default function Contact() {
  return (
    <section id="contacto" className="py-28 px-4 bg-slate-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 dots-bg opacity-20 pointer-events-none" />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            ¿Interesado en colaborar?
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            Estoy disponible para proyectos freelance, colaboraciones y oportunidades de
            trabajo. ¡No dudes en contactarme!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {links.map(({ label, href, primary }) => (
              <motion.a
                key={href}
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.96 }}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`px-7 py-3.5 rounded-xl font-semibold no-underline transition-all shadow-lg ${
                  primary
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                    : 'glass text-white hover:bg-white/10'
                }`}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
