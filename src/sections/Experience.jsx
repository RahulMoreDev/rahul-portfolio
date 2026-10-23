import { experience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '120px 24px', background: 'var(--bg-primary)', position: 'relative' }}>
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.07), transparent)',
        bottom: 0, right: 0, filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label" style={{ margin: '0 auto 16px' }}>
            <span className="dot" />
            Experience
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800,
            letterSpacing: '-0.02em', color: 'var(--text-primary)',
          }}>
            Work <span className="gradient-text-static">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 17, top: 36, bottom: 0,
            width: 2,
            background: 'linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.1))',
          }} />

          {experience.map((exp, idx) => (
            <div key={idx} className={`reveal delay-${idx + 1}`} style={{
              display: 'flex', gap: 24, marginBottom: 48,
            }}>
              {/* Dot */}
              <div className="timeline-dot" style={{ flexShrink: 0, marginTop: 4 }}>
                <span style={{ fontSize: 14 }}>💼</span>
              </div>

              {/* Card */}
              <div className="glass-card" style={{ flex: 1, padding: 32 }}>
                {/* Header */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                      {exp.role}
                    </h3>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className="gradient-text-static" style={{ fontWeight: 700, fontSize: '1rem' }}>
                        {exp.company}
                      </span>
                      <span style={{
                        padding: '3px 10px', borderRadius: 999,
                        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                        color: '#86efac', fontSize: '0.72rem', fontWeight: 600,
                      }}>{exp.type}</span>
                    </div>
                  </div>
                  <div style={{
                    padding: '6px 14px', borderRadius: 8,
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                    color: '#a5b4fc', fontSize: '0.8rem', fontWeight: 500,
                    height: 'fit-content',
                  }}>
                    {exp.period}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

                {/* Responsibilities */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                        flexShrink: 0, marginTop: 6,
                      }} />
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* "Looking for" card */}
          <div className="reveal" style={{ display: 'flex', gap: 24 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(34,197,94,0.1)', border: '2px dashed rgba(34,197,94,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, marginTop: 4,
            }}>✨</div>
            <div className="glass-card" style={{ flex: 1, padding: 24 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div className="status-dot" />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Open to new opportunities</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 8, lineHeight: 1.65 }}>
                Currently exploring full-time Software Developer roles. Open to remote & on-site positions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
