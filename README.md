# 🗺️ SIG Desa Ujungbatu

Sistem Informasi Geografis (SIG) berbasis web untuk Desa Ujungbatu, Kecamatan Jepara, Kabupaten Jepara, Jawa Tengah. Aplikasi ini menyediakan peta interaktif untuk visualisasi data spasial desa dengan tema gelap modern.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?logo=leaflet)

## 📸 Screenshots

### Halaman Pengunjung

| Welcome Page | Peta Interaktif |
|:---:|:---:|
| ![Welcome](docs/screenshots/laman%20pertama.png) | ![Peta](docs/screenshots/laman%20user%20peta.png) |

| Popup Detail Fasilitas | Dashboard Statistik |
|:---:|:---:|
| ![Popup](docs/screenshots/laman%20user%20popup%20detail%20lokasi%20muncul%20ketika%20pinpoint%20di%20klik%20atau%20ketika%20user%20klik%20tunjukkan%20di%20peta.png) | ![Dashboard](docs/screenshots/user%20dashboard.png) |

### Panel Admin (Localhost)

| Login Admin | Admin Dashboard |
|:---:|:---:|
| ![Admin Login](docs/screenshots/laman%20admin%20login.png) | ![Admin Dashboard](docs/screenshots/admin%20dashboard.png) |

> 📁 **Lihat lebih banyak screenshot** di folder [`docs/screenshots/`](docs/screenshots/) untuk melihat semua tampilan aplikasi termasuk fitur CRUD admin, filter fasilitas, dan lainnya.

---

## ✨ Fitur Utama

### 🗺️ Peta Interaktif
- Basemap OpenStreetMap (tanpa API key)
- Multi-layer toggle (Batas Desa, Bangunan, Pemukiman, Sungai/Rawa, Jalan, Penggunaan Lahan, Fasilitas)
- Legenda warna untuk setiap layer
- Zoom, pan, dan klik untuk melihat detail
- Tombol "Buka di Google Maps" dan "Rute" untuk navigasi

### 📍 Data Fasilitas
- 40+ fasilitas umum dengan kategori lengkap
- Kategori: Pendidikan, Keagamaan, Kesehatan, Belanja, Olahraga, Pemerintahan, Rekreasi, Wisata, Jasa, Akomodasi, Infrastruktur, Kuliner, Makam
- Informasi detail: nama, alamat, kontak, jam operasional, foto
- Icon warna berbeda per kategori

### 🔍 Pencarian & Filter
- Pencarian fasilitas berdasarkan nama atau alamat
- Filter berdasarkan kategori
- Fitur "Tunjukkan di Peta" untuk zoom ke lokasi spesifik
- Pagination untuk daftar fasilitas

### 📊 Dashboard Statistik
- Total fasilitas per kategori
- Data penggunaan lahan
- Data kependudukan Desa Ujungbatu
- Visualisasi interaktif

### 📥 Export Data
- Export ke format GeoJSON
- Export ke format CSV
- Tersedia untuk semua layer

### 🔐 Panel Admin (Localhost)
- CRUD fasilitas (Tambah, Edit, Hapus)
- Upload foto fasilitas
- Autentikasi sederhana
- Pagination daftar fasilitas

---

## 🛠️ Teknologi

| Kategori | Teknologi |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Library UI | React 18 |
| Bahasa | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Peta | Leaflet + React-Leaflet |
| Data | GeoJSON |
| Basemap | OpenStreetMap |
| Icons | Iconify CDN |
| Form | React Hook Form + Zod |
| Notifikasi | React Hot Toast |

---

## 📁 Struktur Project

```
SIG_Ujungbatu/
├── public/
│   ├── data/                    # Data GeoJSON
│   │   ├── facilities.json      # Data fasilitas
│   │   ├── boundary.geojson     # Batas desa
│   │   ├── buildings.geojson    # Bangunan
│   │   ├── roads.geojson        # Jalan
│   │   ├── landuse.geojson      # Penggunaan lahan
│   │   ├── water.geojson        # Sungai/rawa
│   │   └── settlement.geojson   # Pemukiman
│   └── uploads/                 # Foto upload
├── src/
│   ├── app/
│   │   ├── page.tsx             # Halaman Welcome
│   │   ├── peta/page.tsx        # Halaman Peta
│   │   ├── dashboard/page.tsx   # Halaman Dashboard
│   │   ├── about/page.tsx       # Halaman About
│   │   ├── admin/               # Panel Admin
│   │   └── api/                 # API Routes
│   ├── components/
│   │   ├── MapView.tsx          # Komponen peta utama
│   │   ├── Dashboard.tsx        # Komponen dashboard
│   │   ├── Navigation.tsx       # Navbar
│   │   ├── FacilityList.tsx     # Daftar fasilitas
│   │   ├── FacilityCategoryFilter.tsx
│   │   ├── ExportSection.tsx
│   │   └── admin/               # Komponen admin
│   ├── data/                    # Sample data
│   └── lib/                     # Utilities
├── gambar/                      # Foto fasilitas lokal
└── README.md
```

