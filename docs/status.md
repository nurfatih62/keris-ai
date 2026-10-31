# Status Tugas

Diperbarui: 31 Oktober 2026
Cabang: `tugas/T4-frontend-api` (belum di-push)

## Ringkasan

| Status | Jumlah | Arti |
|--------|--------|------|
| Selesai | 18 | Seluruh kriteria "Selesai bila" terpenuhi |
| Sebagian | 7 | Fondasi sudah ada, kriteria belum seluruhnya terpenuhi |
| Terblokir | 20 | Butuh keputusan, data, kredensial, atau perangkat eksternal |
| **Total** | **45** | Daftar tugas dokumen proyek Bagian 10.3 |

Progres penyelesaian: **18/45 (40%)**.

> Catatan: dokumen proyek versi 0.2 menulis total 46, padahal daftar tugas berjumlah
> 45. Angka sudah dikoreksi menjadi 45 pada versi 0.3.

## Rincian per fase

### Fase 0 — Persiapan (1 selesai, 1 sebagian, 2 terblokir)

| Tugas | Status | Catatan |
|-------|--------|---------|
| T0.1 | Terblokir | 13 pertanyaan Bagian 12 belum dijawab |
| T0.2 | Sebagian | Daftar awal di `docs/referensi.md`; halaman/inventaris belum lengkap |
| T0.3 | Terblokir | Enam kategori sementara (`ASUMSI`) belum disetujui |
| T0.4 | Selesai | Next.js 15, TypeScript strict, Tailwind CSS; build lokal lulus |

### Fase 1 — Data Gambar (0 selesai, 1 sebagian, 4 terblokir)

| Tugas | Status | Catatan |
|-------|--------|---------|
| T1.1 | Terblokir | Belum ada gambar berlisensi |
| T1.2 | Terblokir | Menunggu dataset dan pelabel ahli |
| T1.3 | Terblokir | Belum ada data untuk dibersihkan |
| T1.4 | Terblokir | Belum ada dataset |
| T1.5 | Sebagian | Format metadata dan validator tersedia; dataset nyata belum ada |

### Fase 2 — Konten Keris (4 selesai, 1 sebagian, 1 terblokir)

| Tugas | Status | Catatan |
|-------|--------|---------|
| T2.1 | Sebagian | Skema, RLS, dan seed siap; belum diterapkan/diuji di Supabase |
| T2.2 | Selesai | Enam entri kategori lengkap (draf) |
| T2.3 | Selesai | Penjelasan bagian utama terisi (draf) |
| T2.4 | Selesai | Makna filosofis dan nilai budaya terisi (draf) |
| T2.5 | Selesai | 34 istilah, termasuk seluruh 21 istilah glosarium |
| T2.6 | Terblokir | Pakar/narasumber belum ditunjuk |

### Fase 3 — Model AI (0 selesai, 1 sebagian, 4 terblokir)

| Tugas | Status | Catatan |
|-------|--------|---------|
| T3.1 | Sebagian | Kerangka baseline MobileNetV3-Small ada; belum dijalankan |
| T3.2 | Terblokir | Dataset belum tersedia |
| T3.3 | Terblokir | Belum ada model terlatih |
| T3.4 | Terblokir | Ambang demo 0,55 bukan hasil evaluasi |
| T3.5 | Terblokir | Belum ada model nyata |

### Fase 4 — Frontend dan API (9 selesai, 1 sebagian)

| Tugas | Status | Catatan |
|-------|--------|---------|
| T4.1–T4.9 | Selesai | Fondasi, Home, Scanner, API, Hasil, Galeri, Kamus, Detail, responsif |
| T4.10 | Sebagian | Manifest, ikon, service worker siap; instalasi Android belum diuji |

### Fase 5 — Integrasi (2 selesai, 2 terblokir)

| Tugas | Status | Catatan |
|-------|--------|---------|
| T5.1 | Terblokir | Butuh proyek Supabase dan kredensial |
| T5.2 | Terblokir | Butuh Supabase dan keputusan login (Q7) |
| T5.3 | Selesai | Label prediksi dipetakan ke katalog |
| T5.4 | Selesai | Error validasi, timeout, API, dan penyimpanan ditangani |

### Fase 6 — Pengujian (1 selesai, 1 sebagian, 3 terblokir)

| Tugas | Status | Catatan |
|-------|--------|---------|
| T6.1 | Selesai | 44 unit + 6 E2E lulus (lingkup mode demo) |
| T6.2 | Terblokir | Belum ada model/dataset |
| T6.3 | Terblokir | Belum ada perangkat Android fisik |
| T6.4 | Sebagian | Respons lokal 31–35 ms (warm), 1,6 s (cold); target resmi belum ada |
| T6.5 | Terblokir | Belum ada responden |

### Fase 7 — Deployment dan APK (1 selesai, 1 sebagian, 4 terblokir)

| Tugas | Status | Catatan |
|-------|--------|---------|
| T7.1 | Terblokir | Akun Vercel belum tersedia |
| T7.2 | Sebagian | `.env.example` dan dokumentasi ada; env produksi belum diatur |
| T7.3 | Selesai | README dan `docs/` lengkap |
| T7.4 | Terblokir | Persetujuan pemangku kepentingan belum ada |
| T7.5 | Terblokir | Butuh domain HTTPS, Android SDK, keystore |
| T7.6 | Terblokir | Butuh sertifikat produksi dan domain tetap |

## Hasil verifikasi terakhir

| Pemeriksaan | Hasil |
|-------------|-------|
| Tes unit Vitest | 44 lulus, 0 gagal (6 berkas) |
| E2E Playwright | 6 lulus, 0 gagal (Chromium) |
| TypeScript `tsc --noEmit` | Lulus |
| ESLint | 0 error, 0 warning |
| Build Next.js | Lulus, 16 rute |
| Uji Android fisik | Belum (terblokir) |
| Uji akurasi model | Belum (terblokir) |

## Langkah berikutnya

1. Jawab 13 pertanyaan Bagian 12 dan setujui daftar kategori (T0.1/T0.3).
2. Tunjuk pakar untuk verifikasi konten (T2.6) dan lengkapi halaman sumber (T0.2).
3. Sediakan proyek Supabase, terapkan `supabase/schema.sql` + seed, lalu uji RLS
   (T2.1, T5.1, T5.2).
4. Kumpulkan dataset berlisensi dan jalankan baseline (T1.1–T1.5, T3.1–T3.5).
5. Siapkan domain HTTPS, Vercel, Android SDK, dan keystore di luar repositori
   (T7.1, T7.2, T7.5, T7.6).
6. Uji di perangkat Android dan lakukan uji keterbacaan (T4.10, T6.3, T6.5).

## Batasan yang dinyatakan terbuka

- Klasifikasi memakai `mock-heuristic-v0.1`, bukan model terlatih. Tidak ada klaim
  akurasi.
- Seluruh konten budaya berstatus `draf` dan `verifikasiPakar: false`.
- Galeri tersimpan lokal di browser, bukan Supabase, dan hilang jika data situs
  dibersihkan.
- Supabase dan APK belum diuji karena kredensial/perangkat belum tersedia.
- Tidak ada kredensial, keystore, atau gambar pengguna di repositori.
