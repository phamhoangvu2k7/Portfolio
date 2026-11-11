import { useState } from 'react'
import AnimatedText from '../Effects/AnimatedText'
import TiltCard from '../Effects/TiltCard'
import ScrollReveal from '../Effects/ScrollReveal'
import './AboutTerminal.css'

type TabType = 'overview' | 'architecture' | 'education'

export default function AboutTerminal() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [copied, setCopied] = useState(false)
  const [activeCommandOutput, setActiveCommandOutput] = useState<string | null>(null)

  const handleCopyCode = () => {
    let textToCopy = ''
    if (activeTab === 'overview') {
      textToCopy = `#!/usr/bin/env bash
# Pham Hoang Vu - Systems Profile
NAME="Pham Hoang Vu"
ROLE="Backend & Full-Stack Systems Engineer"
EDUCATION="Danang University of Technology (DUT) - Software Engineering"
SPECIALTY="RESTful APIs, Edge Runtimes (Cloudflare), Relational Schemas (D1, PostgreSQL)"
PRINCIPLES=(
  "Sub-100ms API latency target"
  "Type-safe data boundaries via Zod & Drizzle"
  "Explicit RBAC permission middleware"
  "Predictable error modeling"
)`
    } else if (activeTab === 'architecture') {
      textToCopy = `// Architecture Standards & System Paradigms
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string; details?: unknown };
  metrics: { latencyMs: number; edgeRegion: string; timestamp: number };
}

// Security: Explicit RBAC Middleware Guard
export const requirePermission = (permission: string) => {
  return async (c: Context, next: Next) => {
    const user = c.get('jwtPayload');
    if (!user?.permissions?.includes(permission)) {
      throw new ForbiddenError('Insufficient ACL privileges');
    }
    await next();
  };
};`
    } else {
      textToCopy = `# Academic Rigor & Engineering Foundations
- Degree: Bachelor of Engineering in Software Engineering (DUT)
- Core Curriculum:
  * Data Structures & Algorithms (LeetCode regular)
  * Database Systems Design & Query Optimization (PostgreSQL, SQLite)
  * Operating Systems & Linux Environment
  * Distributed Web Architectures & Network Protocols`
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

  return (
    <section id="about" className="about-section" aria-label="About Me & Engineering Profile">
      <ScrollReveal direction="up" viewportAmount={0.2}>
        <div className="section-header">
          <AnimatedText text="Engineering Profile" el="h2" />
          <p>Architectural philosophy, technical foundations, and system&nbsp;paradigms</p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="zoom" delay={0.15} viewportAmount={0.15}>
        <TiltCard maxTilt={6} glareOpacity={0.15} scaleOnHover={1.01}>
          <div className="terminal-window">
            {/* Window Chrome & Tab Bar */}
            <div className="terminal-header-bar">
              <div className="terminal-window-controls">
                <span className="window-dot dot-red"></span>
                <span className="window-dot dot-yellow"></span>
                <span className="window-dot dot-green"></span>
              </div>

              <div className="terminal-tabs-nav" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'overview'}
                  className={`terminal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <i className="fas fa-terminal" aria-hidden="true"></i>
                  <span>overview.sh</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'architecture'}
                  className={`terminal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
                  onClick={() => setActiveTab('architecture')}
                >
                  <i className="fas fa-code" aria-hidden="true"></i>
                  <span>architecture.ts</span>
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'education'}
                  className={`terminal-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                  onClick={() => setActiveTab('education')}
                >
                  <i className="fas fa-graduation-cap" aria-hidden="true"></i>
                  <span>education.md</span>
                </button>
              </div>

              <div className="terminal-actions">
                <button
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

            {/* Terminal Body with Line Numbers */}
            <div className="terminal-body">
              {activeTab === 'overview' && (
                <div className="code-view" role="tabpanel">
                  <div className="line-numbers" aria-hidden="true">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span>15</span>
                    <span>16</span>
                  </div>
                  <pre className="code-content">
                    <code>
<span className="token-comment">#!/usr/bin/env bash</span>
<span className="token-comment"># Pham Hoang Vu - Systems Profile &amp; Core Runtime</span>

<span className="token-var">NAME</span>=<span className="token-str">"Pham Hoang Vu"</span>
<span className="token-var">TITLE</span>=<span className="token-str">"Backend &amp; Full-Stack Systems Engineer"</span>
<span className="token-var">LOCATION</span>=<span className="token-str">"Da Nang, Vietnam (UTC+7)"</span>
<span className="token-var">ALMA_MATER</span>=<span className="token-str">"Danang University of Technology (DUT)"</span>

<span className="token-keyword">declare -a</span> <span className="token-var">CORE_COMPETENCIES</span>=(
  <span className="token-str">"High-Throughput RESTful API Architecture"</span>
  <span className="token-str">"Role-Based Access Control (RBAC) &amp; JWT Security"</span>
  <span className="token-str">"Edge Distributed Databases (Cloudflare D1 &amp; SQLite)"</span>
  <span className="token-str">"Relational Schema Design &amp; Type-Safe ORMs (Drizzle)"</span>
  <span className="token-str">"Strict Input Contracts &amp; Schema Validation (Zod)"</span>
)

<span className="token-keyword">echo</span> <span className="token-str">"Status: Ready to build high-reliability services."</span>
                    </code>
                  </pre>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="code-view" role="tabpanel">
                  <div className="line-numbers" aria-hidden="true">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span>15</span>
                  </div>
                  <pre className="code-content">
                    <code>
<span className="token-comment">// Standardized Service Response Envelope Pattern</span>
<span className="token-keyword">export interface</span> <span className="token-type">ApiResponse</span>&lt;<span className="token-type">T</span>&gt; &#123;
  <span className="token-prop">success</span>: <span className="token-type">boolean</span>;
  <span className="token-prop">data</span>?: <span className="token-type">T</span>;
  <span className="token-prop">error</span>?: &#123; <span className="token-prop">code</span>: <span className="token-type">string</span>; <span className="token-prop">message</span>: <span className="token-type">string</span> &#125;;
  <span className="token-prop">meta</span>: &#123; <span className="token-prop">latencyMs</span>: <span className="token-type">number</span>; <span className="token-prop">region</span>: <span className="token-type">string</span> &#125;;
&#125;

<span className="token-comment">// RBAC Auth Guard: Enforcing Strict Bitmask Permissions</span>
<span className="token-keyword">export const</span> <span className="token-func">requirePermission</span> = (<span className="token-var">permission</span>: <span className="token-type">string</span>) =&gt; &#123;
  <span className="token-keyword">return async</span> (<span className="token-var">ctx</span>: <span className="token-type">Context</span>, <span className="token-var">next</span>: <span className="token-type">NextFunction</span>) =&gt; &#123;
    <span className="token-keyword">const</span> user = ctx.get(<span className="token-str">'jwtPayload'</span>);
    <span className="token-keyword">if</span> (!user?.permissions?.includes(permission)) &#123;
      <span className="token-keyword">throw new</span> <span className="token-type">ForbiddenError</span>(<span className="token-str">'Insufficient authorization privileges'</span>);
    &#125;
    <span className="token-keyword">await</span> next();
  &#125;;
&#125;;
                    </code>
                  </pre>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="code-view" role="tabpanel">
                  <div className="line-numbers" aria-hidden="true">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                  </div>
                  <pre className="code-content">
                    <code>
<span className="token-comment"># Danang University of Science and Technology (DUT)</span>
<span className="token-keyword">Institution</span>: Da Nang University of Technology (DUT)
<span className="token-keyword">Degree</span>: Bachelor of Science in Information Technology / Software Engineering
<span className="token-keyword">Academic Focus</span>: Distributed Systems, Database Architecture, Object-Oriented Design

<span className="token-comment">## Core Coursework &amp; Engineering Disciplines</span>
* <span className="token-str">Data Structures &amp; Algorithms</span>: Algorithmic complexity, graphs, dynamic programming (LeetCode)
* <span className="token-str">Relational Databases &amp; SQL</span>: Normalization, ACID transactions, index tuning, PostgreSQL
* <span className="token-str">Operating Systems &amp; Networking</span>: TCP/IP stack, process scheduling, concurrency, HTTP/2, DNS
* <span className="token-str">Software Engineering Practices</span>: Clean Architecture, Design Patterns, CI/CD, Git Flow
                    </code>
                  </pre>
                </div>
              )}

              {/* Interactive Command Runner Bar */}
              <div className="terminal-command-bar">
                <span className="command-prompt-symbol">$</span>
                <span className="command-prompt-hint">run interactive command:</span>
                <div className="command-buttons-group">
                  <button
                    className="cmd-pill-btn"
                    onClick={() => runCommand('benchmarks')}
                    aria-label="Run benchmark test"
                  >
                    ./benchmarks.sh
                  </button>
                  <button
                    className="cmd-pill-btn"
                    onClick={() => runCommand('auth')}
                    aria-label="Run auth flow simulation"
                  >
                    ./auth-flow.sh
                  </button>
                  {activeCommandOutput && (
                    <button
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
                <div className="terminal-live-output" role="status">
                  <code>{activeCommandOutput}</code>
                </div>
              )}
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>
    </section>
  )
}
