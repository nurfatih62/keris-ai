import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { kerisEntries, kamusEntries } from "@/lib/data/catalog";

const features = [
  {
    href: "/scan",
    title: "AI Scanner",
    description:
      "Ambil foto langsung dari kamera atau unggah gambar dari galeri. Dapatkan perkiraan jenis, asal, ornamen, dan bagian keris.",
    label: "Mulai pindai",
    icon: (
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M8 12h8" />
    ),
  },
  {
    href: "/kamus",
    title: "Kamus Keris",
    description:
      "Telusuri istilah, bentuk, ornamen, bagian, dan filosofi keris dalam satu tempat dengan status konten yang transparan.",
    label: "Buka kamus",
    icon: (
      <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Zm0 14h13M9 8h5M9 12h5" />
    ),
  },
  {
    href: "/galeri",
    title: "Galeri Pribadi",
    description:
      "Simpan riwayat hasil pemindaian di perangkat ini, lalu buka kembali kapan saja untuk membaca ulang penjelasannya.",
    label: "Lihat galeri",
    icon: (
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm0 10 4.5-4.5 3 3L14 12l4 4" />
    ),
  },
];

export default function HomePage() {
  return (
    <div className="animate-fade">
      <section className="container-page pt-8 sm:pt-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-sepia-950 text-sepia-50 shadow-soft">
          <div className="batik-pattern absolute inset-0 opacity-40" aria-hidden="true" />
          <div
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-14">
            <div>
              <p className="eyebrow !text-gold-300">Ensiklopedia visual Nusantara</p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Mengenal keris, satu bilah demi satu.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-sepia-200 sm:text-lg">
                Pindai foto keris untuk memperoleh perkiraan jenis, asal daerah,
                bentuk bilah, ornamen, dan makna budayanya. Semua dalam satu aplikasi
                pembelajaran yang mudah dipakai.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/scan"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-300 px-7 py-3 text-sm font-bold text-sepia-950 transition hover:bg-gold-400"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M8 12h8" />
                  </svg>
                  Pindai Keris
                </Link>
                <Link
                  href="/kamus"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-sepia-500 px-7 py-3 text-sm font-semibold text-sepia-100 transition hover:border-gold-300 hover:text-gold-300"
                >
                  Jelajahi Kamus
                </Link>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-sepia-400">
                Mode demo: klasifikasi memakai klasifier sementara, bukan model AI
                terlatih. Hasil selalu berupa perkiraan.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div className="rounded-[1.75rem] border border-sepia-700/80 bg-sepia-900/70 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-300">
                    Lembar pengenalan
                  </span>
                  <span className="rounded-full border border-gold-500/40 px-2.5 py-0.5 text-[10px] text-gold-300">
                    Draf
                  </span>
                </div>
                <div className="my-7 flex items-center justify-center rounded-2xl border border-sepia-700 bg-sepia-950/80 py-8">
                  <BrandMark className="h-44 w-44 text-gold-300/90" />
                </div>
                <dl className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-sepia-800/60 px-2 py-3">
                    <dt className="text-[10px] uppercase tracking-wide text-sepia-400">Kategori</dt>
                    <dd className="mt-1 font-serif text-xl font-bold text-gold-300">
                      {kerisEntries.length}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-sepia-800/60 px-2 py-3">
                    <dt className="text-[10px] uppercase tracking-wide text-sepia-400">Istilah</dt>
                    <dd className="mt-1 font-serif text-xl font-bold text-gold-300">
                      {kamusEntries.length}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-sepia-800/60 px-2 py-3">
                    <dt className="text-[10px] uppercase tracking-wide text-sepia-400">Komponen</dt>
                    <dd className="mt-1 font-serif text-xl font-bold text-gold-300">6</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20" aria-labelledby="fitur-utama">
        <div className="max-w-2xl">
          <p className="eyebrow">Fitur utama</p>
          <h2 id="fitur-utama" className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Dari foto menjadi pengetahuan budaya.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sepia-700 sm:text-base">
            Tiga pintu masuk untuk mengenal keris: memindai, membaca, dan menyimpan
            catatan perjalanan Anda.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group card flex flex-col transition hover:-translate-y-1 hover:border-gold-500/60 hover:bg-white"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sepia-900 text-gold-300">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {feature.icon}
                </svg>
              </span>
              <h3 className="mt-5 font-serif text-xl font-bold text-sepia-950">
                {feature.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sepia-700">
                {feature.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sepia-900 group-hover:text-gold-600">
                {feature.label}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-sepia-200 bg-sepia-100/70 py-14 sm:py-20" aria-labelledby="kategori">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Kategori awal</p>
              <h2 id="kategori" className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Enam gaya keris untuk dipelajari.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sepia-700 sm:text-base">
                Daftar ini bersifat sementara (<span className="font-semibold">ASUMSI</span>)
                dan menunggu persetujuan tim. Setiap entri masih berstatus draf.
              </p>
            </div>
            <Link href="/keris" className="btn-secondary shrink-0">
              Lihat semua jenis
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kerisEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/keris/${entry.slug}`}
                className="group rounded-2xl border border-sepia-200 bg-white/70 p-5 transition hover:border-gold-500/60 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg font-bold text-sepia-950 group-hover:text-gold-700">
                    {entry.nama}
                  </h3>
                  <span className="chip !border-gold-500/30 !bg-gold-300/15 !text-[10px]">
                    Draf
                  </span>
                </div>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gold-700">
                  {entry.asalDaerah}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-sepia-700">
                  {entry.bentukBilah}
                </p>
                <span className="mt-4 inline-flex text-xs font-semibold text-sepia-800 group-hover:text-gold-700">
                  Baca detail →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-20" aria-labelledby="cara-kerja">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow">Cara kerja</p>
            <h2 id="cara-kerja" className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Tiga langkah, tanpa ribet.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-sepia-700 sm:text-base">
              Aplikasi memandu pengambilan foto, memvalidasi gambar di server, lalu
              menampilkan hasil beserta konteks budayanya.
            </p>
            <div className="mt-6 rounded-2xl border border-sepia-200 bg-white/70 p-5">
              <p className="text-sm font-semibold text-sepia-900">Tips foto yang baik</p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-sepia-700">
                <li className="flex gap-2"><span aria-hidden="true">•</span> Gunakan cahaya alami yang lembut.</li>
                <li className="flex gap-2"><span aria-hidden="true">•</span> Ambil dari beberapa sudut, termasuk tampak samping.</li>
                <li className="flex gap-2"><span aria-hidden="true">•</span> Pastikan bilah dan hulu terlihat utuh.</li>
                <li className="flex gap-2"><span aria-hidden="true">•</span> Hindari latar belakang yang terlalu ramai.</li>
              </ul>
            </div>
          </div>
          <ol className="space-y-4">
            {[
              {
                title: "Ambil atau unggah foto",
                body: "Gunakan kamera perangkat atau pilih gambar dari galeri. Format JPEG, PNG, dan WebP didukung dengan batas 8 MB.",
              },
              {
                title: "Analisis gambar",
                body: "Server memeriksa format, ukuran, dan dimensi gambar sebelum menjalankan klasifikasi. Bila keyakinan rendah, beberapa kemungkinan ditampilkan.",
              },
              {
                title: "Baca dan simpan hasil",
                body: "Pelajari enam komponen hasil identifikasi, buka detail jenis keris, lalu simpan hasil ke galeri pribadi di perangkat.",
              },
            ].map((step, index) => (
              <li key={step.title} className="card flex gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-500/50 font-serif text-lg font-bold text-gold-700">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-sepia-950">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-sepia-700">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page pb-16" aria-labelledby="etika">
        <div className="rounded-2xl border border-gold-500/40 bg-gold-300/10 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sepia-900 text-gold-300" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3 3.5 7v5c0 5 3.5 8 8.5 9 5-1 8.5-4 8.5-9V7L12 3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div>
              <h2 id="etika" className="font-serif text-xl font-bold text-sepia-950">
                Menghormati warisan budaya
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-sepia-700">
                Makna filosofis keris disampaikan sebagai perspektif tradisional, bukan
                kebenaran tunggal. Konten budaya pada versi ini masih berstatus draf dan
                belum diverifikasi pakar. Aplikasi tidak memberi klaim keaslian, harga,
                atau nilai ekonomi keris.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
