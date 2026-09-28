import React from 'react';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Sparkles,
  GitBranch,
  FolderGit2,
  Send,
  Database
} from 'lucide-react';
import { techStackHighlights } from '../data/portfolioData';

export default function TechStackVisual() {
  return (
    <section className="py-16 border-y border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-slate-950/60 dark:bg-slate-950/60 light:bg-slate-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Core Technology Arsenal
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900">
              Technologies I Work With Every Day
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-md">
            A battle-tested stack powering end-to-end web architectures, high-performance backends, and relational databases.
          </p>
        </div>

        {/* Tech Stack Visual Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techStackHighlights.map((tech) => (
            <div
              key={tech.name}
              className="glass-panel p-4 rounded-xl flex items-center gap-3.5 hover:border-indigo-500/50 hover:bg-slate-800/80 dark:hover:bg-slate-800/80 light:hover:bg-white transition-all duration-200 group cursor-default shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-200 flex items-center justify-center font-mono text-sm font-bold group-hover:scale-110 transition-transform">
                <span className={tech.iconColor}>&lt;/&gt;</span>
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm text-white dark:text-white light:text-slate-900 truncate">
                  {tech.name}
                </p>
                <p className="text-[11px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 truncate">
                  {tech.category}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
