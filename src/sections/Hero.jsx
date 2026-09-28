import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Terminal, Sparkles } from 'lucide-react';
import DeveloperVisual from '../components/DeveloperVisual';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introductions & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 dark:bg-indigo-500/10 light:bg-indigo-100 text-indigo-400 dark:text-indigo-400 light:text-indigo-700 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for Software Developer Roles</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
                Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Rahul More</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 font-mono">
                Software Developer
              </h2>
            </div>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {personalInfo.tagline}
            </p>

            {/* Call To Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {/* View My Work */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Download Resume */}
              <a
                href={personalInfo.resumeUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700 dark:border-slate-700 light:border-slate-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Download Resume</span>
              </a>

              {/* GitHub Button */}
              <a
                href={personalInfo.github}
                target={personalInfo.github !== '#' ? "_blank" : undefined}
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-3.5 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>

              {/* LinkedIn Button */}
              <a
                href={personalInfo.linkedin}
                target={personalInfo.linkedin !== '#' ? "_blank" : undefined}
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3.5 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-blue-400 hover:text-blue-300 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Tech Snapshot Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono text-slate-400">
              <span className="text-slate-500">Core Focus:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-indigo-300">React.js</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-amber-300">Java</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-emerald-300">Spring Boot</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-blue-300">REST APIs</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-cyan-300">MySQL</span>
            </div>
          </div>

          {/* Right Column: Sleek Visual Display */}
          <div className="lg:col-span-5">
            <DeveloperVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
