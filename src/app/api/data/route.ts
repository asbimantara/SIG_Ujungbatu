import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { FeatureCollection, Point } from "geojson";
import { facilities } from "@/data/sample";

// Helper untuk baca facilities
function readFacilitiesData(): FeatureCollection<Point> {
  try {
    // Coba baca dari file JSON dulu (jika ada)
    const jsonPath = join(process.cwd(), "public", "data", "facilities.json");
    if (existsSync(jsonPath)) {
      const fileContents = readFileSync(jsonPath, "utf-8");
      return JSON.parse(fileContents);
    }
  } catch (error) {
    // Jika file tidak ada, gunakan dari sample.ts
    console.log("Using default facilities from sample.ts");
  }
  // Fallback ke sample.ts
  return facilities;
}

// Helper untuk write facilities
function writeFacilitiesData(data: FeatureCollection<Point>) {
  try {
    // Simpan ke file JSON
    const filePath = join(process.cwd(), "public", "data", "facilities.json");
    // Pastikan folder ada
    const dir = join(process.cwd(), "public", "data");
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing facilities data:", error);
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const layer = searchParams.get("layer");

  switch (layer) {
    case "boundary":
      return NextResponse.json({ boundary: "Use /api/data/load?layer=boundary" });
    case "buildings":
      return NextResponse.json({ buildings: "Use /api/data/load?layer=buildings" });
    case "settlement":
      return NextResponse.json({ settlement: "Use /api/data/load?layer=settlement" });
    case "water":
      return NextResponse.json({ water: "Use /api/data/load?layer=water" });
    case "facilities": {
      const facilitiesData = readFacilitiesData();
      return NextResponse.json(facilitiesData);
    }
    case "roads":
      return NextResponse.json({ roads: "Use /api/data/load?layer=roads" });
    case "landuse":
      return NextResponse.json({ landuse: "Use /api/data/load?layer=landuse" });
    default:
      return NextResponse.json(
        {
          message: "Layer tidak ditemukan. Gunakan parameter ?layer=facilities",
        },
        { status: 400 }
      );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { layer, data } = body;

    if (layer !== "facilities") {
      return NextResponse.json(
        { error: "Hanya layer 'facilities' yang didukung untuk sekarang" },
        { status: 400 }
      );
    }

    // Validasi data
    if (!data.name || !data.category || !data.coordinates) {
      return NextResponse.json(
        { error: "Data tidak lengkap. Nama, kategori, dan koordinat wajib diisi" },
        { status: 400 }
      );
    }

    // Baca data existing
    const facilitiesData = readFacilitiesData();

    // Generate ID baru
    const newId = `facility-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Buat feature baru
    const newFeature = {
      type: "Feature" as const,
      properties: {
        id: newId,
        name: data.name,
        category: data.category,
        info: data.info || "",
        alamat: data.alamat || "",
        kontak: data.kontak || "",
        jam: data.jam || "",
        foto_url: data.foto_url || "",
      },
      geometry: {
        type: "Point" as const,
        coordinates: [data.coordinates.lng, data.coordinates.lat], // GeoJSON format: [lng, lat]
      },
    };

    // Tambahkan ke features
    facilitiesData.features.push(newFeature);

    // Simpan (untuk development, kita simpan ke file backup)
    writeFacilitiesData(facilitiesData);

    return NextResponse.json({
      success: true,
      message: "Fasilitas berhasil ditambahkan",
      id: newId,
      data: newFeature,
    });
  } catch (error) {
    console.error("Error creating facility:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambahkan fasilitas" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { layer, id, data } = body;

    if (layer !== "facilities") {
      return NextResponse.json(
        { error: "Hanya layer 'facilities' yang didukung untuk sekarang" },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    // Baca data existing
    const facilitiesData = readFacilitiesData();

    // Cari index feature
    const featureIndex = facilitiesData.features.findIndex(
      (f) => f.properties?.id === id || f.properties?.name === id
    );

    if (featureIndex === -1) {
      return NextResponse.json({ error: "Fasilitas tidak ditemukan" }, { status: 404 });
    }

    // Update feature
    const existingFeature = facilitiesData.features[featureIndex];
    facilitiesData.features[featureIndex] = {
      ...existingFeature,
      properties: {
        ...existingFeature.properties,
        id: existingFeature.properties?.id || id,
        name: data.name || existingFeature.properties?.name,
        category: data.category || existingFeature.properties?.category,
        info: data.info !== undefined ? data.info : existingFeature.properties?.info,
        alamat: data.alamat !== undefined ? data.alamat : existingFeature.properties?.alamat,
        kontak: data.kontak !== undefined ? data.kontak : existingFeature.properties?.kontak,
        jam: data.jam !== undefined ? data.jam : existingFeature.properties?.jam,
        foto_url: data.foto_url !== undefined ? data.foto_url : existingFeature.properties?.foto_url,
      },
      geometry: data.coordinates
        ? {
            type: "Point" as const,
            coordinates: [data.coordinates.lng, data.coordinates.lat],
          }
        : existingFeature.geometry,
    };

    // Simpan
    writeFacilitiesData(facilitiesData);

    return NextResponse.json({
      success: true,
      message: "Fasilitas berhasil diupdate",
      data: facilitiesData.features[featureIndex],
    });
  } catch (error) {
    console.error("Error updating facility:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengupdate fasilitas" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const layer = searchParams.get("layer");
    const id = searchParams.get("id");

    if (layer !== "facilities") {
      return NextResponse.json(
        { error: "Hanya layer 'facilities' yang didukung untuk sekarang" },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json({ error: "ID wajib diisi" }, { status: 400 });
    }

    // Baca data existing
    const facilitiesData = readFacilitiesData();

    // Cari index feature
    const featureIndex = facilitiesData.features.findIndex(
      (f) => f.properties?.id === id || f.properties?.name === id
    );

    if (featureIndex === -1) {
      return NextResponse.json({ error: "Fasilitas tidak ditemukan" }, { status: 404 });
    }

    // Hapus feature
    const deletedFeature = facilitiesData.features[featureIndex];
    facilitiesData.features.splice(featureIndex, 1);

    // Simpan
    writeFacilitiesData(facilitiesData);

    return NextResponse.json({
      success: true,
      message: "Fasilitas berhasil dihapus",
      deleted: deletedFeature,
    });
  } catch (error) {
    console.error("Error deleting facility:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus fasilitas" },
      { status: 500 }
    );
  }
}
