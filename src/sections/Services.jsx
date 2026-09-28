import React from 'react';
import { Layout, Server, Network, Database, Sparkles, ArrowUpRight } from 'lucide-react';
import { services } from '../data/portfolioData';

export default function Services() {
  const iconMap = {
    Layout: Layout,
    Server: Server,
    Network: Network,
    Database: Database
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 light:text-indigo-600 border border-indigo-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> What I Do
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
            Services & Expertise
          </h2>
          <p className="mt-3 text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base">
            Delivering clean, robust software solutions across the entire web application lifecycle.
          </p>
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Layout;
            return (
              <div
                key={service.title}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1.5 shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-indigo-500/30 group-hover:to-blue-500/30 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Professional Standards</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
