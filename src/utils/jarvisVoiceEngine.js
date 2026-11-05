/**
 * J.A.R.V.I.S. Audio & Voice Command Engine
 * Provides authentic Web Audio HUD sound effects, Web Speech Recognition,
 * and Speech Synthesis tuned for an authentic J.A.R.V.I.S. persona.
 */

// Web Audio API Sound Synthesizer for HUD Sound Effects
let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play authentic futuristic J.A.R.V.I.S. sound blips
 */
export function playHudSound(type = 'activate') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'activate') {
      // Dual tone ascending chirp (Iron Man HUD online)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'success') {
      // Harmonic triple chirp
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    } else if (type === 'deactivate') {
      // Descending power down blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'beep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    // Audio context silently fails if restricted
  }
}

// Pre-warm SpeechSynthesis voices cache across platforms
let cachedVoices = [];
if (typeof window !== 'undefined' && window.speechSynthesis) {
  const loadVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices() || [];
    } catch (e) {
      cachedVoices = [];
    }
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

// Voice tokens to distinguish between Male (Men) and Female voices
const FEMALE_VOICE_TOKENS = [
  'female', 'woman', 'zira', 'samantha', 'karen', 'victoria', 'aria', 'jenny',
  'susan', 'catherine', 'hazel', 'heera', 'veena', 'fiona', 'moira', 'tessa',
  'ava', 'emma', 'stephanie', 'lisa', 'clara', 'alice', 'salli', 'joanna',
  'ivy', 'kendra', 'kimberly', 'amy', 'zoe', 'natasha', 'helena', '#female'
];

const MALE_VOICE_TOKENS = [
  'male', 'man', 'david', 'george', 'daniel', 'mark', 'oliver', 'ryan',
  'rishi', 'alex', 'fred', 'arthur', 'guy', 'brian', 'william', 'james',
  'matthew', 'justin', 'joey', 'russell', 'tom', 'ben', 'paul', '#male'
];

function isIdentifiedFemaleVoice(voice) {
  if (!voice) return false;
  const str = `${voice.name} ${voice.voiceURI}`.toLowerCase();
  return FEMALE_VOICE_TOKENS.some((tok) => str.includes(tok));
}

function isIdentifiedMaleVoice(voice) {
  if (!voice) return false;
  const str = `${voice.name} ${voice.voiceURI}`.toLowerCase();
  return MALE_VOICE_TOKENS.some((tok) => str.includes(tok));
}

function getAllVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  const list = window.speechSynthesis.getVoices();
  return (list && list.length > 0) ? list : cachedVoices;
}

/**
 * Find the best J.A.R.V.I.S. MALE voice (calm, British/articulate masculine cadence)
 */
export function getJarvisVoice() {
  const voices = getAllVoices();
  if (!voices || voices.length === 0) return null;

  const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));

  // 1. British / UK English MALE voice (Paul Bettany J.A.R.V.I.S. signature profile)
  const britishMale = englishVoices.find(
    (v) =>
      v.lang.toLowerCase().includes('gb') &&
      isIdentifiedMaleVoice(v) &&
      !isIdentifiedFemaleVoice(v)
  );
  if (britishMale) return britishMale;

  // 2. Any English MALE voice (David, George, Daniel, Mark, etc.)
  const englishMale = englishVoices.find(
    (v) => isIdentifiedMaleVoice(v) && !isIdentifiedFemaleVoice(v)
  );
  if (englishMale) return englishMale;

  // 3. Fallback: Any English voice that is NOT explicitly female
  const nonFemaleEnglish = englishVoices.find((v) => !isIdentifiedFemaleVoice(v));
  if (nonFemaleEnglish) return nonFemaleEnglish;

  // 4. General fallback
  return englishVoices[0] || voices[0];
}

/**
 * Find the best F.R.I.D.A.Y. FEMALE voice (Irish / British feminine cadence)
 */
export function getFridayVoice() {
  const voices = getAllVoices();
  if (!voices || voices.length === 0) return null;

  const englishVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));

  // 1. Irish / British English FEMALE voice (Kerry Condon F.R.I.D.A.Y. profile: Moira, Hazel, etc.)
  const irishOrBritishFemale = englishVoices.find(
    (v) =>
      (v.lang.toLowerCase().includes('ie') || v.lang.toLowerCase().includes('gb')) &&
      isIdentifiedFemaleVoice(v) &&
      !isIdentifiedMaleVoice(v)
  );
  if (irishOrBritishFemale) return irishOrBritishFemale;

  // 2. Any English FEMALE voice (Samantha, Karen, Zira, Aria, Jenny, etc.)
  const englishFemale = englishVoices.find(
    (v) => isIdentifiedFemaleVoice(v) && !isIdentifiedMaleVoice(v)
  );
  if (englishFemale) return englishFemale;

  // 3. Fallback: Any English voice that is NOT explicitly male
  const nonMaleEnglish = englishVoices.find((v) => !isIdentifiedMaleVoice(v));
  if (nonMaleEnglish) return nonMaleEnglish;

  // 4. General fallback
  return englishVoices[0] || voices[0];
}

/**
 * Speak text in J.A.R.V.I.S. MALE voice (deep, articulate, British-inspired cadence)
 */
export function speakJarvis(text, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getJarvisVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Tuning for authentic J.A.R.V.I.S. MALE persona (deep, calm, measured masculine timbre)
    utterance.pitch = 0.88;
    utterance.rate = 1.0;
    utterance.volume = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    playHudSound('beep');
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('J.A.R.V.I.S. SpeechSynthesis error:', e);
  }
}

