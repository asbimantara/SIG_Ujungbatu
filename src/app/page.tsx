"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.2),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.1),transparent_50%)]" />
      
      {/* Animated background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-500/10 blur-3xl" style={{ animationDelay: "1s" }} />
      </div>

      <main className="relative z-10 mx-auto max-w-2xl px-6 py-12 text-center">
        {/* Logo / Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/30">
            <span className="text-5xl">🗺️</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
          Selamat Datang
        </h1>
        <h2 className="mb-3 text-xl font-semibold text-indigo-400 md:text-2xl">
          SIG Desa Ujungbatu
        </h2>
        <p className="mb-10 text-slate-400">
          Sistem Informasi Geografis Desa Ujungbatu, Kecamatan Jepara, Kabupaten Jepara
        </p>

        {/* Description */}
        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-left backdrop-blur">
          <p className="leading-relaxed text-slate-300">
            Aplikasi ini menyajikan informasi spasial tentang Desa Ujungbatu secara interaktif. 
            Jelajahi peta, lihat fasilitas umum, data penggunaan lahan, dan statistik desa.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {/* Pengunjung Button */}
          <Link
            href="/peta"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/40"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-xl">👤</span>
              Masuk sebagai Pengunjung
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          {/* Admin Button */}
          <Link
            href="/admin"
            className="group relative overflow-hidden rounded-xl border-2 border-slate-700 bg-slate-900/80 px-8 py-4 text-lg font-semibold text-slate-200 shadow-lg transition-all hover:scale-105 hover:border-slate-600 hover:bg-slate-800"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-xl">🔐</span>
              Masuk sebagai Admin
            </span>
          </Link>
        </div>

        {/* Footer info */}
        <div className="mt-16 text-sm text-slate-500">
          <p>© 2025 SIG Desa Ujungbatu</p>
          <p className="mt-1">Universitas Islam Nahdlatul Ulama Jepara</p>
        </div>
      </main>
    </div>
  );
}
