import { useEffect, useState, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion, useInView, AnimatePresence, type Variants, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion'
import ParticleBackground from './components/ParticleBackground'
import './index.css'

// ---- Framer Motion Variants ----
const easeOutExpo = [0.16, 1, 0.3, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo, delay: i * 0.08 },
  }),
}

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    }
  }
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOutExpo
    }
  }
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
  { label: 'TypeScript', icon: 'devicon-typescript-plain colored' },
  { label: 'JavaScript', icon: 'devicon-javascript-plain colored' },
  { label: 'Java', icon: 'devicon-java-plain colored' },
  { label: 'Node.js', icon: 'devicon-nodejs-plain colored' },
  { label: 'Express', icon: 'devicon-express-original' },
  { label: 'Nuxt.js', icon: 'devicon-nuxtjs-plain colored' },
  
]

const databases: TechItem[] = [
  { label: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
  { label: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
]

const devopsAndTools: TechItem[] = [
  { label: 'Docker', icon: 'devicon-docker-plain colored' },
  { label: 'Git', icon: 'devicon-git-plain colored' },
  { label: 'GitHub', icon: 'devicon-github-original' },
  { label: 'Postman', icon: 'devicon-postman-plain colored' },
  { label: 'Cloudflare', icon: 'devicon-cloudflare-plain colored' },
]

// ---- Skill Card ----
function SkillCard({ tech, index }: { tech: TechItem; index: number }) {
  return (
    <motion.div
      className="skill-card"
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(167, 139, 250, 0.4)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <i className={tech.icon}></i>
      <span>{tech.label}</span>
    </motion.div>
  )
}

// ---- About Terminal ----
function AboutTerminal() {
  return (
    <Section id="about" className="about-section">
      <div className="section-header">
        <h2>About Me</h2>
        <p>A peek into my setup and background</p>
      </div>

      <motion.div 
        className="terminal-window"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span className="terminal-title">system_profile.sh</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">$</span> <span className="command">whoami</span>
          </div>
          <div className="terminal-output">
            <p className="highlight">phamhoangvu</p>
            <p className="dim">// Software Engineer based in Da Nang, Viet Nam</p>
            <p>Passionate about building stable APIs, scalable backends, and responsive web user interfaces.</p>
          </div>

          <div className="terminal-line mt-4">
            <span className="prompt">$</span> <span className="command">cat education.txt</span>
          </div>
          <div className="terminal-output">
            <p className="highlight">Da Nang University of Science and Technology (DUT)</p>
            <p className="dim">// IT Student & Web Developer Intern</p>
          </div>

          <div className="terminal-line mt-4">
            <span className="prompt">$</span> <span className="command">cat philosophy.json</span>
          </div>
          <div className="terminal-output text-green">
            <p>&#123;</p>
            <p className="indent">"codeQuality": "Clean & self-documenting",</p>
            <p className="indent">"focus": "Performance & User Experience",</p>
            <p className="indent">"learning": "Always exploring new architectures"</p>
            <p>&#125;</p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

// ---- Main App ----
function App() {
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [formStatus, setFormStatus] = useState("")

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('phamvuhoang486@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setFormStatus("Thank you! Your message has been sent successfully.")
      const form = e.target as HTMLFormElement
      form.reset()
      setTimeout(() => setFormStatus(""), 5000)
    }, 1500)
  }

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  // Làm mượt cuộn trang cho nền Mesh Gradient
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 45, damping: 20 })

  // Blob 1: Góc trên bên trái -> Giữa bên phải, đổi màu tím -> xanh lá -> đồng cổ
  const blob1X = useTransform(smoothScroll, [0, 0.4, 0.8, 1], ["5vw", "60vw", "30vw", "10vw"])
  const blob1Y = useTransform(smoothScroll, [0, 0.4, 0.8, 1], ["10vh", "35vh", "65vh", "80vh"])
  const blob1Bg = useTransform(smoothScroll, [0, 0.35, 0.7, 1], ["#4f46e5", "#059669", "#d97706", "#4f46e5"])

  // Blob 2: Giữa bên phải -> Dưới bên trái, đổi màu xanh dương -> hồng tím -> vàng đồng
  const blob2X = useTransform(smoothScroll, [0, 0.4, 0.8, 1], ["85vw", "15vw", "70vw", "80vw"])
  const blob2Y = useTransform(smoothScroll, [0, 0.4, 0.8, 1], ["40vh", "75vh", "25vh", "15vh"])
  const blob2Bg = useTransform(smoothScroll, [0, 0.35, 0.7, 1], ["#0284c7", "#db2777", "#ca8a04", "#0284c7"])

  // Blob 3: Dưới bên trái -> Tăng kích thước và độ sáng ở phần Contact
  const blob3Scale = useTransform(smoothScroll, [0, 0.5, 0.8, 1], [0.8, 1.1, 1.4, 1.8])
  const blob3Opacity = useTransform(smoothScroll, [0, 0.6, 0.8, 1], [0.03, 0.05, 0.12, 0.18])
  const blob3Bg = useTransform(smoothScroll, [0, 0.5, 1], ["#7c3aed", "#4f46e5", "#db2777"])

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
      
      {/* ===== DYNAMIC MESH GRADIENT BACKGROUND ===== */}
      <motion.div 
        className="bg-blob blob-1" 
        style={{ left: blob1X, top: blob1Y, x: "-50%", y: "-50%", backgroundColor: blob1Bg }} 
      />
      <motion.div 
        className="bg-blob blob-2" 
        style={{ left: blob2X, top: blob2Y, x: "-50%", y: "-50%", backgroundColor: blob2Bg }} 
      />
      <motion.div 
        className="bg-blob blob-3" 
        style={{ 
          left: "50vw", 
          top: "85vh", 
          x: "-50%", 
          y: "-50%", 
          scale: blob3Scale, 
          opacity: blob3Opacity, 
          backgroundColor: blob3Bg 
        }} 
      />

      <motion.div className="cursor-glow" style={{ left: springX, top: springY }} />

      {/* ===== NAVBAR ===== */}
      <nav className="top-nav">
        <a href="#home" className="logo" onClick={handleNavClick}>
          phamhoangvu
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
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
            <a href="#about" onClick={handleNavClick}><i className="fas fa-user"></i>About</a>
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
        <motion.div 
          className="hero-content"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-visual" variants={heroItem}>
            <motion.img
              src={`${import.meta.env.BASE_URL}avatar.jpg`}
              alt="Avatar"
              className="hero-avatar"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>

          <motion.h1 className="hero-name" variants={heroItem}>
            Pham Hoang <span className="text-gradient-alt">Vu</span>
          </motion.h1>

          <motion.h2 className="hero-role" variants={heroItem}>
            Software Engineer
          </motion.h2>

          <motion.p className="hero-description" variants={heroItem}>
            I build clean, friendly, and responsive websites. I love turning complex ideas into simple and beautiful digital experiences.
          </motion.p>

          <motion.div className="hero-buttons" variants={heroItem}>
            <a href="#projects" className="btn-primary-magnetic">
              <span>Explore My Work</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <button onClick={handleDownloadCV} className="btn-secondary-glass">
              <i className="fas fa-download"></i> Get Resume
            </button>
          </motion.div>
        </motion.div>
      </header>

      {/* ===== ABOUT TERMINAL ===== */}
      <AboutTerminal />

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
          <motion.div 
            className="experience-card"
            whileHover={{ y: -4, borderColor: 'rgba(124, 58, 237, 0.4)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
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
              <li>
                <strong>Basic API Development:</strong> Contributed to developing <strong>RESTful APIs</strong> for essential features, including vehicle management, booking lists, and user information.
              </li>
              <li>
                <strong>RBAC Implementation:</strong> Implemented <strong>Role-Based Access Control (RBAC)</strong> to secure API endpoints by verifying user roles before granting access to specific resources.
              </li>
              <li>
                <strong>Input Data Validation:</strong> Utilized the <strong>Zod</strong> library to validate incoming API request data (such as names, phone numbers, and timestamps), ensuring data integrity before server-side processing.
              </li>
              <li>
                <strong>Database Interaction:</strong> Performed basic <strong>CRUD</strong> operations (Create, Read, Update, Delete) using <strong>Drizzle ORM</strong> to manage and interact with the <strong>PostgreSQL</strong> database efficiently.
              </li>
            </ul>

            <div className="experience-footer-row">
              <div className="location-pin">
                <i className="fas fa-location-dot"></i>
                <span>289 Dong Da, Da Nang, Viet Nam</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="projects-section">
        <Section>
          <div className="section-header">
            <h2>Featured Project</h2>
            <p>A deep dive into my core full-stack engineering work</p>
          </div>
        </Section>

        <Section>
                <motion.div
                  className="showcase-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Top row: Project Title & Badges */}
                  <div className="showcase-header">
                    <div className="showcase-title-area">
                <span className="project-badge">FULL-STACK SYSTEM</span>
                <h3>Nuxt 3 E-Commerce Platform</h3>
                <p className="showcase-subtitle">
                  Complete shopping interface & Admin Management Dashboard with real-time database syncing.
                </p>
                    </div>
                    <a 
                href="https://github.com/phamhoangvu2k7/Ecommerce" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn-github-large"
                    >
                      <i className="fa-brands fa-github"></i>
                      <span>View Repository</span>
                    </a>
                  </div>

            {/* Architecture diagram/tech stack tags */}
                  <div className="showcase-tech-stack">
              <span className="tech-tag nuxt">Nuxt 3</span>
              <span className="tech-tag vue">Vue 3</span>
              <span className="tech-tag nitro">Nitro v3</span>
              <span className="tech-tag ts">TypeScript</span>
              <span className="tech-tag mongo">MongoDB</span>
              <span className="tech-tag pinia">Pinia</span>
              <span className="tech-tag cloudinary">Cloudinary</span>
                  </div>

                  {/* Grid of features */}
                  <div className="showcase-features-grid">
              <div className="feature-item-card">
                <div className="feature-icon-wrap bg-purple-10">
                  <i className="fas fa-chart-line text-purple"></i>
                </div>
                <h4>Admin Dashboard</h4>
                <p>Manage infinite-level category trees, direct Cloudinary media uploads, and soft-deletes (Trash Bin) with recovery options.</p>
              </div>

              <div className="feature-item-card">
                <div className="feature-icon-wrap bg-blue-10">
                  <i className="fas fa-arrows-spin text-blue"></i>
                </div>
                <h4>Automatic Cart Merging</h4>
                <p>Ensures user retention by automatically merging guest-shopper cart items into their main account upon secure login.</p>
              </div>

              <div className="feature-item-card">
                <div className="feature-icon-wrap bg-green-10">
                  <i className="fas fa-warehouse text-green"></i>
                </div>
                <h4>Inventory Guard & Restock</h4>
                <p>Protects business logic with real-time inventory checks at checkout. Instantly restocks quantities back to database on cancellations.</p>
              </div>

              <div className="feature-item-card">
                <div className="feature-icon-wrap bg-yellow-10">
                  <i className="fas fa-shield-halved text-yellow"></i>
                </div>
                <h4>JWT & SMTP OTP Recovery</h4>
                <p>Passwords encrypted with Bcrypt, route guards enforced using JSON Web Tokens, and SMTP Nodemailer OTP codes with 3-minute validation.</p>
              </div>
            </div>

            {/* Micro-interactive bottom panel: Code stats */}
            <div className="showcase-footer">
              <div className="stat-pill">
                <span className="dot dot-green"></span>
                <span>Production Ready</span>
              </div>
              <div className="stat-pill">
                <span className="dot dot-blue"></span>
                <span>TypeScript Engine</span>
              </div>
              <div className="stat-pill">
                <span className="dot dot-yellow"></span>
                <span>Vanilla CSS Styling</span>
              </div>
          </div>
          </motion.div>
        </Section>
      </section>

      {/* ===== CONTACT / FOOTER ===== */}
      <section id="contact" className="contact-section">
        <Section>
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p>Let's build something extraordinary together.</p>
          </div>
        </Section>

        <div className="contact-grid">
          {/* Cột trái: Thông tin liên hệ & sao chép email */}
          <motion.div 
            className="contact-info-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <div className="info-header">
              <i className="fas fa-paper-plane"></i>
              <h3>Contact Details</h3>
            </div>
            
            <p className="info-text">
              I am open to backend developer roles, frontend projects, and full-stack collaborations. Drop me a line!
            </p>

            <div className="email-copy-wrapper">
              <span className="email-label">EMAIL ME AT</span>
              <div className="email-row">
                <span className="email-text">phamvuhoang486@gmail.com</span>
                <button 
                  onClick={handleCopyEmail} 
                  className={`btn-copy-email ${copied ? 'copied' : ''}`}
                  type="button"
                  title="Copy to Clipboard"
                >
                  <i className={copied ? "fas fa-check" : "far fa-copy"}></i>
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="social-connect">
              <span className="connect-label">FIND ME ON</span>
              <div className="contact-socials">
                <a href="https://github.com/phamhoangvu2k7" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
                  <i className="fa-brands fa-github"></i>
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/phamhoangvu" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Cột phải: Form liên hệ nhanh */}
          <motion.div 
            className="contact-form-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <form onSubmit={handleSendMessage} className="contact-form">
              <div className="form-group">
                <label htmlFor="form-name">Your Name</label>
                <input 
                  type="text" 
                  id="form-name" 
                  name="name" 
                  required 
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-email">Email Address</label>
                <input 
                  type="email" 
                  id="form-email" 
                  name="email" 
                  required 
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-message">Message</label>
                <textarea 
                  id="form-message" 
                  name="message" 
                  rows={4} 
                  required 
                  placeholder="Hi Vu, I would like to talk about..."
                ></textarea>
              </div>

              <button type="submit" className="btn-send-message">
                <span>{sending ? "Sending..." : "Send Message"}</span>
                <i className="fas fa-arrow-right"></i>
              </button>
              
              {formStatus && (
                <p className="form-status text-green mt-3">{formStatus}</p>
              )}
            </form>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pham Hoang Vu. All rights reserved.</p>
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
