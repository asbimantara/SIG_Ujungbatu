# PERENCANAAN SISTEM INFORMASI GEOGRAFIS (SIG) DESA UJUNGBATU

**Mata Kuliah:** Sistem Informasi Geografis  
**Model Perkuliahan:** Project-Based Learning (PBL)  
**Pertemuan:** Minggu Ke-8  
**Pengembang:** Ahmad Surya Bimantara (NIM: 231240001384)  
**Program Studi:** S1 Teknik Informatika  
**Universitas:** Universitas Islam Nahdlatul Ulama Jepara  

---

## 1. JUDUL IDE SISTEM

**Sistem Informasi Geografis (SIG) Berbasis Web untuk Pemetaan Wilayah Desa Ujungbatu, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah**

---

## 2. DESKRIPSI SINGKAT

Sistem Informasi Geografis (SIG) Desa Ujungbatu adalah aplikasi berbasis web yang dirancang untuk memvisualisasikan dan mengelola data geografis wilayah Desa Ujungbatu secara interaktif. Aplikasi ini menyediakan peta digital yang dapat diakses melalui browser web, memungkinkan pengguna untuk melihat berbagai informasi spasial seperti batas wilayah, fasilitas umum, infrastruktur, dan penggunaan lahan.

Aplikasi ini dikembangkan menggunakan teknologi web modern (Next.js, React, Leaflet) dengan tujuan memberikan kemudahan akses informasi geografis bagi pemerintah desa, masyarakat, dan pihak-pihak terkait dalam perencanaan pembangunan dan pengambilan keputusan berbasis data spasial.

**Lokasi:** Desa Ujungbatu, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah  
**Koordinat Pusat:** -6.5810° LS, 110.648° BT  
**Luas Wilayah:** Mencakup wilayah administrasi Desa Ujungbatu dan Pulau Panjang  

---

## 3. PEMETAAN WILAYAH DESA

### 3.1 Identifikasi Batas Wilayah Desa

**Deskripsi:**
Batas wilayah administrasi Desa Ujungbatu dipetakan menggunakan data polygon yang mencakup seluruh area administratif desa. Batas ini penting untuk memberikan konteks geografis dan membedakan wilayah Desa Ujungbatu dengan desa-desa sekitarnya.

**Sumber Data:**
- OpenStreetMap (OSM) - Data batas administrasi
- Data resmi dari Pemerintah Desa Ujungbatu
- Verifikasi melalui survei lapangan

**Format Data:**
- GeoJSON Polygon
- Sistem koordinat: WGS84 (EPSG:4326)

