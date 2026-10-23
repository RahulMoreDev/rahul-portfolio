import React, { useEffect, useState } from 'react';
import { X, Printer, ExternalLink, Mail, MapPin, Globe, Github, Linkedin, Download, Maximize2, Minimize2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ResumeModal({ isOpen = true, onClose }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (isOpen === false) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isFullScreen ? '0px' : '16px',
        backgroundColor: 'rgba(3, 7, 18, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Window */}
      <div
        style={{
          width: isFullScreen ? '100vw' : 'min(1100px, 96vw)',
          height: isFullScreen ? '100vh' : 'min(94vh, 980px)',
          borderRadius: isFullScreen ? '0px' : '20px',
          backgroundColor: '#0f172a',
          border: isFullScreen ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'all 0.25s ease',
        }}
        role="dialog"
        aria-modal="true"
      >
        {/* ================= Top Controls Toolbar ================= */}
        <div
          style={{
            padding: '12px 20px',
            backgroundColor: '#1e293b',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Document details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              📄
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f8fafc', lineHeight: 1.2 }}>
                Rahul More — Professional Resume
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                ATS-Optimized Format · 1-Page Printable
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Full Screen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#cbd5e1',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              title={isFullScreen ? 'Exit Full Screen' : 'Full Screen Width & Length'}
            >
              {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              <span className="hidden sm:inline">{isFullScreen ? 'Restore' : 'Expand'}</span>
            </button>

            {/* Print / Save PDF */}
            <a
              href="/resume.html"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                border: 'none',
                textDecoration: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(99, 102, 241, 0.35)',
              }}
            >
              <Printer size={14} />
              <span>Print / PDF ↗</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                cursor: 'pointer',
                fontSize: '18px',
                transition: 'all 0.2s',
              }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ================= Scrollable Resume Sheet Container ================= */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 16px 40px',
            backgroundColor: '#0b1120',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Paper Sheet (White ATS Document) */}
          <div
            style={{
              width: '100%',
              maxWidth: '920px',
              backgroundColor: '#ffffff',
              color: '#1e293b',
              borderRadius: '12px',
              padding: 'clamp(24px, 4vw, 44px)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
              fontSize: '13px',
              lineHeight: 1.5,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {/* Header */}
            <header style={{ textAlign: 'center', paddingBottom: '16px', borderBottom: '2.5px solid #2563eb', marginBottom: '20px' }}>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Rahul More
              </h1>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                Software Developer | Full Stack & REST API Engineer
              </p>

              {/* Contact Bar */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', fontSize: '0.78rem', color: '#475569' }}>
                <a href={`mailto:${personalInfo.email}`} style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                  <Mail size={13} /> {personalInfo.email}
                </a>
                <span style={{ color: '#cbd5e1' }}>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} /> Maharashtra, India
                </span>
                <span style={{ color: '#cbd5e1' }}>•</span>
                <a href="https://rahulmore.vercel.app" target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                  <Globe size={13} /> rahulmore.vercel.app
                </a>
                <span style={{ color: '#cbd5e1' }}>•</span>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                  <Github size={13} /> github.com/RahulMoreDev
                </a>
                <span style={{ color: '#cbd5e1' }}>•</span>
                <a href="https://www.linkedin.com/in/rahul-more-3849a4377" target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                  <Linkedin size={13} /> linkedin.com/in/rahul-more-3849a4377
                </a>
              </div>
            </header>

            {/* Section: Professional Summary */}
            <section style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                Professional Summary
              </h2>
              <p style={{ color: '#334155', fontSize: '0.85rem', lineHeight: 1.65 }}>
                Computer Engineering graduate and Software Developer with hands-on experience building full-stack web applications, secure RESTful APIs, and scalable backend services. Proficient across frontend and backend development with <strong>React.js, Java, Spring Boot, Node.js, and MySQL</strong>. Experienced in designing normalized relational schemas, writing clean and maintainable code adhering to OOP principles, and collaborating in agile development workflows.
              </p>
            </section>

            {/* Section: Technical Skills */}
            <section style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                Technical Skills
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '6px 16px', fontSize: '0.82rem', color: '#334155' }}>
                <div><strong style={{ color: '#0f172a' }}>Frontend:</strong> React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</div>
                <div><strong style={{ color: '#0f172a' }}>Backend:</strong> Java, Spring Boot, Node.js, Express.js, REST APIs</div>
                <div><strong style={{ color: '#0f172a' }}>Databases:</strong> MySQL, MongoDB, SQL Schema Design, Hibernate/JPA</div>
                <div><strong style={{ color: '#0f172a' }}>Tools & DevOps:</strong> Git, GitHub, Postman, IntelliJ IDEA, VS Code, Maven</div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong style={{ color: '#0f172a' }}>Core Competencies:</strong> Object-Oriented Programming (OOP), Data Structures & Algorithms, RESTful Architecture, API Testing, Agile Sprints
                </div>
              </div>
            </section>

            {/* Section: Professional Experience */}
            <section style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                Professional Experience
              </h2>
              <div style={{ marginBottom: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a' }}>
                    Software Developer / IT Engineer &nbsp;|&nbsp; <span style={{ color: '#2563eb' }}>Raveblue</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>
                    Current / Recent Professional Experience
                  </div>
                </div>
                <ul style={{ paddingLeft: '18px', marginTop: '6px', color: '#334155', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  <li>Engineered responsive, modular frontend components and intuitive user interfaces using React.js and modern JavaScript standards.</li>
                  <li>Developed, tested, and integrated secure RESTful API endpoints utilizing Spring Boot and Node.js for reliable client-server communication.</li>
                  <li>Designed, normalized, and optimized relational database schemas in MySQL, writing efficient queries and ensuring transactional ACID safety.</li>
                  <li>Collaborated actively in agile development cycles, code reviews, debugging, and continuous improvement of core software modules.</li>
                </ul>
              </div>
            </section>

            {/* Section: Featured Projects */}
            <section style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                Featured Projects
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Project 1 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                      CRM Application &nbsp;|&nbsp; <span style={{ color: '#2563eb', fontWeight: 600, fontStyle: 'italic', fontSize: '0.78rem' }}>React.js, Node.js, REST APIs, Database</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Full Stack</span>
                  </div>
                  <p style={{ color: '#334155', fontSize: '0.82rem', marginTop: '2px' }}>
                    Web-based Customer Relationship Management system featuring dynamic lead tracking, automated communication pipelines, secure CRUD operations, and responsive analytics dashboards.
                  </p>
                </div>

                {/* Project 2 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                      Journal Management System &nbsp;|&nbsp; <span style={{ color: '#2563eb', fontWeight: 600, fontStyle: 'italic', fontSize: '0.78rem' }}>Spring Boot, REST APIs, MySQL, Postman</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Backend & APIs</span>
                  </div>
                  <p style={{ color: '#334155', fontSize: '0.82rem', marginTop: '2px' }}>
                    Backend service built with Spring Boot following Controller-Service-Repository architecture with Spring Data JPA persistence and thorough endpoint validation via Postman collections.
                  </p>
                </div>

                {/* Project 3 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                      Student Management System &nbsp;|&nbsp; <span style={{ color: '#2563eb', fontWeight: 600, fontStyle: 'italic', fontSize: '0.78rem' }}>Java, Hibernate ORM, MySQL</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Java Systems</span>
                  </div>
                  <p style={{ color: '#334155', fontSize: '0.82rem', marginTop: '2px' }}>
                    Academic administrative application supporting student enrollment, course assignments, and grade tracking with Hibernate ORM mapping and relational integrity constraints in MySQL.
                  </p>
                </div>

                {/* Project 4 */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                      Bank Management System &nbsp;|&nbsp; <span style={{ color: '#2563eb', fontWeight: 600, fontStyle: 'italic', fontSize: '0.78rem' }}>Java, OOP Principles, SQL</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Java Systems</span>
                  </div>
                  <p style={{ color: '#334155', fontSize: '0.82rem', marginTop: '2px' }}>
                    Secure banking software implementing core Object-Oriented Programming (encapsulation, inheritance, polymorphism) with transactional safety, balance protection, and transaction logs.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: Education */}
            <section style={{ marginBottom: '8px' }}>
              <h2 style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>
                Education & Qualifications
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <span><strong style={{ color: '#0f172a' }}>B.E. in Computer Engineering</strong> — Sant Gadge Baba Amravati University</span>
                  <span><strong style={{ color: '#16a34a' }}>CGPA: 8.0 / 10</strong> &nbsp;|&nbsp; 2022 – 2025</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <span><strong style={{ color: '#0f172a' }}>Diploma in Engineering</strong> — Government Polytechnic Hingoli</span>
                  <span><strong style={{ color: '#16a34a' }}>70.0%</strong> &nbsp;|&nbsp; 2020 – 2021</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <span><strong style={{ color: '#0f172a' }}>HSC (Science Stream)</strong> — Chhatrapati Sambhaji Gurukul, Parbhani</span>
                  <span><strong style={{ color: '#16a34a' }}>54.30%</strong> &nbsp;|&nbsp; 2018 – 2019</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <span><strong style={{ color: '#0f172a' }}>SSC</strong> — Maharashtra State Board</span>
                  <span><strong style={{ color: '#16a34a' }}>74.80%</strong> &nbsp;|&nbsp; 2016 – 2017</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ================= Bottom Action Footer ================= */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: '#1e293b',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            💡 Tip: Click <strong>Print / PDF</strong> to save directly as an official A4 resume.
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="/resume.html"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                border: 'none',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Printer size={15} /> Open Printable PDF
            </a>
            <button
              onClick={onClose}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: '#cbd5e1',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
              }}
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
