import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Eye, 
  Code2, 
  Sparkles,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';
import ProjectMockup from '../components/ProjectMockup';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Full Stack', 'Backend & APIs', 'Java Systems'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/20 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" /> Featured Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
            Featured Projects & Systems
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base">
            Explore live interactive mockups, API architectures, and source code implementations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 font-semibold'
                  : 'glass-panel text-slate-400 dark:text-slate-400 light:text-slate-700 hover:text-white hover:border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid with Attractive Mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1.5 shadow-xl"
            >
              <div>
                {/* Visual UI / Architecture Mockup */}
                <div className="mb-5">
                  <ProjectMockup type={project.previewType} />
                </div>

                {/* Top Title & Links */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="text-[11px] font-mono text-indigo-400 font-semibold uppercase tracking-wider block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="p-2 rounded-lg bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white hover:bg-slate-700 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} Live Demo`}
                      className="p-2 rounded-lg bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white hover:bg-slate-700 transition-colors"
                      title="Launch Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Architecture Metric Pills */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 mb-5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-center font-mono">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <p className="text-[10px] text-slate-500">{metric.label}</p>
                        <p className="text-xs font-semibold text-slate-200 mt-0.5">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-100 text-indigo-300 dark:text-indigo-300 light:text-indigo-700 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Buttons: View Details, GitHub, Live Demo */}
              <div className="pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer hover:shadow-indigo-600/40"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
