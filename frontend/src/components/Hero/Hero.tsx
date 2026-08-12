import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '../Effects/AnimatedText'
import TiltCard from '../Effects/TiltCard'
import MagneticWrapper from '../Effects/MagneticWrapper'
import RippleEffect from '../Effects/RippleEffect'
import './Hero.css'

const CV_DOWNLOAD_URL = 'https://drive.google.com/file/d/1J8R8q5fBbhc-kB6CPKldpkm4b-G5fN6H/view?usp=drive_link'

export default function Hero() {
  const handleDownloadCV = (e: MouseEvent) => {
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
          <MagneticWrapper strength={0.2}>
            <div className="hero-meta-badge">
              <span className="pulse-indicator">
                <span className="hero-status-dot"></span>
              </span>
              <span>Seeking Backend / Full-Stack Internships</span>
            </div>
          </MagneticWrapper>

          <div className="hero-title-wrapper" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <AnimatedText
              text="Building clean web applications & backend APIs"
              el="h1"
              className="hero-title"
              staggerDuration={0.04}
            />
          </div>

          <p className="hero-subtitle">
            Hi, I'm <strong>Pham Hoang Vu</strong> — a 2nd-year IT student at DUT passionate about web development, building APIs with Node.js, TypeScript, Express, and PostgreSQL.
          </p>

          <div className="hero-cta-group">
            <MagneticWrapper strength={0.4}>
              <RippleEffect>
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
              </RippleEffect>
            </MagneticWrapper>

            <MagneticWrapper strength={0.4}>
              <RippleEffect>
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
              </RippleEffect>
            </MagneticWrapper>
          </div>
        </motion.div>

        <TiltCard maxTilt={12} glareOpacity={0.3} scaleOnHover={1.04}>
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
        </TiltCard>
      </div>
    </section>
  )
}
