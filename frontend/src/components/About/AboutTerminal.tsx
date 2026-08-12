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
          <p>A quick overview of my background, education, and development focus</p>
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
                <p>2nd-year IT student at DUT (Danang University of Technology). Passionate about backend development, building RESTful APIs, and learning web technologies through hands-on projects.</p>
              </div>

              <div className="terminal-line">
                <span className="prompt">$</span> <span className="command">cat education.txt</span>
              </div>
              <div className="terminal-output">
                <p className="highlight">Da Nang University of Science and Technology (DUT)</p>
                <p className="dim">// Major: Information Technology (2nd Year)</p>
              </div>

              <div className="terminal-line">
                <span className="prompt">$</span> <span className="command">cat philosophy.json</span>
              </div>
              <div className="terminal-output text-green">
                <p>&#123;</p>
                <p className="indent">"codeStyle": "Clean & readable",</p>
                <p className="indent">"focus": "Backend & Web Development",</p>
                <p className="indent">"mindset": "Always eager to learn & build"</p>
                <p>&#125;</p>
              </div>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>
    </section>
  )
}
