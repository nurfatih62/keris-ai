# Keris AI

Aplikasi edukasi budaya untuk memindai foto keris dan mempelajari jenis, asal daerah,
bentuk bilah, ornamen, bagian, serta makna budayanya.

> **Status: mode demo.** Klasifikasi gambar saat ini memakai klasifier sementara
> (`mock-heuristic-v0.1`), bukan model computer vision terlatih. Model dan dataset baru
> akan dikerjakan pada Fase 3 setelah keputusan Bagian 12 dokumen proyek dijawab.
> Hasil tidak boleh dipakai untuk menilai keaslian, harga, atau nilai ekonomi keris.

## Yang sudah berjalan

- Beranda, AI Scanner, Hasil Identifikasi, Galeri, Kamus Keris, dan Detail Keris.
- Kamera perangkat dan unggah dari galeri (JPEG, PNG, WebP; maksimum 8 MB).
- Validasi gambar di server: tanda tangan berkas, dimensi, MIME, dan ukuran.
- Klasifikasi demo deterministik dengan tiga kandidat dan ambang keyakinan 0,55.
- Enam komponen hasil identifikasi + disclaimer + status konten.
- Galeri lokal di browser (tanpa login), maksimum 30 hasil, dapat dihapus.
- Kamus 34 istilah dengan pencarian dan filter kategori.
- PWA: manifest, ikon 192/512/maskable, service worker, dan halaman offline.
- Skema Supabase + seed SQL siap dijalankan (belum diterapkan ke proyek nyata).
- Tes unit (Vitest) dan uji alur utama (Playwright).

## Stack

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS 3 ·
Vitest · Playwright · Supabase (rencana) · Vercel + TWA (rencana).

## Menjalankan

Prasyarat: Node.js 20 atau lebih baru dan npm.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Salin `.env.example` menjadi `.env.local` bila ingin mengatur URL situs. Jangan pernah
menyimpan kunci rahasia di repositori.

## Skrip

| Perintah | Kegunaan |
|----------|----------|
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi |
| `npm start` | Menjalankan hasil build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Pemeriksaan TypeScript |
| `npm test` | Tes unit Vitest |
| `npm run test:e2e` | Uji alur Playwright (butuh browser Chromium) |
| `npm run icons` | Membuat ulang ikon PWA |
| `npm run seed:supabase` | Menghasilkan `supabase/seed.sql` dari data JSON |

## Struktur

```text
app/                  Halaman dan route API Next.js
components/           Komponen UI (scanner, hasil, galeri, kamus)
lib/
  ai/                 Antarmuka klasifikasi + klasifier demo
  api/                Tipe respons dan pembatas laju
  content/            Skema konten Zod
  data/               Pemuat katalog dan filter kamus
  image/              Validasi server dan pra-pemrosesan browser
  storage/            Galeri lokal (sessionStorage/localStorage)
data/
  keris/              Enam entri keris (status draf)
  kamus/              Entri kamus
ml/                   Kerangka dataset dan skrip model (belum dijalankan)
supabase/             Skema, kebijakan RLS, dan seed SQL
tests/                Tes unit dan E2E
docs/                 Dokumentasi teknis dan keputusan
logs/                 Log kinerja agen (JSON Lines)
```

## Data dan konten

Semua entri budaya berstatus `draf`, belum diverifikasi pakar, dan memakai sumber yang
masih perlu dilengkapi nomor halaman/inventaris. Belum ada gambar referensi berlisensi;
antarmuka memakai ilustrasi vektor buatan sendiri. Lihat `docs/konten.md`.

## Privasi

Pada mode demo, gambar hanya diproses di memori server untuk analisis dan tidak disimpan.
Riwayat galeri disimpan di `localStorage` perangkat setelah pengguna menekan Simpan.
Menghapus data situs akan menghapus galeri. Log agen tidak memuat gambar atau data pribadi.

## Status tugas

Ringkasan lengkap ada di dokumen proyek (`keris-ai-dokumen-proyek.md`, Bagian 10) dan
`docs/status.md`. Tugas yang bergantung pada model terlatih, Supabase, perangkat Android,
atau keputusan pemilik proyek ditandai terblokir — bukan diklaim selesai.

## Dokumentasi

- [Asumsi dan keputusan tertunda](docs/asumsi.md)
- [Arsitektur](docs/arsitektur.md)
- [Konten budaya](docs/konten.md)
- [Kontrak API](docs/api.md)
- [Supabase](docs/supabase-setup.md)
- [PWA dan TWA](docs/pwa-twa.md)
- [Pengujian](docs/pengujian.md)
- [Referensi](docs/referensi.md)
- [Status tugas](docs/status.md)

## Etika

Makna filosofis disampaikan sebagai perspektif tradisional, bukan kebenaran tunggal.
Aplikasi tidak menampilkan klaim keaslian atau nilai ekonomi. Status konten hanya dapat
menjadi `disetujui` oleh pakar melalui T2.6.
