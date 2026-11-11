import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ArchitectureDeckModal.css'

interface ArchitectureDeckModalProps {
  isOpen: boolean
  onClose: () => void
}

const TOTAL_SLIDES = 5

export default function ArchitectureDeckModal({ isOpen, onClose }: ArchitectureDeckModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < TOTAL_SLIDES - 1 ? prev + 1 : prev))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
        setIsFullscreen(false)
      }
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, nextSlide, prevSlide, onClose])

  if (!isOpen) return null

  return (
    <div className="deck-overlay" role="dialog" aria-modal="true" aria-label="Architecture Case Study Deck">
      <div className="deck-container">
        {/* Top Control Bar */}
        <div className="deck-header">
          <div className="deck-header-left">
            <span className="deck-tag">ARCHITECTURE DECK</span>
            <span className="deck-project-title">Cloudflare Edge E-Commerce System</span>
          </div>

          <div className="deck-header-right">
            <span className="deck-counter">
              {currentSlide + 1} / {TOTAL_SLIDES}
            </span>
            <button
              onClick={toggleFullscreen}
              className="deck-icon-btn"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              title="Toggle Fullscreen (F)"
            >
              <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`} aria-hidden="true"></i>
            </button>
            <button
              onClick={onClose}
              className="deck-icon-btn close-btn"
              aria-label="Close Architecture Deck"
              title="Close (Esc)"
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Slide Display Surface */}
        <div className="deck-content-surface">
          <AnimatePresence mode="wait">
            {currentSlide === 0 && (
              <motion.div
                key="slide-0"
                className="slide-inner"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="slide-badge">01 · SYSTEM CONTEXT</div>
                <h3 className="slide-title">Edge-Native Distributed E-Commerce Architecture</h3>
                <p className="slide-intro">
                  Traditional monolith e-commerce systems suffer from high Time-to-First-Byte (TTFB) in regional geographies and substantial idle server operating costs.
                </p>

                <div className="slide-split-grid">
                  <div className="slide-spec-box">
                    <span className="box-title">Core Problem Statement</span>
                    <ul className="spec-bullets">
                      <li>Traditional servers deployed in a single region average 250–400ms latency for SEA users.</li>
                      <li>Cold starts in legacy containerized microservices degrade checkout conversion rates.</li>
                      <li>Managing dedicated relational database instances requires continuous ops maintenance.</li>
                    </ul>
                  </div>

                  <div className="slide-spec-box highlight">
                    <span className="box-title">Engineered Solution</span>
                    <ul className="spec-bullets">
                      <li>Deployed on <strong>Cloudflare Global Edge</strong> with sub-35ms regional TTFB.</li>
                      <li>Serverless computing via <strong>NuxtHub / Workers</strong> with zero cold-start overhead.</li>
                      <li>Globally distributed read replication using <strong>Cloudflare D1 (SQLite)</strong>.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {currentSlide === 1 && (
              <motion.div
                key="slide-1"
                className="slide-inner"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="slide-badge">02 · TOPOLOGY &amp; INFRASTRUCTURE</div>
                <h3 className="slide-title">System Data Flow &amp; Edge Runtime Topology</h3>
                <p className="slide-intro">
                  Request processing is executed closest to the end user on Cloudflare's edge network, offloading static assets to the CDN and handling mutations with ACID-compliant SQLite D1.
                </p>

                <div className="topology-diagram" aria-label="System Topology Diagram">
                  <div className="topology-node">
                    <div className="node-icon"><i className="fas fa-globe"></i></div>
                    <span className="node-title">Client Browser</span>
                    <span className="node-detail">Storefront &amp; Admin</span>
                  </div>
                  <div className="topology-arrow"><i className="fas fa-arrow-right"></i></div>
                  <div className="topology-node">
                    <div className="node-icon"><i className="fas fa-bolt"></i></div>
                    <span className="node-title">Cloudflare CDN</span>
                    <span className="node-detail">Edge Cache &amp; Assets</span>
                  </div>
                  <div className="topology-arrow"><i className="fas fa-arrow-right"></i></div>
                  <div className="topology-node highlight">
                    <div className="node-icon"><i className="fas fa-server"></i></div>
                    <span className="node-title">NuxtHub Edge</span>
                    <span className="node-detail">V8 Serverless Worker</span>
                  </div>
                  <div className="topology-arrow"><i className="fas fa-arrow-right"></i></div>
                  <div className="topology-node">
                    <div className="node-icon"><i className="fas fa-database"></i></div>
                    <span className="node-title">Cloudflare D1</span>
                    <span className="node-detail">Drizzle ORM (SQLite)</span>
                  </div>
                </div>

                <div className="architecture-specs-row">
                  <div className="spec-pill">
                    <span className="pill-k">Runtime</span>
                    <span className="pill-v">V8 Edge Isolate</span>
                  </div>
                  <div className="spec-pill">
                    <span className="pill-k">ORM</span>
                    <span className="pill-v">Drizzle Type-Safe Schema</span>
                  </div>
                  <div className="spec-pill">
                    <span className="pill-k">Database</span>
                    <span className="pill-v">Cloudflare D1 (Serverless SQLite)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {currentSlide === 2 && (
              <motion.div
                key="slide-2"
                className="slide-inner"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="slide-badge">03 · RELATIONAL DATA SCHEMA</div>
                <h3 className="slide-title">Entity Relationship Model &amp; Type Contracts</h3>
                <p className="slide-intro">
                  Fully normalized relational schema compiled with Drizzle ORM to provide end-to-end TypeScript type inference from SQL tables to frontend components.
                </p>

                <div className="schema-grid">
                  <div className="schema-card">
                    <span className="schema-table-name">users</span>
                    <div className="schema-fields">
                      <span className="field pk">id: text (PK)</span>
                      <span className="field">email: text (unique)</span>
                      <span className="field">role: text (admin | customer)</span>
                      <span className="field">created_at: integer</span>
                    </div>
                  </div>

                  <div className="schema-card">
                    <span className="schema-table-name">products</span>
                    <div className="schema-fields">
                      <span className="field pk">id: text (PK)</span>
                      <span className="field">title: text</span>
                      <span className="field">price_cents: integer</span>
                      <span className="field">stock_count: integer</span>
                    </div>
                  </div>

                  <div className="schema-card">
                    <span className="schema-table-name">orders</span>
                    <div className="schema-fields">
                      <span className="field pk">id: text (PK)</span>
                      <span className="field fk">user_id: text (FK)</span>
                      <span className="field">status: text (pending|paid)</span>
                      <span className="field">total_cents: integer</span>
                    </div>
                  </div>

                  <div className="schema-card">
                    <span className="schema-table-name">order_items</span>
                    <div className="schema-fields">
                      <span className="field pk">id: text (PK)</span>
                      <span className="field fk">order_id: text (FK)</span>
                      <span className="field fk">product_id: text (FK)</span>
                      <span className="field">quantity: integer</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentSlide === 3 && (
              <motion.div
                key="slide-3"
                className="slide-inner"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="slide-badge">04 · BENCHMARKS &amp; TELEMETRY</div>
                <h3 className="slide-title">Latency Comparison &amp; Edge Performance</h3>
                <p className="slide-intro">
                  Real-world benchmarks measuring Time-to-First-Byte (TTFB) and transaction throughput comparing edge deployment vs traditional centralized Node.js instance.
                </p>

                <div className="benchmarks-grid">
                  <div className="benchmark-card">
                    <span className="benchmark-metric">32ms</span>
                    <span className="benchmark-name">Edge TTFB (P50)</span>
                    <span className="benchmark-sub">vs 285ms Centralized Server</span>
                  </div>

                  <div className="benchmark-card highlight">
                    <span className="benchmark-metric">&lt; 15ms</span>
                    <span className="benchmark-name">D1 Query Latency</span>
                    <span className="benchmark-sub">In-process edge SQLite reads</span>
                  </div>

                  <div className="benchmark-card">
                    <span className="benchmark-metric">0ms</span>
                    <span className="benchmark-name">Cold Start Overhead</span>
                    <span className="benchmark-sub">Instant V8 isolate spin-up</span>
                  </div>

                  <div className="benchmark-card">
                    <span className="benchmark-metric">100%</span>
                    <span className="benchmark-name">Type Inference</span>
                    <span className="benchmark-sub">Zero unsafe 'any' assertions</span>
                  </div>
                </div>
              </motion.div>
            )}

            {currentSlide === 4 && (
              <motion.div
                key="slide-4"
                className="slide-inner"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="slide-badge">05 · ENGINEERING TAKEAWAYS</div>
                <h3 className="slide-title">Key Architectural Learnings &amp; Future Work</h3>
                <p className="slide-intro">
                  Reflections on building serverless edge applications and planned iterative enhancements.
                </p>

                <div className="slide-takeaways-list">
                  <div className="takeaway-item">
                    <span className="takeaway-bullet">01</span>
                    <div className="takeaway-body">
                      <strong>Edge SQL Read Scaling:</strong> Cloudflare D1 provides instant local read replicas at edge locations, yielding unprecedented low-latency queries for storefront product catalogs.
                    </div>
                  </div>

                  <div className="takeaway-item">
                    <span className="takeaway-bullet">02</span>
                    <div className="takeaway-body">
                      <strong>Drizzle Type Safety:</strong> Using Drizzle ORM eliminated the traditional runtime synchronization gap between database schemas and API request/response DTOs.
                    </div>
                  </div>

                  <div className="takeaway-item">
                    <span className="takeaway-bullet">03</span>
                    <div className="takeaway-body">
                      <strong>Next Iterations:</strong> Implementing Redis-compatible caching (Cloudflare KV) for inventory sessions and integrating Stripe Webhook signature verification on edge workers.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation & Indicator Dots */}
        <div className="deck-footer">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="deck-nav-btn"
            aria-label="Previous Slide"
          >
            <i className="fas fa-arrow-left" aria-hidden="true"></i>
            <span>Previous</span>
          </button>

          <div className="deck-dots" role="tablist" aria-label="Slide navigation">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={currentSlide === i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setCurrentSlide(i)}
                className={`deck-dot ${currentSlide === i ? 'active' : ''}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === TOTAL_SLIDES - 1}
            className="deck-nav-btn primary"
            aria-label="Next Slide"
          >
            <span>Next</span>
            <i className="fas fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
