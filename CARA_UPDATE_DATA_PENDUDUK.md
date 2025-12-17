# Cara Update Data Penduduk

## Lokasi File

Data penduduk ada di **2 file**:

1. **`src/components/Dashboard.tsx`** - Untuk statistik di dashboard
2. **`src/components/MapView.tsx`** - Untuk popup di peta

## Cara Update

### 1. Buka file `src/components/Dashboard.tsx`

Cari baris ini (sekitar baris 8-13):

```typescript
const populationData = {
  total: 0, // Total penduduk - UPDATE DENGAN DATA ASLI
  lakiLaki: 0, // Jumlah penduduk laki-laki - UPDATE DENGAN DATA ASLI
  perempuan: 0, // Jumlah penduduk perempuan - UPDATE DENGAN DATA ASLI
};
```

**Ganti dengan data asli Anda:**

```typescript
const populationData = {
  total: 15000, // Contoh: Total penduduk Ujungbatu
  lakiLaki: 7500, // Contoh: Jumlah laki-laki
  perempuan: 7500, // Contoh: Jumlah perempuan
};
```

### 2. Buka file `src/components/MapView.tsx`

Cari baris ini (sekitar baris 19-24):

```typescript
const populationData = {
  total: 0, // Total penduduk - UPDATE DENGAN DATA ASLI
  lakiLaki: 0, // Jumlah penduduk laki-laki - UPDATE DENGAN DATA ASLI
  perempuan: 0, // Jumlah penduduk perempuan - UPDATE DENGAN DATA ASLI
};
```

**Ganti dengan data yang sama** seperti di Dashboard.tsx:

```typescript
const populationData = {
  total: 15000, // SAMA dengan Dashboard.tsx
  lakiLaki: 7500, // SAMA dengan Dashboard.tsx
  perempuan: 7500, // SAMA dengan Dashboard.tsx
};
```

## Contoh Data

Jika data Anda:
- **Total penduduk**: 12.345 jiwa
- **Laki-laki**: 6.200 jiwa
- **Perempuan**: 6.145 jiwa

Maka update menjadi:

```typescript
const populationData = {
  total: 12345,
  lakiLaki: 6200,
  perempuan: 6145,
};
```

## Hasil Setelah Update

1. **Dashboard** (`/dashboard`) akan menampilkan:
   - Total penduduk
   - Jumlah laki-laki
   - Jumlah perempuan
   - Rasio laki-laki:perempuan

2. **Peta** - Ketika klik batas desa, popup akan menampilkan:
   - Nama desa
   - Data penduduk (total, laki-laki, perempuan)

## Catatan

- Pastikan data di **kedua file sama persis**
- Format angka menggunakan titik untuk ribuan (akan otomatis diformat)
- Jika data belum diinput (masih 0), akan muncul pesan "Data penduduk belum diinput"

## Tips

Jika Anda punya data lebih detail (misalnya per RT/RW), bisa ditambahkan nanti ketika sudah ada peta batas RT/RW.

