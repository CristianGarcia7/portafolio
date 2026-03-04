import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-950 text-white border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="text-2xl font-black gradient-text mb-3">&lt;CG /&gt;</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Desarrollador Full Stack apasionado por construir soluciones que generan impacto real en las personas e instituciones.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Navegación</p>
            <ul className="space-y-2 list-none p-0 m-0">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors no-underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Contacto</p>
            <div className="space-y-2">
              <p className="text-slate-400 text-sm">📍 Bogotá, Colombia</p>
              <a href="mailto:cristiangarcia637@gmail.com" className="text-slate-400 hover:text-blue-400 text-sm no-underline transition-colors block">
                📧 cristiangarcia637@gmail.com
              </a>
              <a href="https://wa.me/3124314119" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 text-sm no-underline transition-colors block">
                📱 +57 312 431 4119
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © 2025 Cristian Yohani García Rincón. Todos los derechos reservados.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { label: 'GitHub', href: 'https://github.com/Cril727' },
              { label: 'Instagram', href: 'https://www.instagram.com/nosoycris_7/' },
              { label: 'WhatsApp', href: 'https://wa.me/3124314119' },
            ].map(({ label, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400/30 transition-colors no-underline text-xs font-bold"
                title={label}
              >
                {label[0]}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
