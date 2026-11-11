import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SkillCard, { type TechItem } from './SkillCard'
import AnimatedText from '../Effects/AnimatedText'
import ScrollReveal from '../Effects/ScrollReveal'
import './Skills.css'

type CategoryFilter = 'all' | 'backend' | 'database' | 'devops' | 'frontend'

const allSkills: TechItem[] = [
  // Backend Architecture & Runtime
  { label: 'TypeScript', icon: 'devicon-typescript-plain colored', category: 'backend', tag: 'Core Stack' },
  { label: 'Node.js', icon: 'devicon-nodejs-plain colored', category: 'backend', tag: 'Production' },
  { label: 'Express', icon: 'devicon-express-original', category: 'backend', tag: 'Production' },
  { label: 'Java', icon: 'devicon-java-plain colored', category: 'backend', tag: 'Academic' },
  { label: 'Spring Boot', icon: 'devicon-spring-plain colored', category: 'backend', tag: 'Academic' },

  // Databases & Distributed Systems
  { label: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', category: 'database', tag: 'Production' },
  { label: 'SQLite (D1)', icon: 'devicon-sqlite-plain colored', category: 'database', tag: 'Edge Native' },
  { label: 'Drizzle ORM', icon: 'fas fa-database', category: 'database', tag: 'Production' },
  { label: 'MongoDB', icon: 'devicon-mongodb-plain colored', category: 'database', tag: 'Academic' },

  // Infrastructure & DevOps Tooling
  { label: 'Docker', icon: 'devicon-docker-plain colored', category: 'devops', tag: 'Tooling' },
  { label: 'Cloudflare', icon: 'devicon-cloudflare-plain colored', category: 'devops', tag: 'Edge Native' },
  { label: 'Git & GitHub', icon: 'devicon-git-plain colored', category: 'devops', tag: 'Core Stack' },
  { label: 'Postman', icon: 'devicon-postman-plain colored', category: 'devops', tag: 'Tooling' },

  // Frontend & UI Systems
  { label: 'React 19', icon: 'devicon-react-original colored', category: 'frontend', tag: 'Core Stack' },
  { label: 'Nuxt 3', icon: 'devicon-nuxtjs-plain colored', category: 'frontend', tag: 'Production' },
]

export default function Skills() {
  const [filter, setFilter] = useState<CategoryFilter>('all')

  const filteredSkills = filter === 'all' 
    ? allSkills 
    : allSkills.filter(item => item.category === filter)

  return (
    <section id="skills" className="skills-section" aria-label="Skills & Technical Stack">
      <ScrollReveal direction="up">
        <div className="section-header">
          <AnimatedText text="Technical Stack & Architecture" el="h2" />
          <p>Production tools, runtime environments, and architectural&nbsp;competencies</p>
        </div>
      </ScrollReveal>

      {/* Category Filter Pills */}
      <div className="skills-filter-nav" role="tablist" aria-label="Filter skills by domain">
        <button
          role="tab"
          aria-selected={filter === 'all'}
          className={`filter-pill-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Domains ({allSkills.length})
        </button>
        <button
          role="tab"
          aria-selected={filter === 'backend'}
          className={`filter-pill-btn ${filter === 'backend' ? 'active' : ''}`}
          onClick={() => setFilter('backend')}
        >
          Backend &amp; Runtime
        </button>
        <button
          role="tab"
          aria-selected={filter === 'database'}
          className={`filter-pill-btn ${filter === 'database' ? 'active' : ''}`}
          onClick={() => setFilter('database')}
        >
          Databases &amp; D1
        </button>
        <button
          role="tab"
          aria-selected={filter === 'devops'}
          className={`filter-pill-btn ${filter === 'devops' ? 'active' : ''}`}
          onClick={() => setFilter('devops')}
        >
          Cloud &amp; DevOps
        </button>
        <button
          role="tab"
          aria-selected={filter === 'frontend'}
          className={`filter-pill-btn ${filter === 'frontend' ? 'active' : ''}`}
          onClick={() => setFilter('frontend')}
        >
          Frontend Systems
        </button>
      </div>

      <div className="skills-grid-container">
        <AnimatePresence mode="popLayout">
          <motion.div layout className="skills-grid">
            {filteredSkills.map((tech, i) => (
              <SkillCard key={tech.label} tech={tech} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
