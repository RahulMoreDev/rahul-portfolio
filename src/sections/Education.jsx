import { education } from '../data/portfolioData';

const ICONS = ['🎓', '🏫', '📚', '🏫'];
const COLORS = ['#6366f1', '#06b6d4', '#a855f7', '#f59e0b'];

export default function Education() {
  return (
    <section id="education" style={{ padding: '120px 24px', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label" style={{ margin: '0 auto 16px' }}>
            <span className="dot" />
            Education
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800,
            letterSpacing: '-0.02em', color: 'var(--text-primary)',
          }}>
            Academic <span className="gradient-text-static">Journey</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {education.map((edu, i) => (
            <div key={i} className={`glass-card reveal delay-${i + 1}`}
              style={{ padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>

              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `${COLORS[i]}18`,
                border: `1px solid ${COLORS[i]}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>
                {ICONS[i]}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                      {edu.degree}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{edu.institution}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600,
                      background: `${COLORS[i]}15`, border: `1px solid ${COLORS[i]}35`,
                      color: COLORS[i],
                    }}>{edu.grade}</span>
                    <span style={{
                      padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem',
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--text-muted)',
                    }}>{edu.period}</span>
                  </div>
                </div>
                <p style={{
                  color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.65,
                  marginTop: 8,
                }}>{edu.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
