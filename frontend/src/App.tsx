import { useEffect, useState, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion, useInView, AnimatePresence, type Variants, useScroll, useSpring, useMotionValue } from 'framer-motion'
import projects from './data/projects'
import './index.css'

// ---- Types ----
interface TechItem {
  label: string;
  icon: React.ReactNode;
  color?: string;
  bg?: string;
  textColor?: string;
  fontSize?: string;
}

// ---- Framer Motion Variants ----
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.15 },
  }),
}

// ---- Scroll-triggered Section ----
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  return (
    <motion.div id={id} ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} className={className}>
      {children}
    </motion.div>
  )
}

// ---- Orbital Ring Component ----
function OrbitalRing({ radius, items }: { radius: number; items: TechItem[] }) {
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

// ---- Tech Data ----
const innerTechs: TechItem[] = [
  { label: 'Node.js', icon: <i className="devicon-nodejs-plain colored"></i> },
  { label: 'JavaScript', icon: <i className="devicon-javascript-plain colored"></i> },
  { label: 'TypeScript', icon: <i className="devicon-typescript-plain colored"></i> },
  { label: 'PostgreSQL', icon: <i className="devicon-postgresql-plain colored"></i> },
  { label: 'Docker', icon: <i className="devicon-docker-plain colored"></i> },
]

const outerTechs: TechItem[] = [
  { label: 'Npm', icon: <i className="devicon-npm-plain colored"></i> },
  { label: 'MongoDB', icon: <i className="devicon-mongodb-plain colored"></i> },
  { label: 'MySQL', icon: <i className="devicon-mysql-plain colored"></i> },
  { label: 'Express', icon: <i className="devicon-express-original colored" style={{ color: '#FFFFFF' }}></i> },
  { label: 'Git', icon: <i className="devicon-git-plain colored"></i> },
  { label: 'Java', icon: <i className="devicon-java-plain colored"></i> },
  { label: 'Postman', icon: <i className="devicon-postman-plain colored"></i> },
  { label: 'Nitro', icon: <i className="devicon-nuxtjs-plain colored"></i> },
  { label: 'Github', icon: <i className="devicon-github-plain colored" style={{ color: '#FFFFFF' }}></i> },
]

// ---- Project Card Component ----
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="project-card"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{ '--accent-color': project.accentColor } as React.CSSProperties}
    >
      {/* Icon area */}
      <div className="project-icon-wrap" style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}33` }}>
        <i className={project.icon} style={{ color: project.accentColor, fontSize: '2.2rem' }}></i>
      </div>

      {/* Content */}
      <div className="project-content">
        <div className="project-title-row">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-github-icon">
            <i className="fab fa-github"></i>
          </span>
        </div>
        <p className="project-description">{project.description}</p>

        {/* Tech tags */}
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="project-cta">
          <span>View on GitHub</span>
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </motion.a>
  )
}

// ---- Main App ----
function App() {
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Mouse move for background glow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  // Lock scroll during intro animation
  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')
    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [])

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Download CV via Google Drive direct download link
  const CV_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=18rhFjj3gVYAUOwtzz98tLEr0FJ0bKH00'

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(CV_DOWNLOAD_URL, '_blank')
  }

  // Close menu on link click
  const handleNavClick = () => setMenuOpen(false)

  const handleLottieComplete = () => {
    if (overlayRef.current) {
      overlayRef.current.classList.add('hidden')
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
      setTimeout(() => setLoadingComplete(true), 800)
    }
  }

  return (
    <div onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
      {/* Scroll Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      {/* Background */}
      <div className="bg-grid"></div>
      <motion.div
        className="cursor-glow"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />
      <div className="bg-glow"></div>

      {/* ===== NAVBAR ===== */}
      <nav className="top-nav">
        <a href="#home" className="logo" onClick={handleNavClick}>
          phamhoangvu
        </a>

        {/* Center links — desktop */}
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#skills">Skill</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Project</a>
        </div>

        {/* Right side — desktop Download CV */}
        <div className="nav-right">
          <button
            onClick={handleDownloadCV}
            className="btn-download-cv"
          >
            <i className="fas fa-download"></i>
            <span>Download CV</span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <a href="#home" onClick={handleNavClick}><i className="fas fa-house"></i>Home</a>
            <a href="#skills" onClick={handleNavClick}><i className="fas fa-code"></i>Skill</a>
            <a href="#experience" onClick={handleNavClick}><i className="fas fa-briefcase"></i>Experience</a>
            <a href="#projects" onClick={handleNavClick}><i className="fas fa-folder-open"></i>Project</a>
            <button
              className="mobile-download-cv"
              onClick={(e) => { handleNavClick(); handleDownloadCV(e as unknown as React.MouseEvent) }}
            >
              <i className="fas fa-download"></i>Download CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for closing menu */}
      {menuOpen && (
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
      )}

      {/* ===== LOADING OVERLAY ===== */}
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

      {/* ===== HERO ===== */}
      <header id="home" className="hero">
        <div className="hero-content">
          <div className="hero-visual">
            <motion.img
              src={`${import.meta.env.BASE_URL}avatar.jpg`}
              alt="Avatar"
              className="hero-avatar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
            />
            <div className="avatar-ring"></div>
          </div>

          <motion.h1 className="hero-name" variants={fadeUp} initial="hidden" animate="visible">
            Pham Hoang <span className="text-gradient-alt">Vu</span>
          </motion.h1>

          <motion.h2 className="hero-role" variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.1 }}>
            Software Engineer
          </motion.h2>

          <motion.p className="hero-description" variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.2 }}>
            I specialize in crafting high-performance web solutions with a focus on
            <span className="text-highlight"> scalability</span>,
            <span className="text-highlight"> smooth UX</span>, and
            <span className="text-highlight"> clean architecture</span>.
          </motion.p>

          {/* Hero CTA buttons */}
          <motion.div
            className="hero-buttons"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
          >
            <a href="#projects" className="btn-primary-magnetic">
              <span>Explore My Work</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <button
              onClick={handleDownloadCV}
              className="btn-secondary-glass"
            >
              <i className="fas fa-download"></i> Get Resume
            </button>
          </motion.div>
        </div>

      </header>

      {/* ===== SKILLS ===== */}
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

      {/* ===== EXPERIENCE ===== */}
      <section id="experience" className="experience-section">
        <Section>
          <motion.div className="section-header" variants={staggerContainer}>
            <motion.h2 variants={fadeUp}>Experience</motion.h2>
            <motion.p variants={fadeUp}>My professional path as a software engineer</motion.p>
          </motion.div>
        </Section>

        <div className="experience-wrapper">

          <div className="experience-card">
            <div className="timeline-dot"></div>
            <div className="experience-main-row">
              <div className="experience-company-box">
                <a
                  href="https://www.thecodeorigin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-name-link"
                >
                  Thecodeorigin
                </a>
                <span className="role-separator">—</span>
                <span className="role-title">internship backend</span>
              </div>
              <div className="experience-timeframe">3/2026 - Present</div>
            </div>

            <div className="experience-footer-row">
              <div className="location-pin">
                <i className="fas fa-location-dot"></i>
                <span>289 Dong Da, Da Nang, Viet Nam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="projects-section">
        <Section>
          <motion.div className="section-header" variants={staggerContainer}>
            <motion.h2 variants={fadeUp}>Selected Projects</motion.h2>
            <motion.p variants={fadeUp}>A showcase of my recent technical projects and works</motion.p>
          </motion.div>
        </Section>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* ===== CONTACT FAB ===== */}
      <motion.a
        href="mailto:phamvuhoang486@gmail.com"
        className="fab"
        title="Contact Me"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="far fa-envelope"></i>
      </motion.a>
    </div>
  )
}

export default App
