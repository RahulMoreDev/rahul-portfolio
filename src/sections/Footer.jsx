import { personalInfo } from '../data/portfolioData';

export default function Footer({ onOpenEmail }) {
  const currentYear = new Date().getFullYear();

  const handleEmailClick = (e) => {
    e.preventDefault();
    if (onOpenEmail) {
      onOpenEmail();
    } else {
      window.dispatchEvent(new CustomEvent('jarvis-open-email'));
    }
  };

  return (
    <footer
      style={{
        background: '#02050b',
        borderTop: '1px solid rgba(0, 229, 255, 0.2)',
        padding: 'clamp(36px, 6vw, 50px) clamp(16px, 4vw, 24px) clamp(24px, 4vw, 30px)',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div className="footer-top-row">
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* J.A.R.V.I.S. Robotic Brand Logo */}
            <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: '50%',
                  border: '1.5px solid var(--hud-cyan)',
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.6)',
                }}
              />
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1px solid #040810',
                }}
              >
                <img
                  src="/images/jarvis-robot-logo.jpg"
                  alt="J.A.R.V.I.S. Robotic Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span
                className="font-mono-hud"
                style={{
                  position: 'absolute',
                  bottom: -3,
                  right: -4,
                  background: '#02050b',
                  color: '#00e5ff',
                  border: '1px solid #00e5ff',
                  borderRadius: 3,
                  fontSize: '0.45rem',
                  fontWeight: 900,
                  padding: '0px 2px',
                  lineHeight: 1.3,
                }}
              >
                {'</>'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="font-hud" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                RAHUL MORE
              </span>
              <span className="font-mono-hud" style={{ fontSize: '0.7rem', color: 'var(--hud-cyan)' }}>
                {'<FULL_STACK_ENGINEER />'}
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="footer-links">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono-hud footer-link"
            >
              // GITHUB
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono-hud footer-link"
            >
              // LINKEDIN
            </a>
            <button
              onClick={handleEmailClick}
              className="font-mono-hud footer-link"
              style={{
                cursor: 'pointer',
                background: 'rgba(0, 229, 255, 0.08)',
                color: 'var(--hud-cyan)',
                borderColor: 'rgba(0, 229, 255, 0.4)',
              }}
              title="Open J.A.R.V.I.S. Email Compose Dashboard"
            >
              // EMAIL DASHBOARD ↗
            </button>
          </div>
        </div>

        {/* Bottom telemetry line */}
        <div
          className="font-mono-hud footer-bottom-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            paddingTop: 18,
            borderTop: '1px solid rgba(0, 229, 255, 0.08)',
          }}
        >
          <div>© {currentYear} RAHUL MORE. ALL SYSTEM PROTOCOLS VERIFIED.</div>
          <div>HOSTED ON VERCEL // CLOUD_STATUS: ONLINE</div>
        </div>
      </div>

      <style>{`
        .footer-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-link {
          font-size: 0.74rem;
          color: var(--text-secondary);
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 4px;
          background: rgba(0, 229, 255, 0.04);
          border: 1px solid rgba(0, 229, 255, 0.2);
          letter-spacing: 0.08em;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
        }

        .footer-link:hover {
          color: var(--hud-cyan) !important;
          border-color: var(--hud-cyan) !important;
        }

        @media (max-width: 640px) {
          .footer-top-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .footer-bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }
      `}</style>
    </footer>
  );
}
