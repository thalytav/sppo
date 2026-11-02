import { INITIAL_LOCKERS, PROJECT_INFO } from './data/mockData.js';
import { buildSampleHistory } from './data/SampleHistory.js';
import { RENTAL_CONFIG, formatDuration, getRentalStatus } from './data/RentalConfig.js';
import { renderAdmin, renderBanner, renderBmc, renderHistory, renderIot, renderMap } from './views.js';
import { renderModals } from './modals.js';
import { esc } from './ui.js';

const root = document.querySelector('#app');
const clone = (value) => JSON.parse(JSON.stringify(value));
const initialWeather = () => ({
  status: 'rain',
  label: 'Hujan di ITS',
  temp: '25°C',
  desc: 'Hujan mendadak - payung sangat dibutuhkan!'
});

function readHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem('sppo-history') || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

const state = {
  activeTab: 'user',
  lockers: clone(INITIAL_LOCKERS),
  activeRental: null,
  elapsedSeconds: 0,
  timeOffsetSeconds: 0,
  history: readHistory(),
  weather: initialWeather(),
  selectedLockerId: INITIAL_LOCKERS[0]?.id || null,
  filterCategory: 'ALL',
  borrow: null,
  returning: null,
  complaintOpen: false,
  complaintSubmitted: false,
  complaintLocation: 'Menara TOWER ITS',
  complaintDescription: '',
  adminTab: 'risk',
  selectedRiskId: 'R1',
  redistributing: false,
  iotLockerId: INITIAL_LOCKERS[0]?.id || null,
  logs: [
    { time: '11:40:02', msg: '[BOOT] ESP32-CAM v2.4 initialized. Free heap: 248KB' },
    { time: '11:40:03', msg: '[WIFI] Connected to ITS-Student-WiFi, IP: 10.12.44.89' },
    { time: '11:40:05', msg: '[MQTT] Subscribed: campus/its/locker/LCK-TWR/solenoid' },
    { time: '11:40:12', msg: '[CHECK] 15 slot infrared array: Normal status.' }
  ],
  iotCommand: '',
  powerOutage: false
};

function addLog(message) {
  state.logs = [...state.logs.slice(-15), { time: new Date().toTimeString().split(' ')[0], msg: message }];
}

function saveHistory() {
  try {
    localStorage.setItem('sppo-history', JSON.stringify(state.history));
  } catch {
    // Keep the session usable when browser storage is unavailable.
  }
}

function navButton(id, label, icon, compact = false) {
  const active = state.activeTab === id;
  const activeClass = active ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/60';
  const mobileClass = active ? 'text-sky-400 font-bold bg-sky-500/15' : 'text-slate-400 hover:text-slate-200';
  return `<button type="button" data-action="tab" data-value="${id}" class="${compact ? `flex flex-col items-center gap-0.5 px-3 py-1 rounded-full transition ${mobileClass}` : `flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${activeClass}`}"><span aria-hidden="true">${icon}</span><span>${label}</span>${id === 'user' && state.activeRental && !compact ? '<i class="w-2 h-2 rounded-full bg-emerald-400"></i>' : ''}</button>`;
}

function renderNavbar() {
  const weatherIcon = state.weather.status === 'rain' ? '🌧️' : '☀️';
  return `<header class="sticky top-3 z-40 max-w-7xl mx-auto px-3 sm:px-6 w-full">
    <div class="bg-slate-900/85 backdrop-blur-xl border border-slate-700/70 shadow-2xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2">
      <button type="button" data-action="tab" data-value="user" class="flex items-center gap-2.5 text-left">
        <span class="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg font-black text-lg">☂</span>
        <span><b class="text-base tracking-tight text-white">SPPO</b> <small class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">ITS</small><span class="block text-[10px] text-slate-400 hidden sm:block">Smart Umbrella Sharing</span></span>
      </button>
      <nav class="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-full border border-slate-700/60 text-xs font-semibold">
        ${navButton('user', 'Peta & Pinjam', '⌖')}${navButton('history', 'Riwayat', '◷')}${navButton('iot', 'Lab IoT ESP32', '⌘')}${navButton('admin', 'Risiko & Logistik', '▥')}${navButton('bmc', 'Model Bisnis', '▤')}
      </nav>
      <div class="flex items-center gap-2">
        <button type="button" data-action="toggle-weather" title="Klik untuk ubah simulasi cuaca ITS" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs text-slate-200"><span>${weatherIcon}</span><span class="font-bold text-[11px] hidden sm:inline">${esc(state.weather.label)}</span><b class="font-mono text-[11px] text-sky-400">${esc(state.weather.temp)}</b></button>
        <button type="button" data-action="open-complaint" class="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-emerald-400" title="Pusat Bantuan WhatsApp">?</button>
      </div>
    </div>
  </header>
  <nav class="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-full px-2 py-1.5 shadow-2xl flex justify-around items-center text-[10px] font-semibold">
    ${navButton('user', 'Peta', '⌖', true)}${navButton('history', 'Riwayat', '◷', true)}${navButton('iot', 'IoT', '⌘', true)}${navButton('admin', 'Risiko', '▥', true)}${navButton('bmc', 'BMC', '▤', true)}
  </nav>`;
}

