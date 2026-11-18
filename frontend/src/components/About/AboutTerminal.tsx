import { useState, type ReactNode } from 'react'
import AnimatedText from '../Effects/AnimatedText'
import ScrollReveal from '../Effects/ScrollReveal'
import './AboutTerminal.css'

type TabType = 'overview' | 'architecture' | 'education'

interface CodeLine {
  num: number
  content: ReactNode
}

const overviewLines: CodeLine[] = [
  { num: 1, content: <span className="token-comment">#!/usr/bin/env bash</span> },
  { num: 2, content: <span className="token-comment"># Pham Hoang Vu - Systems Profile &amp; Core Runtime</span> },
  { num: 3, content: '' },
  { num: 4, content: <><span className="token-var">NAME</span>=<span className="token-str">"Pham Hoang Vu"</span></> },
  { num: 5, content: <><span className="token-var">TITLE</span>=<span className="token-str">"Backend &amp; Full-Stack Systems Engineer"</span></> },
  { num: 6, content: <><span className="token-var">LOCATION</span>=<span className="token-str">"Da Nang, Vietnam (UTC+7)"</span></> },
  { num: 7, content: <><span className="token-var">ALMA_MATER</span>=<span className="token-str">"Danang University of Technology (DUT)"</span></> },
  { num: 8, content: '' },
  { num: 9, content: <><span className="token-keyword">declare -a</span> <span className="token-var">CORE_COMPETENCIES</span>=(</> },
  { num: 10, content: <>  <span className="token-str">"High-Throughput RESTful API Architecture"</span></> },
  { num: 11, content: <>  <span className="token-str">"Role-Based Access Control (RBAC) &amp; JWT Security"</span></> },
  { num: 12, content: <>  <span className="token-str">"Edge Distributed Databases (Cloudflare D1 &amp; SQLite)"</span></> },
  { num: 13, content: <>  <span className="token-str">"Relational Schema Design &amp; Type-Safe ORMs (Drizzle)"</span></> },
  { num: 14, content: <>  <span className="token-str">"Strict Input Contracts &amp; Schema Validation (Zod)"</span></> },
  { num: 15, content: ')' },
  { num: 16, content: '' },
  { num: 17, content: <><span className="token-keyword">echo</span> <span className="token-str">"Status: Ready to build high-reliability services."</span></> },
]

const architectureLines: CodeLine[] = [
  { num: 1, content: <span className="token-comment">// Standardized Service Response Envelope Pattern</span> },
  { num: 2, content: <><span className="token-keyword">export interface</span> <span className="token-type">ApiResponse</span>&lt;<span className="token-type">T</span>&gt; &#123;</> },
  { num: 3, content: <>  <span className="token-prop">success</span>: <span className="token-type">boolean</span>;</> },
  { num: 4, content: <>  <span className="token-prop">data</span>?: <span className="token-type">T</span>;</> },
  { num: 5, content: <>  <span className="token-prop">error</span>?: &#123; <span className="token-prop">code</span>: <span className="token-type">string</span>; <span className="token-prop">message</span>: <span className="token-type">string</span> &#125;;</> },
  { num: 6, content: <>  <span className="token-prop">meta</span>: &#123; <span className="token-prop">latencyMs</span>: <span className="token-type">number</span>; <span className="token-prop">region</span>: <span className="token-type">string</span> &#125;;</> },
  { num: 7, content: '&#125;' },
  { num: 8, content: '' },
  { num: 9, content: <span className="token-comment">// RBAC Auth Guard: Enforcing Strict Bitmask Permissions</span> },
  { num: 10, content: <><span className="token-keyword">export const</span> <span className="token-func">requirePermission</span> = (<span className="token-var">permission</span>: <span className="token-type">string</span>) =&gt; &#123;</> },
  { num: 11, content: <>  <span className="token-keyword">return async</span> (<span className="token-var">ctx</span>: <span className="token-type">Context</span>, <span className="token-var">next</span>: <span className="token-type">NextFunction</span>) =&gt; &#123;</> },
  { num: 12, content: <>    <span className="token-keyword">const</span> user = ctx.get(<span className="token-str">'jwtPayload'</span>);</> },
  { num: 13, content: <>    <span className="token-keyword">if</span> (!user?.permissions?.includes(permission)) &#123;</> },
  { num: 14, content: <>      <span className="token-keyword">throw new</span> <span className="token-type">ForbiddenError</span>(<span className="token-str">'Insufficient authorization privileges'</span>);</> },
  { num: 15, content: <>    &#125;</> },
  { num: 16, content: <>    <span className="token-keyword">await</span> next();</> },
  { num: 17, content: <>  &#125;;</> },
  { num: 18, content: '&#125;;' },
]

const educationLines: CodeLine[] = [
  { num: 1, content: <span className="token-comment"># Danang University of Science and Technology (DUT)</span> },
  { num: 2, content: <><span className="token-keyword">Institution</span>: Da Nang University of Technology (DUT)</> },
  { num: 3, content: <><span className="token-keyword">Degree</span>: Bachelor of Science in Information Technology / Software Engineering</> },
  { num: 4, content: <><span className="token-keyword">Academic Focus</span>: Distributed Systems, Database Architecture, Object-Oriented Design</> },
  { num: 5, content: '' },
  { num: 6, content: <span className="token-comment">## Core Coursework &amp; Engineering Disciplines</span> },
  { num: 7, content: <>* <span className="token-str">Data Structures &amp; Algorithms</span>: Algorithmic complexity, graphs, dynamic programming (LeetCode)</> },
  { num: 8, content: <>* <span className="token-str">Relational Databases &amp; SQL</span>: Normalization, ACID transactions, index tuning, PostgreSQL</> },
  { num: 9, content: <>* <span className="token-str">Operating Systems &amp; Networking</span>: TCP/IP stack, process scheduling, concurrency, HTTP/2, DNS</> },
  { num: 10, content: <>* <span className="token-str">Software Engineering Practices</span>: Clean Architecture, Design Patterns, CI/CD, Git Flow</> },
]

export default function AboutTerminal() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [copied, setCopied] = useState(false)
  const [activeCommandOutput, setActiveCommandOutput] = useState<string | null>(null)

  const handleCopyCode = () => {
    let textToCopy = ''
    if (activeTab === 'overview') {
      textToCopy = `#!/usr/bin/env bash
# Pham Hoang Vu - Systems Profile & Core Runtime

NAME="Pham Hoang Vu"
TITLE="Backend & Full-Stack Systems Engineer"
LOCATION="Da Nang, Vietnam (UTC+7)"
ALMA_MATER="Danang University of Technology (DUT)"

declare -a CORE_COMPETENCIES=(
  "High-Throughput RESTful API Architecture"
  "Role-Based Access Control (RBAC) & JWT Security"
  "Edge Distributed Databases (Cloudflare D1 & SQLite)"
  "Relational Schema Design & Type-Safe ORMs (Drizzle)"
  "Strict Input Contracts & Schema Validation (Zod)"
)

echo "Status: Ready to build high-reliability services."`
    } else if (activeTab === 'architecture') {
      textToCopy = `// Standardized Service Response Envelope Pattern
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
  meta: { latencyMs: number; region: string };
}

// RBAC Auth Guard: Enforcing Strict Bitmask Permissions
export const requirePermission = (permission: string) => {
  return async (ctx: Context, next: NextFunction) => {
    const user = ctx.get('jwtPayload');
    if (!user?.permissions?.includes(permission)) {
      throw new ForbiddenError('Insufficient authorization privileges');
    }
    await next();
  };
};`
    } else {
      textToCopy = `# Danang University of Science and Technology (DUT)
Institution: Da Nang University of Technology (DUT)
Degree: Bachelor of Science in Information Technology / Software Engineering
Academic Focus: Distributed Systems, Database Architecture, Object-Oriented Design

## Core Coursework & Engineering Disciplines
* Data Structures & Algorithms: Algorithmic complexity, graphs, dynamic programming (LeetCode)
* Relational Databases & SQL: Normalization, ACID transactions, index tuning, PostgreSQL
* Operating Systems & Networking: TCP/IP stack, process scheduling, concurrency, HTTP/2, DNS
* Software Engineering Practices: Clean Architecture, Design Patterns, CI/CD, Git Flow`
    }

    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const runCommand = (cmd: string) => {
    if (cmd === 'benchmarks') {
      setActiveCommandOutput('⚡ [BENCHMARK] Edge TTFB: 32ms | Database Query Latency: 14ms | Schema Validation: 0.8ms | Total API: 46.8ms')
    } else if (cmd === 'auth') {
      setActiveCommandOutput('🔒 [RBAC FLOW] Request -> JWT Verification -> Role Extraction -> Permission Bitmask -> Endpoint Handler')
    } else if (cmd === 'clear') {
      setActiveCommandOutput(null)
    }
  }

  const currentLines =
    activeTab === 'overview'
      ? overviewLines
      : activeTab === 'architecture'
        ? architectureLines
        : educationLines

  return (
    <section id="about" className="about-section" aria-label="About Me & Engineering Profile">
      <ScrollReveal direction="up" viewportAmount={0.2}>
        <div className="section-header">
          <AnimatedText text="Engineering Profile" el="h2" />
          <p>Architectural philosophy, technical foundations, and system&nbsp;paradigms</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.12} viewportAmount={0.15}>
        <div className="terminal-window">
          {/* Window Chrome & Tab Bar */}
          <div className="terminal-header-bar">
            <div className="terminal-window-controls" aria-hidden="true">
              <span className="window-dot dot-red"></span>
              <span className="window-dot dot-yellow"></span>
              <span className="window-dot dot-green"></span>
            </div>

            <div className="terminal-tabs-nav" role="tablist" aria-label="Terminal Code Tabs">
              <button
                type="button"
                role="tab"
                id="tab-overview"
                aria-controls="panel-overview"
                aria-selected={activeTab === 'overview'}
                tabIndex={activeTab === 'overview' ? 0 : -1}
                className={`terminal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <i className="fas fa-terminal" aria-hidden="true"></i>
                <span>overview.sh</span>
              </button>
              <button
                type="button"
                role="tab"
                id="tab-architecture"
                aria-controls="panel-architecture"
                aria-selected={activeTab === 'architecture'}
                tabIndex={activeTab === 'architecture' ? 0 : -1}
                className={`terminal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                onClick={() => setActiveTab('architecture')}
              >
                <i className="fas fa-code" aria-hidden="true"></i>
                <span>architecture.ts</span>
              </button>
              <button
                type="button"
                role="tab"
                id="tab-education"
                aria-controls="panel-education"
                aria-selected={activeTab === 'education'}
                tabIndex={activeTab === 'education' ? 0 : -1}
                className={`terminal-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <i className="fas fa-graduation-cap" aria-hidden="true"></i>
                <span>education.md</span>
              </button>
            </div>

            <div className="terminal-actions">
              <button
                type="button"
                className="terminal-copy-btn"
                onClick={handleCopyCode}
                aria-label="Copy code to clipboard"
                title="Copy code"
              >
                <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true"></i>
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Body with Synchronized Line Numbers */}
          <div className="terminal-body">
            <div
              className="code-view"
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
            >
              <div className="terminal-code-table">
                {currentLines.map((line) => (
                  <div key={line.num} className="terminal-line-row">
                    <span className="line-num" aria-hidden="true">
                      {line.num}
                    </span>
                    <span className="line-code">
                      {line.content || '\u00A0'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Command Runner Bar */}
            <div className="terminal-command-bar">
              <span className="command-prompt-symbol">$</span>
              <span className="command-prompt-hint">run interactive command:</span>
              <div className="command-buttons-group">
                <button
                  type="button"
                  className="cmd-pill-btn"
                  onClick={() => runCommand('benchmarks')}
                  aria-label="Run benchmark test"
                >
                  ./benchmarks.sh
                </button>
                <button
                  type="button"
                  className="cmd-pill-btn"
                  onClick={() => runCommand('auth')}
                  aria-label="Run auth flow simulation"
                >
                  ./auth-flow.sh
                </button>
                {activeCommandOutput && (
                  <button
                    type="button"
                    className="cmd-pill-btn clear-btn"
                    onClick={() => runCommand('clear')}
                    aria-label="Clear terminal output"
                  >
                    clear
                  </button>
                )}
              </div>
            </div>

            {activeCommandOutput && (
              <div className="terminal-live-output" role="status" aria-live="polite">
                <code>{activeCommandOutput}</code>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