**Fitur Visualisasi:**
- Garis batas berwarna abu-abu gelap (#1f2937)
- Ketebalan garis: 2px
- Popup informasi menampilkan nama desa dan data kependudukan

---

### 3.2 Poin Lokasi Penting

**Kategori Fasilitas yang Dipetakan:**

#### 3.2.1 Fasilitas Pendidikan
- **SD Negeri 2 Ujungbatu** - Sekolah Dasar negeri
- **SD Negeri 3 Ujungbatu** - Sekolah Dasar negeri
- **TK Pertiwi** - Taman Kanak-kanak
- **PAUD Wijaya Kusuma** - Pendidikan Anak Usia Dini
- **Madrasah Diniyah Ula Salafiyah** - Pendidikan keagamaan

**Total:** 5 fasilitas pendidikan

#### 3.2.2 Fasilitas Keagamaan
- **Musholla Baitul Makmur** - Tempat ibadah
- **Musholla Al-Fatah** - Tempat ibadah
- **Musholla Al-Ikhlas** - Tempat ibadah
- **Musholla Raudhlatul Jannah** - Tempat ibadah

**Total:** 4 fasilitas keagamaan

#### 3.2.3 Fasilitas Kesehatan
- **Praktek Dokter Kiki Ika** - Layanan kesehatan
- **Bidan Ika Rizqi** - Layanan kesehatan ibu dan anak
- **Apotek Dwi Farma** - Layanan farmasi
- **Oemah Khitan Agus** - Layanan kesehatan
- **Pawang Gaib Jepara** - Layanan kesehatan alternatif

**Total:** 5 fasilitas kesehatan

#### 3.2.4 Fasilitas Belanja
- **Indomaret Ujungbatu** - Minimarket
- **Toko Barokah Plastik** - Toko kebutuhan sehari-hari
- **Toko Bu Tien** - Toko kelontong
- **Toko Jeki** - Toko kebutuhan sehari-hari
- **Toko Bangunan TB Makmur** - Toko material bangunan
- **TPI Ujungbatu Jepara** - Tempat Pelelangan Ikan
- Dan 5 toko/warung lainnya

**Total:** 11 fasilitas belanja

#### 3.2.5 Fasilitas Olahraga
- **Stadion GBK** - Stadion sepak bola
- **GOR Futsal GBK** - Gedung olahraga futsal
- **Jepara Mini Soccer** - Lapangan sepak bola mini
- **Kolam Renang GBK** - Fasilitas renang
- **Squash Court GBK** - Lapangan squash
- **Sirkuit BMX GBK** - Sirkuit balap BMX
- **Lapangan Panahan** - Fasilitas panahan

**Total:** 7 fasilitas olahraga

#### 3.2.6 Fasilitas Pemerintahan
- **Kantor Kelurahan Ujungbatu** - Kantor pemerintahan desa
- **Kantor Ketahanan Pangan** - Instansi pemerintah
- **Kantor Pajak Daerah** - Instansi perpajakan
- **BPKAD Jepara** - Badan Pengelola Keuangan dan Aset Daerah
- **Pemadam Kebakaran** - Layanan darurat
- **Pos TNI AL** - Instansi militer

**Total:** 6 fasilitas pemerintahan

#### 3.2.7 Fasilitas Rekreasi
- **Taman Hutan Kota** - Area rekreasi
- **Taman Kehati** - Taman keanekaragaman hayati
- **Taman Kota Jepara** - Taman umum
- **Taman Makam Pahlawan** - Taman makam
- **Taman P2KH Ronggomulyo** - Taman
- **Taman Revolusi Bumi Kartini** - Taman bersejarah
- **Taman Segitiga** - Taman umum

**Total:** 7 fasilitas rekreasi

#### 3.2.8 Fasilitas Wisata
- **Pulau Panjang** - Destinasi wisata pulau
- **Wisata Pulau Panjang** - Area wisata
- **Mercusuar Pulau Panjang** - Bangunan bersejarah
- **Fort Japara** - Benteng bersejarah

**Total:** 4 fasilitas wisata

#### 3.2.9 Fasilitas Jasa
- **Bengkel Putra Mae** - Layanan perbaikan kendaraan
- **RJ Carwash** - Layanan cuci mobil
- **Potong Rambut Melek Meteng** - Layanan potong rambut
- **Samawa Wedding** - Layanan pernikahan
- **Biro STNK SIM** - Layanan administrasi kendaraan
- **Ujung Batu Trans** - Layanan transportasi

**Total:** 6 fasilitas jasa

#### 3.2.10 Fasilitas Akomodasi
- **Kos 3 Saudara** - Tempat kos
- **Kos Pagar Merah** - Tempat kos
- **Rusunawa Ujungbatu** - Rumah susun sewa
- **Rusun UNISNU** - Asrama mahasiswa
- **RedDoorz Syariah** - Hotel/penginapan

**Total:** 5 fasilitas akomodasi

#### 3.2.11 Fasilitas Infrastruktur
- **SPBU Pertamina** - Stasiun pengisian bahan bakar
- **Jembatan Cinta** - Jembatan penting

**Total:** 2 fasilitas infrastruktur

#### 3.2.12 Fasilitas Kuliner
- **Kedai Kopi Gorengan** - Tempat makan
- **Kedai Jamu Pae** - Tempat makan/minum
- **Depot Tahu Walik Bu Ida** - Tempat makan

**Total:** 3 fasilitas kuliner

#### 3.2.13 Fasilitas Makam
- **Makam Arimatea** - Tempat pemakaman

**Total:** 1 fasilitas makam

**Total Keseluruhan:** 60+ fasilitas umum yang dipetakan

**Format Data:**
- GeoJSON Point
- Setiap titik memiliki atribut: nama, kategori, alamat, kontak, jam operasional, foto, koordinat

**Fitur Visualisasi:**
- Icon berbeda warna untuk setiap kategori
- Popup informasi lengkap saat diklik
- Tombol navigasi ke Google Maps

---

### 3.3 Infrastruktur

#### 3.3.1 Jaringan Jalan

**Kategori Jalan yang Dipetakan:**

1. **Jalan Utama**
   - Jalan dengan fungsi utama sebagai penghubung antar wilayah
   - Contoh: Jalan Sidik Harun, Jalan Kyai Ronggo Mulyo, Jalan Pahlawan
   - Warna: Biru (#2563eb)
   - Ketebalan: 3px

2. **Jalan Lokal**
   - Jalan lingkungan/residential
   - Jalan service dan path
   - Warna: Orange (#f59e0b)
   - Ketebalan: 3px

3. **Jembatan**
   - Jembatan Cinta (penghubung penting)
   - Warna: Ungu (#a855f7)
   - Ketebalan: 3px

**Sumber Data:**
- OpenStreetMap (OSM) - Data jalan lengkap
- Verifikasi lapangan untuk jalan-jalan penting

**Format Data:**
- GeoJSON LineString
- Atribut: nama jalan, tipe (fclass), kondisi, permukaan, status jembatan

**Total:** 100+ segmen jalan yang dipetakan

#### 3.3.2 Jembatan

**Jembatan Cinta**
- Lokasi: Menghubungkan Ujungbatu III
- Koordinat: -6.5821° LS, 110.6589° BT
- Fungsi: Penghubung penting antar wilayah
- Status: Aktif

#### 3.3.3 Stasiun Pengisian Bahan Bakar

**SPBU Pertamina**
- Lokasi: Jalan utama Ujungbatu
- Fungsi: Penyediaan bahan bakar untuk kendaraan
- Status: Operasional

---

### 3.4 Penggunaan Lahan

**Kategori Penggunaan Lahan yang Dipetakan:**

#### 3.4.1 Permukiman
- Area pemukiman penduduk
- Warna: Orange (#f59e0b) dengan opacity 20%
- Mencakup seluruh area perumahan di Desa Ujungbatu

#### 3.4.2 Bangunan
- Area bangunan (rumah, gedung, dll.)
- Warna: Abu-abu (#64748b) dengan opacity 30%
- Mencakup semua struktur bangunan

#### 3.4.3 Sungai/Rawa
- Badan air (sungai, rawa, wetland)
- Warna: Biru (#3b82f6) untuk sungai, Hijau (#10b981) untuk wetland
- Opacity: 40%
- Mencakup sungai dan area rawa di wilayah desa

#### 3.4.4 Area Khusus (POI)
- **Taman** - Area hijau untuk rekreasi (Hijau #22c55e)
- **Stadion/Sports Centre** - Fasilitas olahraga (Merah #ef4444)
- **Pemakaman** - Area pemakaman (Abu-abu #64748b)
- **Lapangan Olahraga** - Pitch, lapangan (Hijau #34c19794)
- **Pasar** - Market place (Kuning #fbbf24)

**Sumber Data:**
- OpenStreetMap (OSM) - Data penggunaan lahan
- QGIS processing untuk ekstraksi data
- Verifikasi lapangan

**Format Data:**
- GeoJSON Polygon
- Atribut: tipe penggunaan lahan (fclass), nama area

**Total:** 50+ area penggunaan lahan yang dipetakan

---

## 4. FITUR APLIKASI SIG

### 4.1 Tampilan Peta Interaktif

**Deskripsi:**
Aplikasi menyediakan peta interaktif berbasis web yang dapat diakses melalui browser. Peta menggunakan teknologi Leaflet dengan basemap OpenStreetMap, memberikan pengalaman yang responsif dan mudah digunakan.

**Fitur Utama:**
- **Zoom In/Out** - Pengguna dapat memperbesar atau memperkecil peta menggunakan mouse wheel, tombol zoom, atau gesture pada perangkat touch
- **Pan/Drag** - Pengguna dapat menggeser peta untuk melihat area yang berbeda
- **Klik untuk Detail** - Klik pada fitur peta (fasilitas, jalan, area) akan menampilkan popup dengan informasi lengkap
- **Koordinat Real-time** - Menampilkan koordinat kursor saat bergerak di peta
- **Basemap OpenStreetMap** - Menggunakan tile OSM standar yang konsisten dengan data QGIS

**Teknologi:**
- Leaflet.js - Library peta interaktif
- React-Leaflet - Integrasi Leaflet dengan React
- OpenStreetMap Tiles - Basemap gratis tanpa API key

**Responsivitas:**
- Desktop: Peta full-width dengan sidebar layer
- Tablet: Layout adaptif dengan sidebar collapsible
- Mobile: Peta fullscreen dengan menu hamburger

---

### 4.2 Layer Informasi

**Sistem Multi-Layer:**

Aplikasi menyediakan 7 layer utama yang dapat di-toggle on/off secara independen:

#### 4.2.1 Layer Batas Desa
- **Status Default:** Aktif
- **Tipe:** Polygon
- **Fungsi:** Menampilkan batas administrasi Desa Ujungbatu
- **Visualisasi:** Garis batas abu-abu gelap, 2px

#### 4.2.2 Layer Bangunan
- **Status Default:** Non-aktif
- **Tipe:** Polygon
- **Fungsi:** Menampilkan area bangunan
- **Visualisasi:** Polygon abu-abu dengan opacity 30%

#### 4.2.3 Layer Pemukiman
- **Status Default:** Non-aktif
- **Tipe:** Polygon
- **Fungsi:** Menampilkan area pemukiman penduduk
- **Visualisasi:** Polygon orange dengan opacity 20%

#### 4.2.4 Layer Sungai/Rawa
- **Status Default:** Non-aktif
- **Tipe:** Polygon
- **Fungsi:** Menampilkan badan air (sungai, rawa, wetland)
- **Visualisasi:** Polygon biru/hijau dengan opacity 40%

#### 4.2.5 Layer Jalan
- **Status Default:** Non-aktif
- **Tipe:** LineString
- **Fungsi:** Menampilkan jaringan jalan
- **Visualisasi:** 
  - Jalan utama: Biru (#2563eb)
  - Jalan lokal: Orange (#f59e0b)
  - Jembatan: Ungu (#a855f7)
- **Ketebalan:** 3px

#### 4.2.6 Layer Penggunaan Lahan
- **Status Default:** Non-aktif
- **Tipe:** Polygon
- **Fungsi:** Menampilkan area penggunaan lahan khusus (taman, stadion, pasar, dll.)
- **Visualisasi:** Warna berbeda per tipe (hijau untuk taman, merah untuk stadion, dll.)

#### 4.2.7 Layer Fasilitas
- **Status Default:** Non-aktif
- **Tipe:** Point
- **Fungsi:** Menampilkan titik-titik fasilitas umum
- **Visualisasi:** Icon berwarna berbeda per kategori
- **Kategori:** 13 kategori dengan icon dan warna unik

**Fitur Layer:**
- **Toggle On/Off** - Checkbox untuk setiap layer
- **Legenda Warna** - Panel legenda di sidebar menjelaskan warna setiap layer
- **Z-Index Management** - Layer ditampilkan dengan urutan yang benar (fasilitas di atas, batas di bawah)
- **Performance Optimization** - Layer dimuat on-demand untuk performa optimal

---

### 4.3 Pencarian Lokasi

**Fitur Pencarian:**

#### 4.3.1 Pencarian Fasilitas
- **Input:** Nama fasilitas atau alamat
- **Fungsi:** Mencari fasilitas dari database 60+ fasilitas
- **Hasil:** Daftar fasilitas yang sesuai dengan highlight di peta
- **Lokasi:** Di halaman "Daftar Fasilitas" pada halaman peta

#### 4.3.2 Filter Kategori
- **Input:** Pilihan kategori fasilitas
- **Fungsi:** Menyaring fasilitas berdasarkan kategori
- **Kategori:** 13 kategori (Pendidikan, Keagamaan, Kesehatan, dll.)
- **Hasil:** Hanya menampilkan fasilitas dari kategori yang dipilih

#### 4.3.3 Fitur "Tunjukkan di Peta"
- **Fungsi:** Klik pada fasilitas di daftar → otomatis zoom ke lokasi dan buka popup
- **Behavior:** Hanya menampilkan satu titik yang dipilih (tidak semua fasilitas)
- **Reset:** Otomatis reset saat user mengubah filter/checkbox

**Teknologi:**
- Client-side search dengan JavaScript
- Fuzzy matching untuk toleransi typo
- Real-time filtering

---

### 4.4 Manajemen Data (Input/Edit/Hapus)

**Panel Admin:**

#### 4.4.1 Autentikasi
- **Metode:** Password-based authentication sederhana
- **Akses:** Hanya admin yang terautentikasi
- **Storage:** LocalStorage untuk session management

#### 4.4.2 Tambah Data Fasilitas Baru
- **Form Input:**
  - Nama fasilitas (required)
  - Kategori (dropdown 13 pilihan)
  - Koordinat (latitude, longitude) - dapat dipilih via peta
  - Alamat (optional)
  - Kontak (optional)
  - Jam operasional (optional)
  - Foto (upload file gambar)
- **Validasi:** 
  - Koordinat harus valid (latitude: -90 to 90, longitude: -180 to 180)
  - File foto maksimal 5MB, format JPG/PNG
- **Penyimpanan:** Data disimpan ke `public/data/facilities.json`

#### 4.4.3 Edit Data Fasilitas
- **Akses:** Dari daftar fasilitas di admin panel
- **Form:** Sama dengan form tambah, pre-filled dengan data existing
- **Validasi:** Sama dengan form tambah
- **Update:** Data di-update di file JSON

#### 4.4.4 Hapus Data Fasilitas
- **Metode:** Tombol hapus di daftar fasilitas
- **Konfirmasi:** Dialog konfirmasi sebelum menghapus
- **Permanen:** Data dihapus dari file JSON

#### 4.4.5 Upload Foto
- **Fitur:** Upload foto fasilitas via form
- **Validasi:** 
  - Format: JPG, PNG, JPEG
  - Ukuran maksimal: 5MB
- **Storage:** File disimpan di `public/uploads/`
- **Preview:** Preview gambar sebelum submit

#### 4.4.6 Pagination
- **Fitur:** Daftar fasilitas dengan pagination
- **Items per page:** 10 fasilitas
- **Navigasi:** Previous/Next dan nomor halaman
- **Sorting:** Urut dari terbaru ke terlama

**Teknologi:**
- File-based storage (JSON)
- React Hook Form untuk form management
- Zod untuk validasi schema
- React Hot Toast untuk notifikasi

---

### 4.5 Export Laporan

**Format Export:**

#### 4.5.1 Export GeoJSON
- **Fungsi:** Export data layer ke format GeoJSON
- **Layer yang dapat di-export:**
  - Fasilitas
  - Batas Desa
  - Bangunan
  - Pemukiman
  - Sungai/Rawa
  - Jalan
  - Penggunaan Lahan
- **Kegunaan:** 
  - Import ke QGIS untuk analisis lebih lanjut
  - Backup data
  - Sharing data dengan format standar GIS

#### 4.5.2 Export CSV
- **Fungsi:** Export data layer ke format CSV
- **Layer yang dapat di-export:** Semua layer (dikonversi ke tabel)
- **Kegunaan:**
  - Analisis data di Excel/Google Sheets
  - Import ke database
  - Laporan dalam format spreadsheet

**Fitur Export:**
- **Download langsung** - File langsung terunduh ke komputer user
- **Nama file dinamis** - Format: `layer-name_YYYY-MM-DD.geojson` atau `.csv`
- **Data lengkap** - Semua atribut termasuk dalam export

**Teknologi:**
- Server-side export via API route
- GeoJSON serialization
- CSV generation

---

### 4.6 Dashboard Statistik

**Halaman Dashboard:**

#### 4.6.1 Statistik Fasilitas
- **Total Fasilitas:** Jumlah keseluruhan fasilitas yang terdata
- **Breakdown per Kategori:** 
  - Daftar kategori dengan jumlah fasilitas
  - Visualisasi bar chart
  - Persentase dari total
- **Kategori:** 13 kategori dengan jumlah masing-masing

#### 4.6.2 Statistik Penggunaan Lahan
- **Total Area:** Jumlah area penggunaan lahan yang terdata
- **Breakdown per Tipe:**
  - Taman
  - Stadion/Sports Centre
  - Pemakaman
  - Lapangan Olahraga
  - Pasar
- **Visualisasi:** Bar chart interaktif

#### 4.6.3 Data Kependudukan
- **Total Penduduk:** 4.977 jiwa
- **Breakdown:**
  - Laki-laki: 2.495 jiwa
  - Perempuan: 2.482 jiwa
- **Sumber:** Data agregat dari Pemerintah Desa

**Fitur Dashboard:**
- **Real-time Data** - Data diambil langsung dari file JSON
- **Visualisasi Interaktif** - Chart yang dapat di-hover untuk detail
- **Responsive Design** - Tampilan optimal di semua perangkat

**Teknologi:**
- React untuk UI
- Chart.js atau library chart lainnya untuk visualisasi
- API route untuk data fetching

---

## 5. ALUR KERJA SISTEM

### 5.1 Pengumpulan & Input Data Geografis

**Tahap 1: Pengumpulan Data**

1. **Data OpenStreetMap (OSM)**
   - Download data shapefile dari Geofabrik (java-latest-free.shp.zip)
   - Data mencakup: jalan, bangunan, penggunaan lahan, badan air, dll.
   - Format: Shapefile (.shp, .dbf, .shx)

2. **Data Fasilitas**
   - Survei lapangan untuk mengidentifikasi fasilitas
   - Pengambilan koordinat GPS untuk setiap fasilitas
   - Dokumentasi foto untuk setiap fasilitas
   - Pengumpulan informasi: nama, alamat, kontak, jam operasional

3. **Data Batas Wilayah**
   - Data dari Pemerintah Desa atau OSM
   - Verifikasi batas administrasi

4. **Data Kependudukan**
   - Data agregat dari Pemerintah Desa
   - Total penduduk, laki-laki, perempuan

**Tahap 2: Konversi Data**

1. **Shapefile ke GeoJSON**
   - Menggunakan QGIS untuk membuka shapefile
   - Filter data sesuai area Desa Ujungbatu
   - Export ke format GeoJSON
   - File disimpan di `public/data/` atau `public/qgis/`

2. **Koordinat Fasilitas**
   - Input manual via admin panel
   - Atau import dari file CSV/Excel
   - Validasi koordinat (harus dalam range valid)

3. **Foto Fasilitas**
   - Upload via admin panel
   - Atau copy manual ke folder `public/gambar/`
   - Naming convention: nama-fasilitas.jpg

**Tahap 3: Penyimpanan Data**

1. **File GeoJSON**
   - `boundary.geojson` - Batas desa
   - `buildings.geojson` - Bangunan
   - `settlement.geojson` - Pemukiman
   - `water.geojson` - Sungai/rawa
   - `roads.geojson` - Jalan
   - `landuse.geojson` - Penggunaan lahan

2. **File JSON Fasilitas**
   - `facilities.json` - Data fasilitas dalam format GeoJSON FeatureCollection
   - Struktur: `{ type: "FeatureCollection", features: [...] }`
   - Setiap feature memiliki properties: name, category, alamat, kontak, jam, foto_url

3. **File Foto**
   - Disimpan di `public/gambar/` atau `public/uploads/`
   - Format: JPG, PNG
   - Referensi via URL relatif

---

### 5.2 Pengolahan Data dan Penentuan Layer Peta

**Tahap 1: Processing Data**

1. **Validasi Data**
   - Cek format GeoJSON valid
   - Validasi koordinat (tidak NaN, dalam range)
   - Cek atribut required ada

2. **Normalisasi Data**
   - Standardisasi nama kategori
   - Normalisasi koordinat (pastikan [longitude, latitude])
   - Cleanup data duplikat

3. **Enrichment Data**
   - Tambahkan metadata (timestamp, source)
   - Generate ID unik untuk setiap feature
   - Link foto dengan URL

**Tahap 2: Layer Definition**

1. **Definisi Layer**
   - Setiap layer memiliki:
     - Nama layer
     - Tipe geometri (Point, LineString, Polygon)
     - Style (warna, opacity, weight)
     - Z-index (urutan tampilan)
     - Popup content template

2. **Layer Order**
   - Urutan dari bawah ke atas:
     1. Batas Desa (z-index: 1)
     2. Penggunaan Lahan (z-index: 2)
     3. Pemukiman (z-index: 3)
     4. Bangunan (z-index: 4)
     5. Sungai/Rawa (z-index: 5)
     6. Jalan (z-index: 6)
     7. Fasilitas (z-index: 7) - paling atas

3. **Style Configuration**
   - Palette warna konsisten
   - Opacity untuk polygon
   - Weight untuk garis
   - Icon untuk point

**Tahap 3: API Endpoint**

1. **Data Loading API**
   - `/api/data/load?layer=boundary` - Load layer boundary
   - `/api/data/load?layer=buildings` - Load layer buildings
   - `/api/data/load?layer=facilities` - Load layer facilities
   - dll.

2. **CRUD API**
   - `GET /api/data?layer=facilities` - Ambil data fasilitas
   - `POST /api/data` - Tambah fasilitas baru
   - `PUT /api/data` - Update fasilitas
   - `DELETE /api/data` - Hapus fasilitas

3. **Export API**
   - `GET /api/data/export?layer=facilities&format=geojson` - Export GeoJSON
   - `GET /api/data/export?layer=facilities&format=csv` - Export CSV

---

### 5.3 User Melakukan Akses ke Aplikasi

**Tahap 1: Halaman Welcome**

1. **URL:** `http://localhost:3000/` atau domain production
2. **Tampilan:**
   - Logo aplikasi
   - Judul "SIG Desa Ujungbatu"
   - Deskripsi singkat
   - Dua tombol pilihan:
     - **"Masuk sebagai Pengunjung"** → `/peta`
     - **"Masuk sebagai Admin"** → `/admin` (dengan login)

**Tahap 2: Routing**

1. **Public Routes:**
   - `/` - Welcome page
   - `/peta` - Peta interaktif
   - `/dashboard` - Dashboard statistik
   - `/about` - Tentang aplikasi

2. **Admin Routes:**
   - `/admin` - Login & dashboard admin
   - `/admin/facilities` - Daftar fasilitas
   - `/admin/facilities/new` - Tambah fasilitas
   - `/admin/facilities/[id]/edit` - Edit fasilitas

**Tahap 3: Authentication (Admin)**

1. **Login Process:**
   - User mengakses `/admin`
   - Input password
   - Validasi password
   - Set session di localStorage
   - Redirect ke `/admin` (dashboard)

2. **Session Management:**
   - Session disimpan di localStorage
   - Auto-logout setelah periode tertentu (opsional)
   - Protected routes check session

---

### 5.4 User Memilih Layer dan Menampilkan Informasi

**Tahap 1: Layer Selection**

1. **Sidebar Layer Panel**
   - User melihat daftar 7 layer di sidebar kiri
   - Setiap layer memiliki checkbox
   - Default: Hanya "Batas Desa" yang aktif

2. **Toggle Layer**
   - User klik checkbox untuk mengaktifkan/nonaktifkan layer
   - Perubahan langsung terlihat di peta
   - Multiple layer dapat aktif bersamaan

3. **Filter Kategori Fasilitas**
   - Jika layer "Fasilitas" aktif, user dapat filter per kategori
   - Checkbox per kategori di bawah peta
   - Atau pilih "Semua Fasilitas"

**Tahap 2: Map Interaction**

1. **Zoom & Pan**
   - User zoom in/out untuk melihat detail
   - Pan untuk melihat area lain
   - Auto-fit bounds saat layer pertama kali diaktifkan

2. **Click Feature**
   - User klik pada fitur peta (fasilitas, jalan, area)
   - Popup muncul dengan informasi:
     - Nama
     - Kategori/Tipe
     - Alamat (jika ada)
     - Kontak (jika ada)
     - Jam operasional (jika ada)
     - Foto (jika ada)
     - Tombol "Buka di Google Maps"
     - Tombol "Rute"

3. **Search & Filter**
   - User dapat mencari fasilitas di daftar
   - Filter berdasarkan kategori
   - Klik "Tunjukkan di Peta" untuk zoom ke lokasi

**Tahap 3: Information Display**

1. **Popup Content**
   - Informasi lengkap dalam popup
   - Format HTML yang readable
   - Link ke Google Maps untuk navigasi

2. **Legenda**
   - Panel legenda di sidebar menjelaskan warna setiap layer
   - Box warna dengan label

3. **Statistics**
   - User dapat akses dashboard untuk melihat statistik
   - Visualisasi data dalam bentuk chart

---

### 5.5 User Dapat Menambahkan atau Mengedit Data

**Tahap 1: Admin Access**

1. **Login**
   - Admin login di `/admin`
   - Masukkan password
   - Akses ke dashboard admin

2. **Navigation**
   - Dashboard menampilkan ringkasan data
   - Link ke "Kelola Fasilitas"

**Tahap 2: Tambah Data Baru**

1. **Akses Form**
   - Klik "Tambah Fasilitas" di halaman daftar fasilitas
   - Atau akses langsung `/admin/facilities/new`

2. **Input Data**
   - Isi form:
     - Nama fasilitas (required)
     - Pilih kategori dari dropdown
     - Pilih koordinat via peta (klik di peta) atau input manual
     - Alamat (optional)
     - Kontak (optional)
     - Jam operasional (optional)
     - Upload foto (optional)

3. **Validasi**
   - Client-side validation sebelum submit
   - Cek field required
     - Validasi koordinat
     - Validasi file foto

4. **Submit**
   - Data dikirim ke API `/api/data` (POST)
   - Server validasi ulang
   - Generate ID unik untuk fasilitas
   - Simpan ke `facilities.json`
   - Upload foto ke `public/uploads/`
   - Return success/error message

5. **Feedback**
   - Toast notification: "Fasilitas berhasil ditambahkan"
   - Redirect ke daftar fasilitas
   - Data baru muncul di peta

**Tahap 3: Edit Data Existing**

1. **Akses Edit**
   - Dari daftar fasilitas, klik "Edit" pada fasilitas
   - Atau akses `/admin/facilities/[id]/edit`

2. **Load Data**
   - Form pre-filled dengan data existing
   - Foto existing ditampilkan (jika ada)

3. **Modify Data**
   - User dapat mengubah semua field
   - Upload foto baru (akan replace foto lama)
   - Atau hapus foto

4. **Submit**
   - Data dikirim ke API `/api/data` (PUT)
   - Update data di `facilities.json`
   - Return success/error message

5. **Feedback**
   - Toast notification: "Fasilitas berhasil diupdate"
   - Redirect ke daftar fasilitas
   - Perubahan langsung terlihat di peta

**Tahap 4: Hapus Data**

1. **Akses Hapus**
   - Dari daftar fasilitas, klik "Hapus"
   - Dialog konfirmasi muncul

2. **Konfirmasi**
   - User konfirmasi "Ya, hapus"
   - Atau cancel

3. **Delete**
   - Data dikirim ke API `/api/data` (DELETE)
   - Hapus dari `facilities.json`
   - (Opsional) Hapus foto dari server

4. **Feedback**
   - Toast notification: "Fasilitas berhasil dihapus"
   - Daftar fasilitas di-refresh
   - Data hilang dari peta

---

### 5.6 Sistem Menyimpan Data dan Memperbarui Peta

**Tahap 1: Data Persistence**

1. **File-Based Storage**
   - Data disimpan dalam file JSON/GeoJSON
   - Lokasi: `public/data/facilities.json`
   - Format: GeoJSON FeatureCollection standar

2. **Write Operation**
   - Saat CRUD operation:
     - Baca file JSON
     - Parse ke JavaScript object
     - Modify (tambah/edit/hapus)
     - Stringify kembali ke JSON
     - Write ke file

3. **Atomic Write**
   - Write dilakukan secara atomic untuk prevent corruption
   - Backup file sebelum write (opsional)

**Tahap 2: Real-time Update**

1. **Client-Side Refresh**
   - Setelah CRUD operation, client refresh data
   - Fetch ulang dari API
   - Update state di React component

2. **Map Update**
   - Leaflet map component re-render dengan data baru
   - Marker/feature baru langsung muncul
   - Marker/feature yang dihapus langsung hilang
   - Marker/feature yang di-edit langsung terupdate

3. **No Page Reload**
   - Update terjadi tanpa reload halaman
   - Smooth user experience

**Tahap 3: Data Synchronization**

1. **Single Source of Truth**
   - File JSON adalah source of truth
   - Semua read operation dari file ini
   - Semua write operation ke file ini

2. **Consistency**
   - Data selalu konsisten antara peta dan admin panel
   - Tidak ada data yang terlewat atau duplikat

3. **Backup (Opsional)**
   - Regular backup file JSON
   - Version control via Git
   - Restore capability

**Tahap 4: Performance Optimization**

1. **Lazy Loading**
   - Layer data dimuat on-demand
   - Tidak load semua layer sekaligus
   - Load saat user aktifkan layer

2. **Caching**
   - Data di-cache di client setelah pertama kali load
   - Refresh manual jika perlu data terbaru

3. **Efficient Rendering**
   - Leaflet menggunakan canvas rendering untuk performa
   - Clustering untuk marker yang banyak (opsional)

---

## 6. TEKNOLOGI DAN TOOLS

### 6.1 Frontend Framework

- **Next.js 15** - React framework dengan App Router
- **React 18** - Library UI
- **TypeScript 5** - Type safety

### 6.2 Mapping Library

- **Leaflet 1.9** - Library peta interaktif
- **React-Leaflet** - React wrapper untuk Leaflet
- **OpenStreetMap** - Basemap tiles

### 6.3 Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Dark Theme** - Tema gelap monokrom

### 6.4 Data Format

- **GeoJSON** - Format standar untuk data geografis
- **JSON** - Format untuk data fasilitas

### 6.5 Tools Development

- **QGIS** - Software GIS untuk processing data
- **Git** - Version control
- **GitHub** - Repository hosting

### 6.6 Libraries Tambahan

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Hot Toast** - Toast notifications
- **Iconify** - Icon library

---

## 7. STRUKTUR DATA

### 7.1 Format GeoJSON

Semua data geografis menggunakan format GeoJSON standar:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [110.6589, -6.5821]
      },
      "properties": {
        "name": "Nama Fasilitas",
        "category": "Kategori",
        "alamat": "Alamat",
        "kontak": "Kontak",
        "jam": "Jam Operasional",
        "foto_url": "/gambar/foto.jpg"
      }
    }
  ]
}
```

### 7.2 Koordinat System

- **Sistem:** WGS84 (EPSG:4326)
- **Format:** [longitude, latitude]
- **Range:** 
  - Latitude: -90 to 90
  - Longitude: -180 to 180

---

## 8. KESIMPULAN

Sistem Informasi Geografis (SIG) Desa Ujungbatu adalah aplikasi berbasis web yang dirancang untuk memvisualisasikan dan mengelola data geografis wilayah desa secara interaktif. Aplikasi ini menyediakan:

1. **Pemetaan Lengkap** - 7 layer informasi (batas, bangunan, pemukiman, sungai, jalan, lahan, fasilitas)
2. **60+ Fasilitas** - Data lengkap dengan 13 kategori berbeda
3. **Fitur Interaktif** - Peta dapat di-zoom, pan, dan diklik untuk detail
4. **Manajemen Data** - CRUD lengkap via admin panel
5. **Export Data** - GeoJSON dan CSV untuk analisis lebih lanjut
6. **Dashboard Statistik** - Visualisasi data dalam bentuk chart

Aplikasi ini dapat digunakan oleh pemerintah desa untuk perencanaan pembangunan, masyarakat untuk mencari informasi fasilitas, dan pihak terkait untuk analisis data spasial.

**Status:** ✅ Selesai dan siap digunakan

---

**Dokumen ini dibuat sebagai bagian dari tugas Project-Based Learning (PBL) Mata Kuliah Sistem Informasi Geografis, Universitas Islam Nahdlatul Ulama Jepara.**

© 2025 - Ahmad Surya Bimantara

