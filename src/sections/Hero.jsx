import Typewriter from '../components/Typewriter';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
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
        background: 'var(--bg-primary)',
      }}
    >
      {/* Background grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

      {/* Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '60px 24px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'clamp(300px, 50%, 580px) 1fr',
        gap: 60,
        alignItems: 'center',
      }}>
        {/* Left — Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Status badge */}
          <div className="animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="status-badge">
              <span className="status-dot" />
              Available for opportunities
            </div>
          </div>

          {/* Heading */}
          <div className="animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.2s' }}>
            <div style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'var(--text-secondary)',
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 12,
              letterSpacing: '0.05em',
            }}>
              &gt; Hello, I'm
            </div>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}>
              {personalInfo.name}
            </h1>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: 0,
              minHeight: '2.2em',
            }}>
              <Typewriter />
            </h2>
          </div>

          {/* Description */}
          <p className="animate-fade-up" style={{
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: '0.35s',
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
            lineHeight: 1.75,
            maxWidth: 520,
          }}>
            {personalInfo.tagline}
          </p>

          {/* Stats row */}
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
              { num: '2+', label: 'Years Learning' },
              { num: '8.0', label: 'CGPA Score' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                  <span className="gradient-text-static">{s.num}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
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
              📄 Resume
            </button>
            <a href="#contact" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Contact Me
            </a>
          </div>

          {/* Social links */}
          <div className="animate-fade-up" style={{
            opacity: 0,
            animationFillMode: 'forwards',
            animationDelay: '0.65s',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Find me on:</span>
            {[
              { href: personalInfo.github, label: 'GitHub' },
              { href: personalInfo.linkedin, label: 'LinkedIn' },
              { href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button"
                style={{
                  padding: '6px 14px',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Photo */}
        <div className="animate-fade-up" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          animationFillMode: 'forwards',
          animationDelay: '0.3s',
        }}>
          <div style={{ position: 'relative' }}>
            {/* Outer glow */}
            <div className="hero-photo-glow" />

            {/* Gradient border wrapper */}
            <div className="hero-photo-wrapper">
              <img
                src="/images/rahul-hero.jpg"
                alt="Rahul More"
                style={{
                  width: 'clamp(260px, 28vw, 380px)',
                  height: 'clamp(320px, 35vw, 480px)',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  borderRadius: 24,
                  display: 'block',
                  position: 'relative',
                  zIndex: 1,
                }}
              />
            </div>

            {/* Floating card — company */}
            <div className="glass-card" style={{
              position: 'absolute',
              bottom: -20,
              left: -40,
              padding: '12px 18px',
              minWidth: 160,
              zIndex: 10,
              animation: 'float-card 4s ease-in-out infinite',
            }}>
              <style>{`@keyframes float-card{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>💼 Working at</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Raveblue</div>
              <div style={{ fontSize: '0.75rem', color: '#a5b4fc', marginTop: 2 }}>Software Developer</div>
            </div>

            {/* Floating card — stack */}
            <div className="glass-card" style={{
              position: 'absolute',
              top: 20,
              right: -50,
              padding: '12px 16px',
              zIndex: 10,
              animation: 'float-card 5s ease-in-out infinite 1s',
            }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 8 }}>🛠 Tech Stack</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: 130 }}>
                {['React', 'Java', 'Node'].map(t => (
                  <span key={t} style={{
                    padding: '2px 8px', borderRadius: 999, fontSize: '0.7rem',
                    background: 'rgba(99,102,241,0.15)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    color: '#a5b4fc',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
        animation: 'fade-in 1s 1.5s ease forwards',
        opacity: 0,
      }}>
        <span>Scroll down</span>
        <div style={{
          width: 24, height: 40, borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', justifyContent: 'center', paddingTop: 6,
        }}>
          <div style={{
            width: 4, height: 8, borderRadius: 2,
            background: 'var(--indigo)',
            animation: 'scroll-dot 2s ease-in-out infinite',
          }} />
          <style>{`@keyframes scroll-dot{0%{transform:translateY(0);opacity:1}100%{transform:translateY(10px);opacity:0}}`}</style>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media(max-width:768px){
          #home > div { grid-template-columns: 1fr !important; text-align: center; }
          #home > div > div:last-child { order: -1; }
          #home > div > div:last-child .glass-card { display: none !important; }
          .hero-photo-wrapper img { width: clamp(200px,70vw,320px) !important; height: clamp(250px,85vw,400px) !important; }
        }
      `}</style>
    </section>
  );
}
