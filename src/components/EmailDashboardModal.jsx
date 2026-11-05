import { useState, useEffect } from 'react';
import { X, Send, Mail, Copy, Check, ExternalLink, Sparkles, Shield, User, Briefcase } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const ROLES = [
  {
    id: 'developer',
    label: '💻 Software Developer / Engineer',
    shortLabel: 'Developer',
    defaultSubject: 'Developer Collaboration / Tech Discussion',
    defaultMessage: `Hi Rahul,\n\nI am a fellow software developer and came across your portfolio. I was impressed with your tech stack in React, Java, and Spring Boot.\n\nI would love to connect, share insights, and discuss potential engineering collaborations.\n\nBest regards,\n`,
  },
  {
    id: 'sales-exec',
    label: '📈 Sales Executive / Business Development',
    shortLabel: 'Sales Executive',
    defaultSubject: 'Business Opportunity & Partnership Proposal',
    defaultMessage: `Hi Rahul,\n\nI am reaching out as a Sales Executive / Business Development representative.\n\nWe have exciting tech solutions / business opportunities that could align with your software development capabilities and client projects.\n\nCould we arrange a brief discussion to explore mutual synergies?\n\nBest regards,\n`,
  },
  {
    id: 'recruiter',
    label: '👔 HR / Technical Recruiter',
    shortLabel: 'Recruiter / HR',
    defaultSubject: 'Software Developer Career Opportunity at [Company]',
    defaultMessage: `Dear Rahul More,\n\nI am a Technical Recruiter at [Company] and came across your portfolio. We are actively hiring for a Full Stack Software Developer role.\n\nYour expertise in Java, Spring Boot, React, and REST APIs matches what we are seeking. Let me know your availability for an initial exploratory conversation.\n\nBest regards,\n`,
  },
  {
    id: 'founder',
    label: '🚀 Founder / CEO / CTO',
    shortLabel: 'Founder / Executive',
    defaultSubject: 'Startup Opportunity / Project Leadership',
    defaultMessage: `Hi Rahul,\n\nI am the Founder / Tech Lead at [Company]. We are building a high-growth platform and looking for talented engineers who can deliver clean APIs and responsive frontends.\n\nI would like to discuss a key engineering role / contract with you.\n\nBest regards,\n`,
  },
  {
    id: 'product-manager',
    label: '🎯 Product / Project Manager',
    shortLabel: 'Product Manager',
    defaultSubject: 'Product Development & Engineering Collaboration',
    defaultMessage: `Hi Rahul,\n\nI am managing product workflows and looking for strong developers to build robust feature modules and reliable REST API pipelines.\n\nLet's connect to discuss timelines, specifications, and scope.\n\nBest regards,\n`,
  },
  {
    id: 'client',
    label: '🤝 Client / Business Owner',
    shortLabel: 'Client',
    defaultSubject: 'Web Application Development Inquiry',
    defaultMessage: `Hi Rahul,\n\nI am looking for a full stack developer to build a modern web application for my business. I saw your work on CRM and management systems.\n\nCould we schedule a call to discuss requirements and estimates?\n\nBest regards,\n`,
  },
];

