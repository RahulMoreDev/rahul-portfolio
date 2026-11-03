import { experience, education } from '../data/portfolioData';

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: '120px 24px',
        position: 'relative',
        background: 'var(--hud-bg)',
        borderTop: '1px solid rgba(0, 229, 255, 0.12)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        {/* Section Header: // 04 — TIMELINE */}
        <div>
          <div className="section-hud-tag">
            <span>//</span> 04 — TIMELINE
          </div>
          <h2 className="section-hud-title">EXPERIENCE &amp; LOGS</h2>
          <div className="section-hud-divider">
            <span className="line" />
            <span className="dot" />
            <span className="line-rev" />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 32,
            textAlign: 'left',
          }}
        >
          {/* Column 1: Industry Mission Log (Raveblue) */}
          <div>
            <div
              className="font-mono-hud"
              style={{
                fontSize: '0.85rem',
                color: 'var(--hud-cyan)',
                letterSpacing: '0.12em',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>[</span> MISSION LOG: INDUSTRY <span>]</span>
            </div>

            {experience.map((exp, i) => (
              <div
                key={i}
                className="hud-panel hud-corners"
                style={{
                  padding: '28px',
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div>
                  <div
                    className="font-mono-hud"
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--hud-green)',
                      letterSpacing: '0.1em',
                      marginBottom: 4,
                    }}
                  >
                    ● CURRENT MISSION // {exp.period}
                  </div>
                  <h3
                    className="font-hud"
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '0.03em',
                      marginBottom: 2,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <div
                    className="font-mono-hud"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--hud-cyan)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    // {exp.company}
                  </div>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {exp.responsibilities.map((r, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '0.84rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                      }}
                    >
                      <span style={{ color: 'var(--hud-cyan)', marginTop: 2 }}>▸</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 2: Academic Telemetry (Education) */}
          <div>
            <div
              className="font-mono-hud"
              style={{
                fontSize: '0.85rem',
                color: 'var(--hud-cyan)',
                letterSpacing: '0.12em',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>[</span> ARCHIVE: ACADEMIC QUALIFICATIONS <span>]</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="hud-panel hud-corners"
                  style={{
                    padding: '20px 24px',
                    borderRadius: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 }}>
                    <h4
                      className="font-hud"
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        letterSpacing: '0.02em',
                        margin: 0,
                      }}
                    >
                      {edu.degree}
                    </h4>
                    <span
                      className="font-mono-hud"
                      style={{
                        fontSize: '0.74rem',
                        color: 'var(--hud-cyan)',
                        padding: '2px 8px',
                        background: 'rgba(0, 229, 255, 0.08)',
                        border: '1px solid rgba(0, 229, 255, 0.2)',
                        borderRadius: 3,
                        fontWeight: 700,
                      }}
                    >
                      {edu.grade}
                    </span>
                  </div>

                  <div
                    className="font-mono-hud"
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {edu.institution} &nbsp;|&nbsp; {edu.period}
                  </div>

                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.55,
                      margin: '4px 0 0',
                    }}
                  >
                    {edu.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
