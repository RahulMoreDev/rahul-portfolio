import { useState, useRef, useEffect } from 'react';

const JARVIS_GREETING = "J.A.R.V.I.S. Protocol active. Welcome to Rahul More's system core. How may I assist you, sir?";

const JARVIS_REPLIES = {
  skills: "System diagnostics report proficiency in Java, Spring Boot, React.js, Node.js, REST APIs, MySQL, and MongoDB.",
  projects: "Rahul's active deployment files include: CRM Application, Journal Management System, Student Management System, and Bank Management System.",
  experience: "Rahul currently engineers high-performance web applications and secure RESTful services at Raveblue.",
  education: "Credentials verified: Bachelor of Computer Engineering from Sant Gadge Baba Amravati University with 8.0 CGPA.",
  hire: "Rahul is fully available for full-stack and backend roles. You may dispatch an encrypted transmission to rahulmore.engineer@gmail.com.",
  contact: "Direct comms frequency: rahulmore.engineer@gmail.com | LinkedIn: linkedin.com/in/rahul-more-3849a4377",
  resume: "Resume protocols ready. You can trigger the 'VIEW RESUME' button in the navigation bar to inspect the ATS-standard dossier.",
  default: "Command acknowledged. For custom inquiries or employment opportunities, direct transmission to rahulmore.engineer@gmail.com is advised.",
};

function getJarvisReply(text) {
  const t = text.toLowerCase();
  if (t.includes('skill') || t.includes('tech') || t.includes('stack')) return JARVIS_REPLIES.skills;
  if (t.includes('project') || t.includes('work') || t.includes('built')) return JARVIS_REPLIES.projects;
  if (t.includes('experience') || t.includes('job') || t.includes('raveblue')) return JARVIS_REPLIES.experience;
  if (t.includes('education') || t.includes('degree') || t.includes('cgpa')) return JARVIS_REPLIES.education;
  if (t.includes('hire') || t.includes('available') || t.includes('recruit')) return JARVIS_REPLIES.hire;
  if (t.includes('contact') || t.includes('email') || t.includes('reach')) return JARVIS_REPLIES.contact;
  if (t.includes('resume') || t.includes('cv')) return JARVIS_REPLIES.resume;
  return JARVIS_REPLIES.default;
}

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'bot', text: JARVIS_GREETING }]);
  const [input, setInput] = useState('');
  const [computing, setComputing] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, computing]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    setMessages((m) => [...m, { type: 'user', text: txt }]);
    setInput('');
    setComputing(true);
    setTimeout(() => {
      setComputing(false);
      setMessages((m) => [...m, { type: 'bot', text: getJarvisReply(txt) }]);
    }, 800);
  };

  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1000 }}>
      {/* HUD Chat Window */}
      {open && (
        <div
          className="hud-panel hud-corners"
          style={{
            position: 'absolute',
            bottom: 70,
            right: 0,
            width: 'min(360px, 92vw)',
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 229, 255, 0.35)',
            border: '1px solid var(--hud-cyan)',
            background: 'rgba(4, 8, 16, 0.96)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(0, 229, 255, 0.08)',
              borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="status-pip status-pip-cyan" />
              <span className="font-hud" style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--hud-cyan)' }}>
                J.A.R.V.I.S. // AI_ASSISTANT
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--hud-cyan)',
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              height: 270,
              overflowY: 'auto',
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              fontSize: '0.82rem',
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className="font-mono-hud"
                style={{
                  alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '8px 12px',
                  borderRadius: 4,
                  background: m.type === 'user' ? 'rgba(0, 229, 255, 0.15)' : 'rgba(6, 18, 36, 0.85)',
                  border: m.type === 'user' ? '1px solid var(--hud-cyan)' : '1px solid rgba(0, 229, 255, 0.25)',
                  color: m.type === 'user' ? '#ffffff' : 'var(--hud-cyan)',
                  lineHeight: 1.5,
                }}
              >
                {m.type === 'bot' && <span style={{ opacity: 0.6, marginRight: 4 }}>JARVIS &gt;</span>}
                {m.text}
              </div>
            ))}
            {computing && (
              <div
                className="font-mono-hud"
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--hud-cyan)',
                  fontStyle: 'italic',
                }}
              >
                JARVIS &gt; Processing neural query...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Query Chips */}
          <div
            style={{
              padding: '6px 12px',
              borderTop: '1px solid rgba(0, 229, 255, 0.1)',
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            {['Skills', 'Projects', 'Experience', 'Hire'].map((chip) => (
              <button
                key={chip}
                onClick={() => setInput(chip)}
                className="font-mono-hud"
                style={{
                  padding: '3px 8px',
                  borderRadius: 3,
                  fontSize: '0.68rem',
                  background: 'rgba(0, 229, 255, 0.05)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  color: 'var(--hud-cyan)',
                  cursor: 'pointer',
                }}
              >
                [ {chip} ]
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div
            style={{
              padding: '10px 12px',
              borderTop: '1px solid rgba(0, 229, 255, 0.15)',
              display: 'flex',
              gap: 8,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Query J.A.R.V.I.S..."
              className="font-mono-hud"
              style={{
                flex: 1,
                background: 'rgba(0, 229, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: 4,
                padding: '6px 10px',
                color: '#ffffff',
                fontSize: '0.8rem',
                outline: 'none',
              }}
            />
            <button
              onClick={send}
              className="font-hud"
              style={{
                padding: '6px 12px',
                background: 'var(--hud-cyan)',
                color: '#040810',
                border: 'none',
                borderRadius: 4,
                fontWeight: 700,
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              SEND
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="hud-panel"
        style={{
          width: 54,
          height: 54,
          borderRadius: '50%',
          border: '2px solid var(--hud-cyan)',
          background: 'rgba(4, 8, 16, 0.92)',
          color: 'var(--hud-cyan)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          cursor: 'pointer',
          boxShadow: '0 0 25px rgba(0, 229, 255, 0.5), inset 0 0 15px rgba(0, 229, 255, 0.25)',
          transition: 'all 0.25s ease',
        }}
        title="J.A.R.V.I.S. Core Assistant"
        aria-label="Toggle J.A.R.V.I.S."
      >
        {open ? '✕' : '🤖'}
      </button>
    </div>
  );
}