function renderFooter() {
  return `<footer class="mt-16 border-t border-slate-800/80 py-8 text-xs text-slate-500"><div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4"><div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xs">ITS</div><div><b class="text-slate-300">SPPO • Smart Umbrella Sharing</b><p class="text-[10px] text-slate-500">Institut Teknologi Sepuluh Nopember ${esc(PROJECT_INFO.year)}</p></div></div><div class="text-center sm:text-right text-[11px] text-slate-400"><div>${esc(PROJECT_INFO.lecturer)} (Dosen Pengampu)</div><div class="text-slate-600 mt-0.5">Kelompok 5 Kewirausahaan ITS</div></div></div></footer>`;
}

function renderContent() {
  if (state.activeTab === 'history') return renderHistory(state);
  if (state.activeTab === 'iot') return renderIot(state);
  if (state.activeTab === 'admin') return renderAdmin(state);
  if (state.activeTab === 'bmc') return renderBmc();
  return renderMap(state);
}

function render() {
  const focusedElement = root.contains(document.activeElement) ? document.activeElement : null;
  const focusName = focusedElement?.getAttribute('name');
  const selectionStart = typeof focusedElement?.selectionStart === 'number' ? focusedElement.selectionStart : null;
  const selectionEnd = typeof focusedElement?.selectionEnd === 'number' ? focusedElement.selectionEnd : null;
  if (state.activeRental) {
    const realSeconds = Math.floor((Date.now() - new Date(state.activeRental.startTime).getTime()) / 1000);
    state.elapsedSeconds = Math.max(0, realSeconds) + state.timeOffsetSeconds;
  } else {
    state.elapsedSeconds = 0;
  }
  state.rentalStatus = getRentalStatus(state.elapsedSeconds);
  const rain = state.weather.status === 'rain'
    ? `<div class="fixed inset-0 overflow-hidden pointer-events-none opacity-20 z-0">${Array.from({ length: 30 }, (_, index) => `<i class="raindrop" style="left:${(index * 3.3) % 100}%;width:1px;height:${30 + (index % 5) * 15}px;animation-duration:${0.8 + (index % 4) * 0.2}s;animation-delay:${(index % 10) * 0.1}s"></i>`).join('')}</div>`
    : '';
  root.innerHTML = `<div class="min-h-screen flex flex-col bg-slate-950 text-slate-100 relative overflow-x-hidden pb-20 lg:pb-8">
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden"><div class="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-sky-600/15 rounded-full blur-[140px]"></div><div class="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px]"></div><div class="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px]"></div>${rain}</div>
    <div class="relative z-10 flex flex-col flex-1">${renderNavbar()}<main class="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-5">${renderBanner(state)}${renderContent()}</main>${renderFooter()}</div>${renderModals(state)}
  </div>`;
  if (focusName) {
    const replacement = [...root.querySelectorAll('[name]')].find((element) => element.getAttribute('name') === focusName);
    if (replacement) {
      replacement.focus({ preventScroll: true });
      if (selectionStart !== null && selectionEnd !== null && typeof replacement.setSelectionRange === 'function') {
        replacement.setSelectionRange(selectionStart, selectionEnd);
      }
    }
  }
}

function openBorrow(lockerId) {
  const locker = state.lockers.find((item) => item.id === lockerId);
  if (!locker || locker.availableUmbrellas === 0 || state.activeRental) return;
  state.borrow = { lockerId, step: 1, wallet: 'gopay', timer: 180, unlocking: false, unlockedSlot: null };
  render();
}

function openReturn(lockerId) {
  if (!state.activeRental) return;
  state.returning = { lockerId: lockerId || state.lockers[0]?.id, step: 1, assignedSlot: null };
  render();
}

function finishBorrow() {
  const modal = state.borrow;
  if (!modal) return;
  const locker = state.lockers.find((item) => item.id === modal.lockerId);
  if (!locker) return;
  const slot = locker.slots.find((item) => item.isOccupied);
  const slotNumber = slot?.slotNumber || 1;
  const umbrellaId = slot?.umbrellaId || `ITS-UMB-${Math.floor(1000 + Math.random() * 9000)}`;
  state.lockers = state.lockers.map((item) => item.id === locker.id ? {
    ...item,
    availableUmbrellas: Math.max(0, item.availableUmbrellas - 1),
    emptySlots: item.emptySlots + 1,
    slots: item.slots.map((entry) => entry.slotNumber === slotNumber
      ? { ...entry, isOccupied: false, umbrellaId: null, isLocked: false }
      : entry)
  } : item);
  state.activeRental = {
    umbrellaId,
    originLockerId: locker.id,
    originLockerName: locker.name,
    slotNumber,
    startTime: new Date().toISOString(),
    depositAmount: RENTAL_CONFIG.depositAmount,
    rentalFee: RENTAL_CONFIG.rentalFee,
    paymentMethod: modal.wallet.toUpperCase()
  };
  state.borrow = null;
  state.timeOffsetSeconds = 0;
  render();
}

