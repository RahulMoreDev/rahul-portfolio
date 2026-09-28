import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close project details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            <Layers className="w-3.5 h-3.5" /> Project Showcase
          </div>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {project.title}
          </h2>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono font-medium px-3 py-1 rounded-md bg-slate-800 text-indigo-300 border border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Detailed Description */}
        <div className="mb-6 space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Features Checklist */}
        {project.features && (
          <div className="mb-8 p-4 sm:p-5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Key Architecture & Capabilities
            </h3>
            <ul className="space-y-2.5">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
          <a
            href={project.github}
            target={project.github !== '#' ? "_blank" : undefined}
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>

          <a
            href={project.liveDemo}
            target={project.liveDemo !== '#' ? "_blank" : undefined}
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
