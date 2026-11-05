import { useState, useEffect } from 'react';

// HUD Components
import Navbar from './components/Navbar';
import MouseGlow from './components/MouseGlow';
import ParticleCanvas from './components/ParticleCanvas';
import AssistantDock from './components/AssistantDock';
import ResumeModal from './components/ResumeModal';
import EmailDashboardModal from './components/EmailDashboardModal';

// J.A.R.V.I.S. HUD Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  // Global listener so any component or voice assistant can trigger the email compose dashboard
  useEffect(() => {
    const handleOpenEmail = () => setEmailOpen(true);
    window.addEventListener('jarvis-open-email', handleOpenEmail);
    return () => window.removeEventListener('jarvis-open-email', handleOpenEmail);
  }, []);

  return (
    <>
      {/* 1. CRT Scanline Overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* 2. Interactive Spotlight Glow following Mouse */}
      <MouseGlow />

      {/* 3. HTML5 Particle Network Canvas */}
      <ParticleCanvas />

      {/* 4. Top J.A.R.V.I.S. Monogram Navbar */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenEmail={() => setEmailOpen(true)}
      />

      {/* 5. Main Cyber-HUD Dossier Content */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onOpenEmail={() => setEmailOpen(true)}
        />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact onOpenEmail={() => setEmailOpen(true)} />
      </main>

      {/* 6. Footer System Telemetry */}
      <Footer onOpenEmail={() => setEmailOpen(true)} />

      {/* 7. Floating J.A.R.V.I.S. / F.R.I.D.A.Y. assistant */}
      <AssistantDock
        onOpenResume={() => setResumeOpen(true)}
        onCloseResume={() => setResumeOpen(false)}
      />

      {/* 8. Full Document ATS-Standard Resume Modal */}
      {resumeOpen && (
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      )}

      {/* 9. J.A.R.V.I.S. Email Transmission Compose Dashboard */}
      {emailOpen && (
        <EmailDashboardModal isOpen={emailOpen} onClose={() => setEmailOpen(false)} />
      )}
    </>
  );
}
