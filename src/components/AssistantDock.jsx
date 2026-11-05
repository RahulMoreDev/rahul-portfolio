import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Activity,
  Mic,
  Send,
  Volume2,
  VolumeX,
  X,
  User,
  Compass,
  FileText,
  Mail,
  FolderGit2,
  Code2,
  ExternalLink,
} from 'lucide-react';
import {
  processJarvisVoiceCommand,
  speakFriday,
  speakJarvis,
} from '../utils/jarvisVoiceEngine';
import { personalInfo, projects, education, experience } from '../data/portfolioData';
import './assistant.css';

const ASSISTANTS = {
  jarvis: {
    name: 'J.A.R.V.I.S.',
    shortName: 'JARVIS',
    greeting:
      "J.A.R.V.I.S. is online, visitor. Welcome to Rahul More's cyber dossier. I can provide his background information, inspect his projects, or guide you through his portfolio.",
    prompts: [
      "👤 View Rahul's Info",
      "📁 Explore Projects",
      "⚡ Skills Matrix",
      "📨 Assist to Email",
      "🧭 Start Guided Tour",
    ],
  },
  friday: {
    name: 'F.R.I.D.A.Y.',
    shortName: 'FRIDAY',
    greeting:
      "F.R.I.D.A.Y. is online. Tactical candidate analysis ready. I can brief you on Rahul's technical metrics, engineering experience at Raveblue, or open communication channels.",
    prompts: [
      "📊 Candidate Analysis",
      "🛠️ Project Deep-Dive",
      "🎓 Academic Credentials",
      "📨 Open Email Dashboard",
      "🧭 Guided Tour",
    ],
  },
};

const INITIAL_CONVERSATIONS = Object.fromEntries(
  Object.entries(ASSISTANTS).map(([id, assistant]) => [
    id,
    [{ role: 'assistant', content: assistant.greeting }],
  ]),
);

const API_BASE_URL = (import.meta.env.VITE_ASSISTANT_API_BASE_URL || '').replace(/\/$/, '');
const MAX_INPUT_LENGTH = 1200;

function isNavigationCommand(text) {
  return (
    /^(please\s+)?(show|open|go to|navigate to|take me to|scroll to|display|access|return to|back to|close|hide|dismiss)\b/i.test(
      text.trim(),
    ) ||
    /^(home|projects|skills matrix|skills|contact|resume|system status|status|github|linkedin|email|comms)$/i.test(
      text.trim(),
    )
  );
}

/**
 * Intelligent client-side assistant engine for portfolio visitors
 */
