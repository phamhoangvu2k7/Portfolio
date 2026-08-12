import AnimatedText from '../Effects/AnimatedText'
import TiltCard from '../Effects/TiltCard'
import ScrollReveal from '../Effects/ScrollReveal'
import './AboutTerminal.css'

export default function AboutTerminal() {
  return (
    <section id="about" className="about-section" aria-label="About Me">
      <ScrollReveal direction="up" viewportAmount={0.2}>
        <div className="section-header">
          <AnimatedText text="System Profile" el="h2" gradient />
          <p>A peek into my background, setup, and engineering philosophy</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="zoom" delay={0.15} viewportAmount={0.15}>
        <TiltCard maxTilt={10} glareOpacity={0.25} scaleOnHover={1.02}>
          <div className="terminal-window">
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
          </div>
        </TiltCard>
      </ScrollReveal>
    </section>
  )
}
