import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticWrapper from '../Effects/MagneticWrapper'
import './Navbar.css'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

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
        <MagneticWrapper strength={0.3}>
          <a href="#home" className="nav-brand" aria-label="Pham Hoang Vu Homepage">
            <span className="nav-brand-dot"></span>
            <span>phamhoangvu</span>
          </a>
        </MagneticWrapper>

        <nav className="nav-links-desktop" aria-label="Desktop Nav">
          {navItems.map((item) => (
            <MagneticWrapper key={item.id} strength={0.25}>
              <a
                href={`#${item.id}`}
                className={`nav-link-item ${activeSection === item.id ? 'active' : ''}`}
                style={{ position: 'relative' }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="nav-active-spring-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </MagneticWrapper>
          ))}
        </nav>

        <div className="nav-right-actions">
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
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
