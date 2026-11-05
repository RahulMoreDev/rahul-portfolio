import { useState } from 'react';

// HUD Components
import Navbar from './components/Navbar';
import MouseGlow from './components/MouseGlow';
import ParticleCanvas from './components/ParticleCanvas';
import AssistantDock from './components/AssistantDock';
import ResumeModal from './components/ResumeModal';

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

  return (
    <>
      {/* 1. CRT Scanline Overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* 2. Interactive Spotlight Glow following Mouse */}
      <MouseGlow />

      {/* 3. HTML5 Particle Network Canvas */}
      <ParticleCanvas />

      {/* 4. Top J.A.R.V.I.S. Monogram Navbar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* 5. Main Cyber-HUD Dossier Content */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* 6. Footer System Telemetry */}
      <Footer />

      {/* 7. Floating J.A.R.V.I.S. / F.R.I.D.A.Y. assistant */}
      <AssistantDock
        onOpenResume={() => setResumeOpen(true)}
        onCloseResume={() => setResumeOpen(false)}
      />

      {/* 8. Full Document ATS-Standard Resume Modal */}
      {resumeOpen && (
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      )}
    </>
  );
}
