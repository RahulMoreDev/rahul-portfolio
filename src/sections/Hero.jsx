import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

const TERMINAL_COMMANDS = [
  'JARVIS > Rahul',
  'JARVIS > Loading module [Full_Stack_Core]',
  'JARVIS > Java & Spring Boot: STATUS_OPTIMAL',
  'JARVIS > React.js & Node.js: PROTOCOLS_ARMED',
  'JARVIS > REST API Pipelines: DEPLOYED',
];

export default function Hero({ onOpenResume }) {
  const [termText, setTermText] = useState('');
  const [cmdIndex, setCmdIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Terminal typewriter effect
  useEffect(() => {
    const currentCmd = TERMINAL_COMMANDS[cmdIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentCmd.length) {
      timeout = setTimeout(() => {
        setTermText(currentCmd.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 70);
    } else if (!isDeleting && charIndex > currentCmd.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setTermText(currentCmd.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, 35);
    } else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setCharIndex(0);
      setCmdIndex((i) => (i + 1) % TERMINAL_COMMANDS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, cmdIndex]);

  return (
    <section
      id="home"
      className="hero hud-grid-bg"
      aria-label="Hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 100,
        paddingBottom: 60,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 28px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(320px, 0.85fr)',
          gap: 60,
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
        className="hero-grid"
      >
        {/* ================= LEFT: HUD Telemetry & Hero Heading ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* System Online Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 20, height: 2, background: 'var(--hud-cyan)', boxShadow: '0 0 8px var(--hud-cyan)' }} />
            <span
              className="font-mono-hud"
              style={{
                fontSize: '0.75rem',
                color: 'var(--hud-cyan)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              SYSTEM ONLINE — INITIATING
            </span>
          </div>

          {/* Large Sci-Fi Name */}
          <div>
            <h1
              className="font-hud"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                color: '#ffffff',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textShadow: '0 0 35px rgba(0, 229, 255, 0.45)',
                margin: 0,
              }}
            >
              RAHUL<br />
              MORE
            </h1>
          </div>

          {/* Subtitle / Role Tag */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
              color: 'var(--text-secondary)',
              margin: 0,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            Full Stack Software Developer &nbsp;—&nbsp;{' '}
            <span style={{ color: 'var(--hud-cyan)', fontWeight: 600 }}>Java • React • Spring Boot • Node.js</span>
          </p>

          {/* Interactive JARVIS Command Terminal Box */}
          <div
            className="hud-panel hud-corners"
            style={{
              padding: '14px 20px',
              borderRadius: 6,
              maxWidth: 540,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(6, 18, 36, 0.85)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.12), inset 0 0 15px rgba(0, 229, 255, 0.05)',
            }}
          >
            <span style={{ color: 'var(--hud-cyan)', fontSize: '0.9rem' }}>⬡</span>
            <span
              className="font-mono-hud"
              style={{
                fontSize: '0.88rem',
                color: 'var(--hud-cyan)',
                letterSpacing: '0.05em',
                flex: 1,
              }}
            >
              {termText}
              <span style={{ animation: 'pulseGreen 0.8s infinite', color: '#ffffff' }}>_</span>
            </span>
          </div>

          {/* Cyber CTA Buttons & Voice Command Trigger */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 6 }}>
            <a href="#projects" className="btn-hud-primary">
              <span>⬡</span>
              <span>ACCESS PROJECTS</span>
            </a>

            <a href="#contact" className="btn-hud-secondary">
              <span>⬡</span>
              <span>CONTACT SYSTEM</span>
            </a>

            <button onClick={onOpenResume} className="btn-hud-secondary">
              <span>📄</span>
              <span>VIEW RESUME</span>
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('jarvis-voice-trigger'));
              }}
              className="btn-hud-secondary"
              style={{
                borderColor: 'var(--hud-cyan)',
                background: 'rgba(0, 229, 255, 0.08)',
                boxShadow: '0 0 18px rgba(0, 229, 255, 0.25)',
              }}
              title="Activate J.A.R.V.I.S. Voice Command System"
            >
              <span>🎙️</span>
              <span>VOICE PROTOCOL</span>
            </button>
          </div>

          {/* System Telemetry & Status Badges */}
          <div
            className="font-mono-hud"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 20,
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: 10,
              paddingTop: 16,
              borderTop: '1px solid rgba(0, 229, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="status-pip status-pip-cyan" />
              <span>SYSTEM ACTIVE</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span className="status-pip status-pip-green" />
              <span style={{ color: 'var(--hud-green)' }}>AVAILABLE FOR HIRE</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-muted)' }}>
              <span>SCROLL ▾</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: Interactive Rotating Arc Reactor HUD ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Main Reactor Assembly Frame */}
          <div
            style={{
              position: 'relative',
              width: 'min(420px, 85vw)',
              height: 'min(420px, 85vw)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Ambient Cyan Aura */}
            <div
              className="pulse-reactor"
              style={{
                position: 'absolute',
                width: '70%',
                height: '70%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 229, 255, 0.35) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }}
            />

            {/* Outermost Thin HUD Ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px solid rgba(0, 229, 255, 0.2)',
              }}
            />

            {/* Rotating Outer Segment Ring */}
            <div
              className="spin-slow"
              style={{
                position: 'absolute',
                inset: 15,
                borderRadius: '50%',
                border: '2px dashed rgba(0, 229, 255, 0.45)',
              }}
            />

            {/* Rotating Mid Ring Counter-Clockwise */}
            <div
              className="spin-slow-reverse"
              style={{
                position: 'absolute',
                inset: 45,
                borderRadius: '50%',
                border: '1px dotted rgba(0, 229, 255, 0.65)',
              }}
            />

            {/* Inner Glowing Reactor Ring */}
            <div
              style={{
                position: 'absolute',
                inset: 75,
                borderRadius: '50%',
                border: '3px solid var(--hud-cyan)',
                boxShadow: '0 0 35px rgba(0, 229, 255, 0.7), inset 0 0 25px rgba(0, 229, 255, 0.5)',
              }}
            />

            {/* Center Core: [ RM ] with Rahul's portrait or monogram */}
            <div
              className="hud-panel"
              style={{
                position: 'relative',
                width: 140,
                height: 140,
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(4, 8, 16, 0.95)',
                border: '2px solid var(--hud-cyan)',
                boxShadow: '0 0 30px rgba(0, 229, 255, 0.8), inset 0 0 20px rgba(0, 229, 255, 0.3)',
                zIndex: 10,
                overflow: 'hidden',
              }}
            >
              {/* Professional photo with cyber HUD overlay */}
              <img
                src="/images/rahul-hero.jpg"
                alt="Rahul More"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.55,
                  filter: 'contrast(1.15) brightness(1.1) saturate(0.7)',
                }}
              />
              {/* Gradient overlay for depth */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle, transparent 40%, rgba(4,8,16,0.7) 100%)',
                  zIndex: 1,
                }}
              />
              {/* Code Monogram overlay */}
              <span
                className="font-mono-hud"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  color: '#00e5ff',
                  letterSpacing: '0.12em',
                  textShadow: '0 0 12px rgba(0, 229, 255, 0.9)',
                  background: 'rgba(4, 8, 16, 0.65)',
                  padding: '3px 10px',
                  borderRadius: 3,
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                }}
              >
                {'<RM />'}
              </span>
              <span
                className="font-mono-hud"
                style={{
                  position: 'relative',
                  zIndex: 2,
                  fontSize: '0.58rem',
                  color: 'var(--hud-green)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: 2,
                  textShadow: '0 0 6px rgba(0, 255, 170, 0.6)',
                }}
              >
                CORE ACTIVE
              </span>
            </div>

            {/* Orbiting Satellite Badges (Identical to your screenshot) */}
            {/* Top Right: Java */}
            <div
              className="hud-panel"
              style={{
                position: 'absolute',
                top: '6%',
                right: '-6%',
                padding: '6px 14px',
                borderRadius: 4,
                border: '1px solid rgba(0, 229, 255, 0.4)',
                background: 'rgba(6, 18, 36, 0.9)',
              }}
            >
              <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--hud-cyan)', letterSpacing: '0.1em' }}>
                JAVA 21
              </span>
            </div>

            {/* Middle Right: React 19 */}
            <div
              className="hud-panel"
              style={{
                position: 'absolute',
                bottom: '22%',
                right: '-8%',
                padding: '6px 14px',
                borderRadius: 4,
                border: '1px solid rgba(0, 229, 255, 0.4)',
                background: 'rgba(6, 18, 36, 0.9)',
              }}
            >
              <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--hud-cyan)', letterSpacing: '0.1em' }}>
                REACT 19
              </span>
            </div>

            {/* Middle Left: Node.js */}
            <div
              className="hud-panel"
              style={{
                position: 'absolute',
                top: '46%',
                left: '-12%',
                padding: '6px 14px',
                borderRadius: 4,
                border: '1px solid rgba(0, 229, 255, 0.4)',
                background: 'rgba(6, 18, 36, 0.9)',
              }}
            >
              <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--hud-cyan)', letterSpacing: '0.1em' }}>
                NODE.JS
              </span>
            </div>

            {/* Bottom: DSA / Spring Boot */}
            <div
              className="hud-panel"
              style={{
                position: 'absolute',
                bottom: '-2%',
                left: '26%',
                padding: '6px 14px',
                borderRadius: 4,
                border: '1px solid rgba(0, 229, 255, 0.4)',
                background: 'rgba(6, 18, 36, 0.9)',
              }}
            >
              <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--hud-cyan)', letterSpacing: '0.1em' }}>
                SPRING BOOT
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            align-items: center;
          }
          .hero-grid > div:last-child {
            order: -1;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}
