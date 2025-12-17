"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { facilities } from "@/data/sample";
import { FeatureCollection, Point } from "geojson";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import toast from "react-hot-toast";

type Facility = {
  id?: string;
  name: string;
  category: string;
  alamat?: string;
  kontak?: string;
  jam?: string;
  foto_url?: string;
  coordinates: [number, number];
};

const ITEMS_PER_PAGE = 10; // Jumlah fasilitas per halaman

export default function FacilitiesPage() {
  const [facilitiesData, setFacilitiesData] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; facility: Facility | null }>({
    isOpen: false,
    facility: null,
  });

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/data?layer=facilities");
      const data: FeatureCollection<Point> = await response.json();
      
      const facilitiesList: Facility[] = data.features.map((f) => ({
        id: f.properties?.id || f.properties?.name,
        name: f.properties?.name || "",
        category: f.properties?.category || "",
        alamat: f.properties?.alamat,
        kontak: f.properties?.kontak,
        jam: f.properties?.jam,
        foto_url: f.properties?.foto_url,
        coordinates: f.geometry.coordinates as [number, number],
      }));

      // Sort dari terbaru ke terlama
      // Prioritas: 1) Sort berdasarkan timestamp di ID (jika ada), 2) Reverse array (karena data baru di-push ke akhir)
      const hasTimestamp = facilitiesList.some((f) => {
        const id = f.id || "";
        return /facility-(\d+)-/.test(id);
      });

      let sortedFacilities: Facility[];
      
      if (hasTimestamp) {
        // Jika ada data dengan timestamp, sort berdasarkan timestamp (descending = terbaru dulu)
        sortedFacilities = facilitiesList.sort((a, b) => {
          const aId = a.id || "";
          const bId = b.id || "";
          
          const aMatch = aId.match(/facility-(\d+)-/);
          const bMatch = bId.match(/facility-(\d+)-/);
          
          const aTimestamp = aMatch ? parseInt(aMatch[1]) : 0;
          const bTimestamp = bMatch ? parseInt(bMatch[1]) : 0;
          
          // Sort descending (terbaru dulu)
          return bTimestamp - aTimestamp;
        });
      } else {
        // Jika tidak ada timestamp, reverse array (karena data baru di-push ke akhir array)
        sortedFacilities = [...facilitiesList].reverse();
      }

      setFacilitiesData(sortedFacilities);
    } catch (error) {
      console.error("Error loading facilities:", error);
      toast.error("Gagal memuat data fasilitas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.facility) return;

    const facilityId = deleteConfirm.facility.id || deleteConfirm.facility.name;

    try {
      const response = await fetch(`/api/data?layer=facilities&id=${facilityId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menghapus fasilitas");
      }

      toast.success("Fasilitas berhasil dihapus!");
      setDeleteConfirm({ isOpen: false, facility: null });
      loadFacilities(); // Reload data
    } catch (error: any) {
      console.error("Error deleting facility:", error);
      toast.error(error.message || "Terjadi kesalahan saat menghapus fasilitas");
    }
  };

  const categories = Array.from(new Set(facilitiesData.map((f) => f.category))).sort();

  const filteredFacilities = facilitiesData.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.alamat?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFacilities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedFacilities = filteredFacilities.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Memuat data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100">Manajemen Fasilitas</h2>
          <p className="mt-1 text-sm text-slate-400">
            Total: {filteredFacilities.length} fasilitas
            {filteredFacilities.length !== facilitiesData.length && ` (dari ${facilitiesData.length} total)`}
          </p>
        </div>
        <Link
          href="/admin/facilities/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          + Tambah Fasilitas
        </Link>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl border border-slate-800 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="search" className="mb-2 block text-sm font-medium text-slate-300">
              Cari
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau alamat..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-300">
              Filter Kategori
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Semua Kategori</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Nama
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Kategori
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Alamat
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Koordinat
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedFacilities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                    {searchQuery || categoryFilter
                      ? "Tidak ada fasilitas yang sesuai dengan filter"
                      : "Belum ada fasilitas. Tambahkan fasilitas baru untuk memulai."}
                  </td>
                </tr>
              ) : (
                paginatedFacilities.map((facility) => (
                  <tr key={facility.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-slate-100">{facility.name}</div>
                      {facility.kontak && (
                        <div className="text-xs text-slate-500">📞 {facility.kontak}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-indigo-600/20 px-2 py-1 text-xs font-medium text-indigo-300">
                        {facility.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-xs text-sm text-slate-300 truncate">
                        {facility.alamat || "-"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-slate-400">
                        {facility.coordinates[1].toFixed(6)}, {facility.coordinates[0].toFixed(6)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/facilities/${encodeURIComponent(facility.id || facility.name)}`}
                          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:bg-slate-700"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteConfirm({ isOpen: true, facility })
                          }
                          className="rounded-lg border border-red-600/50 bg-red-600/20 px-3 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-600/30"
                        >
                          🗑️ Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="glass rounded-2xl border border-slate-800 p-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-slate-400">
              Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredFacilities.length)} dari {filteredFacilities.length} fasilitas
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ← Sebelumnya
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                          currentPage === page
                            ? "border-indigo-500 bg-indigo-600 text-white"
                            : "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 text-slate-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Hapus Fasilitas"
        message={`Apakah Anda yakin ingin menghapus "${deleteConfirm.facility?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, facility: null })}
      />
    </div>
  );
}

