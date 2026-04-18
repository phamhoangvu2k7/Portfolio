import { useEffect, useState, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion, useInView, type Variants } from 'framer-motion'
import projects from './data/projects'
import './index.css'

interface TechItem {
  label: string;
  icon: React.ReactNode;
  color?: string;
  bg?: string;
  textColor?: string;
  fontSize?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div id={id} ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

function OrbitalRing({
  radius,
  items,
}: {
  radius: number;
  items: TechItem[];
}) {
  const angleStep = 360 / items.length
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <>
      <div style={{
        position: 'absolute',
        width: radius * 2,
        height: radius * 2,
        top: '50%',
        left: '50%',
        marginTop: -radius,
        marginLeft: -radius,
        borderRadius: '50%',
        border: '1px solid rgba(120, 100, 255, 0.2)',
        pointerEvents: 'none',
      }} />

      {items.map((tech, i) => {
        const angleDeg = i * angleStep - 90
        const angleRad = (angleDeg * Math.PI) / 180
        const x = radius * Math.cos(angleRad)
        const y = radius * Math.sin(angleRad)
        const isHovered = hovered === tech.label

        return (
          <motion.div
            key={tech.label}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: 80,
              height: 80,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: tech.bg ?? '#18181b',
              border: `1px solid ${isHovered ? 'rgba(167,139,250,0.7)' : 'rgba(255,255,255,0.08)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isHovered ? '0 0 22px rgba(167,139,250,0.5)' : '0 4px 16px rgba(0,0,0,0.6)',
              color: tech.textColor ?? '#ffffff',
              fontSize: tech.fontSize ?? '2.6rem',
              fontWeight: 800,
              cursor: 'default',
              zIndex: isHovered ? 20 : 2,
            }}
            onHoverStart={() => setHovered(tech.label)}
            onHoverEnd={() => setHovered(null)}
          >
            {tech.icon}
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: '50%',
                  translateX: '-50%',
                  whiteSpace: 'nowrap',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: 'rgba(0,0,0,0.9)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  pointerEvents: 'none',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {tech.label}
              </motion.span>
            )}
          </motion.div>
        )
      })}
    </>
  )
}

const innerTechs: TechItem[] = [
  { label: 'JavaScript', icon: <i className="devicon-javascript-plain colored"></i> },
  { label: 'TypeScript', icon: <i className="devicon-typescript-plain colored"></i> },
  { label: 'MySQL', icon: <i className="devicon-mysql-plain colored"></i> },
  { label: 'Express', icon: <i className="devicon-express-original colored"></i> },
]

const outerTechs: TechItem[] = [
  { label: 'Node.js', icon: <i className="devicon-nodejs-plain colored"></i> },
  { label: 'MongoDB', icon: <i className="devicon-mongodb-plain colored"></i> },
  { label: 'PostgreSQL', icon: <i className="devicon-postgresql-plain colored"></i> },
  { label: 'Git', icon: <i className="devicon-git-plain colored"></i> },
  { label: 'Java', icon: <i className="devicon-java-plain colored"></i> },
  { label: 'Postman', icon: <i className="devicon-postman-plain colored"></i> },
  { label: 'Nitro', icon: <i className="devicon-nuxtjs-plain colored"></i> },
  { label: 'Docker', icon: <i className="devicon-docker-plain colored"></i> },
]

function App() {
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')
    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [])

  const handleLottieComplete = () => {
    if (overlayRef.current) {
      overlayRef.current.classList.add('hidden')
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
      setTimeout(() => setLoadingComplete(true), 800)
    }
  }

  return (
    <>
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>

      <nav className="top-nav">
        <a href="#home" className="logo">
          phamhoangvu
        </a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#skills">Skill</a>
          <a href="#projects">Project</a>
        </div>
      </nav>

      {!loadingComplete && (
        <div id="loading-overlay" ref={overlayRef}>
          <Player
            src={`${import.meta.env.BASE_URL}Hello.json`}
            background="transparent"
            speed={1.5}
            style={{ width: '400px', height: '400px', filter: 'drop-shadow(0 0 20px rgba(79, 70, 229, 0.4))' }}
            autoplay
            keepLastFrame
            onEvent={(event) => {
              if (event === 'complete') handleLottieComplete()
            }}
          />
        </div>
      )}

      <header id="home" className="hero">
        <div className="hero-content">
          <motion.img
            src={`${import.meta.env.BASE_URL}avatar.jpg`}
            alt="Avatar"
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.05 }}
          />

          <motion.h1 className="hero-name" variants={fadeUp} initial="hidden" animate="visible">
            Pham Hoang <span style={{ color: '#ffffff' }}>Vu</span>
          </motion.h1>

          <motion.h2 className="hero-role" variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.1 }}>
            Software Engineer
          </motion.h2>

          <motion.p className="hero-description" variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.2 }}>
            I can help you build websites, applications, and innovative robust solutions.
            Optimizing SEO, page loading speed, and delivering exceptional user experiences.
          </motion.p>


        </div>
      </header>

      <Section id="skills" className="orbital-section">
        <motion.div className="orbital-header" variants={staggerContainer}>
          <motion.h2 variants={fadeUp}>What technologies do I use?</motion.h2>
          <motion.p variants={fadeUp}>Mastering modern technologies to build quality products</motion.p>
        </motion.div>

        <div className="orbit-wrapper">
          <div className="orbit-scene">
            <div className="orbit-glow"></div>

            <motion.div className="orbit-center-new"
              animate={{ boxShadow: ['0 0 40px rgba(99,88,255,0.5)', '0 0 80px rgba(99,88,255,1)', '0 0 40px rgba(99,88,255,0.5)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <i className="fas fa-bolt" style={{ fontSize: '2.5rem', color: 'white' }}></i>
            </motion.div>

            <OrbitalRing radius={145} items={innerTechs} />
            <OrbitalRing radius={243} items={outerTechs} />
          </div>
        </div>
      </Section>

      <main id="projects" className="bento-section">
        <Section>
          <motion.div className="bento-header" variants={staggerContainer}>
            <motion.h2 variants={fadeUp}>Projects &amp; Experience</motion.h2>
            <motion.p variants={fadeUp}>A collection of projects I've worked on throughout my career</motion.p>
          </motion.div>
        </Section>

        <div className="bento-grid">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="bento-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: (index % 3) * 0.1 }}
              whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.15)', boxShadow: '0 24px 50px rgba(0,0,0,0.5)' }}
            >
              <div className="bento-image-wrapper">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="bento-image" />
                ) : (
                  <div className="bento-placeholder"><i className="fas fa-laptop-code"></i></div>
                )}
              </div>
              <div className="bento-content">
                <div className="bento-title">
                  {project.title}
                  <i className="fas fa-arrow-right"></i>
                </div>
                <p className="bento-desc">{project.description}</p>
                <div className="bento-footer">
                  <span className="bento-tag">UX/UI</span>
                  <span className="bento-tag">Development</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </main>

      <motion.a
        href="mailto:contact@example.com"
        className="fab"
        title="Contact Me"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="far fa-envelope"></i>
      </motion.a>
    </>
  )
}

export default App
