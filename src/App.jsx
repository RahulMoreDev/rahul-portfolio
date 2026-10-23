import { useState } from 'react';

// Layout
import Navbar from './components/Navbar';
import CursorGlow from './components/CursorGlow';
import ChatBox from './components/ChatBox';
import ResumeModal from './components/ResumeModal';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Scroll hook
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  // Activate scroll reveal animations
  useScrollReveal();

  return (
    <>
      {/* Cursor glow (desktop only) */}
      <CursorGlow />

      {/* Sticky Navbar */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Sections */}
      <main>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Floating Chat */}
      <ChatBox />

      {/* Resume Modal */}
      {resumeOpen && (
        <ResumeModal onClose={() => setResumeOpen(false)} />
      )}
    </>
  );
}
