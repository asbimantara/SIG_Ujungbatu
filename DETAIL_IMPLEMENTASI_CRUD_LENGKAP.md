# Detail Lengkap Implementasi CRUD

## 🎯 Fitur Lengkap yang Akan Dibuat

### 1. **Halaman Admin** (`/admin`)

**Fitur:**
- ✅ **Password Protection** (sederhana)
  - Password: "admin123" (bisa diubah)
  - Atau tanpa password untuk demo (opsional)
  
- ✅ **Dashboard Admin**
  - Statistik cepat: jumlah fasilitas, dll
  - Quick actions: tambah fasilitas baru
  
- ✅ **Navigation Menu**
  - Link ke halaman utama
  - Link ke dashboard publik
  - Logout (jika pakai password)

**File:** `src/app/admin/page.tsx`

---

### 2. **CRUD Fasilitas** (Prioritas Utama)

#### A. **Create (Tambah Fasilitas Baru)**

**Fitur:**
- ✅ **Form Input Lengkap:**
  - Nama fasilitas (required)
  - Kategori (dropdown: Pendidikan, Keagamaan, Kesehatan, Belanja, dll)
  - Alamat (optional)
  - Kontak (optional)
  - Jam operasional (optional)
  - Upload foto (optional) - simpan ke `public/gambar/`
  
- ✅ **Peta Interaktif untuk Koordinat:**
  - Peta Leaflet dengan drawing tools
  - User klik di peta → koordinat otomatis terisi
  - Atau input manual: latitude & longitude
  - Preview marker di peta saat input
  
- ✅ **Validasi:**
  - Nama wajib diisi
  - Kategori wajib dipilih
  - Koordinat wajib (dari klik peta atau input manual)
  
- ✅ **Preview:**
  - Preview data sebelum submit
  - Preview di peta

**File:** `src/components/admin/FacilityForm.tsx`

#### B. **Read (Lihat Daftar Fasilitas)**

**Fitur:**
- ✅ **Table/List Fasilitas:**
  - Nama, kategori, alamat
  - Thumbnail foto (jika ada)
  - Koordinat (lat, lng)
  - Aksi: Edit, Hapus, Lihat di Peta
  
- ✅ **Filter & Search:**
  - Filter berdasarkan kategori
  - Search berdasarkan nama
  - Sort: nama, kategori, tanggal dibuat
  
- ✅ **Pagination:**
  - Jika data banyak, pagination
  - Show per page: 10, 25, 50
  
- ✅ **Preview di Peta:**
  - Klik "Lihat di Peta" → peta fokus ke lokasi
  - Highlight marker

**File:** `src/components/admin/FacilityList.tsx`

#### C. **Update (Edit Fasilitas)**

**Fitur:**
- ✅ **Form Edit:**
  - Form sama seperti Create
  - Pre-filled dengan data existing
  - Bisa ubah semua field termasuk koordinat
  
- ✅ **Update Koordinat:**
  - Drag marker di peta untuk ubah lokasi
  - Atau input manual koordinat baru
  
- ✅ **Update Foto:**
  - Hapus foto lama (opsional)
  - Upload foto baru
  
- ✅ **Validasi:**
  - Sama seperti Create

**File:** `src/components/admin/FacilityForm.tsx` (reusable untuk Create & Update)

#### D. **Delete (Hapus Fasilitas)**

**Fitur:**
- ✅ **Konfirmasi Dialog:**
  - "Apakah Anda yakin ingin menghapus [Nama Fasilitas]?"
  - Tombol: Batal, Hapus
  
- ✅ **Soft Delete (Opsional):**
  - Tandai sebagai deleted, tidak benar-benar hapus
  - Atau hard delete langsung
  
- ✅ **Feedback:**
  - Notifikasi sukses setelah hapus
  - Auto refresh list

**File:** `src/components/admin/FacilityList.tsx` (dalam component)

---

### 3. **Peta Admin dengan Drawing Tools**

**Fitur:**
- ✅ **Peta Interaktif:**
  - Leaflet dengan basemap OSM
  - Semua layer bisa ditoggle
  
- ✅ **Drawing Tools:**
  - Untuk input koordinat fasilitas baru
  - Marker bisa di-drag untuk edit koordinat
  - Click di peta → set koordinat
  
