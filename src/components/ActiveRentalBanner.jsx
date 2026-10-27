import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, CornerDownLeft, Sparkles } from 'lucide-react';

export default function ActiveRentalBanner({ activeRental, onOpenReturnModal }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!activeRental) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.floor((now - new Date(activeRental.startTime).getTime()) / 1000);
      setElapsedSeconds(diff >= 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRental]);

  if (!activeRental) return null;

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/90 via-teal-900/80 to-slate-900/90 border border-emerald-500/40 p-4 sm:p-5 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl mb-6">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left umbrella badge */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30 flex-shrink-0 animate-pulse">
            ☂
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                Sesi Peminjaman Aktif
              </span>
              <span className="font-mono text-xs text-white font-bold bg-white/10 px-2 py-0.5 rounded-full">
                {activeRental.umbrellaId}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Payung sedang digunakan ({activeRental.originLockerName.replace('Smart Locker ', '')})
            </h3>
          </div>
        </div>

        {/* Center Timer & Deposit Pill */}
        <div className="flex items-center justify-around sm:justify-center gap-4 bg-slate-950/40 border border-white/10 rounded-2xl px-4 py-2 text-xs">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" /> Waktu
            </span>
            <span className="font-mono text-sm font-extrabold text-white">
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          <div className="w-px h-6 bg-white/10"></div>

          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Jaminan
            </span>
            <span className="text-sm font-bold text-emerald-300">
              Rp10.000 <span className="text-[10px] text-emerald-400/80 font-normal">(100% Refund)</span>
            </span>
          </div>
        </div>

        {/* Right Button */}
        <div>
          <button
            onClick={onOpenReturnModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 hover:scale-102 transition flex items-center justify-center gap-2"
          >
            <CornerDownLeft className="w-4 h-4" />
            <span>Kembalikan Payung</span>
            <span className="bg-slate-950/20 px-1.5 py-0.5 rounded-full text-[10px]">Bebas Titik</span>
          </button>
        </div>
      </div>
    </div>
  );
}
