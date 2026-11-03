import { personalInfo } from '../data/portfolioData';

export default function About() {
  const metrics = [
    { value: '4+', label: 'Projects Built' },
    { value: '8.0', label: 'B.E. CGPA' },
    { value: '10+', label: 'Technologies' },
    { value: '1+ yrs', label: 'Industry Experience' },
  ];

  return (
    <section
      id="about"
      style={{
        padding: '120px 24px',
        position: 'relative',
        background: 'rgba(4, 8, 16, 0.95)',
        borderTop: '1px solid rgba(0, 229, 255, 0.12)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        {/* Section Header: // 01 — PROFILE */}
        <div>
          <div className="section-hud-tag">
            <span>//</span> 01 — PROFILE
          </div>
          <h2 className="section-hud-title">ABOUT ME</h2>
          <div className="section-hud-divider">
            <span className="line" />
            <span className="dot" />
            <span className="line-rev" />
          </div>
        </div>

        {/* Content Layout (Matches your Screenshot 4) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(280px, 0.65fr)',
            gap: 24,
            alignItems: 'stretch',
            textAlign: 'left',
          }}
          className="about-hud-grid"
        >
          {/* Main Profile HUD Box */}
          <div
            className="hud-panel hud-corners about-bio-box"
            style={{
              padding: '36px 32px',
              borderRadius: 8,
              display: 'flex',
              gap: 32,
              alignItems: 'center',
            }}
          >
            {/* Diamond HUD Holographic Monogram / Avatar */}
            <div className="diamond-hud-wrap" style={{ flexShrink: 0 }}>
              <div className="diamond-hud-ring" />
              <div className="diamond-hud-border" />
              <div
                className="font-hud"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: 'var(--hud-cyan)',
                  letterSpacing: '0.1em',
                  textShadow: '0 0 15px rgba(0, 229, 255, 0.9)',
                }}
              >
                RM
              </div>
            </div>

            {/* Profile Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <h3
                  className="font-hud"
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                    marginBottom: 4,
                  }}
                >
                  {personalInfo.name}
                </h3>
                <div
                  className="font-mono-hud"
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--hud-cyan)',
                    letterSpacing: '0.08em',
                  }}
                >
                  Full Stack Software Developer
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                A passionate Full Stack Developer with expertise in building scalable web applications and solving
                complex backend problems. I specialize in bridging the gap between interactive React frontend
                experiences and robust Java/Spring Boot &amp; Node.js backend architectures.
              </p>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75 }}>
                With a strong Computer Engineering foundation (CGPA 8.0) and industry experience at Raveblue, I bring
                ideas to life through clean RESTful APIs, normalized database designs, and maintainable software patterns.
              </p>

              {/* Tactical Chip Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 6 }}>
                {['Full Stack Engineer', 'Spring Boot & APIs', 'Problem Solver', 'Tech Enthusiast'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono-hud"
                    style={{
                      padding: '4px 12px',
                      borderRadius: 4,
                      fontSize: '0.74rem',
                      color: 'var(--hud-cyan)',
                      background: 'rgba(0, 229, 255, 0.08)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                    }}
                  >
                    [ {tag} ]
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Metrics Cards (4 Square HUD metric boxes from reference) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                className="hud-panel hud-corners"
                style={{
                  padding: '24px 16px',
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: 8,
                }}
              >
                <div
                  className="font-hud"
                  style={{
                    fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                    fontWeight: 900,
                    color: 'var(--hud-cyan)',
                    letterSpacing: '0.04em',
                    textShadow: '0 0 20px rgba(0, 229, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: '1rem', color: 'rgba(0, 229, 255, 0.6)' }}>⬡</span>
                  <span>{m.value}</span>
                </div>
                <div
                  className="font-mono-hud"
                  style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-hud-grid {
            grid-template-columns: 1fr !important;
          }
          .about-bio-box {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
