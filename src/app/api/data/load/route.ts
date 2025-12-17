import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { FeatureCollection, MultiPolygon, MultiLineString } from "geojson";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const layer = searchParams.get("layer");

  if (!layer) {
    return NextResponse.json({ error: "Parameter layer diperlukan" }, { status: 400 });
  }

  try {
    let geojson: any;
    
    // Baca file GeoJSON sesuai layer
    const fileMap: Record<string, string> = {
      boundary: "batas_ujungbatu",
      buildings: "bangunan_ujungbatu",
      settlement: "pemukiman_ujungbatu",
      water: "sungai_rawa_ujungbatu",
      roads: "jalan_ujungbatu",
      landuse: "poi_ujungbatu", // Menggunakan poi_ujungbatu.geojson untuk landuse
    };

    const fileName = fileMap[layer];
    if (!fileName) {
      return NextResponse.json({ error: "Layer tidak valid" }, { status: 400 });
    }

    const filePath = join(process.cwd(), "public", "qgis", `${fileName}.geojson`);
    const fileContents = readFileSync(filePath, "utf-8");
    geojson = JSON.parse(fileContents);

    // Transform data sesuai layer
    if (layer === "boundary") {
      // Untuk boundary, kita kembalikan semua properties dari file asli untuk akurasi 100%
      const transformed: FeatureCollection<MultiPolygon> = {
        type: "FeatureCollection",
        features: geojson.features.map((feature: any) => ({
          type: "Feature",
          properties: {
            // Pertahankan semua properties asli dari GeoJSON
            ...feature.properties,
            // Tambahkan name untuk kompatibilitas (gunakan NAMOBJ jika ada)
            name: feature.properties.NAMOBJ || (feature.properties.NAMOBJ === null ? "Pulau Panjang" : "Wilayah Ujungbatu"),
          },
          geometry: feature.geometry,
        })),
      };
      return NextResponse.json(transformed);
    }

    if (layer === "buildings") {
      const transformed: FeatureCollection<MultiPolygon> = {
        type: "FeatureCollection",
        features: geojson.features.map((feature: any) => ({
          type: "Feature",
          properties: {
            name: feature.properties.name || `Bangunan ${feature.properties.osm_id || "tidak diketahui"}`,
            type: feature.properties.type || feature.properties.fclass || "building",
            osm_id: feature.properties.osm_id,
          },
          geometry: feature.geometry,
        })),
      };
      return NextResponse.json(transformed);
    }

    if (layer === "settlement") {
      const transformed: FeatureCollection<MultiPolygon> = {
        type: "FeatureCollection",
        features: geojson.features.map((feature: any) => ({
          type: "Feature",
          properties: {
            name: feature.properties.NAMOBJ || "Pemukiman",
            remark: feature.properties.REMARK || "Permukiman dan Tempat Kegiatan",
          },
          geometry: feature.geometry,
        })),
      };
      return NextResponse.json(transformed);
    }

    if (layer === "water") {
      const transformed: FeatureCollection<MultiPolygon> = {
        type: "FeatureCollection",
        features: geojson.features.map((feature: any) => ({
          type: "Feature",
          properties: {
            name: feature.properties.name || feature.properties.fclass || "Sungai/Rawa",
            type: feature.properties.fclass || "water",
            fclass: feature.properties.fclass || "water",
          },
          geometry: feature.geometry,
        })),
      };
      return NextResponse.json(transformed);
    }

    if (layer === "roads") {
      // Untuk roads, kembalikan data 100% persis seperti di QGIS tanpa transformasi apapun
      return NextResponse.json(geojson);
    }

    if (layer === "landuse") {
      // Transform POI data untuk landuse layer
      // Map fclass ke class untuk kompatibilitas dengan struktur yang ada
      const transformed: FeatureCollection<MultiPolygon> = {
        type: "FeatureCollection",
        features: geojson.features.map((feature: any) => ({
          type: "Feature",
          properties: {
            ...feature.properties, // Keep all original properties
            class: feature.properties.fclass || feature.properties.class || "Lainnya", // Map fclass to class
          },
          geometry: feature.geometry,
        })),
      };
      return NextResponse.json(transformed);
    }

    return NextResponse.json(geojson);
  } catch (error) {
    console.error("Error loading GeoJSON:", error);
    return NextResponse.json({ error: "Error loading data" }, { status: 500 });
  }
}

