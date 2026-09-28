import React from 'react';
import { GraduationCap, Layers, Network, BookOpen, CheckCircle, Code2, Award } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const highlightIcons = [
    GraduationCap,
    Layers,
    Network,
    BookOpen
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/50 dark:bg-slate-900/50 light:bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/20 mb-3">
            <Code2 className="w-3.5 h-3.5" /> About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
            Passionate About Engineering Scalable Software
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main About Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-5 text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed text-base sm:text-lg">
              <p>
                I’m <strong className="text-white dark:text-white light:text-slate-900 font-semibold">Rahul More</strong>, a Computer Engineering graduate and software developer interested in building reliable and user-friendly web applications. I work with technologies across frontend and backend development, including React.js, Node.js, Java, Spring Boot, REST APIs and databases.
              </p>
              <p>
                I enjoy learning new technologies, solving programming problems and turning ideas into practical applications.
              </p>

              <div className="pt-4 border-t border-slate-700/50 dark:border-slate-700/50 light:border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-300 light:text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Degree: B.E. Computer Engineering</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-300 light:text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Focus: Full Stack & Backend APIs</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-300 light:text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Clean Code & Design Patterns</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 dark:text-slate-300 light:text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Active Problem Solver</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Cards / Highlight Statistics */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalInfo.stats.map((stat, index) => {
              const IconComponent = highlightIcons[index % highlightIcons.length];
              return (
                <div
                  key={stat.title}
                  className="p-5 rounded-2xl glass-panel hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white dark:text-white light:text-slate-900 mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-normal">
                    {stat.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
