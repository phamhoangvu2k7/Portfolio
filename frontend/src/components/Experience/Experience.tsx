import AnimatedText from '../Effects/AnimatedText'
import TiltCard from '../Effects/TiltCard'
import ScrollReveal from '../Effects/ScrollReveal'
import MagneticWrapper from '../Effects/MagneticWrapper'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="experience-section" aria-label="Work Experience & Engineering Case Studies">
      <ScrollReveal direction="up">
        <div className="section-header">
          <AnimatedText text="Engineering Experience" el="h2" />
          <p>Production engineering impact, architecture decisions, and&nbsp;deliverables</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.15}>
        <TiltCard maxTilt={5} glareOpacity={0.15} scaleOnHover={1.01}>
          <div className="experience-card">
            {/* Top Company & Status Row */}
            <div className="experience-header-row">
              <div className="experience-company-title">
                <div className="company-name-row">
                  <MagneticWrapper strength={0.3}>
                    <a
                      href="https://www.thecodeorigin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-link"
                      aria-label="Thecodeorigin Website"
                    >
                      <span>Thecodeorigin</span>
                      <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem' }} aria-hidden="true"></i>
                    </a>
                  </MagneticWrapper>
                  <span className="experience-type-pill">Production Internship</span>
                </div>
                <span className="role-title">Backend Software Engineer</span>
              </div>

              <div className="experience-meta-badges">
                <span className="experience-date">03/2026 – Present</span>
                <span className="experience-location">
                  <i className="fas fa-location-dot" aria-hidden="true"></i>
                  <span>Da Nang, Vietnam</span>
                </span>
              </div>
            </div>

            {/* Quantifiable Impact Metrics Ribbon */}
            <div className="experience-metrics-grid">
              <div className="metric-card">
                <span className="metric-number">15+</span>
                <span className="metric-label">Production Endpoints</span>
              </div>
              <div className="metric-card">
                <span className="metric-number">&lt; 85ms</span>
                <span className="metric-label">P95 API Response Time</span>
              </div>
              <div className="metric-card">
                <span className="metric-number">100%</span>
                <span className="metric-label">Zod Schema Validation</span>
              </div>
              <div className="metric-card">
                <span className="metric-number">Zero</span>
                <span className="metric-label">Untyped SQL Queries</span>
              </div>
            </div>

            {/* Engineering Narrative */}
            <div className="experience-narrative">
              <h3 className="narrative-subtitle">Key Deliverables &amp; Architectural Focus</h3>
              <ul className="experience-bullet-list">
                <li>
                  <strong>RESTful API Architecture:</strong> Designed and implemented scalable endpoints for core modules including real-time vehicle inventories, customer booking lifecycles, and user profile&nbsp;management.
                </li>
                <li>
                  <strong>RBAC Security &amp; Authorization:</strong> Engineered custom Role-Based Access Control (RBAC) middleware verifying JWT tokens and explicit role bitmasks before delegating requests to controller&nbsp;layers.
                </li>
                <li>
                  <strong>Schema Validation &amp; Type Safety:</strong> Enforced runtime data integrity using <strong>Zod</strong> schemas, rejecting malformed HTTP request bodies with structured error&nbsp;envelopes.
                </li>
                <li>
                  <strong>Relational Query Optimization:</strong> Conducted schema design and query tuning on <strong>PostgreSQL</strong> using <strong>Drizzle ORM</strong>, eliminating N+1 query bottlenecks and safeguarding data&nbsp;consistency.
                </li>
              </ul>
            </div>

            {/* RBAC Visual Pipeline Diagram */}
            <div className="pipeline-container">
              <span className="pipeline-title">
                <i className="fas fa-shield-halved" aria-hidden="true"></i>
                <span>API Execution &amp; RBAC Security Pipeline</span>
              </span>
              <div className="pipeline-flow" aria-label="API Request Authorization Flow Diagram">
                <div className="pipeline-step">
                  <span className="step-num">01</span>
                  <span className="step-text">HTTP Request</span>
                </div>
                <div className="pipeline-arrow" aria-hidden="true">→</div>
                <div className="pipeline-step">
                  <span className="step-num">02</span>
                  <span className="step-text">Zod Validation</span>
                </div>
                <div className="pipeline-arrow" aria-hidden="true">→</div>
                <div className="pipeline-step highlight">
                  <span className="step-num">03</span>
                  <span className="step-text">RBAC Guard</span>
                </div>
                <div className="pipeline-arrow" aria-hidden="true">→</div>
                <div className="pipeline-step">
                  <span className="step-num">04</span>
                  <span className="step-text">Service Logic</span>
                </div>
                <div className="pipeline-arrow" aria-hidden="true">→</div>
                <div className="pipeline-step">
                  <span className="step-num">05</span>
                  <span className="step-text">Drizzle / Postgres</span>
                </div>
              </div>
            </div>

            {/* Technology Chips */}
            <div className="experience-tech-row">
              <span className="tech-badge">TypeScript</span>
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">Express</span>
              <span className="tech-badge">PostgreSQL</span>
              <span className="tech-badge">Drizzle ORM</span>
              <span className="tech-badge">Zod</span>
              <span className="tech-badge">JWT Auth</span>
              <span className="tech-badge">Postman</span>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>
    </section>
  )
}
