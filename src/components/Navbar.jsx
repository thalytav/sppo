import React from 'react';
import { CloudRain, Sun, MapPin, Cpu, BarChart3, FileText, HelpCircle, Sparkles, History } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, activeRental, weather, setWeather, openComplaint }) {
  const toggleWeather = () => {
    if (weather.status === 'rain') {
      setWeather({
        status: 'sunny',
        label: 'Cerah Berawan',
        temp: '32°C',
        icon: Sun,
        desc: 'Panas terik - payung UV pelindung matahari'
      });
    } else {
      setWeather({
        status: 'rain',
        label: 'Hujan di ITS',
        temp: '25°C',
        icon: CloudRain,
        desc: 'Hujan mendadak - payung sangat dibutuhkan!'
      });
    }
  };

  const WeatherIcon = weather.icon;

  return (
    <>
      {/* Floating Modern Header */}
      <header className="sticky top-3 z-40 max-w-7xl mx-auto px-3 sm:px-6">
        <div className="bg-slate-900/85 backdrop-blur-xl border border-slate-700/70 shadow-2xl shadow-sky-950/40 rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('user')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/30 font-black text-lg group-hover:scale-105 transition-transform">
              ☂
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base tracking-tight text-white">SPPO</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  ITS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block -mt-0.5">Smart Umbrella Sharing</p>
            </div>
          </div>

          {/* Desktop Nav Pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-full border border-slate-700/60 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                activeTab === 'user'
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Peta & Pinjam</span>
              {activeRental && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>}
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-md shadow-sky-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Riwayat</span>
            </button>

            <button
              onClick={() => setActiveTab('iot')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                activeTab === 'iot'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Lab IoT ESP32</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Risiko & Logistik</span>
            </button>

            <button
              onClick={() => setActiveTab('bmc')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
                activeTab === 'bmc'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Model Bisnis</span>
            </button>
          </nav>

          {/* Right Controls: Weather Widget & Help */}
          <div className="flex items-center gap-2">
            {/* Weather Toggle Pill */}
            <button
              onClick={toggleWeather}
              title="Klik untuk ubah simulasi cuaca ITS"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs text-slate-200 transition-all hover:scale-102"
            >
              <WeatherIcon className={`w-3.5 h-3.5 ${weather.status === 'rain' ? 'text-sky-400 animate-bounce' : 'text-amber-400 animate-spin'}`} />
              <span className="font-bold text-[11px] hidden sm:inline">{weather.label}</span>
              <span className="font-mono text-[11px] text-sky-400 font-bold">{weather.temp}</span>
            </button>

            {/* Help Button */}
            <button
              onClick={openComplaint}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-emerald-400 transition"
              title="Pusat Bantuan WhatsApp"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Floating Bottom Dock (App-Like Bar) */}
      <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-full px-2 py-1.5 shadow-2xl flex justify-around items-center text-[10px] font-semibold text-slate-400">
        <button
          onClick={() => setActiveTab('user')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition ${
            activeTab === 'user' ? 'text-sky-400 font-bold bg-sky-500/15' : 'hover:text-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Peta</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition ${
            activeTab === 'history' ? 'text-sky-400 font-bold bg-sky-500/15' : 'hover:text-slate-200'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Riwayat</span>
        </button>

        <button
          onClick={() => setActiveTab('iot')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition ${
            activeTab === 'iot' ? 'text-purple-400 font-bold bg-purple-500/15' : 'hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>IoT</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition ${
            activeTab === 'admin' ? 'text-amber-400 font-bold bg-amber-500/15' : 'hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Risiko</span>
        </button>

        <button
          onClick={() => setActiveTab('bmc')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition ${
            activeTab === 'bmc' ? 'text-emerald-400 font-bold bg-emerald-500/15' : 'hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>BMC</span>
        </button>
      </nav>
    </>
  );
}