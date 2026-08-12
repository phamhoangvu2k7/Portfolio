import { useState, type MouseEvent } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'

import CustomCursor from './components/Effects/CustomCursor'
import LoadingScreen from './components/Effects/LoadingScreen'
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

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Mouse Follow Spotlight Glow
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 22 })

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    mouseX.set(clientX)
    mouseY.set(clientY)
  }

  return (
    <div onMouseMove={handleMouseMove} style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Custom Hardware-Accelerated Dual Cursor */}
      <CustomCursor />

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

      {/* Initial Loading Overlay */}
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
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
