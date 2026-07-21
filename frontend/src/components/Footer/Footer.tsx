import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="footer-content">
        <div className="footer-top-row">
          <div className="footer-statement">
            <span className="footer-brand-title">phamhoangvu</span>
            <p className="footer-statement-text">
              Software Engineer & IT student building responsive, high-performance web applications and backend APIs.
            </p>
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
              <span className="footer-group-title">Socials</span>
              <a href="https://github.com/phamhoangvu2k7" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/vupham2k7/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://leetcode.com/u/hoangvupham2405/" target="_blank" rel="noreferrer">LeetCode</a>
              <a href="https://www.facebook.com/pham.hoang.vu.591333" target="_blank" rel="noreferrer">Facebook</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>&copy; {year} Pham Hoang Vu. All rights reserved.</p>
          <p>Built with React, TypeScript & Hallmark UI Standards</p>
        </div>
      </div>
    </footer>
  )
}
