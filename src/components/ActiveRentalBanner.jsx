import React from 'react';
import { Clock, ShieldCheck, CornerDownLeft, AlertTriangle, FastForward } from 'lucide-react';
import { RENTAL_CONFIG, formatRupiah, formatDuration } from '../data/rentalConfig';

const THEMES = {
  normal: {
    box: 'from-emerald-900/90 via-teal-900/80 to-slate-900/90 border-emerald-500/40 shadow-emerald-950/50',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    icon: 'from-emerald-500 to-teal-400 shadow-emerald-500/30',
    bar: 'from-emerald-400 to-teal-400',
    accent: 'text-emerald-300',
    clock: 'text-emerald-400',
    btn: 'from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/30',
    label: 'Sesi Peminjaman Aktif'
  },
  warning: {
    box: 'from-amber-900/80 via-orange-900/60 to-slate-900/90 border-amber-500/50 shadow-amber-950/50',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    icon: 'from-amber-500 to-orange-400 shadow-amber-500/30',
    bar: 'from-amber-400 to-orange-400',
    accent: 'text-amber-300',
    clock: 'text-amber-400',
    btn: 'from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-amber-500/30',
    label: 'Waktu Hampir Habis'
  },
  overdue: {
    box: 'from-rose-900/80 via-red-900/60 to-slate-900/90 border-rose-500/50 shadow-rose-950/50',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
    icon: 'from-rose-500 to-red-400 shadow-rose-500/30',
    bar: 'from-rose-500 to-red-500',
    accent: 'text-rose-300',
    clock: 'text-rose-400',
    btn: 'from-rose-400 to-red-500 hover:from-rose-300 hover:to-red-400 shadow-rose-500/30',
    label: 'Terlambat Mengembalikan'
  }
};

export default function ActiveRentalBanner({ activeRental, rentalStatus, onOpenReturnModal, onSkipTime }) {
  if (!activeRental || !rentalStatus) return null;

  const t = THEMES[rentalStatus.level];
  const { isOverdue, isLost, lateFee, refund } = rentalStatus;

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${t.box} border p-4 sm:p-5 shadow-2xl backdrop-blur-xl mb-6`}>
      <div className="relative z-10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Kiri: info payung */}
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${t.icon} text-white flex items-center justify-center text-2xl shadow-lg flex-shrink-0 ${rentalStatus.level !== 'normal' ? 'animate-pulse' : ''}`}>
              {isOverdue ? <AlertTriangle className="w-6 h-6" /> : '☂'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-black uppercase tracking-wider border px-2.5 py-0.5 rounded-full ${t.badge}`}>
                  {t.label}
                </span>
                <span className="font-mono text-xs text-white font-bold bg-white/10 px-2 py-0.5 rounded-full">
                  {activeRental.umbrellaId}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                Dipinjam dari {activeRental.originLockerName.replace('Smart Locker ', '')}
              </h3>
            </div>
          </div>

          {/* Tengah: timer & deposit */}
          <div className="flex items-center justify-around sm:justify-center gap-4 bg-slate-950/40 border border-white/10 rounded-2xl px-4 py-2 text-xs">
            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <Clock className={`w-3 h-3 ${t.clock}`} /> {isOverdue ? 'Terlambat' : 'Sisa Waktu'}
              </span>
              <span className="font-mono text-sm font-extrabold text-white">
                {formatDuration(isOverdue ? rentalStatus.overdueSeconds : rentalStatus.remainingSeconds)}
              </span>
            </div>

            <div className="w-px h-6 bg-white/10"></div>

            <div className="text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
                <ShieldCheck className={`w-3 h-3 ${t.clock}`} /> Deposit Kembali
              </span>
              <span className={`text-sm font-bold ${t.accent}`}>
                {formatRupiah(refund)}
                {lateFee > 0 && (
                  <span className="text-[10px] text-rose-300 font-normal"> (denda {formatRupiah(lateFee)})</span>
                )}
              </span>
            </div>
          </div>

          {/* Kanan: tombol */}
          <div>
            <button
              onClick={onOpenReturnModal}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r ${t.btn} text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-2`}
            >
              <CornerDownLeft className="w-4 h-4" />
              <span>Kembalikan Payung</span>
              <span className="bg-slate-950/20 px-1.5 py-0.5 rounded-full text-[10px]">Bebas Titik</span>
            </button>
          </div>
        </div>

        {/* Progress batas waktu */}
        <div>
          <div className="w-full h-1.5 bg-slate-950/50 rounded-full overflow-hidden">
            <div
              style={{ width: `${rentalStatus.progress * 100}%` }}
              className={`h-full rounded-full bg-gradient-to-r ${t.bar} transition-all duration-1000`}
            ></div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1.5 text-[11px]">
            <span className={`${t.accent} leading-snug`}>
              {isLost
                ? 'Deposit habis terpotong denda. Payung dicatat hilang bila tidak segera dikembalikan.'
                : isOverdue
                  ? `Denda ${formatRupiah(RENTAL_CONFIG.lateFeePerHour)}/jam, dipotong dari deposit. Segera kembalikan payung.`
                  : rentalStatus.level === 'warning'
                    ? 'Segera kembalikan payung agar deposit tidak terpotong denda.'
                    : `Batas pinjam ${RENTAL_CONFIG.limitHours} jam. Terlambat dikenai denda ${formatRupiah(RENTAL_CONFIG.lateFeePerHour)}/jam.`}
            </span>

            {/* Kontrol demo */}
            <span className="flex items-center gap-1 flex-shrink-0">
              <span className="text-[10px] text-slate-500 hidden sm:inline">Demo:</span>
              <button
                onClick={() => onSkipTime(3600)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-bold transition"
              >
                <FastForward className="w-3 h-3" /> +1 jam
              </button>
              <button
                onClick={() => onSkipTime((RENTAL_CONFIG.limitHours - 1) * 3600)}
                className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-bold transition"
              >
                Sisa 1 jam
              </button>
              <button
                onClick={() => onSkipTime((RENTAL_CONFIG.limitHours + 1.5) * 3600)}
                className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-bold transition"
              >
                Telat 1,5 jam
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}