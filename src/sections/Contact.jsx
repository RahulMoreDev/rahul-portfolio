import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact: ' + form.name)}&body=${encodeURIComponent(`Hi Rahul,\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contactLinks = [
    { icon: '📧', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/rahulmore', href: personalInfo.linkedin },
    { icon: '⌥', label: 'GitHub', value: 'github.com/RahulMoreDev', href: personalInfo.github },
    { icon: '📍', label: 'Location', value: 'Maharashtra, India', href: null },
  ];

  return (
    <section id="contact" style={{
      padding: '120px 24px',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent)',
        top: '-50px', left: '-150px', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label" style={{ margin: '0 auto 16px' }}>
            <span className="dot" />
            Get In Touch
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800,
            letterSpacing: '-0.02em', color: 'var(--text-primary)',
          }}>
            Let's <span className="gradient-text-static">Connect</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 16, maxWidth: 460, margin: '16px auto 0' }}>
            Have a project in mind or want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: 40,
          alignItems: 'start',
        }} className="contact-grid">
          {/* Left — Info */}
          <div className="reveal-left" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <img src="/images/rahul-smile.jpg" alt="Rahul" style={{
                    width: 52, height: 52, borderRadius: '50%',
                    objectFit: 'cover', objectPosition: 'top',
                    border: '2px solid rgba(99,102,241,0.5)',
                  }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Rahul More</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Software Developer</div>
                  </div>
                </div>
                <div className="status-badge" style={{ display: 'inline-flex' }}>
                  <span className="status-dot" />
                  Available for work
                </div>
              </div>

              {contactLinks.map((c, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: i < contactLinks.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 2 }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#a5b4fc', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
                        {c.value}
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem', fontWeight: 500 }}>{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal-right">
            <form onSubmit={handleSubmit} className="glass-card" style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { key: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'text' },
                  { key: 'email', label: 'Email Address', placeholder: 'you@email.com', type: 'email' },
                ].map(f => (
                  <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{f.label}</span>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      required
                      style={inputStyle}
                    />
                  </label>
                ))}
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Subject</span>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm(v => ({ ...v, subject: e.target.value }))}
                  placeholder="Project collaboration / Job opportunity / Hello!"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Message</span>
                <textarea
                  value={form.message}
                  onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                  placeholder="Tell me about your project, opportunity, or just say hello..."
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
                />
              </label>

              <button type="submit" className="btn-primary" style={{
                width: '100%', padding: '14px', fontSize: '0.95rem',
                position: 'relative', zIndex: 1,
              }}>
                {sent ? '✅ Opening Email Client...' : '🚀 Send Message'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Or email directly at{' '}
                <a href={`mailto:${personalInfo.email}`} style={{ color: '#a5b4fc', textDecoration: 'none' }}>
                  {personalInfo.email}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-grid form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '11px 14px',
  color: 'var(--text-primary)',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
  width: '100%',
};
