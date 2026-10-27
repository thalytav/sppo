// Data Model & Mock Data SPPO ITS Berdasarkan Laporan Tugas 2 Kewirausahaan ITS 2026

export const PROJECT_INFO = {
  title: "Sistem Peminjaman Payung Otomatis (SPPO)",
  subtitle: "Smart Locker Berbasis IoT di Titik Strategis Kampus ITS Sukolilo",
  institution: "Institut Teknologi Sepuluh Nopember (ITS) Surabaya",
  year: "2026",
  lecturer: "Dr. Drs. Soehardjoepri, M.Si.",
  team: [
    { name: "Putriani Pirma A. Sagala", nrp: "5025231045", role: "Ketua Tim & IoT Architecture" },
    { name: "Thalyta Vius Pramesti", nrp: "5025231055", role: "Sistem Transaksi & Pembayaran" },
    { name: "Annisa Salma Riavinola", nrp: "5025231312", role: "UI/UX & Manajemen Operasional" },
    { name: "Bernadetta Arceline Wijar A.", nrp: "5008231026", role: "Analisis Risiko & Kemitraan" },
    { name: "Ardelia Faustina Kusbagio", nrp: "5008231032", role: "Pemasaran & Model Bisnis" }
  ],
  pricing: {
    rentalFee: 2000, // Biaya sewa per peminjaman (Rp2.000)
    depositFee: 10000, // Deposit jaminan dikembalikan penuh (Rp10.000)
    totalInitial: 12000, // Total dibayar saat peminjaman
    maxBorrowHours: 12, // Batas waktu peminjaman sebelum denda keterlambatan
    lateFeePerHour: 2000
  }
};

