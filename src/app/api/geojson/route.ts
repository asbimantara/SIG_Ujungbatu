import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "Parameter file diperlukan" }, { status: 400 });
  }

  try {
    // Baca file GeoJSON dari public folder
    const filePath = join(process.cwd(), "public", "qgis", `${file}.geojson`);
    const fileContents = readFileSync(filePath, "utf-8");
    const geojson = JSON.parse(fileContents);
    
    return NextResponse.json(geojson);
  } catch (error) {
    console.error("Error reading GeoJSON:", error);
    return NextResponse.json({ error: "File tidak ditemukan atau error membaca file" }, { status: 404 });
  }
}

