import { useEffect, useState, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion, useInView, AnimatePresence, type Variants, useScroll, useSpring, useMotionValue } from 'framer-motion'
import projects from './data/projects'
import ParticleBackground from './components/ParticleBackground'
import './index.css'

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

// ---- Tech Data ----
interface TechItem {
  label: string
  icon: string
}

const languagesAndFrameworks: TechItem[] = [
  { label: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { label: 'TypeScript', icon: 'devicon-typescript-plain colored' },
  { label: 'Java', icon: 'devicon-java-plain colored' },
  { label: 'Node.js', icon: 'devicon-nodejs-plain colored' },
  { label: 'Express', icon: 'devicon-express-original' },
]

const databases: TechItem[] = [
  { label: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
  { label: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
  { label: 'MySQL', icon: 'devicon-mysql-plain colored' },
]

const devopsAndTools: TechItem[] = [
  { label: 'Docker', icon: 'devicon-docker-plain colored' },
  { label: 'Git', icon: 'devicon-git-plain colored' },
  { label: 'GitHub', icon: 'devicon-github-original' },
  { label: 'Postman', icon: 'devicon-postman-plain colored' },
  { label: 'Npm', icon: 'devicon-npm-original-wordmark colored' },
]

// ---- Skill Card ----
function SkillCard({ tech, index }: { tech: TechItem; index: number }) {
  return (
    <motion.div
      className="skill-card"
      custom={index}
      variants={cardVariants}
    >
      <i className={tech.icon}></i>
      <span>{tech.label}</span>
    </motion.div>
  )
}

// ---- Project Card ----
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
      <div className="project-icon-wrap" style={{ background: `${project.accentColor}18`, border: `1px solid ${project.accentColor}33` }}>
        <i className={project.icon} style={{ color: project.accentColor, fontSize: '2.2rem' }}></i>
      </div>

      <div className="project-content">
        <div className="project-title-row">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-github-icon">
            <i className="fa-brands fa-github"></i>
          </span>
        </div>
        <p className="project-description">{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

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
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')
    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const CV_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=18rhFjj3gVYAUOwtzz98tLEr0FJ0bKH00'

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(CV_DOWNLOAD_URL, '_blank')
  }

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
      <motion.div className="progress-bar" style={{ scaleX }} />

      <ParticleBackground />

      <div className="bg-grid"></div>
      <motion.div className="cursor-glow" style={{ left: mouseX, top: mouseY }} />
      <div className="bg-glow"></div>

      {/* ===== NAVBAR ===== */}
      <nav className="top-nav">
        <a href="#home" className="logo" onClick={handleNavClick}>
          phamhoangvu
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-right">
          <button onClick={handleDownloadCV} className="btn-download-cv">
            <i className="fas fa-download"></i>
            <span>Download CV</span>
          </button>

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

      {/* ===== MOBILE MENU ===== */}
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
            <a href="#skills" onClick={handleNavClick}><i className="fas fa-code"></i>Skills</a>
            <a href="#experience" onClick={handleNavClick}><i className="fas fa-briefcase"></i>Experience</a>
            <a href="#projects" onClick={handleNavClick}><i className="fas fa-folder-open"></i>Projects</a>
            <a href="#contact" onClick={handleNavClick}><i className="fas fa-envelope"></i>Contact</a>
            <button
              className="mobile-download-cv"
              onClick={(e) => { handleNavClick(); handleDownloadCV(e as unknown as React.MouseEvent) }}
            >
              <i className="fas fa-download"></i>Download CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}

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

          <motion.div className="hero-buttons" variants={fadeUp} initial="hidden" animate="visible"
            transition={{ delay: 0.35 }}>
            <a href="#projects" className="btn-primary-magnetic">
              <span>Explore My Work</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <button onClick={handleDownloadCV} className="btn-secondary-glass">
              <i className="fas fa-download"></i> Get Resume
            </button>
          </motion.div>
        </div>
      </header>

      {/* ===== SKILLS ===== */}
      <section id="skills" className="skills-section">
        <Section>
          <motion.div className="section-header" variants={staggerContainer}>
            <motion.h2 variants={fadeUp}>Skills & Technologies</motion.h2>
            <motion.p variants={fadeUp}>Technologies I use to build quality products</motion.p>
          </motion.div>
        </Section>

        <div className="skills-wrapper">
          <Section>
            <motion.div variants={staggerContainer}>
              <h3 className="skills-group-title">Languages & Frameworks</h3>
              <div className="skills-grid">
                {languagesAndFrameworks.map((tech, i) => (
                  <SkillCard key={tech.label} tech={tech} index={i} />
                ))}
              </div>
            </motion.div>
          </Section>

          <Section>
            <motion.div variants={staggerContainer}>
              <h3 className="skills-group-title">Databases</h3>
              <div className="skills-grid">
                {databases.map((tech, i) => (
                  <SkillCard key={tech.label} tech={tech} index={i} />
                ))}
              </div>
            </motion.div>
          </Section>

          <Section>
            <motion.div variants={staggerContainer}>
              <h3 className="skills-group-title">DevOps & Tools</h3>
              <div className="skills-grid">
                {devopsAndTools.map((tech, i) => (
                  <SkillCard key={tech.label} tech={tech} index={i} />
                ))}
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

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
                <span className="role-title">Intern Backend Developer</span>
              </div>
              <div className="experience-timeframe">3/2026 - Present</div>
            </div>

            <ul className="experience-bullets">
              <li>Develop and maintain RESTful APIs using Node.js and NestJS framework</li>
              <li>Work with PostgreSQL and MongoDB databases for data modeling and query optimization</li>
              <li>Collaborate with the team using Git workflows and code review processes</li>
              <li>Write unit tests and integration tests to ensure code quality</li>
            </ul>

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

      {/* ===== CONTACT / FOOTER ===== */}
      <footer id="contact" className="contact-section">
        <Section>
          <motion.div className="section-header" variants={staggerContainer}>
            <motion.h2 variants={fadeUp}>Get in Touch</motion.h2>
            <motion.p variants={fadeUp}>Feel free to reach out for collaborations or opportunities</motion.p>
          </motion.div>
        </Section>

        <motion.div className="contact-content" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="contact-socials">
            <a href="https://github.com/phamhoangvu2k7" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/phamhoangvu" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pham Hoang Vu. All rights reserved.</p>
        </div>
      </footer>

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
