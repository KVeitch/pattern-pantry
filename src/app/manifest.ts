import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pattern Pantry – Sewing & Cosplay Pattern Manager",
    short_name: "Pattern Pantry",
    description: "Track your sewing patterns, fabrics, and pattern covers.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fa",
    theme_color: "#1976d2",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["lifestyle", "productivity"],
  };
}
