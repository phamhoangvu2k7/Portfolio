import { motion } from 'framer-motion'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="experience-section" aria-label="Work Experience">
      <div className="section-header">
        <h2>Experience</h2>
        <p>Professional engineering roles and backend software development</p>
      </div>

      <motion.div
        className="experience-card"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="experience-header-row">
          <div className="experience-company-title">
            <a
              href="https://www.thecodeorigin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="company-link"
            >
              <span>Thecodeorigin</span>
              <i className="fas fa-external-link-alt" style={{ fontSize: '0.8rem' }} aria-hidden="true"></i>
            </a>
            <span className="role-badge">Intern Backend Developer</span>
          </div>

          <span className="experience-date">3/2026 – Present</span>
        </div>

        <ul className="experience-bullet-list">
          <li>
            <strong>API Development:</strong> Designed and implemented <strong>RESTful APIs</strong> for core business modules including vehicle listings, user profiles, and booking management.
          </li>
          <li>
            <strong>RBAC Security:</strong> Built <strong>Role-Based Access Control (RBAC)</strong> middleware to enforce explicit permission checks across protected API routes.
          </li>
          <li>
            <strong>Data Integrity:</strong> Utilized <strong>Zod</strong> schemas to validate incoming payload structures and prevent malformed data insertion.
          </li>
          <li>
            <strong>Database Operations:</strong> Performed relational query optimization and <strong>CRUD operations</strong> using <strong>Drizzle ORM</strong> with <strong>PostgreSQL</strong>.
          </li>
        </ul>

        <div className="experience-location">
          <i className="fas fa-location-dot" aria-hidden="true"></i>
          <span>Da Nang, Viet Nam</span>
        </div>
      </motion.div>
    </section>
  )
}
