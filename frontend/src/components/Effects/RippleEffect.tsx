import { useState, useLayoutEffect, type ReactNode, type CSSProperties, type MouseEvent } from 'react'

interface Ripple {
  x: number
  y: number
  size: number
  id: number
}

interface RippleEffectProps {
  children: ReactNode
  color?: string
  className?: string
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  style?: CSSProperties
}

export default function RippleEffect({
  children,
  color = 'rgba(16, 185, 129, 0.35)',
  className = '',
  onClick,
  style = {},
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  useLayoutEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1))
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [ripples])

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    }

    setRipples((prev) => [...prev, newRipple])
    if (onClick) onClick(e)
  }

  return (
    <div
      onClick={handleClick}
      className={`ripple-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-span"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  )
}
