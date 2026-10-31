import type { Metadata } from "next";

import { ScanClient } from "@/components/scanner/scan-client";

export const metadata: Metadata = {
  title: "Scan Keris",
  description:
    "Ambil foto atau unggah gambar keris untuk memperoleh perkiraan jenis, asal, ornamen, dan makna budaya.",
};

export default function ScanPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="eyebrow">AI Scanner</p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Pindai keris Anda
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-sepia-700 sm:text-base">
          Ambil foto dengan kamera atau unggah gambar dari galeri. Sistem akan
          menampilkan perkiraan jenis keris beserta penjelasan pendukungnya.
        </p>
        <div className="mt-4 rounded-xl border border-gold-500/40 bg-gold-300/10 p-3 text-xs leading-relaxed text-sepia-800">
          <span className="font-bold">Mode demo.</span> Klasifikasi belum menggunakan
          model computer vision terlatih; hasil hanya simulasi alur aplikasi dan tidak
          boleh dipakai sebagai dasar penilaian keaslian atau nilai keris.
        </div>
      </div>
      <div className="mt-8">
        <ScanClient />
      </div>
    </div>
  );
}
