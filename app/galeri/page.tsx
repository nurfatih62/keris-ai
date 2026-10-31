import type { Metadata } from "next";

import { GalleryClient } from "@/components/gallery/gallery-client";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Riwayat hasil pemindaian keris yang tersimpan di perangkat Anda.",
};

export default function GalleryPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="eyebrow">Galeri</p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Riwayat pemindaian
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-sepia-700 sm:text-base">
          Kembali ke hasil identifikasi yang pernah Anda simpan. Paling banyak 30 hasil
          terbaru disimpan di browser ini.
        </p>
      </div>
      <div className="mt-8">
        <GalleryClient />
      </div>
    </div>
  );
}
