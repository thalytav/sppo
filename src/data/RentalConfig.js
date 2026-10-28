// Aturan peminjaman (ASUMSI kelompok - ubah di sini, lalu samakan dengan laporan)
export const RENTAL_CONFIG = {
  depositAmount: 10000,   // Rp, dikembalikan penuh bila tepat waktu
  rentalFee: 2000,        // Rp per peminjaman
  limitHours: 12,         // batas durasi pinjam
  lateFeePerHour: 1000,   // Rp per jam keterlambatan (dibulatkan ke atas), dipotong dari deposit
  warningMinutes: 60      // peringatan muncul saat sisa waktu <= nilai ini
};

export const formatRupiah = (n) => 'Rp' + Number(n).toLocaleString('id-ID');

export const formatDuration = (totalSeconds) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (x) => String(x).padStart(2, '0');
  return `${h}j ${pad(m)}m ${pad(sec)}d`;
};

// Hitung status sewa dari lama pemakaian (detik)
export function getRentalStatus(elapsedSeconds = 0) {
  const { depositAmount, limitHours, lateFeePerHour, warningMinutes } = RENTAL_CONFIG;
  const limitSeconds = limitHours * 3600;
  const remainingSeconds = limitSeconds - elapsedSeconds;
  const isOverdue = remainingSeconds < 0;
  const overdueSeconds = isOverdue ? -remainingSeconds : 0;
  const overdueHours = Math.ceil(overdueSeconds / 3600);
  const lateFee = Math.min(depositAmount, overdueHours * lateFeePerHour);
  const refund = depositAmount - lateFee;
  const isLost = lateFee >= depositAmount; // deposit habis -> dianggap hilang (mitigasi R1)
  const isWarning = !isOverdue && remainingSeconds <= warningMinutes * 60;
  return {
    elapsedSeconds,
    remainingSeconds,
    overdueSeconds,
    overdueHours,
    lateFee,
    refund,
    isOverdue,
    isLost,
    progress: Math.min(1, elapsedSeconds / limitSeconds),
    level: isOverdue ? 'overdue' : isWarning ? 'warning' : 'normal'
  };
}