function generateVisitorAssistanceResponse(text, assistantId) {
  const query = text.toLowerCase();
  const isJarvis = assistantId === 'jarvis';
  const prefix = isJarvis ? 'Sir/Visitor' : 'Visitor';

  // 1. Visitor asks to view Rahul's Information / Bio / Dossier
  if (
    query.includes('info') ||
    query.includes('about') ||
    query.includes('who is') ||
    query.includes('profile') ||
    query.includes('bio') ||
    query.includes('candidate analysis')
  ) {
    return {
      text:
        `📋 RAHUL MORE — CANDIDATE TELEMETRY BRIEFING:\n\n` +
        `• Full Name: Rahul More\n` +
        `• Current Role: Full Stack Software Developer\n` +
        `• Core Stack: Java 21, Spring Boot, React.js, Node.js, Express, REST APIs, MySQL, MongoDB\n` +
        `• Education: B.E. in Computer Engineering from Sant Gadge Baba Amravati University (CGPA: 8.0 / 10)\n` +
        `• Industry Experience: Software Developer at Raveblue — engineered responsive React user interfaces & secure Spring Boot REST API layers\n` +
        `• Location: Maharashtra, India\n` +
        `• Availability: Available for Full-Time Software Engineering roles & High-Impact Contracts.\n\n` +
        `I can open his full ATS Resume, guide you to his Projects, or launch the Email Dashboard to message him directly.`,
      actions: [
        { label: '📄 Open Resume Modal', type: 'resume' },
        { label: '📁 Inspect Projects', type: 'scroll', target: 'projects' },
        { label: '📨 Email Rahul Directly', type: 'email' },
      ],
    };
  }

  // 2. Projects & Work
  if (
    query.includes('project') ||
    query.includes('work') ||
    query.includes('crm') ||
    query.includes('journal') ||
    query.includes('student') ||
    query.includes('bank')
  ) {
    return {
      text:
        `🚀 RAHUL'S DEPLOYED PROJECT REPOSITORY:\n\n` +
        `1. CRM Application (Full Stack): React frontend + Node.js REST API with customer lifecycle workflows and pipeline analytics.\n` +
        `2. Journal Management System (Backend & APIs): Java & Spring Boot microservice following Controller-Service-Repository architecture, tested via Postman.\n` +
        `3. Student Management System (Java Systems): Academic management system built with Java, Hibernate ORM, and normalized MySQL tables.\n` +
        `4. Bank Management System (Java Systems): Secure transaction and account engine implementing core OOP principles with ACID transactional safety.\n\n` +
        `Would you like me to scroll down to the Projects section or open a live demonstration?`,
      actions: [
        { label: '📁 View Project Cards', type: 'scroll', target: 'projects' },
        { label: '⌥ Visit GitHub Vault', type: 'github' },
      ],
    };
  }

  // 3. Skills Matrix
  if (
    query.includes('skill') ||
    query.includes('tech') ||
    query.includes('stack') ||
    query.includes('language') ||
    query.includes('java') ||
    query.includes('react')
  ) {
    return {
      text:
        `⚡ TECHNICAL COMPETENCY MATRIX:\n\n` +
        `• Frontend (Advanced): React.js, JavaScript (ES6+), Tailwind CSS, HTML5, Responsive UI\n` +
        `• Backend (Advanced): Java 21, Spring Boot, REST APIs, Node.js, Express.js\n` +
        `• Databases (Advanced): MySQL, MongoDB, SQL Optimization, Hibernate/JPA\n` +
        `• Tooling & DevOps: Git, GitHub, Postman, IntelliJ IDEA, VS Code, Maven\n` +
        `• Core CS: Object-Oriented Programming (OOP), Data Structures & Algorithms, RESTful Architecture`,
      actions: [
        { label: '⚡ View Skill Gauges', type: 'scroll', target: 'skills' },
        { label: '📄 View Verified Resume', type: 'resume' },
      ],
    };
  }

  // 4. Education & Academic record
  if (
    query.includes('education') ||
    query.includes('college') ||
    query.includes('degree') ||
    query.includes('cgpa') ||
    query.includes('marks') ||
    query.includes('academic')
  ) {
    return {
      text:
        `🎓 ACADEMIC TELEMETRY ARCHIVE:\n\n` +
        `1. Bachelor of Engineering (Computer Engineering)\n` +
        `   • Institution: Sant Gadge Baba Amravati University\n` +
        `   • Score: CGPA 8.0 / 10 (2022 – 2025)\n\n` +
        `2. Diploma in Engineering\n` +
        `   • Institution: Government Polytechnic Hingoli\n` +
        `   • Score: 70.0% (2020 – 2021)\n\n` +
        `3. Higher Secondary Certificate (Science Stream): 54.30%\n` +
        `4. Secondary School Certificate: 74.80%`,
      actions: [
        { label: '📜 View Education Section', type: 'scroll', target: 'experience' },
        { label: '📄 Open Printable Resume', type: 'resume' },
      ],
    };
  }

  // 5. Experience / Industry / Raveblue
  if (
    query.includes('experience') ||
    query.includes('raveblue') ||
    query.includes('job') ||
    query.includes('company')
  ) {
    return {
      text:
        `💼 INDUSTRY MISSION LOG — RAVEBLUE:\n\n` +
        `Role: Software Developer / IT Engineer\n` +
        `• Engineered responsive user interfaces and modular frontend components using React.js and modern JavaScript standards.\n` +
        `• Developed and tested secure RESTful APIs with Spring Boot and Node.js for reliable client-server data flow.\n` +
        `• Architected database schemas and optimized SQL queries in MySQL.\n` +
        `• Participated actively in agile sprints, code reviews, and system debugging.`,
      actions: [
        { label: '📜 View Timeline Section', type: 'scroll', target: 'experience' },
        { label: '📨 Contact About a Role', type: 'email' },
      ],
    };
  }

  // 6. Guided Tour
  if (
    query.includes('tour') ||
    query.includes('guide') ||
    query.includes('walkthrough') ||
    query.includes('show me around')
  ) {
    return {
      text:
        `🧭 INITIATING GUIDED PORTFOLIO PROTOCOL:\n\n` +
        `I am your interactive tour guide for Rahul's portfolio.\n` +
        `• Step 1: Profile & Bio (Section // 01)\n` +
        `• Step 2: Capabilities & Neon Arc Skill Matrix (Section // 02)\n` +
        `• Step 3: Deployed Project Files & Demos (Section // 03)\n` +
        `• Step 4: Industry Experience & Education Logs (Section // 04)\n` +
        `• Step 5: Direct Transmission Channels & Email Dashboard (Section // 05)\n\n` +
        `Use the buttons below to tour any section instantly.`,
      actions: [
        { label: '01 Profile', type: 'scroll', target: 'about' },
        { label: '02 Skills', type: 'scroll', target: 'skills' },
        { label: '03 Projects', type: 'scroll', target: 'projects' },
        { label: '04 Experience', type: 'scroll', target: 'experience' },
        { label: '05 Contact & Email', type: 'scroll', target: 'contact' },
      ],
    };
  }

  // 7. Email / Contact Assistance
  if (
    query.includes('email') ||
    query.includes('contact') ||
    query.includes('hire') ||
    query.includes('message') ||
    query.includes('reach') ||
    query.includes('assist to email')
  ) {
    return {
      text:
        `📨 DIRECT TRANSMISSION PROTOCOL ACTIVATED:\n\n` +
        `Rahul More is actively reviewing opportunities. You can use our newly integrated Email Transmission Dashboard to choose your role (e.g. Developer, Sales Executive, Recruiter, Founder) and dispatch your message directly to rahulm3503@gmail.com.`,
      actions: [
        { label: '📨 Open Email Compose Dashboard', type: 'email' },
        { label: '📍 Go to Contact Section', type: 'scroll', target: 'contact' },
      ],
    };
  }

  // Default Assistant Response
  return {
    text:
      `${isJarvis ? 'Command received, visitor.' : 'Signal received.'} ` +
      `Rahul More is a Full Stack Developer (Java, Spring Boot, React, Node.js). ` +
      `How can I assist you today? You can ask to view his background information, inspect his projects, or dispatch an email inquiry.`,
    actions: [
      { label: "👤 View Rahul's Info", type: 'prompt', value: "View Rahul's Info" },
      { label: '📁 Projects', type: 'scroll', target: 'projects' },
      { label: '📨 Email Dashboard', type: 'email' },
    ],
  };
}

