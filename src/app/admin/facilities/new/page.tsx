"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FacilityForm } from "@/components/admin/FacilityForm";
import { type FacilityFormData } from "@/lib/validation";
import { FeatureCollection, Point } from "geojson";
import toast from "react-hot-toast";

export default function NewFacilityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [facilitiesData, setFacilitiesData] = useState<FeatureCollection<Point>>({ type: "FeatureCollection", features: [] });

  useEffect(() => {
    // Load facilities dari API untuk mendapatkan data terbaru
    fetch("/api/data?layer=facilities")
      .then((res) => res.json())
      .then((data) => {
        if (data.features) {
          setFacilitiesData(data);
        }
      })
      .catch((err) => {
        console.error("Error loading facilities:", err);
      });
  }, []);

  const handleSubmit = async (data: FacilityFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          layer: "facilities",
          data: {
            name: data.name,
            category: data.category,
            alamat: data.alamat || "",
            kontak: data.kontak || "",
            jam: data.jam || "",
            foto_url: data.foto_url || "",
            coordinates: data.coordinates,
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal menambahkan fasilitas");
      }

      toast.success("Fasilitas berhasil ditambahkan!");
      router.push("/admin/facilities");
    } catch (error: any) {
      console.error("Error creating facility:", error);
      toast.error(error.message || "Terjadi kesalahan saat menambahkan fasilitas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/facilities");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-100">Tambah Fasilitas Baru</h2>
        <p className="mt-1 text-sm text-slate-400">Isi form di bawah untuk menambahkan fasilitas baru</p>
      </div>

      <div className="glass rounded-2xl border border-slate-800 p-6">
        <FacilityForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          facilities={facilitiesData}
        />
      </div>
    </div>
  );
}

