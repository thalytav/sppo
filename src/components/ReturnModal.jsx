import React, { useState } from 'react';
import { X, CornerDownLeft, ShieldCheck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function ReturnModal({ lockers, activeRental, initialLocker, onClose, onReturnSuccess }) {
  const [targetLockerId, setTargetLockerId] = useState(initialLocker?.id || lockers[0].id);
  const [returnStep, setReturnStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [assignedSlot, setAssignedSlot] = useState(null);

  const targetLocker = lockers.find(l => l.id === targetLockerId) || lockers[0];
  const hasEmptySlot = targetLocker.emptySlots > 0;

  const handleStartReturn = () => {
    if (!hasEmptySlot) return;
    setReturnStep(2);
    setIsProcessing(true);

    const emptySlotObj = targetLocker.slots.find(s => !s.isOccupied);
    const slotNumber = emptySlotObj ? emptySlotObj.slotNumber : (targetLocker.totalSlots - targetLocker.emptySlots + 1);

    setTimeout(() => {
      setIsProcessing(false);
      setAssignedSlot(slotNumber);
      setReturnStep(3);
    }, 2000);
  };

  const handleFinish = () => {
    onReturnSuccess({
      returnLockerId: targetLocker.id,
      returnLockerName: targetLocker.name,
      slotNumber: assignedSlot,
      depositRefunded: 10000,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 text-white rounded-t-3xl sm:rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
              Pengembalian Fleksibel
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Kembalikan Payung
            </h3>
            <p className="text-xs text-slate-400">ID: {activeRental?.umbrellaId}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* STEP 1 */}
          {returnStep === 1 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 block">
                Pilih Smart Locker Tempat Anda Berada:
              </label>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {lockers.map((l) => {
                  const isSelected = l.id === targetLockerId;
                  const isFull = l.emptySlots === 0;

                  return (
                    <div
                      key={l.id}
                      onClick={() => !isFull && setTargetLockerId(l.id)}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition flex items-center justify-between ${
                        isFull
                          ? 'bg-slate-900/40 border-slate-800 opacity-40 cursor-not-allowed'
                          : isSelected
                            ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500/40'
                            : 'border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{l.name.replace('Smart Locker ', '')}</span>
                          {l.id === activeRental?.originLockerId && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                              Asal
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{l.surveyPriority.split(' ')[0]}</div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isFull ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {isFull ? 'Penuh' : `${l.emptySlots} slot`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Deposit Guarantee */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Jaminan Dikembalikan:</span>
                </span>
                <span className="text-sm font-black text-emerald-400 font-mono">
                  Rp 10.000 (100% Utuh)
                </span>
              </div>

              <button
                onClick={handleStartReturn}
                disabled={!hasEmptySlot}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
              >
                <span>Buka Slot di {targetLocker.name.replace('Smart Locker ', '')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {returnStep === 2 && (
            <div className="text-center py-6 space-y-3">
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto" />
              <h4 className="text-base font-bold text-white">
                Mendeteksi Payung di Smart Locker...
              </h4>
              <p className="text-xs text-slate-400">
                Sensor slot memvalidasi nomor seri payung...
              </p>
            </div>
          )}

          {/* STEP 3 */}
          {returnStep === 3 && (
            <div className="text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  Pengembalian Berhasil!
                </span>
                <h3 className="text-xl font-black text-white mt-2">
                  Deposit Rp 10.000 Telah Dikembalikan
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Payung telah terkunci aman di Slot #{assignedSlot}. Saldo jaminan telah dikreditkan ke e-wallet Anda.
                </p>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-2xl text-xs shadow-lg shadow-emerald-500/20 transition"
              >
                Selesai
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
