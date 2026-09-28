import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950 dark:bg-slate-950 light:bg-slate-100 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Identity */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <a href="#home" className="flex items-center gap-2 group mb-1">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold font-mono">
                RM
              </span>
              <span className="text-lg font-bold text-white dark:text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors">
                Rahul More
              </span>
            </a>
            <p className="text-xs font-mono text-indigo-400 dark:text-indigo-400 light:text-indigo-600">
              Software Developer
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target={personalInfo.github !== '#' ? "_blank" : undefined}
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-200 hover:bg-slate-800 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white transition-colors border border-slate-800 dark:border-slate-800 light:border-slate-300"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target={personalInfo.linkedin !== '#' ? "_blank" : undefined}
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-200 hover:bg-slate-800 text-blue-400 hover:text-blue-300 transition-colors border border-slate-800 dark:border-slate-800 light:border-slate-300"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email Rahul More"
              className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-200 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 transition-colors border border-slate-800 dark:border-slate-800 light:border-slate-300"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-200 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800 dark:border-slate-800 light:border-slate-300 cursor-pointer ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 pt-8 border-t border-slate-900 dark:border-slate-900 light:border-slate-200 text-center text-xs text-slate-500">
          <p>© 2026 Rahul More. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
