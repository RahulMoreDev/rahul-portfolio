import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#02050b',
        borderTop: '1px solid rgba(0, 229, 255, 0.2)',
        padding: '50px 24px 30px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Mini coder photo */}
            <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: -1,
                  borderRadius: '50%',
                  border: '1.5px solid var(--hud-cyan)',
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
                }}
              />
              <div
                style={{
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
          <div style={{ display: 'flex', gap: 14 }}>
            {[
              { label: 'GITHUB', href: personalInfo.github },
              { label: 'LINKEDIN', href: personalInfo.linkedin },
              { label: 'EMAIL', href: personalInfo.emailUrl || `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono-hud"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: 4,
                  background: 'rgba(0, 229, 255, 0.04)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--hud-cyan)';
                  e.currentTarget.style.borderColor = 'var(--hud-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                }}
              >
                // {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom telemetry line */}
        <div
          className="font-mono-hud"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            paddingTop: 20,
            borderTop: '1px solid rgba(0, 229, 255, 0.08)',
          }}
        >
          <div>© {currentYear} RAHUL MORE. ALL SYSTEM PROTOCOLS VERIFIED.</div>
          <div>HOSTED ON VERCEL // CLOUD_STATUS: ONLINE</div>
        </div>
      </div>
    </footer>
  );
}
