import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  originalRadius: number
}

interface BurstParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  color: string
  size: number
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
    let bursts: BurstParticle[] = []
    const mouse = { x: -1000, y: -1000, radius: 180 }

    const colors = [
      'rgba(16, 185, 129, ', // Emerald
      'rgba(6, 182, 212, ', // Cyan
      'rgba(99, 102, 241, ', // Indigo
      'rgba(168, 85, 247, ', // Purple
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 11000))
      particles = Array.from({ length: count }, () => {
        const colorBase = colors[Math.floor(Math.random() * colors.length)]
        const rad = Math.random() * 2.5 + 1.5
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: rad,
          originalRadius: rad,
          color: colorBase,
          alpha: Math.random() * 0.5 + 0.35,
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleClick = (e: MouseEvent) => {
      // Spawn burst particles on click
      const count = 14
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count
        const speed = Math.random() * 3.5 + 1.5
        bursts.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 2,
        })
      }
    }

    const drawConnections = (p: Particle) => {
      for (const other of particles) {
        if (p === other) continue
        const dx = p.x - other.x
        const dy = p.y - other.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130) {
          ctx.beginPath()
          const alpha = 0.18 * (1 - dist / 130)
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`
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
        const malpha = 0.5 * (1 - mdist / mouse.radius)
        ctx.strokeStyle = `rgba(6, 182, 212, ${malpha})`
        ctx.lineWidth = 1.4
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()

        // Enlarge particle near cursor
        p.radius = p.originalRadius * (1 + (1 - mdist / mouse.radius) * 1.5)

        // Gentle magnet pull / push reaction
        const angle = Math.atan2(mdy, mdx)
        const force = (mouse.radius - mdist) / mouse.radius
        p.x += Math.cos(angle) * force * 0.8
        p.y += Math.sin(angle) * force * 0.8
      } else {
        p.radius = p.originalRadius
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw Main Particles
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
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(16, 185, 129, 0.5)'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Draw Click Burst Particles
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i]
        b.x += b.vx
        b.y += b.vy
        b.life -= 0.03

        if (b.life <= 0) {
          bursts.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(b.x, b.y, b.size * b.life, 0, Math.PI * 2)
        ctx.fillStyle = `${b.color}${b.life})`
        ctx.shadowBlur = 12
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)'
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
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
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
