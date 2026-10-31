import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { kerisEntries } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Jenis Keris",
  description:
    "Jelajahi enam gaya keris Nusantara: Majapahit, Bali, Bugis, Minangkabau, Madura, dan Patani.",
};

export default function KerisIndexPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-3xl">
        <p className="eyebrow">Ensiklopedia</p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Jenis keris yang dipelajari
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-sepia-700 sm:text-base">
          Enam gaya awal ini menjadi cakupan sementara aplikasi. Semua entri masih
          berstatus draf, memiliki daftar sumber yang perlu dilengkapi, dan menunggu
          verifikasi pakar.
        </p>
        <p className="mt-3 rounded-xl border border-gold-500/40 bg-gold-300/10 p-3 text-xs leading-relaxed text-sepia-800">
          <span className="font-bold">ASUMSI:</span> daftar kategori ini belum disetujui
          tim (T0.3). Jumlah kategori dapat berubah setelah kebutuhan produk dan dataset
          diputuskan.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {kerisEntries.map((entry) => (
          <article
            key={entry.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-sepia-200 bg-white/80 shadow-soft transition hover:border-gold-500/50"
          >
            <Link href={`/keris/${entry.slug}`} className="block">
              <div className="relative flex h-36 items-center justify-center overflow-hidden bg-sepia-950">
                <div className="batik-pattern absolute inset-0 opacity-30" aria-hidden="true" />
                <BrandMark className="relative h-24 w-24 text-gold-300/80 transition duration-500 group-hover:scale-105" />
                <span className="absolute right-3 top-3 rounded-full border border-gold-500/40 bg-sepia-950/70 px-2.5 py-1 text-[10px] font-semibold text-gold-300 backdrop-blur">
                  Gambar segera hadir
                </span>
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <Link href={`/keris/${entry.slug}`}>
                  <h2 className="font-serif text-xl font-bold text-sepia-950 group-hover:text-gold-700">
                    {entry.nama}
                  </h2>
                </Link>
                <span className="chip !border-gold-500/40 !bg-gold-300/15 !text-[10px]">Draf</span>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-700">
                {entry.asalDaerah}
              </p>
              <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-sepia-700">
                {entry.bentukBilah}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {entry.ornamen.slice(0, 3).map((ornamen) => (
                  <span key={ornamen} className="chip !px-2 !py-0.5 !text-[10px]">
                    {ornamen}
                  </span>
                ))}
              </div>
              <Link
                href={`/keris/${entry.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-sepia-900 hover:text-gold-700"
              >
                Baca penjelasan lengkap →
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-sepia-200 bg-sepia-100/70 p-8 text-center">
        <BrandMark className="h-14 w-14 text-sepia-700" />
        <h2 className="font-serif text-2xl font-bold text-sepia-950">
          Punya foto keris?
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-sepia-600">
          Coba alur identifikasi untuk melihat perkiraan jenis dan informasi pendukungnya.
        </p>
        <Link href="/scan" className="btn-primary mt-1">Scan Keris</Link>
      </div>
    </div>
  );
}
