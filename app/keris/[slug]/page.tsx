import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BrandMark } from "@/components/brand-mark";
import { ContentStatusBadge } from "@/components/content-status";
import { getKerisBySlug, kerisEntries } from "@/lib/data/catalog";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return kerisEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getKerisBySlug(slug);
  if (!entry) return { title: "Jenis Keris Tidak Ditemukan" };
  return {
    title: entry.nama,
    description: `${entry.nama} — ${entry.asalDaerah}. ${entry.bentukBilah}`,
  };
}

const partLabels: Record<string, string> = {
  bilah: "Bilah",
  luk: "Luk",
  pamor: "Pamor",
  hulu: "Hulu",
  warangka: "Warangka",
  mendak: "Mendak",
  ganja: "Ganja",
};

export default async function KerisDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getKerisBySlug(slug);
  if (!entry) notFound();

  return (
    <div className="container-page py-8 sm:py-12">
      <nav aria-label="Remah roti" className="text-xs text-sepia-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-sepia-900">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/keris" className="hover:text-sepia-900">Jenis Keris</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-sepia-800" aria-current="page">{entry.nama}</li>
        </ol>
      </nav>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <ContentStatusBadge status={entry.statusKonten} />
            <span className="chip !text-[10px]">{entry.kategori}</span>
          </div>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            {entry.nama}
          </h1>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-gold-700">
            {entry.asalDaerah}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-sepia-700 sm:text-base">
            {entry.bentukBilah}
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-sepia-200 bg-sepia-950">
            <div className="batik-pattern relative flex min-h-56 items-center justify-center p-8">
              <BrandMark className="h-40 w-40 text-gold-300/80" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-sepia-800 bg-sepia-900 px-4 py-3 text-[11px] text-sepia-400">
              <span>Gambar referensi belum tersedia</span>
              <span>Menunggu aset berlisensi (T1.1)</span>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-sepia-200 bg-white/70 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-sepia-500">Jumlah luk</p>
              <p className="mt-1 font-serif text-lg font-bold text-sepia-950">
                {entry.jumlahLuk === null ? "Bervariasi" : entry.jumlahLuk}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-sepia-500">{entry.keteranganLuk}</p>
            </div>
            <div className="rounded-xl border border-sepia-200 bg-white/70 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-sepia-500">Ornamen umum</p>
              <p className="mt-1 font-serif text-lg font-bold text-sepia-950">{entry.ornamen.length} jenis</p>
              <p className="mt-1 text-[11px] leading-relaxed text-sepia-500">
                {entry.ornamen.join(", ")}
              </p>
            </div>
            <div className="rounded-xl border border-sepia-200 bg-white/70 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-sepia-500">Bagian dibahas</p>
              <p className="mt-1 font-serif text-lg font-bold text-sepia-950">
                {Object.keys(entry.bagian).length} bagian
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-sepia-500">
                Dari bilah hingga warangka.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <section aria-labelledby="bagian-keris">
              <h2 id="bagian-keris" className="font-serif text-2xl font-bold text-sepia-950">
                Bagian-bagian keris
              </h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {Object.entries(entry.bagian).map(([key, description]) => (
                  <article key={key} className="rounded-xl border border-sepia-200 bg-white/70 p-4">
                    <h3 className="text-sm font-bold text-sepia-900">{partLabels[key] ?? key}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-sepia-600">{description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="makna" className="rounded-2xl border border-gold-500/30 bg-gold-300/10 p-5 sm:p-6">
              <h2 id="makna" className="font-serif text-2xl font-bold text-sepia-950">
                Makna filosofis
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-sepia-700 sm:text-base">
                {entry.maknaFilosofis}
              </p>
              <p className="mt-3 rounded-lg border border-sepia-200 bg-white/60 p-3 text-[11px] leading-relaxed text-sepia-500">
                Disampaikan sebagai perspektif tradisional. Makna dapat berbeda antar
                daerah, komunitas, dan konteks.
              </p>
            </section>

            <section aria-labelledby="nilai-budaya">
              <h2 id="nilai-budaya" className="font-serif text-2xl font-bold text-sepia-950">
                Nilai budaya
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-sepia-700 sm:text-base">
                {entry.nilaiBudaya}
              </p>
            </section>

            <section aria-labelledby="sumber" className="rounded-2xl border border-sepia-200 bg-white/70 p-5">
              <h2 id="sumber" className="font-serif text-xl font-bold text-sepia-950">
                Sumber referensi
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-sepia-600">
                {entry.sumberReferensi.map((source) => (
                  <li key={source} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-sepia-500">
                Daftar ini belum lengkap; nomor halaman dan nomor inventaris museum masih
                perlu dilengkapi sebelum verifikasi pakar.
              </p>
            </section>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <section className="card">
            <h2 className="font-serif text-lg font-bold text-sepia-950">Status konten</h2>
            <div className="mt-3">
              <ContentStatusBadge status={entry.statusKonten} />
            </div>
            <dl className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-sepia-500">Verifikasi pakar</dt>
                <dd className="font-semibold text-sepia-800">
                  {entry.verifikasiPakar ? "Sudah" : "Belum"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-sepia-500">Catatan pakar</dt>
                <dd className="text-right text-sepia-800">
                  {entry.catatanPakar || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-sepia-500">Dibuat</dt>
                <dd className="text-sepia-800">{formatDate(entry.dibuatPada)}</dd>
              </div>
            </dl>
            <p className="mt-3 rounded-lg bg-amber-50 p-2.5 text-[11px] leading-relaxed text-amber-800">
              Entri ini belum dapat dianggap terverifikasi. Status hanya dapat diubah
              menjadi disetujui oleh pakar (T2.6).
            </p>
          </section>

          <section className="rounded-2xl bg-sepia-900 p-5 text-sepia-100">
            <h2 className="font-serif text-lg font-bold text-sepia-50">Pindai keris Anda</h2>
            <p className="mt-2 text-sm leading-relaxed text-sepia-300">
              Gunakan foto Anda sendiri untuk melihat alur identifikasi dan enam komponen
              hasilnya.
            </p>
            <Link href="/scan" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-gold-300 px-4 py-2 text-xs font-bold text-sepia-950 hover:bg-gold-400">
              Buka AI Scanner
            </Link>
          </section>

          <section className="card">
            <h2 className="font-serif text-lg font-bold text-sepia-950">Jenis lain</h2>
            <ul className="mt-3 space-y-1.5">
              {kerisEntries
                .filter((item) => item.slug !== entry.slug)
                .map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/keris/${item.slug}`}
                      className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm text-sepia-700 transition hover:bg-sepia-50 hover:text-sepia-950"
                    >
                      <span>{item.nama}</span>
                      <span aria-hidden="true" className="text-sepia-400">→</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
