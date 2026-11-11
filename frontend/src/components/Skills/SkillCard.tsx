import { motion } from 'framer-motion'
import TiltCard from '../Effects/TiltCard'
import MagneticWrapper from '../Effects/MagneticWrapper'

export interface TechItem {
  label: string
  icon: string
  category: 'backend' | 'database' | 'devops' | 'frontend'
  tag: 'Production' | 'Core Stack' | 'Edge Native' | 'Academic' | 'Tooling'
}

interface SkillCardProps {
  tech: TechItem
  index: number
}

export default function SkillCard({ tech, index }: SkillCardProps) {
  return (
    <motion.div
      style={{ width: '100%', height: '100%' }}
      initial={{ opacity: 0, y: 15, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3), ease: [0.16, 1, 0.3, 1] }}
    >
      <MagneticWrapper strength={0.2} style={{ width: '100%', height: '100%', display: 'block' }}>
        <TiltCard maxTilt={10} glareOpacity={0.2} scaleOnHover={1.03} style={{ width: '100%', height: '100%' }}>
          <div className="skill-card">
            <span className={`skill-tag-pill tag-${tech.tag.toLowerCase().replace(/\s+/g, '-')}`}>
              {tech.tag}
            </span>
            <i className={`skill-icon ${tech.icon}`} aria-hidden="true"></i>
            <span className="skill-label">{tech.label}</span>
          </div>
        </TiltCard>
      </MagneticWrapper>
    </motion.div>
  )
}