/**
 * Speak text in F.R.I.D.A.Y. FEMALE voice (crisp, energetic feminine AI cadence)
 */
export function speakFriday(text, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getFridayVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Tuning for authentic F.R.I.D.A.Y. FEMALE persona (bright, clear, crisp feminine timbre)
    utterance.pitch = 1.18;
    utterance.rate = 1.05;
    utterance.volume = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    playHudSound('beep');
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('F.R.I.D.A.Y. SpeechSynthesis error:', error);
  }
}

/**
 * Process voice commands and return action result
 */
export function processJarvisVoiceCommand(commandText, actions = {}) {
  const t = commandText.toLowerCase().trim();
  playHudSound('success');

  // 1. Projects / Deployments
  if (
    t.includes('project') ||
    t.includes('work') ||
    t.includes('deployment') ||
    t.includes('portfolio') ||
    t.includes('app')
  ) {
    if (actions.scrollTo) actions.scrollTo('projects');
    return {
      speech: "Right away, sir. Accessing Rahul's project deployment files.",
      action: 'projects',
    };
  }

  // 2. Skills / Capabilities
  if (
    t.includes('skill') ||
    t.includes('tech') ||
    t.includes('stack') ||
    t.includes('matrix') ||
    t.includes('language') ||
    t.includes('capability') ||
    t.includes('java') ||
    t.includes('react')
  ) {
    if (actions.scrollTo) actions.scrollTo('skills');
    return {
      speech: "Displaying technical skill matrix, sir. Rahul specializes in Java, Spring Boot, React, and Node.js.",
      action: 'skills',
    };
  }

  // 3. About / Background / Experience
  if (
    t.includes('about') ||
    t.includes('who is rahul') ||
    t.includes('bio') ||
    t.includes('profile') ||
    t.includes('experience') ||
    t.includes('raveblue') ||
    t.includes('education') ||
    t.includes('college')
  ) {
    if (actions.scrollTo) actions.scrollTo('about');
    return {
      speech: "Accessing Rahul More's engineering dossier and background archives, sir.",
      action: 'about',
    };
  }

  // 4. Resume Modal
  if (t.includes('resume') || t.includes('cv') || t.includes('dossier')) {
    if (t.includes('close') || t.includes('hide') || t.includes('dismiss')) {
      if (actions.closeResume) actions.closeResume();
      return {
        speech: "Dismissing resume dossier, sir.",
        action: 'close_resume',
      };
    }
    if (actions.openResume) actions.openResume();
    return {
      speech: "Right away, sir. Opening Rahul More's ATS technical resume.",
      action: 'resume',
    };
  }

  // 5. Contact / Hire / Comms
  if (
    t.includes('contact') ||
    t.includes('hire') ||
    t.includes('message') ||
    t.includes('reach') ||
    t.includes('call')
  ) {
    if (actions.scrollTo) actions.scrollTo('contact');
    return {
      speech: "Directing you to secure communication channels, sir. Transmission lines are active 24/7.",
      action: 'contact',
    };
  }

  // 6. Direct Email (Dashboard compose)
  if (t.includes('email') || t.includes('mail') || t.includes('gmail') || t.includes('compose')) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('jarvis-open-email'));
    }
    return {
      speech: "Opening J.A.R.V.I.S. email transmission compose dashboard for rahulm3503@gmail.com, sir.",
      action: 'email',
    };
  }

  // 7. GitHub Vault
  if (t.includes('github') || t.includes('source') || t.includes('repo') || t.includes('code')) {
    window.open('https://github.com/RahulMoreDev', '_blank', 'noopener,noreferrer');
    return {
      speech: "Accessing Rahul's GitHub code repository, sir.",
      action: 'github',
    };
  }

  // 8. LinkedIn Terminal
  if (t.includes('linkedin') || t.includes('network')) {
    window.open('https://www.linkedin.com/in/rahul-more-3849a4377', '_blank', 'noopener,noreferrer');
    return {
      speech: "Navigating to Rahul's LinkedIn profile, sir.",
      action: 'linkedin',
    };
  }

  // 9. Home / Scroll to top
  if (
    t.includes('top') ||
    t.includes('home') ||
    t.includes('start') ||
    t.includes('overview') ||
    t.includes('main')
  ) {
    if (actions.scrollTo) actions.scrollTo('home');
    return {
      speech: "Returning to main system telemetry overview, sir.",
      action: 'home',
    };
  }

  // 10. System Status / Diagnostics
  if (t.includes('status') || t.includes('diagnostic') || t.includes('system') || t.includes('health')) {
    return {
      speech: "Portfolio assistant is online. I can navigate the portfolio or answer questions using the information published here, sir.",
      action: 'status',
    };
  }

  // 11. Identity / About JARVIS
  if (t.includes('who are you') || t.includes('what are you') || t.includes('your name') || t.includes('hello') || t.includes('hi jarvis')) {
    return {
      speech: "I am J.A.R.V.I.S., Rahul More's personal system intelligence assistant. Always at your service, sir.",
      action: 'identity',
    };
  }

  // 12. Fallback general query
  return {
    speech: `Command acknowledged, sir: "${commandText}". For specific directives, ask to inspect projects, view skills, or open Rahul's resume.`,
    action: 'query',
  };
}
