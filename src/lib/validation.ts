import { z } from "zod";

/**
 * Schema validasi untuk form fasilitas
 */
export const facilitySchema = z.object({
  name: z.string().min(1, "Nama fasilitas wajib diisi").max(200, "Nama terlalu panjang"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  alamat: z.string().optional(),
  kontak: z.string().optional(),
  jam: z.string().optional(),
  foto_url: z
    .string()
    .optional()
    .refine(
      (val) => {
        // Jika kosong, boleh
        if (!val || val.trim() === "") return true;
        // Jika ada, harus valid: URL lengkap (http/https) atau path relatif (dimulai dengan /)
        return (
          val.startsWith("http://") ||
          val.startsWith("https://") ||
          val.startsWith("/")
        );
      },
      {
        message: "URL foto harus berupa URL lengkap (http/https) atau path relatif (dimulai dengan /)",
      }
    ),
  coordinates: z.object({
    lat: z.number().min(-90).max(90, "Latitude tidak valid"),
    lng: z.number().min(-180).max(180, "Longitude tidak valid"),
  }),
});

export type FacilityFormData = z.infer<typeof facilitySchema>;

/**
 * Validasi koordinat
 */
export function validateCoordinates(lat: number, lng: number): { valid: boolean; error?: string } {
  if (isNaN(lat) || isNaN(lng)) {
    return { valid: false, error: "Koordinat harus berupa angka" };
  }
  
  if (lat < -90 || lat > 90) {
    return { valid: false, error: "Latitude harus antara -90 dan 90" };
  }
  
  if (lng < -180 || lng > 180) {
    return { valid: false, error: "Longitude harus antara -180 dan 180" };
  }
  
  return { valid: true };
}

