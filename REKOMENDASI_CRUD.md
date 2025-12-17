# Rekomendasi Implementasi CRUD untuk SIG Ujungbatu

## Analisis Situasi Saat Ini

**Data Storage:**
- ✅ GeoJSON files di `public/qgis/` (boundary, buildings, settlement, water, roads, landuse)
- ✅ Hardcoded di `src/data/sample.ts` (facilities)
- ✅ API routes untuk load dan export sudah ada
- ❌ Tidak ada database
- ❌ Tidak ada authentication

## Opsi Implementasi CRUD

### 🎯 **OPSI 1: File-Based CRUD Sederhana** (REKOMENDASI)

**Kelebihan:**
- ✅ **Cepat diimplementasikan** (1-2 hari)
- ✅ **Tidak perlu setup database** - cocok untuk demo/ujian
- ✅ **Sederhana** - mudah dipahami dosen
- ✅ **Cocok untuk data statis** - data tidak berubah terlalu sering
- ✅ **Mudah backup** - cukup backup folder `public/qgis/`

**Kekurangan:**
- ❌ Tidak cocok untuk multi-user simultan
- ❌ Tidak ada versioning/audit log
- ❌ Perlu restart server untuk perubahan besar

**Implementasi:**
1. **Halaman Admin** (`/admin`) - tanpa login (atau password sederhana)
2. **Form CRUD** untuk setiap layer:
   - **Create**: Form input + klik di peta untuk koordinat
   - **Read**: List data dengan preview di peta
   - **Update**: Edit form dengan data existing
   - **Delete**: Hapus dengan konfirmasi
3. **API Routes**:
   - `POST /api/data` - Create
   - `PUT /api/data` - Update
   - `DELETE /api/data` - Delete
4. **File Management**: Baca/tulis GeoJSON files langsung

**Estimasi Waktu:** 1-2 hari kerja

---

### 🏢 **OPSI 2: Database dengan Supabase** (Untuk Production)

**Kelebihan:**
- ✅ **Robust** - cocok untuk production
- ✅ **Multi-user** - bisa handle banyak user
- ✅ **Audit log** - track perubahan
- ✅ **Real-time** - perubahan langsung terlihat
- ✅ **Authentication** - NextAuth integration mudah

**Kekurangan:**
- ❌ **Butuh setup** - perlu akun Supabase
- ❌ **Lebih kompleks** - butuh waktu lebih lama
- ❌ **Butuh konfigurasi** - environment variables

**Implementasi:**
1. Setup Supabase project
2. Buat tabel untuk setiap layer
3. NextAuth untuk authentication
4. API routes dengan Supabase client
5. Real-time updates dengan Supabase subscriptions

**Estimasi Waktu:** 3-4 hari kerja

---

### 🔄 **OPSI 3: Hybrid (File + Database)** (Kompleks)

**Kelebihan:**
- ✅ GeoJSON tetap di file (untuk QGIS compatibility)
- ✅ Metadata di database (untuk query cepat)

**Kekurangan:**
- ❌ **Paling kompleks** - perlu sync file dan database
- ❌ **Risiko inconsistency** - file dan DB bisa tidak sync

**Estimasi Waktu:** 4-5 hari kerja

---

## 🎯 **REKOMENDASI FINAL: OPSI 1 (File-Based CRUD)**

### Alasan:
1. **Cocok untuk UAS** - sederhana, mudah dipahami dosen
2. **Cepat** - bisa selesai dalam 1-2 hari
3. **Fungsional** - memenuhi ketentuan CRUD
4. **Tidak perlu setup eksternal** - tidak perlu database
5. **Mudah demo** - langsung bisa ditunjukkan

### Fitur Minimal yang Perlu:
1. ✅ **Halaman Admin** (`/admin`)
   - Password sederhana (atau tanpa password untuk demo)
   - List semua layer
   
2. ✅ **CRUD untuk Fasilitas** (prioritas utama)
   - Form input: nama, kategori, alamat, koordinat
   - Edit data existing
   - Hapus dengan konfirmasi
   - Preview di peta
   
3. ✅ **CRUD untuk Layer Lain** (opsional, bisa ditambahkan nanti)
   - Jalan, Lahan, dll

4. ✅ **API Routes**
   - `POST /api/data` - Create
   - `PUT /api/data` - Update  
   - `DELETE /api/data` - Delete

### Struktur File yang Akan Dibuat:

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Halaman admin
│   └── api/
│       └── data/
│           └── route.ts      # Update untuk POST/PUT/DELETE
├── components/
│   ├── AdminMapView.tsx      # Peta dengan drawing tools
│   ├── FacilityForm.tsx      # Form input/edit fasilitas
│   └── AdminLayerList.tsx    # List layer untuk CRUD
└── lib/
    └── geojson-utils.ts      # Helper untuk baca/tulis GeoJSON
```

### Flow CRUD:

**Create:**
1. User klik "Tambah Fasilitas" di admin
2. Form muncul, user isi data
3. User klik di peta untuk set koordinat (atau input manual)
4. Submit → API write ke file GeoJSON
5. Peta refresh, data baru muncul

**Update:**
1. User klik fasilitas di list admin
2. Form muncul dengan data existing
3. User edit data
4. Submit → API update file GeoJSON
5. Peta refresh

**Delete:**
1. User klik "Hapus" di list admin
2. Konfirmasi dialog
3. Submit → API hapus dari file GeoJSON
4. Peta refresh

---

## Alternatif Sederhana (Jika Waktu Terbatas)

Jika waktu sangat terbatas, bisa buat **CRUD minimal**:

1. **Halaman Admin sederhana** - hanya untuk fasilitas
2. **Form input** - tanpa drawing tools, input koordinat manual
3. **List data** - dengan tombol edit/hapus
4. **API sederhana** - langsung edit file `src/data/sample.ts` (untuk demo)

Ini masih memenuhi ketentuan "manajemen data (input/edit/hapus)" meskipun sederhana.

---

## Kesimpulan

**Rekomendasi:** **OPSI 1 (File-Based CRUD)**

**Prioritas:**
1. **Fasilitas CRUD** - paling penting, data paling sering berubah
2. **Admin page** - interface untuk CRUD
3. **API routes** - backend untuk CRUD
4. **Layer lain** - bisa ditambahkan nanti jika waktu cukup

**Estimasi Total:** 1-2 hari kerja untuk CRUD fasilitas lengkap

Apakah Anda ingin saya implementasikan OPSI 1 sekarang? Saya bisa mulai dengan:
1. Halaman admin
2. CRUD untuk fasilitas
3. API routes untuk create/update/delete

