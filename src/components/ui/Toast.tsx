"use client";

import { Toaster } from "react-hot-toast";

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1e293b",
          color: "#f1f5f9",
          border: "1px solid #334155",
          borderRadius: "0.75rem",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#f1f5f9",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#f1f5f9",
          },
        },
      }}
    />
  );
}

