import { useState, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import AboutTerminal from './components/About/AboutTerminal'
import Skills from './components/Skills/Skills'
import Experience from './components/Experience/Experience'
import Projects from './components/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

import './index.css'

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Mouse Follow Spotlight Glow
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22 })

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  const handleLottieComplete = () => {
    if (overlayRef.current) {
      overlayRef.current.classList.add('hidden')
      setTimeout(() => setLoadingComplete(true), 600)
    }
  }

  return (
    <div onMouseMove={handleMouseMove} style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Top Scroll Progress Line */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Vibrant Floating Ambient Gradient Orbs */}
      <div className="ambient-blob blob-emerald" aria-hidden="true" />
      <div className="ambient-blob blob-cyan" aria-hidden="true" />
      <div className="ambient-blob blob-indigo" aria-hidden="true" />

      {/* Background Grid Pattern */}
      <div className="subtle-grid-bg" aria-hidden="true" />

      {/* Interactive Mouse Cursor Spotlight Glow */}
      <motion.div
        className="cursor-spotlight"
        style={{ left: springX, top: springY }}
        aria-hidden="true"
      />

      {/* Interactive Canvas Constellation Particles */}
      <ParticleBackground />

      {/* Lottie Initial Loading Overlay */}
      {!loadingComplete && (
        <div id="loading-overlay" ref={overlayRef}>
          <Player
            src={`${import.meta.env.BASE_URL}Hello.json`}
            background="transparent"
            speed={1.5}
            style={{ width: '360px', height: '360px' }}
            autoplay
            keepLastFrame
            onEvent={(event) => {
              if (event === 'complete') handleLottieComplete()
            }}
          />
        </div>
      )}

      {/* Main Page Content */}
      <Navbar />

      <main id="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <AboutTerminal />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
