import { personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" style={{
      padding: '120px 24px',
      background: 'var(--bg-secondary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle orb */}
      <div style={{
        position: 'absolute', width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(168,85,247,0.07), transparent)',
        top: '10%', left: '-100px',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label" style={{ margin: '0 auto 16px' }}>
            <span className="dot" />
            About Me
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800, letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            Who I <span className="gradient-text-static">Am</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }} className="about-grid">
          {/* Photo side */}
          <div className="reveal-left" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                position: 'absolute', inset: -2, borderRadius: 24,
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                zIndex: 0,
              }} />
              <img
                src="/images/rahul-about.jpg"
                alt="Rahul More"
                style={{
                  width: 'clamp(240px, 22vw, 340px)',
                  height: 'clamp(280px, 28vw, 420px)',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  borderRadius: 22,
                  display: 'block',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
              {/* Info card on photo */}
              <div className="glass-card" style={{
                position: 'absolute', bottom: -24, right: -30,
                padding: '14px 20px', zIndex: 10,
              }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4 }}>📍 Location</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Maharashtra, India</div>
                <div style={{ fontSize: '0.72rem', color: '#a5b4fc', marginTop: 4 }}>Open to Remote 🌐</div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
              lineHeight: 1.85,
            }}>
              {personalInfo.about}
            </p>

            {/* Info list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: '🎓 Degree', value: 'B.E. Computer Engineering' },
                { label: '🏫 University', value: 'Sant Gadge Baba Amravati University' },
                { label: '📊 CGPA', value: '8.0 / 10' },
                { label: '💼 Company', value: 'Raveblue' },
                { label: '📧 Email', value: personalInfo.email },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', minWidth: 130 }}>{item.label}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                GitHub Profile
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; text-align: center; }
          .about-grid > div:first-child { order: -1; }
        }
      `}</style>
    </section>
  );
}
