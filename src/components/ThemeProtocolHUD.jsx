import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const SHIFT_INTERVAL_SECONDS = 4; // 4-second auto shift between J.A.R.V.I.S. & F.R.I.D.A.Y.

export default function ThemeProtocolHUD({ onThemeChange }) {
  const [theme, setTheme] = useState('jarvis'); // 'jarvis' | 'friday'
  const [autoCycle, setAutoCycle] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showShiftBanner, setShowShiftBanner] = useState(false);
  const [bannerText, setBannerText] = useState('');

  // Switch theme on DOM & dispatch event
  const applyTheme = (newTheme, announce = true) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('hud_theme_protocol', newTheme);

    if (onThemeChange) onThemeChange(newTheme);
    window.dispatchEvent(new CustomEvent('jarvis-theme-changed', { detail: { theme: newTheme } }));

    if (announce) {
      setBannerText(
        newTheme === 'friday'
          ? 'PROTOCOL SHIFT: F.R.I.D.A.Y. CRIMSON HUD'
          : 'PROTOCOL SHIFT: J.A.R.V.I.S. CYAN HUD'
      );
      setShowShiftBanner(true);
      setTimeout(() => setShowShiftBanner(false), 1400);
    }
  };

  // Load saved theme or default to jarvis
  useEffect(() => {
    const saved = localStorage.getItem('hud_theme_protocol');
    if (saved === 'friday' || saved === 'jarvis') {
      applyTheme(saved, false);
    } else {
      applyTheme('jarvis', false);
    }
  }, []);

  // 4-second auto-cycle interval with smooth progress tracking
  useEffect(() => {
    if (!autoCycle) {
      setProgress(0);
      return;
    }

    const intervalMs = 80;
    const increment = 100 / ((SHIFT_INTERVAL_SECONDS * 1000) / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTheme((currentTheme) => {
            const nextTheme = currentTheme === 'jarvis' ? 'friday' : 'jarvis';
            applyTheme(nextTheme, true);
            return nextTheme;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoCycle]);

  const toggleThemeManual = () => {
    const nextTheme = theme === 'jarvis' ? 'friday' : 'jarvis';
    setProgress(0);
    applyTheme(nextTheme, true);
  };

  const isFriday = theme === 'friday';
  const accentColor = isFriday ? '#ff2a6d' : '#00e5ff';
  const glowColor = isFriday ? 'rgba(255, 42, 109, 0.45)' : 'rgba(0, 229, 255, 0.45)';

  // SVG circle calculations (diameter 46px, r = 20)
  const radius = 20;
  const circumference = 2 * Math.PI * radius; // ~125.66
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <>
      {/* ================= On-Screen Holographic Protocol Shift Toast ================= */}
      {showShiftBanner && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: 68,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10002,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(4, 8, 16, 0.94)',
            border: `1.5px solid ${accentColor}`,
            boxShadow: `0 0 20px ${glowColor}`,
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            maxWidth: '92vw',
            pointerEvents: 'none',
            animation: 'pulseGlow 1.4s ease-in-out infinite',
          }}
        >
          <span style={{ color: accentColor, fontSize: '0.85rem' }}>⚡</span>
          <span
            className="font-mono-hud"
            style={{
              fontSize: 'clamp(0.68rem, 2vw, 0.78rem)',
              color: '#ffffff',
              letterSpacing: '0.1em',
              fontWeight: 700,
              textShadow: `0 0 8px ${accentColor}`,
              whiteSpace: 'nowrap',
            }}
          >
            {bannerText}
          </span>
        </div>
      )}

      {/* ================= Compact Circular Theme HUD Controller Stacked Above Launcher ================= */}
      <div
        className="theme-protocol-circle-container"
        style={{
          position: 'fixed',
          zIndex: 990, // Underneath open assistant chat window (1000), but visible directly above circular launcher
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          userSelect: 'none',
        }}
      >
        {/* Tiny Auto-cycle status pill (tap to pause/resume 4s auto-shift) */}
        <button
          type="button"
          onClick={() => setAutoCycle((prev) => !prev)}
          className="font-mono-hud theme-pill-badge"
          style={{
            fontSize: '0.55rem',
            padding: '1px 6px',
            borderRadius: 8,
            background: 'rgba(4, 8, 16, 0.92)',
            border: `1px solid ${autoCycle ? accentColor : 'rgba(255,255,255,0.2)'}`,
            color: autoCycle ? accentColor : 'var(--text-muted)',
            boxShadow: autoCycle ? `0 0 8px ${glowColor}` : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            lineHeight: 1.3,
            letterSpacing: '0.06em',
            transition: 'all 0.2s ease',
          }}
          title={autoCycle ? 'Auto-cycling every 4s (Click to pause)' : 'Paused (Click to resume 4s auto-cycle)'}
          aria-label={autoCycle ? 'Pause 4s auto theme cycle' : 'Resume 4s auto theme cycle'}
        >
          {autoCycle ? (
            <>
              <Pause size={7} />
              <span>4s AUTO</span>
            </>
          ) : (
            <>
              <Play size={7} />
              <span>PAUSED</span>
            </>
          )}
        </button>

        {/* Circular Theme Dial Widget */}
        <button
          type="button"
          onClick={toggleThemeManual}
          className="theme-protocol-circle-btn"
          aria-label={`Switch theme. Currently ${isFriday ? 'F.R.I.D.A.Y.' : 'J.A.R.V.I.S.'}`}
          title={`Active: ${isFriday ? 'F.R.I.D.A.Y. (Crimson)' : 'J.A.R.V.I.S. (Cyan)'}. Click to switch theme!`}
          style={{
            position: 'relative',
            background: 'rgba(4, 8, 16, 0.92)',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            outline: 'none',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: `0 0 16px ${glowColor}, inset 0 0 10px rgba(0,0,0,0.8)`,
            transition: 'transform 0.16s ease, box-shadow 0.2s ease',
          }}
        >
          {/* SVG Circular Progress Ring */}
          <svg
            className="theme-ring-svg"
            viewBox="0 0 46 46"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {/* Background inactive ring track */}
            <circle
              cx="23"
              cy="23"
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2"
            />
            {/* Animated 4-second progress ring */}
            <circle
              cx="23"
              cy="23"
              r={radius}
              fill="transparent"
              stroke={accentColor}
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={autoCycle ? strokeDashoffset : 0}
              strokeLinecap="round"
              transform="rotate(-90 23 23)"
              style={{
                transition: 'stroke 0.3s ease, stroke-dashoffset 0.08s linear',
                filter: `drop-shadow(0 0 3px ${accentColor})`,
              }}
            />
          </svg>

          {/* Center Holographic AI Emblem */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <span
              className="font-mono-hud"
              style={{
                fontSize: '0.85rem',
                fontWeight: 900,
                color: accentColor,
                lineHeight: 1,
                textShadow: `0 0 8px ${accentColor}`,
                letterSpacing: '-0.02em',
              }}
            >
              {isFriday ? 'F' : 'J'}
            </span>
            <span
              className="font-mono-hud"
              style={{
                fontSize: '0.48rem',
                color: '#ffffff',
                opacity: 0.85,
                lineHeight: 1,
                marginTop: 1,
                letterSpacing: '0.04em',
              }}
            >
              {isFriday ? 'FRI' : 'JAR'}
            </span>
          </div>
        </button>
      </div>

      {/* Responsive positioning stacked directly above assistant dock launcher button */}
      <style>{`
        /* Desktop: Assistant launcher button is at right: 24px, bottom: 24px, size: 58px.
           Center X is 24 + 29 = 53px from right.
           Circular theme button is 46px -> right: 30px (30 + 23 = 53px).
           Bottom: 90px (82px launcher top + 8px gap). */
        .theme-protocol-circle-container {
          right: 30px;
          bottom: 90px;
        }
        .theme-protocol-circle-btn {
          width: 46px;
          height: 46px;
        }
        .theme-protocol-circle-btn:hover {
          transform: scale(1.08);
        }
        .theme-protocol-circle-btn:active {
          transform: scale(0.94);
        }

        /* Mobile (<= 520px): Assistant launcher is at right: 14px, bottom: 16px, size: 54px.
           Center X is 14 + 27 = 41px from right.
           Circular theme button is 42px -> right: 20px (20 + 21 = 41px).
           Bottom: 76px (70px launcher top + 6px gap). */
        @media (max-width: 520px) {
          .theme-protocol-circle-container {
            right: 20px !important;
            bottom: 76px !important;
            gap: 2px !important;
          }
          .theme-protocol-circle-btn {
            width: 42px !important;
            height: 42px !important;
          }
          .theme-pill-badge {
            font-size: 0.5rem !important;
            padding: 1px 4px !important;
          }
        }
      `}</style>
    </>
  );
}