// Titik Smart Locker Berdasarkan Prioritas Hasil Survei Laporan Tugas 2 ITS
export const INITIAL_LOCKERS = [
  {
    id: "LCK-TWR-1",
    name: "Smart Locker Menara TOWER 1",
    category: "TOWER",
    surveyPriority: "85% Prioritas Responden (Tower 1)",
    locationDesc: "Lobby Utama Menara Tower 1 ITS (Sains & Gedung Kuliah Bersama)",
    coords: { x: 44, y: 32 },
    totalSlots: 10,
    availableUmbrellas: 7,
    emptySlots: 3,
    status: "online",
    iotDevice: "ESP32-CAM Gateway #01-A",
    solenoidStatus: "locked",
    powerSource: "PLN 220V + UPS Baterai Backup 12V",
    wifiSignal: "ITS-Student-WiFi (98%)",
    lastMaintenance: "26 Okt 2026, 14:00 WIB",
    slots: [
      { slotNumber: 1, umbrellaId: "ITS-UMB-101", isOccupied: true, isLocked: true },
      { slotNumber: 2, umbrellaId: "ITS-UMB-102", isOccupied: true, isLocked: true },
      { slotNumber: 3, umbrellaId: "ITS-UMB-103", isOccupied: true, isLocked: true },
      { slotNumber: 4, umbrellaId: "ITS-UMB-104", isOccupied: true, isLocked: true },
      { slotNumber: 5, umbrellaId: "ITS-UMB-105", isOccupied: true, isLocked: true },
      { slotNumber: 6, umbrellaId: "ITS-UMB-106", isOccupied: true, isLocked: true },
      { slotNumber: 7, umbrellaId: "ITS-UMB-107", isOccupied: true, isLocked: true },
      { slotNumber: 8, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 9, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 10, umbrellaId: null, isOccupied: false, isLocked: false }
    ]
  },
  {
    id: "LCK-TWR-2",
    name: "Smart Locker Menara TOWER 2",
    category: "TOWER",
    surveyPriority: "85% Prioritas Responden (Tower 2)",
    locationDesc: "Selasar Depan Menara Tower 2 ITS (Gedung Pascasarjana & Riset Terpadu)",
    coords: { x: 52, y: 30 },
    totalSlots: 10,
    availableUmbrellas: 8,
    emptySlots: 2,
    status: "online",
    iotDevice: "ESP32-CAM Gateway #01-B",
    solenoidStatus: "locked",
    powerSource: "PLN 220V + UPS Baterai Backup 12V",
    wifiSignal: "ITS-Student-WiFi (95%)",
    lastMaintenance: "26 Okt 2026, 14:15 WIB",
    slots: [
      { slotNumber: 1, umbrellaId: "ITS-UMB-201", isOccupied: true, isLocked: true },
      { slotNumber: 2, umbrellaId: "ITS-UMB-202", isOccupied: true, isLocked: true },
      { slotNumber: 3, umbrellaId: "ITS-UMB-203", isOccupied: true, isLocked: true },
      { slotNumber: 4, umbrellaId: "ITS-UMB-204", isOccupied: true, isLocked: true },
      { slotNumber: 5, umbrellaId: "ITS-UMB-205", isOccupied: true, isLocked: true },
      { slotNumber: 6, umbrellaId: "ITS-UMB-206", isOccupied: true, isLocked: true },
      { slotNumber: 7, umbrellaId: "ITS-UMB-207", isOccupied: true, isLocked: true },
      { slotNumber: 8, umbrellaId: "ITS-UMB-208", isOccupied: true, isLocked: true },
      { slotNumber: 9, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 10, umbrellaId: null, isOccupied: false, isLocked: false }
    ]
  },
  {
    id: "LCK-TWR-3",
    name: "Smart Locker Menara TOWER 3",
    category: "TOWER",
    surveyPriority: "85% Prioritas Responden (Tower 3)",
    locationDesc: "Plaza Utama Menara Tower 3 ITS (Laboratorium Sentral & Inovasi)",
    coords: { x: 59, y: 37 },
    totalSlots: 10,
    availableUmbrellas: 5,
    emptySlots: 5,
    status: "online",
    iotDevice: "ESP32-CAM Gateway #01-C",
    solenoidStatus: "locked",
    powerSource: "PLN 220V + UPS Baterai Backup 12V",
    wifiSignal: "ITS-Student-WiFi (96%)",
    lastMaintenance: "26 Okt 2026, 14:30 WIB",
    slots: [
      { slotNumber: 1, umbrellaId: "ITS-UMB-301", isOccupied: true, isLocked: true },
      { slotNumber: 2, umbrellaId: "ITS-UMB-302", isOccupied: true, isLocked: true },
      { slotNumber: 3, umbrellaId: "ITS-UMB-303", isOccupied: true, isLocked: true },
      { slotNumber: 4, umbrellaId: "ITS-UMB-304", isOccupied: true, isLocked: true },
      { slotNumber: 5, umbrellaId: "ITS-UMB-305", isOccupied: true, isLocked: true },
      { slotNumber: 6, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 7, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 8, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 9, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 10, umbrellaId: null, isOccupied: false, isLocked: false }
    ]
  },
  {
    id: "LCK-FTEIC",
    name: "Smart Locker FTEIC / Informatika & Elektro",
    category: "Fakultas / Departemen",
    surveyPriority: "95% Prioritas Responden (Tertinggi)",
    locationDesc: "Koridor Terbuka Dekanat FTEIC & Lab Gedung Informatika ITS",
    coords: { x: 26, y: 24 },
    totalSlots: 12,
    availableUmbrellas: 8,
    emptySlots: 4,
    status: "online",
    iotDevice: "ESP32-CAM Gateway #02",
    solenoidStatus: "locked",
    powerSource: "PLN 220V + UPS Baterai Backup 12V",
    wifiSignal: "ITS-Student-WiFi (94%)",
    lastMaintenance: "25 Okt 2026, 10:30 WIB",
    slots: [
      { slotNumber: 1, umbrellaId: "ITS-UMB-0201", isOccupied: true, isLocked: true },
      { slotNumber: 2, umbrellaId: "ITS-UMB-0202", isOccupied: true, isLocked: true },
      { slotNumber: 3, umbrellaId: "ITS-UMB-0203", isOccupied: true, isLocked: true },
      { slotNumber: 4, umbrellaId: "ITS-UMB-0204", isOccupied: true, isLocked: true },
      { slotNumber: 5, umbrellaId: "ITS-UMB-0205", isOccupied: true, isLocked: true },
      { slotNumber: 6, umbrellaId: "ITS-UMB-0206", isOccupied: true, isLocked: true },
      { slotNumber: 7, umbrellaId: "ITS-UMB-0207", isOccupied: true, isLocked: true },
      { slotNumber: 8, umbrellaId: "ITS-UMB-0208", isOccupied: true, isLocked: true },
      { slotNumber: 9, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 10, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 11, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 12, umbrellaId: null, isOccupied: false, isLocked: false }
    ]
  },
  {
    id: "LCK-HALTE",
    name: "Smart Locker Halte & Parkir Utama Kampus",
    category: "Halte / Parkir",
    surveyPriority: "65% Prioritas Responden",
    locationDesc: "Shelter Bis Kampus ITS & Parkiran Mahasiswa Gerbang Utama",
    coords: { x: 80, y: 72 },
    totalSlots: 15,
    availableUmbrellas: 2, // Rendah (karena mahasiswa sering ambil di sini saat hujan)
    emptySlots: 13,
    status: "warning", // butuh redistribusi!
    iotDevice: "ESP32-CAM Gateway #03",
    solenoidStatus: "locked",
    powerSource: "PLN 220V + Solar Cell Backup",
    wifiSignal: "ITS-Outdoor-Mesh (85%)",
    lastMaintenance: "26 Okt 2026, 17:15 WIB",
    slots: [
      { slotNumber: 1, umbrellaId: "ITS-UMB-0301", isOccupied: true, isLocked: true },
      { slotNumber: 2, umbrellaId: "ITS-UMB-0302", isOccupied: true, isLocked: true },
      { slotNumber: 3, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 4, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 5, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 6, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 7, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 8, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 9, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 10, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 11, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 12, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 13, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 14, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 15, umbrellaId: null, isOccupied: false, isLocked: false }
    ]
  },
  {
    id: "LCK-PUSAT",
    name: "Smart Locker Perpustakaan Pusat & Plaza Dr. Angka",
    category: "Fasilitas Umum",
    surveyPriority: "Fasilitas Belajar & Titik Kumpul",
    locationDesc: "Selasar Depan Gedung Perpustakaan Pusat ITS",
    coords: { x: 44, y: 58 },
    totalSlots: 10,
    availableUmbrellas: 6,
    emptySlots: 4,
    status: "online",
    iotDevice: "ESP32-CAM Gateway #04",
    solenoidStatus: "locked",
    powerSource: "PLN 220V + UPS Baterai Backup 12V",
    wifiSignal: "ITS-Student-WiFi (96%)",
    lastMaintenance: "24 Okt 2026, 13:00 WIB",
    slots: [
      { slotNumber: 1, umbrellaId: "ITS-UMB-0401", isOccupied: true, isLocked: true },
      { slotNumber: 2, umbrellaId: "ITS-UMB-0402", isOccupied: true, isLocked: true },
      { slotNumber: 3, umbrellaId: "ITS-UMB-0403", isOccupied: true, isLocked: true },
      { slotNumber: 4, umbrellaId: "ITS-UMB-0404", isOccupied: true, isLocked: true },
      { slotNumber: 5, umbrellaId: "ITS-UMB-0405", isOccupied: true, isLocked: true },
      { slotNumber: 6, umbrellaId: "ITS-UMB-0406", isOccupied: true, isLocked: true },
      { slotNumber: 7, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 8, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 9, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 10, umbrellaId: null, isOccupied: false, isLocked: false }
    ]
  },
  {
    id: "LCK-FTIRS",
    name: "Smart Locker FTIRS / Mesin, Kimia & Fisika",
    category: "Fakultas / Departemen",
    surveyPriority: "95% Prioritas Responden",
    locationDesc: "Plaza Teknik Mesin & Gedung Riset Nano FTIRS",
    coords: { x: 74, y: 22 },
    totalSlots: 12,
    availableUmbrellas: 7,
    emptySlots: 5,
    status: "online",
    iotDevice: "ESP32-CAM Gateway #05",
    solenoidStatus: "locked",
    powerSource: "PLN 220V + UPS Baterai Backup 12V",
    wifiSignal: "ITS-Student-WiFi (91%)",
    lastMaintenance: "25 Okt 2026, 16:20 WIB",
    slots: [
      { slotNumber: 1, umbrellaId: "ITS-UMB-0501", isOccupied: true, isLocked: true },
      { slotNumber: 2, umbrellaId: "ITS-UMB-0502", isOccupied: true, isLocked: true },
      { slotNumber: 3, umbrellaId: "ITS-UMB-0503", isOccupied: true, isLocked: true },
      { slotNumber: 4, umbrellaId: "ITS-UMB-0504", isOccupied: true, isLocked: true },
      { slotNumber: 5, umbrellaId: "ITS-UMB-0505", isOccupied: true, isLocked: true },
      { slotNumber: 6, umbrellaId: "ITS-UMB-0506", isOccupied: true, isLocked: true },
      { slotNumber: 7, umbrellaId: "ITS-UMB-0507", isOccupied: true, isLocked: true },
      { slotNumber: 8, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 9, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 10, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 11, umbrellaId: null, isOccupied: false, isLocked: false },
      { slotNumber: 12, umbrellaId: null, isOccupied: false, isLocked: false }
    ]
  }
];

