import React from 'react';
import { Briefcase, Calendar, Building2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { experience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/20 mb-3">
            <Briefcase className="w-3.5 h-3.5" /> Professional History
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
            Work Experience
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base">
            Professional engineering journey contributing to web modules, RESTful API design, and system architecture.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          {experience.map((item, index) => (
            <div
              key={index}
              className="relative pl-6 sm:pl-8 pb-8 border-l-2 border-indigo-500/40 dark:border-indigo-500/40 light:border-indigo-300"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-900 dark:border-slate-900 light:border-white shadow-sm"></div>

              {/* Card Container */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-indigo-500/40 transition-all duration-300 shadow-xl">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3" /> Industry Experience
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-semibold text-base mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{item.company}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-300 dark:text-indigo-300 light:text-indigo-700 border border-indigo-500/20 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                  <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Core Engineering Contributions:
                  </h4>
                  <ul className="space-y-3">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3 text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer badge */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-200 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-indigo-400">React.js • Spring Boot • MySQL • REST APIs</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Role
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
