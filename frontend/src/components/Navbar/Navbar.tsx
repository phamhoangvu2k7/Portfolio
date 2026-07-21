import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const CV_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=18rhFjj3gVYAUOwtzz98tLEr0FJ0bKH00'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(CV_DOWNLOAD_URL, '_blank')
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll('section[id], header[id]')
    sections.forEach((sec) => observer.observe(sec))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="nav-floating-container" aria-label="Main Navigation">
        <a href="#home" className="nav-brand" aria-label="Pham Hoang Vu Homepage">
          <span className="nav-brand-dot"></span>
          <span>phamhoangvu</span>
        </a>

        <nav className="nav-links-desktop" aria-label="Desktop Nav">
          <a href="#home" className={`nav-link-item ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
          <a href="#about" className={`nav-link-item ${activeSection === 'about' ? 'active' : ''}`}>About</a>
          <a href="#skills" className={`nav-link-item ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
          <a href="#experience" className={`nav-link-item ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a>
          <a href="#projects" className={`nav-link-item ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
          <a href="#contact" className={`nav-link-item ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
        </nav>

        <div className="nav-right-actions">
          <button
            onClick={handleDownloadCV}
            className="btn-cv-pill"
            aria-label="Download Resume / CV"
          >
            <i className="fas fa-arrow-down" aria-hidden="true"></i>
            <span>Resume</span>
          </button>

          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle Menu Navigation"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile Navigation"
          >
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
