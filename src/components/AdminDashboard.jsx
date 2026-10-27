import React, { useState } from 'react';
import { BarChart3, AlertTriangle, ShieldCheck, RefreshCw, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';
import { RISK_ANALYSIS, SPONSORS } from '../data/mockData';

export default function AdminDashboard({ lockers, onRedistributeUmbrellas }) {
  const [activeTab, setActiveTab] = useState('risk');
  const [selectedRisk, setSelectedRisk] = useState(RISK_ANALYSIS[0]);
  const [isRedistributing, setIsRedistributing] = useState(false);

  const lowStockLocker = lockers.find(l => l.availableUmbrellas <= 2);
  const surplusLocker = lockers.find(l => l.availableUmbrellas >= 8);

  const handleRunRedistribution = () => {
    setIsRedistributing(true);
    setTimeout(() => {
      onRedistributeUmbrellas();
      setIsRedistributing(false);
      alert('Operasi Redistribusi Selesai! 4 payung telah dipindahkan dari titik surplus ke titik minim stok.');
    }, 1200);
  };

  const getRisksInCell = (k, d) => RISK_ANALYSIS.filter(r => r.likelihood === k && r.impact === d);

  const getCellBg = (k, d) => {
    const score = k * d;
    if (score >= 13) return 'bg-rose-500/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/30';
    if (score >= 7) return 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30';
    return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30';
  };

  return (
    <div className="space-y-6">
      
      {/* Header Pill */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full">
              ISO 31000:2018 Risk Management
            </span>
            <span className="text-xs text-slate-400 font-mono">Bab 2.4 Laporan ITS</span>
          </div>
          <h2 className="text-xl font-black text-white mt-2">
            Pusat Kendali Risiko & Distribusi Payung
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manajemen matriks risiko dan penyeimbangan stok payung otomatis.
          </p>
        </div>

        {/* Tab switch pills */}
        <div className="flex bg-slate-950/60 p-1.5 rounded-full border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('risk')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeTab === 'risk' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Matriks Risiko
          </button>
          <button
            onClick={() => setActiveTab('logistics')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeTab === 'logistics' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Redistribusi
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeTab === 'market' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Analisis Pasar
          </button>
        </div>
      </div>

      {/* TAB 1: Matriks Risiko */}
      {activeTab === 'risk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 5x5 Matrix (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Matriks Risiko 5 × 5 (Tabel 2.4)</span>
              </h3>
              <div className="flex gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">Tinggi (R1)</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">Sedang (R2-R9)</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Rendah (R10)</span>
              </div>
            </div>

            {/* Matrix Visual */}
            <div className="overflow-x-auto">
              <div className="min-w-[360px] space-y-1">
                <div className="grid grid-cols-6 gap-1 text-center font-mono text-xs text-slate-400">
                  <span className="text-[10px]">K \ D</span>
                  {[1, 2, 3, 4, 5].map(d => <span key={d} className="font-bold">D={d}</span>)}
                </div>

                {[5, 4, 3, 2, 1].map(k => (
                  <div key={k} className="grid grid-cols-6 gap-1">
                    <div className="flex items-center justify-center font-bold text-xs text-slate-400">
                      K={k}
                    </div>
                    {[1, 2, 3, 4, 5].map(d => {
                      const cellRisks = getRisksInCell(k, d);
                      const bgClass = getCellBg(k, d);

                      return (
                        <div
                          key={d}
                          className={`h-11 rounded-xl border flex items-center justify-center transition cursor-pointer text-xs font-black ${bgClass}`}
                        >
                          {cellRisks.map(r => (
                            <span
                              key={r.id}
                              onClick={() => setSelectedRisk(r)}
                              className={`px-2 py-1 rounded-lg ${selectedRisk.id === r.id ? 'ring-2 ring-white scale-110 shadow-lg' : ''}`}
                            >
                              {r.id}
                            </span>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* List 10 Risiko */}
            <div className="pt-3 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 mb-2">10 Risiko Teridentifikasi (Klik untuk detail):</h4>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {RISK_ANALYSIS.map(r => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRisk(r)}
                    className={`p-2.5 rounded-2xl border text-xs cursor-pointer transition flex items-center justify-between ${
                      selectedRisk.id === r.id
                        ? 'border-sky-400 bg-sky-500/15 text-white font-bold'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        r.level === 'Tinggi' ? 'bg-rose-500/20 text-rose-300' :
                        r.level === 'Sedang' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {r.id}
                      </span>
                      <span>{r.name}</span>
                    </div>
                    <span className="font-mono text-slate-500 text-[11px]">Skor: {r.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Detail (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                selectedRisk.level === 'Tinggi' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                selectedRisk.level === 'Sedang' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                Tingkat: {selectedRisk.level} (Skor {selectedRisk.score})
              </span>
              <span className="text-xs font-mono text-slate-400">
                K: {selectedRisk.likelihood} × D: {selectedRisk.impact}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-white">
                [{selectedRisk.id}] {selectedRisk.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {selectedRisk.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 space-y-1.5 text-xs">
              <span className="font-bold text-sky-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                Strategi Mitigasi Terverifikasi (Tabel 2.5):
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedRisk.mitigation}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 mb-2">Mitra Penunjang Pendapatan:</h4>
              <div className="space-y-1.5">
                {SPONSORS.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="font-bold text-white">{s.name}</span>
                    <span className="text-[10px] text-slate-400">{s.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Redistribusi Payung */}
      {activeTab === 'logistics' && (
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                Mitigasi Risiko R2
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Penyeimbangan Armada Payung Antar-Locker
              </h3>
            </div>

            {lowStockLocker && (
              <button
                onClick={handleRunRedistribution}
                disabled={isRedistributing}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition hover:scale-102 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRedistributing ? 'animate-spin' : ''}`} />
                <span>{isRedistributing ? 'Menyeimbangkan...' : 'Tugaskan Kru Redistribusi'}</span>
              </button>
            )}
          </div>

          {lowStockLocker ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
              <div>
                <span className="font-bold text-sm block">Ketidakseimbangan Terdeteksi:</span>
                <p className="mt-0.5 text-slate-300">
                  <b>{lowStockLocker.name}</b> hanya tersisa <b>{lowStockLocker.availableUmbrellas} payung</b> karena banyak mahasiswa mengambil payung menuju kelas. Titik <b>{surplusLocker?.name || 'Locker Tower'}</b> memiliki surplus.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Semua titik smart locker seimbang dan siap melayani peminjaman mahasiswa.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lockers.map(l => (
              <div key={l.id} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">{l.name.replace('Smart Locker ', '')}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    l.availableUmbrellas <= 2 ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {l.availableUmbrellas <= 2 ? 'Stok Minim' : 'Aman'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Payung Tersedia:</span>
                  <span className="font-mono font-bold text-sky-400">{l.availableUmbrellas}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Slot Kosong:</span>
                  <span className="font-mono font-bold text-emerald-400">{l.emptySlots}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STP */}
      {activeTab === 'market' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
            <h4 className="text-sm font-black text-white">Segmentasi, Targeting & Positioning (STP)</h4>
            <div className="space-y-2 text-slate-300">
              <p><b>• Segmentasi:</b> Seluruh sivitas akademika ITS Sukolilo (Mahasiswa, Dosen, Tendik, Tamu).</p>
              <p><b>• Targeting:</b> Mahasiswa jalan kaki antargedung kuliah yang tidak membawa payung (80% responden survei).</p>
              <p><b>• Positioning:</b> "Solusi Cepat, Mandiri & Murah Melawan Hujan di Kampus ITS".</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
            <h4 className="text-sm font-black text-white">Bauran Pemasaran (4P)</h4>
            <div className="space-y-2 text-slate-300">
              <p><b>• Product:</b> Payung lipat fiber anti-angin + Smart Locker IoT.</p>
              <p><b>• Price:</b> Sewa Rp2.000 + deposit refundable Rp10.000 via QRIS.</p>
              <p><b>• Place:</b> Fakultas (95%), Tower ITS (85%), Halte (65%).</p>
              <p><b>• Promotion:</b> QR stiker locker, Instagram ITS, Ormawa & BEM.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
