import React from 'react';
import { FileText, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { BMC_DATA, PROJECT_INFO } from '../data/mockData';

export default function BmcViewer() {
  return (
    <div className="space-y-6">
      
      {/* Akademik Header Card */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
                Tugas 2 Kewirausahaan
              </span>
              <span className="text-xs text-slate-400 font-mono">ITS Surabaya (2026)</span>
            </div>
            <h2 className="text-xl font-black text-white mt-2">
              Business Model Canvas: SPPO Kampus ITS
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dosen Pengampu: <b className="text-slate-200">{PROJECT_INFO.lecturer}</b>
            </p>
          </div>

          <span className="text-xs text-slate-400 bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-full font-mono self-start sm:self-auto">
            Osterwalder & Pigneur (2010)
          </span>
        </div>

        {/* Team Members */}
        <div className="mt-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Tim Mahasiswa Penyusun:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
            {PROJECT_INFO.team.map((m, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="font-bold text-white text-[11px] truncate">{m.name}</div>
                <div className="font-mono text-[10px] text-sky-400 font-bold mt-0.5">{m.nrp}</div>
                <div className="text-[9px] text-slate-500 mt-0.5 truncate">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9 Blocks BMC (Fluid & Responsive Modern Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        
        {/* 1. Value Proposition (Highlight) */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/40 p-5 shadow-xl space-y-3 lg:col-span-2">
          <div className="flex justify-between items-center pb-2 border-b border-emerald-500/30">
            <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <span>🎁</span>
              <span>Value Propositions (Proposisi Nilai)</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full">
              Paling Krusial
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
            {BMC_DATA.valuePropositions.map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Customer Segments */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span>🎯</span>
            <span>Customer Segments</span>
          </h3>
          <ul className="space-y-2 text-slate-300">
            {BMC_DATA.customerSegments.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Key Partnerships */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span>🤝</span>
            <span>Key Partnerships</span>
          </h3>
          <ul className="space-y-2 text-slate-300">
            {BMC_DATA.keyPartnerships.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Key Activities */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span>⚙️</span>
            <span>Key Activities</span>
          </h3>
          <ul className="space-y-2 text-slate-300">
            {BMC_DATA.keyActivities.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Key Resources */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span>💡</span>
            <span>Key Resources</span>
          </h3>
          <ul className="space-y-2 text-slate-300">
            {BMC_DATA.keyResources.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 6. Customer Relationships */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span>💬</span>
            <span>Customer Relationships</span>
          </h3>
          <ul className="space-y-2 text-slate-300">
            {BMC_DATA.customerRelationships.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 7. Channels */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span>📢</span>
            <span>Channels (Saluran)</span>
          </h3>
          <ul className="space-y-2 text-slate-300">
            {BMC_DATA.channels.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 8. Cost Structure */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-xl space-y-3">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-800">
            <span>💰</span>
            <span>Cost Structure (Struktur Biaya)</span>
          </h3>
          <ul className="space-y-2 text-slate-300">
            {BMC_DATA.costStructure.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 9. Revenue Streams */}
        <div className="rounded-3xl bg-gradient-to-br from-teal-950/70 to-slate-900 border border-teal-500/40 p-5 shadow-xl space-y-3 lg:col-span-3">
          <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-teal-500/30">
            <span>💵</span>
            <span>Revenue Streams (Arus Pendapatan)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-slate-300">
            {BMC_DATA.revenueStreams.map((item, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-950/50 border border-teal-500/20 text-xs">
                <span className="text-teal-400 font-bold block mb-1">Sumber #{i+1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
