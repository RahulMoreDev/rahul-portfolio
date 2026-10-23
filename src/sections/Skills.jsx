import { useEffect, useRef } from 'react';
import { skills, techStackHighlights } from '../data/portfolioData';

const LEVEL_MAP = { Advanced: 90, Intermediate: 65, Beginner: 40 };

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend', icon: '🖥', color: '#6366f1' },
  { key: 'backend',  label: 'Backend',  icon: '⚙️', color: '#06b6d4' },
  { key: 'database', label: 'Database', icon: '🗄', color: '#a855f7' },
  { key: 'tools',    label: 'Tools',    icon: '🛠', color: '#f59e0b' },
];

function SkillBar({ name, level, color }) {
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && barRef.current) {
        barRef.current.style.width = LEVEL_MAP[level] + '%';
      }
    }, { threshold: 0.3 });
    if (barRef.current) observer.observe(barRef.current.parentElement);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{level}</span>
      </div>
      <div className="skill-bar-track">
        <div ref={barRef} className="skill-bar-fill" style={{
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '120px 24px', background: 'var(--bg-primary)', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <div className="section-label" style={{ margin: '0 auto 16px' }}>
            <span className="dot" />
            Skills & Expertise
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 800, letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            My Tech <span className="gradient-text-static">Arsenal</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 16, maxWidth: 500, margin: '16px auto 0' }}>
            Technologies I work with to build modern, scalable applications
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
          marginBottom: 64,
        }}>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.key} className={`glass-card reveal delay-${i + 1}`} style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${cat.color}18`,
                  border: `1px solid ${cat.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {cat.label}
                </h3>
              </div>
              {skills[cat.key].map(skill => (
                <SkillBar key={skill.name} {...skill} color={cat.color} />
              ))}
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>
            Core Technologies
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {techStackHighlights.map((t, i) => (
              <div key={t.name} className={`tech-badge reveal delay-${(i % 6) + 1}`}
                style={{ fontSize: '0.875rem', padding: '8px 16px' }}>
                <span style={{ fontWeight: 600 }}>{t.name}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>· {t.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
