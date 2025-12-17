"use client";

import dynamic from "next/dynamic";
import { ExportSection } from "@/components/ExportSection";
import { FacilityCategoryFilter } from "@/components/FacilityCategoryFilter";
import { FacilityList } from "@/components/FacilityList";
import { useState, useEffect } from "react";
import { FeatureCollection, Point } from "geojson";

// Gunakan peta Leaflet (tanpa API key), tetap ada tombol rute ke Google Maps
const Map = dynamic(() => import("../../components/MapView"), { ssr: false });

export default function PetaPage() {
  const [facilityCategories, setFacilityCategories] = useState<Record<string, boolean>>({});
  const [activeFacilities, setActiveFacilities] = useState(false);
  const [highlightLocation, setHighlightLocation] = useState<[number, number] | null>(null);
  const [highlightFacilityName, setHighlightFacilityName] = useState<string | null>(null);

  // Fungsi untuk reset highlight
  const handleResetHighlight = () => {
    setHighlightLocation(null);
    setHighlightFacilityName(null);
  };

  // Load facilities untuk mendapatkan kategori yang ada
  useEffect(() => {
    async function loadFacilities() {
      try {
        const response = await fetch("/api/data?layer=facilities");
        if (response.ok) {
          const data: FeatureCollection<Point> = await response.json();
          const categories: Record<string, boolean> = {};
          data.features.forEach((f) => {
            const category = f.properties?.category || "Fasilitas Umum";
            if (!(category in categories)) {
              categories[category] = false;
            }
          });
          setFacilityCategories(categories);
        }
      } catch (error) {
        console.error("Error loading facilities:", error);
      }
    }
    loadFacilities();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(165,180,252,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(148,163,184,0.1),transparent_35%)]" />
      
      <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-6 pb-12 md:pb-16">

        {/* Peta Interaktif */}
        <section className="glass rounded-2xl border border-slate-800 p-4 md:p-6 shadow-xl backdrop-blur" data-map-section>
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-50">Peta Interaktif</h2>
              <p className="mt-1 text-sm text-slate-400">
                Toggle layer di panel kiri, klik fitur untuk melihat detail, gunakan pencarian untuk mencari lokasi
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-400">
                Basemap: OSM Standar
              </span>
            </div>
          </div>
          <div className="relative">
            <Map
              facilityCategories={facilityCategories}
              setFacilityCategories={setFacilityCategories}
              activeFacilities={activeFacilities}
              setActiveFacilities={setActiveFacilities}
              highlightLocation={highlightLocation}
              highlightFacilityName={highlightFacilityName}
              onResetHighlight={handleResetHighlight}
            />
          </div>
          
          {/* Filter Per Kategori - Horizontal */}
          {Object.keys(facilityCategories).length > 0 && (
            <div className="mt-4">
              <FacilityCategoryFilter
                facilityCategories={facilityCategories}
                setFacilityCategories={setFacilityCategories}
                activeFacilities={activeFacilities}
                setActiveFacilities={setActiveFacilities}
                onResetHighlight={handleResetHighlight}
              />
            </div>
          )}
          
          {/* Daftar Fasilitas - Read Only */}
          <div className="mt-4">
            <FacilityList
              onShowOnMap={(coordinates, facilityName) => {
                setHighlightLocation(coordinates);
                setHighlightFacilityName(facilityName);
                // Scroll ke peta
                setTimeout(() => {
                  const mapSection = document.querySelector('[data-map-section]');
                  if (mapSection) {
                    mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
            />
          </div>
          
          {/* Export Data Section - Horizontal */}
          <div className="mt-4">
            <ExportSection />
          </div>
        </section>
      </main>
    </div>
  );
}

