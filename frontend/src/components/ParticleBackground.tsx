import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []
    const mouse = { x: -1000, y: -1000, radius: 160 }

    const colors = [
      'rgba(52, 211, 153, ', // Emerald
      'rgba(45, 212, 191, ', // Teal
      'rgba(56, 189, 248, ', // Cyan
      'rgba(129, 140, 248, ', // Indigo
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.min(85, Math.floor((window.innerWidth * window.innerHeight) / 12000))
      particles = Array.from({ length: count }, () => {
        const colorBase = colors[Math.floor(Math.random() * colors.length)]
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2.5 + 1.5,
          color: colorBase,
          alpha: Math.random() * 0.5 + 0.35,
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const drawConnections = (p: Particle) => {
      for (const other of particles) {
        if (p === other) continue
        const dx = p.x - other.x
        const dy = p.y - other.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) {
          ctx.beginPath()
          const alpha = 0.22 * (1 - dist / 140)
          ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
        }
      }

      // Connection to mouse cursor
      const mdx = p.x - mouse.x
      const mdy = p.y - mouse.y
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
      if (mdist < mouse.radius) {
        ctx.beginPath()
        const malpha = 0.45 * (1 - mdist / mouse.radius)
        ctx.strokeStyle = `rgba(45, 212, 191, ${malpha})`
        ctx.lineWidth = 1.2
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()

        // Slight push away from mouse for dynamic movement
        const angle = Math.atan2(mdy, mdx)
        const force = (mouse.radius - mdist) / mouse.radius
        p.x += Math.cos(angle) * force * 1.2
        p.y += Math.sin(angle) * force * 1.2
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        drawConnections(p)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${p.alpha})`
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(52, 211, 153, 0.6)'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  )
}

export default ParticleBackground
