import { RENTAL_CONFIG, getRentalStatus } from './rentalConfig';

// Data contoh untuk demo (ditandai isSample: true)
export function buildSampleHistory() {
  const now = Date.now();
  const H = 3600 * 1000;
  const rows = [
    { agoH: 50, durH: 3.2, from: 'Smart Locker FTEIC / Informatika & Elektro', to: 'Smart Locker Menara TOWER 1', pay: 'GOPAY' },
    { agoH: 26, durH: 5.0, from: 'Smart Locker Menara TOWER 3', to: 'Smart Locker Halte & Parkir Utama Kampus', pay: 'SHOPEEPAY' },
    { agoH: 4,  durH: 14.5, from: 'Smart Locker FTIRS / Mesin, Kimia & Fisika', to: 'Smart Locker Menara TOWER 2', pay: 'DANA' }
  ];
  return rows.map((r, i) => {
    const durationSeconds = Math.round(r.durH * 3600);
    const st = getRentalStatus(durationSeconds);
    const end = now - r.agoH * H;
    return {
      id: `TRX-SAMPLE-${i + 1}`,
      umbrellaId: `ITS-UMB-0${i + 1}0${i + 3}`,
      originLockerName: r.from,
      returnLockerName: r.to,
      startTime: new Date(end - durationSeconds * 1000).toISOString(),
      endTime: new Date(end).toISOString(),
      durationSeconds,
      rentalFee: RENTAL_CONFIG.rentalFee,
      depositAmount: RENTAL_CONFIG.depositAmount,
      lateFee: st.lateFee,
      depositRefunded: st.refund,
      paymentMethod: r.pay,
      isSample: true
    };
  }).reverse();
}