import { BMC_DATA, PROJECT_INFO, RISK_ANALYSIS, SPONSORS } from './data/mockData.js';
import { RENTAL_CONFIG, formatDuration, formatRupiah } from './data/RentalConfig.js';
import { button, card, esc, formatDate, shortName } from './ui.js';

const statePill = (text, tone = 'sky') =>
  `<span class="text-[10px] font-black uppercase tracking-wider bg-${tone}-500/20 text-${tone}-300 border border-${tone}-400/30 px-3 py-1 rounded-full">${text}</span>`;

export function renderMap(state) {
  const lockers = state.lockers;
  const selected = lockers.find((locker) => locker.id === state.selectedLockerId) || lockers[0];
  if (!selected) return card('Data smart locker belum tersedia.', 'text-center text-sm text-slate-400');
  const filtered = state.filterCategory === 'ALL'
    ? lockers
    : lockers.filter((locker) => locker.category.toLowerCase().includes(state.filterCategory.toLowerCase()));
  const totalUmbrellas = lockers.reduce((total, locker) => total + locker.availableUmbrellas, 0);
  const totalEmpty = lockers.reduce((total, locker) => total + locker.emptySlots, 0);
  const filters = [
    ['ALL', 'Semua (7 Titik)'],
    ['TOWER', 'Tower 1, 2, 3 (85%)'],
    ['Fakultas', 'Fakultas (95%)'],
    ['Halte', 'Halte (65%)']
  ];

  return `<div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-2 sm:p-3 rounded-3xl shadow-xl">
      <div class="flex items-center gap-2 overflow-x-auto py-1 px-1 text-xs">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60"><span class="w-2 h-2 rounded-full bg-sky-400"></span><span class="text-slate-400">Total Siap:</span><b class="text-white font-mono">${totalUmbrellas} Payung</b></div>
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60"><span class="w-2 h-2 rounded-full bg-emerald-400"></span><span class="text-slate-400">Slot Kosong:</span><b class="text-emerald-400 font-mono">${totalEmpty} Slot</b></div>
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60"><span class="text-slate-400">Tarif:</span><b class="text-amber-300">Rp5.000 / sewa</b></div>
      </div>
      <div class="flex flex-wrap items-center gap-1.5 bg-slate-800/60 p-1 rounded-full border border-slate-700/40 text-[11px] font-semibold">
        ${filters.map(([id, label]) => button('filter', label, `px-3 py-1 rounded-full transition ${state.filterCategory === id ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`, `data-value="${id}"`)).join('')}
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div class="lg:col-span-7 space-y-4">
        <div class="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-b from-[#091428] via-[#0B1E38] to-[#040C1A] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-4 select-none">
          <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-40" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
            <ellipse cx="60" cy="55" rx="14" ry="8" fill="#0284c7" opacity=".3"/>
            <path d="M5 92 50 45 50 12M50 45 85 75M28 30 50 45 70 22" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="2 1"/>
            <circle cx="50" cy="38" r="13" fill="none" stroke="#38bdf8" stroke-width=".4" stroke-dasharray="1 1"/>
          </svg>
          <div class="absolute top-4 left-5 text-xs font-bold text-sky-300"><span class="text-sky-400">◉</span> KAMPUS ITS SUKOLILO • PETA TITIK STRATEGIS</div>
          <div class="absolute bottom-4 left-5 text-[11px] text-slate-400">Gerbang Utama & Bundaran ITS</div>
          ${lockers.map((locker) => {
            const active = locker.id === selected.id;
            const low = locker.availableUmbrellas <= 2;
            return `<button type="button" data-action="select-locker" data-id="${esc(locker.id)}" style="left:${locker.coords.x}%;top:${locker.coords.y}%" class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 ${active ? 'z-30' : ''}">
              <span class="relative px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 text-xs font-bold ${active ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 ring-2 ring-white' : low ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white' : 'bg-slate-900/90 text-white border border-slate-700/80'}">☂ <b>${locker.availableUmbrellas}</b><i class="w-2 h-2 rounded-full ${low ? 'bg-rose-300' : 'bg-emerald-400'}"></i></span>
              <span class="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold px-2.5 py-0.5 rounded-full pointer-events-none ${active ? 'bg-white text-slate-900' : 'bg-slate-950/90 text-slate-300 opacity-0 group-hover:opacity-100'}">${esc(shortName(locker.name))}</span>
            </button>`;
          }).join('')}
          <div class="absolute bottom-4 right-4 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-full text-[10px] text-slate-300 flex gap-3"><span>🟢 Stok Aman</span><span>🔴 Stok Minim</span></div>
        </div>
        <div class="flex gap-2.5 overflow-x-auto pb-2">
          ${filtered.map((locker) => `<button type="button" data-action="select-locker" data-id="${esc(locker.id)}" class="text-left flex-shrink-0 w-56 p-3.5 rounded-2xl border text-xs transition ${selected.id === locker.id ? 'bg-gradient-to-br from-sky-950/70 to-slate-900/90 border-sky-400/60 shadow-lg' : 'bg-slate-900/50 hover:bg-slate-800/60 border-slate-800/80 text-slate-400'}">
            <b class="block text-white text-xs leading-snug min-h-[2rem]">${esc(shortName(locker.name))}</b>
            <span class="flex justify-between mt-2 text-[11px]"><b class="text-sky-400">☂ ${locker.availableUmbrellas} Payung</b><span class="text-emerald-400">${locker.emptySlots} slot kosong</span></span>
            <span class="block mt-1 text-[10px] text-slate-500">${esc(locker.surveyPriority.split(' ')[0])}</span>
          </button>`).join('')}
        </div>
      </div>
      <div class="lg:col-span-5 space-y-4">
        <div class="rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-slate-800 p-5 sm:p-6 shadow-2xl">
          <div class="flex items-center justify-between">${statePill(esc(selected.category))}<span class="text-xs text-emerald-400">● ESP32 Online</span></div>
          <h2 class="text-xl font-black text-white mt-3">${esc(selected.name)}</h2>
          <p class="text-xs text-slate-400 mt-1">📍 ${esc(selected.locationDesc)}</p>
          <div class="mt-3.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex justify-between"><span><b>Riset Pasar:</b> ${esc(selected.surveyPriority)}</span><span class="text-[10px]">Tugas 1</span></div>
          <div class="mt-5 p-4 rounded-2xl bg-slate-950/50 border border-slate-800">
            <div class="flex justify-between text-xs text-slate-300 mb-2"><span>Ketersediaan Armada</span><span class="font-mono text-sky-400">${selected.availableUmbrellas} dari ${selected.totalSlots} slot</span></div>
            <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5"><div style="width:${selected.availableUmbrellas / selected.totalSlots * 100}%" class="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500"></div></div>
            <div class="flex justify-between text-xs mt-2.5"><b class="text-sky-300">☂ ${selected.availableUmbrellas} Payung Siap</b><b class="text-emerald-400">📥 ${selected.emptySlots} Slot Kosong</b></div>
          </div>
          <div class="mt-4"><div class="flex justify-between text-xs text-slate-400 mb-2"><span>${selected.totalSlots} Slot Solenoid Lock:</span><span class="text-[10px] font-mono">Auto Sensor</span></div><div class="flex flex-wrap gap-1.5">${selected.slots.map((slot) => `<span title="Slot #${slot.slotNumber}: ${slot.isOccupied ? 'Payung Tersedia' : 'Slot Kosong'}" class="w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-mono font-bold ${slot.isOccupied ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'bg-emerald-500/10 text-emerald-400 border border-dashed border-emerald-500/40'}">${slot.isOccupied ? '☂' : slot.slotNumber}</span>`).join('')}</div></div>
          <div class="mt-4 pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400"><span>🔋 PLN + UPS 12V</span><span>◉ ITS-Student-WiFi</span></div>
          <div class="mt-5 space-y-2.5">
            ${button('open-borrow', `☂ Pinjam Payung di Titik Ini <span class="bg-slate-950/20 px-2.5 py-0.5 rounded-full">Rp5.000</span>`, `w-full py-3.5 px-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 ${state.activeRental || selected.availableUmbrellas === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 text-slate-950'}`, `data-id="${esc(selected.id)}" ${state.activeRental || selected.availableUmbrellas === 0 ? 'disabled' : ''}`)}
            ${state.activeRental ? button('open-return', '↩ Kembalikan Payung ke Titik Ini (Refund Rp10rb)', 'w-full py-3.5 px-5 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950', `data-id="${esc(selected.id)}" ${selected.emptySlots === 0 ? 'disabled' : ''}`) : ''}
            ${button('go-iot', '⚡ Buka Panel Lab Hardware ESP32', 'w-full py-2.5 rounded-xl text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30', `data-id="${esc(selected.id)}"`)}
          </div>
        </div>
        <div class="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 text-xs text-slate-400 space-y-1.5"><b class="text-white">🛡 Transparansi Skema Pembayaran</b><p class="text-[11px] leading-relaxed">Biaya sewa <b>Rp5.000</b>. Deposit <b>Rp10.000</b> akan <b>100% dikembalikan otomatis</b> ke e-wallet saat payung dikembalikan ke locker mana pun.</p></div>
      </div>
    </div>
  </div>`;
}

export function renderBanner(state) {
  if (!state.activeRental) return '';
  const status = state.rentalStatus;
  const tone = status.level === 'overdue' ? 'rose' : status.level === 'warning' ? 'amber' : 'emerald';
  const label = status.level === 'overdue' ? 'Terlambat Mengembalikan' : status.level === 'warning' ? 'Waktu Hampir Habis' : 'Sesi Peminjaman Aktif';
  const time = status.isOverdue ? formatDuration(status.overdueSeconds) : formatDuration(status.remainingSeconds);
  const note = status.isLost
    ? 'Deposit habis terpotong denda. Payung dicatat hilang bila tidak segera dikembalikan.'
    : status.isOverdue
      ? `Denda ${formatRupiah(RENTAL_CONFIG.lateFeePerHour)}/jam, dipotong dari deposit. Segera kembalikan payung.`
      : status.level === 'warning'
        ? 'Segera kembalikan payung agar deposit tidak terpotong denda.'
        : `Batas pinjam ${RENTAL_CONFIG.limitHours} jam. Terlambat dikenai denda ${formatRupiah(RENTAL_CONFIG.lateFeePerHour)}/jam.`;
  return `<div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-${tone}-900/80 via-slate-900/90 to-slate-900/90 border border-${tone}-500/40 p-4 sm:p-5 shadow-2xl mb-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div><span class="text-[10px] font-black uppercase border px-2.5 py-0.5 rounded-full bg-${tone}-500/20 text-${tone}-300 border-${tone}-400/30">${label}</span> <b class="font-mono text-xs text-white">${esc(state.activeRental.umbrellaId)}</b><h3 class="text-base font-bold text-white mt-1">Dipinjam dari ${esc(shortName(state.activeRental.originLockerName))}</h3></div>
      <div class="flex justify-around gap-4 bg-slate-950/40 border border-white/10 rounded-2xl px-4 py-2 text-xs"><div class="text-center"><span class="block text-[10px] text-slate-400 uppercase">${status.isOverdue ? 'Terlambat' : 'Sisa Waktu'}</span><b class="font-mono text-sm text-white">${time}</b></div><div class="text-center"><span class="block text-[10px] text-slate-400 uppercase">Deposit Kembali</span><b class="text-sm text-${tone}-300">${formatRupiah(status.refund)}</b>${status.lateFee > 0 ? `<small class="text-rose-300"> (denda ${formatRupiah(status.lateFee)})</small>` : ''}</div></div>
      ${button('open-return', '↩ Kembalikan Payung <small class="bg-slate-950/20 px-1.5 py-0.5 rounded-full">Bebas Titik</small>', 'px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs shadow-lg')}
    </div>
    <div class="mt-4"><div class="w-full h-1.5 bg-slate-950/50 rounded-full overflow-hidden"><div style="width:${status.progress * 100}%" class="h-full bg-gradient-to-r from-${tone}-400 to-teal-400"></div></div><div class="flex flex-wrap items-center justify-between gap-2 mt-1.5 text-[11px]"><span class="text-${tone}-300">${note}</span><span class="flex gap-1"><small class="text-slate-500">Demo:</small>${button('skip-time', '+1 jam', 'px-2 py-0.5 rounded-full bg-white/10 text-slate-200 text-[10px] font-bold', 'data-seconds="3600"')}${button('skip-time', 'Sisa 1 jam', 'px-2 py-0.5 rounded-full bg-white/10 text-slate-200 text-[10px] font-bold', `data-seconds="${(RENTAL_CONFIG.limitHours - 1) * 3600}"`)}${button('skip-time', 'Telat 1,5 jam', 'px-2 py-0.5 rounded-full bg-white/10 text-slate-200 text-[10px] font-bold', `data-seconds="${(RENTAL_CONFIG.limitHours + 1.5) * 3600}"`)}</span></div></div>
  </div>`;
}

export function renderHistory(state) {
  const history = state.history;
  const totalRentalFee = history.reduce((sum, item) => sum + item.rentalFee, 0);
  const totalLateFee = history.reduce((sum, item) => sum + item.lateFee, 0);
  const totalRefund = history.reduce((sum, item) => sum + item.depositRefunded, 0);
  const onTime = history.filter((item) => item.lateFee === 0).length;
  const stats = [
    ['Total Peminjaman', `${history.length}x`, `${onTime} tepat waktu`, 'text-sky-300'],
    ['Total Biaya Sewa', formatRupiah(totalRentalFee), `${formatRupiah(RENTAL_CONFIG.rentalFee)} / pinjam`, 'text-amber-300'],
    ['Total Denda', formatRupiah(totalLateFee), 'dipotong dari deposit', totalLateFee ? 'text-rose-300' : 'text-slate-300'],
    ['Deposit Dikembalikan', formatRupiah(totalRefund), 'ke e-wallet', 'text-emerald-300']
  ];
  return `<div class="space-y-6">
    <header class="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div>${statePill('Riwayat & Dompet')} <span class="text-xs text-slate-400 font-mono">Resi Digital</span><h2 class="text-xl font-black text-white mt-2">◷ Riwayat Peminjaman</h2><p class="text-xs text-slate-400 mt-0.5">Catatan transaksi, denda keterlambatan, dan status pengembalian deposit.</p></div>${history.length ? button('clear-history', 'Hapus Riwayat', 'px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300') : ''}</header>
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-3">${stats.map(([label, value, sub, color]) => `<div class="rounded-2xl bg-slate-900/70 border border-slate-800 p-4"><div class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">${label}</div><div class="text-lg font-black font-mono mt-1 ${color}">${value}</div><div class="text-[10px] text-slate-500 mt-0.5">${sub}</div></div>`).join('')}<div class="col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/30 p-4"><div class="text-[10px] uppercase text-emerald-400 font-bold">Deposit Tertahan</div><div class="text-lg font-black font-mono mt-1 text-white">${formatRupiah(state.activeRental ? RENTAL_CONFIG.depositAmount : 0)}</div><div class="text-[10px] text-slate-400 mt-0.5">${state.activeRental ? 'Kembali saat payung dikembalikan' : 'Tidak ada sesi aktif'}</div></div></div>
    <div class="space-y-3">
      ${state.activeRental ? `<div class="rounded-3xl bg-slate-900/80 border border-emerald-500/40 p-4 sm:p-5 shadow-xl"><span class="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">Sedang Berlangsung</span> <b class="font-mono text-xs text-white">${esc(state.activeRental.umbrellaId)}</b><span class="float-right text-[11px] text-slate-400">${formatDate(state.activeRental.startTime)}</span><div class="mt-2 text-xs text-slate-300">${esc(shortName(state.activeRental.originLockerName))} → belum dikembalikan</div><div class="mt-2 text-[11px] text-slate-400">Durasi ${formatDuration(state.rentalStatus.elapsedSeconds)} ${state.rentalStatus.lateFee ? `• Denda berjalan ${formatRupiah(state.rentalStatus.lateFee)}` : ''}</div></div>` : ''}
      ${history.length === 0 && !state.activeRental ? `<div class="rounded-3xl bg-slate-900/60 border border-dashed border-slate-700 p-8 text-center space-y-3"><div class="text-3xl">🧾</div><b class="text-sm text-white">Belum ada riwayat peminjaman</b><p class="text-xs text-slate-400">Pinjam dan kembalikan payung dari tab Peta & Pinjam, transaksi akan tercatat di sini.</p>${button('load-sample', 'Muat Data Contoh (untuk demo)', 'inline-flex px-4 py-2 rounded-full bg-sky-500/15 border border-sky-500/30 text-xs font-bold text-sky-300')}</div>` : ''}
      ${history.map((item) => `<article class="rounded-3xl bg-slate-900/80 border border-slate-800 p-4 sm:p-5 shadow-xl"><div class="flex justify-between gap-2 flex-wrap"><div><span class="text-[10px] font-black uppercase border px-2.5 py-0.5 rounded-full ${item.lateFee ? 'bg-rose-500/15 text-rose-300 border-rose-400/30' : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'}">${item.lateFee ? '⚠ Terlambat' : '✓ Tepat Waktu'}</span> <b class="font-mono text-xs text-white">${esc(item.umbrellaId)}</b>${item.isSample ? '<small class="text-slate-400">Contoh</small>' : ''}</div><span class="text-[11px] text-slate-500 font-mono">${esc(item.id)}</span></div><div class="mt-3 flex items-center gap-2 text-xs text-slate-200 flex-wrap"><b>${esc(shortName(item.originLockerName))}</b><span class="text-sky-400">→</span><b>${esc(shortName(item.returnLockerName))}</b></div><div class="mt-1 flex items-center gap-3 text-[11px] text-slate-500 flex-wrap"><span>${formatDate(item.startTime)} → ${formatDate(item.endTime)}</span><span>${formatDuration(item.durationSeconds)}</span><span class="font-mono">${esc(item.paymentMethod)}</span></div><div class="mt-3 grid grid-cols-3 gap-2 text-center">${[['Biaya Sewa', formatRupiah(item.rentalFee), 'text-amber-300'], ['Denda', item.lateFee ? `-${formatRupiah(item.lateFee)}` : 'Rp0', 'text-rose-300'], ['Deposit Kembali', formatRupiah(item.depositRefunded), 'text-emerald-300']].map(([label, value, color]) => `<div class="rounded-xl bg-slate-950/50 border border-slate-800 py-2"><div class="text-[10px] text-slate-500">${label}</div><div class="text-xs font-bold font-mono ${color}">${value}</div></div>`).join('')}</div></article>`).join('')}
    </div>
  </div>`;
}

export function renderIot(state) {
  const locker = state.lockers.find((item) => item.id === state.iotLockerId) || state.lockers[0];
  if (!locker) return card('Tidak ada locker tersedia.');
  return `<div class="space-y-6">
    <header class="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div>${statePill('Hardware Lab Simulator', 'purple')} <span class="text-xs text-slate-400 font-mono">ESP32-CAM & Solenoid 12V</span><h2 class="text-xl font-black text-white mt-2">Simulasi Mikrokontroler IoT & Solenoid Lock</h2><p class="text-xs text-slate-400 mt-0.5">Rujukan Fitri dkk. (2024) dan Permana dkk. (2025).</p></div><select data-change="iot-locker" class="bg-slate-950 border border-slate-700 text-white rounded-full text-xs px-4 py-2 font-mono">${state.lockers.map((item) => `<option value="${esc(item.id)}" ${item.id === locker.id ? 'selected' : ''}>${esc(shortName(item.name))}</option>`).join('')}</select></header>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section class="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"><div class="flex items-center justify-between pb-3 border-b border-slate-800"><div><b class="text-xs text-white block">${esc(locker.iotDevice)}</b><small class="text-[10px] font-mono text-slate-500">Firmware v1.2.0-ITS • Solenoid 12V</small></div><span class="text-[10px] font-mono font-bold ${state.powerOutage ? 'text-amber-300' : 'text-emerald-300'}">${state.powerOutage ? '⚡ UPS 12V' : '⚡ PLN 220V'} • ◉ WiFi 98%</span></div>
      <div><div class="flex justify-between mb-2"><b class="text-xs text-slate-300">Array ${locker.totalSlots} Slot Sensor Solenoid:</b><small class="text-[10px] text-slate-500">Klik slot untuk simulasi payung keluar/masuk</small></div><div class="grid grid-cols-3 sm:grid-cols-5 gap-2">${locker.slots.map((slot) => `<button type="button" data-action="toggle-slot" data-slot="${slot.slotNumber}" class="p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${slot.isOccupied ? 'bg-sky-500/15 border-sky-500/40 text-sky-300' : 'bg-emerald-500/10 border-dashed border-emerald-500/30 text-emerald-400'}"><span class="w-full flex justify-between text-[10px] font-mono">#${slot.slotNumber} ${slot.isOccupied ? '🔒' : '🔓'}</span><span class="text-2xl">${slot.isOccupied ? '☂' : '📥'}</span><b class="text-[10px]">${slot.isOccupied ? 'Payung' : 'Kosong'}</b></button>`).join('')}</div></div>
      <div class="pt-3 border-t border-slate-800 flex flex-wrap gap-2">${button('toggle-power', state.powerOutage ? 'Nyalakan Kembali Listrik PLN' : 'Simulasi Listrik Padam (Uji UPS)', `flex-1 py-2.5 px-4 rounded-full text-xs font-bold border ${state.powerOutage ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 border-slate-700'}`)}${button('emergency-unlock', 'Uji Override Darurat (Mitigasi R3)', 'py-2.5 px-4 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30')}</div></section>
      <section class="lg:col-span-5 rounded-3xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs flex flex-col min-h-[460px]"><div class="flex justify-between pb-3 border-b border-slate-800 text-slate-400"><b class="text-white">▣ ESP32 Serial & MQTT Console</b>${button('clear-logs', 'Clear', 'text-[10px] text-slate-500 hover:text-white')}</div><div class="flex-1 overflow-y-auto space-y-1.5 py-3 text-[11px]">${state.logs.map((log) => `<div class="flex gap-2"><span class="text-slate-600">[${esc(log.time)}]</span><span class="${log.msg.includes('ALARM') ? 'text-rose-400 font-bold' : log.msg.includes('EMERGENCY') ? 'text-amber-300 font-bold' : 'text-emerald-400'}">${esc(log.msg)}</span></div>`).join('')}</div><form data-form="iot-command" class="pt-2 border-t border-slate-800 flex gap-2"><span class="text-emerald-400">&gt;</span><input name="command" type="text" value="${esc(state.iotCommand || '')}" placeholder="Ketik perintah IoT (mis. AT+TEST)..." class="bg-transparent border-none text-white text-xs w-full focus:outline-none"></form></section>
    </div>
  </div>`;
}

export function renderAdmin(state) {
  const tab = state.adminTab;
  const selected = RISK_ANALYSIS.find((risk) => risk.id === state.selectedRiskId) || RISK_ANALYSIS[0];
  const low = state.lockers.find((locker) => locker.availableUmbrellas <= 2);
  const surplus = state.lockers.find((locker) => locker.availableUmbrellas >= 8);
  const levelTone = selected.level === 'Tinggi' ? 'rose' : selected.level === 'Sedang' ? 'amber' : 'emerald';
  const matrix = `<div class="overflow-x-auto"><div class="min-w-[360px] space-y-1"><div class="grid grid-cols-6 gap-1 text-center font-mono text-xs text-slate-400"><span>K \\ D</span>${[1, 2, 3, 4, 5].map((d) => `<b>D=${d}</b>`).join('')}</div>${[5, 4, 3, 2, 1].map((k) => `<div class="grid grid-cols-6 gap-1"><b class="flex items-center justify-center text-xs text-slate-400">K=${k}</b>${[1, 2, 3, 4, 5].map((d) => {
    const risks = RISK_ANALYSIS.filter((risk) => risk.likelihood === k && risk.impact === d);
    const tone = k * d >= 13 ? 'rose' : k * d >= 7 ? 'amber' : 'emerald';
    return `<div class="h-11 rounded-xl border flex items-center justify-center bg-${tone}-500/20 border-${tone}-500/40 text-${tone}-300">${risks.map((risk) => button('select-risk', risk.id, `px-2 py-1 rounded-lg ${risk.id === selected.id ? 'ring-2 ring-white' : ''}`, `data-id="${risk.id}"`)).join('')}</div>`;
  }).join('')}</div>`).join('')}</div></div>`;
  const header = `<header class="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div>${statePill('ISO 31000:2018 Risk Management', 'amber')}<span class="text-xs text-slate-400 font-mono ml-2">Bab 2.4 Laporan ITS</span><h2 class="text-xl font-black text-white mt-2">Pusat Kendali Risiko & Distribusi Payung</h2><p class="text-xs text-slate-400 mt-0.5">Manajemen matriks risiko dan penyeimbangan stok payung otomatis.</p></div><div class="flex bg-slate-950/60 p-1.5 rounded-full border border-slate-800 text-xs font-bold">${[['risk', 'Matriks Risiko'], ['logistics', 'Redistribusi'], ['market', 'Analisis Pasar']].map(([id, label]) => button('admin-tab', label, `px-4 py-1.5 rounded-full ${tab === id ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`, `data-value="${id}"`)).join('')}</div></header>`;
  let content = '';
  if (tab === 'risk') {
    content = `<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">${card(`<div class="flex justify-between pb-3 border-b border-slate-800"><b class="text-sm text-white">🛡 Matriks Risiko 5 × 5 (Tabel 2.4)</b><span class="text-[10px] text-rose-300">Tinggi • Sedang • Rendah</span></div>${matrix}<div class="pt-3 border-t border-slate-800"><h3 class="text-xs font-bold text-slate-300 mb-2">10 Risiko Teridentifikasi (Klik untuk detail):</h3><div class="space-y-1.5 max-h-56 overflow-y-auto">${RISK_ANALYSIS.map((risk) => `<button type="button" data-action="select-risk" data-id="${risk.id}" class="w-full text-left p-2.5 rounded-2xl border text-xs flex justify-between ${risk.id === selected.id ? 'border-sky-400 bg-sky-500/15 text-white font-bold' : 'border-slate-800 bg-slate-950/40 text-slate-400'}"><span><b class="mr-2 text-${risk.level === 'Tinggi' ? 'rose' : risk.level === 'Sedang' ? 'amber' : 'emerald'}-300">${risk.id}</b>${esc(risk.name)}</span><span>Skor: ${risk.score}</span></button>`).join('')}</div></div>`, 'lg:col-span-7 space-y-4')}<aside class="lg:col-span-5 rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"><span class="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-${levelTone}-500/20 text-${levelTone}-300 border border-${levelTone}-500/30">Tingkat: ${selected.level} (Skor ${selected.score})</span><span class="float-right text-xs font-mono text-slate-400">K: ${selected.likelihood} × D: ${selected.impact}</span><h3 class="text-lg font-black text-white">[${selected.id}] ${esc(selected.name)}</h3><p class="text-xs text-slate-400 leading-relaxed">${esc(selected.description)}</p><div class="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs"><b class="text-sky-300">✓ Strategi Mitigasi Terverifikasi:</b><p class="text-slate-300 mt-2">${esc(selected.mitigation)}</p></div><div class="pt-2 border-t border-slate-800"><h4 class="text-xs font-bold text-slate-400 mb-2">Mitra Penunjang Pendapatan:</h4>${SPONSORS.map((sponsor) => `<div class="flex justify-between p-2.5 my-1 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"><b class="text-white">${esc(sponsor.name)}</b><span class="text-[10px] text-slate-400">${esc(sponsor.type)}</span></div>`).join('')}</div></aside></div>`;
  } else if (tab === 'logistics') {
    content = `<section class="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"><div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800"><div>${statePill('Mitigasi Risiko R2', 'amber')}<h3 class="text-lg font-black text-white mt-1">Penyeimbangan Armada Payung Antar-Locker</h3></div>${low ? button('redistribute', state.redistributing ? 'Menyeimbangkan...' : '⟳ Tugaskan Kru Redistribusi', 'px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs', state.redistributing ? 'disabled' : '') : ''}</div>${low ? `<div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">⚠ <b>Ketidakseimbangan Terdeteksi:</b><p class="mt-1 text-slate-300"><b>${esc(low.name)}</b> hanya tersisa <b>${low.availableUmbrellas} payung</b>. Titik <b>${esc(surplus?.name || 'Locker Tower')}</b> memiliki surplus.</p></div>` : '<div class="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">✓ Semua titik smart locker seimbang dan siap melayani.</div>'}<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">${state.lockers.map((locker) => `<div class="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs"><div class="flex justify-between"><b class="text-white">${esc(shortName(locker.name))}</b><span class="${locker.availableUmbrellas <= 2 ? 'text-rose-300' : 'text-emerald-300'}">${locker.availableUmbrellas <= 2 ? 'Stok Minim' : 'Aman'}</span></div><div class="flex justify-between text-slate-400"><span>Payung tersedia:</span><b class="text-sky-400">${locker.availableUmbrellas}</b></div><div class="flex justify-between text-slate-400"><span>Slot kosong:</span><b class="text-emerald-400">${locker.emptySlots}</b></div></div>`).join('')}</div></section>`;
  } else {
    content = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">${card('<h3 class="text-sm font-black text-white mb-3">Segmentasi, Targeting & Positioning (STP)</h3><p class="text-slate-300 text-xs mb-2"><b>Segmentasi:</b> Sivitas akademika ITS Sukolilo.</p><p class="text-slate-300 text-xs mb-2"><b>Targeting:</b> Mahasiswa jalan kaki antargedung tanpa payung.</p><p class="text-slate-300 text-xs"><b>Positioning:</b> Solusi Cepat, Mandiri & Murah Melawan Hujan di Kampus ITS.</p>')}${card('<h3 class="text-sm font-black text-white mb-3">Bauran Pemasaran (4P)</h3><p class="text-slate-300 text-xs mb-2"><b>Product:</b> Payung lipat fiber anti-angin + Smart Locker IoT.</p><p class="text-slate-300 text-xs mb-2"><b>Price:</b> Sewa Rp5.000 + deposit refundable Rp10.000 via QRIS.</p><p class="text-slate-300 text-xs mb-2"><b>Place:</b> Fakultas, Tower ITS, Halte.</p><p class="text-slate-300 text-xs"><b>Promotion:</b> QR stiker locker, Instagram ITS, Ormawa & BEM.</p>')}</div>`;
  }
  return `<div class="space-y-6">${header}${content}</div>`;
}

export function renderBmc() {
  const blocks = [
    ['valuePropositions', '🎁', 'Value Propositions (Proposisi Nilai)', 'emerald', 'lg:col-span-2'],
    ['customerSegments', '🎯', 'Customer Segments', 'sky', ''],
    ['keyPartnerships', '🤝', 'Key Partnerships', 'amber', ''],
    ['keyActivities', '⚙️', 'Key Activities', 'purple', ''],
    ['keyResources', '💡', 'Key Resources', 'indigo', ''],
    ['customerRelationships', '💬', 'Customer Relationships', 'rose', ''],
    ['channels', '📢', 'Channels (Saluran)', 'teal', ''],
    ['costStructure', '💰', 'Cost Structure (Struktur Biaya)', 'red', ''],
    ['revenueStreams', '💵', 'Revenue Streams (Arus Pendapatan)', 'teal', 'lg:col-span-3']
  ];
  return `<div class="space-y-6"><section class="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-2xl"><div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800"><div>${statePill('Tugas 2 Kewirausahaan', 'emerald')}<span class="text-xs text-slate-400 font-mono ml-2">ITS Surabaya (2026)</span><h2 class="text-xl font-black text-white mt-2">Business Model Canvas: SPPO Kampus ITS</h2><p class="text-xs text-slate-400 mt-0.5">Dosen Pengampu: <b class="text-slate-200">${esc(PROJECT_INFO.lecturer)}</b></p></div><span class="text-xs text-slate-400 bg-slate-950/60 border border-slate-800 px-4 py-2 rounded-full">Osterwalder & Pigneur (2010)</span></div><div class="mt-4"><b class="text-xs text-slate-400 uppercase block mb-2">Tim Mahasiswa Penyusun:</b><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">${PROJECT_INFO.team.map((member) => `<div class="p-3 rounded-2xl bg-slate-950/60 border border-slate-800"><b class="block text-white text-[11px] truncate">${esc(member.name)}</b><span class="font-mono text-[10px] text-sky-400 font-bold">${esc(member.nrp)}</span></div>`).join('')}</div></div></section><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">${blocks.map(([key, icon, title, tone, span]) => `<section class="rounded-3xl ${key === 'valuePropositions' ? 'bg-gradient-to-br from-emerald-950/70 to-slate-900 border-emerald-500/40' : key === 'revenueStreams' ? 'bg-gradient-to-br from-teal-950/70 to-slate-900 border-teal-500/40' : 'bg-slate-900/80 border-slate-800'} border p-5 shadow-xl space-y-3 ${span}"><h3 class="font-black text-white text-sm uppercase tracking-wider pb-2 border-b border-${tone}-500/30">${icon} ${title}</h3><ul class="space-y-2 text-slate-300">${BMC_DATA[key].map((item) => `<li class="flex items-start gap-2"><span class="text-${tone}-400 font-bold">•</span><span>${esc(item)}</span></li>`).join('')}</ul></section>`).join('')}</div></div>`;
}
