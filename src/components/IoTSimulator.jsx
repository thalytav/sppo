import React, { useState } from 'react';
import { Cpu, Lock, Unlock, Wifi, Zap, Terminal, Power, ShieldCheck } from 'lucide-react';

export default function IoTSimulator({ lockers, onUpdateLockerState }) {
  const [selectedLockerId, setSelectedLockerId] = useState(lockers[0].id);
  const [logs, setLogs] = useState([
    { time: '11:40:02', msg: '[BOOT] ESP32-CAM v2.4 initialized. Free heap: 248KB' },
    { time: '11:40:03', msg: '[WIFI] Connected to ITS-Student-WiFi, IP: 10.12.44.89' },
    { time: '11:40:05', msg: '[MQTT] Subscribed: campus/its/locker/LCK-TWR/solenoid' },
    { time: '11:40:12', msg: '[CHECK] 15 slot infrared array: Normal status.' }
  ]);
  const [isPowerOutage, setIsPowerOutage] = useState(false);

  const currentLocker = lockers.find(l => l.id === selectedLockerId) || lockers[0];

  const addLog = (msg) => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [...prev.slice(-15), { time, msg }]);
  };

  const handleToggleSlot = (slotNumber) => {
    const updatedSlots = currentLocker.slots.map(s => {
      if (s.slotNumber === slotNumber) {
        const nextOccupied = !s.isOccupied;
        addLog(`[SLOT #${slotNumber}] Sensor status: ${nextOccupied ? 'PAYUNG MASUK (IN)' : 'PAYUNG DICABUT (OUT)'}`);
        return {
          ...s,
          isOccupied: nextOccupied,
          umbrellaId: nextOccupied ? `ITS-UMB-${slotNumber}0${Math.floor(Math.random()*9)}` : null
        };
      }
      return s;
    });

    const newAvail = updatedSlots.filter(s => s.isOccupied).length;
    const newEmpty = updatedSlots.length - newAvail;

    onUpdateLockerState(currentLocker.id, {
      slots: updatedSlots,
      availableUmbrellas: newAvail,
      emptySlots: newEmpty
    });
  };

  const handleEmergencyUnlock = () => {
    addLog(`[EMERGENCY OVERRIDE] Manual safety solenoid pulse. Mitigasi R3 triggered.`);
    alert(`[MITIGASI R3]\nManual override dibuka untuk ${currentLocker.name}.\nSemua kunci solenoid telah dilepas.`);
  };

  const handleSimulatePowerToggle = () => {
    const next = !isPowerOutage;
    setIsPowerOutage(next);
    if (next) {
      addLog(`[ALARM] Listrik PLN 220V Terputus! UPS Baterai 12V aktif otomatis.`);
    } else {
      addLog(`[INFO] Listrik PLN Kembali Normal.`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Pill */}
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-400/30 px-3 py-1 rounded-full">
              Hardware Lab Simulator
            </span>
            <span className="text-xs text-slate-400 font-mono">ESP32-CAM & Solenoid 12V</span>
          </div>
          <h2 className="text-xl font-black text-white mt-2">
            Simulasi Mikrokontroler IoT & Solenoid Lock
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Rujukan literatur teknis Fitri dkk. (2024) dan Permana dkk. (2025).
          </p>
        </div>

        <select
          value={selectedLockerId}
          onChange={(e) => setSelectedLockerId(e.target.value)}
          className="bg-slate-950 border border-slate-700 text-white rounded-full text-xs px-4 py-2 font-mono"
        >
          {lockers.map((l) => (
            <option key={l.id} value={l.id}>{l.name.replace('Smart Locker ', '')}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 15 Slots (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-white block">{currentLocker.iotDevice}</span>
              <span className="text-[10px] font-mono text-slate-500">Firmware v1.2.0-ITS • Solenoid 12V</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono font-bold">
              <span className={`px-2.5 py-1 rounded-full flex items-center gap-1 ${
                isPowerOutage ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                <Zap className="w-3 h-3" />
                {isPowerOutage ? 'UPS 12V' : 'PLN 220V'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                WiFi 98%
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-300">Array 15 Slot Sensor Solenoid:</span>
              <span className="text-[10px] text-slate-500">Klik slot untuk simulasi payung keluar/masuk</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {currentLocker.slots.map(s => (
                <button
                  key={s.slotNumber}
                  onClick={() => handleToggleSlot(s.slotNumber)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-1 hover:scale-105 active:scale-95 ${
                    s.isOccupied
                      ? 'bg-sky-500/15 border-sky-500/40 text-sky-300 shadow-md'
                      : 'bg-emerald-500/10 border-dashed border-emerald-500/30 text-emerald-400'
                  }`}
                >
                  <div className="w-full flex justify-between text-[10px] font-mono">
                    <span>#{s.slotNumber}</span>
                    {s.isOccupied ? <Lock className="w-3 h-3 text-sky-400" /> : <Unlock className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <div className="text-2xl my-1">{s.isOccupied ? '☂' : '📥'}</div>
                  <div className="text-[10px] font-bold">{s.isOccupied ? 'Payung' : 'Kosong'}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2">
            <button
              onClick={handleSimulatePowerToggle}
              className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold border transition ${
                isPowerOutage ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {isPowerOutage ? 'Nyalakan Kembali Listrik PLN' : 'Simulasi Listrik Padam (Uji UPS)'}
            </button>

            <button
              onClick={handleEmergencyUnlock}
              className="py-2.5 px-4 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition"
            >
              Uji Override Darurat (Mitigasi R3)
            </button>
          </div>
        </div>

        {/* Right: Terminal logs (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs flex flex-col h-[460px]">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-slate-400">
            <span className="font-bold flex items-center gap-1.5 text-white">
              <Terminal className="w-4 h-4 text-emerald-400" />
              ESP32 Serial & MQTT Console
            </span>
            <button
              onClick={() => setLogs([{ time: new Date().toTimeString().split(' ')[0], msg: '[RESET] Terminal cleared' }])}
              className="text-[10px] text-slate-500 hover:text-white"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 py-3 pr-1 text-[11px]">
            {logs.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-slate-600 flex-shrink-0">[{item.time}]</span>
                <span className={item.msg.includes('ALARM') ? 'text-rose-400 font-bold' : item.msg.includes('EMERGENCY') ? 'text-amber-300 font-bold' : 'text-emerald-400'}>
                  {item.msg}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-slate-500 flex items-center gap-2">
            <span className="text-emerald-400">&gt;</span>
            <input
              type="text"
              placeholder="Ketik perintah IoT (mis. AT+TEST)..."
              className="bg-transparent border-none text-white text-xs w-full focus:outline-hidden"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  addLog(`[CMD] ${e.target.value}`);
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
