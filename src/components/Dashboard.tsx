"use client";

import { useEffect, useState, useMemo } from "react";
import { FeatureCollection, Point, MultiPolygon } from "geojson";
import area from "@turf/area";

// Data penduduk Desa Ujungbatu
const populationData = {
  total: 4977, // Total penduduk Ujungbatu
  lakiLaki: 2495, // Jumlah penduduk laki-laki
  perempuan: 2482, // Jumlah penduduk perempuan
};

export function Dashboard() {
  const [facilities, setFacilities] = useState<FeatureCollection<Point>>({ type: "FeatureCollection", features: [] });
  const [landuse, setLanduse] = useState<FeatureCollection<MultiPolygon>>({ type: "FeatureCollection", features: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [facilitiesRes, landuseRes] = await Promise.all([
          fetch("/api/data?layer=facilities"),
          fetch("/api/data/load?layer=landuse"),
        ]);

        if (facilitiesRes.ok) {
          const facilitiesData = await facilitiesRes.json();
          setFacilities(facilitiesData);
        }

        if (landuseRes.ok) {
          const landuseData = await landuseRes.json();
          setLanduse(landuseData);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const stats = useMemo(() => {
    // Fasilitas per kategori
    const facilityByCategory: Record<string, number> = {};
    facilities.features.forEach((f) => {
      const cat = f.properties?.category || "Lainnya";
      facilityByCategory[cat] = (facilityByCategory[cat] || 0) + 1;
    });

    // Luas penggunaan lahan
    const landuseByClass: Record<string, number> = {};
    landuse.features.forEach((l) => {
      const cls = l.properties?.fclass || l.properties?.class || "Lainnya";
      const luas = area(l.geometry as MultiPolygon) / 10000; // m² to ha
      landuseByClass[cls] = (landuseByClass[cls] || 0) + luas;
    });

    const totalLanduse = Object.values(landuseByClass).reduce((a, b) => a + b, 0);

    return {
      facilityByCategory,
      landuseByClass,
      totalLanduse,
      population: populationData,
    };
  }, [facilities, landuse]);

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

  const totalFacilities = facilities.features.length;
  const sortedCategories = Object.entries(stats.facilityByCategory).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCategories[0];
  const maleToFemaleRatio = stats.population.perempuan > 0 
    ? (stats.population.lakiLaki / stats.population.perempuan).toFixed(2) 
    : "0";

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Total Fasilitas */}
        <div className="glass rounded-2xl border border-slate-800 p-6 transition-all hover:border-indigo-500/50 hover:shadow-lg">
          <div className="mb-4">
            <div className="text-sm font-medium text-slate-400">Total Fasilitas</div>
          </div>
          <div className="mb-4 text-3xl font-semibold text-slate-100">
            {totalFacilities}
          </div>
          
          {/* Progress bar untuk kategori teratas */}
          {topCategory && (
            <div className="mb-3">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-slate-400">Kategori teratas</span>
                <span className="font-medium text-slate-300">{topCategory[0]}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${(topCategory[1] / totalFacilities) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* List kategori dengan hover effect */}
          <div className="max-h-[435px] space-y-1.5 overflow-y-auto text-xs">
            {sortedCategories.length > 0 ? (
              sortedCategories.map(([cat, count]) => {
                const percentage = totalFacilities > 0 ? (count / totalFacilities) * 100 : 0;
                return (
                  <div
                    key={cat}
                    className="group flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2 transition-all hover:border-indigo-500/50 hover:bg-slate-800/50"
                  >
                    <span className="text-slate-300">{cat}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full bg-indigo-500 transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-medium text-slate-100 w-8 text-right">{count}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-slate-500">Belum ada data fasilitas</div>
            )}
          </div>
        </div>

        {/* Card 2: Penggunaan Lahan */}
        <div className="glass rounded-2xl border border-slate-800 p-6 transition-all hover:border-indigo-500/50 hover:shadow-lg">
          <div className="mb-4">
            <div className="text-sm font-medium text-slate-400">Penggunaan Lahan</div>
          </div>
          <div className="mb-4 text-3xl font-semibold text-slate-100">
            {stats.totalLanduse > 0 ? stats.totalLanduse.toFixed(2) : "0.00"}{" "}
            <span className="text-sm font-normal text-slate-400">ha</span>
          </div>
          
          {stats.totalLanduse > 0 ? (
            <div className="space-y-2 text-xs">
              {Object.entries(stats.landuseByClass)
                .sort((a, b) => b[1] - a[1])
                .map(([cls, luas]) => {
                  const pct = stats.totalLanduse > 0 ? (luas / stats.totalLanduse) * 100 : 0;
                  return (
                    <div
                      key={cls}
                      className="group rounded-lg border border-slate-700/50 bg-slate-800/30 p-3 transition-all hover:border-indigo-500/50 hover:bg-slate-800/50"
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-slate-300">{cls}</span>
                        <span className="font-medium text-slate-100">{pct.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-slate-400">{luas.toFixed(2)} ha</div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-slate-500">
              Data penggunaan lahan belum tersedia
            </div>
          )}
        </div>

        {/* Card 3: Penduduk */}
        <div className="glass rounded-2xl border border-slate-800 p-6 transition-all hover:border-indigo-500/50 hover:shadow-lg">
          <div className="mb-4 text-sm font-medium text-slate-400">Penduduk</div>
          <div className="mb-4 text-3xl font-semibold text-slate-100">
            {stats.population.total > 0 ? stats.population.total.toLocaleString("id-ID") : "-"}
            <span className="text-sm font-normal text-slate-400"> jiwa</span>
          </div>
          
          {stats.population.total > 0 && (
            <div className="space-y-3">
              {/* Gender breakdown dengan progress bar */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Laki-laki</span>
                  <span className="font-medium text-slate-300">
                    {stats.population.lakiLaki.toLocaleString("id-ID")} jiwa
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${(stats.population.lakiLaki / stats.population.total) * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Perempuan</span>
                  <span className="font-medium text-slate-300">
                    {stats.population.perempuan.toLocaleString("id-ID")} jiwa
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-pink-600 transition-all duration-500"
                    style={{ width: `${(stats.population.perempuan / stats.population.total) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-slate-700/50 bg-slate-800/30 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Rasio L:P</span>
                  <span className="font-semibold text-slate-100">
                    {maleToFemaleRatio} : 1
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {stats.population.total === 0 && (
            <div className="py-4 text-center text-xs text-slate-500 italic">
              Data penduduk belum diinput
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-xl border border-slate-800 p-4 text-center transition-all hover:border-indigo-500/50">
          <div className="text-xs text-slate-400">Total Kategori</div>
          <div className="mt-1 text-xl font-semibold text-slate-100">
            {Object.keys(stats.facilityByCategory).length}
          </div>
        </div>
        <div className="glass rounded-xl border border-slate-800 p-4 text-center transition-all hover:border-indigo-500/50">
          <div className="text-xs text-slate-400">Kepadatan Penduduk</div>
          <div className="mt-1 text-xl font-semibold text-slate-100">
            {stats.population.total > 0 ? (stats.population.total / 1000).toFixed(1) : "-"}K
          </div>
        </div>
        <div className="glass rounded-xl border border-slate-800 p-4 text-center transition-all hover:border-indigo-500/50">
          <div className="text-xs text-slate-400">Kategori Terbanyak</div>
          <div className="mt-1 text-lg font-semibold text-slate-100">
            {topCategory ? topCategory[0] : "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

