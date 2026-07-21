import { motion } from 'framer-motion'
import './AboutTerminal.css'

export default function AboutTerminal() {
  return (
    <section id="about" className="about-section" aria-label="About Me">
      <div className="section-header">
        <h2>System Profile</h2>
        <p>A peek into my background, setup, and engineering philosophy</p>
      </div>

      <motion.div
        className="terminal-window"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="terminal-header">
          <span className="terminal-dot dot-red"></span>
          <span className="terminal-dot dot-yellow"></span>
          <span className="terminal-dot dot-green"></span>
          <span className="terminal-title">system_profile.sh</span>
        </div>

        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">$</span> <span className="command">whoami</span>
          </div>
          <div className="terminal-output">
            <p className="highlight">phamhoangvu</p>
            <p>Second-year IT student at DUT. Dedicated to backend engineering, exploring robust API design, database optimizations, and modern full-stack workflows.</p>
          </div>

          <div className="terminal-line">
            <span className="prompt">$</span> <span className="command">cat education.txt</span>
          </div>
          <div className="terminal-output">
            <p className="highlight">Da Nang University of Science and Technology (DUT)</p>
            <p className="dim">// Major: Information Technology</p>
          </div>

          <div className="terminal-line">
            <span className="prompt">$</span> <span className="command">cat philosophy.json</span>
          </div>
          <div className="terminal-output text-green">
            <p>&#123;</p>
            <p className="indent">"codeQuality": "Clean & self-documenting",</p>
            <p className="indent">"focus": "Performance & User Experience",</p>
            <p className="indent">"learning": "Continuous exploration of web architectures"</p>
            <p>&#125;</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