- ✅ **Preview:**
  - Preview semua fasilitas
  - Highlight fasilitas yang sedang diedit

**File:** `src/components/admin/AdminMapView.tsx`

---

### 4. **API Routes untuk CRUD**

#### A. **POST /api/data** - Create

**Request:**
```json
{
  "layer": "facilities",
  "data": {
    "name": "Nama Fasilitas",
    "category": "Pendidikan",
    "coordinates": [110.65, -6.58],
    "alamat": "...",
    "kontak": "...",
    "jam": "...",
    "foto_url": "/gambar/..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Fasilitas berhasil ditambahkan",
  "id": "new-id"
}
```

#### B. **PUT /api/data** - Update

**Request:**
```json
{
  "layer": "facilities",
  "id": "facility-id",
  "data": {
    "name": "Nama Baru",
    ...
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Fasilitas berhasil diupdate"
}
```

#### C. **DELETE /api/data** - Delete

**Request:**
```
DELETE /api/data?layer=facilities&id=facility-id
```

**Response:**
```json
{
  "success": true,
  "message": "Fasilitas berhasil dihapus"
}
```

**File:** `src/app/api/data/route.ts` (update existing)

---

### 5. **File Management**

**Fitur:**
- ✅ **Baca/Tulis GeoJSON:**
  - Baca dari `src/data/sample.ts` (untuk facilities)
  - Atau baca dari file GeoJSON (untuk layer lain)
  - Write kembali setelah CRUD
  
- ✅ **Backup Otomatis:**
  - Backup file sebelum edit/delete
  - Simpan di `public/backup/` dengan timestamp
  
- ✅ **Validasi Data:**
  - Validasi format GeoJSON
  - Validasi koordinat (dalam batas desa)
  - Validasi required fields

**File:** `src/lib/geojson-utils.ts`

---

### 6. **UI/UX Admin**

**Fitur:**
- ✅ **Dark Theme:**
  - Konsisten dengan tema aplikasi
  - Glass effect, slate colors
  
- ✅ **Responsive:**
  - Mobile-friendly
  - Tablet-friendly
  
- ✅ **Loading States:**
  - Loading saat submit form
  - Loading saat load data
  
- ✅ **Error Handling:**
  - Error messages yang jelas
  - Validation errors
  - Network errors
  
- ✅ **Success Feedback:**
  - Toast notifications
  - Success messages
  - Auto refresh setelah CRUD

**File:** `src/components/admin/` (semua component admin)

---

## 📁 Struktur File yang Akan Dibuat

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx                    # Halaman admin utama
│   │   ├── facilities/
│   │   │   ├── page.tsx                # List fasilitas
│   │   │   ├── new/
│   │   │   │   └── page.tsx           # Form tambah baru
│   │   │   └── [id]/
│   │   │       └── page.tsx           # Form edit
│   │   └── layout.tsx                  # Layout admin (password check)
│   └── api/
│       └── data/
│           └── route.ts                # Update untuk POST/PUT/DELETE
├── components/
│   ├── admin/
│   │   ├── AdminMapView.tsx            # Peta dengan drawing tools
│   │   ├── FacilityForm.tsx            # Form create/edit
│   │   ├── FacilityList.tsx             # List dengan table
│   │   ├── FacilityCard.tsx             # Card untuk preview
│   │   └── AdminLayout.tsx              # Layout admin
│   └── ui/
│       ├── Toast.tsx                   # Toast notifications
│       ├── ConfirmDialog.tsx           # Dialog konfirmasi
│       └── LoadingSpinner.tsx          # Loading indicator
└── lib/
    ├── geojson-utils.ts                 # Helper baca/tulis GeoJSON
    ├── validation.ts                    # Validasi form
    └── admin-auth.ts                    # Simple password check
