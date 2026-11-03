import { useState, useRef, useEffect } from 'react';
import { playHudSound, speakJarvis } from '../utils/jarvisVoiceEngine';

const JARVIS_GREETING = "J.A.R.V.I.S. Protocol active. Welcome to Rahul More's system core. How may I assist you, sir?";

const JARVIS_REPLIES = {
  skills: "System diagnostics report proficiency in Java, Spring Boot, React.js, Node.js, REST APIs, MySQL, and MongoDB.",
  projects: "Rahul's active deployment files include: CRM Application, Journal Management System, Student Management System, and Bank Management System.",
  experience: "Rahul currently engineers high-performance web applications and secure RESTful services at Raveblue.",
  education: "Credentials verified: Bachelor of Computer Engineering from Sant Gadge Baba Amravati University with 8.0 CGPA.",
  hire: "Rahul is fully available for full-stack and backend roles. You may dispatch an encrypted transmission to rahulm3503@gmail.com.",
  contact: "Direct comms frequency: rahulm3503@gmail.com | LinkedIn: linkedin.com/in/rahul-more-3849a4377",
  resume: "Resume protocols ready. You can trigger the 'VIEW RESUME' button in the navigation bar to inspect the ATS-standard dossier.",
  default: "Command acknowledged. For custom inquiries or employment opportunities, direct transmission to rahulm3503@gmail.com is advised.",
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
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, computing]);

  // Speech recognition setup for chatbox mic
  useEffect(() => {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setIsListening(true);
      playHudSound('activate');
    };

    rec.onresult = (e) => {
      const speech = e.results[0][0].transcript;
      setInput(speech);
      sendQuery(speech);
    };

    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);

    recognitionRef.current = rec;
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {}
    }
  };

  const sendQuery = (overrideText) => {
    const txt = (overrideText !== undefined ? overrideText : input).trim();
    if (!txt) return;
    setMessages((m) => [...m, { type: 'user', text: txt }]);
    setInput('');
    setComputing(true);
    playHudSound('beep');

    setTimeout(() => {
      const reply = getJarvisReply(txt);
      setComputing(false);
      setMessages((m) => [...m, { type: 'bot', text: reply }]);
      if (voiceEnabled) {
        speakJarvis(reply);
      }
    }, 700);
  };

  const handleOpenToggle = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      playHudSound('activate');
      if (voiceEnabled && messages.length === 1) {
        speakJarvis(JARVIS_GREETING);
      }
    } else {
      playHudSound('deactivate');
    }
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
            width: 'min(380px, 92vw)',
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

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                title={voiceEnabled ? 'Mute Voice' : 'Unmute Voice'}
                style={{
                  background: 'none',
                  border: 'none',
                  color: voiceEnabled ? 'var(--hud-cyan)' : 'var(--text-muted)',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {voiceEnabled ? '🔊' : '🔇'}
              </button>

              <button
                onClick={handleOpenToggle}
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
                onClick={() => {
                  setInput(chip);
                  sendQuery(chip);
                }}
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

          {/* Input Box with Voice Mic Button */}
          <div
            style={{
              padding: '10px 12px',
              borderTop: '1px solid rgba(0, 229, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
              placeholder={isListening ? 'Listening to voice...' : 'Query J.A.R.V.I.S...'}
              className="font-mono-hud"
              style={{
                flex: 1,
                background: 'rgba(0, 229, 255, 0.05)',
                border: isListening ? '1px solid #00ffaa' : '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: 4,
                padding: '6px 10px',
                color: '#ffffff',
                fontSize: '0.8rem',
                outline: 'none',
              }}
            />

            {/* Mic Button */}
            <button
              onClick={toggleMic}
              title={isListening ? 'Stop Listening' : 'Speak to J.A.R.V.I.S.'}
              style={{
                padding: '6px 10px',
                background: isListening ? 'rgba(0, 255, 170, 0.2)' : 'rgba(0, 229, 255, 0.1)',
                border: `1px solid ${isListening ? '#00ffaa' : 'rgba(0, 229, 255, 0.3)'}`,
                color: isListening ? '#00ffaa' : 'var(--hud-cyan)',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: '0.85rem',
                animation: isListening ? 'pulseGreen 0.7s infinite' : 'none',
              }}
            >
              🎙️
            </button>

            {/* Send Button */}
            <button
              onClick={() => sendQuery()}
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
        onClick={handleOpenToggle}
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
