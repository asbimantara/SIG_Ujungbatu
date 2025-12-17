"use client";

import { useState } from "react";

type ExportButtonProps = {
  layer: string;
  label: string;
};

export function ExportButton({ layer, label }: ExportButtonProps) {
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
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
      <div className="mb-2 text-xs font-semibold text-slate-200">{label}</div>
      <div className="flex gap-2">
        <button
          onClick={() => handleExport("geojson")}
          disabled={loading}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "..." : "GeoJSON"}
        </button>
        <button
          onClick={() => handleExport("csv")}
          disabled={loading}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "..." : "CSV"}
        </button>
      </div>
    </div>
  );
}

