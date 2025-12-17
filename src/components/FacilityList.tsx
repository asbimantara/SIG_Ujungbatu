"use client";

import { useState, useEffect } from "react";
import { FeatureCollection, Point } from "geojson";
import { LoadingSpinner } from "./ui/LoadingSpinner";

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

type FacilityListProps = {
  onShowOnMap?: (coordinates: [number, number], facilityName: string) => void;
};

export function FacilityList({ onShowOnMap }: FacilityListProps = {}) {
  const [facilitiesData, setFacilitiesData] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    } finally {
      setIsLoading(false);
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
      <div className="glass rounded-xl border border-slate-800 p-4 backdrop-blur">
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="md" />
          <span className="ml-3 text-sm text-slate-400">Memuat daftar fasilitas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl border border-slate-800 p-4 backdrop-blur">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-100">Daftar Fasilitas</h3>
        <p className="mt-1 text-xs text-slate-400">
          Total: {filteredFacilities.length} fasilitas
          {filteredFacilities.length !== facilitiesData.length && ` (dari ${facilitiesData.length} total)`}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor="facility-search" className="mb-1 block text-xs font-medium text-slate-300">
            Cari
          </label>
          <input
            type="text"
            id="facility-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau alamat..."
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="facility-category" className="mb-1 block text-xs font-medium text-slate-300">
            Filter Kategori
          </label>
          <select
            id="facility-category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Nama
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Kategori
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Alamat
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                  Kontak
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedFacilities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-xs text-slate-400">
                    {searchQuery || categoryFilter
                      ? "Tidak ada fasilitas yang sesuai dengan filter"
                      : "Belum ada fasilitas."}
                  </td>
                </tr>
              ) : (
                paginatedFacilities.map((facility) => (
                  <tr key={facility.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="text-sm font-medium text-slate-100">{facility.name}</div>
                      {facility.jam && (
                        <div className="text-xs text-slate-500">🕒 {facility.jam}</div>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex rounded-full bg-indigo-600/20 px-2 py-0.5 text-xs font-medium text-indigo-300">
                        {facility.category}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="max-w-xs text-xs text-slate-300 truncate">
                        {facility.alamat || "-"}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="text-xs text-slate-400">
                        {facility.kontak || "-"}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      {onShowOnMap && (
                        <button
                          onClick={() => {
                            // Koordinat dalam format [lng, lat] dari GeoJSON, perlu diubah ke [lat, lng] untuk Leaflet
                            const latLng: [number, number] = [facility.coordinates[1], facility.coordinates[0]];
                            onShowOnMap(latLng, facility.name);
                          }}
                          className="rounded-lg border border-indigo-500 bg-indigo-600/20 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-600/30 hover:text-indigo-200"
                        >
                          📍 Tunjukkan di Peta
                        </button>
                      )}
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
        <div className="mt-4 flex flex-col items-center justify-between gap-3 md:flex-row">
          <div className="text-xs text-slate-400">
            Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredFacilities.length)} dari {filteredFacilities.length} fasilitas
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                      className={`rounded-lg border px-2.5 py-1.5 text-xs transition-colors ${
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
                    <span key={page} className="px-1 text-xs text-slate-400">
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
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Selanjutnya →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

