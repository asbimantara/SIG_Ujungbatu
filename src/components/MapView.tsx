"use client";

import "leaflet/dist/leaflet.css";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { boundary, buildings, settlement, water, facilities, landuse, layerOrder, roads } from "@/data/sample";
import { GeoJsonObject, FeatureCollection, MultiPolygon, MultiLineString, Point } from "geojson";

// Data penduduk Desa Ujungbatu
const populationData = {
  total: 4977, // Total penduduk Ujungbatu
  lakiLaki: 2495, // Jumlah penduduk laki-laki
  perempuan: 2482, // Jumlah penduduk perempuan
};

const palette = {
  boundary: "#1f2937",
  buildings: "#64748b",
  settlement: "#f59e0b",
  water: "#3b82f6",
  landuse: "#93c5fd",
  landuseAlt: "#60a5fa",
  roadsGood: "#2563eb",
  roadsMed: "#f59e0b",
  roadsBad: "#ef4444",
  facility: "#7c3aed",
};

// OSM Standar - sama dengan yang digunakan di QGIS
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileAttr =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Fix default marker icons on Next.js/Leaflet
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = icon;

const layerNames: Record<(typeof layerOrder)[number], string> = {
  boundary: "Batas Desa",
  buildings: "Bangunan",
  settlement: "Pemukiman",
  water: "Sungai/Rawa",
  roads: "Jalan",
  landuse: "Penggunaan Lahan",
  facilities: "Fasilitas",
};

function MapController({ location, zoom = 17 }: { location: [number, number] | null; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, zoom, { animate: true, duration: 0.5 });
    }
  }, [location, zoom, map]);
  return null;
}

