import React, { useState } from 'react';
import { Terminal, Code2, Sparkles, CheckCircle2, Cpu, Database, Flame } from 'lucide-react';

export default function DeveloperVisual() {
  const [activeTab, setActiveTab] = useState('java');

  const tabs = [
    { id: 'java', label: 'RahulMore.java', icon: '☕' },
    { id: 'react', label: 'App.jsx', icon: '⚛️' },
    { id: 'status', label: 'status.json', icon: '⚡' }
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Background ambient decorative glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 dark:opacity-40 animate-pulse"></div>

      {/* Main Terminal Window Card */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/70 dark:border-slate-800 bg-slate-900/90 dark:bg-slate-950/90 shadow-2xl backdrop-blur-xl">
        {/* Window Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800/90 dark:bg-slate-900/90 border-b border-slate-700/50">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
            <span className="ml-2 text-xs font-mono text-slate-400 font-medium">terminal — zsh</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>ready to build</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center border-b border-slate-800 bg-slate-900/60 px-2 pt-2 gap-1 overflow-x-auto text-xs font-mono">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-indigo-300 border-t-2 border-indigo-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Code Content Area */}
        <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-300">
          {activeTab === 'java' && (
            <div className="space-y-1">
              <p className="text-slate-500">// Rahul More - Software Developer</p>
              <p>
                <span className="text-purple-400">package</span> com.rahulmore.portfolio;
              </p>
              <br />
              <p>
                <span className="text-purple-400">public class</span>{' '}
                <span className="text-amber-300 font-bold">RahulMore</span> &#123;
              </p>
              <p className="pl-4">
                <span className="text-purple-400">private final</span> String role ={' '}
                <span className="text-emerald-300">"Software Developer"</span>;
              </p>
              <p className="pl-4">
                <span className="text-purple-400">private final</span> String degree ={' '}
                <span className="text-emerald-300">"B.E. Computer Engineering"</span>;
              </p>
              <p className="pl-4">
                <span className="text-purple-400">private final</span> String[] stack = &#123;
              </p>
              <p className="pl-8 text-cyan-300">
                "Java", "Spring Boot", "React.js", "Node.js", "REST APIs", "MySQL"
              </p>
              <p className="pl-4">&#125;;</p>
              <br />
              <p className="pl-4">
                <span className="text-purple-400">public boolean</span>{' '}
                <span className="text-blue-400">isAvailableForWork</span>() &#123;
              </p>
              <p className="pl-8">
                <span className="text-purple-400">return</span>{' '}
                <span className="text-rose-400 font-semibold">true</span>;
              </p>
              <p className="pl-4">&#125;</p>
              <p>&#125;</p>
            </div>
          )}

          {activeTab === 'react' && (
            <div className="space-y-1">
              <p className="text-slate-500">// Modern Frontend UI Architecture</p>
              <p>
                <span className="text-purple-400">import</span> React{' '}
                <span className="text-purple-400">from</span>{' '}
                <span className="text-emerald-300">'react'</span>;
              </p>
              <br />
              <p>
                <span className="text-purple-400">export default function</span>{' '}
                <span className="text-amber-300 font-bold">DeveloperProfile</span>() &#123;
              </p>
              <p className="pl-4">
                <span className="text-purple-400">return</span> (
              </p>
              <p className="pl-8 text-blue-400">&lt;<span className="text-indigo-400 font-semibold">div</span> className=<span className="text-emerald-300">"developer-showcase"</span>&gt;</p>
              <p className="pl-12 text-slate-300">&lt;<span className="text-indigo-400">Header</span> title=<span className="text-emerald-300">"Rahul More"</span> /&gt;</p>
              <p className="pl-12 text-slate-300">&lt;<span className="text-indigo-400">Specialty</span> value=<span className="text-emerald-300">"REST APIs & Web Apps"</span> /&gt;</p>
              <p className="pl-8 text-blue-400">&lt;/<span className="text-indigo-400 font-semibold">div</span>&gt;</p>
              <p className="pl-4">);</p>
              <p>&#125;</p>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="space-y-1">
              <p className="text-slate-500">// Current Status & Credentials</p>
              <p>&#123;</p>
              <p className="pl-4">
                <span className="text-indigo-300">"developer"</span>: <span className="text-emerald-300">"Rahul More"</span>,
              </p>
              <p className="pl-4">
                <span className="text-indigo-300">"graduation"</span>: <span className="text-emerald-300">"Computer Engineering (2025)"</span>,
              </p>
              <p className="pl-4">
                <span className="text-indigo-300">"cgpa"</span>: <span className="text-amber-300">8.0</span>,
              </p>
              <p className="pl-4">
                <span className="text-indigo-300">"focus"</span>: <span className="text-emerald-300">"Full Stack & Backend Development"</span>,
              </p>
              <p className="pl-4">
                <span className="text-indigo-300">"status"</span>: <span className="text-emerald-400">"Open for Software Developer Roles"</span>
              </p>
              <p>&#125;</p>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950/70 border-t border-slate-800 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-indigo-400">
              <Code2 className="w-3.5 h-3.5" /> UTF-8
            </span>
            <span>Java 17 / Node.js 22</span>
          </div>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Validated
          </span>
        </div>
      </div>

      {/* Floating Interactive Micro-Badges */}
      <div className="absolute -bottom-5 -left-4 sm:-left-6 p-3 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center gap-3 text-xs">
        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-slate-100">Full Stack Ready</p>
          <p className="text-[11px] text-slate-400">React.js + Spring Boot</p>
        </div>
      </div>

      <div className="absolute -top-5 -right-3 sm:-right-5 p-3 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center gap-3 text-xs">
        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-slate-100">REST APIs & DBs</p>
          <p className="text-[11px] text-slate-400">MySQL, MongoDB & Postman</p>
        </div>
      </div>
    </div>
  );
}
