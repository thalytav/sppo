import React, { useState } from 'react';
import { X, MessageSquare, PhoneCall, CheckCircle, Send } from 'lucide-react';

export default function ComplaintModal({ onClose }) {
  const [complaintType, setComplaintType] = useState('locker_stuck');
  const [description, setDescription] = useState('');
  const [lockerLocation, setLockerLocation] = useState('Menara TOWER ITS');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 text-white rounded-t-3xl sm:rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-base border border-emerald-400/30">
              💬
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Pusat Bantuan & Pengaduan
              </h3>
              <p className="text-xs text-slate-400">Customer Support SPPO ITS</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">
                Pengaduan Berhasil Dikirim!
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Tim teknis SPPO ITS sedang memverifikasi pengaduan Anda. Jika terkait deposit, saldo akan segera disesuaikan.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black rounded-full text-xs shadow-lg transition hover:scale-102"
              >
                Tutup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {/* WhatsApp direct pill */}
              <a
                href="https://wa.me/6281234567890?text=Halo%20Admin%20SPPO%20ITS,%20saya%20butuh%20bantuan"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20 transition group"
              >
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white">Chat WhatsApp Pengaduan Cepat</div>
                    <div className="text-[10px] text-emerald-400/80">Respon dalam 3 menit</div>
                  </div>
                </div>
                <span className="font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>

              <div className="text-center text-[10px] text-slate-500 font-mono">
                — atau laporkan formulir teknis —
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Jenis Kendala (Bab 2.1.4):</label>
                <select
                  value={complaintType}
                  onChange={(e) => setComplaintType(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="locker_stuck">Kunci Solenoid Tidak Terbuka (Kendala Teknis)</option>
                  <option value="deposit_issue">Deposit Rp10.000 Belum Masuk Rekening E-Wallet</option>
                  <option value="broken_umbrella">Payung Rusak Saat Ditarik</option>
                  <option value="locker_full">Semua Slot Penuh di Titik Tujuan</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Titik Smart Locker:</label>
                <input
                  type="text"
                  value={lockerLocation}
                  onChange={(e) => setLockerLocation(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs"
                  placeholder="Tower ITS / Halte Parkir"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Deskripsi:</label>
                <textarea
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs"
                  placeholder="Ketik keterangan atau nomor HP e-wallet..."
                  required
                ></textarea>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-3 rounded-2xl bg-slate-800 text-xs font-bold text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-sky-400 to-blue-600 text-slate-950 font-black rounded-2xl text-xs shadow-lg shadow-sky-500/20 transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Laporan</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
