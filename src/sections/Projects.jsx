import { useState } from 'react';
import { projects } from '../data/portfolioData';

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const categories = ['ALL', 'Full Stack', 'Backend & APIs', 'Java Systems'];

  const filteredProjects =
    selectedFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  return (
    <section
      id="projects"
      style={{
        padding: '120px 24px',
        position: 'relative',
        background: 'rgba(4, 8, 16, 0.95)',
        borderTop: '1px solid rgba(0, 229, 255, 0.12)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        {/* Section Header: // 03 — DEPLOYMENTS */}
        <div>
          <div className="section-hud-tag">
            <span>//</span> 03 — DEPLOYMENTS
          </div>
          <h2 className="section-hud-title">PROJECT FILES</h2>
          <div className="section-hud-divider">
            <span className="line" />
            <span className="dot" />
            <span className="line-rev" />
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 46 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className="font-mono-hud"
              style={{
                padding: '6px 16px',
                borderRadius: 4,
                fontSize: '0.76rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.25s',
                background: selectedFilter === cat ? 'var(--hud-cyan)' : 'rgba(6, 18, 36, 0.8)',
                color: selectedFilter === cat ? '#040810' : 'var(--text-secondary)',
                border: selectedFilter === cat ? '1px solid var(--hud-cyan)' : '1px solid rgba(0, 229, 255, 0.2)',
                boxShadow: selectedFilter === cat ? '0 0 15px rgba(0, 229, 255, 0.5)' : 'none',
                fontWeight: selectedFilter === cat ? 700 : 500,
              }}
            >
              [ {cat} ]
            </button>
          ))}
        </div>

        {/* Tactical HUD Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 26,
            textAlign: 'left',
          }}
        >
          {filteredProjects.map((p, idx) => (
            <div
              key={p.id}
              className="hud-panel hud-corners"
              style={{
                borderRadius: 8,
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              {/* Card Header Telemetry */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  className="font-mono-hud"
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--hud-cyan)',
                    letterSpacing: '0.15em',
                  }}
                >
                  FILE_ID // 0{idx + 1}
                </span>

                <span
                  className="font-mono-hud"
                  style={{
                    padding: '3px 10px',
                    borderRadius: 3,
                    fontSize: '0.68rem',
                    color: 'var(--hud-green)',
                    background: 'rgba(0, 255, 157, 0.08)',
                    border: '1px solid rgba(0, 255, 157, 0.3)',
                    letterSpacing: '0.08em',
                  }}
                >
                  ● DEPLOYED
                </span>
              </div>

              {/* Title & Category */}
              <div>
                <h3
                  className="font-hud"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '0.03em',
                    marginBottom: 4,
                  }}
                >
                  {p.title}
                </h3>
                <span
                  className="font-mono-hud"
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--hud-cyan)',
                    letterSpacing: '0.08em',
                  }}
                >
                  // {p.category}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {p.longDescription || p.description}
              </p>

              {/* Key Features Bullet List */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                {p.features?.slice(0, 3).map((f, i) => (
                  <li
                    key={i}
                    className="font-mono-hud"
                    style={{
                      fontSize: '0.76rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                    }}
                  >
                    <span style={{ color: 'var(--hud-cyan)' }}>▸</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 8 }}>
                {p.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono-hud"
                    style={{
                      padding: '3px 8px',
                      borderRadius: 3,
                      fontSize: '0.7rem',
                      color: 'var(--text-primary)',
                      background: 'rgba(0, 229, 255, 0.06)',
                      border: '1px solid rgba(0, 229, 255, 0.2)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Card Actions */}
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  paddingTop: 14,
                  borderTop: '1px solid rgba(0, 229, 255, 0.1)',
                }}
              >
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-hud-secondary"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '0.72rem',
                    justifyContent: 'center',
                  }}
                >
                  SOURCE ⌥
                </a>
                <a
                  href={p.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-hud-primary"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '0.72rem',
                    justifyContent: 'center',
                  }}
                >
                  LIVE DEMO ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
