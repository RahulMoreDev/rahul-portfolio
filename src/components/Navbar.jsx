import { useState, useEffect } from 'react';
import { Menu, X, FileText, Mail, Mic } from 'lucide-react';

export default function Navbar({ onOpenResume, onOpenEmail }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { href: '#home', id: 'home', label: 'Home', num: '00' },
    { href: '#about', id: 'about', label: 'About', num: '01' },
    { href: '#skills', id: 'skills', label: 'Skills', num: '02' },
    { href: '#projects', id: 'projects', label: 'Projects', num: '03' },
    { href: '#experience', id: 'experience', label: 'Experience', num: '04' },
    { href: '#contact', id: 'contact', label: 'Contact', num: '05' },
  ];

  // Active section tracking & scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 130;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOpenEmail = () => {
    setMenuOpen(false);
    if (onOpenEmail) {
      onOpenEmail();
    } else {
      window.dispatchEvent(new CustomEvent('jarvis-open-email'));
    }
  };

  const handleOpenResume = () => {
    setMenuOpen(false);
    if (onOpenResume) onOpenResume();
  };

  const handleVoiceTrigger = () => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('jarvis-voice-trigger'));
  };

  return (
    <header
      id="navbar"
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 10000,
        background: scrolled ? 'rgba(4, 8, 16, 0.98)' : 'rgba(4, 8, 16, 0.94)',
        borderBottom: '1px solid rgba(0, 229, 255, 0.22)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: scrolled
          ? '0 10px 30px rgba(0, 0, 0, 0.85), 0 0 20px rgba(0, 229, 255, 0.12)'
          : '0 4px 15px rgba(0, 0, 0, 0.6)',
        transition: 'background 0.2s ease, box-shadow 0.2s ease',
        boxSizing: 'border-box',
      }}
    >
      {/* ================= ROW 1: Brand & Primary Controls ================= */}
      <div
        className="navbar-primary-row"
        style={{
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          boxSizing: 'border-box',
        }}
      >
        {/* ================= LEFT: Brand Monogram & Name (Protected from squishing) ================= */}
        <a
          href="#home"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            flexShrink: 0, // NEVER allow shrinking or overlapping
            minWidth: 0,
          }}
        >
          {/* Avatar with Cyber Neon Ring */}
          <div style={{ position: 'relative', width: 34, height: 34, flexShrink: 0 }}>
            <div
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                border: '1.5px solid var(--hud-cyan)',
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.7)',
              }}
            />
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid #040810',
              }}
            >
              <img
                src="/images/rahul-about.jpg"
                alt="Rahul More"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.08) brightness(1.05)',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
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
                  fontSize: '0.75rem',
                  fontWeight: 900,
                }}
              >
                RM
              </div>
            </div>
            <span
              className="font-mono-hud"
              style={{
                position: 'absolute',
                bottom: -2,
                right: -3,
                background: '#040810',
                color: '#00e5ff',
                border: '1px solid #00e5ff',
                borderRadius: 2,
                fontSize: '0.42rem',
                fontWeight: 900,
                padding: '0 2px',
                lineHeight: 1.1,
                boxShadow: '0 0 6px rgba(0, 229, 255, 0.8)',
              }}
            >
              {'</>'}
            </span>
          </div>

          {/* Name & Role */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span
                className="font-hud"
                style={{
                  fontSize: '0.92rem',
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
                  fontSize: '0.5rem',
                  fontWeight: 800,
                  color: '#00e5ff',
                  background: 'rgba(0, 229, 255, 0.12)',
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                  padding: '1px 4px',
                  borderRadius: 3,
                  letterSpacing: '0.08em',
                  lineHeight: 1,
                }}
              >
                DEV
              </span>
            </div>
            <span
              className="font-mono-hud nav-desktop-only"
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

        {/* ================= CENTER: Desktop Navigation Links (>= 768px) ================= */}
        <nav
          className="nav-desktop-only"
          style={{
            alignItems: 'center',
            gap: 16,
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className="font-mono-hud"
                style={{
                  textDecoration: 'none',
                  color: isActive ? 'var(--hud-cyan)' : 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transition: 'all 0.18s ease',
                  padding: '5px 8px',
                  borderRadius: 4,
                  background: isActive ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(0, 229, 255, 0.4)' : 'transparent'}`,
                  textShadow: isActive ? '0 0 10px rgba(0, 229, 255, 0.6)' : 'none',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ================= RIGHT: Action Controls ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          {/* Email Dashboard Button (Desktop Only) */}
          <button
            onClick={handleOpenEmail}
            className="btn-hud-secondary nav-desktop-only"
            style={{
              padding: '6px 12px',
              fontSize: '0.72rem',
              gap: 6,
            }}
            title="Open J.A.R.V.I.S. Email Compose Dashboard"
          >
            <Mail size={13} />
            <span>EMAIL</span>
          </button>

          {/* Voice Assistant Trigger (Desktop Only) */}
          <button
            onClick={handleVoiceTrigger}
            className="btn-hud-secondary nav-desktop-only"
            style={{
              padding: '6px 12px',
              fontSize: '0.72rem',
              gap: 6,
            }}
            title="Activate J.A.R.V.I.S. Voice Command System"
          >
            <Mic size={13} />
            <span>VOICE</span>
          </button>

          {/* Resume Button (Always Visible, Compact & Never Overlapping) */}
          <button
            onClick={handleOpenResume}
            className="btn-hud-primary nav-resume-btn"
            style={{
              padding: '5px 11px',
              fontSize: '0.7rem',
              gap: 5,
              fontWeight: 700,
              flexShrink: 0,
            }}
            title="View Full ATS Technical Resume"
          >
            <span style={{ fontSize: '0.75rem' }}>⬡</span>
            <span>RESUME</span>
          </button>

          {/* Mobile Cyber Hamburger Button (< 768px) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-only"
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 36,
              height: 32,
              background: menuOpen ? 'var(--hud-cyan)' : 'rgba(0, 229, 255, 0.12)',
              border: '1.5px solid var(--hud-cyan)',
              borderRadius: 5,
              color: menuOpen ? '#040810' : 'var(--hud-cyan)',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(0, 229, 255, 0.35)',
              transition: 'all 0.2s ease',
              padding: 0,
              flexShrink: 0,
            }}
          >
            {menuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* ================= ROW 2: Mobile Quick-Nav HUD Strip (< 768px) ================= */}
      {/* Allows users to CLEARLY SEE and TAP Project, Experience, Contact, Skills on mobile at all times */}
      <div
        className="nav-mobile-only mobile-quick-nav-strip"
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          borderTop: '1px solid rgba(0, 229, 255, 0.15)',
          background: 'rgba(2, 5, 12, 0.95)',
          padding: '4px 10px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            width: 'max-content',
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className="font-mono-hud mobile-nav-pill"
                style={{
                  textDecoration: 'none',
                  fontSize: '0.64rem',
                  fontWeight: isActive ? 800 : 600,
                  letterSpacing: '0.06em',
                  color: isActive ? 'var(--hud-cyan)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(0, 229, 255, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${isActive ? 'var(--hud-cyan)' : 'rgba(255, 255, 255, 0.12)'}`,
                  boxShadow: isActive ? '0 0 10px rgba(0, 229, 255, 0.45)' : 'none',
                  padding: '3px 8px',
                  borderRadius: 4,
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'all 0.15s ease',
                }}
              >
                <span
                  style={{
                    color: isActive ? 'var(--hud-cyan)' : 'var(--text-muted)',
                    fontSize: '0.56rem',
                  }}
                >
                  {link.num}
                </span>
                <span>{link.label.toUpperCase()}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE HUD DRAWER (Fixed Overlay with Smooth Scroll) ================= */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            position: 'fixed',
            top: '100%',
            left: 0,
            right: 0,
            width: '100%',
            maxHeight: 'calc(100dvh - 86px)',
            overflowY: 'auto',
            background: 'rgba(4, 8, 16, 0.98)',
            borderBottom: '2px solid var(--hud-cyan)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 229, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '16px 18px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            zIndex: 10001,
            boxSizing: 'border-box',
          }}
        >
          {/* Telemetry Header */}
          <div
            className="font-mono-hud"
            style={{
              fontSize: '0.65rem',
              color: 'var(--hud-cyan)',
              letterSpacing: '0.15em',
              paddingBottom: 6,
              borderBottom: '1px solid rgba(0, 229, 255, 0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>// NAVIGATION_MATRIX</span>
            <span style={{ color: 'var(--hud-green)' }}>● ONLINE</span>
          </div>

          {/* Links List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono-hud"
                  style={{
                    textDecoration: 'none',
                    color: isActive ? 'var(--hud-cyan)' : '#ffffff',
                    fontSize: '0.88rem',
                    letterSpacing: '0.08em',
                    padding: '8px 12px',
                    borderRadius: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: isActive ? 'rgba(0, 229, 255, 0.12)' : 'rgba(0, 229, 255, 0.03)',
                    border: `1px solid ${isActive ? 'var(--hud-cyan)' : 'rgba(0, 229, 255, 0.1)'}`,
                    boxShadow: isActive ? '0 0 10px rgba(0, 229, 255, 0.3)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--hud-cyan)', fontSize: '0.72rem' }}>// {link.num}</span>
                    <span style={{ fontWeight: 600 }}>{link.label.toUpperCase()}</span>
                  </div>
                  <span style={{ color: 'var(--hud-cyan)' }}>▸</span>
                </a>
              );
            })}
          </div>

          {/* Mobile Action Center */}
          <div
            style={{
              marginTop: 6,
              paddingTop: 10,
              borderTop: '1px solid rgba(0, 229, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <button
              onClick={handleOpenEmail}
              className="btn-hud-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '10px',
                fontSize: '0.74rem',
                gap: 8,
              }}
            >
              <Mail size={14} />
              <span>EMAIL TRANSMISSION DASHBOARD</span>
            </button>

            <button
              onClick={handleOpenResume}
              className="btn-hud-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '10px',
                fontSize: '0.74rem',
                gap: 8,
              }}
            >
              <FileText size={14} />
              <span>VIEW FULL ATS RESUME</span>
            </button>

            <button
              onClick={handleVoiceTrigger}
              className="btn-hud-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '10px',
                fontSize: '0.74rem',
                gap: 8,
                borderColor: 'var(--hud-cyan)',
                color: 'var(--hud-cyan)',
              }}
            >
              <Mic size={14} />
              <span>VOICE PROTOCOL ASSISTANT</span>
            </button>
          </div>
        </div>
      )}

      {/* Embedded Responsive Scoped CSS */}
      <style>{`
        /* Desktop styles (>= 768px) */
        @media (min-width: 768px) {
          .navbar-primary-row {
            height: 60px;
          }
          .nav-mobile-only {
            display: none !important;
          }
          .nav-desktop-only {
            display: flex !important;
          }
        }

        /* Mobile styles (< 768px) */
        @media (max-width: 767px) {
          .navbar-primary-row {
            height: 50px;
          }
          .nav-desktop-only {
            display: none !important;
          }
          .nav-mobile-only {
            display: flex !important;
          }
          .mobile-quick-nav-strip::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
