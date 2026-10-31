# Pengujian

## Perintah

```bash
npm test            # unit
npm run test:e2e    # E2E Playwright (Google Chrome terpasang)
npm run lint        # ESLint
npm run typecheck   # TypeScript strict
npm run build       # build produksi
```

## Hasil terakhir (31 Oktober 2026)

| Pemeriksaan | Hasil |
|-------------|-------|
| Tes unit Vitest | 44 lulus, 0 gagal (6 berkas) |
| TypeScript `tsc --noEmit` | Lulus |
| ESLint | 0 error, 0 warning |
| Build Next.js | Lulus, 16 rute |
| E2E Playwright | 6 lulus, 0 gagal (Chromium, Chrome terpasang) |
| Uji perangkat Android | Belum dilakukan (terblokir) |

### Cakupan unit

- Deteksi dimensi PNG/JPEG/WebP dan penolakan format palsu.
- Batas ukuran, MIME, dan dimensi minimum/maksimum.
- Penilaian kualitas foto (gelap, buram, resolusi rendah, baik).
- Klasifier deterministik, petunjuk nama berkas, tiga kandidat, ambang rendah.
- Validasi katalog dan kamus, pencarian, filter, status draf.
- Penyimpanan sesi/galeri, deduplikasi, batas 30, penanganan kuota.
- API `/api/analyze`: sukses, tanpa gambar, format salah, content-length besar, GET.
- Pembatas laju per klien dan jendela waktu.

### Cakupan E2E

- Beranda, navigasi bawah, dan judul halaman.
- Pencarian + filter kamus dan keadaan kosong.
- Daftar jenis keris → detail, status draf, sumber.
- Alur utama: unggah → pratinjau → analisis → hasil enam komponen → simpan galeri →
  buka detail → hapus.
- Manifest dan service worker tersedia.
- Tidak ada luapan horizontal pada tujuh rute di viewport 390 px, serta navigasi
  desktop/bawah yang sesuai.

## Uji manual yang belum dilakukan

- Instalasi PWA dan APK di perangkat Android fisik (T4.10/T6.3/T7.5).
- Uji kamera pada beberapa perangkat (iOS Safari, Chrome Android).
- Uji koneksi lambat/terputus pada perangkat nyata.
- Uji keterbacaan oleh responden umum (T6.5).
- Uji akurasi model nyata (T6.2) — belum ada model/dataset.
- Uji beban dan pembatas laju terdistribusi.
- Uji RLS Supabase (belum ada proyek/kredensial).

## Catatan

Tes E2E memakai klasifier demo dan nama berkas `keris-bali.png` untuk memaksa kategori
demo. Ini **bukan** bukti akurasi model. Hasil E2E terakhir: **6 lulus, 0 gagal** pada
Chromium (Chrome terpasang) setelah `.next` dibersihkan dan server dev dijalankan ulang.
Dua kegagalan awal (pesan hapus galeri dan navigasi bawah desktop) sudah diperbaiki pada
`components/gallery/gallery-client.tsx` dan konfigurasi pengujian.
