import { motion } from 'framer-motion'
import { FadeUp, Stagger, StaggerItem } from './motion'

const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const skillGroups = [
  {
    title: '🌐 Frontend',
    accent: 'border-t-blue-500',
    titleColor: 'text-blue-600',
    glow: 'hover:shadow-blue-100',
    skills: [
      { name: 'HTML5', icon: `${ICON_BASE}/html5/html5-original.svg` },
      { name: 'CSS3', icon: `${ICON_BASE}/css3/css3-original.svg` },
      { name: 'JavaScript', icon: `${ICON_BASE}/javascript/javascript-original.svg` },
      { name: 'TypeScript', icon: `${ICON_BASE}/typescript/typescript-original.svg` },
      { name: 'React', icon: `${ICON_BASE}/react/react-original.svg` },
      { name: 'Angular', icon: `${ICON_BASE}/angular/angular-original.svg` },
      { name: 'Bootstrap', icon: `${ICON_BASE}/bootstrap/bootstrap-original.svg` },
      { name: 'Vite', icon: `${ICON_BASE}/vitejs/vitejs-original.svg` },
    ],
  },
  {
    title: '🗄️ Backend',
    accent: 'border-t-emerald-500',
    titleColor: 'text-emerald-600',
    glow: 'hover:shadow-emerald-100',
    skills: [
      { name: 'PHP', icon: `${ICON_BASE}/php/php-original.svg` },
      { name: 'Node.js', icon: `${ICON_BASE}/nodejs/nodejs-original.svg` },
      { name: 'Deno', icon: `${ICON_BASE}/denojs/denojs-original.svg` },
      { name: 'Java', icon: `${ICON_BASE}/java/java-original.svg` },
      { name: 'Python', icon: `${ICON_BASE}/python/python-original.svg` },
      { name: 'MySQL', icon: `${ICON_BASE}/mysql/mysql-original.svg` },
      { name: 'MongoDB', icon: `${ICON_BASE}/mongodb/mongodb-original.svg` },
    ],
  },
  {
    title: '🔧 Herramientas',
    accent: 'border-t-violet-500',
    titleColor: 'text-violet-600',
    glow: 'hover:shadow-violet-100',
    skills: [
      { name: 'Git', icon: `${ICON_BASE}/git/git-original.svg` },
      { name: 'GitHub', icon: `${ICON_BASE}/github/github-original.svg` },
      { name: 'VS Code', icon: `${ICON_BASE}/vscode/vscode-original.svg` },
      { name: 'Docker', icon: `${ICON_BASE}/docker/docker-original.svg` },
      { name: 'WordPress', icon: `${ICON_BASE}/wordpress/wordpress-original.svg` },
    ],
  },
]

export default function Skills() {
  return (
    <section id="habilidades" className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-800 mb-3">
            🛠️ Habilidades Técnicas
          </h2>
          <p className="text-center text-slate-400 text-base mb-14">
            Tecnologías que uso para construir soluciones reales
          </p>
        </FadeUp>

        <Stagger className="grid md:grid-cols-3 gap-6">
          {skillGroups.map(({ title, accent, titleColor, glow, skills }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className={`bg-white rounded-2xl p-7 border-t-4 ${accent} shadow-md ${glow} hover:shadow-xl transition-shadow duration-300 shimmer h-full`}
              >
                <h3 className={`text-lg font-bold text-center ${titleColor} mb-6`}>{title}</h3>

                <div className="grid grid-cols-4 gap-3">
                  {skills.map(({ name, icon }) => (
                    <motion.div
                      key={name}
                      whileHover={{ scale: 1.15, y: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="flex flex-col items-center gap-1.5 cursor-default"
                      title={name}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-sm p-1.5">
                        <img
                          src={icon}
                          alt={name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.parentElement!.innerHTML = `<span class="text-lg">${name[0]}</span>`
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium text-center leading-tight">
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