---

## 📄 Halaman

| URL | Deskripsi |
|-----|-----------|
| `/` | Halaman Welcome (pilih Pengunjung/Admin) |
| `/peta` | Peta interaktif dengan semua fitur |
| `/dashboard` | Dashboard statistik |
| `/about` | Tentang aplikasi & pengembang |
| `/admin` | Panel admin (login required) |
| `/admin/facilities` | Kelola fasilitas |
| `/admin/facilities/new` | Tambah fasilitas baru |
| `/admin/facilities/[id]/edit` | Edit fasilitas |

---

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone https://github.com/asbimantara/SIG_Ujungbatu.git

# Masuk ke folder project
cd SIG_Ujungbatu

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
# Build
npm run build

# Jalankan production server
npm start
```

---

## 🌐 API Endpoints

| Endpoint | Method | Deskripsi |
|----------|--------|-----------|
| `/api/data?layer=facilities` | GET | Ambil data fasilitas |
| `/api/data` | POST | Tambah fasilitas baru |
| `/api/data` | PUT | Update fasilitas |
| `/api/data` | DELETE | Hapus fasilitas |
| `/api/data/load?layer=boundary` | GET | Ambil data layer GeoJSON |
| `/api/data/export?layer=facilities&format=geojson` | GET | Export GeoJSON |
| `/api/data/export?layer=facilities&format=csv` | GET | Export CSV |
| `/api/upload` | POST | Upload foto |

---

## 📊 Data Layer

| Layer | Tipe | Deskripsi |
|-------|------|-----------|
| Batas Desa | Polygon | Batas administrasi Desa Ujungbatu |
| Bangunan | Polygon | Area bangunan |
| Pemukiman | Polygon | Area pemukiman penduduk |
| Sungai/Rawa | Polygon | Badan air dan wetland |
| Jalan | LineString | Jaringan jalan (utama, lokal, jembatan) |
| Penggunaan Lahan | Polygon | POI area (taman, stadion, pasar, dll) |
| Fasilitas | Point | Titik fasilitas umum |

---

## 👨‍💻 Pengembang

**Ahmad Surya Bimantara**
- NIM: 231240001384
- Program Studi: S1 Teknik Informatika
- Universitas: Universitas Islam Nahdlatul Ulama Jepara
- Mata Kuliah: Sistem Informasi Geografis

---

## 📝 Sumber Data

- **OpenStreetMap (OSM)** — Data dasar peta, jalan, bangunan, dan batas wilayah
- **Survei Lapangan** — Data fasilitas umum dan titik-titik penting
- **Data Kependudukan** — Data agregat penduduk Desa Ujungbatu (4.977 jiwa)

### 📥 Download Data Shapefile OSM

Untuk mendapatkan data layer lengkap (jalan, bangunan, pemukiman, dll) dari OpenStreetMap:

**Download:** [java-latest-free.shp.zip](https://download.geofabrik.de/asia/indonesia/java-latest-free.shp.zip)

File ini berisi shapefile untuk seluruh Pulau Jawa yang dapat digunakan dengan QGIS atau software GIS lainnya. Layer yang tersedia:
- `gis_osm_roads_free` — Jaringan jalan
- `gis_osm_buildings_a_free` — Bangunan
- `gis_osm_landuse_a_free` — Penggunaan lahan
- `gis_osm_water_a_free` — Badan air
- `gis_osm_pois_free` — Point of Interest
- Dan lainnya

> **Note:** File ini berukuran besar (~500MB compressed, ~8GB extracted). Gunakan QGIS untuk memfilter data sesuai area yang dibutuhkan.

---

## 📜 Lisensi

Proyek ini dibuat untuk keperluan akademik (Tugas UAS Sistem Informasi Geografis).

© 2025 SIG Desa Ujungbatu - UNISNU Jepara
