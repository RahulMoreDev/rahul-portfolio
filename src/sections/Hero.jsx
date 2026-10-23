import { useState } from 'react';
import Typewriter from '../components/Typewriter';
import { personalInfo } from '../data/portfolioData';

// Rich details for tech stack popups
const TECH_DETAILS = {
  react: {
    name: 'React.js & Tailwind CSS',
    icon: '⚛️',
    category: 'Frontend Architecture',
    level: 'Advanced · 90%',
    color: '#06b6d4',
    bg: 'rgba(6, 182, 212, 0.15)',
    description: 'Expertise in building component-driven single-page applications, custom hooks, responsive Tailwind layouts, and state management.',
    project: 'CRM Application & Interactive Portfolios',
  },
  java: {
    name: 'Java & Spring Boot',
    icon: '☕',
    category: 'Backend & Enterprise',
    level: 'Advanced · 90%',
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.15)',
    description: 'Developing secure REST APIs, clean layered controller-service-repository patterns, and Spring Data JPA persistence.',
    project: 'Journal Management System & Bank Management',
  },
  node: {
    name: 'Node.js & REST APIs',
    icon: '🚀',
    category: 'API Engineering',
    level: 'Intermediate · 85%',
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.15)',
    description: 'Fast event-driven server backends, HTTP CRUD routing, JSON web tokens, and seamless database integration.',
    project: 'CRM REST API Backend & Microservices',
  },
  database: {
    name: 'MySQL & MongoDB',
    icon: '🗄️',
    category: 'Relational & NoSQL Data',
    level: 'Advanced · 85%',
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.15)',
    description: 'Schema modeling, relational table normalization, indexing, SQL queries, and MongoDB collection management.',
    project: 'Student Management & CRM Database',
  },
  raveblue: {
    name: 'Raveblue Experience',
    icon: '💼',
    category: 'Industry Work',
    level: 'Current / Recent',
    color: '#6366f1',
    bg: 'rgba(99, 102, 241, 0.15)',
    description: 'Engineering responsive user interfaces in React and robust RESTful APIs with Spring Boot and Node.js.',
    project: 'Production software systems & agile sprints',
  },
};

