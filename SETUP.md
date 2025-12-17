# Setup Google Maps API Key

## Langkah-langkah Setup

### 1. Buat File `.env.local`

Buat file baru bernama `.env.local` di root project (sama level dengan `package.json`), lalu tambahkan:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 2. Dapatkan Google Maps API Key

1. Kunjungi [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
2. Login dengan akun Google Anda
3. Buat project baru atau pilih project yang sudah ada
4. Di sidebar, pilih **APIs & Services** > **Library**
5. Cari dan aktifkan **Maps JavaScript API**
6. (Opsional) Aktifkan juga **Places API** untuk fitur autocomplete yang lebih baik
7. Kembali ke **APIs & Services** > **Credentials**
8. Klik **Create Credentials** > **API Key**
9. Copy API key yang dihasilkan
10. Paste ke file `.env.local` yang sudah dibuat

### 3. Restart Dev Server

Setelah menambahkan API key, restart dev server:

```bash
# Stop server (Ctrl+C)
# Jalankan lagi
npm run dev
```

### 4. Verifikasi

Buka browser di `http://localhost:3000`. Jika setup berhasil, Anda akan melihat peta Google Maps dengan marker dan layer yang bisa di-toggle.

Jika masih muncul pesan error tentang API key, pastikan:
- File `.env.local` ada di root project
- Nama variable tepat: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Tidak ada spasi atau tanda kutip di sekitar API key
- Sudah restart dev server setelah menambahkan API key

## Catatan Penting

- **API Key Gratis**: Google Maps menyediakan $200 credit gratis per bulan, cukup untuk penggunaan development dan testing
- **Restrictions**: Untuk keamanan, batasi API key hanya untuk domain tertentu di Google Cloud Console
- **Jangan Commit**: File `.env.local` sudah ada di `.gitignore`, jangan commit API key ke repository