// Komponen untuk Marker yang bisa di-highlight dan buka popup secara programmatic
function HighlightableMarker({
  facility,
  getFacilityIcon,
  isHighlighted,
}: {
  facility: any;
  getFacilityIcon: (category: string) => L.DivIcon;
  isHighlighted: boolean;
}) {
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (isHighlighted && markerRef.current) {
      // Buka popup dengan delay kecil untuk memastikan marker sudah ter-render
      setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 300);
    }
  }, [isHighlighted]);

  return (
    <Marker
      ref={markerRef}
      key={facility.properties?.name}
      position={[facility.geometry.coordinates[1], facility.geometry.coordinates[0]]}
      icon={getFacilityIcon(facility.properties?.category || "")}
      eventHandlers={{
        add: (e) => {
          markerRef.current = e.target;
        },
      }}
    >
      <Popup>
        <div className="text-sm">
          <div className="font-semibold">{facility.properties?.name}</div>
          <div className="text-slate-500">{facility.properties?.category}</div>
          {facility.properties?.info && <div className="mt-1 text-slate-400">{facility.properties?.info}</div>}
          {facility.properties?.foto_url && (
            <div className="mt-2">
              <img
                src={facility.properties.foto_url}
                alt={facility.properties?.name || "Gambar fasilitas"}
                className="w-full rounded-lg border border-slate-700"
                style={{ maxWidth: "300px", maxHeight: "200px", objectFit: "cover" }}
              />
            </div>
          )}
          {facility.properties?.alamat && (
            <div className="mt-2 text-xs text-slate-500">📍 {facility.properties.alamat}</div>
          )}
          {facility.properties?.kontak && facility.properties.kontak !== "-" && (
            <div className="mt-1 text-xs text-slate-500">☎ {facility.properties.kontak}</div>
          )}
          {facility.properties?.jam && <div className="mt-1 text-xs text-slate-500">🕒 {facility.properties.jam}</div>}
          <div className="mt-3 flex gap-2 text-xs">
            <a
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-slate-100 hover:bg-slate-700"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${facility.geometry.coordinates[1]},${facility.geometry.coordinates[0]}`}
            >
              Buka di Google Maps
            </a>
            <a
              className="rounded-lg border border-indigo-500 bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/dir/?api=1&destination=${facility.geometry.coordinates[1]},${facility.geometry.coordinates[0]}`}
            >
              Rute
            </a>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

type MapViewProps = {
  facilityCategories?: Record<string, boolean>;
  setFacilityCategories?: (categories: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  activeFacilities?: boolean;
  setActiveFacilities?: (active: boolean) => void;
  highlightLocation?: [number, number] | null;
  highlightFacilityName?: string | null;
  onResetHighlight?: () => void;
};

export function MapView({
  facilityCategories: externalFacilityCategories,
  setFacilityCategories: externalSetFacilityCategories,
  activeFacilities: externalActiveFacilities,
  setActiveFacilities: externalSetActiveFacilities,
  highlightLocation,
  highlightFacilityName,
  onResetHighlight,
}: MapViewProps = {}) {
  const [active, setActive] = useState<Record<string, boolean>>({
    boundary: true,
    buildings: false,
    settlement: false,
    water: false,
    roads: false,
    landuse: false,
    facilities: false,
  });
  const [searchLocation, setSearchLocation] = useState<[number, number] | null>(null);
  
  // State untuk warning message (untuk checkbox di sidebar)
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [warningCategory, setWarningCategory] = useState<string | null>(null);
  
  // State untuk kategori fasilitas - gunakan external jika ada, jika tidak gunakan internal
  const [internalFacilityCategories, setInternalFacilityCategories] = useState<Record<string, boolean>>({
    Pendidikan: false,
    Keagamaan: false,
    Kesehatan: false,
    Belanja: false,
    Olahraga: false,
    Pemerintahan: false,
    Rekreasi: false,
    Wisata: false,
    Jasa: false,
    Akomodasi: false,
    Infrastruktur: false,
    Kuliner: false,
    Makam: false,
    "Fasilitas Umum": false,
  });

  const facilityCategories = externalFacilityCategories || internalFacilityCategories;
  const setFacilityCategories = externalSetFacilityCategories || setInternalFacilityCategories;
  const activeFacilities = externalActiveFacilities !== undefined ? externalActiveFacilities : active.facilities;
  
  const handleSetActiveFacilities = (value: boolean) => {
    if (externalSetActiveFacilities) {
      externalSetActiveFacilities(value);
    } else {
      setActive((prev) => ({ ...prev, facilities: value }));
    }
  };
  
  // Effect untuk handle highlight location dari FacilityList
  useEffect(() => {
    if (highlightLocation) {
      // Set search location untuk zoom ke lokasi (tanpa mengaktifkan semua fasilitas)
      setSearchLocation(highlightLocation);
    }
  }, [highlightLocation]);
  
  // State untuk data yang di-load via API
  const [loadedBoundary, setLoadedBoundary] = useState<FeatureCollection<MultiPolygon>>(boundary);
  const [loadedBuildings, setLoadedBuildings] = useState<FeatureCollection<MultiPolygon>>(buildings);
  const [loadedSettlement, setLoadedSettlement] = useState<FeatureCollection<MultiPolygon>>(settlement);
  const [loadedWater, setLoadedWater] = useState<FeatureCollection<MultiPolygon>>(water);
  const [loadedRoads, setLoadedRoads] = useState<FeatureCollection<MultiLineString>>(roads);
  const [loadedLanduse, setLoadedLanduse] = useState<FeatureCollection<MultiPolygon>>(landuse);
  const [loadedFacilities, setLoadedFacilities] = useState<FeatureCollection<Point>>(facilities);

  // Load data via API saat component mount
  useEffect(() => {
    async function loadData() {
      try {
        // Load boundary FIRST (prioritas tinggi karena default aktif)
        const boundaryRes = await fetch("/api/data/load?layer=boundary");
        if (boundaryRes.ok) {
          const boundaryData = await boundaryRes.json();
          setLoadedBoundary(boundaryData);
        }
        
        // Load other layers in parallel
        const [buildingsRes, settlementRes, waterRes, roadsRes, landuseRes, facilitiesRes] = await Promise.all([
          fetch("/api/data/load?layer=buildings"),
          fetch("/api/data/load?layer=settlement"),
          fetch("/api/data/load?layer=water"),
          fetch("/api/data/load?layer=roads"),
          fetch("/api/data/load?layer=landuse"),
          fetch("/api/data?layer=facilities"), // Load facilities dari API
        ]);
        
        if (buildingsRes.ok) {
          const buildingsData = await buildingsRes.json();
          setLoadedBuildings(buildingsData);
        }
        
        if (settlementRes.ok) {
          const settlementData = await settlementRes.json();
          setLoadedSettlement(settlementData);
        }
        
        if (waterRes.ok) {
          const waterData = await waterRes.json();
          setLoadedWater(waterData);
        }
        
        if (roadsRes.ok) {
          const roadsData = await roadsRes.json();
          setLoadedRoads(roadsData);
        }
        
        if (landuseRes.ok) {
          const landuseData = await landuseRes.json();
          setLoadedLanduse(landuseData);
        }
        
        if (facilitiesRes.ok) {
          const facilitiesData = await facilitiesRes.json();
          setLoadedFacilities(facilitiesData);
        }
      } catch (error) {
        console.error("Error loading GeoJSON data:", error);
      }
    }
    
    loadData();
  }, []);

  // Pusatkan ke tengah antara Ujungbatu dan Pulau Panjang agar keduanya terlihat
  // Ujungbatu: ~110.6589, -6.5821 | Pulau Panjang: ~110.627, -6.575
  // Center: tengah-tengah antara keduanya
  const center: [number, number] = useMemo(() => [-6.5810, 110.648], []);

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="glass rounded-2xl p-4 text-sm text-slate-200 overflow-visible">
        <div className="mb-3 text-base font-semibold text-slate-100">Layer</div>
        <div className="space-y-2">
          {layerOrder.map((key) => {
            // Untuk checkbox "Fasilitas", tambahkan logika disable jika ada kategori yang terceklis
            const isFacilitiesDisabled = key === "facilities" && Object.values(facilityCategories).some((checked) => checked);
            
            return (
              <div key={key} className="relative">
                <label
                  className={`flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 ${isFacilitiesDisabled ? "opacity-60" : "cursor-pointer"}`}
                >
                  <span>{layerNames[key]}</span>
                  <div 
                    className="relative"
                    onClick={(e) => {
                      // Jika checkbox disabled dan user klik, tampilkan warning
                      if (key === "facilities" && isFacilitiesDisabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        setWarningCategory(null);
                        setWarningMessage("Tolong unceklis perkategorinya terlebih dahulu");
                        setTimeout(() => {
                          setWarningMessage(null);
                          setWarningCategory(null);
                        }, 3000);
                      }
                    }}
                    onPointerDown={(e) => {
                      // PointerDown lebih reliable untuk disabled elements
                      if (key === "facilities" && isFacilitiesDisabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        setWarningCategory(null);
                        setWarningMessage("Tolong unceklis perkategorinya terlebih dahulu");
                        setTimeout(() => {
                          setWarningMessage(null);
                          setWarningCategory(null);
                        }, 3000);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      className={`h-4 w-4 accent-indigo-400 ${isFacilitiesDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                      checked={key === "facilities" ? activeFacilities : active[key]}
                      disabled={isFacilitiesDisabled}
                      onChange={(e) => {
                        const newValue = e.target.checked;
                        
                        // Jika user mencoba mengeklik "Fasilitas" padahal ada kategori yang terceklis
                        if (key === "facilities" && newValue && Object.values(facilityCategories).some((checked) => checked)) {
                          setWarningCategory(null);
                          setWarningMessage("Tolong unceklis perkategorinya terlebih dahulu");
                          setTimeout(() => {
                            setWarningMessage(null);
                            setWarningCategory(null);
                          }, 3000);
                          e.preventDefault();
                          return;
                        }
                        
                        setWarningMessage(null);
                        setWarningCategory(null);
                        
                        // Reset highlight ketika checkbox diubah
                        if (onResetHighlight) {
                          onResetHighlight();
                        }
                        
                        // Jika facilities, gunakan handleSetActiveFacilities
                        if (key === "facilities") {
                          handleSetActiveFacilities(newValue);
                          if (newValue) {
                            // Facilities di-check, uncheck semua kategori
                            setFacilityCategories((prev) => {
                              const reset: Record<string, boolean> = {};
                              Object.keys(prev).forEach((cat) => {
                                reset[cat] = false;
                              });
                              return reset;
                            });
                          } else {
                            // Facilities di-uncheck, reset semua kategori
                            setFacilityCategories((prev) => {
                              const reset: Record<string, boolean> = {};
                              Object.keys(prev).forEach((cat) => {
                                reset[cat] = false;
                              });
                              return reset;
                            });
                          }
                        } else {
                          setActive((prev) => ({ ...prev, [key]: newValue }));
                        }
                      }}
                    />
                  </div>
                </label>
                {key === "facilities" && warningMessage && warningMessage.includes("Tolong unceklis") && !warningCategory && (
                  <div className="absolute right-0 top-full mt-1 z-[100] rounded-lg bg-red-600 text-white text-xs px-2 py-1.5 shadow-xl whitespace-nowrap border border-red-700 opacity-100">
                    {warningMessage}
                    <div className="absolute -top-1 right-4 w-2 h-2 bg-red-600 rotate-45 border-l border-t border-red-700"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Legenda Warna */}
        <div className="mt-6 border-t border-slate-800 pt-4">
          <div className="mb-3 text-sm font-semibold text-slate-100">Legenda</div>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 flex-shrink-0 rounded border-2" style={{ borderColor: palette.boundary, backgroundColor: 'transparent' }}></div>
              <span className="text-slate-300">Batas Desa</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 flex-shrink-0 rounded" style={{ backgroundColor: palette.buildings, opacity: 0.3 }}></div>
              <span className="text-slate-300">Bangunan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 flex-shrink-0 rounded" style={{ backgroundColor: palette.settlement, opacity: 0.2 }}></div>
              <span className="text-slate-300">Pemukiman</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 flex-shrink-0 rounded" style={{ backgroundColor: palette.water, opacity: 0.4 }}></div>
              <span className="text-slate-300">Sungai/Rawa</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 flex-shrink-0 rounded" style={{ backgroundColor: palette.roadsGood }}></div>
              <span className="text-slate-300">Jalan Utama</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 flex-shrink-0 rounded" style={{ backgroundColor: palette.roadsMed }}></div>
              <span className="text-slate-300">Jalan Lokal</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-4 w-4 flex-shrink-0 rounded" style={{ backgroundColor: palette.landuse, opacity: 0.6 }}></div>
              <span className="text-slate-300">Penggunaan Lahan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div 
                className="h-4 w-4 flex-shrink-0 border-2 border-white" 
                style={{ 
                  background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                  borderRadius: '50% 50% 50% 0',
                  transform: 'rotate(-45deg)'
                }}
              ></div>
              <span className="text-slate-300">Fasilitas</span>
            </div>
          </div>
        </div>
        
      </aside>

      <div className="relative h-[660px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <MapContainer
          center={center}
          zoom={13.5}
          scrollWheelZoom
          className="h-full w-full"
          preferCanvas
        >
          <TileLayer url={tileUrl} attribution={tileAttr} />
              <MapController location={highlightLocation || searchLocation} zoom={17} />

          {active.boundary && (
            <GeoJSON
              key={`boundary-${loadedBoundary.features.length}`}
              data={loadedBoundary as GeoJsonObject}
              style={() => ({
                color: palette.boundary,
                weight: 2,
                fill: false,
              })}
              onEachFeature={(feature, layer) => {
                if (feature.properties && feature.properties.name) {
                  const popupContent = `
                    <div class="text-sm">
                      <div class="font-semibold mb-2">${feature.properties.name}</div>
                      ${populationData.total > 0 ? `
                        <div class="mt-2 pt-2 border-t border-slate-300">
                          <div class="text-xs text-slate-600 font-semibold mb-1">Data Penduduk</div>
                          <div class="text-xs text-slate-700">Total: <span class="font-medium">${populationData.total.toLocaleString("id-ID")} jiwa</span></div>
                          <div class="text-xs text-slate-700">Laki-laki: <span class="font-medium">${populationData.lakiLaki.toLocaleString("id-ID")} jiwa</span></div>
                          <div class="text-xs text-slate-700">Perempuan: <span class="font-medium">${populationData.perempuan.toLocaleString("id-ID")} jiwa</span></div>
                        </div>
                      ` : `
                        <div class="mt-2 pt-2 border-t border-slate-300">
                          <div class="text-xs text-slate-500 italic">Data penduduk belum diinput</div>
                        </div>
                      `}
                    </div>
                  `;
                  layer.bindPopup(popupContent);
                }
              }}
            />
          )}

          {active.buildings && (
            <GeoJSON
              data={loadedBuildings as GeoJsonObject}
              style={() => ({
                color: palette.buildings,
                weight: 1,
                fillColor: palette.buildings,
                fillOpacity: 0.3,
              })}
            />
          )}

          {active.settlement && (
            <GeoJSON
              data={loadedSettlement as GeoJsonObject}
              style={() => ({
                color: palette.settlement,
                weight: 1,
                fillColor: palette.settlement,
                fillOpacity: 0.2,
              })}
            />
          )}

          {active.water && (
            <GeoJSON
              data={loadedWater as GeoJsonObject}
              style={(feature) => {
                const fclass = feature?.properties?.fclass;
                const isWetland = fclass === "wetland";
                return {
                  color: isWetland ? "#10b981" : palette.water,
                  weight: 1,
                  fillColor: isWetland ? "#10b981" : palette.water,
                  fillOpacity: 0.4,
                };
              }}
            />
          )}

          {active.roads && (
            <GeoJSON
              data={loadedRoads as GeoJsonObject}
              style={(feature) => {
                const fclass = feature?.properties?.fclass;
                const isBridge = feature?.properties?.bridge === "T";
                let color = palette.roadsGood; // Default to good

                if (isBridge) {
                  color = "#a855f7"; // Purple for bridges
                } else if (fclass === "residential" || fclass === "service" || fclass === "path") {
                  color = palette.roadsMed; // Orange for residential/service/path
                } else if (fclass === "tertiary" || fclass === "tertiary_link" || fclass === "living_street") {
                  color = palette.roadsGood; // Blue for main roads
                } else {
                  color = palette.roadsBad; // Red for unknown/bad
                }

                return { color, weight: 3 };
              }}
              onEachFeature={(feature, layer) => {
                if (feature.properties) {
                  const props = feature.properties;
                  const name = props.name || `Jalan ${props.fclass || "tidak diketahui"}`;
                  const popupContent = `
                    <div class="text-sm">
                      <div class="font-semibold">${name}</div>
                      ${props.fclass ? `<div class="text-slate-500">Tipe: ${props.fclass}</div>` : ""}
                      ${props.surface ? `<div class="text-slate-500">Permukaan: ${props.surface}</div>` : ""}
                      ${props.condition ? `<div class="text-slate-500">Kondisi: ${props.condition}</div>` : ""}
                      ${props.bridge === "T" ? `<div class="text-slate-500">Jembatan: Ya</div>` : ""}
                      ${props.tunnel === "T" ? `<div class="text-slate-500">Terowongan: Ya</div>` : ""}
                      ${props.osm_id ? `<div class="text-xs text-slate-600">OSM ID: ${props.osm_id}</div>` : ""}
                    </div>
                  `;
                  layer.bindPopup(popupContent);
                }
              }}
            />
          )}

          {active.landuse && (
            <GeoJSON
              data={loadedLanduse as GeoJsonObject}
              style={(feature) => {
                const fclass = feature?.properties?.fclass || feature?.properties?.class;
                // Styling berdasarkan fclass dari POI
                let fillColor = "rgba(99,102,241,0.2)"; // Default blue
                
                if (fclass === "park") {
                  fillColor = "rgba(52,211,153,0.35)"; // Green for parks
                } else if (fclass === "stadium" || fclass === "sports_centre") {
                  fillColor = "rgba(239,68,68,0.3)"; // Red for sports facilities
                } else if (fclass === "cemetery" || fclass === "graveyard") {
                  fillColor = "rgba(107,114,128,0.4)"; // Gray for cemetery
                } else if (fclass === "pitch") {
                  fillColor = "rgba(34,197,94,0.3)"; // Green for pitch
                } else if (fclass === "market_place") {
                  fillColor = "rgba(251,191,36,0.3)"; // Yellow for market
                }
                
                return {
                  color: palette.landuseAlt,
                  weight: 1,
                  fillColor,
                  fillOpacity: 0.6,
                };
              }}
              onEachFeature={(feature, layer) => {
                if (feature.properties) {
                  const props = feature.properties;
                  const name = props.name || `POI ${props.fclass || props.class || "tidak diketahui"}`;
                  const popupContent = `
                    <div class="text-sm">
                      <div class="font-semibold">${name}</div>
                      ${props.fclass ? `<div class="text-slate-500">Tipe: ${props.fclass}</div>` : ""}
                      ${props.class && props.class !== props.fclass ? `<div class="text-slate-500">Kelas: ${props.class}</div>` : ""}
                      ${props.osm_id ? `<div class="text-xs text-slate-600">OSM ID: ${props.osm_id}</div>` : ""}
                    </div>
                  `;
                  layer.bindPopup(popupContent);
                }
              }}
            />
          )}

              {/* Render facilities: tampilkan jika checkbox aktif ATAU jika sedang di-highlight */}
              {(() => {
                // Cari facility yang sedang di-highlight
                const highlightedFacility = highlightLocation && highlightFacilityName
                  ? loadedFacilities.features.find((f) => {
                      const facilityPosition: [number, number] = [f.geometry.coordinates[1], f.geometry.coordinates[0]];
                      return (
                        Math.abs(facilityPosition[0] - highlightLocation[0]) < 0.0001 &&
                        Math.abs(facilityPosition[1] - highlightLocation[1]) < 0.0001 &&
                        f.properties?.name === highlightFacilityName
                      );
                    })
                  : null;

                // Filter facilities yang akan ditampilkan
                const facilitiesToShow = loadedFacilities.features.filter((f) => {
                  // Jika facilities terceklis, tampilkan semua (highlight tidak ditampilkan)
                  if (activeFacilities) {
                    return true;
                  }
                  // Jika ada kategori yang terceklis, filter berdasarkan kategori (highlight tidak ditampilkan)
                  if (Object.values(facilityCategories).some((checked) => checked)) {
                    const category = f.properties?.category || "";
                    return facilityCategories[category] === true;
                  }
                  // Jika tidak ada checkbox yang aktif, hanya tampilkan yang sedang di-highlight
                  if (highlightedFacility && f.properties?.name === highlightedFacility.properties?.name) {
                    return true;
                  }
                  return false;
                });

                return facilitiesToShow.map((f) => {
                  // Tentukan icon berdasarkan kategori
                  const getFacilityIcon = (category: string) => {
                // Icon untuk Pendidikan - Biru (education)
                if (category.toLowerCase().includes("pendidikan") || category.toLowerCase().includes("sekolah") || category.toLowerCase().includes("kampus") || category.toLowerCase().includes("madrasah") || category.toLowerCase().includes("tk") || category.toLowerCase().includes("sd") || category.toLowerCase().includes("paud")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:school.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Pendidikan" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Keagamaan - Hijau (peaceful)
                if (category.toLowerCase().includes("keagamaan") || category.toLowerCase().includes("masjid") || category.toLowerCase().includes("musholla") || category.toLowerCase().includes("musholah") || category.toLowerCase().includes("gereja")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:mosque.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Keagamaan" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Kesehatan - Merah (medical)
                if (category.toLowerCase().includes("kesehatan") || category.toLowerCase().includes("dokter") || category.toLowerCase().includes("bidan") || category.toLowerCase().includes("apotek") || category.toLowerCase().includes("klinik") || category.toLowerCase().includes("rumah sakit") || category.toLowerCase().includes("khitan") || category.toLowerCase().includes("pawang")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:medical-bag.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Kesehatan" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Belanja - Orange (shopping)
                if (category.toLowerCase().includes("belanja") || category.toLowerCase().includes("toko") || category.toLowerCase().includes("warung") || category.toLowerCase().includes("depot") || category.toLowerCase().includes("indomaret") || category.toLowerCase().includes("alfamart") || category.toLowerCase().includes("shop")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:shopping.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Belanja" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Olahraga - Orange Merah (energetic)
                if (category.toLowerCase().includes("olahraga") || category.toLowerCase().includes("stadion") || category.toLowerCase().includes("gor") || category.toLowerCase().includes("lapangan") || category.toLowerCase().includes("sirkuit") || category.toLowerCase().includes("kolam renang") || category.toLowerCase().includes("squash") || category.toLowerCase().includes("futsal") || category.toLowerCase().includes("soccer") || category.toLowerCase().includes("panahan") || category.toLowerCase().includes("bmx")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:soccer.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Olahraga" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Pemerintahan - Biru Tua/Navy (official)
                if (category.toLowerCase().includes("pemerintahan") || category.toLowerCase().includes("kantor") || category.toLowerCase().includes("pemadam") || category.toLowerCase().includes("tni") || category.toLowerCase().includes("bpkad") || category.toLowerCase().includes("kelurahan") || category.toLowerCase().includes("pajak") || category.toLowerCase().includes("ketahanan pangan")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(30, 64, 175, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:office-building.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Pemerintahan" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Rekreasi - Hijau (nature)
                if (category.toLowerCase().includes("rekreasi") || category.toLowerCase().includes("taman") || category.toLowerCase().includes("hutan kota") || category.toLowerCase().includes("park")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:tree.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Rekreasi" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Wisata - Cyan (travel)
                if (category.toLowerCase().includes("wisata") || category.toLowerCase().includes("pulau") || category.toLowerCase().includes("mercusuar") || category.toLowerCase().includes("fort")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:camera.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Wisata" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Jasa - Abu-abu (service)
                if (category.toLowerCase().includes("jasa") || category.toLowerCase().includes("bengkel") || category.toLowerCase().includes("carwash") || category.toLowerCase().includes("potong rambut") || category.toLowerCase().includes("wedding") || category.toLowerCase().includes("sewa") || category.toLowerCase().includes("biro") || category.toLowerCase().includes("stnk") || category.toLowerCase().includes("sim")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(107, 114, 128, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:wrench.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Jasa" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Akomodasi - Coklat (comfort)
                if (category.toLowerCase().includes("akomodasi") || category.toLowerCase().includes("kos") || category.toLowerCase().includes("hotel") || category.toLowerCase().includes("reddoorz") || category.toLowerCase().includes("penginapan")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:bed.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Akomodasi" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Infrastruktur - Abu-abu gelap (construction)
                if (category.toLowerCase().includes("infrastruktur") || category.toLowerCase().includes("jembatan") || category.toLowerCase().includes("spbu") || category.toLowerCase().includes("pertamina")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #475569 0%, #334155 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(71, 85, 105, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:bridge.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Infrastruktur" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Kuliner - Orange Merah (food)
                if (category.toLowerCase().includes("kuliner") || category.toLowerCase().includes("kedai") || category.toLowerCase().includes("kopi") || category.toLowerCase().includes("gorengan") || category.toLowerCase().includes("restoran") || category.toLowerCase().includes("warung makan")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:silverware-fork-knife.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Kuliner" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Icon untuk Makam - Abu-abu gelap (somber)
                if (category.toLowerCase().includes("makam") || category.toLowerCase().includes("cemetery") || category.toLowerCase().includes("pemakaman")) {
                  return L.divIcon({
                    className: "custom-facility-icon",
                    html: `<div style="
                      background: linear-gradient(135deg, #64748b 0%, #475569 100%);
                      width: 40px;
                      height: 40px;
                      border-radius: 50% 50% 50% 0;
                      border: 3px solid #ffffff;
                      box-shadow: 0 4px 12px rgba(100, 116, 139, 0.6);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      transform: rotate(-45deg);
                    ">
                      <img src="https://api.iconify.design/mdi:cross.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Makam" />
                    </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40],
                  });
                }
                // Default icon untuk fasilitas umum - menggunakan icon building dari iconify
                return L.divIcon({
                  className: "custom-facility-icon",
                  html: `<div style="
                    background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
                    width: 40px;
                    height: 40px;
                    border-radius: 50% 50% 50% 0;
                    border: 3px solid #ffffff;
                    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: rotate(-45deg);
                  ">
                    <img src="https://api.iconify.design/mdi:store.svg?color=white" style="transform: rotate(45deg); width: 24px; height: 24px;" alt="Fasilitas" />
                  </div>`,
                  iconSize: [40, 40],
                  iconAnchor: [20, 40],
                  popupAnchor: [0, -40],
                });
              };

                  // Cek apakah facility ini yang di-highlight
                  const facilityPosition: [number, number] = [f.geometry.coordinates[1], f.geometry.coordinates[0]];
                  const isHighlighted = highlightLocation && 
                    highlightFacilityName &&
                    Math.abs(facilityPosition[0] - highlightLocation[0]) < 0.0001 &&
                    Math.abs(facilityPosition[1] - highlightLocation[1]) < 0.0001 &&
                    f.properties?.name === highlightFacilityName;

                  return (
                    <HighlightableMarker
                      key={f.properties?.name}
                      facility={f}
                      getFacilityIcon={getFacilityIcon}
                      isHighlighted={isHighlighted || false}
                    />
                  );
                });
              })()}

        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;

