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
        padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 24px)',
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

        {/* Content Layout */}
        <div className="about-hud-grid">
          {/* Main Profile HUD Box */}
          <div className="hud-panel hud-corners about-bio-box">
            {/* Diamond HUD Holographic Photo Avatar */}
            <div className="diamond-hud-wrap" style={{ flexShrink: 0 }}>
              <div className="diamond-hud-ring" />
              <div className="diamond-hud-border" />
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(0, 229, 255, 0.5)',
                  boxShadow: '0 0 18px rgba(0, 229, 255, 0.5)',
                }}
              >
                <img
                  src="/images/rahul-about.jpg"
                  alt="Rahul More"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.08) brightness(1.05)',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="font-hud"
                  style={{
                    display: 'none',
                    position: 'absolute',
                    inset: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#040810',
                    color: 'var(--hud-cyan)',
                    fontSize: '1.6rem',
                    fontWeight: 900,
                    letterSpacing: '0.1em',
                    textShadow: '0 0 15px rgba(0, 229, 255, 0.9)',
                  }}
                >
                  RM
                </div>
              </div>
            </div>

            {/* Profile Bio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <h3
                  className="font-hud"
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
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
              <div className="about-tags">
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

          {/* Right Metrics Cards (4 Square HUD metric boxes) */}
          <div className="about-metrics-grid">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="hud-panel hud-corners"
                style={{
                  padding: 'clamp(16px, 2vw, 24px) clamp(12px, 2vw, 16px)',
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
                    fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
                    fontWeight: 900,
                    color: 'var(--hud-cyan)',
                    letterSpacing: '0.04em',
                    textShadow: '0 0 20px rgba(0, 229, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'rgba(0, 229, 255, 0.6)' }}>⬡</span>
                  <span>{m.value}</span>
                </div>
                <div
                  className="font-mono-hud"
                  style={{
                    fontSize: 'clamp(0.65rem, 1vw, 0.76rem)',
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
        .about-hud-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 24px;
          align-items: stretch;
          text-align: left;
        }

        .about-bio-box {
          padding: 36px 32px;
          border-radius: 8px;
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .about-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .about-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          .about-hud-grid {
            grid-template-columns: 1fr !important;
          }
          .about-bio-box {
            flex-direction: column !important;
            text-align: center !important;
            padding: 28px 20px;
            gap: 20px;
          }
          .about-tags {
            justify-content: center;
          }
          .about-metrics-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .about-bio-box {
            padding: 20px 16px;
            gap: 16px;
          }
          .about-tags .font-mono-hud {
            font-size: 0.65rem;
            padding: 3px 8px;
          }
        }
      `}</style>
    </section>
  );
}
