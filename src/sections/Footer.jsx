import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '60px 24px 40px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap', gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                position: 'relative',
                width: 44,
                height: 44,
                borderRadius: '50%',
                padding: '2px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4, #a855f7)',
                boxShadow: '0 0 18px rgba(99, 102, 241, 0.4)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src="/images/rahul-hero.jpg"
                  alt="Rahul More"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    display: 'block',
                  }}
                />
              </div>
              <div>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'block', lineHeight: 1.2 }}>
                  Rahul<span className="gradient-text-static"> More</span>
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                  Software Developer
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.75 }}>
              Software Developer building modern web applications with React, Java, and Node.js.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} style={{
                  textDecoration: 'none', color: 'var(--text-muted)',
                  fontSize: '0.875rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#a5b4fc'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >{link}</a>
              ))}
            </div>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Connect</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[
                { label: 'GitHub', href: personalInfo.github },
                { label: 'LinkedIn', href: personalInfo.linkedin },
                { label: 'Email', href: `mailto:${personalInfo.email}` },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.target.style.color = '#a5b4fc'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >{s.label}</a>
              ))}
            </div>
            <a href={`mailto:${personalInfo.email}`} className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '9px 20px', fontSize: '0.85rem' }}>
              Hire Me →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)',
          marginBottom: 28,
        }} />

        {/* Bottom */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            © {year} Rahul More. Built with <span style={{ color: '#6366f1' }}>React</span> + <span style={{ color: '#06b6d4' }}>Tailwind</span>. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <a href="https://rahulmore.vercel.app" style={{ color: '#a5b4fc', textDecoration: 'none' }}>
              rahulmore.vercel.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
