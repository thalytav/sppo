# SPPO ITS - Sistem Peminjaman Payung Otomatis Kampus ITS Sukolilo

Aplikasi web modern berbasis IoT untuk layanan peminjaman payung mandiri (*self-service smart locker*) di lingkungan kampus Institut Teknologi Sepuluh Nopember (ITS) Sukolilo, Surabaya. Dikembangkan berdasarkan analisis mendalam pada **Laporan Tugas 2 Kewirausahaan 2026** (Dosen Pengampu: Dr. Drs. Soehardjoepri, M.Si.).

---

## 👥 Tim Pengembang (Mahasiswa ITS)
1. **Putriani Pirma A. Sagala** (NRP: 5025231045)
2. **Thalyta Vius Pramesti** (NRP: 5025231055)
3. **Annisa Salma Riavinola** (NRP: 5025231312)
4. **Bernadetta Arceline Wijar A.** (NRP: 5008231026)
5. **Ardelia Faustina Kusbagio** (NRP: 5008231032)

---

## 🎯 Fitur Utama Berdasarkan Laporan Tugas 2

### 1. Peta Titik Strategis & Ketersediaan Stok Real-Time (Bab 2.1.8 & Hasil Survei)
- Peta skematik kampus ITS Sukolilo dengan penempatan smart locker pada 3 titik prioritas hasil survei:
  - **Gedung Fakultas/Departemen (95% preferensi)** — FTEIC (Informatika & Elektro) dan FTIRS.
  - **Menara TOWER ITS 1, 2, 3 (85% preferensi)** — Pusat mobilitas sivitas akademika.
  - **Halte Bis & Parkir Utama (65% preferensi)** — Titik transit mahasiswa.
- Pemantauan kapasitas: jumlah payung siap pakai dan sisa slot kosong untuk pengembalian.

### 2. Peminjaman Mandiri & Transparansi Biaya (Bab 2.1.2 & 2.1.5)
- Alur peminjaman 100% *self-service* tanpa petugas melalui pemindaian QR Code.
- Rincian tarif transparan:
  - **Biaya Sewa:** Rp 2.000 (bersedia dibayar oleh 55% responden survei).
  - **Deposit Jaminan:** Rp 10.000 (dianggap wajar oleh 90% responden, 100% *refundable*).
  - **Total Pembayaran Awal:** Rp 12.000 via QRIS / E-Wallet (GoPay, ShopeePay, DANA, OVO).
- Efek animasi pembukaan kunci solenoid elektronik (*solenoid door lock*).

### 3. Pengembalian Fleksibel di Titik Mana Saja (*Anywhere Return*)
- Payung dapat dipinjam di Locker A (misal: FTEIC) dan dikembalikan di Locker B (misal: Menara Tower atau Halte).
- Sensor otomatis mendeteksi ID payung dan mengunci kembali solenoid.
- **Pengembalian Deposit Otomatis:** Dana Rp 10.000 langsung kembali ke e-wallet dengan resi digital.

### 4. Simulator Perangkat Keras IoT (ESP32-CAM & Solenoid Lock) (Bab 2.1.6)
- Rujukan literatur teknis: *Fitri dkk. (2024)* dan *Permana dkk. (2025)*.
- Simulasi respons pin GPIO relay solenoid, deteksi sensor slot, sinyal WiFi mesh, status daya PLN vs UPS Baterai cadangan 12V.
- Serial UART/MQTT monitor real-time.
- Tombol uji mekanisme override darurat manual (*Mitigasi Risiko R3*).

### 5. Dashboard Manajemen Risiko ISO 31000:2018 (Bab 2.4, Tabel 2.3 - 2.5)
- Matriks Risiko 5×5 interaktif (Kemungkinan × Dampak).
- Pemetaan 10 risiko utama (R1 s.d. R10) dengan zona warna:
  - **Zona Merah (Tinggi):** R1 (Payung Hilang/Tidak Dikembalikan, skor 16).
  - **Zona Kuning (Sedang):** R2 s.d. R9 (Distribusi tidak merata, gangguan teknis, musim kemarau, dll).
  - **Zona Hijau (Rendah):** R10 (Persaingan substitusi).
- **Fitur Kontrol Redistribusi (Mitigasi R2):** Deteksi otomatis saat stok halte minim dan memicu pengiriman payung dari titik surplus.

### 6. Business Model Canvas (BMC) 9 Blok (Bab 2.1, Tabel 2.1)
- Representasi visual interaktif dari 9 blok model bisnis standar Osterwalder & Pigneur (2010).

### 7. Pusat Bantuan & Pengaduan (Bab 2.1.4)
- Kanal langsung WhatsApp dan form pelaporan kendala teknis (solenoid macet / kendala deposit).

---

## 🚀 Cara Menjalankan Aplikasi Secara Lokal

1. Buka terminal pada folder proyek:
   ```bash
   cd C:\Users\User\.gemini\antigravity\scratch\sppo-its
   ```
2. Pastikan dependensi sudah terpasang:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan Vite:
   ```bash
   npm run dev
   ```
4. Buka di browser: `http://localhost:5173/`
