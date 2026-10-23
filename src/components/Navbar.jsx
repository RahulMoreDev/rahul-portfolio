import { useState } from 'react';

export default function Navbar({ onOpenResume }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      height: 64,
      display: 'flex', alignItems: 'center',
    }} className="glass-nav">
      <div style={{
        maxWidth: 1200, width: '100%', margin: '0 auto',
        padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo with Professional Photo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            position: 'relative',
            width: 42,
            height: 42,
            borderRadius: '50%',
            padding: '2px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4, #a855f7)',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.5)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src="/images/rahul-hero.jpg"
              alt="Rahul More"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                display: 'block',
              }}
            />
            {/* Live active dot */}
            <span style={{
              position: 'absolute',
              bottom: 1,
              right: 1,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #030712',
              boxShadow: '0 0 6px #22c55e',
            }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontWeight: 800,
              fontSize: '1.02rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}>
              Rahul<span className="gradient-text-static"> More</span>
            </span>
            <span style={{
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.04em',
            }}>
              Software Dev
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              style={{
                padding: '6px 14px', borderRadius: 8,
                textDecoration: 'none', color: 'var(--text-secondary)',
                fontSize: '0.875rem', fontWeight: 500,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.color = '#f8fafc';
                e.target.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={e => {
                e.target.style.color = 'var(--text-secondary)';
                e.target.style.background = 'transparent';
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={onOpenResume}
            className="btn-primary"
            style={{ padding: '7px 18px', fontSize: '0.85rem' }}
          >
            Resume
          </button>
          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              display: 'none', background: 'none', border: 'none',
              color: 'var(--text-primary)', cursor: 'pointer',
              fontSize: 22, lineHeight: 1, padding: 4,
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          background: 'rgba(3,7,18,0.97)', backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px', borderRadius: 10,
                textDecoration: 'none', color: 'var(--text-secondary)',
                fontSize: '1rem', fontWeight: 500,
                transition: 'all 0.2s',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onOpenResume(); }}
            className="btn-primary"
            style={{ marginTop: 12, width: '100%', textAlign: 'center' }}
          >
            📄 View Resume
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
