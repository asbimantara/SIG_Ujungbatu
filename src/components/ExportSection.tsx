"use client";

import { useState } from "react";

type ExportButtonProps = {
  layer: string;
  label: string;
};

function ExportButton({ layer, label }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: "geojson" | "csv") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/data/export?layer=${layer}&format=${format}`);
      if (!res.ok) throw new Error("Export gagal");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${layer}_export.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export error:", error);
      alert("Gagal mengekspor data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 transition-colors hover:bg-slate-800">
      <span className="text-xs font-medium text-slate-300 whitespace-nowrap">{label}:</span>
      <button
        onClick={() => handleExport("geojson")}
        disabled={loading}
        className="rounded border border-slate-600 bg-slate-700/50 px-2 py-1 text-xs text-slate-200 transition-colors hover:bg-slate-600 disabled:opacity-50"
        title={`Export ${label} sebagai GeoJSON`}
      >
        {loading ? "..." : "GeoJSON"}
      </button>
      <button
        onClick={() => handleExport("csv")}
        disabled={loading}
        className="rounded border border-slate-600 bg-slate-700/50 px-2 py-1 text-xs text-slate-200 transition-colors hover:bg-slate-600 disabled:opacity-50"
        title={`Export ${label} sebagai CSV`}
      >
        {loading ? "..." : "CSV"}
      </button>
    </div>
  );
}

export function ExportSection() {
  const layers = [
    { layer: "boundary", label: "Batas Desa" },
    { layer: "buildings", label: "Bangunan" },
    { layer: "settlement", label: "Pemukiman" },
    { layer: "water", label: "Sungai/Rawa" },
    { layer: "roads", label: "Jalan" },
    { layer: "facilities", label: "Fasilitas" },
    { layer: "landuse", label: "Lahan" },
  ];

  return (
    <div className="glass rounded-xl border border-slate-800 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">Export Data</h3>
        <span className="text-xs text-slate-400">Pilih layer dan format</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {layers.map(({ layer, label }) => (
          <ExportButton key={layer} layer={layer} label={label} />
        ))}
      </div>
    </div>
  );
}

