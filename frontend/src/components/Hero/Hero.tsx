import { motion } from 'framer-motion'
import './Hero.css'

const CV_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=18rhFjj3gVYAUOwtzz98tLEr0FJ0bKH00'

export default function Hero() {
  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(CV_DOWNLOAD_URL, '_blank')
  }

  return (
    <section id="home" className="hero-workbench" aria-label="Hero Introduction">
      <div className="hero-workbench-grid">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-meta-badge">
            <span className="pulse-indicator">
              <span className="hero-status-dot"></span>
            </span>
            <span>Available for backend & full-stack roles</span>
          </div>

          <h1 className="hero-title">
            Engineering scalable web services & <span className="hero-title-highlight">clean APIs</span>
          </h1>

          <p className="hero-subtitle">
            Hi, I'm <strong>Pham Hoang Vu</strong> — an IT student at DUT specializing in Node.js, TypeScript, PostgreSQL, and modern web architectures with a focus on code quality and user experience.
          </p>

          <div className="hero-cta-group">
            <motion.a
              href="#projects"
              className="btn-primary-tactile"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span>View Projects</span>
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </motion.a>

            <motion.button
              onClick={handleDownloadCV}
              className="btn-secondary-tactile"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              aria-label="Download Resume"
            >
              <i className="fas fa-file-arrow-down" aria-hidden="true"></i>
              <span>Get Resume</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="hero-visual-card"
        >
          <motion.div
            className="hero-avatar-wrapper"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}avatar.jpg`}
              alt="Pham Hoang Vu Avatar"
              className="hero-avatar-img"
            />
          </motion.div>

          <div className="hero-visual-info">
            <span className="hero-visual-name">Pham Hoang Vu</span>
            <span className="hero-visual-role">Software Engineer / DUT Student</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
