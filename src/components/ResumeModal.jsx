import React, { useEffect } from 'react';
import { X, Printer, ExternalLink, Mail, MapPin, Globe, Github, Linkedin, Award, Briefcase, GraduationCap, Code } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-white text-slate-800 p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-600 border border-blue-200">
              ATS-Standard Resume Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/resume.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Open full page to print or save as PDF"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Page / Print PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="space-y-6 text-sm">
          
          {/* Header */}
          <div className="text-center pb-5 border-b-2 border-blue-600">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
              Rahul More
            </h1>
            <p className="text-xs sm:text-sm font-bold text-blue-600 tracking-wide uppercase mt-1">
              Software Developer | Full Stack & REST API Engineer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> rahulmore.engineer@gmail.com
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Maharashtra, India
              </span>
              <a href="https://github.com/RahulMoreDev" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                <Github className="w-3.5 h-3.5" /> github.com/RahulMoreDev
              </a>
              <a href="https://www.linkedin.com/in/rahulmore" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/rahulmore
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Computer Engineering graduate and Software Developer with hands-on experience building full-stack web applications, secure RESTful APIs, and scalable backend services. Proficient across frontend and backend development with <strong>React.js, Java, Spring Boot, Node.js, and MySQL</strong>. Experienced in designing normalized relational schemas, writing clean and maintainable code adhering to OOP principles, and collaborating in agile development workflows.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200 mb-2">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 text-xs text-slate-700">
              <div><strong className="text-slate-900">Frontend:</strong> React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</div>
              <div><strong className="text-slate-900">Backend:</strong> Java, Spring Boot, Node.js, Express.js, REST APIs</div>
              <div><strong className="text-slate-900">Databases:</strong> MySQL, MongoDB, SQL Schema Design, Hibernate/JPA</div>
              <div><strong className="text-slate-900">Tools:</strong> Git, GitHub, Postman, IntelliJ IDEA, VS Code, Maven</div>
              <div className="sm:col-span-2"><strong className="text-slate-900">Core CS:</strong> Object-Oriented Programming (OOP), Data Structures & Algorithms, API Testing</div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200 mb-2">
              Work Experience
            </h2>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                Software Developer / IT Engineer &nbsp;|&nbsp; <span className="text-blue-600 font-semibold">Raveblue</span>
              </span>
              <span className="text-xs text-slate-500 italic">Professional Experience</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700">
              <li>Engineered responsive, modular frontend components and user interfaces using React.js and modern JavaScript standards.</li>
              <li>Developed and integrated secure RESTful API endpoints utilizing Spring Boot and Node.js for client-server communication.</li>
              <li>Designed, normalized, and optimized relational database schemas in MySQL, writing efficient queries and ensuring transactional ACID safety.</li>
              <li>Collaborated in agile development sprints, participated in code reviews, and debugged production software flows.</li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200 mb-2">
              Featured Projects
            </h2>

            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">CRM Application &nbsp;|&nbsp; <span className="text-blue-600 italic">React.js, Node.js, REST APIs, MySQL</span></span>
                  <span className="text-[11px] text-slate-500">Full Stack</span>
                </div>
                <p className="text-xs text-slate-700">Built web-based CRM with dynamic lead tracking, pipeline automation, RESTful CRUD endpoints, and responsive analytics.</p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">Journal Management System &nbsp;|&nbsp; <span className="text-blue-600 italic">Spring Boot, REST APIs, MySQL, Postman</span></span>
                  <span className="text-[11px] text-slate-500">Backend & APIs</span>
                </div>
                <p className="text-xs text-slate-700">Multi-tier backend service using Controller-Service-Repository architecture with Spring Data JPA and Postman verified endpoints.</p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">Student Management System &nbsp;|&nbsp; <span className="text-blue-600 italic">Java, Hibernate ORM, MySQL</span></span>
                  <span className="text-[11px] text-slate-500">Java Systems</span>
                </div>
                <p className="text-xs text-slate-700">Desktop and database administrative application with Hibernate ORM mapping, student records management, and relational integrity.</p>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">Bank Management System &nbsp;|&nbsp; <span className="text-blue-600 italic">Java, OOP Principles, SQL</span></span>
                  <span className="text-[11px] text-slate-500">Java Systems</span>
                </div>
                <p className="text-xs text-slate-700">Secure banking platform showcasing core OOP principles (encapsulation, inheritance, polymorphism) with transactional SQL safety.</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200 mb-2">
              Education
            </h2>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span><strong>B.E. Computer Engineering</strong> — Sant Gadge Baba Amravati University</span>
                <span><strong className="text-emerald-600">CGPA: 8.0</strong> &nbsp;|&nbsp; 2022 – 2025</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Diploma in Engineering</strong> — Government Polytechnic Hingoli</span>
                <span><strong className="text-emerald-600">70.0%</strong> &nbsp;|&nbsp; 2020 – 2021</span>
              </div>
              <div className="flex justify-between">
                <span><strong>HSC (Science)</strong> — Chhatrapati Sambhaji Gurukul, Parbhani</span>
                <span><strong className="text-emerald-600">54.30%</strong> &nbsp;|&nbsp; 2018 – 2019</span>
              </div>
              <div className="flex justify-between">
                <span><strong>SSC</strong> — Maharashtra State Board</span>
                <span><strong className="text-emerald-600">74.80%</strong> &nbsp;|&nbsp; 2016 – 2017</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom CTA */}
        <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Ready to download or print as a clean PDF document.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="/resume.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
