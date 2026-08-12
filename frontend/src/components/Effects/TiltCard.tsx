import { useRef, useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  glareOpacity?: number
  scaleOnHover?: number
  style?: CSSProperties
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  glareOpacity = 0.2,
  scaleOnHover = 1.02,
  style = {},
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion Values for Mouse Position (-0.5 to 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // High-performance GPU spring physics (zero-latency responsive tracking)
  const springConfig = { damping: 22, stiffness: 280, mass: 0.1 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig)
  const scale = useSpring(isHovered ? scaleOnHover : 1, springConfig)

  // Glare effect coordinates
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const relativeX = e.clientX - rect.left
    const relativeY = e.clientY - rect.top

    // Normalize coordinates from -0.5 to 0.5 based on static container bounds
    mouseX.set(relativeX / rect.width - 0.5)
    mouseY.set(relativeY / rect.height - 0.5)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d', ...style }}
      className={`tilt-card-container ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="tilt-card-wrapper"
      >
        {children}

        {/* 3D Dynamic Glare Light Overlay */}
        <motion.div
          className="tilt-card-glare"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255, 255, 255, 0.3) 0%, rgba(16, 185, 129, 0.08) 45%, transparent 80%)`
            ),
          }}
        />
      </motion.div>
    </div>
  )
}
