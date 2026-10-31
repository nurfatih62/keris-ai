"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { ResultView } from "@/components/result/result-view";
import {
  getGalleryItem,
  getSessionScan,
  type ScanRecord,
} from "@/lib/storage/scan-store";

export function ResultLoader({
  id,
  origin = "hasil",
}: {
  id: string;
  origin?: "hasil" | "galeri";
}) {
  const [record, setRecord] = useState<ScanRecord | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setRecord(getSessionScan(id) ?? getGalleryItem(id));
    } catch (error) {
      console.warn("Hasil tidak dapat dibaca dari penyimpanan", error);
      setRecord(null);
    } finally {
      setLoaded(true);
    }
  }, [id]);

  if (!loaded) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center py-16">
        <div className="flex items-center gap-3 text-sm text-sepia-600" role="status">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-sepia-300 border-t-sepia-800" aria-hidden="true" />
          Memuat hasil…
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="container-page py-16 sm:py-24">
        <div className="mx-auto max-w-lg rounded-2xl border border-sepia-200 bg-white/80 p-8 text-center">
          <BrandMark className="mx-auto h-20 w-20 text-sepia-800" />
          <h1 className="mt-5 font-serif text-2xl font-bold text-sepia-950">
            Hasil tidak ditemukan
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-sepia-600">
            Hasil pemindaian mungkin sudah dihapus atau tersimpan di perangkat lain.
            Riwayat galeri hanya tersedia di browser tempat Anda menyimpannya.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
            <Link href="/scan" className="btn-primary">Scan Keris</Link>
            <Link href="/galeri" className="btn-secondary">Buka Galeri</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <ResultView record={record} origin={origin} />
    </div>
  );
}
