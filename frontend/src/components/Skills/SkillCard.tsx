import { motion } from 'framer-motion'
import TiltCard from '../Effects/TiltCard'
import MagneticWrapper from '../Effects/MagneticWrapper'

export interface TechItem {
  label: string
  icon: string
}

interface SkillCardProps {
  tech: TechItem
  index: number
}

export default function SkillCard({ tech, index }: SkillCardProps) {
  return (
    <motion.div
      style={{ width: '100%', height: '100%' }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <MagneticWrapper strength={0.25} style={{ width: '100%', height: '100%', display: 'block' }}>
        <TiltCard maxTilt={14} glareOpacity={0.3} scaleOnHover={1.06} style={{ width: '100%', height: '100%' }}>
          <div className="skill-card">
            <i className={`skill-icon ${tech.icon}`} aria-hidden="true"></i>
            <span className="skill-label">{tech.label}</span>
          </div>
        </TiltCard>
      </MagneticWrapper>
    </motion.div>
  )
}