// Data Analisis Risiko Berdasarkan Tabel 2.3 & 2.4 Laporan (ISO 31000:2018)
export const RISK_ANALYSIS = [
  {
    id: "R1",
    name: "Payung hilang atau tidak dikembalikan",
    description: "Peminjam tidak mengembalikan payung atau mengembalikannya dalam kondisi rusak sehingga jumlah aset berkurang.",
    likelihood: 4,
    impact: 4,
    score: 16,
    level: "Tinggi",
    color: "rose",
    mitigation: "Deposit Rp10.000 dikembalikan penuh, identifikasi pengguna melalui e-wallet/NRP, batas waktu peminjaman dengan denda keterlambatan, dan nomor seri unik pada setiap payung. Bila terjadi kehilangan, deposit dipotong."
  },
  {
    id: "R2",
    name: "Distribusi payung tidak merata",
    description: "Pengembalian di titik mana pun menyebabkan payung menumpuk pada lokasi tertentu dan habis pada lokasi lain (misal: habis di Halte, menumpuk di Gedung Kuliah).",
    likelihood: 4,
    impact: 3,
    score: 12,
    level: "Sedang",
    color: "amber",
    mitigation: "Pemantauan stok setiap locker via dashboard IoT real-time, redistribusi terjadwal oleh tim operasional, serta notifikasi di aplikasi jika locker tujuan sudah penuh."
  },
  {
    id: "R3",
    name: "Gangguan teknis IoT & Daya",
    description: "Listrik atau jaringan internet terputus, solenoid door lock macet, atau pemindai QR gagal sehingga locker tidak dapat dibuka.",
    likelihood: 3,
    impact: 4,
    score: 12,
    level: "Sedang",
    color: "amber",
    mitigation: "Catu daya cadangan UPS 12V, pemeliharaan hardware berkala, mekanisme darurat manual override code, dan kanal pengaduan WhatsApp cepat tanggap."
  },
  {
    id: "R4",
    name: "Vandalisme atau pencurian locker",
    description: "Locker dirusak atau dibobol karena berada di ruang terbuka kampus.",
    likelihood: 3,
    impact: 4,
    score: 12,
    level: "Sedang",
    color: "amber",
    mitigation: "Penempatan pada area ramai dan terpantau CCTV kampus ITS, bodi locker baja tahan cuaca yang dibaut ke pondasi, koordinasi dengan SKK ITS."
  },
  {
    id: "R5",
    name: "Permintaan bersifat musiman",
    description: "Permintaan menurun pada musim kemarau sehingga pendapatan sewa tidak stabil.",
    likelihood: 4,
    impact: 3,
    score: 12,
    level: "Sedang",
    color: "amber",
    mitigation: "Perluasan manfaat payung pelindung panas terik matahari (UV protection), pendapatan sponsor iklan pada daun payung & bodi locker, serta penyesuaian rotasi payung aktif."
  },
  {
    id: "R6",
    name: "Arus kas ketat pada tahap awal",
    description: "Investasi locker, ESP32-CAM, dan payung relatif besar di awal, sedangkan pendapatan sewa Rp2.000 per transaksi.",
    likelihood: 3,
    impact: 4,
    score: 12,
    level: "Sedang",
    color: "amber",
    mitigation: "Memulai pilot project bertahap pada 3 titik paling ramai (Fakultas, Tower, Halte), pendanaan hibah Program Pembinaan Mahasiswa Wirausaha (P2MW) / Kemendikbud, serta sponsor institusi."
  },
  {
    id: "R7",
    name: "Tidak memperoleh izin / dukungan kampus",
    description: "Penempatan locker memerlukan izin sarana prasarana ITS.",
    likelihood: 2,
    impact: 5,
    score: 10,
    level: "Sedang",
    color: "amber",
    mitigation: "Pendekatan formal melalui dosen pembimbing kewirausahaan, presentasi nilai tambah sebagai smart campus facility, integrasi data pemanfaatan untuk fasilitas kampus ITS."
  },
  {
    id: "R8",
    name: "Adopsi rendah / keberatan tarif sewa",
    description: "Sebagian mahasiswa enggan membayar sewa (15% hanya mau skema deposit gratis).",
    likelihood: 3,
    impact: 3,
    score: 9,
    level: "Sedang",
    color: "amber",
    mitigation: "Sosialisasi dampak positif, promo gratis 1 jam pertama pada masa peluncuran, subsidi biaya dari sponsor alumni/mitra komersial."
  },
  {
    id: "R9",
    name: "Keamanan sistem dan pembayaran",
    description: "QR Code dipalsukan, kebocoran data, atau salah pencatatan deposit.",
    likelihood: 2,
    impact: 4,
    score: 8,
    level: "Sedang",
    color: "amber",
    mitigation: "Dynamic QR Code berbatas waktu 3 menit, enkripsi token IoT TLS, gateway pembayaran resmi QRIS (Midtrans/Xendit)."
  },
  {
    id: "R10",
    name: "Persaingan dan substitusi",
    description: "Mahasiswa membawa payung sendiri, meminjam teman, atau menggunakan ojek online.",
    likelihood: 3,
    impact: 2,
    score: 6,
    level: "Rendah",
    color: "emerald",
    mitigation: "Menonjolkan kepraktisan self-service instan tanpa perlu repot membawa payung basah ke dalam kelas/lab, harga Rp2.000 sangat terjangkau."
  }
];

