import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ChevronRight, Code } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { personalInfo } from '../data/portfolioData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-mono text-base">RM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-indigo-400 transition-colors">
                Rahul More
              </span>
              <span className="text-[11px] font-mono text-indigo-400 dark:text-indigo-400 light:text-indigo-600 -mt-1">
                Software Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800/60 dark:hover:bg-slate-800/60 light:hover:bg-slate-200 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Theme Toggle + Resume Button */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={onOpenResume}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all duration-200 hover:shadow-indigo-600/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu & Theme Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-nav border-b border-slate-800 dark:border-slate-800 light:border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-200 transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/70 dark:border-slate-800/70 light:border-slate-300">
            <a
              href={personalInfo.resumeUrl}
              download
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/20"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
