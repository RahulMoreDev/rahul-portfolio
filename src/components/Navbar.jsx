import { useState, useEffect } from 'react';
import { Menu, X, FileText, Mail, Mic } from 'lucide-react';

export default function Navbar({ onOpenResume, onOpenEmail }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', num: '00' },
    { href: '#about', label: 'About', num: '01' },
    { href: '#skills', label: 'Skills', num: '02' },
    { href: '#projects', label: 'Projects', num: '03' },
    { href: '#experience', label: 'Experience', num: '04' },
    { href: '#contact', label: 'Contact', num: '05' },
  ];

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
        maxWidth: '100vw',
        zIndex: 10000,
        height: 62,
        background: scrolled ? 'rgba(4, 8, 16, 0.96)' : 'rgba(4, 8, 16, 0.90)',
        borderBottom: '1px solid rgba(0, 229, 255, 0.22)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 229, 255, 0.1)' : 'none',
        transition: 'all 0.25s ease',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          width: '100%',
          height: '100%',
          margin: '0 auto',
          padding: '0 clamp(12px, 3vw, 24px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          boxSizing: 'border-box',
        }}
      >
        {/* ================= LEFT: Brand Monogram & Logo ================= */}
        <a
          href="#home"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            minWidth: 0,
            flexShrink: 1,
          }}
        >
          {/* Avatar with Neon Ring */}
          <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
            <div
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                border: '1.5px solid var(--hud-cyan)',
                boxShadow: '0 0 12px rgba(0, 229, 255, 0.65)',
              }}
            />
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid #040810',
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
                  fontSize: '0.8rem',
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
                bottom: -3,
                right: -4,
                background: '#040810',
                color: '#00e5ff',
                border: '1px solid #00e5ff',
                borderRadius: 3,
                fontSize: '0.45rem',
                fontWeight: 900,
                padding: '0px 2px',
                lineHeight: 1.2,
                boxShadow: '0 0 6px rgba(0, 229, 255, 0.8)',
              }}
            >
              {'</>'}
            </span>
          </div>

          {/* Name & Title */}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, lineHeight: 1.15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                className="font-hud"
                style={{
                  fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
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
                  fontSize: '0.52rem',
                  fontWeight: 700,
                  color: '#00e5ff',
                  background: 'rgba(0, 229, 255, 0.12)',
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                  padding: '1px 4px',
                  borderRadius: 3,
                  letterSpacing: '0.08em',
                }}
              >
                DEV
              </span>
            </div>
            <span
              className="font-mono-hud hidden sm:inline"
              style={{
                fontSize: '0.62rem',
                color: 'var(--hud-cyan)',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              {'<FULL_STACK_ENGINEER />'}
            </span>
          </div>
        </a>

        {/* ================= CENTER: Desktop Navigation Links ================= */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            gap: 20,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono-hud nav-desktop-link"
              style={{
                textDecoration: 'none',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
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
        </nav>

        {/* ================= RIGHT: Action Controls (Always Visible & Never Hidden) ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          {/* Email Dashboard Button (Desktop & Tablet) */}
          <button
            onClick={handleOpenEmail}
            className="btn-hud-secondary hidden lg:inline-flex"
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

          {/* Voice Assistant Trigger (Desktop & Tablet) */}
          <button
            onClick={handleVoiceTrigger}
            className="btn-hud-secondary hidden sm:inline-flex"
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

          {/* Resume Button (Always Visible) */}
          <button
            onClick={handleOpenResume}
            className="btn-hud-primary"
            style={{
              padding: '6px 12px',
              fontSize: '0.72rem',
              gap: 6,
            }}
            title="View Full ATS Technical Resume"
          >
            <span style={{ fontSize: '0.75rem' }}>⬡</span>
            <span>RESUME</span>
          </button>

          {/* Mobile Cyber Hamburger Button (High Contrast & Tap-Safe) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label={menuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={menuOpen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 40,
              height: 36,
              background: menuOpen ? 'var(--hud-cyan)' : 'rgba(0, 229, 255, 0.1)',
              border: '1.5px solid var(--hud-cyan)',
              borderRadius: 6,
              color: menuOpen ? '#040810' : 'var(--hud-cyan)',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.4), inset 0 0 10px rgba(0, 229, 255, 0.15)',
              transition: 'all 0.2s ease',
              padding: '4px',
            }}
          >
            {menuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE HUD DRAWER (Fixed Overlay with Smooth Scroll) ================= */}
      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          style={{
            position: 'fixed',
            top: 62,
            left: 0,
            right: 0,
            width: '100%',
            maxHeight: 'calc(100dvh - 62px)',
            overflowY: 'auto',
            background: 'rgba(4, 8, 16, 0.98)',
            borderBottom: '2px solid var(--hud-cyan)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 229, 255, 0.25)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '18px 20px 30px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            zIndex: 10001,
            boxSizing: 'border-box',
          }}
        >
          {/* Telemetry Header */}
          <div
            className="font-mono-hud"
            style={{
              fontSize: '0.68rem',
              color: 'var(--hud-cyan)',
              letterSpacing: '0.15em',
              paddingBottom: 8,
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-mono-hud"
                style={{
                  textDecoration: 'none',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  letterSpacing: '0.1em',
                  padding: '10px 12px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(0, 229, 255, 0.03)',
                  border: '1px solid rgba(0, 229, 255, 0.1)',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--hud-cyan)', fontSize: '0.75rem' }}>// {link.num}</span>
                  <span style={{ fontWeight: 600 }}>{link.label.toUpperCase()}</span>
                </div>
                <span style={{ color: 'var(--hud-cyan)' }}>▸</span>
              </a>
            ))}
          </div>

          {/* Mobile Action Center */}
          <div
            style={{
              marginTop: 10,
              paddingTop: 14,
              borderTop: '1px solid rgba(0, 229, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <button
              onClick={handleOpenEmail}
              className="btn-hud-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '0.78rem',
                gap: 8,
              }}
            >
              <Mail size={15} />
              <span>EMAIL TRANSMISSION DASHBOARD</span>
            </button>

            <button
              onClick={handleOpenResume}
              className="btn-hud-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '11px',
                fontSize: '0.78rem',
                gap: 8,
              }}
            >
              <FileText size={15} />
              <span>VIEW FULL ATS RESUME</span>
            </button>

            <button
              onClick={handleVoiceTrigger}
              className="btn-hud-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '11px',
                fontSize: '0.78rem',
                gap: 8,
                borderColor: 'var(--hud-cyan)',
                color: 'var(--hud-cyan)',
              }}
            >
              <Mic size={15} />
              <span>VOICE PROTOCOL ASSISTANT</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
