import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] items-center justify-center py-16">
      <div className="max-w-lg text-center">
        <BrandMark className="mx-auto h-24 w-24 text-sepia-800" />
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-sepia-950">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-sepia-600">
          Tautan mungkin sudah berubah atau halaman belum tersedia. Kembali ke beranda
          untuk melanjutkan menjelajah.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/" className="btn-primary">Kembali ke Beranda</Link>
          <Link href="/scan" className="btn-secondary">Scan Keris</Link>
        </div>
      </div>
    </div>
  );
}
