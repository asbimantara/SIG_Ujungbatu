"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FeatureCollection, Point } from "geojson";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalFacilities: 0,
    byCategory: {} as Record<string, number>,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadFacilities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/data?layer=facilities");
      if (!response.ok) {
        throw new Error("Gagal memuat data fasilitas");
      }
      const data: FeatureCollection<Point> = await response.json();
      
      // Calculate stats
      const total = data.features.length;
      const byCategory: Record<string, number> = {};
      
      data.features.forEach((f) => {
        const cat = f.properties?.category || "Lainnya";
        byCategory[cat] = (byCategory[cat] || 0) + 1;
      });

      setStats({ totalFacilities: total, byCategory });
    } catch (error) {
      console.error("Error loading facilities:", error);
      // Set default empty stats on error
      setStats({ totalFacilities: 0, byCategory: {} });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFacilities();
  }, []);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-400"></div>
          <p className="mt-4 text-sm text-slate-400">Memuat data...</p>
        </div>
      </div>
    );
  }

  const topCategory = Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])[0];
  const topCategoryName = topCategory?.[0] || "-";
  const topCategoryCount = topCategory?.[1] || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-slate-100">Dashboard Admin</h2>
        <p className="mt-1 text-sm text-slate-400">Ringkasan dan quick actions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass rounded-2xl border border-slate-800 p-6">
          <div className="text-sm text-slate-400">Total Fasilitas</div>
          <div className="mt-2 text-3xl font-semibold text-slate-100">
            {stats.totalFacilities}
          </div>
          <div className="mt-2 text-xs text-slate-500">Data terdaftar</div>
        </div>

        <div className="glass rounded-2xl border border-slate-800 p-6">
          <div className="text-sm text-slate-400">Kategori Terbanyak</div>
          <div className="mt-2 text-3xl font-semibold text-slate-100">
            {topCategoryName}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {topCategoryCount} fasilitas
          </div>
        </div>

        <div className="glass rounded-2xl border border-slate-800 p-6">
          <div className="text-sm text-slate-400">Total Kategori</div>
          <div className="mt-2 text-3xl font-semibold text-slate-100">
            {Object.keys(stats.byCategory).length}
          </div>
          <div className="mt-2 text-xs text-slate-500">Jenis kategori</div>
        </div>

        <div className="glass rounded-2xl border border-slate-800 p-6">
          <div className="text-sm text-slate-400">Quick Actions</div>
          <div className="mt-4">
            <Link
              href="/admin/facilities/new"
              className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              + Tambah Fasilitas
            </Link>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="glass rounded-2xl border border-slate-800 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">Fasilitas per Kategori</h3>
          <button
            onClick={loadFacilities}
            disabled={isLoading}
            className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:bg-slate-800 disabled:opacity-50"
            title="Refresh data"
          >
            🔄 Refresh
          </button>
        </div>
        <div className="space-y-2">
          {Object.keys(stats.byCategory).length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400">
              Belum ada data fasilitas
            </div>
          ) : (
            Object.entries(stats.byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([category, count]) => (
                <div key={category} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2">
                  <span className="text-sm text-slate-200">{category}</span>
                  <span className="text-sm font-medium text-slate-100">{count}</span>
                </div>
              ))
          )}
        </div>
      </div>

    </div>
  );
}

