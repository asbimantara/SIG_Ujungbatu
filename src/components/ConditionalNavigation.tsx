"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Jangan tampilkan Navigation di halaman admin dan welcome (/)
  if (pathname?.startsWith("/admin") || pathname === "/") {
    return null;
  }
  
  // Navigation tidak sticky, hanya untuk halaman publik
  return (
    <div className="mx-auto max-w-7xl px-6 pt-6">
      <Navigation />
    </div>
  );
}
