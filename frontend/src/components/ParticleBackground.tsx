import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
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

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    }

    const drawConnections = (p: Particle) => {
      for (const other of particles) {
        if (p === other) continue
        const dx = p.x - other.x
        const dy = p.y - other.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
        }
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
        ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`
        ctx.fill()
      }

      animId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    const handleResize = () => {
      resize()
      createParticles()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -3,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #000000 0%, #0a0015 50%, #000000 100%)',
      }}
    />
  )
}

export default ParticleBackground
