import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSampleHistory } from '../src/data/SampleHistory.js';
import { INITIAL_LOCKERS } from '../src/data/mockData.js';
import { formatRupiah, getRentalStatus, RENTAL_CONFIG } from '../src/data/RentalConfig.js';
import { renderAdmin, renderBmc, renderBanner, renderHistory, renderIot, renderMap } from '../src/views.js';
import { renderModals } from '../src/modals.js';

test('rental status reflects the deadline, warning window, and late fees', () => {
  const warning = getRentalStatus((RENTAL_CONFIG.limitHours - 1) * 3600);
  const overdue = getRentalStatus((RENTAL_CONFIG.limitHours + 1) * 3600);

  assert.equal(warning.level, 'warning');
  assert.equal(warning.refund, RENTAL_CONFIG.depositAmount);
  assert.equal(overdue.level, 'overdue');
  assert.equal(overdue.lateFee, RENTAL_CONFIG.lateFeePerHour);
  assert.equal(overdue.refund, RENTAL_CONFIG.depositAmount - RENTAL_CONFIG.lateFeePerHour);
});

test('rental currency formatting uses Indonesian rupiah notation', () => {
  assert.equal(formatRupiah(RENTAL_CONFIG.rentalFee), 'Rp5.000');
});

test('each configured locker has slot counts consistent with its stock summary', () => {
  assert.equal(INITIAL_LOCKERS.length, 7);
  for (const locker of INITIAL_LOCKERS) {
    assert.equal(locker.slots.length, locker.totalSlots, locker.id);
    assert.equal(locker.slots.filter((slot) => slot.isOccupied).length, locker.availableUmbrellas, locker.id);
    assert.equal(locker.slots.filter((slot) => !slot.isOccupied).length, locker.emptySlots, locker.id);
  }
});

test('sample history provides reusable transaction records', () => {
  const history = buildSampleHistory();
  assert.equal(history.length, 3);
  assert.ok(history.every((record) => record.isSample && record.umbrellaId && record.returnLockerName));
});

test('all native JavaScript views render their main content', () => {
  const state = {
    lockers: INITIAL_LOCKERS,
    selectedLockerId: INITIAL_LOCKERS[0].id,
    filterCategory: 'ALL',
    activeRental: null,
    history: [],
    rentalStatus: getRentalStatus(0),
    adminTab: 'risk',
    selectedRiskId: 'R1',
    redistributing: false,
    iotLockerId: INITIAL_LOCKERS[0].id,
    logs: [],
    powerOutage: false
  };

  assert.match(renderMap(state), /PETA TITIK STRATEGIS/);
  assert.match(renderHistory(state), /Riwayat Peminjaman/);
  assert.match(renderAdmin(state), /Matriks Risiko 5/);
  assert.match(renderBmc(), /Business Model Canvas/);
  assert.match(renderIot(state), /ESP32 Serial & MQTT Console/);
});

test('rental and support dialogs render without a UI framework', () => {
  const state = {
    lockers: INITIAL_LOCKERS,
    activeRental: {
      umbrellaId: 'ITS-UMB-101',
      originLockerId: INITIAL_LOCKERS[0].id,
      originLockerName: INITIAL_LOCKERS[0].name,
      startTime: new Date().toISOString()
    },
    rentalStatus: getRentalStatus(0),
    borrow: { lockerId: INITIAL_LOCKERS[0].id, step: 1, wallet: 'gopay', timer: 180 },
    returning: { lockerId: INITIAL_LOCKERS[0].id, step: 1 },
    complaintOpen: true,
    complaintSubmitted: false,
    complaintLocation: 'Menara TOWER ITS',
    complaintDescription: ''
  };
  const dialogs = renderModals(state);

  assert.match(renderBanner(state), /Sesi Peminjaman Aktif/);
  assert.match(dialogs, /Pinjam Payung Smart Locker/);
  assert.match(dialogs, /Kembalikan Payung/);
  assert.match(dialogs, /Pusat Bantuan & Pengaduan/);
});
