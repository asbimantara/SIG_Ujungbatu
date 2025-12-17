/**
 * Simple admin authentication
 * Untuk demo, menggunakan password sederhana
 * Untuk production, gunakan NextAuth atau sistem auth yang lebih robust
 */

const ADMIN_PASSWORD = "admin123"; // Bisa diubah via environment variable

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD || password === process.env.ADMIN_PASSWORD;
}

export function isAdminSession(session: string | null): boolean {
  // Simple session check (untuk demo)
  // Untuk production, gunakan proper session management
  return session === "admin-authenticated";
}

