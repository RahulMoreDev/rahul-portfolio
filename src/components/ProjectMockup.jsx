import React from 'react';
import { 
  Users, 
  BarChart3, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  CreditCard, 
  GraduationCap, 
  ArrowUpRight,
  Database
} from 'lucide-react';

export default function ProjectMockup({ type }) {
  if (type === 'crm') {
    return (
      <div className="w-full h-36 rounded-xl bg-slate-950/80 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden relative group">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-200 font-semibold">CRM Dashboard</span>
          </div>
          <span className="text-indigo-400 text-[10px]">v2.4 Active</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-auto">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400">Total Leads</p>
            <p className="text-xs font-bold text-white font-mono">1,248</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400">Pipeline</p>
            <p className="text-xs font-bold text-indigo-400 font-mono">84 Active</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-center">
            <p className="text-[10px] text-slate-400">Conversion</p>
            <p className="text-xs font-bold text-emerald-400 font-mono">92.4%</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>React.js + Node.js REST API</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Connected
          </span>
        </div>
      </div>
    );
  }

  if (type === 'journal') {
    return (
      <div className="w-full h-36 rounded-xl bg-slate-950/80 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden font-mono text-[11px] text-slate-300">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              GET
            </span>
            <span className="text-slate-300">/api/v1/journals</span>
          </div>
          <span className="text-emerald-400 font-semibold text-[10px]">200 OK (38ms)</span>
        </div>

        <div className="space-y-1 text-[10px] text-slate-400 bg-slate-900/90 p-2 rounded-md border border-slate-800/80">
          <p className="text-indigo-300">&#123; "status": "success", "entries": 4 &#125;</p>
          <p className="text-slate-500">// Spring Data JPA + MySQL Persistence</p>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>Spring Boot REST Controller</span>
          <span className="text-amber-400">Postman Verified</span>
        </div>
      </div>
    );
  }

  if (type === 'student') {
    return (
      <div className="w-full h-36 rounded-xl bg-slate-950/80 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden text-[11px]">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-200 font-semibold font-mono">Student Registry</span>
          </div>
          <span className="text-emerald-400 text-[10px] font-mono">Hibernate ORM</span>
        </div>

        <div className="space-y-1.5 my-auto">
          <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px]">
            <span className="text-slate-300 font-mono">ID #2024-CE-018</span>
            <span className="text-indigo-400">Computer Eng.</span>
            <span className="text-emerald-400 font-semibold">Enrolled</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px]">
            <span className="text-slate-300 font-mono">ID #2024-CE-024</span>
            <span className="text-indigo-400">Computer Eng.</span>
            <span className="text-emerald-400 font-semibold">Enrolled</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Relational Schema: MySQL</span>
          <span className="text-indigo-400">CRUD Operations</span>
        </div>
      </div>
    );
  }

  // Bank Management System
  return (
    <div className="w-full h-36 rounded-xl bg-slate-950/80 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden text-[11px]">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-200 font-semibold font-mono">Core Banking Ledger</span>
        </div>
        <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> ACID Verified
        </span>
      </div>

      <div className="flex items-center justify-between my-auto p-2 rounded-lg bg-slate-900 border border-slate-800">
        <div>
          <p className="text-[10px] text-slate-400">Account Type</p>
          <p className="text-xs font-bold text-white font-mono">Savings (OOP)</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400">Transaction Status</p>
          <p className="text-xs font-bold text-emerald-400 font-mono">Synchronized</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
        <span>Java OOP Principles</span>
        <span className="text-amber-400">SQL Transactional Safe</span>
      </div>
    </div>
  );
}
