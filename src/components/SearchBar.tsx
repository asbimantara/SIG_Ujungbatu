"use client";

import { useState, useMemo } from "react";
import { facilities } from "@/data/sample";
import { Feature } from "@turf/helpers";

type SearchResult = {
  type: "facility";
  name: string;
  category?: string;
  location: [number, number];
  data: Feature;
};

export function SearchBar({
  onSelect,
}: {
  onSelect: (location: [number, number], zoom?: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    facilities.features.forEach((f) => {
      const name = f.properties?.name?.toLowerCase() || "";
      const cat = f.properties?.category?.toLowerCase() || "";
      if (name.includes(q) || cat.includes(q)) {
        found.push({
          type: "facility",
          name: f.properties?.name || "",
          category: f.properties?.category,
          location: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
          data: f,
        });
      }
    });


    return found.slice(0, 8);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onSelect(result.location, 17);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5 shadow-lg backdrop-blur">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Cari fasilitas..."
          className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="text-slate-400 hover:text-slate-200"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur">
          <div className="max-h-64 overflow-y-auto p-2">
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(result)}
                className="w-full rounded-lg border border-slate-800 bg-slate-800/60 px-4 py-3 text-left transition-colors hover:bg-slate-800"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-100">{result.name}</div>
                    {result.category && (
                      <div className="mt-0.5 text-xs text-slate-400">{result.category}</div>
                    )}
                    <div className="mt-1 text-xs text-slate-500">
                      {result.type === "facility" && "📍 Fasilitas"}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-slate-800 bg-slate-900/95 p-4 text-center text-sm text-slate-400">
          Tidak ditemukan
        </div>
      )}
    </div>
  );
}

