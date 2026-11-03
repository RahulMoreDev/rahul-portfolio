import { useState } from 'react';

export default function Navbar({ onOpenResume }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

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
        height: 68,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(4, 8, 16, 0.88)',
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
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* J.A.R.V.I.S. Monogram Brand [ RM ] */}
        <a
          href="#home"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            className="font-hud"
            style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              color: 'var(--hud-cyan)',
              letterSpacing: '0.15em',
              textShadow: '0 0 16px rgba(0, 229, 255, 0.7)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span style={{ color: 'rgba(0, 229, 255, 0.6)' }}>[</span>
            <span>RM</span>
            <span style={{ color: 'rgba(0, 229, 255, 0.6)' }}>]</span>
          </div>

          <div
            className="hidden sm:flex"
            style={{
              flexDirection: 'column',
              lineHeight: 1.15,
              borderLeft: '1px solid rgba(0, 229, 255, 0.25)',
              paddingLeft: 10,
            }}
          >
            <span
              className="font-hud"
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.08em',
              }}
            >
              RAHUL MORE
            </span>
            <span
              className="font-mono-hud"
              style={{
                fontSize: '0.66rem',
                color: 'var(--hud-cyan)',
                letterSpacing: '0.1em',
              }}
            >
              JARVIS // OS.v4
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            gap: 24,
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

        {/* Action Button: Access Resume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onOpenResume}
            className="btn-hud-primary"
            style={{
              padding: '8px 18px',
              fontSize: '0.75rem',
            }}
          >
            <span style={{ fontSize: '0.85rem' }}>⬡</span>
            <span>RESUME</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'transparent',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              borderRadius: 6,
              color: 'var(--hud-cyan)',
              padding: '6px 10px',
              cursor: 'pointer',
              fontSize: '1rem',
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
            top: 68,
            left: 0,
            right: 0,
            background: 'rgba(4, 8, 16, 0.98)',
            borderBottom: '1px solid var(--hud-border)',
            padding: '20px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
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
                fontSize: '0.9rem',
                letterSpacing: '0.12em',
                padding: '8px 0',
                borderBottom: '1px solid rgba(0, 229, 255, 0.08)',
              }}
            >
              // {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