export default function Hero({ onOpenResume }) {
  const [activePopup, setActivePopup] = useState(null);

  const togglePopup = (key) => {
    setActivePopup(curr => (curr === key ? null : key));
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
        paddingBottom: 40,
        background: 'var(--bg-primary)',
      }}
    >
      {/* Background grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Ambient background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '40px 24px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1.05fr) minmax(320px, 0.95fr)',
        gap: '40px',
        alignItems: 'center',
      }}
        className="hero-grid"
      >
        {/* ================= LEFT COLUMN: Text & CTAs ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Status badge */}
          <div className="animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="status-badge">
              <span className="status-dot" />
              Available for Full-Time & Freelance Roles
            </div>
          </div>

          {/* Heading */}
          <div className="animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.2s' }}>
            <div style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'var(--text-secondary)',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 10,
              letterSpacing: '0.05em',
            }}>
              &gt; Hello, I'm
            </div>
            <h1 style={{
              fontSize: 'clamp(2.7rem, 5.5vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              letterSpacing: '-0.025em',
              marginBottom: 12,
            }}>
              {personalInfo.name}
            </h1>
            <h2 style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: 0,
              minHeight: '2.2em',
            }}>
              <Typewriter />
            </h2>
          </div>

          {/* Tagline */}
          <p className="animate-fade-up" style={{
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: '0.35s',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 1.25vw, 1.05rem)',
            lineHeight: 1.75,
            maxWidth: 530,
          }}>
            {personalInfo.tagline}
          </p>

          {/* Quick Metrics */}
          <div className="animate-fade-up" style={{
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: '0.45s',
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
          }}>
            {[
              { num: '4+', label: 'Projects Built' },
              { num: '2+', label: 'Years Experience' },
              { num: '8.0', label: 'B.E. CGPA' },
              { num: '100%', label: 'Job Ready' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  <span className="gradient-text-static">{s.num}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-up" style={{
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: '0.55s',
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <a href="#projects" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              View My Work →
            </a>
            <button onClick={onOpenResume} className="btn-outline">
              📄 View Resume
            </button>
            <a href="#contact" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Contact Me
            </a>
          </div>

          {/* Interactive Tech Stack Dock */}
          <div className="animate-fade-up" style={{
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: '0.65s',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 6,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                ⚡ Click tech to explore:
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { key: 'react', label: 'React.js', icon: '⚛️' },
                { key: 'java', label: 'Spring Boot & Java', icon: '☕' },
                { key: 'node', label: 'Node.js & APIs', icon: '🚀' },
                { key: 'database', label: 'MySQL & Mongo', icon: '🗄️' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => togglePopup(item.key)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 999,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    background: activePopup === item.key ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    border: activePopup === item.key ? '1px solid rgba(99, 102, 241, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: activePopup === item.key ? '#ffffff' : '#cbd5e1',
                    boxShadow: activePopup === item.key ? '0 0 16px rgba(99, 102, 241, 0.3)' : 'none',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Expanded Tech Popup Details Box */}
            {activePopup && TECH_DETAILS[activePopup] && (
              <div
                className="glass-card animate-fade-in"
                style={{
                  padding: '16px 20px',
                  borderRadius: 14,
                  border: `1px solid ${TECH_DETAILS[activePopup].color}50`,
                  background: 'rgba(13, 17, 23, 0.95)',
                  marginTop: 6,
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.4rem' }}>{TECH_DETAILS[activePopup].icon}</span>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc', margin: 0 }}>
                        {TECH_DETAILS[activePopup].name}
                      </h4>
                      <span style={{ fontSize: '0.72rem', color: TECH_DETAILS[activePopup].color, fontWeight: 600 }}>
                        {TECH_DETAILS[activePopup].category} · {TECH_DETAILS[activePopup].level}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePopup(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: 16,
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, margin: '6px 0 8px' }}>
                  {TECH_DETAILS[activePopup].description}
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  🎯 Featured in: <span style={{ color: '#a5b4fc', fontWeight: 500 }}>{TECH_DETAILS[activePopup].project}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Professional Photo & Floating Tech Popups ================= */}
        <div
          className="animate-fade-up hero-photo-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: '0.3s',
            position: 'relative',
            padding: '40px 30px',
          }}
        >
          <div style={{ position: 'relative', width: 'fit-content' }}>
            {/* Ambient Background Aura */}
            <div className="hero-photo-glow" />

            {/* Floating Tech Popup 1: Top Right (React & Tailwind) */}
            <div
              className="tech-popup-card tech-popup-card-1"
              style={{ top: -16, right: -30 }}
              onClick={() => togglePopup('react')}
              title="Click for details"
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}>
                ⚛️
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>React & Tailwind</div>
                <div style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 500 }}>Frontend UI · 90%</div>
              </div>
            </div>

            {/* Floating Tech Popup 2: Top Left (Spring Boot & Java) */}
            <div
              className="tech-popup-card tech-popup-card-2"
              style={{ top: 30, left: -45 }}
              onClick={() => togglePopup('java')}
              title="Click for details"
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}>
                ☕
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>Java & Spring Boot</div>
                <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 500 }}>REST API Services</div>
              </div>
            </div>

            {/* Floating Tech Popup 3: Bottom Right (MySQL & MongoDB) */}
            <div
              className="tech-popup-card tech-popup-card-3"
              style={{ bottom: 35, right: -40 }}
              onClick={() => togglePopup('database')}
              title="Click for details"
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}>
                🗄️
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>MySQL & MongoDB</div>
                <div style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 500 }}>Schema & ORM JPA</div>
              </div>
            </div>

            {/* Floating Tech Popup 4: Bottom Left (Raveblue Engineer) */}
            <div
              className="tech-popup-card tech-popup-card-4"
              style={{ bottom: -20, left: -30 }}
              onClick={() => togglePopup('raveblue')}
              title="Click for details"
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}>
                💼
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f8fafc' }}>Software Developer</div>
                <div style={{ fontSize: '0.7rem', color: '#86efac', fontWeight: 500 }}>@ Raveblue IT</div>
              </div>
            </div>

            {/* Professional Framed Portrait Container */}
            <div style={{
              position: 'relative',
              borderRadius: 32,
              padding: 4,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(6, 182, 212, 0.8), rgba(168, 85, 247, 0.8))',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.3)',
            }}>
              <div style={{
                position: 'relative',
                borderRadius: 28,
                overflow: 'hidden',
                background: '#0a0e17',
              }}>
                <img
                  src="/images/rahul-hero.jpg"
                  alt="Rahul More - Software Developer"
                  style={{
                    width: 'clamp(270px, 28vw, 370px)',
                    height: 'clamp(340px, 36vw, 470px)',
                    objectFit: 'cover',
                    objectPosition: 'center 12%',
                    display: 'block',
                    filter: 'contrast(1.05) brightness(1.02)',
                  }}
                />

                {/* Subtle top badge inside photo */}
                <div style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  padding: '5px 12px',
                  borderRadius: 999,
                  background: 'rgba(3, 7, 18, 0.75)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                  Full Stack Engineer
                </div>

                {/* Bottom glass pedestal gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 90,
                  background: 'linear-gradient(to top, rgba(3, 7, 18, 0.95), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: 14,
                }}>
                  <div style={{
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.04em',
                  }}>
                    &lt;Rahul More /&gt;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            align-items: center;
          }
          .hero-photo-container {
            order: -1;
            padding: 30px 10px !important;
          }
          .tech-popup-card {
            padding: 6px 10px !important;
            font-size: 0.75rem !important;
          }
          .tech-popup-card-1 { right: -10px !important; top: -10px !important; }
          .tech-popup-card-2 { left: -15px !important; top: 15px !important; }
          .tech-popup-card-3 { right: -15px !important; bottom: 20px !important; }
          .tech-popup-card-4 { left: -10px !important; bottom: -15px !important; }
        }
        @media (max-width: 520px) {
          .tech-popup-card {
            position: static !important;
            animation: none !important;
            display: inline-flex !important;
            margin: 4px !important;
          }
          .hero-photo-container > div {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
