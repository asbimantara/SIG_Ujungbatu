import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(165,180,252,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(148,163,184,0.1),transparent_35%)]" />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 pt-6 pb-12 md:pb-16">
        <header className="glass rounded-3xl border border-slate-800 px-6 py-6 shadow-2xl backdrop-blur md:px-10">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">Dashboard Statistik</h1>
            <p className="mt-2 text-slate-300">Ringkasan data spasial Desa Ujungbatu</p>
          </div>
        </header>

        <section className="glass rounded-2xl border border-slate-800 p-6 md:p-8">
          <Dashboard />
        </section>
      </main>
    </div>
  );
}

