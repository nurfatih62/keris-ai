"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { ContentStatusBadge } from "@/components/content-status";
import { formatDate, formatPercent } from "@/lib/format";
import {
  isInGallery,
  saveToGallery,
  type ScanRecord,
} from "@/lib/storage/scan-store";

const partLabels: Record<string, string> = {
  bilah: "Bilah",
  luk: "Luk",
  pamor: "Pamor",
  hulu: "Hulu",
  warangka: "Warangka",
  mendak: "Mendak",
  ganja: "Ganja",
};

const resultSections = [
  "Nama atau jenis keris",
  "Asal daerah atau gaya",
  "Bentuk bilah dan jumlah luk",
  "Identifikasi ornamen",
  "Penjelasan bagian-bagian",
  "Makna filosofis dan nilai budaya",
];

function ConfidenceRing({ value }: { value: number }) {
  const clamped = Math.min(0.99, Math.max(0, value));
  return (
    <div
      className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#c4923a ${clamped * 360}deg, #e9d7b8 0deg)`,
      }}
      role="img"
      aria-label={`Skor keyakinan ${formatPercent(clamped)}`}
    >
      <div className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full bg-parchment">
        <span className="font-serif text-2xl font-bold text-sepia-950">
          {formatPercent(clamped)}
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-sepia-500">
          keyakinan
        </span>
      </div>
    </div>
  );
}

function InfoCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-sepia-200 bg-white/80 p-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sepia-900 text-xs font-bold text-gold-300">
          {number}
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-sepia-600">
          {title}
        </h3>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-sepia-800">{children}</div>
    </section>
  );
}

