import { useState } from 'react'
import { motion } from 'framer-motion'
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
      <div className="section-header">
        <h2>Get in Touch</h2>
        <p>Open for backend engineer roles, project inquiries, and collaborations</p>
      </div>

      <div className="contact-grid">
        {/* Contact info column */}
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
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
              <button
                onClick={handleCopyEmail}
                className="btn-copy-pill"
                type="button"
                aria-label="Copy email address to clipboard"
              >
                <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true"></i>
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="socials-grid">
            <a href="https://github.com/phamhoangvu2k7" target="_blank" rel="noreferrer" className="social-pill-link">
              <i className="fab fa-github" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/vupham2k7/" target="_blank" rel="noreferrer" className="social-pill-link">
              <i className="fab fa-linkedin" aria-hidden="true"></i>
              <span>LinkedIn</span>
            </a>
            <a href="https://leetcode.com/u/hoangvupham2405/" target="_blank" rel="noreferrer" className="social-pill-link">
              <i className="devicon-leetcode-plain" aria-hidden="true"></i>
              <span>LeetCode</span>
            </a>
            <a href="https://www.facebook.com/pham.hoang.vu.591333" target="_blank" rel="noreferrer" className="social-pill-link">
              <i className="fab fa-facebook" aria-hidden="true"></i>
              <span>Facebook</span>
            </a>
          </div>
        </motion.div>

        {/* Contact form column */}
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
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

            <button
              type="submit"
              disabled={sending}
              className="btn-primary-tactile"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>{sending ? 'Sending...' : 'Send Message'}</span>
              <i className="fas fa-paper-plane" aria-hidden="true"></i>
            </button>

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
        </motion.div>
      </div>
    </section>
  )
}
