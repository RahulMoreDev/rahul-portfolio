import { useState } from 'react';
import { projects } from '../data/portfolioData';

const FILTERS = ['All', 'Full Stack', 'Backend & APIs', 'Java Systems'];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active);

  return (
    <section id="projects" style={{
      padding: '120px 24px',
      background: 'var(--bg-secondary)',
      position: 'relative',
    }}>
      {/* Orb */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent)',
        top: '-100px', right: '-100px', filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ margin: '0 auto 16px' }}>
            <span className="dot" />
            Projects
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800,
            letterSpacing: '-0.02em', color: 'var(--text-primary)',
          }}>
            What I've <span className="gradient-text-static">Built</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
            Real-world projects demonstrating full-stack, backend, and system development skills
          </p>
        </div>

        {/* Filters */}
        <div className="reveal" style={{
          display: 'flex', gap: 10, justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: 48,
        }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              padding: '8px 20px', borderRadius: 999, cursor: 'pointer',
              border: `1px solid ${active === f ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
              background: active === f ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
              color: active === f ? '#a5b4fc' : 'var(--text-secondary)',
              fontWeight: active === f ? 600 : 400,
              fontSize: '0.875rem',
              transition: 'all 0.25s',
            }}>
              {f}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {filtered.map((proj, i) => (
            <ProjectCard key={proj.id} project={proj} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`glass-card project-card reveal delay-${delay + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          padding: '4px 12px', borderRadius: 999,
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
          color: '#a5b4fc', fontSize: '0.72rem', fontWeight: 600,
        }}>{project.category}</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14,
            transition: 'all 0.2s',
          }} title="GitHub">⌥</a>
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14,
            transition: 'all 0.2s',
          }} title="Live Demo">↗</a>
        </div>
      </div>

      {/* Gradient preview */}
      <div style={{
        height: 120, borderRadius: 12,
        background: `linear-gradient(135deg, ${getGradient(project.id)})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, position: 'relative', overflow: 'hidden',
      }}>
        {getIcon(project.id)}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(3,7,18,0.8))',
        }} />
      </div>

      {/* Title & desc */}
      <div>
        <h3 style={{
          fontWeight: 700, fontSize: '1.1rem',
          color: 'var(--text-primary)', marginBottom: 8,
        }}>{project.title}</h3>
        <p style={{
          color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65,
        }}>{project.description}</p>
      </div>

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {project.features.slice(0, 3).map((f, i) => (
          <li key={i} style={{
            display: 'flex', gap: 8, alignItems: 'flex-start',
            fontSize: '0.8rem', color: 'var(--text-muted)',
          }}>
            <span style={{ color: '#6366f1', flexShrink: 0, marginTop: 1 }}>▸</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Tech pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.technologies.map(t => (
          <span key={t} className="tech-badge" style={{ padding: '3px 10px', fontSize: '0.72rem' }}>{t}</span>
        ))}
      </div>

      {/* Footer buttons */}
      <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 4 }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="btn-outline" style={{ flex: 1, textDecoration: 'none', textAlign: 'center', padding: '8px 0', fontSize: '0.82rem' }}>
          GitHub
        </a>
        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
          className="btn-primary" style={{ flex: 1, textDecoration: 'none', textAlign: 'center', padding: '8px 0', fontSize: '0.82rem' }}>
          Live Demo ↗
        </a>
      </div>
    </div>
  );
}

function getGradient(id) {
  const g = {
    'crm-app': 'rgba(99,102,241,0.3), rgba(6,182,212,0.15)',
    'journal-mgmt': 'rgba(16,185,129,0.3), rgba(6,182,212,0.15)',
    'student-mgmt': 'rgba(168,85,247,0.3), rgba(99,102,241,0.15)',
    'bank-mgmt': 'rgba(245,158,11,0.3), rgba(239,68,68,0.15)',
  };
  return g[id] || 'rgba(99,102,241,0.2), rgba(6,182,212,0.1)';
}

function getIcon(id) {
  const icons = {
    'crm-app': '🤝',
    'journal-mgmt': '📔',
    'student-mgmt': '🎓',
    'bank-mgmt': '🏦',
  };
  return icons[id] || '💻';
}