```

---

## 🎨 Mockup UI Admin

### Halaman Admin Utama
```
┌─────────────────────────────────────┐
│  Admin Panel - SIG Ujungbatu       │
├─────────────────────────────────────┤
│  [Dashboard] [Fasilitas] [Logout]  │
├─────────────────────────────────────┤
│                                     │
│  📊 Statistik Cepat                 │
│  ┌─────────┐ ┌─────────┐           │
│  │ Total   │ │ Baru    │           │
│  │ 43      │ │ Hari    │           │
│  └─────────┘ └─────────┘           │
│                                     │
│  ⚡ Quick Actions                   │
│  [+ Tambah Fasilitas Baru]          │
│                                     │
└─────────────────────────────────────┘
```

### Halaman List Fasilitas
```
┌─────────────────────────────────────┐
│  Manajemen Fasilitas                │
├─────────────────────────────────────┤
│  [Search...] [Filter: All ▼]        │
│  [+ Tambah Baru]                    │
├─────────────────────────────────────┤
│  Nama          │ Kategori │ Aksi   │
│  ──────────────────────────────── │
│  TPI Ujungbatu │ Belanja  │ [✏️][🗑]│
│  Kampus 2...   │ Pendidikan│[✏️][🗑]│
│  ...           │ ...      │ ...    │
└─────────────────────────────────────┘
```

### Form Tambah/Edit Fasilitas
```
┌─────────────────────────────────────┐
│  Tambah Fasilitas Baru              │
├─────────────────────────────────────┤
│  Nama: [________________]           │
│  Kategori: [Dropdown ▼]             │
│  Alamat: [________________]         │
│  Kontak: [________________]         │
│  Jam: [________________]            │
│  Foto: [Choose File]                │
│                                     │
│  📍 Koordinat                       │
│  [Peta dengan marker]               │
│  Lat: [-6.58] Lng: [110.65]        │
│  (Klik di peta untuk set koordinat) │
│                                     │
│  [Batal] [Simpan]                   │
└─────────────────────────────────────┘
```

---

## ⚙️ Teknologi yang Digunakan

- **React Hook Form** - Form management
- **Leaflet Draw** - Drawing tools di peta
- **Zod** - Validation schema
- **React Hot Toast** - Toast notifications
- **File System (fs)** - Baca/tulis GeoJSON files

---

## 📋 Checklist Implementasi

### Phase 1: Setup (2-3 jam)
- [ ] Buat folder structure
- [ ] Setup admin layout dengan password
- [ ] Buat halaman admin utama
- [ ] Setup API routes structure

### Phase 2: CRUD Fasilitas - Create (4-5 jam)
- [ ] Form input fasilitas
- [ ] Peta dengan drawing tools
- [ ] Validasi form
- [ ] API POST untuk create
- [ ] File write untuk simpan data

### Phase 3: CRUD Fasilitas - Read (2-3 jam)
- [ ] List fasilitas dengan table
- [ ] Filter & search
- [ ] Preview di peta
- [ ] Pagination (jika perlu)

### Phase 4: CRUD Fasilitas - Update (3-4 jam)
- [ ] Form edit (reuse form create)
- [ ] Load data existing
- [ ] Update koordinat di peta
- [ ] API PUT untuk update
- [ ] File update

### Phase 5: CRUD Fasilitas - Delete (1-2 jam)
- [ ] Konfirmasi dialog
- [ ] API DELETE
- [ ] File update
- [ ] Feedback & refresh

### Phase 6: Polish (2-3 jam)
- [ ] Error handling
- [ ] Loading states
- [ ] Toast notifications
- [ ] Responsive design
- [ ] Testing

**Total Estimasi: 15-20 jam kerja (2-3 hari)**

---

## 🎯 Hasil Akhir

Setelah implementasi lengkap, Anda akan punya:

1. ✅ **Halaman Admin** yang fungsional
2. ✅ **CRUD Lengkap** untuk fasilitas:
   - Create dengan form + peta
   - Read dengan list + search
   - Update dengan form edit
   - Delete dengan konfirmasi
3. ✅ **API Routes** untuk semua operasi CRUD
4. ✅ **File Management** untuk simpan data
5. ✅ **UI/UX** yang konsisten dengan aplikasi

**Ini akan memenuhi 100% ketentuan "Manajemen Data (Input/Edit/Hapus)" dari dosen!**

---

Apakah Anda ingin saya mulai implementasi sekarang? Saya bisa mulai dari Phase 1 (Setup) dan lanjut bertahap.

