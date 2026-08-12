import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isTextHovered, setIsTextHovered] = useState(false)
  const [isInputHovered, setIsInputHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Mouse Coordinates
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Outer ring spring configuration for ultra-smooth fluid trailing
  const springConfig = { damping: 32, stiffness: 200, mass: 0.5 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only activate on non-touch fine-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)
    document.body.classList.add('custom-cursor-active')

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInput = Boolean(
        target.closest('input, textarea, select, [contenteditable="true"]')
      )
      const isInteractive = !isInput && Boolean(
        target.closest('a, button, [role="button"], .interactive, [data-cursor="pointer"]')
      )
      const isText = !isInput && !isInteractive && Boolean(
        target.closest('h1, h2, h3, p, code, .terminal-content, [data-cursor="text"]')
      )

      setIsInputHovered(isInput)
      setIsHovered(isInteractive)
      setIsTextHovered(isText)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {/* Inner Precision Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicked ? 0.5 : isHovered ? 0 : 1,
          opacity: isInputHovered ? 0 : isTextHovered ? 0.3 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Fluid Ring */}
      <motion.div
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''} ${isTextHovered ? 'text-mode' : ''} ${isClicked ? 'clicked' : ''}`}
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.8 : isTextHovered ? 1.4 : 1,
          borderWidth: isHovered ? '2px' : '1.5px',
          opacity: isInputHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
    </>
  )
}
