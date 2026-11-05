import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Activity,
  Mic,
  Send,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  processJarvisVoiceCommand,
  speakFriday,
  speakJarvis,
} from '../utils/jarvisVoiceEngine';
import './assistant.css';

const ASSISTANTS = {
  jarvis: {
    name: 'J.A.R.V.I.S.',
    shortName: 'JARVIS',
    greeting: "J.A.R.V.I.S. is online. Ask me about Rahul's portfolio or give me a navigation command.",
    prompts: ['Explain the projects', 'Summarize the skills', 'Show projects'],
  },
  friday: {
    name: 'F.R.I.D.A.Y.',
    shortName: 'FRIDAY',
    greeting: "F.R.I.D.A.Y. is online. I can analyze the listed projects, skills, or help plan your next mission.",
    prompts: ['Analyze a project', 'Help with a mission', 'Run diagnostics'],
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
  return /^(please\s+)?(show|open|go to|navigate to|take me to|scroll to|display|access|return to|back to|close|hide|dismiss)\b/i.test(
    text.trim(),
  ) || /^(home|projects|skills matrix|contact|resume|system status|status|github|linkedin|email)$/i.test(
    text.trim(),
  );
}

function getBrowserDiagnostics() {
  const recognitionSupported =
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  return [
    `Network: ${navigator.onLine ? 'online' : 'offline'}`,
    `Secure context (microphone permission): ${window.isSecureContext ? 'yes' : 'no'}`,
    `Speech recognition: ${recognitionSupported ? 'supported' : 'not supported in this browser'}`,
    `Text-to-speech: ${'speechSynthesis' in window ? 'supported' : 'not supported in this browser'}`,
  ].join('\n');
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

  const submitMessage = useCallback(async (providedText) => {
    const text = (providedText ?? input).trim();
    if (!text || pending) return;
    if (text.length > MAX_INPUT_LENGTH) {
      setError(`Please keep messages to ${MAX_INPUT_LENGTH} characters or fewer.`);
      return;
    }

    const assistantId = activeAssistant;
    const previousMessages = conversations[assistantId];
    setInput('');
    setError('');
    updateConversation(assistantId, (messages) => [
      ...messages,
      { role: 'user', content: text },
    ]);

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

    if (assistantId === 'friday' && /\b(run|show|check)\s+(a\s+)?(system\s+)?diagnostics\b/i.test(text)) {
      const reply = `Browser diagnostics:\n${getBrowserDiagnostics()}`;
      updateConversation(assistantId, (messages) => [
        ...messages,
        { role: 'assistant', content: reply },
      ]);
      if (voiceEnabled) speakFriday(reply.replace(/\n/g, '. '));
      return;
    }

    setPending(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/assistants/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistant: assistantId,
          messages: [
            ...previousMessages,
            { role: 'user', content: text },
          ].slice(-10),
        }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || 'The assistant could not complete the request.');
      }
      if (typeof payload?.reply !== 'string' || !payload.reply.trim()) {
        throw new Error('The assistant returned an invalid response.');
      }

      const reply = payload.reply.trim();
      updateConversation(assistantId, (messages) => [
        ...messages,
        { role: 'assistant', content: reply },
      ]);
      if (voiceEnabled) {
        if (assistantId === 'friday') speakFriday(reply);
        else speakJarvis(reply);
      }
    } catch (requestError) {
      setError(requestError.message || 'The assistant is temporarily unavailable.');
    } finally {
      setPending(false);
    }
  }, [
    activeAssistant,
    conversations,
    input,
    onCloseResume,
    onOpenResume,
    pending,
    updateConversation,
    voiceEnabled,
  ]);

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
      const message = event.error === 'not-allowed' || event.error === 'service-not-allowed'
        ? 'Microphone permission was denied. Allow microphone access in your browser settings or type your message.'
        : event.error === 'audio-capture'
          ? 'No microphone was found. Connect a microphone or type your message.'
          : `Voice recognition failed (${event.error}). You can type your message instead.`;
      setError(message);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (recognitionError) {
      setError(`Could not start voice recognition: ${recognitionError.message}`);
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

  useEffect(() => () => {
    recognitionRef.current?.abort();
    window.speechSynthesis?.cancel();
  }, []);

  const selectAssistant = (assistantId) => {
    if (assistantId === activeAssistant) return;
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    window.speechSynthesis?.cancel();
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
          <header className="assistant-header">
            <div className="assistant-identity">
              <span className="assistant-status-orb" aria-hidden="true">
                <span />
              </span>
              <div>
                <strong>{assistant.name}</strong>
                <span className="assistant-status">
                  {listening ? 'LISTENING' : pending ? 'PROCESSING' : 'READY'}
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

          <div className="assistant-waveform" aria-hidden="true">
            <div className="assistant-wave-ring assistant-wave-ring-outer" />
            <div className="assistant-wave-ring assistant-wave-ring-inner" />
            <Activity size={22} strokeWidth={1.6} />
            <span className="assistant-wave-bars">
              {[0, 1, 2, 3, 4, 5, 6].map((bar) => <i key={bar} />)}
            </span>
          </div>

          <div className="assistant-feed" ref={feedRef} aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${activeAssistant}-${index}`}
                className={`assistant-message assistant-message-${message.role}`}
              >
                <span className="assistant-message-label">
                  {message.role === 'user' ? 'YOU' : assistant.shortName}
                </span>
                <p>{message.content}</p>
              </div>
            ))}
            {pending && <p className="assistant-thinking">Processing request…</p>}
          </div>

          <div className="assistant-prompts" aria-label="Suggested questions">
            {assistant.prompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => void submitMessage(prompt)} disabled={pending}>
                {prompt}
              </button>
            ))}
          </div>

          {error && <p className="assistant-error" role="alert">{error}</p>}

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
              placeholder={listening ? 'Listening…' : `Message ${assistant.name}`}
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
          <p className="assistant-privacy-note">Microphone starts only when you press the mic button.</p>
        </section>
      )}

      <button
        type="button"
        className="assistant-launcher"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
        title={`${assistant.name} / F.R.I.D.A.Y. assistant`}
      >
        {open ? <X size={22} /> : <span className="assistant-launcher-core" aria-hidden="true" />}
      </button>
    </div>
  );
}
