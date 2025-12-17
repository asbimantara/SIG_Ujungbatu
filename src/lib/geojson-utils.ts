import { FeatureCollection, Point } from "geojson";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

/**
 * Baca data facilities dari file sample.ts
 * Untuk production, bisa diganti dengan baca dari file GeoJSON
 */
export function readFacilities(): FeatureCollection<Point> {
  try {
    // Baca dari sample.ts (untuk sekarang)
    // Nanti bisa diganti dengan baca dari file GeoJSON
    const samplePath = join(process.cwd(), "src", "data", "sample.ts");
    // Untuk sekarang, kita akan gunakan import langsung
    // Tapi untuk server-side, kita perlu cara lain
    
    // Return empty untuk sekarang, akan diisi dari API
    return {
      type: "FeatureCollection",
      features: [],
    };
  } catch (error) {
    console.error("Error reading facilities:", error);
    return {
      type: "FeatureCollection",
      features: [],
    };
  }
}

/**
 * Generate ID baru untuk fasilitas
 */
export function generateFacilityId(): string {
  return `facility-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validasi koordinat (cek apakah dalam batas desa)
 * Untuk sekarang, validasi sederhana: cek range koordinat Ujungbatu
 */
export function validateCoordinates(lat: number, lng: number): boolean {
  // Koordinat Ujungbatu: sekitar -6.58, 110.65
  // Range: lat -6.59 sampai -6.57, lng 110.62 sampai 110.67
  const minLat = -6.59;
  const maxLat = -6.57;
  const minLng = 110.62;
  const maxLng = 110.67;
  
  return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
}

/**
 * Format koordinat untuk display
 */
export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

