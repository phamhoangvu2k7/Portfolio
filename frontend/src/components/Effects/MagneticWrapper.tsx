import { useRef, type ReactNode, type CSSProperties, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticWrapperProps {
  children: ReactNode
  strength?: number
  className?: string
  style?: CSSProperties
}

export default function MagneticWrapper({
  children,
  strength = 0.2,
  className = '',
  style = {},
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Fluid spring configuration for natural magnetic feel
  const springConfig = { damping: 24, stiffness: 140, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-block', willChange: 'transform', ...style }}
      className={`magnetic-wrapper ${className}`}
    >
      {children}
    </motion.div>
  )
}
