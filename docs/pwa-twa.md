# PWA dan Pembungkusan APK (TWA)

## Yang sudah tersedia

| Berkas | Fungsi |
|--------|--------|
| `app/manifest.ts` | Manifest (`/manifest.webmanifest`) |
| `public/icons/*` | Ikon 192, 512, maskable 512, Apple 180, favicon 32 |
| `public/sw.js` | Precache shell, network-first navigasi, cache aset |
| `public/offline.html` | Halaman cadangan saat offline |
| `components/pwa-register.tsx` | Registrasi service worker (produksi) |

Service worker hanya didaftarkan saat `NODE_ENV=production`. Uji dengan:

```bash
npm run build
npm start
```

Pemeriksaan minimal di Chrome DevTools → Application:

- [ ] Manifest terbaca, nama dan ikon benar.
- [ ] Service worker aktif dan mengontrol halaman.
- [ ] Lighthouse/Installability tidak melaporkan error.
- [ ] Halaman offline muncul saat jaringan dimatikan setelah kunjungan pertama.
- [ ] Ikon maskable tampil baik di launcher Android.

Status: **lolos build lokal**; instalasi pada perangkat Android fisik belum diuji (T4.10
sebagian, T6.3 terblokir).

## Digital Asset Links

TWA tanpa bilah alamat memerlukan:

1. Domain produksi HTTPS.
2. `/.well-known/assetlinks.json` yang berisi package name dan SHA-256 sidik jari
   sertifikat penandatangan.
3. APK ditandatangani dengan keystore yang sidik jarinya cocok.

Buat berkas setelah keystore tersedia:

```bash
node scripts/generate-assetlinks.mjs \
  id.kerisai.app \
  "AA:BB:CC:...:FF"
```

Berkas ditulis ke `public/.well-known/assetlinks.json` dan diabaikan Git karena hanya
berlaku untuk satu paket/sertifikat produksi. Unggah ke domain, lalu verifikasi:

```bash
curl https://domain-anda/.well-known/assetlinks.json
```

## Bubblewrap (ringkas)

Prasyarat: Node.js, JDK 17, Android SDK, dan `bubblewrap-cli`.

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://domain-anda/manifest.webmanifest
bubblewrap build
```

- Package name harus sama dengan isi `assetlinks.json`.
- Simpan `android.keystore` **di luar repositori** dan buat cadangan terenkripsi.
- Jangan commit `*.jks`, `*.keystore`, atau folder `android/` (sudah di `.gitignore`).
- Hasil build: APK untuk pengujian langsung atau AAB untuk Google Play.
- Uji di perangkat fisik: instal, buka, pastikan tidak ada bilah alamat, kamera dan
  unggah galeri berfungsi, serta hasil tampil.

## Keterbatasan mode demo

- Analisis memerlukan koneksi internet karena endpoint berjalan di server.
- `capture="environment"` membuka kamera melalui browser; perilaku dapat berbeda antar
  perangkat TWA.
- Jika kebutuhan kamera native/offline muncul (Q3/Q13), strategi harus beralih ke
  Capacitor dan memerlukan persetujuan (AGENTS.md Bagian 3.2).

## Status tugas terkait

| Tugas | Status |
|-------|--------|
| T4.10 PWA dasar | Sebagian — aset siap, instalasi Android belum diuji |
| T7.5 Bungkus APK | Terblokir — butuh domain HTTPS, Android SDK, keystore |
| T7.6 Asset links + cadangan keystore | Terblokir — butuh sertifikat produksi |
