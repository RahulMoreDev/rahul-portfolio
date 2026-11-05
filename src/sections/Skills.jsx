import React, { useState } from 'react';

// Exact match to your screenshot: circular neon arc gauge cards
const SKILL_ITEMS = [
  {
    name: 'Java',
    percent: 90,
    icon: '☕',
    description: 'Core OOP, multi-threading, collections & backend system development',
    category: 'Backend',
  },
  {
    name: 'Spring Boot',
    percent: 88,
    icon: '🍃',
    description: 'RESTful web services, Spring Data JPA, MVC layered architecture',
    category: 'Backend',
  },
  {
    name: 'React.js',
    percent: 90,
    icon: '⚛️',
    description: 'Component architecture, custom hooks, state management & responsive UI',
    category: 'Frontend',
  },
  {
    name: 'Node.js',
    percent: 85,
    icon: '🟢',
    description: 'Express, REST APIs, real-time backend logic & event-driven pipelines',
    category: 'Backend',
  },
  {
    name: 'JavaScript',
    percent: 88,
    icon: '🟨',
    description: 'ES6+, async/await, DOM manipulation & client-side workflows',
    category: 'Frontend',
  },
  {
    name: 'MySQL',
    percent: 88,
    icon: '🐬',
    description: 'Schema normalization, complex queries, indexing & ACID safety',
    category: 'Database',
  },
  {
    name: 'MongoDB',
    percent: 80,
    icon: '🍃',
    description: 'NoSQL collections, schema design, aggregation pipelines & Mongoose',
    category: 'Database',
  },
  {
    name: 'DSA',
    percent: 85,
    icon: '🔷',
    description: 'Algorithms, data structures, problem solving & time-space optimization',
    category: 'Core CS',
  },
  {
    name: 'Git & GitHub',
    percent: 90,
    icon: '🔧',
    description: 'Version control, branching strategies, code reviews & CI/CD workflows',
    category: 'Tools',
  },
  {
    name: 'REST APIs',
    percent: 92,
    icon: '🌐',
    description: 'CRUD endpoints, Postman testing, HTTP protocol design & security',
    category: 'Architecture',
  },
];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = ['ALL', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills =
    activeFilter === 'ALL'
      ? SKILL_ITEMS
      : SKILL_ITEMS.filter((s) => s.category.toUpperCase().includes(activeFilter.toUpperCase()));

  return (
    <section
      id="skills"
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(16px, 4vw, 24px)',
        position: 'relative',
        background: 'var(--hud-bg)',
        borderTop: '1px solid rgba(0, 229, 255, 0.12)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        {/* Section Header: // 02 — CAPABILITIES */}
        <div>
          <div className="section-hud-tag">
            <span>//</span> 02 — CAPABILITIES
          </div>
          <h2 className="section-hud-title">SKILL MATRIX</h2>
          <div className="section-hud-divider">
            <span className="line" />
            <span className="dot" />
            <span className="line-rev" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="skills-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="font-mono-hud"
              style={{
                padding: '6px 16px',
                borderRadius: 4,
                fontSize: '0.76rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.25s',
                background: activeFilter === cat ? 'var(--hud-cyan)' : 'rgba(6, 18, 36, 0.8)',
                color: activeFilter === cat ? '#040810' : 'var(--text-secondary)',
                border: activeFilter === cat ? '1px solid var(--hud-cyan)' : '1px solid rgba(0, 229, 255, 0.2)',
                boxShadow: activeFilter === cat ? '0 0 15px rgba(0, 229, 255, 0.5)' : 'none',
                fontWeight: activeFilter === cat ? 700 : 500,
              }}
            >
              [ {cat} ]
            </button>
          ))}
        </div>

        {/* Grid of Circular Neon Arc Cards */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => {
            // SVG Arc Calculation (radius 44, circumference ≈ 276.46)
            const radius = 44;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (skill.percent / 100) * circumference;

            return (
              <div
                key={skill.name}
                className="hud-panel hud-corners"
                style={{
                  padding: 'clamp(18px, 3vw, 28px) clamp(14px, 2vw, 20px)',
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 14,
                }}
              >
                {/* Neon Circular Arc Gauge */}
                <div style={{ position: 'relative', width: 100, height: 100 }}>
                  <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Background Track Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="rgba(0, 229, 255, 0.12)"
                      strokeWidth="5"
                      fill="transparent"
                    />
                    {/* Neon Glowing Arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke="var(--hud-cyan)"
                      strokeWidth="5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="neon-arc-circle"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))',
                      }}
                    />
                  </svg>

                  {/* Centered Icon inside Arc */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}
                  >
                    {skill.icon}
                  </div>
                </div>

                {/* Skill Name */}
                <div>
                  <h3
                    className="font-hud"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '0.04em',
                      marginBottom: 4,
                    }}
                  >
                    {skill.name}
                  </h3>
                  {/* Percentage readout */}
                  <div
                    className="font-mono-hud"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--hud-cyan)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {skill.percent}%
                  </div>
                </div>

                {/* Brief description */}
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.76rem',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .skills-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 46px;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 22px;
        }

        @media (max-width: 768px) {
          .skills-filters {
            gap: 6px;
            margin-bottom: 32px;
          }
          .skills-filters button {
            padding: 5px 12px !important;
            font-size: 0.7rem !important;
          }
          .skills-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .skills-filters button {
            padding: 4px 10px !important;
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </section>
  );
}
