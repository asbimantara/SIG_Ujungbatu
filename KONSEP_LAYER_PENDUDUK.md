# Konsep Layer Penduduk untuk SIG Desa Ujungbatu

## Apa itu Layer Penduduk?

Layer penduduk adalah layer yang menampilkan **data populasi/penduduk** di peta, biasanya dibagi per **RT (Rukun Tetangga)** atau **RW (Rukun Warga)**.

## Bentuk Visualisasi

### 1. **Polygon dengan Warna Berdasarkan Kepadatan** (Paling Umum)
- Setiap RT/RW ditampilkan sebagai **polygon** (area)
- Warna polygon berbeda berdasarkan jumlah/kepadatan penduduk
- Contoh:
  - Hijau muda = penduduk sedikit (< 100 jiwa)
  - Kuning = penduduk sedang (100-300 jiwa)
  - Orange = penduduk banyak (300-500 jiwa)
  - Merah = penduduk sangat padat (> 500 jiwa)

### 2. **Polygon dengan Label Jumlah**
- Polygon RT/RW dengan **label teks** menampilkan jumlah penduduk
- Contoh: "RT 01: 245 jiwa"

### 3. **Point dengan Ukuran Berdasarkan Jumlah**
- Titik di tengah RT/RW
- Ukuran titik sesuai jumlah penduduk
- Semakin besar titik = semakin banyak penduduk

## Struktur Data GeoJSON

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "rt": "01",
        "rw": "01",
        "nama": "RT 01 / RW 01",
        "jumlah_penduduk": 245,
        "jumlah_kk": 65,
        "kepadatan": "sedang",
        "luas_ha": 2.5
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[110.65, -6.58], [110.66, -6.58], ...]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "rt": "02",
        "rw": "01",
        "nama": "RT 02 / RW 01",
        "jumlah_penduduk": 312,
        "jumlah_kk": 78,
        "kepadatan": "padat",
        "luas_ha": 2.1
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[110.66, -6.58], [110.67, -6.58], ...]]
      }
    }
  ]
}
```

## Informasi yang Ditampilkan di Popup

Ketika user klik polygon RT/RW, popup menampilkan:
- **RT/RW**: RT 01 / RW 01
- **Jumlah Penduduk**: 245 jiwa
- **Jumlah KK**: 65 kepala keluarga
- **Kepadatan**: Sedang
- **Luas Area**: 2.5 ha
- **Kepadatan per ha**: 98 jiwa/ha

## Contoh Implementasi

### Opsi 1: Integrasi ke Layer Boundary
- Tambahkan atribut `jumlah_penduduk` ke layer boundary yang sudah ada
- Jika boundary sudah dibagi per RT/RW, cukup tambahkan data penduduk

### Opsi 2: Layer Terpisah
- Buat layer baru `population` atau `penduduk`
- File GeoJSON terpisah: `penduduk_ujungbatu.geojson`
- Toggle on/off seperti layer lainnya

## Visualisasi di Peta

```typescript
// Warna berdasarkan jumlah penduduk
const getPopulationColor = (jumlah: number) => {
  if (jumlah < 100) return "#10b981";      // Hijau (sedikit)
  if (jumlah < 300) return "#fbbf24";     // Kuning (sedang)
  if (jumlah < 500) return "#f97316";     // Orange (banyak)
  return "#ef4444";                        // Merah (sangat padat)
};

// Atau berdasarkan kepadatan per hektar
const getDensityColor = (kepadatan: number) => {
  if (kepadatan < 50) return "#10b981";
  if (kepadatan < 100) return "#fbbf24";
  if (kepadatan < 200) return "#f97316";
  return "#ef4444";
};
```

## Data yang Diperlukan

Untuk membuat layer penduduk, Anda perlu:
1. **Peta batas RT/RW** (polygon) - bisa dari QGIS atau digitasi manual
2. **Data penduduk per RT/RW** - dari data kependudukan desa
   - Jumlah penduduk
   - Jumlah kepala keluarga (KK)
   - (Opsional) Jumlah laki-laki, perempuan
   - (Opsional) Usia, pekerjaan, dll

## Sumber Data

1. **Data Kependudukan Desa**
   - Dari kantor kelurahan/desa
   - Data sensus atau registrasi penduduk
   - Bisa minta ke RT/RW setempat

2. **Peta RT/RW**
   - Dari QGIS (jika sudah ada)
   - Atau digitasi manual dari citra satelit
   - Atau dari peta administrasi desa

## Contoh Tampilan di Dashboard

Layer penduduk juga bisa ditampilkan di dashboard:
- Total penduduk desa
- Jumlah RT/RW
- Kepadatan penduduk rata-rata
- Grafik distribusi penduduk per RT/RW

## Rekomendasi untuk Ujungbatu

**Opsi Terbaik:**
1. Buat layer terpisah `penduduk` dengan polygon per RT/RW
2. Warna polygon berdasarkan jumlah penduduk
3. Popup menampilkan detail lengkap
4. Tampilkan di dashboard statistik

**File yang perlu dibuat:**
- `public/data/penduduk_ujungbatu.geojson` - Data GeoJSON
- Update `src/data/sample.ts` - Tambah export `population`
- Update `src/components/MapView.tsx` - Tambah layer penduduk
- Update `src/components/Dashboard.tsx` - Tambah statistik penduduk

Apakah Anda sudah punya data penduduk per RT/RW? Jika sudah, saya bisa bantu implementasinya!

