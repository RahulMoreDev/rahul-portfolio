import { useState, useRef, useEffect } from 'react';

const GREETINGS = [
  "👋 Hi! I'm Rahul's portfolio assistant. How can I help you?",
];

const AUTO_REPLIES = {
  skills: "💡 Rahul is skilled in React.js, Java, Spring Boot, Node.js, MySQL, MongoDB, and more!",
  project: "🚀 Rahul has built a CRM App, Journal Management System, Student Management System, and Bank Management System.",
  contact: "📧 You can reach Rahul at rahulmore.engineer@gmail.com or connect on LinkedIn.",
  experience: "💼 Rahul works as a Software Developer / IT Engineer at Raveblue.",
  education: "🎓 Rahul completed B.E. Computer Engineering from Sant Gadge Baba Amravati University with CGPA 8.0.",
  hire: "🤝 Rahul is open to opportunities! Send an email to rahulmore.engineer@gmail.com",
  resume: "📄 You can download Rahul's resume using the Resume button in the navbar.",
  default: "🤔 That's a great question! You can reach Rahul directly at rahulmore.engineer@gmail.com for more details.",
};

function getReply(text) {
  const t = text.toLowerCase();
  if (t.includes('skill') || t.includes('tech') || t.includes('language')) return AUTO_REPLIES.skills;
  if (t.includes('project') || t.includes('work') || t.includes('built')) return AUTO_REPLIES.project;
  if (t.includes('contact') || t.includes('email') || t.includes('reach')) return AUTO_REPLIES.contact;
  if (t.includes('experience') || t.includes('job') || t.includes('company')) return AUTO_REPLIES.experience;
  if (t.includes('education') || t.includes('degree') || t.includes('university')) return AUTO_REPLIES.education;
  if (t.includes('hire') || t.includes('available') || t.includes('freelance')) return AUTO_REPLIES.hire;
  if (t.includes('resume') || t.includes('cv')) return AUTO_REPLIES.resume;
  return AUTO_REPLIES.default;
}

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ type: 'bot', text: GREETINGS[0] }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    setMessages((m) => [...m, { type: 'user', text: txt }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { type: 'bot', text: getReply(txt) }]);
    }, 900);
  };

  return (
    <div className="chat-widget">
      {/* Panel */}
      <div className={`chat-panel ${open ? 'open' : 'closed'}`}>
        {/* Header */}
        <div style={{
          padding: '16px 18px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.1))',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0
          }}>🤖</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc' }}>Portfolio Assistant</div>
            <div style={{ fontSize: '0.72rem', color: '#86efac', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
              Online
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            marginLeft: 'auto', background: 'none', border: 'none',
            color: '#64748b', cursor: 'pointer', fontSize: 18, lineHeight: 1
          }}>×</button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.type}`}>{m.text}</div>
          ))}
          {typing && (
            <div className="chat-msg bot" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: '#6366f1', opacity: 0.7,
                  animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite`
                }} />
              ))}
              <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick questions */}
        <div style={{ padding: '8px 16px', display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {['Skills', 'Projects', 'Hire me'].map(q => (
            <button key={q} onClick={() => { setInput(q); }} style={{
              padding: '4px 10px', borderRadius: 999, fontSize: '0.72rem',
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              color: '#a5b4fc', cursor: 'pointer', transition: 'all 0.2s'
            }}>{q}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', gap: 8
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask me anything..."
            style={{
              flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '8px 12px', color: '#f8fafc', fontSize: '0.85rem',
              outline: 'none', fontFamily: 'inherit'
            }}
          />
          <button onClick={send} style={{
            width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            color: 'white', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>➤</button>
        </div>
      </div>

      {/* Toggle Button */}
      <button className="chat-toggle" onClick={() => setOpen(o => !o)}>
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
}