export function ResultView({
  record,
  origin = "hasil",
}: {
  record: ScanRecord;
  origin?: "hasil" | "galeri";
}) {
  const { hasil: result } = record;
  const keris = result.keris;
  const [saved, setSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setSaved(isInGallery(record.id));
    } catch (error) {
      console.warn("Galeri tidak dapat diperiksa", error);
    }
  }, [record.id]);

  function handleSave() {
    setSaveError(null);
    setSaveMessage(null);
    try {
      const outcome = saveToGallery(record);
      setSaved(true);
      setSaveMessage(
        outcome.imageDropped
          ? "Hasil tersimpan, tetapi gambar tidak dapat disimpan karena ruang penyimpanan penuh."
          : "Hasil berhasil disimpan ke galeri di perangkat ini.",
      );
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Hasil gagal disimpan. Coba lagi atau hapus riwayat lama.",
      );
    }
  }

  const qualityTone =
    result.kualitas.status === "baik"
      ? "text-emerald-700"
      : result.kualitas.status === "cukup"
        ? "text-amber-700"
        : "text-red-700";

  return (
    <div className="animate-fade">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">{origin === "galeri" ? "Galeri" : "Hasil Identifikasi"}</p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            {keris ? keris.nama : "Objek belum dikenali"}
          </h1>
          <p className="mt-1 text-sm text-sepia-600">
            Dipindai {formatDate(record.dibuatPada)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={origin === "galeri" ? "/galeri" : "/scan"} className="btn-secondary !min-h-10 !py-2 text-xs">
            {origin === "galeri" ? "Kembali ke Galeri" : "Scan Lagi"}
          </Link>
          {keris ? (
            <Link href={`/keris/${keris.slug}`} className="btn-ghost !min-h-10 border border-sepia-200 !py-2 text-xs">
              Detail Keris →
            </Link>
          ) : null}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-gold-500/40 bg-gold-300/10 p-3 text-xs leading-relaxed text-sepia-800">
        <span className="font-bold">Mode demo.</span> {result.hasil.catatan}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <section className="card flex flex-col overflow-hidden !p-0" aria-label="Foto yang dianalisis">
          {record.gambarDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={record.gambarDataUrl}
              alt={`Foto keris ${keris?.nama ?? "yang dianalisis"}`}
              className="max-h-[440px] w-full bg-sepia-950 object-contain"
            />
          ) : (
            <div className="flex min-h-[260px] flex-1 items-center justify-center bg-sepia-950 text-gold-300">
              <div className="text-center">
                <BrandMark className="mx-auto h-24 w-24 opacity-80" />
                <p className="mt-3 text-xs text-sepia-400">Gambar tidak tersimpan</p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-sepia-200 bg-white/80 px-4 py-3 text-xs">
            <span className={`font-semibold ${qualityTone}`}>
              Kualitas gambar: {result.kualitas.status}
            </span>
            <span className="text-sepia-500">
              {result.kualitas.lebar} × {result.kualitas.tinggi} px
            </span>
          </div>
        </section>

        <section className="card flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <ContentStatusBadge status={keris?.statusKonten ?? "draf"} />
                <p className="mt-3 font-serif text-2xl font-bold text-sepia-950">
                  {keris?.nama ?? "Belum cocok dengan kategori yang didukung"}
                </p>
                <p className="mt-1 text-sm text-sepia-600">
                  {keris?.asalDaerah ?? "Coba foto lain dengan pencahayaan dan sudut yang lebih baik."}
                </p>
              </div>
              <ConfidenceRing value={result.hasil.skorKeyakinan} />
            </div>

            {result.hasil.tidakDikenali ? (
              <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">Keyakinan model rendah</p>
                <p className="mt-1 leading-relaxed">
                  Objek mungkin bukan keris, kualitas foto kurang, atau jenisnya belum
                  termasuk kategori yang didukung. Periksa kemungkinan di bawah dan
                  pertimbangkan mengambil foto ulang.
                </p>
              </div>
            ) : null}

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-sepia-500">
                <span>Label prediksi</span>
                <span>{result.hasil.model}</span>
              </div>
              <p className="mt-1 rounded-lg bg-sepia-50 px-3 py-2 font-mono text-xs text-sepia-800">
                {result.hasil.nama} · {formatPercent(result.hasil.skorKeyakinan)}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-sepia-500">
                Kemungkinan lain
              </p>
              <ul className="mt-2 space-y-2">
                {result.hasil.kandidat.map((candidate) => (
                  <li key={candidate.slug} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 truncate text-xs text-sepia-700">
                      {candidate.nama}
                    </span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-sepia-200">
                      <span
                        className="block h-full rounded-full bg-gold-500"
                        style={{ width: `${Math.max(3, candidate.skor * 100)}%` }}
                      />
                    </span>
                    <span className="w-9 text-right text-[11px] tabular-nums text-sepia-600">
                      {formatPercent(candidate.skor)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] leading-relaxed text-sepia-500">
                Ambang &quot;tidak dikenali&quot;: {formatPercent(result.hasil.ambangKeyakinan)}.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              type="button"
              className="btn-primary w-full"
              onClick={handleSave}
              disabled={saved}
            >
              {saved ? "Tersimpan di Galeri" : "Simpan ke Galeri"}
            </button>
            {saveMessage ? (
              <p className="text-xs text-emerald-700" role="status">
                {saveMessage}{" "}
                {saved ? (
                  <Link href="/galeri" className="font-semibold underline">
                    Buka galeri
                  </Link>
                ) : null}
              </p>
            ) : null}
            {saveError ? (
              <p className="text-xs text-red-700" role="alert">
                {saveError}
              </p>
            ) : null}
            <p className="text-[11px] leading-relaxed text-sepia-500">
              Hasil disimpan lokal di browser perangkat ini. Riwayat akan hilang jika
              data situs dibersihkan.
            </p>
          </div>
        </section>
      </div>

      {keris ? (
        <>
          <section className="mt-10" aria-labelledby="komponen-hasil">
            <p className="eyebrow">Enam komponen</p>
            <h2 id="komponen-hasil" className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
              Rincian identifikasi
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <InfoCard number={1} title={resultSections[0] ?? ""}>
                <p className="font-serif text-xl font-bold text-sepia-950">{keris.nama}</p>
                <p className="mt-1 text-xs text-sepia-500">Label model: {keris.kategori}</p>
              </InfoCard>
              <InfoCard number={2} title={resultSections[1] ?? ""}>
                {keris.asalDaerah}
              </InfoCard>
              <InfoCard number={3} title={resultSections[2] ?? ""}>
                <p>{keris.bentukBilah}</p>
                <p className="mt-2 text-xs text-sepia-600">{keris.keteranganLuk}</p>
              </InfoCard>
              <InfoCard number={4} title={resultSections[3] ?? ""}>
                <ul className="flex flex-wrap gap-2">
                  {keris.ornamen.map((ornamen) => (
                    <li key={ornamen} className="chip">{ornamen}</li>
                  ))}
                </ul>
              </InfoCard>
              <InfoCard number={5} title={resultSections[4] ?? ""}>
                <div className="space-y-2">
                  {Object.entries(keris.bagian).map(([key, description]) => (
                    <details key={key} className="group rounded-lg bg-sepia-50 px-3 py-2">
                      <summary className="cursor-pointer list-none text-sm font-semibold text-sepia-900 marker:hidden">
                        <span className="flex items-center justify-between gap-2">
                          {partLabels[key] ?? key}
                          <span className="text-gold-600 transition group-open:rotate-45" aria-hidden="true">+</span>
                        </span>
                      </summary>
                      <p className="mt-1.5 text-xs leading-relaxed text-sepia-600">{description}</p>
                    </details>
                  ))}
                </div>
              </InfoCard>
              <InfoCard number={6} title={resultSections[5] ?? ""}>
                <p>{keris.maknaFilosofis}</p>
                <p className="mt-3 border-t border-sepia-200 pt-3 text-xs leading-relaxed text-sepia-600">
                  <span className="font-semibold text-sepia-800">Nilai budaya: </span>
                  {keris.nilaiBudaya}
                </p>
              </InfoCard>
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-2" aria-label="Catatan kualitas dan sumber">
            <div className="card">
              <h2 className="font-serif text-lg font-bold text-sepia-950">Catatan kualitas gambar</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-sepia-700">
                {result.kualitas.catatan.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 className="font-serif text-lg font-bold text-sepia-950">Sumber konten</h2>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-sepia-600">
                {keris.sumberReferensi.map((source) => (
                  <li key={source} className="flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-sepia-500">
                Halaman sumber masih perlu dilengkapi dan diverifikasi pakar (T2.6).
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="mt-8 rounded-2xl border border-sepia-200 bg-white/80 p-6">
          <h2 className="font-serif text-xl font-bold">Belum ada kecocokan kategori</h2>
          <p className="mt-2 text-sm leading-relaxed text-sepia-700">
            Sistem hanya mendukung {result.hasil.kandidat.length > 0 ? "kategori awal" : "kategori"}
            yang ada pada katalog. Coba foto ulang dengan seluruh bilah terlihat, atau
            jelajahi jenis keris yang tersedia.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/scan" className="btn-primary !min-h-10 !py-2 text-xs">Coba Scan Ulang</Link>
            <Link href="/keris" className="btn-secondary !min-h-10 !py-2 text-xs">Jelajahi Jenis Keris</Link>
          </div>
        </section>
      )}

      <section className="mt-8 rounded-2xl border border-sepia-200 bg-sepia-100/70 p-5 text-xs leading-relaxed text-sepia-700">
        <p className="font-semibold text-sepia-900">Disclaimer</p>
        <p className="mt-1.5">
          Hasil identifikasi merupakan perkiraan berbasis gambar dan tidak dapat
          dijadikan dasar untuk menilai keaslian, harga, atau nilai ekonomi keris. Konten
          budaya pada versi ini berstatus draf dan belum diverifikasi pakar. Untuk
          keputusan penting, konsultasikan dengan ahli atau narasumber yang kompeten.
        </p>
      </section>
    </div>
  );
}
