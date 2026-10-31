import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Keris AI — Identifikasi dan Ensiklopedia Keris",
    short_name: "Keris AI",
    description:
      "Pindai foto keris dan pelajari jenis, asal daerah, bentuk bilah, ornamen, serta makna budayanya.",
    lang: "id",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f1e5",
    theme_color: "#3d271a",
    categories: ["education", "books", "lifestyle"],
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
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Scan Keris",
        short_name: "Scan",
        description: "Pindai foto keris",
        url: "/scan",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Kamus Keris",
        short_name: "Kamus",
        description: "Telusuri istilah keris",
        url: "/kamus",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
