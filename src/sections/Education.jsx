import React from 'react';
import { GraduationCap, Calendar, Award, Building, Sparkles, CheckCircle2 } from 'lucide-react';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/20 mb-3">
            <GraduationCap className="w-3.5 h-3.5" /> Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
            Education & Qualifications
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base">
            Academic milestones building core computer science foundation and engineering discipline.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((item, index) => (
            <div
              key={index}
              className="relative pl-6 sm:pl-8 pb-6 last:pb-0 border-l-2 border-indigo-500/40 dark:border-indigo-500/40 light:border-indigo-300"
            >
              {/* Dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-900 dark:border-slate-900 light:border-white shadow-sm"></div>

              {/* Card */}
              <div className="glass-panel p-6 sm:p-7 rounded-2xl hover:border-indigo-500/40 transition-all duration-300 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 font-medium text-sm sm:text-base mt-1">
                      <Building className="w-4 h-4" />
                      <span>{item.institution}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-800 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Award className="w-3.5 h-3.5" />
                      {item.grade}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed pt-2 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
                  {item.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
