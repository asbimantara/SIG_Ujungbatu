"use client";

import { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, Polygon, Polyline } from "@react-google-maps/api";
import { boundary, facilities, landuse, layerOrder, risk, roads } from "@/data/sample";
import { SearchBar } from "./SearchBar";
import { ExportButton } from "./ExportButton";
import { Feature } from "@turf/helpers";

const mapContainerStyle = {
  width: "100%",
  height: "640px",
};

const center = {
  lat: -6.576,
  lng: 110.7055,
};

const palette = {
  boundary: "#1f2937",
  landuse: "#93c5fd",
  landuseAlt: "#60a5fa",
  roadsGood: "#2563eb",
  roadsMed: "#f59e0b",
  roadsBad: "#ef4444",
  facility: "#7c3aed",
  risk: "#dc2626",
};

const layerNames: Record<(typeof layerOrder)[number], string> = {
  boundary: "Batas Desa",
  landuse: "Penggunaan Lahan",
  roads: "Jalan",
  facilities: "Fasilitas",
  risk: "Risiko",
};


const getGoogleMapsRouteUrl = (destination: { lat: number; lng: number }, destinationName: string) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}&destination_place_id=${encodeURIComponent(destinationName)}`;
};

export function GoogleMapView() {
  const [active, setActive] = useState<Record<string, boolean>>({
    boundary: true,
    landuse: true,
    roads: true,
    facilities: true,
    risk: true,
  });

  const [selectedMarker, setSelectedMarker] = useState<{
    type: "facility" | "risk";
    data: Feature;
    position: { lat: number; lng: number };
  } | null>(null);

  const [mapCenter, setMapCenter] = useState(center);
  const [mapZoom, setMapZoom] = useState(15);

  const handleSearchSelect = useCallback((location: [number, number]) => {
    setMapCenter({ lat: location[0], lng: location[1] });
    setMapZoom(17);
  }, []);

  const handleMarkerClick = useCallback(
    (type: "facility" | "risk", data: Feature, position: { lat: number; lng: number }) => {
      setSelectedMarker({ type, data, position });
    },
    []
  );

  const handleInfoWindowClose = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  // Get Google Maps API key from environment or use placeholder
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Jika tidak ada API key, tampilkan pesan
  if (!apiKey) {
    return (
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="glass rounded-2xl p-4 text-sm text-slate-200">
          <div className="mb-4">
            <div className="mb-2 text-base font-semibold text-slate-100">Pencarian</div>
            <SearchBar onSelect={handleSearchSelect} />
          </div>
          <div className="mb-3 text-base font-semibold text-slate-100">Layer</div>
          <div className="space-y-2">
            {layerOrder.map((key) => (
              <label
                key={key}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2"
              >
                <span>{layerNames[key]}</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-indigo-400"
                  checked={active[key]}
                  onChange={(e) => setActive((prev) => ({ ...prev, [key]: e.target.checked }))}
                />
              </label>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
            <div className="font-semibold text-slate-100 text-red-400">⚠️ Google Maps API Key Required</div>
            <p className="mt-2">
              Tambahkan <code className="text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> di file <code className="text-xs">.env.local</code>
            </p>
            <p className="mt-2 text-xs">
              Dapatkan API key gratis di{" "}
              <a
                href="https://console.cloud.google.com/google/maps-apis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>
        </aside>
        <div className="flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <div className="text-center text-slate-400">
            <p className="text-lg font-semibold">Google Maps API Key diperlukan</p>
            <p className="mt-2 text-sm">Silakan setup API key untuk menggunakan peta</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="glass rounded-2xl p-4 text-sm text-slate-200">
        <div className="mb-4">
          <div className="mb-2 text-base font-semibold text-slate-100">Pencarian</div>
          <SearchBar onSelect={handleSearchSelect} />
        </div>
        <div className="mb-3 text-base font-semibold text-slate-100">Layer</div>
        <div className="space-y-2">
          {layerOrder.map((key) => (
            <label
              key={key}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2"
            >
              <span>{layerNames[key]}</span>
              <input
                type="checkbox"
                className="h-4 w-4 accent-indigo-400"
                checked={active[key]}
                onChange={(e) => setActive((prev) => ({ ...prev, [key]: e.target.checked }))}
              />
            </label>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
          <div className="font-semibold text-slate-100">Legenda</div>
          <ul className="mt-2 space-y-1">
            <li>— Batas: {palette.boundary}</li>
            <li>— Lahan: biru muda</li>
            <li>— Jalan baik: {palette.roadsGood}</li>
            <li>— Jalan sedang: {palette.roadsMed}</li>
            <li>— Jalan rusak: {palette.roadsBad}</li>
            <li>● Fasilitas: {palette.facility}</li>
            <li>● Risiko: {palette.risk}</li>
          </ul>
        </div>
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-300">
          <div className="font-semibold text-slate-100">Tip</div>
          <p className="mt-1">Klik marker untuk detail lengkap & tombol rute ke Google Maps.</p>
        </div>
        <div className="mt-4 space-y-2">
          <div className="mb-2 text-xs font-semibold text-slate-200">Export Data</div>
          <ExportButton layer="facilities" label="Fasilitas" />
          <ExportButton layer="roads" label="Jalan" />
          <ExportButton layer="landuse" label="Lahan" />
        </div>
      </aside>

      <div className="relative h-[640px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={mapZoom}
            options={{
              styles: [
                {
                  featureType: "all",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#1f2937" }],
                },
                {
                  featureType: "all",
                  elementType: "labels.text.stroke",
                  stylers: [{ color: "#ffffff" }],
                },
              ],
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
            }}
          >
            {/* Boundary Layer */}
            {active.boundary &&
              boundary.features.map((feature, idx) => {
                if (feature.geometry.type === "Polygon") {
                  const paths = feature.geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng }));
                  return (
                    <Polygon
                      key={`boundary-${idx}`}
                      paths={paths}
                      options={{
                        strokeColor: palette.boundary,
                        strokeWeight: 3,
                        fillColor: "transparent",
                        fillOpacity: 0,
                      }}
                    />
                  );
                }
                return null;
              })}

            {/* Land Use Layer */}
            {active.landuse &&
              landuse.features.map((feature, idx) => {
                if (feature.geometry.type === "Polygon") {
                  const paths = feature.geometry.coordinates[0].map(([lng, lat]) => ({ lat, lng }));
                  const isSawah = feature.properties?.class === "Sawah";
                  return (
                    <Polygon
                      key={`landuse-${idx}`}
                      paths={paths}
                      options={{
                        strokeColor: palette.landuseAlt,
                        strokeWeight: 1,
                        fillColor: isSawah ? "#34d399" : "#60a5fa",
                        fillOpacity: 0.4,
                      }}
                    />
                  );
                }
                return null;
              })}

            {/* Roads Layer */}
            {active.roads &&
              roads.features.map((feature, idx) => {
                if (feature.geometry.type === "LineString") {
                  const path = feature.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
                  const cond = feature.properties?.condition || "baik";
                  const color =
                    cond === "baik" ? palette.roadsGood : cond === "sedang" ? palette.roadsMed : palette.roadsBad;
                  return (
                    <Polyline
                      key={`road-${idx}`}
                      path={path}
                      options={{
                        strokeColor: color,
                        strokeWeight: 4,
                        strokeOpacity: 0.8,
                      }}
                    />
                  );
                }
                return null;
              })}

            {/* Facilities Markers */}
            {active.facilities &&
              facilities.features.map((feature) => {
                const position = {
                  lat: feature.geometry.coordinates[1],
                  lng: feature.geometry.coordinates[0],
                };
                return (
                  <Marker
                    key={`facility-${feature.properties?.name}`}
                    position={position}
                    icon={{
                      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                        `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="${palette.facility}" stroke="#ffffff" stroke-width="2"/></svg>`
                      )}`,
                      scaledSize: new google.maps.Size(20, 20),
                      anchor: new google.maps.Point(10, 10),
                    }}
                    onClick={() => handleMarkerClick("facility", feature, position)}
                  />
                );
              })}

            {/* Risk Markers */}
            {active.risk &&
              risk.features.map((feature) => {
                const position = {
                  lat: feature.geometry.coordinates[1],
                  lng: feature.geometry.coordinates[0],
                };
                return (
                  <Marker
                    key={`risk-${feature.properties?.type}`}
                    position={position}
                    icon={{
                      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                        `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" fill="${palette.risk}" stroke="#ffffff" stroke-width="2"/></svg>`
                      )}`,
                      scaledSize: new google.maps.Size(20, 20),
                      anchor: new google.maps.Point(10, 10),
                    }}
                    onClick={() => handleMarkerClick("risk", feature, position)}
                  />
                );
              })}

            {/* Info Window */}
            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={handleInfoWindowClose}
              >
                <div className="max-w-xs p-2 text-slate-900">
                  <div className="mb-3">
                    <h3 className="text-base font-semibold">
                      {selectedMarker.data.properties?.name || selectedMarker.data.properties?.type}
                    </h3>
                    {selectedMarker.data.properties?.category && (
                      <p className="mt-1 text-sm font-medium text-indigo-600">
                        {selectedMarker.data.properties.category}
                      </p>
                    )}
                  </div>

                  {selectedMarker.data.properties?.info && (
                    <p className="mb-2 text-sm text-slate-700">{selectedMarker.data.properties.info}</p>
                  )}
                  {selectedMarker.data.properties?.note && (
                    <p className="mb-2 text-sm text-slate-700">{selectedMarker.data.properties.note}</p>
                  )}

                  {selectedMarker.data.properties?.alamat && (
                    <div className="mb-2 flex items-start gap-2 text-sm text-slate-600">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{selectedMarker.data.properties.alamat}</span>
                    </div>
                  )}

                  {selectedMarker.data.properties?.kontak && selectedMarker.data.properties.kontak !== "-" && (
                    <div className="mb-2 flex items-center gap-2 text-sm text-slate-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{selectedMarker.data.properties.kontak}</span>
                    </div>
                  )}

                  {selectedMarker.data.properties?.jam && (
                    <div className="mb-3 flex items-center gap-2 text-sm text-slate-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{selectedMarker.data.properties.jam}</span>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href={getGoogleMapsRouteUrl(
                        selectedMarker.position,
                        selectedMarker.data.properties?.name || selectedMarker.data.properties?.type || ""
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      Rute ke Lokasi
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedMarker.position.lat},${selectedMarker.position.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Lihat di Google Maps
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

