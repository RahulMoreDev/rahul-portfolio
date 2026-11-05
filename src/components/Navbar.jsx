import { useState } from 'react';

export default function Navbar({ onOpenResume, onOpenEmail }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleOpenEmail = () => {
    if (onOpenEmail) {
      onOpenEmail();
    } else {
      window.dispatchEvent(new CustomEvent('jarvis-open-email'));
    }
  };

  return (
    <nav
      id="navbar"
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(4, 8, 16, 0.92)',
        borderBottom: '1px solid rgba(0, 229, 255, 0.18)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          padding: '0 clamp(14px, 3vw, 28px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        {/* ═══════ Professional Coder Brand Logo ═══════ */}
        <a
          href="#home"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            minWidth: 0,
          }}
        >
          {/* Circular Photo Avatar with Neon Code Ring */}
          <div style={{ position: 'relative', width: 38, height: 38, flexShrink: 0 }}>
            {/* Outer glowing cyan ring */}
            <div
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                border: '2px solid transparent',
                background:
                  'linear-gradient(#040810, #040810) padding-box, linear-gradient(135deg, #00e5ff 0%, #00ffaa 50%, #00e5ff 100%) border-box',
                boxShadow: '0 0 14px rgba(0, 229, 255, 0.6)',
              }}
            />
            {/* Photo */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #040810',
              }}
            >
              <img
                src="/images/rahul-about.jpg"
                alt="Rahul More"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.06) brightness(1.05)',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback monogram if image fails */}
              <div
                className="font-hud"
                style={{
                  display: 'none',
                  position: 'absolute',
                  inset: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#040810',
                  color: 'var(--hud-cyan)',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                }}
              >
                RM
              </div>
            </div>

            {/* Code Tag Badge  </> */}
            <span
              className="font-mono-hud"
              style={{
                position: 'absolute',
                bottom: -3,
                right: -4,
                background: '#040810',
                color: '#00e5ff',
                border: '1.5px solid #00e5ff',
                borderRadius: 4,
                fontSize: '0.48rem',
                fontWeight: 900,
                padding: '1px 3px',
                lineHeight: 1.2,
                boxShadow: '0 0 8px rgba(0, 229, 255, 0.7)',
                letterSpacing: '0.02em',
              }}
            >
              {'</>'}
            </span>
          </div>

          {/* Name + Coder Role */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.2,
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                className="font-hud"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}
              >
                RAHUL MORE
              </span>
              <span
                className="font-mono-hud"
                style={{
                  fontSize: '0.54rem',
                  fontWeight: 700,
                  color: '#00e5ff',
                  background: 'rgba(0, 229, 255, 0.12)',
                  border: '1px solid rgba(0, 229, 255, 0.35)',
                  padding: '1px 5px',
                  borderRadius: 3,
                  letterSpacing: '0.08em',
                }}
              >
                DEV
              </span>
            </div>
            <span
              className="font-mono-hud hidden xs:inline"
              style={{
                fontSize: '0.6rem',
                color: 'var(--hud-cyan)',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              {'<FULL_STACK_ENGINEER />'}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            gap: 22,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono-hud"
              style={{
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.25s ease',
                position: 'relative',
                padding: '6px 4px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--hud-cyan)';
                e.currentTarget.style.textShadow = '0 0 10px rgba(0, 229, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Buttons: Voice + Email + Resume + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Quick Email Dashboard button */}
          <button
            onClick={handleOpenEmail}
            className="btn-hud-secondary hidden lg:inline-flex"
            style={{
              padding: '6px 12px',
              fontSize: '0.72rem',
            }}
            title="Open J.A.R.V.I.S. Email Compose Dashboard"
          >
            <span>✉</span>
            <span>EMAIL</span>
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('jarvis-voice-trigger'))}
            className="btn-hud-secondary hidden sm:inline-flex"
            style={{
              padding: '6px 12px',
              fontSize: '0.72rem',
            }}
            title="Activate J.A.R.V.I.S. Voice Command System"
          >
            <span>🎙️</span>
            <span>VOICE</span>
          </button>

          <button
            onClick={onOpenResume}
            className="btn-hud-primary"
            style={{
              padding: '6px 14px',
              fontSize: '0.72rem',
            }}
          >
            <span style={{ fontSize: '0.8rem' }}>⬡</span>
            <span>RESUME</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.35)',
              borderRadius: 6,
              color: 'var(--hud-cyan)',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              lineHeight: 1,
            }}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            background: 'rgba(4, 8, 16, 0.98)',
            borderBottom: '1px solid var(--hud-border)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: '0 20px 30px rgba(0, 0, 0, 0.7)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono-hud"
              style={{
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                letterSpacing: '0.12em',
                padding: '8px 0',
                borderBottom: '1px solid rgba(0, 229, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ color: 'var(--hud-cyan)' }}>//</span>
              <span>{link.label}</span>
            </a>
          ))}

          <button
            onClick={() => {
              setMenuOpen(false);
              handleOpenEmail();
            }}
            className="btn-hud-primary"
            style={{
              justifyContent: 'center',
              marginTop: 6,
              padding: '10px',
              fontSize: '0.74rem',
            }}
          >
            <span>✉</span>
            <span>OPEN EMAIL COMPOSE DASHBOARD</span>
          </button>

          <button
            onClick={() => {
              setMenuOpen(false);
              window.dispatchEvent(new CustomEvent('jarvis-voice-trigger'));
            }}
            className="btn-hud-secondary"
            style={{
              justifyContent: 'center',
              padding: '10px',
              fontSize: '0.74rem',
            }}
          >
            <span>🎙️</span>
            <span>VOICE PROTOCOL ASSISTANT</span>
          </button>
        </div>
      )}
    </nav>
  );
}