function finishReturn() {
  const modal = state.returning;
  const rental = state.activeRental;
  if (!modal || !rental) return;
  const locker = state.lockers.find((item) => item.id === modal.lockerId);
  if (!locker) return;
  const status = getRentalStatus(state.elapsedSeconds);
  const record = {
    id: `TRX-${Date.now().toString(36).toUpperCase()}`,
    umbrellaId: rental.umbrellaId,
    originLockerName: rental.originLockerName,
    returnLockerName: locker.name,
    startTime: rental.startTime,
    endTime: new Date().toISOString(),
    durationSeconds: state.elapsedSeconds,
    rentalFee: rental.rentalFee,
    depositAmount: rental.depositAmount,
    lateFee: status.lateFee,
    depositRefunded: status.refund,
    paymentMethod: rental.paymentMethod
  };
  state.history = [record, ...state.history];
  saveHistory();
  state.lockers = state.lockers.map((item) => item.id === locker.id ? {
    ...item,
    availableUmbrellas: item.availableUmbrellas + 1,
    emptySlots: Math.max(0, item.emptySlots - 1),
    slots: item.slots.map((entry) => entry.slotNumber === modal.assignedSlot
      ? { ...entry, isOccupied: true, umbrellaId: rental.umbrellaId, isLocked: true }
      : entry)
  } : item);
  state.activeRental = null;
  state.timeOffsetSeconds = 0;
  state.returning = null;
  render();
}

