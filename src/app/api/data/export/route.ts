import { NextResponse } from "next/server";
import { facilities, landuse } from "@/data/sample";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const layer = searchParams.get("layer");
  const format = searchParams.get("format") || "geojson";

  let data;
  
  // Untuk layer yang berasal dari GeoJSON file, load dari file
  const geoJsonLayers = ["boundary", "buildings", "settlement", "water", "roads", "landuse"];
  if (geoJsonLayers.includes(layer || "")) {
    try {
      const fileMap: Record<string, string> = {
        boundary: "batas_ujungbatu",
        buildings: "bangunan_ujungbatu",
        settlement: "pemukiman_ujungbatu",
        water: "sungai_rawa_ujungbatu",
        roads: "jalan_ujungbatu",
        landuse: "landuse_ujungbatu",
      };
      
      const fileName = fileMap[layer || ""];
      if (fileName) {
        const filePath = join(process.cwd(), "public", "qgis", `${fileName}.geojson`);
        const fileContents = readFileSync(filePath, "utf-8");
        data = JSON.parse(fileContents);
      }
    } catch (error) {
      return NextResponse.json({ error: "Error membaca file GeoJSON" }, { status: 500 });
    }
  } else {
    // Untuk layer lain, gunakan dari sample.ts
    switch (layer) {
      case "facilities":
        data = facilities;
        break;
      default:
        return NextResponse.json({ error: "Layer tidak ditemukan" }, { status: 400 });
    }
  }
  
  if (!data) {
    return NextResponse.json({ error: "Layer tidak ditemukan" }, { status: 400 });
  }

  if (format === "csv") {
    // Simple CSV export (only for point/line features with properties)
    const features = data.features;
    if (features.length === 0) {
      return NextResponse.json({ error: "Tidak ada data untuk diekspor" }, { status: 400 });
    }

    const headers = Object.keys(features[0].properties || {});
    const rows = features.map((f: any) => {
      const props = f.properties || {};
      const coords =
        f.geometry.type === "Point"
          ? `${f.geometry.coordinates[0]},${f.geometry.coordinates[1]}`
          : f.geometry.type === "LineString" || f.geometry.type === "MultiLineString"
            ? JSON.stringify(f.geometry.coordinates)
            : f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon"
              ? JSON.stringify(f.geometry.coordinates)
              : "";
      return [...headers.map((h) => String(props[h] || "")), coords].join(",");
    });

    const csv = [headers.join(",") + ",coordinates", ...rows].join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${layer}_export.csv"`,
      },
    });
  }

  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${layer}_export.geojson"`,
    },
  });
}

