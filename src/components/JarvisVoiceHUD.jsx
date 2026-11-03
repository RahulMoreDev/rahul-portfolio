import { useState, useEffect, useRef } from 'react';
import {
  playHudSound,
  speakJarvis,
  processJarvisVoiceCommand,
} from '../utils/jarvisVoiceEngine';

export default function JarvisVoiceHUD({ onOpenResume, onCloseResume }) {
  const [active, setActive] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [replyText, setReplyText] = useState("Awaiting voice command, sir. Try 'Show projects' or 'Open resume'.");
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef(null);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setListening(true);
      playHudSound('activate');
    };

    rec.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          setTranscript(event.results[i][0].transcript);
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        handleCommand(finalTranscript);
      }
    };

    rec.onerror = (e) => {
      console.warn('SpeechRecognition error:', e.error);
      setListening(false);
    };

    rec.onend = () => {
      setListening(false);
    };

    recognitionRef.current = rec;

    // Listen for custom global event to toggle voice
    const handleVoiceTrigger = (e) => {
      setActive(true);
      if (e.detail?.command) {
        handleCommand(e.detail.command);
      } else {
        startListening();
      }
    };

    window.addEventListener('jarvis-voice-trigger', handleVoiceTrigger);
    return () => {
      window.removeEventListener('jarvis-voice-trigger', handleVoiceTrigger);
      try {
        rec.abort();
      } catch (err) {}
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      setSupported(false);
      return;
    }
    try {
      recognitionRef.current.abort();
      recognitionRef.current.start();
    } catch (e) {
      try {
        recognitionRef.current.start();
      } catch (err) {}
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        playHudSound('deactivate');
      } catch (e) {}
    }
    setListening(false);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommand = (cmdText) => {
    const result = processJarvisVoiceCommand(cmdText, {
      scrollTo,
      openResume: onOpenResume,
      closeResume: onCloseResume,
    });

    setReplyText(result.speech);

    if (soundEnabled) {
      setSpeaking(true);
      speakJarvis(result.speech, () => {
        setSpeaking(false);
      });
    }
  };

  const toggleVoiceMode = () => {
    if (!active) {
      setActive(true);
      startListening();
    } else {
      if (listening) {
        stopListening();
      } else {
        startListening();
      }
    }
  };

  return (
    <>
      {/* Floating HUD Voice Protocol Pill at Bottom-Center */}
      <aside
        aria-label="J.A.R.V.I.S. Voice Controls"
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 990,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          pointerEvents: 'none',
        }}
      >
        {/* Expanded HUD Dialogue Panel when Active */}
        {active && (
          <div
            className="hud-panel hud-corners"
            style={{
              pointerEvents: 'auto',
              width: 'min(460px, 92vw)',
              padding: '16px 20px',
              borderRadius: 8,
              background: 'rgba(4, 8, 16, 0.95)',
              border: '1px solid var(--hud-cyan)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 229, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              animation: 'panelGlow 3s infinite',
            }}
          >
            {/* HUD Status Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 10,
                borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
                marginBottom: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: listening ? '#00e5ff' : speaking ? '#00ffaa' : '#557799',
                    boxShadow: listening ? '0 0 10px #00e5ff' : speaking ? '0 0 10px #00ffaa' : 'none',
                    animation: listening ? 'pulseGreen 0.6s infinite' : 'none',
                  }}
                />
                <span
                  className="font-mono-hud"
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--hud-cyan)',
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                  }}
                >
                  {listening
                    ? 'VOICE PROTOCOL // LISTENING...'
                    : speaking
                    ? 'J.A.R.V.I.S. // TRANSMITTING AUDIO'
                    : 'VOICE PROTOCOL // STANDBY'}
                </span>
              </div>

              {/* Controls (Mute & Close) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  title={soundEnabled ? 'Mute J.A.R.V.I.S. Voice' : 'Unmute J.A.R.V.I.S. Voice'}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: soundEnabled ? 'var(--hud-cyan)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  {soundEnabled ? '🔊' : '🔇'}
                </button>

                <button
                  onClick={() => {
                    stopListening();
                    setActive(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Audio Wave Visualizer Bars */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                height: 24,
                marginBottom: 12,
              }}
            >
              {[12, 22, 16, 28, 14, 26, 18, 10].map((h, i) => (
                <span
                  key={i}
                  style={{
                    width: 3,
                    borderRadius: 2,
                    background: listening
                      ? 'var(--hud-cyan)'
                      : speaking
                      ? '#00ffaa'
                      : 'rgba(0, 229, 255, 0.3)',
                    boxShadow:
                      listening || speaking ? '0 0 8px rgba(0, 229, 255, 0.8)' : 'none',
                    height: listening || speaking ? `${h}px` : '4px',
                    transition: 'all 0.15s ease',
                    animation:
                      listening || speaking
                        ? `equalizer 0.${(i % 4) + 4}s ease-in-out infinite alternate`
                        : 'none',
                  }}
                />
              ))}
            </div>

            {/* Live Transcript / Dialogue Bubble */}
            <div
              style={{
                background: 'rgba(0, 229, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: 4,
                padding: '10px 14px',
                marginBottom: 12,
              }}
            >
              {transcript && (
                <div
                  className="font-mono-hud"
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                    marginBottom: 4,
                  }}
                >
                  USER &gt; &quot;{transcript}&quot;
                </div>
              )}
              <div
                className="font-mono-hud"
                style={{
                  fontSize: '0.82rem',
                  color: '#ffffff',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: 'var(--hud-cyan)', fontWeight: 700, marginRight: 6 }}>
                  JARVIS &gt;
                </span>
                {replyText}
              </div>
            </div>

            {/* Suggested Spoken Directives (Clickable for testing) */}
            <div>
              <div
                className="font-mono-hud"
                style={{
                  fontSize: '0.64rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  marginBottom: 6,
                }}
              >
                // OR SELECT SYSTEM DIRECTIVE:
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[
                  'Show projects',
                  'Open resume',
                  'Skills matrix',
                  'Contact Rahul',
                  'System status',
                ].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setTranscript(cmd);
                      handleCommand(cmd);
                    }}
                    className="font-mono-hud"
                    style={{
                      padding: '4px 10px',
                      borderRadius: 4,
                      fontSize: '0.68rem',
                      background: 'rgba(0, 229, 255, 0.08)',
                      border: '1px solid rgba(0, 229, 255, 0.25)',
                      color: 'var(--hud-cyan)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 229, 255, 0.25)';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)';
                      e.currentTarget.style.color = 'var(--hud-cyan)';
                    }}
                  >
                    🎙️ &quot;{cmd}&quot;
                  </button>
                ))}
              </div>
            </div>

            {!supported && (
              <div
                className="font-mono-hud"
                style={{
                  marginTop: 8,
                  fontSize: '0.68rem',
                  color: '#ffbb44',
                }}
              >
                * Note: Speech recognition requires Chrome/Edge browser permissions. Directives above work universally.
              </div>
            )}
          </div>
        )}

        {/* Floating Voice Trigger Button with Glowing Concentric Reactor */}
        <div style={{ pointerEvents: 'auto' }}>
          <button
            onClick={toggleVoiceMode}
            className="hud-panel"
            style={{
              padding: '10px 22px',
              borderRadius: 30,
              background: listening
                ? 'rgba(0, 229, 255, 0.25)'
                : 'rgba(4, 8, 16, 0.92)',
              border: `2px solid ${listening ? '#00e5ff' : 'rgba(0, 229, 255, 0.45)'}`,
              color: 'var(--hud-cyan)',
              boxShadow: listening
                ? '0 0 35px rgba(0, 229, 255, 0.7), inset 0 0 15px rgba(0, 229, 255, 0.4)'
                : '0 0 20px rgba(0, 229, 255, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              transition: 'all 0.25s ease',
            }}
            aria-label="Toggle J.A.R.V.I.S. Voice Command"
          >
            {/* Pulsing Arc Reactor Mini Icon */}
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: '2px solid var(--hud-cyan)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: listening ? 'pulseGreen 0.7s infinite' : 'none',
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: listening ? '#00e5ff' : '#00ffaa',
                }}
              />
            </span>

            <span
              className="font-hud"
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                color: '#ffffff',
              }}
            >
              {listening ? 'LISTENING TO COMMAND...' : '🎙️ J.A.R.V.I.S. VOICE'}
            </span>

            <span
              className="font-mono-hud"
              style={{
                fontSize: '0.68rem',
                color: 'var(--hud-cyan)',
                background: 'rgba(0, 229, 255, 0.12)',
                padding: '2px 6px',
                borderRadius: 3,
              }}
            >
              {active ? 'ACTIVE' : 'SPEAK'}
            </span>
          </button>
        </div>
      </aside>

      {/* Keyframe animation for equalizer */}
      <style>{`
        @keyframes equalizer {
          0% { height: 4px; }
          100% { height: 26px; }
        }
      `}</style>
    </>
  );
}
