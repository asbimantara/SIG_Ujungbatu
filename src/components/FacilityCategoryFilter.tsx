"use client";

import { useState } from "react";

type FacilityCategoryFilterProps = {
  facilityCategories: Record<string, boolean>;
  setFacilityCategories: (categories: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  activeFacilities: boolean;
  setActiveFacilities: (active: boolean) => void;
  onResetHighlight?: () => void;
};

export function FacilityCategoryFilter({
  facilityCategories,
  setFacilityCategories,
  activeFacilities,
  setActiveFacilities,
  onResetHighlight,
}: FacilityCategoryFilterProps) {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [warningCategory, setWarningCategory] = useState<string | null>(null);

  const handleCategoryToggle = (category: string, checked: boolean) => {
    if (activeFacilities) {
      setWarningMessage("Harap uncentang dulu fasilitas");
      setWarningCategory(category);
      setTimeout(() => {
        setWarningMessage(null);
        setWarningCategory(null);
      }, 3000);
      return;
    }

    setWarningMessage(null);
    setWarningCategory(null);
    
    // Reset highlight ketika kategori diubah
    if (onResetHighlight) {
      onResetHighlight();
    }
    
    setFacilityCategories((prev) => ({
      ...prev,
      [category]: checked,
    }));
    
    // Jika ada kategori yang terceklis, uncheck facilities
    if (checked) {
      setActiveFacilities(false);
    }
  };

  return (
    <div className="glass rounded-xl border border-slate-800 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">Filter Per Kategori</h3>
        <span className="text-xs text-slate-400">
          {activeFacilities ? "Semua fasilitas ditampilkan" : "Pilih kategori"}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(facilityCategories).map((category) => (
          <div key={category} className="relative">
            <label
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-colors ${
                activeFacilities
                  ? "border-slate-700 bg-slate-800/30 text-slate-500 opacity-60"
                  : facilityCategories[category]
                  ? "border-indigo-500 bg-indigo-500/20 text-indigo-300 cursor-pointer"
                  : "border-slate-700 bg-slate-800/50 text-slate-300 cursor-pointer hover:border-slate-600 hover:bg-slate-800"
              }`}
              onClick={(e) => {
                // Jika disabled, prevent label dari mengaktifkan checkbox
                if (activeFacilities) {
                  e.preventDefault();
                }
              }}
            >
              <div
                className={`relative ${activeFacilities ? "cursor-not-allowed" : ""}`}
                style={{ display: "inline-block", minWidth: "14px", minHeight: "14px" }}
                onMouseDown={(e) => {
                  // Jika disabled dan user klik area checkbox, trigger warning
                  if (activeFacilities && !facilityCategories[category]) {
                    e.preventDefault();
                    e.stopPropagation();
                    setWarningMessage("Harap uncentang dulu fasilitas");
                    setWarningCategory(category);
                    setTimeout(() => {
                      setWarningMessage(null);
                      setWarningCategory(null);
                    }, 3000);
                  }
                }}
                onClick={(e) => {
                  // Jika disabled, prevent default behavior dan trigger warning
                  if (activeFacilities && !facilityCategories[category]) {
                    e.preventDefault();
                    e.stopPropagation();
                    setWarningMessage("Harap uncentang dulu fasilitas");
                    setWarningCategory(category);
                    setTimeout(() => {
                      setWarningMessage(null);
                      setWarningCategory(null);
                    }, 3000);
                  }
                }}
                onPointerDown={(e) => {
                  // PointerDown lebih reliable untuk disabled elements
                  if (activeFacilities && !facilityCategories[category]) {
                    e.preventDefault();
                    e.stopPropagation();
                    setWarningMessage("Harap uncentang dulu fasilitas");
                    setWarningCategory(category);
                    setTimeout(() => {
                      setWarningMessage(null);
                      setWarningCategory(null);
                    }, 3000);
                  }
                }}
              >
                <input
                  type="checkbox"
                  className={`h-3.5 w-3.5 accent-indigo-400 ${
                    activeFacilities ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"
                  }`}
                  checked={facilityCategories[category]}
                  disabled={activeFacilities}
                  onChange={(e) => {
                    if (!activeFacilities) {
                      handleCategoryToggle(category, e.target.checked);
                    }
                  }}
                />
              </div>
              <span className={activeFacilities ? "" : "cursor-pointer"}>{category}</span>
            </label>
            {activeFacilities &&
              warningMessage &&
              warningMessage.includes("Harap uncentang") &&
              warningCategory === category && (
                <div className="absolute left-0 top-full mt-1 z-[100] rounded-lg bg-red-600 text-white text-xs px-2 py-1.5 shadow-xl whitespace-nowrap border border-red-700">
                  {warningMessage}
                  <div className="absolute -top-1 left-4 w-2 h-2 bg-red-600 rotate-45 border-l border-t border-red-700"></div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

