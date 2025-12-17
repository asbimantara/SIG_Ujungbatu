"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { FeatureCollection, Point } from "geojson";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tileAttr =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Fix default marker icons
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

type AdminMapViewProps = {
  coordinates: { lat: number; lng: number } | null;
  onCoordinatesChange: (coords: { lat: number; lng: number }) => void;
  facilities?: FeatureCollection<Point>;
  highlightId?: string;
};

function MapClickHandler({
  onCoordinatesChange,
}: {
  onCoordinatesChange: (coords: { lat: number; lng: number }) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      onCoordinatesChange({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onCoordinatesChange]);

  return null;
}

export function AdminMapView({
  coordinates,
  onCoordinatesChange,
  facilities,
  highlightId,
}: AdminMapViewProps) {
  const center: [number, number] = coordinates
    ? [coordinates.lat, coordinates.lng]
    : [-6.5810, 110.648];

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg border border-slate-800">
      <MapContainer
        center={center}
        zoom={coordinates ? 17 : 13.5}
        scrollWheelZoom
        className="h-full w-full"
        preferCanvas
      >
        <TileLayer url={tileUrl} attribution={tileAttr} />
        <MapClickHandler onCoordinatesChange={onCoordinatesChange} />

        {/* Marker untuk koordinat yang dipilih */}
        {coordinates && (
          <Marker
            position={[coordinates.lat, coordinates.lng]}
            icon={L.icon({
              iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
              shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })}
          />
        )}

        {/* Preview semua fasilitas */}
        {facilities?.features.map((f, idx) => {
          const isHighlighted = f.properties?.id === highlightId || f.properties?.name === highlightId;
          return (
            <Marker
              key={idx}
              position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
              icon={L.divIcon({
                className: "custom-marker",
                html: `<div style="
                  background: ${isHighlighted ? "#ef4444" : "#7c3aed"};
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  border: 2px solid white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                "></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })}
            />
          );
        })}
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 rounded-lg bg-slate-900/90 px-3 py-2 text-xs text-slate-300 backdrop-blur">
        💡 Klik di peta untuk set koordinat
      </div>
    </div>
  );
}

