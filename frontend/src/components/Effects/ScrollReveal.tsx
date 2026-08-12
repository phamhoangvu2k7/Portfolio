import React from 'react'
import { motion } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  viewportAmount?: number
  once?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  distance = 40,
  viewportAmount = 0.2,
  once = true,
  className = '',
  style = {},
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0, scale: 1 }
      case 'down':
        return { y: -distance, opacity: 0, scale: 1 }
      case 'left':
        return { x: distance, opacity: 0, scale: 1 }
      case 'right':
        return { x: -distance, opacity: 0, scale: 1 }
      case 'zoom':
        return { scale: 0.85, opacity: 0, x: 0, y: 0 }
      case 'fade':
      default:
        return { opacity: 0, x: 0, y: 0, scale: 1 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      }}
      viewport={{ once, amount: viewportAmount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom smooth cubic-bezier
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Container for Staggering Multiple Children
interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  delay?: number
  className?: string
  viewportAmount?: number
}

export function StaggerContainer({
  children,
  staggerDelay = 0.12,
  delay = 0,
  className = '',
  viewportAmount = 0.15,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: viewportAmount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
