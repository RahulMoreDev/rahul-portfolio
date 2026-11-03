import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject || 'Cyber-Comms: ' + form.name)}&body=${encodeURIComponent(`[TRANSMISSION INITIATED]\n\nSender: ${form.name}\nEmail: ${form.email}\n\nPayload:\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const commChannels = [
    { label: 'DIRECT EMAIL', value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: '✉' },
    { label: 'LINKEDIN TERMINAL', value: 'linkedin.com/in/rahul-more-3849a4377', href: personalInfo.linkedin, icon: '🔗' },
    { label: 'GITHUB VAULT', value: 'github.com/RahulMoreDev', href: personalInfo.github, icon: '⌥' },
    { label: 'GEO LOCATION', value: 'Maharashtra, India // IST [UTC+5:30]', href: null, icon: '📍' },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: '120px 24px',
        position: 'relative',
        background: 'rgba(4, 8, 16, 0.98)',
        borderTop: '1px solid rgba(0, 229, 255, 0.12)',
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 0.85fr) minmax(320px, 1.15fr)',
            gap: 28,
            textAlign: 'left',
          }}
          className="contact-hud-grid"
        >
          {/* Left: Communication Channels Box */}
          <div
            className="hud-panel hud-corners"
            style={{
              padding: '32px 28px',
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
                  fontSize: '1.25rem',
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {commChannels.map((c) => (
                <div
                  key={c.label}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 6,
                    background: 'rgba(0, 229, 255, 0.04)',
                    border: '1px solid rgba(0, 229, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: '1.1rem', color: 'var(--hud-cyan)' }}>{c.icon}</span>
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      className="font-mono-hud"
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono-hud"
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--hud-cyan)',
                          textDecoration: 'none',
                          wordBreak: 'break-all',
                        }}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span
                        className="font-mono-hud"
                        style={{
                          fontSize: '0.82rem',
                          color: '#ffffff',
                        }}
                      >
                        {c.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Encrypted Comms Input Terminal Form */}
          <div
            className="hud-panel hud-corners"
            style={{
              padding: '32px 30px',
              borderRadius: 8,
            }}
          >
            <div
              className="font-mono-hud"
              style={{
                fontSize: '0.72rem',
                color: 'var(--hud-green)',
                letterSpacing: '0.12em',
                marginBottom: 16,
              }}
            >
              ● SYSTEM_READY: INITIATE_PAYLOAD
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-two-col">
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span className="font-mono-hud" style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
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
                  <span className="font-mono-hud" style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
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
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="font-mono-hud" style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
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

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="font-mono-hud" style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  TRANSMISSION_BODY (MESSAGE)
                </span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  required
                  placeholder="Detail your requirements or inquiry here..."
                  style={{ ...hudInputStyle, resize: 'vertical' }}
                />
              </label>

              <button type="submit" className="btn-hud-primary" style={{ justifyContent: 'center', marginTop: 4 }}>
                <span>⬡</span>
                <span>{sent ? 'TRANSMISSION OPENING...' : 'DISPATCH TRANSMISSION'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .contact-hud-grid {
            grid-template-columns: 1fr !important;
          }
          .form-two-col {
            grid-template-columns: 1fr !important;
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
  transition: 'all 0.2s ease',
};
