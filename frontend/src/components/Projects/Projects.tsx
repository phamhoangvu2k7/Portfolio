import { motion } from 'framer-motion'
import AnimatedText from '../Effects/AnimatedText'
import TiltCard from '../Effects/TiltCard'
import ScrollReveal from '../Effects/ScrollReveal'
import MagneticWrapper from '../Effects/MagneticWrapper'
import RippleEffect from '../Effects/RippleEffect'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects" className="projects-section" aria-label="Featured Engineering Projects">
      <ScrollReveal direction="up">
        <div className="section-header">
          <AnimatedText text="Featured Work" el="h2" gradient />
          <p>Full-stack systems, backend services, and web applications</p>
        </div>
      </ScrollReveal>

      {/* Featured Spotlight: E-Commerce */}
      <ScrollReveal direction="up" delay={0.15}>
        <TiltCard maxTilt={10} glareOpacity={0.25} scaleOnHover={1.02}>
          <div className="showcase-card">
            <div className="showcase-grid">
              <div className="showcase-info">
                <span className="project-badge-pill">FULL-STACK SYSTEM</span>
                <h3 className="showcase-title">E-Commerce System</h3>
                <p className="showcase-description">
                  Complete shopping interface & Admin Management Dashboard with real-time database syncing, deployed on Cloudflare network infrastructure.
                </p>

                <div className="showcase-tags">
                  <span className="tech-tag">Nuxt 3</span>
                  <span className="tech-tag">Nuxt Hub</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">SQLite (D1)</span>
                  <span className="tech-tag">Drizzle ORM</span>
                  <span className="tech-tag">Cloudflare</span>
                </div>

                <div style={{ marginTop: 'var(--space-4)' }}>
                  <MagneticWrapper strength={0.4}>
                    <RippleEffect>
                      <motion.a
                        href="https://github.com/phamhoangvu2k7/Ecommerce"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-tactile"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <i className="fab fa-github" aria-hidden="true"></i>
                        <span>View Repository</span>
                      </motion.a>
                    </RippleEffect>
                  </MagneticWrapper>
                </div>
              </div>

              <motion.figure
                className="showcase-media-figure"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}media/Screenshot 2026-07-18 215453.png`}
                  alt="E-Commerce Project Preview"
                  className="showcase-media-img"
                />
              </motion.figure>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>
    </section>
  )
}
