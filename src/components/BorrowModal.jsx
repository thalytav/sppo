import React, { useState, useEffect } from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, Lock, Unlock, ArrowRight, Loader2, Smartphone, Sparkles } from 'lucide-react';

export default function BorrowModal({ locker, onClose, onBorrowSuccess }) {
  const [step, setStep] = useState(1);
  const [selectedWallet, setSelectedWallet] = useState('gopay');
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockedSlot, setUnlockedSlot] = useState(null);

  const availableSlot = locker.slots.find(s => s.isOccupied);

  useEffect(() => {
    if (step !== 2) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const handleSimulatePayment = () => {
    setStep(3);
    setIsUnlocking(true);

    setTimeout(() => {
      setIsUnlocking(false);
      setUnlockedSlot(availableSlot ? availableSlot.slotNumber : 1);
    }, 2000);
  };

  const handleFinishBorrow = () => {
    const umbrellaId = availableSlot ? availableSlot.umbrellaId : `ITS-UMB-${Math.floor(1000 + Math.random() * 9000)}`;
    const slotNumber = availableSlot ? availableSlot.slotNumber : 1;

    onBorrowSuccess({
      umbrellaId,
      originLockerId: locker.id,
      originLockerName: locker.name,
      slotNumber,
      startTime: new Date().toISOString(),
      depositAmount: 10000,
      rentalFee: 2000,
      paymentMethod: selectedWallet.toUpperCase()
    });
  };

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 text-white rounded-t-3xl sm:rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-400/20">
              Peminjaman Cepat
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Pinjam Payung Smart Locker
            </h3>
            <p className="text-xs text-slate-400">{locker.name.replace('Smart Locker ', '')}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex border-b border-slate-800 text-[11px] font-semibold text-slate-500 bg-slate-950/40">
          <div className={`flex-1 py-2 text-center border-b-2 ${step >= 1 ? 'border-sky-400 text-sky-400' : 'border-transparent'}`}>
            1. Rincian
          </div>
          <div className={`flex-1 py-2 text-center border-b-2 ${step >= 2 ? 'border-sky-400 text-sky-400' : 'border-transparent'}`}>
            2. QRIS
          </div>
          <div className={`flex-1 py-2 text-center border-b-2 ${step >= 3 ? 'border-sky-400 text-sky-400' : 'border-transparent'}`}>
            3. Ambil
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Biaya Sewa (12 Jam)</span>
                  <span className="font-bold text-white">Rp 2.000</span>
                </div>
                <div className="flex justify-between text-slate-400 items-center">
                  <span className="flex items-center gap-1">
                    <span>Deposit Jaminan (100% Refundable)</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  <span className="font-bold text-emerald-400">Rp 10.000</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                  <span>Total Bayar di Muka</span>
                  <span className="text-sky-400 font-mono">Rp 12.000</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center font-bold text-sm text-sky-300">
                  #{availableSlot?.slotNumber || 1}
                </div>
                <div>
                  <div className="font-bold">Slot #{availableSlot?.slotNumber || 1} Akan Terbuka</div>
                  <div className="text-[11px] text-slate-400 font-mono">ID Payung: {availableSlot?.umbrellaId || 'ITS-UMB-0104'}</div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-black rounded-2xl text-xs shadow-lg shadow-sky-500/20 transition flex items-center justify-center gap-2"
              >
                <span>Lanjut ke Pembayaran QRIS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 text-center">
              <div>
                <span className="text-[11px] text-slate-400 font-medium">Scan QRIS Nasional</span>
                <div className="text-2xl font-black text-white font-mono mt-0.5">Rp 12.000</div>
              </div>

              {/* QR Mockup */}
              <div className="inline-block p-4 bg-white rounded-3xl shadow-xl">
                <div className="w-44 h-44 bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white relative p-2">
                  <div className="grid grid-cols-5 grid-rows-5 gap-1.5 w-full h-full p-2 opacity-90">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div key={i} className={`rounded-sm ${(i%2===0 || i%3===0) ? 'bg-white' : 'bg-transparent'}`}></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 m-auto w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-600 font-bold">
                  Dinamis: {formatCountdown(timerSeconds)}
                </div>
              </div>

              {/* Wallet Picker */}
              <div className="grid grid-cols-4 gap-2">
                {['gopay', 'shopeepay', 'dana', 'bca'].map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWallet(w)}
                    className={`py-2 text-[11px] font-black uppercase rounded-xl border transition ${
                      selectedWallet === w
                        ? 'bg-sky-500/20 text-sky-400 border-sky-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-2xl bg-slate-800 text-xs font-bold text-slate-400"
                >
                  Batal
                </button>
                <button
                  onClick={handleSimulatePayment}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-2xl text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Simulasi Bayar Sukses</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              {isUnlocking ? (
                <div className="py-6 space-y-3">
                  <Loader2 className="w-12 h-12 text-sky-400 animate-spin mx-auto" />
                  <h4 className="text-base font-bold text-white">
                    ESP32 Mengaktifkan Kunci Solenoid...
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Verifikasi hash QRIS berhasil • Membuka slot
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                    <Unlock className="w-8 h-8 animate-bounce" />
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      Solenoid Terbuka!
                    </span>
                    <h3 className="text-xl font-black text-white mt-2">
                      Ambil Payung di Slot #{unlockedSlot}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Pintu slot telah terbuka. Silakan tarik payung dan tutup kembali pintu loker.
                    </p>
                  </div>

                  <button
                    onClick={handleFinishBorrow}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-2xl text-xs shadow-lg shadow-emerald-500/20 transition"
                  >
                    Saya Sudah Ambil Payung • Mulai Sesi
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
