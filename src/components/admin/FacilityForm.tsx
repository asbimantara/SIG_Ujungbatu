"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { facilitySchema, type FacilityFormData } from "@/lib/validation";
import { AdminMapView } from "./AdminMapView";
import { FeatureCollection, Point } from "geojson";
import toast from "react-hot-toast";

const categories = [
  "Pendidikan",
  "Keagamaan",
  "Kesehatan",
  "Belanja",
  "Olahraga",
  "Pemerintahan",
  "Rekreasi",
  "Wisata",
  "Jasa",
  "Akomodasi",
  "Infrastruktur",
  "Kuliner",
  "Makam",
  "Fasilitas Umum",
];

type FacilityFormProps = {
  initialData?: {
    id?: string;
    name: string;
    category: string;
    alamat?: string;
    kontak?: string;
    jam?: string;
    foto_url?: string;
    coordinates: { lat: number; lng: number };
  };
  onSubmit: (data: FacilityFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  facilities?: FeatureCollection<Point>;
};

export function FacilityForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  facilities,
}: FacilityFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.foto_url || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FacilityFormData>({
    resolver: zodResolver(facilitySchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      alamat: "",
      kontak: "",
      jam: "",
      foto_url: "",
      coordinates: { lat: -6.5810, lng: 110.648 },
    },
  });

  const coordinates = watch("coordinates");

  // Set preview jika ada initialData
  useEffect(() => {
    if (initialData?.foto_url) {
      setPreviewImage(initialData.foto_url);
    }
  }, [initialData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Upload file
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengupload file");
      }

      // Set foto_url dengan path yang dikembalikan
      setValue("foto_url", result.url, { shouldValidate: true });
      setPreviewImage(result.url);
      toast.success("File berhasil diupload!");
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error.message || "Gagal mengupload file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleMapClick = (coords: { lat: number; lng: number }) => {
    setValue("coordinates", coords, { shouldValidate: true });
  };

  const handleManualCoordinateChange = (
    type: "lat" | "lng",
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const current = coordinates || { lat: -6.5810, lng: 110.648 };
      setValue(
        "coordinates",
        {
          ...current,
          [type]: numValue,
        },
        { shouldValidate: true }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nama */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
          Nama Fasilitas <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Contoh: Masjid Baitussalam"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Kategori */}
      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-300">
          Kategori <span className="text-red-400">*</span>
        </label>
        <select
          id="category"
          {...register("category")}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="">Pilih kategori</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-400">{errors.category.message}</p>
        )}
      </div>

      {/* Alamat */}
      <div>
        <label htmlFor="alamat" className="mb-2 block text-sm font-medium text-slate-300">
          Alamat
        </label>
        <textarea
          id="alamat"
          {...register("alamat")}
          rows={2}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Contoh: Jl. Sidik Harun, Ujungbatu III..."
        />
      </div>

      {/* Kontak & Jam */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="kontak" className="mb-2 block text-sm font-medium text-slate-300">
            Kontak
          </label>
          <input
            type="text"
            id="kontak"
            {...register("kontak")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Contoh: 081234567890"
          />
        </div>
        <div>
          <label htmlFor="jam" className="mb-2 block text-sm font-medium text-slate-300">
            Jam Operasional
          </label>
          <input
            type="text"
            id="jam"
            {...register("jam")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Contoh: 08:00 - 17:00"
          />
        </div>
      </div>

      {/* Foto - Upload File */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Foto
        </label>
        
        <div className="space-y-3">
          <div>
            <input
              type="file"
              id="file_upload"
              ref={fileInputRef}
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file_upload"
              className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-700 bg-slate-800/50 px-4 py-6 text-sm text-slate-300 transition-colors hover:border-indigo-500 hover:bg-slate-800"
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-transparent"></span>
                  Mengupload...
                </span>
              ) : (
                <span>📁 Klik untuk pilih file gambar (JPG, PNG, WEBP, GIF - max 5MB)</span>
              )}
            </label>
          </div>
          
          {/* Preview gambar yang diupload */}
          {previewImage && (
            <div className="relative">
              <img
                src={previewImage}
                alt="Preview"
                className="h-48 w-full rounded-lg border border-slate-700 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setValue("foto_url", "");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="absolute right-2 top-2 rounded-full bg-red-600 p-1.5 text-white transition-colors hover:bg-red-500"
                title="Hapus gambar"
              >
                ✕
              </button>
            </div>
          )}
        </div>
        
        {/* Hidden input untuk foto_url (akan diisi otomatis setelah upload) */}
        <input type="hidden" {...register("foto_url")} />
        {errors.foto_url && (
          <p className="mt-1 text-sm text-red-400">{errors.foto_url.message}</p>
        )}
      </div>

      {/* Koordinat */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Koordinat <span className="text-red-400">*</span>
        </label>
        <div className="mb-3">
          <AdminMapView
            coordinates={coordinates}
            onCoordinatesChange={handleMapClick}
            facilities={facilities}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="lat" className="mb-1 block text-xs text-slate-400">
              Latitude
            </label>
            <input
              type="number"
              id="lat"
              step="0.000001"
              value={coordinates?.lat || ""}
              onChange={(e) => handleManualCoordinateChange("lat", e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="-6.5810"
            />
          </div>
          <div>
            <label htmlFor="lng" className="mb-1 block text-xs text-slate-400">
              Longitude
            </label>
            <input
              type="number"
              id="lng"
              step="0.000001"
              value={coordinates?.lng || ""}
              onChange={(e) => handleManualCoordinateChange("lng", e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="110.648"
            />
          </div>
        </div>
        {errors.coordinates && (
          <p className="mt-1 text-sm text-red-400">
            {errors.coordinates.lat?.message || errors.coordinates.lng?.message}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Menyimpan..." : initialData ? "Update" : "Simpan"}
        </button>
      </div>
    </form>
  );
}