export default function EmailDashboardModal({ isOpen, onClose }) {
  const [selectedRole, setSelectedRole] = useState('developer');
  const [customRole, setCustomRole] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('Developer Collaboration / Tech Discussion');
  const [message, setMessage] = useState(
    `Hi Rahul,\n\nI came across your portfolio and would like to connect regarding software development opportunities.\n\nLooking forward to hearing from you!\n\nBest regards,\n`
  );
  const [copied, setCopied] = useState(false);

  // Handle ESC key & body overflow
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const recipient = personalInfo.email;

  const getEffectiveRole = () => {
    if (selectedRole === 'custom') {
      return customRole || 'Custom / Other';
    }
    const found = ROLES.find((r) => r.id === selectedRole);
    return found ? found.shortLabel : 'Professional Contact';
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    if (role.defaultSubject) setSubject(role.defaultSubject);
    if (role.defaultMessage) setMessage(role.defaultMessage);
  };

  const buildPayloadBody = () => {
    return `[TRANSMISSION SOURCE: J.A.R.V.I.S. PORTFOLIO COMMS]\n` +
      `SENDER: ${senderName || 'Anonymous'}\n` +
      `ROLE / DESIGNATION: ${getEffectiveRole()}\n` +
      `RETURN_SIGNAL: ${senderEmail || 'Not Specified'}\n\n` +
      `----------------------------------------\n\n` +
      `${message}\n\n` +
      `----------------------------------------\n` +
      `Sent via Rahul More's Developer Interface`;
  };

  const handleGmailCompose = () => {
    const encodedSubject = encodeURIComponent(subject || 'Portfolio Inquiry');
    const encodedBody = encodeURIComponent(buildPayloadBody());
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodedSubject}&body=${encodedBody}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDefaultMailto = () => {
    const encodedSubject = encodeURIComponent(subject || 'Portfolio Inquiry');
    const encodedBody = encodeURIComponent(buildPayloadBody());
    window.location.href = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const handleOutlookCompose = () => {
    const encodedSubject = encodeURIComponent(subject || 'Portfolio Inquiry');
    const encodedBody = encodeURIComponent(buildPayloadBody());
    const url = `https://outlook.live.com/mail/0/deeplink/compose?to=${recipient}&subject=${encodedSubject}&body=${encodedBody}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPayload = () => {
    const fullText = `To: ${recipient}\nSubject: ${subject}\n\n${buildPayloadBody()}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(8px, 2vw, 20px)',
        backgroundColor: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="hud-panel hud-corners email-dashboard-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="J.A.R.V.I.S. Email Dispatch Dashboard"
        style={{
          width: 'min(890px, 98vw)',
          maxHeight: 'min(94vh, 900px)',
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#050c18',
          border: '1px solid rgba(0, 229, 255, 0.4)',
          boxShadow: '0 0 50px rgba(0, 229, 255, 0.25), 0 25px 60px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden',
        }}
      >
        {/* ================= Top Cyber Header ================= */}
        <div
          style={{
            padding: '14px 20px',
            background: 'rgba(6, 18, 36, 0.95)',
            borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 6,
                background: 'rgba(0, 229, 255, 0.1)',
                border: '1px solid var(--hud-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--hud-cyan)',
                boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)',
              }}
            >
              <Mail size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="font-hud" style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.06em' }}>
                  EMAIL TRANSMISSION DASHBOARD
                </span>
                <span
                  className="font-mono-hud"
                  style={{
                    fontSize: '0.62rem',
                    color: 'var(--hud-green)',
                    background: 'rgba(0, 255, 157, 0.1)',
                    border: '1px solid rgba(0, 255, 157, 0.4)',
                    padding: '1px 6px',
                    borderRadius: 3,
                  }}
                >
                  ROLE AWARE
                </span>
              </div>
              <div className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Target: <span style={{ color: 'var(--hud-cyan)', fontWeight: 600 }}>{recipient}</span> · Active Role: <span style={{ color: 'var(--hud-green)', fontWeight: 700 }}>{getEffectiveRole()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              color: 'var(--hud-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Close dashboard"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= Scrollable Body ================= */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'clamp(14px, 3vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          {/* Recipient Target HUD Banner */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 6,
              background: 'rgba(0, 229, 255, 0.04)',
              border: '1px solid rgba(0, 229, 255, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--hud-green)',
                  boxShadow: '0 0 10px var(--hud-green)',
                }}
              />
              <div className="font-mono-hud" style={{ fontSize: '0.78rem', color: '#ffffff' }}>
                <span style={{ color: 'var(--text-muted)' }}>RECIPIENT_TARGET:</span> Rahul More &lt;
                <span style={{ color: 'var(--hud-cyan)', fontWeight: 700 }}>{recipient}</span>&gt;
              </div>
            </div>

            <div className="font-mono-hud" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              PROTOCOL: TLS / DIRECT INBOX
            </div>
          </div>

          {/* ================= ROLE SELECTION SECTION ================= */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 8,
              background: 'rgba(6, 18, 36, 0.7)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
            }}
          >
            <div
              className="font-mono-hud"
              style={{
                fontSize: '0.74rem',
                color: 'var(--hud-cyan)',
                letterSpacing: '0.12em',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Briefcase size={14} />
              <span>SELECT YOUR PROFESSIONAL ROLE / PROFILE:</span>
            </div>

            {/* Role Pills Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 8,
              }}
              className="role-selection-grid"
            >
              {ROLES.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className="font-mono-hud"
                    style={{
                      padding: '8px 12px',
                      borderRadius: 6,
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 8,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: isSelected ? 'rgba(0, 229, 255, 0.16)' : 'rgba(4, 8, 16, 0.8)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                      border: isSelected ? '1.5px solid var(--hud-cyan)' : '1px solid rgba(0, 229, 255, 0.2)',
                      boxShadow: isSelected ? '0 0 16px rgba(0, 229, 255, 0.35)' : 'none',
                    }}
                  >
                    <span>{r.label}</span>
                    {isSelected && (
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: 'var(--hud-cyan)',
                          color: '#040810',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: 900,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Custom / Other Role Button */}
              <button
                type="button"
                onClick={() => setSelectedRole('custom')}
                className="font-mono-hud"
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: selectedRole === 'custom' ? 'rgba(0, 229, 255, 0.16)' : 'rgba(4, 8, 16, 0.8)',
                  color: selectedRole === 'custom' ? '#ffffff' : 'var(--text-secondary)',
                  border: selectedRole === 'custom' ? '1.5px solid var(--hud-cyan)' : '1px solid rgba(0, 229, 255, 0.2)',
                  boxShadow: selectedRole === 'custom' ? '0 0 16px rgba(0, 229, 255, 0.35)' : 'none',
                }}
              >
                <span>✨ Custom / Other Role</span>
                {selectedRole === 'custom' && (
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: 'var(--hud-cyan)',
                      color: '#040810',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            </div>

            {/* Custom Role Input field if selected */}
            {selectedRole === 'custom' && (
              <div style={{ marginTop: 10 }}>
                <input
                  type="text"
                  placeholder="Enter your exact title / role (e.g. Engineering Director, Angel Investor...)"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  style={fieldStyle}
                />
              </div>
            )}
          </div>

          {/* Sender Details (Two Column) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="email-dash-cols">
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                YOUR NAME / IDENTIFIER
              </span>
              <input
                type="text"
                placeholder="e.g. John Doe, Sarah Jenkins..."
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                style={fieldStyle}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                YOUR RETURN SIGNAL (EMAIL)
              </span>
              <input
                type="email"
                placeholder="you@domain.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                style={fieldStyle}
              />
            </label>
          </div>

          {/* Subject Line */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              TRANSMISSION SUBJECT
            </span>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer Opening / Project Proposal"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={fieldStyle}
            />
          </label>

          {/* Message Body */}
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                COMPOSE TRANSMISSION MESSAGE
              </span>
              <span className="font-mono-hud" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                {message.length} chars · ~{(message.length / 1000).toFixed(1)} KB
              </span>
            </div>
            <textarea
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message to Rahul here..."
              style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.65 }}
            />
          </label>
        </div>

        {/* ================= Bottom Dispatch Control Bar ================= */}
        <div
          style={{
            padding: '14px 20px',
            background: 'rgba(6, 18, 36, 0.98)',
            borderTop: '1px solid rgba(0, 229, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span className="font-mono-hud" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              ⚡ DISPATCH AS: <strong style={{ color: 'var(--hud-cyan)' }}>{getEffectiveRole()}</strong>
            </span>
            {copied && (
              <span className="font-mono-hud" style={{ fontSize: '0.74rem', color: 'var(--hud-green)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Check size={13} /> Full message copied to clipboard!
              </span>
            )}
          </div>

          {/* Action Button Grid */}
          <div className="email-dispatch-buttons">
            {/* Primary Gmail Web Button */}
            <button
              onClick={handleGmailCompose}
              className="btn-hud-primary"
              style={{
                justifyContent: 'center',
                padding: '12px 18px',
                fontSize: '0.78rem',
              }}
              title="Open directly in Gmail web with pre-filled content"
            >
              <span>🌐</span>
              <span>LAUNCH GMAIL WEB COMPOSE ↗</span>
            </button>

            {/* Default Mail App Button */}
            <button
              onClick={handleDefaultMailto}
              className="btn-hud-secondary"
              style={{
                justifyContent: 'center',
                padding: '12px 16px',
                fontSize: '0.78rem',
              }}
              title="Open with Outlook, Apple Mail or Windows Mail"
            >
              <Mail size={15} />
              <span>DEFAULT MAIL APP</span>
            </button>

            {/* Outlook Web */}
            <button
              onClick={handleOutlookCompose}
              className="btn-hud-secondary"
              style={{
                justifyContent: 'center',
                padding: '12px 14px',
                fontSize: '0.78rem',
              }}
              title="Open in Outlook Web"
            >
              <ExternalLink size={14} />
              <span>OUTLOOK WEB</span>
            </button>

            {/* Copy Payload Button */}
            <button
              onClick={handleCopyPayload}
              className="btn-hud-secondary"
              style={{
                justifyContent: 'center',
                padding: '12px 14px',
                fontSize: '0.78rem',
              }}
              title="Copy subject, recipient, and message to clipboard"
            >
              <Copy size={14} />
              <span>COPY PAYLOAD</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .email-dash-cols {
            grid-template-columns: 1fr !important;
          }
          .role-selection-grid {
            grid-template-columns: 1fr !important;
          }
          .email-dispatch-buttons {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 8px !important;
          }
          .email-dispatch-buttons > button:first-child {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .email-dispatch-buttons {
            grid-template-columns: 1fr !important;
          }
        }

        .email-dispatch-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}

const fieldStyle = {
  background: 'rgba(0, 229, 255, 0.04)',
  border: '1px solid rgba(0, 229, 255, 0.25)',
  borderRadius: 4,
  padding: '10px 14px',
  color: '#ffffff',
  fontSize: '0.84rem',
  fontFamily: "'Share Tech Mono', monospace",
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
};
