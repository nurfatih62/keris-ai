"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { formatDate, formatPercent } from "@/lib/format";
import {
  deleteGalleryItem,
  getGallery,
  type ScanRecord,
} from "@/lib/storage/scan-store";

export function GalleryClient() {
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      setRecords(getGallery());
    } catch (cause) {
      console.error("Galeri gagal dibaca", cause);
      setError("Galeri tidak dapat dibaca pada browser ini.");
    } finally {
      setLoaded(true);
    }
  }, []);

  function handleDelete(id: string) {
    setError(null);
    try {
      const remaining = deleteGalleryItem(id);
      setRecords(remaining);
      setConfirmingId(null);
      setStatus("Hasil pemindaian dihapus dari galeri.");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Hasil gagal dihapus. Coba lagi.",
      );
    }
  }

  if (!loaded) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center" role="status">
        <span className="flex items-center gap-3 text-sm text-sepia-600">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-sepia-300 border-t-sepia-800" aria-hidden="true" />
          Memuat galeri…
        </span>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-sepia-200 bg-white/70 p-8 text-center sm:p-12">
        <BrandMark className="mx-auto h-24 w-24 text-sepia-800" />
        <h2 className="mt-5 font-serif text-2xl font-bold text-sepia-950">
          Galeri masih kosong
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-sepia-600">
          Hasil yang Anda simpan dari halaman identifikasi akan muncul di sini. Riwayat
          tersimpan secara lokal di browser perangkat ini.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Link href="/scan" className="btn-primary">Mulai Scan Pertama</Link>
          <Link href="/kamus" className="btn-secondary">Jelajahi Kamus</Link>
        </div>
        {error ? <p className="mt-4 text-sm text-red-700" role="alert">{error}</p> : null}
      </div>
    );
  }

  return (
    <div>
      {status ? (
        <p
          className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          role="status"
        >
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {records.map((record) => {
          const label = record.hasil.keris?.nama ?? record.hasil.hasil.nama;
          const origin = record.hasil.keris?.asalDaerah ?? "Belum dikenali";
          const isConfirming = confirmingId === record.id;
          return (
            <article
              key={record.id}
              className="group overflow-hidden rounded-2xl border border-sepia-200 bg-white/80 shadow-soft transition hover:border-gold-500/50"
            >
              <Link href={`/galeri/${record.id}`} className="block">
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-sepia-950">
                  {record.gambarDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={record.gambarDataUrl}
                      alt={`Foto ${label}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <BrandMark className="h-24 w-24 text-gold-300/80" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-sepia-950/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-300 backdrop-blur">
                    {formatPercent(record.hasil.hasil.skorKeyakinan)}
                  </span>
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/galeri/${record.id}`}>
                  <h2 className="font-serif text-lg font-bold text-sepia-950 group-hover:text-gold-700">
                    {label}
                  </h2>
                </Link>
                <p className="mt-1 line-clamp-1 text-xs text-sepia-600">{origin}</p>
                <p className="mt-2 text-[11px] text-sepia-500">{formatDate(record.dibuatPada)}</p>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-sepia-100 pt-3">
                  <Link
                    href={`/galeri/${record.id}`}
                    className="text-xs font-semibold text-sepia-800 hover:text-gold-700"
                  >
                    Lihat detail →
                  </Link>
                  {isConfirming ? (
                    <span className="flex items-center gap-1.5">
                      <button
                        type="button"
                        className="rounded-full bg-red-700 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-800"
                        onClick={() => handleDelete(record.id)}
                      >
                        Ya, hapus
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-sepia-300 px-2.5 py-1 text-[11px] font-medium text-sepia-700"
                        onClick={() => setConfirmingId(null)}
                      >
                        Batal
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="rounded-full px-2.5 py-1 text-[11px] font-medium text-sepia-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => setConfirmingId(record.id)}
                      aria-label={`Hapus hasil ${label}`}
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
