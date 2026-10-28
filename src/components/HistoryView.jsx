import React from 'react';
import { History, Wallet, Receipt, ArrowRight, Clock, CheckCircle2, AlertTriangle, Trash2, Database } from 'lucide-react';
import { RENTAL_CONFIG, formatRupiah, formatDuration } from '../data/rentalConfig';

const fmtDate = (iso) =>
  new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const shortName = (n) => (n || '').replace('Smart Locker ', '');

export default function HistoryView({ history = [], activeRental = null, rentalStatus = null, onClear = () => {}, onLoadSample = () => {} }) {
  const totalRentalFee = history.reduce((a, h) => a + h.rentalFee, 0);
  const totalLateFee = history.reduce((a, h) => a + h.lateFee, 0);
  const totalRefund = history.reduce((a, h) => a + h.depositRefunded, 0);
  const onTimeCount = history.filter((h) => h.lateFee === 0).length;
  const heldDeposit = activeRental ? RENTAL_CONFIG.depositAmount : 0;

  const stats = [
    { label: 'Total Peminjaman', value: `${history.length}x`, sub: `${onTimeCount} tepat waktu`, color: 'text-sky-300' },
    { label: 'Total Biaya Sewa', value: formatRupiah(totalRentalFee), sub: `${formatRupiah(RENTAL_CONFIG.rentalFee)} / pinjam`, color: 'text-amber-300' },
    { label: 'Total Denda', value: formatRupiah(totalLateFee), sub: 'dipotong dari deposit', color: totalLateFee > 0 ? 'text-rose-300' : 'text-slate-300' },
    { label: 'Deposit Dikembalikan', value: formatRupiah(totalRefund), sub: 'ke e-wallet', color: 'text-emerald-300' }
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3 py-1 rounded-full">
              Riwayat & Dompet
            </span>
            <span className="text-xs text-slate-400 font-mono">Resi Digital</span>
          </div>
          <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            Riwayat Peminjaman
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Catatan transaksi, denda keterlambatan, dan status pengembalian deposit.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClear}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500/40 text-xs text-slate-400 hover:text-rose-300 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Hapus Riwayat
          </button>
        )}
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-slate-900/70 border border-slate-800 p-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{s.label}</div>
            <div className={`text-lg font-black font-mono mt-1 ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{s.sub}</div>
          </div>
        ))}

        <div className="col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/30 p-4">
          <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
            <Wallet className="w-3 h-3" /> Deposit Tertahan
          </div>
          <div className="text-lg font-black font-mono mt-1 text-white">{formatRupiah(heldDeposit)}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {activeRental ? 'Kembali saat payung dikembalikan' : 'Tidak ada sesi aktif'}
          </div>
        </div>
      </div>

      {/* Daftar transaksi */}
      <div className="space-y-3">

        {/* Sesi berlangsung */}
        {activeRental && rentalStatus && (
          <div className="rounded-3xl bg-slate-900/80 border border-emerald-500/40 p-4 sm:p-5 shadow-xl">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full animate-pulse">
                  Sedang Berlangsung
                </span>
                <span className="font-mono text-xs text-white font-bold">{activeRental.umbrellaId}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">{fmtDate(activeRental.startTime)}</span>
            </div>
            <div className="mt-2 text-xs text-slate-300 flex items-center gap-1.5">
              <span>{shortName(activeRental.originLockerName)}</span>
              <ArrowRight className="w-3 h-3 text-slate-500" />
              <span className="text-slate-500">belum dikembalikan</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDuration(rentalStatus.elapsedSeconds)}</span>
              {rentalStatus.lateFee > 0 && (
                <span className="text-rose-300 font-bold">Denda berjalan {formatRupiah(rentalStatus.lateFee)}</span>
              )}
            </div>
          </div>
        )}

        {history.length === 0 && !activeRental && (
          <div className="rounded-3xl bg-slate-900/60 border border-dashed border-slate-700 p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
              <Receipt className="w-6 h-6 text-slate-500" />
            </div>
            <div className="text-sm font-bold text-white">Belum ada riwayat peminjaman</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Pinjam dan kembalikan payung dari tab Peta & Pinjam, transaksinya akan tercatat di sini.
            </p>
            <button
              onClick={onLoadSample}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-xs font-bold text-sky-300 transition"
            >
              <Database className="w-3.5 h-3.5" />
              Muat Data Contoh (untuk demo)
            </button>
          </div>
        )}

        {history.map((h) => {
          const late = h.lateFee > 0;
          return (
            <div key={h.id} className="rounded-3xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5 shadow-xl">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-black uppercase tracking-wider border px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    late
                      ? 'bg-rose-500/15 text-rose-300 border-rose-400/30'
                      : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
                  }`}>
                    {late ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    {late ? 'Terlambat' : 'Tepat Waktu'}
                  </span>
                  <span className="font-mono text-xs text-white font-bold">{h.umbrellaId}</span>
                  {h.isSample && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Contoh</span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 font-mono">{h.id}</span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-200 flex-wrap">
                <span className="font-semibold">{shortName(h.originLockerName)}</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span className="font-semibold">{shortName(h.returnLockerName)}</span>
              </div>

              <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                <span>{fmtDate(h.startTime)} → {fmtDate(h.endTime)}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDuration(h.durationSeconds)}</span>
                <span className="font-mono">{h.paymentMethod}</span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-slate-950/50 border border-slate-800 py-2">
                  <div className="text-[10px] text-slate-500">Biaya Sewa</div>
                  <div className="text-xs font-bold font-mono text-amber-300">{formatRupiah(h.rentalFee)}</div>
                </div>
                <div className="rounded-xl bg-slate-950/50 border border-slate-800 py-2">
                  <div className="text-[10px] text-slate-500">Denda</div>
                  <div className={`text-xs font-bold font-mono ${late ? 'text-rose-300' : 'text-slate-400'}`}>
                    {late ? `-${formatRupiah(h.lateFee)}` : 'Rp0'}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-950/50 border border-slate-800 py-2">
                  <div className="text-[10px] text-slate-500">Deposit Kembali</div>
                  <div className="text-xs font-bold font-mono text-emerald-300">{formatRupiah(h.depositRefunded)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}