import { useState } from 'react'
import AnimatedText from '../Effects/AnimatedText'
import TiltCard from '../Effects/TiltCard'
import ScrollReveal from '../Effects/ScrollReveal'
import MagneticWrapper from '../Effects/MagneticWrapper'
import RippleEffect from '../Effects/RippleEffect'
import './Contact.css'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [isError, setIsError] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('phamvuhoang486@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setIsError(false)
    setFormStatus('')

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '6b4d7c03-c3f1-4249-806c-a59b3b2d7e4e'

    formData.append('access_key', accessKey)
    formData.append('subject', `Tin nhắn mới từ Portfolio của ${formData.get('name')}`)

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setSending(false)
        if (data.success) {
          setIsError(false)
          setFormStatus('Thank you! Your message has been sent successfully.')
          form.reset()
          setTimeout(() => setFormStatus(''), 6000)
        } else {
          setIsError(true)
          setFormStatus(data.message || 'An error occurred while sending your message. Please try again.')
        }
      })
      .catch((err) => {
        setSending(false)
        setIsError(true)
        setFormStatus('Unable to send message. Please check your network connection.')
        console.error('Contact form error:', err)
      })
  }

  return (
    <section id="contact" className="contact-section" aria-label="Contact Information">
      <ScrollReveal direction="up">
        <div className="section-header">
          <AnimatedText text="Get in Touch" el="h2" gradient />
          <p>Open for backend engineer roles, project inquiries, and collaborations</p>
        </div>
      </ScrollReveal>

      <div className="contact-grid">
        {/* Contact info column */}
        <ScrollReveal direction="left" delay={0.15}>
          <TiltCard maxTilt={8} glareOpacity={0.2} scaleOnHover={1.01}>
            <div className="contact-card">
              <div>
                <h3 className="contact-card-title">Direct Contact</h3>
                <p className="contact-card-text">
                  Feel free to reach out directly via email or connect with me on social platforms.
                </p>
              </div>

              <div className="email-box">
                <span className="email-box-label">EMAIL ADDRESS</span>
                <div className="email-box-row">
                  <span className="email-address">phamvuhoang486@gmail.com</span>
                  <MagneticWrapper strength={0.3}>
                    <RippleEffect>
                      <button
                        onClick={handleCopyEmail}
                        className="btn-copy-pill"
                        type="button"
                        aria-label="Copy email address to clipboard"
                      >
                        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true"></i>
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </RippleEffect>
                  </MagneticWrapper>
                </div>
              </div>

              <div className="socials-grid">
                {[
                  { label: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/phamhoangvu2k7' },
                  { label: 'LinkedIn', icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/vupham2k7/' },
                  { label: 'LeetCode', icon: 'devicon-leetcode-plain', href: 'https://leetcode.com/u/hoangvupham2405/' },
                  { label: 'Facebook', icon: 'fab fa-facebook', href: 'https://www.facebook.com/pham.hoang.vu.591333' },
                ].map((s) => (
                  <MagneticWrapper key={s.label} strength={0.35}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="social-pill-link">
                      <i className={s.icon} aria-hidden="true"></i>
                      <span>{s.label}</span>
                    </a>
                  </MagneticWrapper>
                ))}
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* Contact form column */}
        <ScrollReveal direction="right" delay={0.2}>
          <TiltCard maxTilt={8} glareOpacity={0.2} scaleOnHover={1.01}>
            <div className="contact-card">
              <h3 className="contact-card-title">Send a Message</h3>

              <form onSubmit={handleSendMessage} className="contact-form">
                <div className="form-field">
                  <label htmlFor="name-input" className="form-label">Your Name</label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Smith"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email-input" className="form-label">Email Address</label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. alex@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message-input" className="form-label">Message</label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows={4}
                    required
                    placeholder="Hi Vu, I'd like to talk about..."
                    className="form-textarea"
                  ></textarea>
                </div>

                <MagneticWrapper strength={0.2}>
                  <RippleEffect style={{ width: '100%' }}>
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary-tactile"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>{sending ? 'Sending...' : 'Send Message'}</span>
                      <i className="fas fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </RippleEffect>
                </MagneticWrapper>

                {formStatus && (
                  <div
                    className={`form-status-msg ${isError ? 'error' : 'success'}`}
                    role="status"
                    aria-live="polite"
                  >
                    {formStatus}
                  </div>
                )}
              </form>
            </div>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  )
}
