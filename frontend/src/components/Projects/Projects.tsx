import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '../Effects/AnimatedText'
import TiltCard from '../Effects/TiltCard'
import ScrollReveal from '../Effects/ScrollReveal'
import MagneticWrapper from '../Effects/MagneticWrapper'
import RippleEffect from '../Effects/RippleEffect'
import ArchitectureDeckModal from './ArchitectureDeckModal'
import './Projects.css'

export default function Projects() {
  const [isDeckOpen, setIsDeckOpen] = useState(false)

  return (
    <section id="projects" className="projects-section" aria-label="Featured Engineering Projects">
      <ScrollReveal direction="up">
        <div className="section-header">
          <AnimatedText text="Featured Engineering Systems" el="h2" />
          <p>Production-grade distributed web applications, edge architectures, and backend&nbsp;APIs</p>
        </div>
      </ScrollReveal>

      {/* Featured Project 1: Cloudflare Full-Stack E-Commerce System */}
      <ScrollReveal direction="up" delay={0.15}>
        <TiltCard maxTilt={6} glareOpacity={0.15} scaleOnHover={1.01}>
          <div className="showcase-card">
            <div className="showcase-grid">
              <div className="showcase-info">
                <div className="project-badge-row">
                  <span className="project-badge-pill">FULL-STACK EDGE SYSTEM</span>
                  <span className="project-status-dot">● Sub-35ms TTFB</span>
                </div>

                <h3 className="showcase-title">Cloudflare Edge E-Commerce System</h3>
                <p className="showcase-description">
                  An edge-native e-commerce engine featuring a customer storefront and high-performance Admin Dashboard. Architected on Cloudflare Pages and NuxtHub, utilizing serverless edge isolates and distributed SQLite (D1) with Drizzle ORM for end-to-end type&nbsp;safety.
                </p>

                <div className="showcase-specs-list">
                  <div className="spec-item">
                    <i className="fas fa-microchip" aria-hidden="true"></i>
                    <span>Serverless Edge Workers (0ms Cold Starts)</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-database" aria-hidden="true"></i>
                    <span>Cloudflare D1 SQLite with Global Read Replicas</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-shield-halved" aria-hidden="true"></i>
                    <span>Drizzle ORM Strictly Typed Schema Contracts</span>
                  </div>
                </div>

                <div className="showcase-tags">
                  <span className="tech-tag">Nuxt 3</span>
                  <span className="tech-tag">NuxtHub</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">Cloudflare D1</span>
                  <span className="tech-tag">Drizzle ORM</span>
                  <span className="tech-tag">SQLite</span>
                </div>

                <div className="showcase-actions">
                  <MagneticWrapper strength={0.3}>
                    <RippleEffect>
                      <button
                        onClick={() => setIsDeckOpen(true)}
                        className="btn-primary-tactile"
                        type="button"
                        aria-label="Open Interactive Architecture Deck"
                      >
                        <i className="fas fa-layer-group" aria-hidden="true"></i>
                        <span>View Architecture Deck</span>
                      </button>
                    </RippleEffect>
                  </MagneticWrapper>

                  <MagneticWrapper strength={0.3}>
                    <RippleEffect>
                      <a
                        href="https://github.com/phamhoangvu2k7/Ecommerce"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary-tactile"
                        aria-label="View Source Repository on GitHub"
                      >
                        <i className="fab fa-github" aria-hidden="true"></i>
                        <span>Repository</span>
                      </a>
                    </RippleEffect>
                  </MagneticWrapper>
                </div>
              </div>

              <motion.figure
                className="showcase-media-figure"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="media-chrome-bar">
                  <span className="chrome-dot red"></span>
                  <span className="chrome-dot yellow"></span>
                  <span className="chrome-dot green"></span>
                  <span className="chrome-url">https://ecommerce.edge.network</span>
                </div>
                <img
                  src={`${import.meta.env.BASE_URL}media/Screenshot 2026-07-18 215453.png`}
                  alt="Cloudflare E-Commerce Platform Preview"
                  className="showcase-media-img"
                  width="600"
                  height="380"
                  loading="lazy"
                />
              </motion.figure>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>

      {/* Featured Project 2: High-Throughput RESTful API Engine */}
      <ScrollReveal direction="up" delay={0.2}>
        <TiltCard maxTilt={6} glareOpacity={0.15} scaleOnHover={1.01}>
          <div className="showcase-card">
            <div className="showcase-grid">
              <div className="showcase-info">
                <div className="project-badge-row">
                  <span className="project-badge-pill">BACKEND API PLATFORM</span>
                  <span className="project-status-dot">● Production Architecture</span>
                </div>

                <h3 className="showcase-title">Vehicle &amp; Booking RESTful API Engine</h3>
                <p className="showcase-description">
                  A high-throughput backend microservice platform engineered for inventory listings, customer reservations, and role-based permissions. Features strict input validation using Zod schemas and comprehensive RBAC middleware guarding 15+ production&nbsp;endpoints.
                </p>

                <div className="showcase-specs-list">
                  <div className="spec-item">
                    <i className="fas fa-lock" aria-hidden="true"></i>
                    <span>RBAC JWT Authorization with Bitmask Privilege Checks</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-circle-check" aria-hidden="true"></i>
                    <span>100% Request Payload Validation via Zod Schemas</span>
                  </div>
                  <div className="spec-item">
                    <i className="fas fa-bolt" aria-hidden="true"></i>
                    <span>Sub-85ms P95 Latency on PostgreSQL with Drizzle ORM</span>
                  </div>
                </div>

                <div className="showcase-tags">
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">Express</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">PostgreSQL</span>
                  <span className="tech-tag">Drizzle ORM</span>
                  <span className="tech-tag">Zod</span>
                  <span className="tech-tag">JWT</span>
                </div>

                <div className="showcase-actions">
                  <MagneticWrapper strength={0.3}>
                    <RippleEffect>
                      <a
                        href="https://github.com/phamhoangvu2k7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-tactile"
                        aria-label="View Backend Projects on GitHub"
                      >
                        <i className="fab fa-github" aria-hidden="true"></i>
                        <span>Explore Repositories</span>
                      </a>
                    </RippleEffect>
                  </MagneticWrapper>

                  <MagneticWrapper strength={0.3}>
                    <RippleEffect>
                      <a
                        href="#contact"
                        className="btn-secondary-tactile"
                        aria-label="Request API Specification Docs"
                      >
                        <i className="fas fa-file-code" aria-hidden="true"></i>
                        <span>Request Postman Docs</span>
                      </a>
                    </RippleEffect>
                  </MagneticWrapper>
                </div>
              </div>

              <motion.figure
                className="showcase-media-figure"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}media/api-gateway-architecture.svg`}
                  alt="Backend API Gateway & Authorization Architecture Schematic"
                  className="showcase-media-img"
                  width="600"
                  height="380"
                  loading="lazy"
                />
              </motion.figure>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>

      {/* Embedded Slide Deck Modal */}
      <ArchitectureDeckModal
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
      />
    </section>
  )
}
