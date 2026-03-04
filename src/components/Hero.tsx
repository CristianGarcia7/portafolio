import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const profilePhoto =
  'https://cpro7.wordpress.com/wp-content/uploads/2025/01/img_20240520_121732.jpg'

const roles = [
  'Full Stack Developer',
  'React & TypeScript Dev',
  'PHP + MySQL Engineer',
  'Soluciones en Producción',
]

function useTypewriter(texts: string[], typingSpeed = 75, pauseDuration = 2200) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'deleting' | 'pausing'>('typing')

  useEffect(() => {
    const current = texts[idx]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), typingSpeed)
      } else {
        timeout = setTimeout(() => setPhase('deleting'), pauseDuration)
      }
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), typingSpeed / 2)
      } else {
        setIdx((prev) => (prev + 1) % texts.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [display, phase, idx, texts, typingSpeed, pauseDuration])

  return display
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const frame = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(frame)
      else setCount(target)
    }
    requestAnimationFrame(frame)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const metrics = [
  { value: 3, suffix: '', label: 'Centros SENA', icon: '🏢' },
  { value: 10, suffix: '+', label: 'Tecnologías', icon: '🛠️' },
  { value: 11, suffix: ' meses', label: 'En Producción', icon: '🚀' },
  { value: 4, suffix: '+', label: 'Proyectos', icon: '📦' },
]

export default function Hero() {
  const role = useTypewriter(roles)

  return (
    <section className="hero-bg relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-12 overflow-hidden">
      {/* Animated dots */}
      <div className="absolute inset-0 dots-bg opacity-25 pointer-events-none" />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.07, 0.14, 0.07] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.10, 0.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-violet-600 rounded-full blur-3xl pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-5">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="float-animation"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 via-violet-500 to-pink-500 blur-xl opacity-75 scale-110" />
            <img
              src={profilePhoto}
              alt="Cristian García"
              className="relative w-36 h-36 rounded-full object-cover border-4 border-white/20 shadow-2xl"
            />
            {/* Live badge */}
            <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping absolute" />
              <span className="w-1.5 h-1.5 rounded-full bg-white relative" />
              EN VIVO
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl md:text-6xl font-black gradient-text-name leading-tight"
        >
          Cristian Yohani García Rincón
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="h-9 flex items-center justify-center"
        >
          <p className="text-xl md:text-2xl text-white/85 font-medium">
            💻 <span>{role}</span>
            <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 align-middle animate-pulse" />
          </p>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-white/45 text-sm tracking-wider"
        >
          📍 Bogotá, Colombia
        </motion.p>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/30">
            💼 En Producción – SENA
          </span>
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/30">
            🎓 Tecnólogo en ADSO
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="flex flex-wrap justify-center gap-4 mt-1"
        >
          <motion.a
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
            href="mailto:cristiangarcia637@gmail.com"
            className="glass px-6 py-3 rounded-xl text-white font-semibold no-underline transition-all shadow-lg hover:bg-white/10"
          >
            📧 Contactar
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
            href="https://github.com/Cril727"
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-6 py-3 rounded-xl text-white font-semibold no-underline transition-all shadow-lg hover:bg-white/10"
          >
            🔗 GitHub
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.96 }}
            href="#proyectos"
            onClick={(e) => { e.preventDefault(); document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-6 py-3 rounded-xl text-blue-400 font-semibold no-underline border border-blue-400/40 hover:bg-blue-400/10 transition-all shadow-lg"
          >
            🚀 Ver Proyectos
          </motion.a>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-2xl"
        >
          {metrics.map(({ value, suffix, label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.1, type: 'spring', stiffness: 200 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <p className="text-2xl mb-0.5">{icon}</p>
              <p className="text-2xl md:text-3xl font-black text-white">
                <AnimatedCounter target={value} suffix={suffix} />
              </p>
              <p className="text-white/50 text-xs mt-0.5 leading-tight">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-white/25 text-[10px] tracking-widest uppercase">scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-white/15 flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-blue-400 rounded-full scroll-dot" />
        </div>
      </motion.div>
    </section>
  )
}