// Data Business Model Canvas 9 Blok Sesuai Tabel 2.1
export const BMC_DATA = {
  customerSegments: [
    "Mahasiswa ITS (segmen utama, 80% tidak selalu bawa payung, butuh mobilitas antargedung)",
    "Dosen & Tenaga Kependidikan ITS",
    "Tamu & pengunjung kampus / wisudawan & wali",
    "Pihak Kampus ITS (mitra institusional penunjang fasilitas Smart Campus)"
  ],
  valuePropositions: [
    "Payung tersedia seketika saat hujan mendadak di jalur pedestrian",
    "Peminjaman mandiri tanpa antre / tanpa petugas menggunakan QR Code e-wallet",
    "Pengembalian fleksibel di locker titik mana pun di lingkungan kampus",
    "Deposit Rp10.000 dikembalikan penuh dan transparan",
    "Biaya sewa sangat terjangkau hanya Rp2.000 per sesi"
  ],
  channels: [
    "QR Code dan pembayaran e-wallet langsung pada unit Smart Locker",
    "Stiker instruksi grafis dan QR informasi panduan",
    "Media sosial (Instagram @its_campus, TikTok, Line Mahasiswa ITS)",
    "Kemitraan Organisasi Kemahasiswaan (BEM ITS, Himpunan Departemen)",
    "Kanal informasi resmi ITS & papan pengumuman kampus"
  ],
  customerRelationships: [
    "Layanan otomatis penuh 24/7 (Self-Service Smart Locker)",
    "Notifikasi real-time status pinjam & pengembalian deposit ke WhatsApp/e-wallet",
    "Kanal pengaduan kendala cepat melalui customer service WhatsApp",
    "Poin loyalitas & promo gratis sewa untuk pengguna aktif"
  ],
  revenueStreams: [
    "Biaya sewa payung Rp2.000 per transaksi",
    "Pemotongan deposit jika payung hilang atau rusak parah",
    "Sponsorship & iklan komersial pada daun payung dan panel bodi smart locker",
    "Dukungan program Smart Campus & CSR perusahaan mitra ITS"
  ],
  keyResources: [
    "Smart Locker fisik (mikrokontroler ESP32-CAM, Solenoid Door Lock, Sensor Switch/RFID, Barcode Reader)",
    "Armada payung berkualitas tinggi dengan UV coating & barcode unik",
    "Platform web application, basis data transaksi, & dashboard pemantauan IoT",
    "Tim teknis pemeliharaan & kru operasional redistribusi payung",
    "Modal awal (hibah kewirausahaan mahasiswa / sponsor)"
  ],
  keyActivities: [
    "Pengembangan dan pemeliharaan firmware & sistem IoT",
    "Pemantauan stok dan kondisi locker secara real-time",
    "Redistribusi berkala payung antartitik locker (rebalancing)",
    "Pembersihan, pengeringan, dan perbaikan payung",
    "Pengelolaan gerbang pembayaran QRIS dan refund deposit otomatis",
    "Pemasaran & edukasi tata tertib peminjaman"
  ],
  keyPartnerships: [
    "Pihak Rektorat & Sarpras ITS (izin lokasi strategis, pasokan listrik & WiFi)",
    "Penyedia QRIS & payment gateway (GoPay, OVO, ShopeePay, DANA)",
    "Vendor fabrikasi lemari smart locker plat baja",
    "Pemasok payung pabrikan (kualitas rangka fiber anti-badai)",
    "Mitra sponsor dan pengiklan (Bank BNI ITS, provider telekomunikasi, dll)"
  ],
  costStructure: [
    "Investasi awal pengadaan lemari smart locker & modul IoT ESP32",
    "Pengadaan stok awal payung berseri",
    "Biaya operasional utilitas (listrik & jaringan internet)",
    "Biaya MDR transaksi pembayaran digital e-wallet",
    "Biaya perawatan, perbaikan sparepart solenoid & penggantian payung rusak",
    "Insentif tenaga operasional redistribusi payung",
    "Biaya branding, cetak QR poster, dan pemasaran"
  ]
};

// Data Sponsor Mockup
export const SPONSORS = [
  { name: "Bank BNI ITS", type: "Mitra Perbankan & Pembayaran", logoText: "BNI 46" },
  { name: "Telkomsel ITS Youth", type: "Mitra Konektivitas IoT Mesh", logoText: "Telkomsel" },
  { name: "Alumni Teknik Sepuluh Nopember", type: "Program Hibah Inovasi Kampus", logoText: "IKA ITS" }
];
