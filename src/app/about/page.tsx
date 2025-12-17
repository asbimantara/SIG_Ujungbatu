"use client";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(165,180,252,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(148,163,184,0.1),transparent_35%)]" />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-50 md:text-4xl">
            Tentang Aplikasi
          </h1>
          <p className="mt-3 text-slate-400">
            Sistem Informasi Geografis Desa Ujungbatu, Kecamatan Jepara
          </p>
        </div>

        {/* About App */}
        <section className="glass mb-8 rounded-2xl border border-slate-800 p-6 backdrop-blur">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
            <span className="text-2xl">🗺️</span> Tentang Aplikasi
          </h2>
          <p className="leading-relaxed text-slate-300">
            <strong>SIG Desa Ujungbatu</strong> adalah aplikasi Sistem Informasi Geografis berbasis web 
            yang menyajikan informasi spasial tentang Desa Ujungbatu, Kecamatan Jepara, Kabupaten Jepara, 
            Jawa Tengah. Aplikasi ini dikembangkan sebagai tugas akhir mata kuliah Sistem Informasi Geografis 
            untuk memvisualisasikan data geografis desa secara interaktif dan informatif.
          </p>
          <p className="mt-4 leading-relaxed text-slate-300">
            Aplikasi ini memungkinkan pengguna untuk menjelajahi peta desa, melihat berbagai layer informasi 
            seperti batas wilayah, fasilitas umum, jaringan jalan, penggunaan lahan, dan data statistik desa.
          </p>
        </section>

        {/* Features */}
        <section className="glass mb-8 rounded-2xl border border-slate-800 p-6 backdrop-blur">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
            <span className="text-2xl">✨</span> Fitur Aplikasi
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="font-semibold text-indigo-300">🗺️ Peta Interaktif</h3>
              <p className="mt-2 text-sm text-slate-400">
                Peta berbasis Leaflet dengan basemap OpenStreetMap yang dapat di-zoom, pan, dan diklik untuk melihat detail.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="font-semibold text-indigo-300">📍 Multi Layer</h3>
              <p className="mt-2 text-sm text-slate-400">
                Menampilkan berbagai layer: batas desa, bangunan, pemukiman, sungai/rawa, jalan, penggunaan lahan, dan fasilitas.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="font-semibold text-indigo-300">🏢 Data Fasilitas</h3>
              <p className="mt-2 text-sm text-slate-400">
                Informasi lengkap fasilitas umum dengan kategori: pendidikan, keagamaan, kesehatan, wisata, dan lainnya.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="font-semibold text-indigo-300">📊 Dashboard Statistik</h3>
              <p className="mt-2 text-sm text-slate-400">
                Visualisasi data statistik desa termasuk jumlah fasilitas per kategori dan penggunaan lahan.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="font-semibold text-indigo-300">🔍 Pencarian & Filter</h3>
              <p className="mt-2 text-sm text-slate-400">
                Fitur pencarian fasilitas dan filter berdasarkan kategori untuk memudahkan navigasi.
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="font-semibold text-indigo-300">📥 Export Data</h3>
              <p className="mt-2 text-sm text-slate-400">
                Ekspor data ke format GeoJSON dan CSV untuk keperluan analisis lebih lanjut.
              </p>
            </div>
          </div>
        </section>

        {/* Data Source */}
        <section className="glass mb-8 rounded-2xl border border-slate-800 p-6 backdrop-blur">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
            <span className="text-2xl">📂</span> Sumber Data
          </h2>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-400"></span>
              <span><strong>OpenStreetMap (OSM)</strong> — Data dasar peta, jalan, bangunan, dan batas wilayah</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-400"></span>
              <span><strong>Survei Lapangan</strong> — Data fasilitas umum dan titik-titik penting di Desa Ujungbatu</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-400"></span>
              <span><strong>Data Kependudukan</strong> — Data agregat penduduk Desa Ujungbatu</span>
            </li>
          </ul>
        </section>

        {/* Technology */}
        <section className="glass mb-8 rounded-2xl border border-slate-800 p-6 backdrop-blur">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
            <span className="text-2xl">⚙️</span> Teknologi
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Next.js", color: "bg-slate-700" },
              { name: "React", color: "bg-sky-600/30" },
              { name: "TypeScript", color: "bg-blue-600/30" },
              { name: "Tailwind CSS", color: "bg-cyan-600/30" },
              { name: "Leaflet", color: "bg-green-600/30" },
              { name: "GeoJSON", color: "bg-amber-600/30" },
              { name: "OpenStreetMap", color: "bg-emerald-600/30" },
            ].map((tech) => (
              <span
                key={tech.name}
                className={`rounded-full ${tech.color} border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </section>

        {/* Developer */}
        <section className="glass mb-8 rounded-2xl border border-slate-800 p-6 backdrop-blur">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
            <span className="text-2xl">👨‍💻</span> Pengembang
          </h2>
          <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
            <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
              <div className="mb-4 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white md:mb-0 md:mr-6">
                AS
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-100">Ahmad Surya Bimantara</h3>
                <p className="mt-1 text-indigo-300">NIM: 231240001384</p>
                <div className="mt-3 space-y-1 text-sm text-slate-400">
                  <p>📚 S1 Teknik Informatika</p>
                  <p>🏫 Universitas Islam Nahdlatul Ulama Jepara</p>
                  <p>📖 Mata Kuliah: Sistem Informasi Geografis</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>© 2025 SIG Desa Ujungbatu. Dibuat untuk keperluan akademik.</p>
        </div>
      </main>
    </div>
  );
}

