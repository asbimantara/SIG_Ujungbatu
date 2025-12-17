# Perbedaan Sistem Admin dan Pengunjung

## 🎯 Dua Sistem Terpisah

Aplikasi ini memiliki **2 sistem yang berbeda**:

### 1. **Sistem Pengunjung (Public)**
- **Akses:** Semua orang bisa akses tanpa login
- **URL:** `/`, `/dashboard`
- **Fitur:**
  - Lihat peta interaktif
  - Toggle layer
  - Pencarian lokasi
  - Lihat detail fasilitas (popup)
  - Export data
  - Dashboard statistik
- **Tampilan:**
  - Navigation bar di atas (Peta, Dashboard)
  - Peta dengan sidebar layer
  - Dashboard publik

### 2. **Sistem Admin**
- **Akses:** Hanya admin dengan password
- **URL:** `/admin`, `/admin/facilities`, dll
- **Fitur:**
  - **Semua fitur pengunjung** +
  - CRUD fasilitas (Create, Read, Update, Delete)
  - Manajemen data
  - Form input/edit
- **Tampilan:**
  - **Tidak ada Navigation bar** (layout berbeda)
  - Header admin dengan tombol "Kembali ke Peta"
  - Navigation menu admin (Dashboard, Fasilitas)
  - Form dan table untuk CRUD

---

## 🎨 Perbedaan Tampilan

### **Sistem Pengunjung:**
```
┌─────────────────────────────────────┐
│  [Navigation: Peta | Dashboard]      │  ← Navigation bar (fixed top)
├─────────────────────────────────────┤
│  [Peta Interaktif]                   │
│  [Sidebar: Layer, Search, Export]    │
│  [Map dengan semua layer]            │
└─────────────────────────────────────┘
```
**Ciri khas:**
- ✅ Navigation bar di atas (Peta, Dashboard)
- ✅ Fokus ke peta interaktif
- ✅ Sidebar untuk layer toggle
- ✅ Tidak ada form atau table CRUD

### **Sistem Admin:**
```
┌─────────────────────────────────────┐
│  Admin Panel                        │  ← Header admin (tanpa Navigation bar)
│  [← Kembali ke Peta] [Dashboard]    │
├─────────────────────────────────────┤
│  [Dashboard | Fasilitas]            │  ← Nav admin (tab menu)
├─────────────────────────────────────┤
│  [Content: Form/Table/List]         │
│  - Form input/edit                  │
│  - Table dengan aksi                │
│  - Peta dengan drawing tools         │
└─────────────────────────────────────┘
```
**Ciri khas:**
- ❌ **TIDAK ada Navigation bar** (layout berbeda)
- ✅ Header admin dengan tombol navigasi
- ✅ Tab menu admin (Dashboard, Fasilitas)
- ✅ Form dan table untuk CRUD
- ✅ Peta dengan drawing tools untuk input koordinat

---

## 🔐 Authentication

### **Pengunjung:**
- ✅ Tidak perlu login
- ✅ Langsung akses semua fitur publik

### **Admin:**
- 🔒 **Perlu login** dengan password
- 🔒 Password default: `admin123`
- 🔒 Session disimpan di localStorage
- 🔒 Jika belum login, redirect ke halaman login

---

## 📁 Struktur Routing

```
/                          → Halaman publik (Peta)
/dashboard                 → Dashboard publik
/admin                     → Login admin (jika belum login)
/admin                     → Dashboard admin (jika sudah login)
/admin/facilities          → List fasilitas (admin)
/admin/facilities/new      → Form tambah (admin)
/admin/facilities/[id]     → Form edit (admin)
```

---

## 🎯 Fitur yang Hanya Ada di Admin

1. **CRUD Fasilitas:**
   - ✅ Tambah fasilitas baru
   - ✅ Edit fasilitas existing
   - ✅ Hapus fasilitas
   - ✅ List semua fasilitas dengan aksi

2. **Form Input:**
   - ✅ Form lengkap dengan validasi
   - ✅ Peta dengan drawing tools
   - ✅ Upload/edit foto

3. **Manajemen Data:**
   - ✅ Search & filter advanced
   - ✅ Bulk operations (future)
   - ✅ Import/Export (future)

---

## 🔄 Alur Pengguna

### **Pengunjung:**
1. Buka website → Lihat peta
2. Toggle layer → Lihat data
3. Klik fasilitas → Lihat detail
4. Export data → Download GeoJSON/CSV
5. Dashboard → Lihat statistik

### **Admin:**
1. Buka `/admin` → Login dengan password
2. Dashboard admin → Lihat statistik & quick actions
3. Kelola fasilitas → CRUD data
4. Tambah/Edit/Hapus → Update data
5. Logout → Kembali ke mode pengunjung

---

## 💡 Keuntungan 2 Sistem Terpisah

1. **Keamanan:**
   - Fitur admin tidak bisa diakses sembarangan
   - Password protection

2. **User Experience:**
   - Pengunjung: UI sederhana, fokus ke peta
   - Admin: UI lengkap dengan tools CRUD

3. **Maintainability:**
   - Kode terpisah, mudah di-maintain
   - Bisa update admin tanpa affect pengunjung

4. **Scalability:**
   - Mudah tambah fitur admin baru
   - Mudah tambah role/permission (future)

---

## 📝 Catatan Implementasi

**Saat ini:**
- ✅ Admin layout sudah terpisah
- ✅ Password protection sudah ada
- ✅ Navigation berbeda (admin tidak pakai Navigation component)
- ✅ UI admin berbeda dengan pengunjung

**Yang bisa ditambahkan nanti:**
- Role-based access (admin, editor, viewer)
- Permission per fitur
- Audit log untuk track perubahan
- Multi-user support

