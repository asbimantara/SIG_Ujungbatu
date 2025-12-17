"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FacilityForm } from "@/components/admin/FacilityForm";
import { facilitySchema, type FacilityFormData } from "@/lib/validation";
import { facilities } from "@/data/sample";
import { FeatureCollection, Point } from "geojson";
import toast from "react-hot-toast";

export default function EditFacilityPage() {
  const router = useRouter();
  const params = useParams();
  const facilityId = decodeURIComponent(params.id as string);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState<FacilityFormData | null>(null);
  const [facilitiesData, setFacilitiesData] = useState<FeatureCollection<Point>>(facilities);

  useEffect(() => {
    loadFacility();
  }, [facilityId]);

  const loadFacility = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/data?layer=facilities");
      const data: FeatureCollection<Point> = await response.json();
      setFacilitiesData(data);

      // Cari facility berdasarkan ID atau name
      const facility = data.features.find(
        (f) => f.properties?.id === facilityId || f.properties?.name === facilityId
      );

      if (!facility) {
        toast.error("Fasilitas tidak ditemukan");
        router.push("/admin/facilities");
        return;
      }

      setInitialData({
        name: facility.properties?.name || "",
        category: facility.properties?.category || "",
        alamat: facility.properties?.alamat || "",
        kontak: facility.properties?.kontak || "",
        jam: facility.properties?.jam || "",
        foto_url: facility.properties?.foto_url || "",
        coordinates: {
          lat: facility.geometry.coordinates[1],
          lng: facility.geometry.coordinates[0],
        },
      });
    } catch (error) {
      console.error("Error loading facility:", error);
      toast.error("Gagal memuat data fasilitas");
      router.push("/admin/facilities");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: FacilityFormData) => {
    setIsSaving(true);

    try {
      const response = await fetch("/api/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          layer: "facilities",
          id: facilityId,
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
        throw new Error(result.error || "Gagal mengupdate fasilitas");
      }

      toast.success("Fasilitas berhasil diupdate!");
      router.push("/admin/facilities");
    } catch (error: any) {
      console.error("Error updating facility:", error);
      toast.error(error.message || "Terjadi kesalahan saat mengupdate fasilitas");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/facilities");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Memuat data...</div>
      </div>
    );
  }

  if (!initialData) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-100">Edit Fasilitas</h2>
        <p className="mt-1 text-sm text-slate-400">Ubah data fasilitas di bawah</p>
      </div>

      <div className="glass rounded-2xl border border-slate-800 p-6">
        <FacilityForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSaving}
          facilities={facilitiesData}
        />
      </div>
    </div>
  );
}

