import { useState, useEffect } from 'react'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const [localTime, setLocalTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setLocalTime(formatter.format(now))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="footer-content">
        <div className="footer-top-row">
          <div className="footer-statement">
            <div className="footer-brand-header">
              <span className="footer-brand-dot"></span>
              <span className="footer-brand-title">phamhoangvu</span>
            </div>
            <p className="footer-statement-text">
              Backend &amp; Full-Stack Systems Engineer specializing in high-throughput RESTful APIs, clean architecture, and modern edge computing&nbsp;platforms.
            </p>

            <div className="footer-clock-badge" aria-label="Local Time in Da Nang, Vietnam">
              <i className="fas fa-clock" aria-hidden="true"></i>
              <span>Da Nang (UTC+7): <strong>{localTime || '00:00:00'}</strong></span>
            </div>
          </div>

          <div className="footer-nav-col">
            <div className="footer-nav-group">
              <span className="footer-group-title">Navigation</span>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-nav-group">
              <span className="footer-group-title">Connect</span>
              <a href="https://github.com/phamhoangvu2k7" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/vupham2k7/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://leetcode.com/u/hoangvupham2405/" target="_blank" rel="noreferrer">LeetCode</a>
              <a href="https://www.facebook.com/pham.hoang.vu.591333" target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>
        </div>

        {/* Colophon & Tech Specifications Bar */}
        <div className="footer-colophon">
          <span className="colophon-title">COLOPHON</span>
          <span className="colophon-text">
            Architected with React 19 · TypeScript · Vite · OKLCH 3-Layer Design Tokens · Framer Motion · Zero Layout Shift
          </span>
        </div>

        <div className="footer-bottom-row">
          <p>&copy; {year} Pham Hoang Vu. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <i className="fas fa-arrow-up" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </footer>
  )
}
