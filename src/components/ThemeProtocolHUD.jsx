import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Zap } from 'lucide-react';

const SHIFT_INTERVAL_SECONDS = 4; // auto-cycles theme every 4 seconds as requested

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

  // Load saved theme or start with jarvis
  useEffect(() => {
    const saved = localStorage.getItem('hud_theme_protocol');
    if (saved === 'friday' || saved === 'jarvis') {
      applyTheme(saved, false);
    } else {
      applyTheme('jarvis', false);
    }
  }, []);

  // Auto-cycle timer every 4 seconds
  useEffect(() => {
    if (!autoCycle) {
      setProgress(0);
      return;
    }

    const intervalMs = 100; // updates every 100ms for ultra-smooth 4-sec progress
    const increment = 100 / ((SHIFT_INTERVAL_SECONDS * 1000) / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Time to toggle theme
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
            border: '1.5px solid var(--hud-cyan)',
            boxShadow: '0 0 20px var(--hud-cyan-glow)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            maxWidth: '92vw',
            pointerEvents: 'none',
            animation: 'pulseGlow 1.5s ease-in-out infinite',
          }}
        >
          <span style={{ color: 'var(--hud-cyan)', fontSize: '0.85rem' }}>⚡</span>
          <span
            className="font-mono-hud"
            style={{
              fontSize: 'clamp(0.68rem, 2vw, 0.78rem)',
              color: '#ffffff',
              letterSpacing: '0.1em',
              fontWeight: 700,
              textShadow: '0 0 8px var(--hud-cyan)',
              whiteSpace: 'nowrap',
            }}
          >
            {bannerText}
          </span>
        </div>
      )}

      {/* ================= Floating On-Screen Theme Viewer Controller ================= */}
      <div
        className="hud-panel theme-protocol-widget"
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 9990,
          borderRadius: 8,
          padding: '8px 12px',
          background: 'rgba(4, 8, 16, 0.94)',
          border: '1.5px solid var(--hud-cyan)',
          boxShadow: '0 0 20px var(--hud-cyan-glow)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {/* Top telemetry label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}
        >
          <div
            className="font-mono-hud"
            style={{
              fontSize: '0.64rem',
              color: 'var(--hud-cyan)',
              letterSpacing: '0.12em',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: theme === 'friday' ? '#ff2a6d' : '#00e5ff',
                boxShadow: `0 0 8px ${theme === 'friday' ? '#ff2a6d' : '#00e5ff'}`,
              }}
            />
            <span>THEME: {theme === 'friday' ? 'F.R.I.D.A.Y.' : 'J.A.R.V.I.S.'}</span>
          </div>

          {/* Auto-cycle toggle button */}
          <button
            type="button"
            onClick={() => setAutoCycle(!autoCycle)}
            className="font-mono-hud"
            style={{
              fontSize: '0.58rem',
              background: autoCycle ? 'rgba(0, 255, 157, 0.14)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${autoCycle ? 'var(--hud-green)' : 'rgba(255, 255, 255, 0.2)'}`,
              color: autoCycle ? 'var(--hud-green)' : 'var(--text-muted)',
              padding: '2px 6px',
              borderRadius: 3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
            title={autoCycle ? 'Auto-cycling every 4s (Click to pause)' : 'Click to enable 4s auto-cycle'}
          >
            <RefreshCw size={9} className={autoCycle ? 'spin-slow' : ''} />
            <span>{autoCycle ? '4s AUTO' : 'PAUSED'}</span>
          </button>
        </div>

        {/* Buttons to switch between J.A.R.V.I.S. and F.R.I.D.A.Y. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* JARVIS Button */}
          <button
            type="button"
            onClick={() => {
              applyTheme('jarvis', true);
            }}
            className="font-mono-hud"
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              fontSize: '0.7rem',
              fontWeight: theme === 'jarvis' ? 800 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: theme === 'jarvis' ? 'rgba(0, 229, 255, 0.2)' : 'rgba(0, 229, 255, 0.04)',
              border: `1px solid ${theme === 'jarvis' ? '#00e5ff' : 'rgba(0, 229, 255, 0.25)'}`,
              color: theme === 'jarvis' ? '#00e5ff' : 'var(--text-secondary)',
              boxShadow: theme === 'jarvis' ? '0 0 12px rgba(0, 229, 255, 0.5)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>🔷</span>
            <span>J.A.R.V.I.S.</span>
          </button>

          {/* FRIDAY Button */}
          <button
            type="button"
            onClick={() => {
              applyTheme('friday', true);
            }}
            className="font-mono-hud"
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              fontSize: '0.7rem',
              fontWeight: theme === 'friday' ? 800 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: theme === 'friday' ? 'rgba(255, 42, 109, 0.2)' : 'rgba(255, 42, 109, 0.04)',
              border: `1px solid ${theme === 'friday' ? '#ff2a6d' : 'rgba(255, 42, 109, 0.25)'}`,
              color: theme === 'friday' ? '#ff2a6d' : 'var(--text-secondary)',
              boxShadow: theme === 'friday' ? '0 0 12px rgba(255, 42, 109, 0.5)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>🔶</span>
            <span>F.R.I.D.A.Y.</span>
          </button>
        </div>

        {/* Auto-shift countdown progress bar */}
        {autoCycle && (
          <div
            style={{
              width: '100%',
              height: 2,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 1,
              overflow: 'hidden',
              marginTop: 2,
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: theme === 'friday' ? '#ff2a6d' : '#00e5ff',
                boxShadow: `0 0 6px ${theme === 'friday' ? '#ff2a6d' : '#00e5ff'}`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .theme-protocol-widget {
            left: 14px !important;
            bottom: 84px !important;
            padding: 6px 10px !important;
          }
          .theme-protocol-widget button {
            padding: 4px 8px !important;
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </>
  );
}
