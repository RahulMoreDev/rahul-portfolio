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

/**
 * Find the best J.A.R.V.I.S.-like English voice (calm, British/articulate cadence)
 */
export function getJarvisVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Look for British English male voices (Paul Bettany J.A.R.V.I.S. profile)
  const britishMale = voices.find(
    (v) =>
      v.lang.toLowerCase().includes('en-gb') &&
      (v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('george') ||
        v.name.toLowerCase().includes('daniel') ||
        v.name.toLowerCase().includes('oliver'))
  );
  if (britishMale) return britishMale;

  // 2. Any en-GB voice
  const britishAny = voices.find((v) => v.lang.toLowerCase().includes('en-gb'));
  if (britishAny) return britishAny;

  // 3. Any English Male voice
  const englishMale = voices.find(
    (v) =>
      v.lang.toLowerCase().startsWith('en') &&
      (v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('natural'))
  );
  if (englishMale) return englishMale;

  // 4. Fallback to any English voice
  return voices.find((v) => v.lang.toLowerCase().startsWith('en')) || voices[0];
}

/**
 * Speak text in J.A.R.V.I.S. voice
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

    // Tuning for authentic J.A.R.V.I.S. cadence (smooth, measured, slightly deep)
    utterance.pitch = 0.94;
    utterance.rate = 1.02;
    utterance.volume = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    playHudSound('beep');
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('SpeechSynthesis error:', e);
  }
}

export function speakFriday(text, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find(
        (candidate) =>
          candidate.lang.toLowerCase().startsWith('en') &&
          /female|samantha|karen|zira|aria|jenny/i.test(candidate.name),
      ) || voices.find((candidate) => candidate.lang.toLowerCase().startsWith('en'));

    if (voice) utterance.voice = voice;
    utterance.pitch = 1.08;
    utterance.rate = 1.04;
    utterance.volume = 1;
    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('F.R.I.D.A.Y. speech synthesis error:', error);
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

  // 6. Direct Email (Gmail platform compose)
  if (t.includes('email') || t.includes('mail') || t.includes('gmail')) {
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=rahulm3503@gmail.com';
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    return {
      speech: "Dispatching transmission line to rahulm3503@gmail.com on the Gmail platform, sir.",
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
