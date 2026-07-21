import { motion } from 'framer-motion'

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
      className="skill-card"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <i className={`skill-icon ${tech.icon}`} aria-hidden="true"></i>
      <span className="skill-label">{tech.label}</span>
    </motion.div>
  )
}
