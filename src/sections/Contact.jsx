import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ onOpenEmail }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Software Developer', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const triggerEmailDashboard = (customSubject, customMessage) => {
    if (onOpenEmail) {
      onOpenEmail();
    } else {
      window.dispatchEvent(new CustomEvent('jarvis-open-email'));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Cyber-Comms [${form.role}]: ${form.name}`);
    const body = encodeURIComponent(
      `[TRANSMISSION INITIATED]\n\nSender: ${form.name}\nRole / Designation: ${form.role}\nEmail: ${form.email}\n\nPayload:\n${form.message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const commChannels = [
    {
      label: 'DIRECT EMAIL (CLICK TO COMPOSE)',
      value: personalInfo.email,
      isEmail: true,
      icon: '✉',
    },
    {
      label: 'LINKEDIN TERMINAL',
      value: 'linkedin.com/in/rahul-more-3849a4377',
      href: personalInfo.linkedin,
      icon: '🔗',
    },
    {
      label: 'GITHUB VAULT',
      value: 'github.com/RahulMoreDev',
      href: personalInfo.github,
      icon: '⌥',
    },
    {
      label: 'GEO LOCATION',
      value: 'Maharashtra, India // IST [UTC+5:30]',
      href: null,
      icon: '📍',
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 24px)',
        position: 'relative',
        background: 'rgba(4, 8, 16, 0.98)',
        borderTop: '1px solid rgba(0, 229, 255, 0.12)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        {/* Section Header: // 05 — COMMS */}
        <div>
          <div className="section-hud-tag">
            <span>//</span> 05 — COMMS
          </div>
          <h2 className="section-hud-title">CONTACT SYSTEM</h2>
          <div className="section-hud-divider">
            <span className="line" />
            <span className="dot" />
            <span className="line-rev" />
          </div>
        </div>

        <div className="contact-hud-grid">
          {/* Left: Communication Channels Box */}
          <div
            className="hud-panel hud-corners contact-channels-panel"
            style={{
              padding: 'clamp(20px, 4vw, 32px) clamp(18px, 3vw, 28px)',
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div>
              <div
                className="font-mono-hud"
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--hud-cyan)',
                  letterSpacing: '0.12em',
                  marginBottom: 6,
                }}
              >
                // TRANSMISSION CHANNELS
              </div>
              <h3
                className="font-hud"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.03em',
                }}
              >
                SECURE COMMS
              </h3>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.65 }}>
              Available for full-time software engineering roles, high-impact backend contracts, and full stack
              collaborations. Transmission lines open 24/7.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {commChannels.map((c) => (
                <div
                  key={c.label}
                  onClick={() => {
                    if (c.isEmail) triggerEmailDashboard();
                  }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 6,
                    background: c.isEmail ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 229, 255, 0.04)',
                    border: c.isEmail ? '1px solid rgba(0, 229, 255, 0.45)' : '1px solid rgba(0, 229, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    cursor: c.isEmail ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    boxShadow: c.isEmail ? '0 0 15px rgba(0, 229, 255, 0.15)' : 'none',
                  }}
                  title={c.isEmail ? 'Click to open J.A.R.V.I.S. Email Compose Dashboard' : ''}
                >
                  <span style={{ fontSize: '1.1rem', color: 'var(--hud-cyan)', flexShrink: 0 }}>{c.icon}</span>
                  <div style={{ overflow: 'hidden', minWidth: 0, flex: 1 }}>
                    <div
                      className="font-mono-hud"
                      style={{
                        fontSize: '0.66rem',
                        color: c.isEmail ? 'var(--hud-cyan)' : 'var(--text-muted)',
                        letterSpacing: '0.1em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span>{c.label}</span>
                      {c.isEmail && (
                        <span
                          style={{
                            fontSize: '0.58rem',
                            color: 'var(--hud-green)',
                            background: 'rgba(0, 255, 157, 0.12)',
                            border: '1px solid rgba(0, 255, 157, 0.3)',
                            padding: '1px 5px',
                            borderRadius: 3,
                          }}
                        >
                          COMPOSE DASHBOARD ↗
                        </span>
                      )}
                    </div>
                    {c.isEmail ? (
                      <span
                        className="font-mono-hud"
                        style={{
                          fontSize: '0.84rem',
                          color: '#ffffff',
                          fontWeight: 700,
                          wordBreak: 'break-word',
                          display: 'block',
                        }}
                      >
                        {c.value}
                      </span>
                    ) : c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono-hud"
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--hud-cyan)',
                          textDecoration: 'none',
                          wordBreak: 'break-word',
                          display: 'block',
                        }}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span
                        className="font-mono-hud"
                        style={{
                          fontSize: '0.8rem',
                          color: '#ffffff',
                          wordBreak: 'break-word',
                          display: 'block',
                        }}
                      >
                        {c.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Dashboard Launcher Button */}
            <button
              onClick={() => triggerEmailDashboard()}
              className="btn-hud-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '0.78rem',
                marginTop: 6,
              }}
            >
              <span>📨</span>
              <span>LAUNCH EMAIL COMPOSE DASHBOARD</span>
            </button>
          </div>

          {/* Right: Encrypted Comms Input Terminal Form */}
          <div
            className="hud-panel hud-corners contact-form-panel"
            style={{
              padding: 'clamp(20px, 4vw, 32px) clamp(18px, 3vw, 30px)',
              borderRadius: 8,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div
                className="font-mono-hud"
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--hud-green)',
                  letterSpacing: '0.12em',
                }}
              >
                ● SYSTEM_READY: INITIATE_PAYLOAD
              </div>

              <button
                type="button"
                onClick={() => triggerEmailDashboard()}
                className="font-mono-hud"
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--hud-cyan)',
                  background: 'transparent',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  padding: '4px 8px',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Full Dashboard ↗
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    IDENTIFIER (NAME)
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Enter your name..."
                    style={hudInputStyle}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    YOUR ROLE / DESIGNATION
                  </span>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    style={{
                      ...hudInputStyle,
                      backgroundColor: '#061224',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Software Developer">💻 Software Developer</option>
                    <option value="Sales Executive">📈 Sales Executive</option>
                    <option value="Technical Recruiter">👔 HR / Technical Recruiter</option>
                    <option value="Founder / CEO">🚀 Founder / CEO / CTO</option>
                    <option value="Product Manager">🎯 Product / Project Manager</option>
                    <option value="Client / Business Owner">🤝 Client / Business Owner</option>
                    <option value="Other">✨ Other / Specialist</option>
                  </select>
                </label>
              </div>

              <div className="form-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    RETURN SIGNAL (EMAIL)
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="you@domain.com"
                    style={hudInputStyle}
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    SUBJECT_HEADER
                  </span>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Software Developer Role / Project Proposal"
                    style={hudInputStyle}
                  />
                </label>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  TRANSMISSION_BODY (MESSAGE)
                </span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  required
                  placeholder="Detail your requirements or inquiry here..."
                  style={{ ...hudInputStyle, resize: 'vertical' }}
                />
              </label>

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="submit" className="btn-hud-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  <span>⬡</span>
                  <span>{sent ? 'TRANSMISSION OPENING...' : 'DISPATCH VIA GMAIL'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerEmailDashboard()}
                  className="btn-hud-secondary"
                  style={{ justifyContent: 'center', padding: '10px 14px' }}
                  title="Open full compose dashboard with templates & options"
                >
                  <span>⚙ DASHBOARD</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-hud-grid {
          display: grid;
          grid-template-columns: minmax(min(100%, 300px), 0.85fr) minmax(min(100%, 320px), 1.15fr);
          gap: 28px;
          text-align: left;
        }

        @media (max-width: 820px) {
          .contact-hud-grid {
            grid-template-columns: 1fr !important;
            gap: 20px;
          }
          .form-two-col {
            grid-template-columns: 1fr !important;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
}

const hudInputStyle = {
  background: 'rgba(0, 229, 255, 0.04)',
  border: '1px solid rgba(0, 229, 255, 0.25)',
  borderRadius: 4,
  padding: '10px 14px',
  color: '#ffffff',
  fontSize: '0.85rem',
  fontFamily: "'Share Tech Mono', monospace",
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'all 0.2s ease',
};