function handleClick(event) {
  const actionElement = event.target.closest('[data-action]');
  if (event.target.matches('[data-overlay]')) {
    state.borrow = null;
    state.returning = null;
    state.complaintOpen = false;
    render();
    return;
  }
  if (!actionElement || actionElement.disabled) return;
  const { action, value, id } = actionElement.dataset;

  if (action === 'tab') state.activeTab = value;
  else if (action === 'filter') state.filterCategory = value;
  else if (action === 'select-locker') state.selectedLockerId = id;
  else if (action === 'open-borrow') openBorrow(id);
  else if (action === 'open-return') openReturn(id);
  else if (action === 'go-iot') {
    state.iotLockerId = id;
    state.activeTab = 'iot';
  } else if (action === 'toggle-weather') {
    state.weather = state.weather.status === 'rain'
      ? { status: 'sunny', label: 'Cerah Berawan', temp: '32°C', desc: 'Panas terik - payung UV pelindung matahari' }
      : initialWeather();
  } else if (action === 'open-complaint') {
    state.complaintOpen = true;
    state.complaintSubmitted = false;
  } else if (action === 'close-modal') {
    state.borrow = null;
    state.returning = null;
    state.complaintOpen = false;
  } else if (action === 'borrow-step') {
    if (state.borrow) state.borrow.step = Number(actionElement.dataset.step);
  } else if (action === 'wallet') {
    if (state.borrow) state.borrow.wallet = value;
  } else if (action === 'simulate-payment') {
    if (state.borrow) {
      const currentModal = state.borrow;
      currentModal.step = 3;
      currentModal.unlocking = true;
      window.setTimeout(() => {
        if (state.borrow !== currentModal) return;
        const locker = state.lockers.find((item) => item.id === currentModal.lockerId);
        currentModal.unlocking = false;
        currentModal.unlockedSlot = locker?.slots.find((item) => item.isOccupied)?.slotNumber || 1;
        render();
      }, 2000);
    }
  } else if (action === 'finish-borrow') finishBorrow();
  else if (action === 'return-locker') {
    if (state.returning) state.returning.lockerId = id;
  } else if (action === 'start-return') {
    const modal = state.returning;
    const locker = state.lockers.find((item) => item.id === modal?.lockerId);
    if (modal && locker?.emptySlots > 0) {
      modal.step = 2;
      render();
      const emptySlot = locker.slots.find((item) => !item.isOccupied);
      const slotNumber = emptySlot?.slotNumber || (locker.totalSlots - locker.emptySlots + 1);
      window.setTimeout(() => {
        if (state.returning !== modal) return;
        modal.step = 3;
        modal.assignedSlot = slotNumber;
        render();
      }, 2000);
    }
  } else if (action === 'finish-return') finishReturn();
  else if (action === 'skip-time') state.timeOffsetSeconds += Number(actionElement.dataset.seconds);
  else if (action === 'clear-history') {
    state.history = [];
    saveHistory();
  } else if (action === 'load-sample') {
    state.history = buildSampleHistory();
    saveHistory();
  } else if (action === 'admin-tab') state.adminTab = value;
  else if (action === 'select-risk') state.selectedRiskId = id;
  else if (action === 'redistribute') {
    if (state.redistributing) return;
    state.redistributing = true;
    render();
    window.setTimeout(() => {
      state.lockers = state.lockers.map((locker) => {
        if (locker.id === 'LCK-HALTE') {
          return {
            ...locker,
            availableUmbrellas: 6,
            emptySlots: 9,
            slots: locker.slots.map((slot, index) => index < 6
              ? { ...slot, isOccupied: true, umbrellaId: `ITS-UMB-030${index + 1}`, isLocked: true }
              : slot),
            status: 'online'
          };
        }
        if (locker.id === 'LCK-TWR-2') {
          return {
            ...locker,
            availableUmbrellas: 4,
            emptySlots: 6,
            slots: locker.slots.map((slot, index) => index >= 4
              ? { ...slot, isOccupied: false, umbrellaId: null, isLocked: false }
              : slot)
          };
        }
        return locker;
      });
      state.redistributing = false;
      render();
      window.alert('Operasi Redistribusi Selesai! 4 payung telah dipindahkan dari titik surplus ke titik minim stok.');
    }, 1200);
  } else if (action === 'iot-locker') {
    state.iotLockerId = id;
  } else if (action === 'toggle-slot') {
    const locker = state.lockers.find((item) => item.id === state.iotLockerId);
    const slotNumber = Number(actionElement.dataset.slot);
    if (locker) {
      let wasOccupied = false;
      const slots = locker.slots.map((slot) => {
        if (slot.slotNumber !== slotNumber) return slot;
        wasOccupied = slot.isOccupied;
        return {
          ...slot,
          isOccupied: !slot.isOccupied,
          umbrellaId: slot.isOccupied ? null : `ITS-UMB-${slotNumber}0${Math.floor(Math.random() * 9)}`
        };
      });
      const availableUmbrellas = slots.filter((slot) => slot.isOccupied).length;
      state.lockers = state.lockers.map((item) => item.id === locker.id
        ? { ...item, slots, availableUmbrellas, emptySlots: slots.length - availableUmbrellas }
        : item);
      addLog(`[SLOT #${slotNumber}] Sensor status: ${wasOccupied ? 'PAYUNG DICABUT (OUT)' : 'PAYUNG MASUK (IN)'}`);
    }
  } else if (action === 'toggle-power') {
    state.powerOutage = !state.powerOutage;
    addLog(state.powerOutage
      ? '[ALARM] Listrik PLN 220V Terputus! UPS Baterai 12V aktif otomatis.'
      : '[INFO] Listrik PLN Kembali Normal.');
  } else if (action === 'emergency-unlock') {
    const locker = state.lockers.find((item) => item.id === state.iotLockerId) || state.lockers[0];
    if (locker) {
      addLog('[EMERGENCY OVERRIDE] Manual safety solenoid pulse. Mitigasi R3 triggered.');
      window.alert(`[MITIGASI R3]\nManual override dibuka untuk ${locker.name}.\nSemua kunci solenoid telah dilepas.`);
    }
  } else if (action === 'clear-logs') {
    addLog('[RESET] Terminal cleared');
  }
  render();
}

root.addEventListener('click', handleClick);
root.addEventListener('change', (event) => {
  if (event.target.matches('[data-change="iot-locker"]')) state.iotLockerId = event.target.value;
});
root.addEventListener('input', (event) => {
  if (event.target.name === 'lockerLocation') state.complaintLocation = event.target.value;
  if (event.target.name === 'description') state.complaintDescription = event.target.value;
  if (event.target.name === 'command') state.iotCommand = event.target.value;
});
root.addEventListener('submit', (event) => {
  const form = event.target;
  if (form.matches('[data-form="iot-command"]')) {
    event.preventDefault();
    const command = new FormData(form).get('command')?.trim();
    if (command) addLog(`[CMD] ${command}`);
    state.iotCommand = '';
    render();
  } else if (form.matches('[data-form="complaint"]')) {
    event.preventDefault();
    state.complaintLocation = new FormData(form).get('lockerLocation') || '';
    state.complaintDescription = new FormData(form).get('description') || '';
    state.complaintSubmitted = true;
    render();
  }
});

window.setInterval(() => {
  if (state.borrow?.step === 2) state.borrow.timer = Math.max(0, state.borrow.timer - 1);
  render();
}, 1000);

render();
