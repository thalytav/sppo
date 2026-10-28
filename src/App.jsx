import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, ShieldAlert, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import ActiveRentalBanner from './components/ActiveRentalBanner';
import LockerMap from './components/LockerMap';
import BorrowModal from './components/BorrowModal';
import ReturnModal from './components/ReturnModal';
import IoTSimulator from './components/IoTSimulator';
import AdminDashboard from './components/AdminDashboard';
import BmcViewer from './components/BmcViewer';
import HistoryView from './components/HistoryView';
import ComplaintModal from './components/ComplaintModal';
import { INITIAL_LOCKERS, PROJECT_INFO } from './data/mockData';
import { getRentalStatus } from './data/rentalConfig';
import { buildSampleHistory } from './data/sampleHistory';

export default function App() {
  const [activeTab, setActiveTab] = useState('user'); // 'user' | 'history' | 'iot' | 'admin' | 'bmc'
  const [lockers, setLockers] = useState(INITIAL_LOCKERS);
  const [activeRental, setActiveRental] = useState(null);

  // Timer sewa: lama pemakaian (detik) + offset untuk simulasi demo
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeOffsetSeconds, setTimeOffsetSeconds] = useState(0);

  useEffect(() => {
    if (!activeRental) {
      setElapsedSeconds(0);
      return;
    }
    const tick = () => {
      const real = Math.floor((Date.now() - new Date(activeRental.startTime).getTime()) / 1000);
      setElapsedSeconds(Math.max(0, real) + timeOffsetSeconds);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [activeRental, timeOffsetSeconds]);

  const rentalStatus = getRentalStatus(elapsedSeconds);

  // Riwayat peminjaman (disimpan di localStorage browser agar tidak hilang saat refresh)
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sppo-history')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sppo-history', JSON.stringify(history));
    } catch {
      /* abaikan bila storage tidak tersedia */
    }
  }, [history]);

  // Weather state (Default: Rain in ITS campus based on the proposal context)
  const [weather, setWeather] = useState({
    status: 'rain',
    label: 'Hujan di ITS',
    temp: '25°C',
    icon: CloudRain,
    desc: 'Hujan mendadak - payung sangat dibutuhkan!'
  });

  // Modals
  const [borrowModalLocker, setBorrowModalLocker] = useState(null);
  const [returnModalLocker, setReturnModalLocker] = useState(null);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  // Borrow Success
  const handleBorrowSuccess = (rentalData) => {
    setLockers(prev => prev.map(l => {
      if (l.id === rentalData.originLockerId) {
        const updatedSlots = l.slots.map(s => {
          if (s.slotNumber === rentalData.slotNumber) {
            return { ...s, isOccupied: false, umbrellaId: null, isLocked: false };
          }
          return s;
        });
        return {
          ...l,
          availableUmbrellas: Math.max(0, l.availableUmbrellas - 1),
          emptySlots: l.emptySlots + 1,
          slots: updatedSlots
        };
      }
      return l;
    }));

    setTimeOffsetSeconds(0);
    setActiveRental(rentalData);
    setBorrowModalLocker(null);
  };

  // Return Success
  const handleReturnSuccess = ({ returnLockerId, returnLockerName, slotNumber, depositRefunded, lateFee, timestamp }) => {
    if (activeRental) {
      const record = {
        id: `TRX-${Date.now().toString(36).toUpperCase()}`,
        umbrellaId: activeRental.umbrellaId,
        originLockerName: activeRental.originLockerName,
        returnLockerName,
        startTime: activeRental.startTime,
        endTime: timestamp || new Date().toISOString(),
        durationSeconds: elapsedSeconds,
        rentalFee: activeRental.rentalFee,
        depositAmount: activeRental.depositAmount,
        lateFee: lateFee || 0,
        depositRefunded,
        paymentMethod: activeRental.paymentMethod
      };
      setHistory(prev => [record, ...prev]);
    }

    setLockers(prev => prev.map(l => {
      if (l.id === returnLockerId) {
        const updatedSlots = l.slots.map(s => {
          if (s.slotNumber === slotNumber) {
            return { ...s, isOccupied: true, umbrellaId: activeRental.umbrellaId, isLocked: true };
          }
          return s;
        });
        return {
          ...l,
          availableUmbrellas: l.availableUmbrellas + 1,
          emptySlots: Math.max(0, l.emptySlots - 1),
          slots: updatedSlots
        };
      }
      return l;
    }));

    setActiveRental(null);
    setTimeOffsetSeconds(0);
    setReturnModalLocker(null);
  };

  // Update Locker State from IoT Simulator
  const handleUpdateLockerState = (lockerId, updatedFields) => {
    setLockers(prev => prev.map(l => l.id === lockerId ? { ...l, ...updatedFields } : l));
  };

  // Rebalancing Redistribution
  const handleRedistributeUmbrellas = () => {
    setLockers(prev => {
      return prev.map(l => {
        if (l.id === 'LCK-HALTE') {
          const updatedSlots = l.slots.map((s, idx) => {
            if (idx < 6) return { ...s, isOccupied: true, umbrellaId: `ITS-UMB-030${idx+1}`, isLocked: true };
            return s;
          });
          return { ...l, availableUmbrellas: 6, emptySlots: 9, slots: updatedSlots, status: 'online' };
        }
        if (l.id === 'LCK-TWR-2') {
          const updatedSlots = l.slots.map((s, idx) => {
            if (idx >= 4) return { ...s, isOccupied: false, umbrellaId: null, isLocked: false };
            return s;
          });
          return { ...l, availableUmbrellas: 4, emptySlots: 6, slots: updatedSlots };
        }
        return l;
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-x-hidden pb-20 lg:pb-8">
      
      {/* Background Animated Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-sky-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px]"></div>

        {/* Rain streaks simulation when rain weather is active */}
        {weather.status === 'rain' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="raindrop"
                style={{
                  left: `${(i * 3.3) % 100}%`,
                  width: '1px',
                  height: `${30 + (i % 5) * 15}px`,
                  animationDuration: `${0.8 + (i % 4) * 0.2}s`,
                  animationDelay: `${(i % 10) * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Floating Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeRental={activeRental}
          weather={weather}
          setWeather={setWeather}
          openComplaint={() => setIsComplaintModalOpen(true)}
        />

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-5">
          
          {/* Active Rental Alert */}
          <ActiveRentalBanner
            activeRental={activeRental}
            rentalStatus={rentalStatus}
            onOpenReturnModal={() => setReturnModalLocker(lockers[0])}
            onSkipTime={(seconds) => setTimeOffsetSeconds(prev => prev + seconds)}
          />

          {/* Views */}
          {activeTab === 'user' && (
            <LockerMap
              lockers={lockers}
              onSelectBorrowLocker={(locker) => setBorrowModalLocker(locker)}
              onSelectReturnLocker={(locker) => setReturnModalLocker(locker)}
              activeRental={activeRental}
              openIoTSimulator={() => setActiveTab('iot')}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              history={history}
              activeRental={activeRental}
              rentalStatus={rentalStatus}
              onClear={() => setHistory([])}
              onLoadSample={() => setHistory(buildSampleHistory())}
            />
          )}

          {activeTab === 'iot' && (
            <IoTSimulator
              lockers={lockers}
              onUpdateLockerState={handleUpdateLockerState}
            />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard
              lockers={lockers}
              onRedistributeUmbrellas={handleRedistributeUmbrellas}
            />
          )}

          {activeTab === 'bmc' && (
            <BmcViewer />
          )}

        </main>

        {/* Modals */}
        {borrowModalLocker && (
          <BorrowModal
            locker={borrowModalLocker}
            onClose={() => setBorrowModalLocker(null)}
            onBorrowSuccess={handleBorrowSuccess}
          />
        )}

        {returnModalLocker && (
          <ReturnModal
            lockers={lockers}
            activeRental={activeRental}
            initialLocker={returnModalLocker}
            rentalStatus={rentalStatus}
            onClose={() => setReturnModalLocker(null)}
            onReturnSuccess={handleReturnSuccess}
          />
        )}

        {isComplaintModalOpen && (
          <ComplaintModal
            onClose={() => setIsComplaintModalOpen(false)}
          />
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-800/80 py-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xs">
                ITS
              </div>
              <div>
                <span className="font-bold text-slate-300">SPPO • Smart Umbrella Sharing</span>
                <p className="text-[10px] text-slate-500">Institut Teknologi Sepuluh Nopember 2026</p>
              </div>
            </div>

            <div className="text-center sm:text-right text-[11px] text-slate-400">
              <div>Dr. Drs. Soehardjoepri, M.Si. (Dosen Pengampu)</div>
              <div className="text-slate-600 mt-0.5">Kelompok 5 Kewirausahaan ITS</div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}