export default function AssistantDock({ onOpenResume, onCloseResume }) {
  const [activeAssistant, setActiveAssistant] = useState('jarvis');
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const feedRef = useRef(null);

  const updateConversation = useCallback((assistantId, update) => {
    setConversations((current) => ({
      ...current,
      [assistantId]: update(current[assistantId]),
    }));
  }, []);

  const executeAction = useCallback(
    (action) => {
      if (!action) return;
      if (action.type === 'scroll') {
        const el = document.getElementById(action.target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action.type === 'resume') {
        if (onOpenResume) onOpenResume();
      } else if (action.type === 'email') {
        window.dispatchEvent(new CustomEvent('jarvis-open-email'));
      } else if (action.type === 'github') {
        window.open('https://github.com/RahulMoreDev', '_blank', 'noopener,noreferrer');
      } else if (action.type === 'prompt') {
        void submitMessage(action.value);
      }
    },
    [onOpenResume],
  );

  const submitMessage = useCallback(
    async (providedText) => {
      const text = (providedText ?? input).trim();
      if (!text || pending) return;
      if (text.length > MAX_INPUT_LENGTH) {
        setError(`Please keep messages to ${MAX_INPUT_LENGTH} characters or fewer.`);
        return;
      }

      const assistantId = activeAssistant;
      setInput('');
      setError('');

      // Add user message to conversation
      updateConversation(assistantId, (messages) => [
        ...messages,
        { role: 'user', content: text },
      ]);

      // 1. Check for standard navigation commands
      if (isNavigationCommand(text)) {
        const result = processJarvisVoiceCommand(text, {
          scrollTo: (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
          openResume: onOpenResume,
          closeResume: onCloseResume,
        });

        updateConversation(assistantId, (messages) => [
          ...messages,
          { role: 'assistant', content: result.speech },
        ]);
        if (voiceEnabled) {
          if (assistantId === 'friday') speakFriday(result.speech);
          else speakJarvis(result.speech);
        }
        return;
      }

      // 2. Intelligent visitor assistance response
      const visitorResponse = generateVisitorAssistanceResponse(text, assistantId);

      // Try remote API if configured; otherwise use rich client knowledge engine
      if (API_BASE_URL) {
        setPending(true);
        try {
          const response = await fetch(`${API_BASE_URL}/api/assistants/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              assistant: assistantId,
              messages: [{ role: 'user', content: text }],
            }),
          });
          const payload = await response.json().catch(() => null);
          if (response.ok && typeof payload?.reply === 'string' && payload.reply.trim()) {
            const reply = payload.reply.trim();
            updateConversation(assistantId, (messages) => [
              ...messages,
              { role: 'assistant', content: reply, actions: visitorResponse.actions },
            ]);
            if (voiceEnabled) {
              if (assistantId === 'friday') speakFriday(reply);
              else speakJarvis(reply);
            }
            return;
          }
        } catch (e) {
          // Fall through to client assistant engine
        } finally {
          setPending(false);
        }
      }

      // Direct client response with actions
      updateConversation(assistantId, (messages) => [
        ...messages,
        {
          role: 'assistant',
          content: visitorResponse.text,
          actions: visitorResponse.actions,
        },
      ]);

      if (voiceEnabled) {
        // Read the first 2 concise sentences for audio clarity
        const speechSnippet = visitorResponse.text.split('\n')[0] || visitorResponse.text;
        if (assistantId === 'friday') speakFriday(speechSnippet);
        else speakJarvis(speechSnippet);
      }
    },
    [activeAssistant, input, onCloseResume, onOpenResume, pending, updateConversation, voiceEnabled],
  );

  const startListening = useCallback(() => {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      setError('Voice recognition is not supported in this browser. You can still type your message.');
      return;
    }
    if (!window.isSecureContext) {
      setError('Microphone access requires HTTPS or localhost. You can still type your message.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => {
      setError('');
      setListening(true);
    };
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (transcript) {
        setInput(transcript);
        void submitMessage(transcript);
      }
    };
    recognition.onerror = (event) => {
      setError(`Voice recognition status: ${event.error}. You can type your request directly.`);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      setError('Could not initialize microphone.');
      setListening(false);
    }
  }, [submitMessage]);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: 'smooth' });
  }, [conversations, activeAssistant, pending]);

  useEffect(() => {
    const handleVoiceTrigger = (event) => {
      setOpen(true);
      if (event.detail?.command) {
        void submitMessage(event.detail.command);
      } else {
        startListening();
      }
    };
    window.addEventListener('jarvis-voice-trigger', handleVoiceTrigger);
    return () => window.removeEventListener('jarvis-voice-trigger', handleVoiceTrigger);
  }, [startListening, submitMessage]);

  const selectAssistant = (assistantId) => {
    if (assistantId === activeAssistant) return;
    recognitionRef.current?.abort();
    setListening(false);
    setActiveAssistant(assistantId);
    setError('');
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    startListening();
  };

  const assistant = ASSISTANTS[activeAssistant];
  const messages = conversations[activeAssistant];

  return (
    <div className="assistant-dock" data-assistant={activeAssistant}>
      {open && (
        <section
          className="assistant-panel"
          role="dialog"
          aria-label={`${assistant.name} portfolio assistant`}
        >
          {/* Header */}
          <header className="assistant-header">
            <div className="assistant-identity">
              <span className="assistant-status-orb" aria-hidden="true">
                <span />
              </span>
              <div>
                <strong>{assistant.name}</strong>
                <span className="assistant-status">
                  {listening ? 'LISTENING' : pending ? 'PROCESSING' : 'VISITOR ASSIST READY'}
                </span>
              </div>
            </div>
            <div className="assistant-header-actions">
              <button
                type="button"
                className="assistant-icon-button"
                onClick={() => setVoiceEnabled((enabled) => !enabled)}
                aria-label={voiceEnabled ? 'Mute spoken responses' : 'Enable spoken responses'}
                title={voiceEnabled ? 'Mute voice responses' : 'Enable voice responses'}
              >
                {voiceEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
              </button>
              <button
                type="button"
                className="assistant-icon-button"
                onClick={() => {
                  recognitionRef.current?.abort();
                  setListening(false);
                  setOpen(false);
                }}
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Switcher */}
          <div className="assistant-switcher" role="group" aria-label="Choose assistant">
            {Object.entries(ASSISTANTS).map(([id, item]) => (
              <button
                key={id}
                type="button"
                className={id === activeAssistant ? 'is-selected' : ''}
                onClick={() => selectAssistant(id)}
                aria-pressed={id === activeAssistant}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Waveform */}
          <div className="assistant-waveform" aria-hidden="true">
            <div className="assistant-wave-ring assistant-wave-ring-outer" />
            <div className="assistant-wave-ring assistant-wave-ring-inner" />
            <Activity size={22} strokeWidth={1.6} />
            <span className="assistant-wave-bars">
              {[0, 1, 2, 3, 4, 5, 6].map((bar) => (
                <i key={bar} />
              ))}
            </span>
          </div>

          {/* Chat feed */}
          <div className="assistant-feed" ref={feedRef} aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${activeAssistant}-${index}`}
                className={`assistant-message assistant-message-${message.role}`}
              >
                <span className="assistant-message-label">
                  {message.role === 'user' ? 'YOU' : assistant.shortName}
                </span>
                <p style={{ whiteSpace: 'pre-line' }}>{message.content}</p>

                {/* Interactive action pills for visitors */}
                {message.actions && message.actions.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginTop: 8,
                      paddingTop: 6,
                      borderTop: '1px solid rgba(var(--assistant-accent-rgb), 0.2)',
                    }}
                  >
                    {message.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => executeAction(act)}
                        className="font-mono-hud"
                        style={{
                          padding: '4px 10px',
                          borderRadius: 4,
                          fontSize: '0.68rem',
                          background: 'rgba(var(--assistant-accent-rgb), 0.12)',
                          border: '1px solid var(--assistant-accent)',
                          color: '#ffffff',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {pending && <p className="assistant-thinking">Accessing dossier telemetry…</p>}
          </div>

          {/* Quick prompt pills */}
          <div className="assistant-prompts" aria-label="Suggested questions">
            {assistant.prompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void submitMessage(prompt)}
                disabled={pending}
              >
                {prompt}
              </button>
            ))}
          </div>

          {error && (
            <p className="assistant-error" role="alert">
              {error}
            </p>
          )}

          {/* Message input composer */}
          <form
            className="assistant-composer"
            onSubmit={(event) => {
              event.preventDefault();
              void submitMessage();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={MAX_INPUT_LENGTH}
              placeholder={listening ? 'Listening…' : `Ask ${assistant.name} about Rahul...`}
              aria-label={`Message ${assistant.name}`}
            />
            <button
              type="button"
              className={`assistant-icon-button assistant-mic-button ${listening ? 'is-listening' : ''}`}
              onClick={toggleListening}
              aria-label={listening ? 'Stop voice input' : 'Start voice input'}
              aria-pressed={listening}
              title={listening ? 'Stop listening' : 'Start voice input'}
            >
              <Mic size={17} />
            </button>
            <button
              type="submit"
              className="assistant-send-button"
              disabled={pending || !input.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="assistant-privacy-note">
            Visitor Assist Ready · J.A.R.V.I.S. & F.R.I.D.A.Y. Cyber Protocol
          </p>
        </section>
      )}

      {/* Floating Launcher Button */}
      <button
        type="button"
        className="assistant-launcher"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
        title={`${assistant.name} / F.R.I.D.A.Y. Visitor Assistant`}
      >
        {open ? <X size={22} /> : <span className="assistant-launcher-core" aria-hidden="true" />}
      </button>
    </div>
  );
}
