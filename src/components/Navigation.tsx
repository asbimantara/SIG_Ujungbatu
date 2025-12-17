"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Cek apakah user adalah admin
    const session = localStorage.getItem("admin-session");
    setIsAdmin(session === "authenticated");
  }, []);

  const navItems = [
    { href: "/peta", label: "Peta" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="glass rounded-2xl border border-slate-800 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-100">SIG Desa Ujungbatu</div>
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-slate-800 text-slate-100"
                  : "text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* Tombol Admin hanya untuk admin yang sudah login */}
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-lg border border-indigo-600 bg-indigo-600/20 px-3 py-1.5 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-600/30"
            >
              🔐 Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

