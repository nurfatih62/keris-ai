# Arsitektur

## Gambaran

```text
[Browser / PWA Android]
        │
        ├── Halaman Next.js (App Router)
        │      ├── /              Beranda
        │      ├── /scan          Kamera + unggah + kualitas foto
        │      ├── /hasil/[id]    Hasil sesi (6 komponen)
        │      ├── /galeri        Riwayat lokal + detail
        │      ├── /kamus         Pencarian + filter
        │      └── /keris/[slug]  Ensiklopedia
        │
        ├── POST /api/analyze
        │      ├── validasi berkas (magic bytes, MIME, dimensi, ukuran)
        │      ├── pembatas laju per IP (in-memory, upaya terbaik)
        │      ├── klasifier demo deterministik
        │      └── pencocokan label → katalog JSON
        │
        └── localStorage / sessionStorage
               ├── hasil sesi sementara
               └── galeri pribadi (maks. 30, dapat dihapus)
```

Supabase dan model AI nyata belum terhubung. Skema database dan kebijakan RLS tersedia
di `supabase/schema.sql`; integrasi menunggu keputusan Q7/Q10 dan kredensial proyek.

## Keputusan teknis

### Konten sebagai sumber tunggal

Katalog disimpan di `data/keris/*.json` dan `data/kamus/istilah.json`, divalidasi Zod saat
impor. Halaman, API, dan seed Supabase memakai data yang sama. Build gagal bila ada entri
tidak valid, sehingga status konten dan sumber tidak bisa hilang tanpa ketahuan.

### Klasifikasi demo

`lib/ai/classifier.ts` mengekspos `classifyKeris()` dengan kontrak yang dapat diganti
implementasi model nyata. Versi demo:

- deterministik dari hash SHA-256 isi berkas;
- nama berkas dapat menjadi petunjuk kategori (khusus demo dan pengujian);
- menghasilkan tiga kandidat dengan skor menurun;
- memakai ambang 0,55 untuk status "tidak dikenali";
- tidak menganalisis piksel dan tidak menyimpan gambar.

Penggantian model cukup mengubah implementasi di `lib/ai/` dan mempertahankan bentuk
respons `AnalyzeResponse` (`lib/api/types.ts`).

### Validasi berlapis

Browser melakukan pra-pemrosesan (resize maksimum 1600 px, JPEG kualitas 0,85, pembacaan
kualitas foto). Server tetap memvalidasi ulang agar tidak bergantung pada klien:

- ukuran maksimum 8 MB dan `Content-Length` diperiksa lebih awal;
- tipe sebenarnya dideteksi dari magic bytes PNG/JPEG/WebP;
- MIME deklarasi harus cocok;
- dimensi minimum 300 px dan maksimum 8000 px;
- nama berkas dibatasi 160 karakter dan tidak disimpan;
- gambar tidak ditulis ke disk atau log.

### Galeri lokal

Tanpa login (ASUMSI A4), galeri memakai `localStorage` dengan validasi struktur saat
dibaca. Jika kuota penuh, gambar dilepas dan metadata tetap disimpan; jika tetap gagal,
pengguna mendapat pesan yang jelas. Data tidak pernah dikirim ke server pada mode demo.

### PWA

`app/manifest.ts` menghasilkan manifest; `public/sw.js` melakukan precache shell,
network-first untuk navigasi, dan stale-while-revalidate untuk aset statis. API tidak
di-cache. Service worker hanya didaftarkan pada produksi. Bundling APK melalui TWA
dijelaskan di `docs/pwa-twa.md`.

## Keamanan

- Tidak ada kredensial di kode; `.env.example` hanya berisi placeholder.
- Header keamanan dasar diatur di `next.config.mjs`.
- Endpoint analisis dibatasi 20 permintaan/menit per IP (per instance; bukan pengganti
  pembatas terdistribusi).
- Respons error tidak membocorkan detail internal; detail hanya masuk log server tanpa
  gambar atau data pribadi.
- Supabase dirancang dengan RLS; bucket gambar privat dan hanya dapat diakses pemilik.
- TWA/keystore tidak disimpan di repositori.

## Batasan

- Klasifier demo tidak mengenali isi gambar; akurasi belum diukur (T6.2).
- Pembatas laju in-memory tidak konsisten antar instance serverless.
- Galeri lokal tidak tersinkron antar perangkat dan hilang jika data situs dibersihkan.
- Supabase dan deployment belum diuji karena belum ada akun/kredensial.
