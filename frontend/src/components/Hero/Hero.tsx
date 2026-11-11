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
          className="hero-copy-column"
        >
          <MagneticWrapper strength={0.2}>
            <div className="hero-meta-badge">
              <span className="pulse-indicator">
                <span className="hero-status-dot"></span>
              </span>
              <span>Available for Internship &amp; Full-Time Opportunities</span>
            </div>
          </MagneticWrapper>

          <div className="hero-title-wrapper">
            <AnimatedText
              text="Architecting High-Throughput APIs & Distributed Web Systems"
              el="h1"
              className="hero-title"
              staggerDuration={0.035}
            />
          </div>

          <p className="hero-subtitle">
            Hi, I'm <strong>Pham Hoang Vu</strong> — a Software Engineer specializing in backend architectures, clean RESTful APIs, relational schema design, and edge-native distributed systems with Node.js, TypeScript, and&nbsp;Cloudflare.
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
                  <span>Explore Projects</span>
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
                  <span>Download Resume</span>
                </motion.button>
              </RippleEffect>
            </MagneticWrapper>
          </div>
        </motion.div>

        <TiltCard maxTilt={10} glareOpacity={0.25} scaleOnHover={1.03}>
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hero-workbench-card"
          >
            {/* Terminal Window Chrome */}
            <div className="workbench-card-header">
              <div className="workbench-card-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="workbench-card-title">engineer.profile</span>
              <span className="workbench-status-pill">LIVE</span>
            </div>

            <div className="workbench-card-body">
              <div className="hero-avatar-wrapper">
                <img
                  src={`${import.meta.env.BASE_URL}avatar.jpg`}
                  alt="Pham Hoang Vu — Software Engineer"
                  className="hero-avatar-img"
                  width="200"
                  height="200"
                  loading="eager"
                />
              </div>

              <div className="hero-visual-info">
                <span className="hero-visual-name">Pham Hoang Vu</span>
                <span className="hero-visual-role">Backend &amp; Full-Stack Systems Engineer</span>
                
                <div className="hero-location-chip">
                  <i className="fas fa-location-dot" aria-hidden="true"></i>
                  <span>Da Nang, Vietnam (UTC+7)</span>
                </div>
              </div>

              {/* Engineering Specs List */}
              <div className="workbench-metrics-list">
                <div className="metric-row">
                  <span className="metric-key">Runtime</span>
                  <span className="metric-val">Node.js · Cloudflare Edge</span>
                </div>
                <div className="metric-row">
                  <span className="metric-key">Architecture</span>
                  <span className="metric-val">REST APIs · RBAC Secure</span>
                </div>
                <div className="metric-row">
                  <span className="metric-key">Database</span>
                  <span className="metric-val">PostgreSQL · SQLite (D1)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </section>
  )
}
