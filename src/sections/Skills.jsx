import React from 'react';
import { 
  Code, 
  Server, 
  Database, 
  Wrench, 
  BrainCircuit, 
  Layers, 
  Check, 
  Sparkles,
  Terminal
} from 'lucide-react';
import { skills } from '../data/portfolioData';

export default function Skills() {
  const categories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Code,
      color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400',
      items: skills.frontend
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
      items: skills.backend
    },
    {
      id: 'database',
      title: 'Database & ORM',
      icon: Database,
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
      items: skills.database
    },
    {
      id: 'tools',
      title: 'Tools & Environments',
      icon: Wrench,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
      items: skills.tools
    },
    {
      id: 'other',
      title: 'CS Fundamentals & Testing',
      icon: BrainCircuit,
      color: 'from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400',
      items: skills.other
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/20 mb-3">
            <Layers className="w-3.5 h-3.5" /> Technical Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
            Skills & Core Competencies
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base">
            Categorized technical skills gained through engineering coursework, hands-on projects, and practical development.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-500/40 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} border flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-white dark:text-white light:text-slate-900">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-700/80 dark:hover:bg-slate-700/80 light:hover:bg-slate-200 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-xs font-mono text-slate-200 dark:text-slate-200 light:text-slate-800 transition-colors"
                      >
                        <Check className="w-3 h-3 text-indigo-400" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500 dark:text-slate-500 light:text-slate-400">
                  <span>{category.items.length} Technologies</span>
                  <span className="text-emerald-400">Production Ready</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
