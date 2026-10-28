import React, { useState } from 'react';
import { MapPin, ShieldCheck, BatteryCharging, Wifi, AlertTriangle, Sparkles, Navigation, ArrowRight, CornerDownLeft, Layers, Compass, CheckCircle2 } from 'lucide-react';

export default function LockerMap({
  lockers = [],
  onSelectBorrowLocker = () => {},
  onSelectReturnLocker = () => {},
  activeRental = null,
  openIoTSimulator = () => {}
}) {
  const [selectedLockerId, setSelectedLockerId] = useState(lockers[0]?.id || null);
  const [filterCategory, setFilterCategory] = useState('ALL');

  const selectedLocker = lockers.find(l => l.id === selectedLockerId) || lockers[0];

  const filteredLockers = filterCategory === 'ALL'
    ? lockers
    : lockers.filter(l => l.category.toLowerCase().includes(filterCategory.toLowerCase()));

  const totalUmbrellas = lockers.reduce((a, b) => a + b.availableUmbrellas, 0);
  const totalEmpty = lockers.reduce((a, b) => a + b.emptySlots, 0);

  if (!selectedLocker) {
    return (
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 text-center text-sm text-slate-400">
        Data smart locker belum tersedia.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Fluid Stat Pills (Not rigid boxes, but smooth rounded pill cards) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-2 sm:p-3 rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
            <span className="text-slate-400">Total Siap:</span>
            <span className="font-extrabold text-white font-mono">{totalUmbrellas} Payung</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400">Slot Kosong:</span>
            <span className="font-extrabold text-emerald-400 font-mono">{totalEmpty} Slot</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
            <span className="text-slate-400">Tarif:</span>
            <span className="font-bold text-amber-300">Rp2.000 / sewa</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-800/60 p-1 rounded-full border border-slate-700/40 text-[11px] font-semibold w-full sm:w-auto justify-center">
          {[
            { id: 'ALL', label: 'Semua (7 Titik)' },
            { id: 'TOWER', label: 'Tower 1, 2, 3 (85%)' },
            { id: 'Fakultas', label: 'Fakultas (95%)' },
            { id: 'Halte', label: 'Halte (65%)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterCategory(f.id)}
              className={`px-3 py-1 rounded-full transition-all ${
                filterCategory === f.id
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Responsive Layout: Map & Dynamic Floating Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Campus Map Visualization (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-b from-[#091428] via-[#0B1E38] to-[#040C1A] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-4 select-none">
            
            {/* Campus Schematic Vector Graphics (Parks, Roads, Lakes) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {/* Danau 8 ITS & Green Areas */}
              <ellipse cx="60%" cy="55%" rx="80" ry="40" fill="#0284c7" opacity="0.15" />
              <path d="M 50 180 Q 150 90 280 140 T 450 120" fill="none" stroke="#0ea5e9" strokeWidth="6" opacity="0.3" strokeLinecap="round" />
              
              {/* Roads / Boulevards */}
              <line x1="5%" y1="92%" x2="50%" y2="45%" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6 3" opacity="0.5" />
              <line x1="50%" y1="45%" x2="50%" y2="12%" stroke="#38bdf8" strokeWidth="4" opacity="0.5" />
              <line x1="50%" y1="45%" x2="85%" y2="75%" stroke="#38bdf8" strokeWidth="4" opacity="0.5" />
              <line x1="28%" y1="30%" x2="50%" y2="45%" stroke="#38bdf8" strokeWidth="3" opacity="0.5" />
              <line x1="50%" y1="45%" x2="70%" y2="22%" stroke="#38bdf8" strokeWidth="3" opacity="0.5" />

              {/* Pedestrian sheltered walkways (Area Prioritas Survei) */}
              <circle cx="50%" cy="38%" r="48" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
              <circle cx="30%" cy="26%" r="40" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
            </svg>

            {/* Landmarks Labels */}
            <div className="absolute top-4 left-5 flex items-center gap-2 text-xs font-bold text-sky-300">
              <Compass className="w-4 h-4 animate-spin text-sky-400" />
              <span className="tracking-wider uppercase">Kampus ITS Sukolilo • Peta Titik Strategis</span>
            </div>

            <div className="absolute bottom-4 left-5 text-[11px] text-slate-400 font-medium">
              Gerbang Utama & Bundaran ITS
            </div>

            {/* Floating Interactive Locker Pins */}
            {lockers.map((locker) => {
              const isSelected = locker.id === selectedLockerId;
              const isLowStock = locker.availableUmbrellas <= 2;

              return (
                <div
                  key={locker.id}
                  onClick={() => setSelectedLockerId(locker.id)}
                  style={{ left: `${locker.coords.x}%`, top: `${locker.coords.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group ${isSelected ? 'z-30' : 'z-20'}`}
                >
                  {/* Glowing Radar Pulse on selected */}
                  {isSelected && (
                    <div className="absolute -inset-3 rounded-full bg-sky-400/40 animate-ping"></div>
                  )}

                  {/* Modern Pill Pin */}
                  <div className={`relative px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 text-xs font-bold transition-all transform ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 scale-110 shadow-amber-400/30 ring-2 ring-white'
                      : isLowStock
                        ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/30 hover:scale-105'
                        : 'bg-slate-900/90 text-white border border-slate-700/80 hover:bg-slate-800 hover:scale-105 backdrop-blur-md'
                  }`}>
                    <span className="text-sm">☂</span>
                    <span className="font-extrabold">{locker.availableUmbrellas}</span>
                    <span className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-rose-300 animate-pulse' : 'bg-emerald-400'}`}></span>
                  </div>

                  {/* Pin Floating Tag */}
                  <div className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold px-2.5 py-0.5 rounded-full pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-md font-bold z-30'
                      : 'bg-slate-950/90 text-slate-300 opacity-0 group-hover:opacity-100 z-30'
                  }`}>
                    {locker.name.replace('Smart Locker ', '')}
                  </div>
                </div>
              );
            })}

            {/* Bottom Floating Legend */}
            <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-full text-[10px] text-slate-300 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Stok Aman</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Stok Minim (Redistribusi)</span>
              </div>
            </div>
          </div>

          {/* Horizontal Scrollable Locker Cards */}
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {filteredLockers.map((l) => (
              <div
                key={l.id}
                onClick={() => setSelectedLockerId(l.id)}
                className={`flex-shrink-0 w-56 p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  selectedLockerId === l.id
                    ? 'bg-gradient-to-br from-sky-950/70 to-slate-900/90 border-sky-400/60 shadow-lg shadow-sky-950/40 ring-1 ring-sky-400/30'
                    : 'bg-slate-900/50 hover:bg-slate-800/60 border-slate-800/80 text-slate-400'
                }`}
              >
                <div className="font-bold text-white text-xs leading-snug line-clamp-2 min-h-[2rem]">
                  {l.name.replace('Smart Locker ', '')}
                </div>
                <div className="flex justify-between items-center gap-2 mt-2 text-[11px]">
                  <span className="font-mono text-sky-400 font-bold whitespace-nowrap">
                    ☂ {l.availableUmbrellas} Payung
                  </span>
                  <span className="text-emerald-400 whitespace-nowrap">{l.emptySlots} slot kosong</span>
                </div>
                <div className="mt-1 text-[10px] text-slate-500">{l.surveyPriority.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Dynamic Detail Card (5 cols) - Smooth Glass Aesthetic */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            
            {/* Top decorative gradient blur */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              
              {/* Category & Status */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {selectedLocker.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ESP32 Online</span>
                </div>
              </div>

              {/* Locker Name & Location */}
              <h3 className="text-xl font-black text-white mt-3">
                {selectedLocker.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>{selectedLocker.locationDesc}</span>
              </p>

              {/* Survey priority pill */}
              <div className="mt-3.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span><b>Riset Pasar:</b> {selectedLocker.surveyPriority}</span>
                </span>
                <span className="text-[10px] font-mono bg-amber-400/20 px-2 py-0.5 rounded-full">Tugas 1</span>
              </div>

              {/* Circular / Fluid Capacity Visualization */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <div className="flex justify-between items-center text-xs text-slate-300 mb-2 font-medium">
                  <span>Ketersediaan Armada</span>
                  <span className="font-mono text-sky-400">{selectedLocker.availableUmbrellas} dari {selectedLocker.totalSlots} Slot Berisi Payung</span>
                </div>

                {/* Smooth Progress Bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                  <div
                    style={{ width: `${(selectedLocker.availableUmbrellas / selectedLocker.totalSlots) * 100}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 transition-all duration-500"
                  ></div>
                </div>

                <div className="flex justify-between items-center text-xs mt-2.5">
                  <span className="text-sky-300 font-bold flex items-center gap-1">
                    ☂ {selectedLocker.availableUmbrellas} Payung Siap
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    📥 {selectedLocker.emptySlots} Slot Kosong
                  </span>
                </div>
              </div>

              {/* Slot Indicator Pills */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span>{selectedLocker.totalSlots} Slot Solenoid Lock:</span>
                  <span className="text-[10px] font-mono text-slate-500">Auto Sensor</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedLocker.slots.map(s => (
                    <div
                      key={s.slotNumber}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                        s.isOccupied
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                          : 'bg-emerald-500/10 text-emerald-400 border border-dashed border-emerald-500/40'
                      }`}
                      title={`Slot #${s.slotNumber}: ${s.isOccupied ? 'Payung Tersedia' : 'Slot Kosong'}`}
                    >
                      {s.isOccupied ? '☂' : s.slotNumber}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware diagnostics */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PLN + UPS 12V</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-sky-400" />
                  <span>ITS-Student-WiFi</span>
                </div>
              </div>

              {/* Big Responsive CTA Buttons */}
              <div className="mt-5 space-y-2.5">
                <button
                  onClick={() => onSelectBorrowLocker(selectedLocker)}
                  disabled={selectedLocker.availableUmbrellas === 0 || activeRental !== null}
                  className={`w-full py-3.5 px-5 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                    activeRental !== null
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : selectedLocker.availableUmbrellas === 0
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 cursor-not-allowed'
                        : 'bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 shadow-sky-500/30 hover:scale-102 active:scale-98'
                  }`}
                >
                  <span>☂ Pinjam Payung di Titik Ini</span>
                  <span className="bg-slate-950/20 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    Rp2.000
                  </span>
                </button>

                {activeRental && (
                  <button
                    onClick={() => onSelectReturnLocker(selectedLocker)}
                    disabled={selectedLocker.emptySlots === 0}
                    className="w-full py-3.5 px-5 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:scale-102 transition shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                  >
                    <CornerDownLeft className="w-4 h-4" />
                    <span>Kembalikan Payung ke Titik Ini (Refund Rp10rb)</span>
                  </button>
                )}

                <button
                  onClick={() => openIoTSimulator(selectedLocker)}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition flex items-center justify-center gap-2"
                >
                  <span>⚡ Buka Panel Lab Hardware ESP32</span>
                </button>
              </div>

            </div>
          </div>

          {/* Pricing Guarantee Floating Card */}
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 text-xs text-slate-400 space-y-1.5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-white font-bold">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Transparansi Skema Pembayaran</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Biaya sewa <b>Rp2.000</b>. Jaminan deposit <b>Rp10.000</b> akan <b>100% dikembalikan otomatis</b> ke e-wallet begitu payung dimasukkan ke smart locker mana saja di kampus ITS.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}