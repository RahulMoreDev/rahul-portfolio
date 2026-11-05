import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const SHIFT_INTERVAL_SECONDS = 4; // 4-second auto shift between J.A.R.V.I.S. & F.R.I.D.A.Y.

export default function ThemeProtocolHUD({ onThemeChange }) {
  const [theme, setTheme] = useState('jarvis'); // 'jarvis' | 'friday'
  const [autoCycle, setAutoCycle] = useState(true);
  const [progress, setProgress] = useState(0);
  const [assistantOpen, setAssistantOpen] = useState(false);

  // Switch theme on DOM & dispatch event (silent, no banner toast)
  const applyTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('hud_theme_protocol', newTheme);

    if (onThemeChange) onThemeChange(newTheme);
    window.dispatchEvent(new CustomEvent('jarvis-theme-changed', { detail: { theme: newTheme } }));
  };

  // Listen to assistant dock state so we never change theme while user is chatting
  useEffect(() => {
    const handleAssistantState = (e) => {
      setAssistantOpen(!!e.detail?.open);
    };
    window.addEventListener('jarvis-assistant-dock-state', handleAssistantState);
    return () => window.removeEventListener('jarvis-assistant-dock-state', handleAssistantState);
  }, []);

  // Load saved theme or default to jarvis
  useEffect(() => {
    const saved = localStorage.getItem('hud_theme_protocol');
    if (saved === 'friday' || saved === 'jarvis') {
      applyTheme(saved);
    } else {
      applyTheme('jarvis');
    }
  }, []);

  // 4-second auto-cycle interval with smooth progress tracking
  // Pauses automatically while user is chatting or typing anywhere
  useEffect(() => {
    if (!autoCycle || assistantOpen) {
      setProgress(0);
      return;
    }

    const intervalMs = 80;
    const increment = 100 / ((SHIFT_INTERVAL_SECONDS * 1000) / intervalMs);

    const timer = setInterval(() => {
      // Check if user is actively typing in any input field or textarea
      const activeEl = document.activeElement;
      const isTyping =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable);

      if (isTyping) {
        return; // Don't cycle or exchange theme while typing!
      }

      setProgress((prev) => {
        if (prev >= 100) {
          setTheme((currentTheme) => {
            const nextTheme = currentTheme === 'jarvis' ? 'friday' : 'jarvis';
            applyTheme(nextTheme);
            return nextTheme;
          });
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoCycle, assistantOpen]);

  const togglePause = () => {
    setAutoCycle((prev) => !prev);
  };

  const isFriday = theme === 'friday';
  const accentColor = isFriday ? '#ff2a6d' : '#00e5ff';
  const glowColor = isFriday ? 'rgba(255, 42, 109, 0.45)' : 'rgba(0, 229, 255, 0.45)';

  // SVG circle calculations (diameter 52px, r = 23)
  const radius = 23;
  const circumference = 2 * Math.PI * radius; // ~144.51
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <>
      {/* ================= Compact Circular Theme HUD Stacked Directly Above Launcher ================= */}
      <div
        className="theme-protocol-circle-container"
        style={{
          position: 'fixed',
          zIndex: 990, // Unobtrusive underneath opened chat dock, right above circular launcher
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        {/* Circular Theme Dial Widget with Pause Option on the Circle */}
        <div
          className="theme-protocol-circle-btn"
          onClick={togglePause}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              togglePause();
            }
          }}
          aria-label={
            autoCycle
              ? `J.A.R.V.I.S. and F.R.I.D.A.Y. 4s auto theme switcher running. Click circle to pause.`
              : `Theme auto cycle paused on ${theme.toUpperCase()}. Click circle to resume.`
          }
          title={
            autoCycle
              ? `Active: ${isFriday ? 'F.R.I.D.A.Y.' : 'J.A.R.V.I.S.'} (4s Auto-Shift ON). Click circle to PAUSE!`
              : `PAUSED on ${isFriday ? 'F.R.I.D.A.Y.' : 'J.A.R.V.I.S.'}. Click circle to RESUME 4s Auto-Shift!`
          }
          style={{
            position: 'relative',
            background: 'rgba(4, 8, 16, 0.94)',
            borderRadius: '50%',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${autoCycle ? 'rgba(var(--accent-rgb, 0, 229, 255), 0.35)' : 'rgba(255, 215, 0, 0.4)'}`,
            boxShadow: autoCycle
              ? `0 0 16px ${glowColor}, inset 0 0 12px rgba(0,0,0,0.85)`
              : '0 0 16px rgba(255, 215, 0, 0.3), inset 0 0 12px rgba(0,0,0,0.85)',
            transition: 'transform 0.16s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          }}
        >
          {/* SVG Circular Progress Ring */}
          <svg
            className="theme-ring-svg"
            viewBox="0 0 52 52"
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
              cx="26"
              cy="26"
              r={radius}
              fill="transparent"
              stroke={autoCycle ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 215, 0, 0.2)'}
              strokeWidth="2.5"
            />
            {/* Animated 4-second progress ring (runs when active, holds or hides when paused) */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="transparent"
              stroke={autoCycle ? accentColor : '#ffd700'}
              strokeWidth="2.8"
              strokeDasharray={circumference}
              strokeDashoffset={autoCycle ? strokeDashoffset : 0}
              strokeLinecap="round"
              transform="rotate(-90 26 26)"
              style={{
                transition: 'stroke 0.3s ease, stroke-dashoffset 0.08s linear',
                filter: `drop-shadow(0 0 4px ${autoCycle ? accentColor : '#ffd700'})`,
                opacity: autoCycle ? 1 : 0.4,
              }}
            />
          </svg>

          {/* ================= Content Inside the Circle ================= */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              gap: 2,
            }}
          >
            {/* Top row: Interactive J and F selectors */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                lineHeight: 1,
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  applyTheme('jarvis');
                  setProgress(0);
                }}
                className="font-mono-hud"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '0.74rem',
                  fontWeight: 900,
                  color: theme === 'jarvis' ? '#00e5ff' : 'rgba(0, 229, 255, 0.4)',
                  textShadow: theme === 'jarvis' ? '0 0 8px #00e5ff' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  lineHeight: 1,
                }}
                title="Switch to J.A.R.V.I.S. (Cyan)"
                aria-label="Select J.A.R.V.I.S. theme"
              >
                J
              </button>

              <span
                style={{
                  fontSize: '0.55rem',
                  color: 'rgba(255, 255, 255, 0.35)',
                  lineHeight: 1,
                }}
              >
                /
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  applyTheme('friday');
                  setProgress(0);
                }}
                className="font-mono-hud"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '0.74rem',
                  fontWeight: 900,
                  color: theme === 'friday' ? '#ff2a6d' : 'rgba(255, 42, 109, 0.4)',
                  textShadow: theme === 'friday' ? '0 0 8px #ff2a6d' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  lineHeight: 1,
                }}
                title="Switch to F.R.I.D.A.Y. (Crimson)"
                aria-label="Select F.R.I.D.A.Y. theme"
              >
                F
              </button>
            </div>

            {/* Bottom row: PAUSE OPTION DIRECTLY ON THE CIRCLE */}
            <div
              className="font-mono-hud circle-pause-indicator"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                fontSize: '0.48rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: autoCycle ? accentColor : '#ffd700',
                background: autoCycle
                  ? 'rgba(0, 0, 0, 0.5)'
                  : 'rgba(255, 215, 0, 0.16)',
                border: `1px solid ${autoCycle ? 'rgba(255, 255, 255, 0.18)' : '#ffd700'}`,
                padding: '1px 5px',
                borderRadius: 4,
                lineHeight: 1.2,
                marginTop: 1,
                transition: 'all 0.2s ease',
              }}
            >
              {autoCycle ? (
                <>
                  <Pause size={7} style={{ fill: accentColor }} />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play size={7} style={{ fill: '#ffd700' }} />
                  <span>PLAY</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive positioning stacked directly above assistant dock launcher button */}
      <style>{`
        /* Desktop: Assistant launcher is at right: 24px, bottom: 24px, size: 58px.
           Center X is 24 + 29 = 53px from right.
           Circular theme button is 52px -> right: 27px (27 + 26 = 53px).
           Bottom: 90px (82px launcher top + 8px gap). */
        .theme-protocol-circle-container {
          right: 27px;
          bottom: 90px;
        }
        .theme-protocol-circle-btn {
          width: 52px;
          height: 52px;
        }
        .theme-protocol-circle-btn:hover {
          transform: scale(1.08);
        }
        .theme-protocol-circle-btn:active {
          transform: scale(0.95);
        }

        /* Mobile (<= 520px): Assistant launcher is at right: 14px, bottom: 16px, size: 54px.
           Center X is 14 + 27 = 41px from right.
           Circular theme button is 48px -> right: 17px (17 + 24 = 41px).
           Bottom: 78px (70px launcher top + 8px gap). */
        @media (max-width: 520px) {
          .theme-protocol-circle-container {
            right: 17px !important;
            bottom: 78px !important;
          }
          .theme-protocol-circle-btn {
            width: 48px !important;
            height: 48px !important;
          }
          .circle-pause-indicator {
            font-size: 0.44rem !important;
            padding: 1px 3px !important;
          }
        }
      `}</style>
    </>
  );
}
