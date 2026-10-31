# Menyiapkan Supabase

Skema tersedia di `supabase/schema.sql`, seed di `supabase/seed.sql`. **Belum diterapkan
ke proyek Supabase mana pun** karena kredensial belum tersedia (T2.1).

## 1. Buat proyek

1. Buat proyek baru di dashboard Supabase (lingkungan pengembangan, bukan produksi).
2. Catat Project URL dan kunci `anon`/`service_role`.
3. Jangan menaruh kunci `service_role` di kode klien atau repositori. Kunci itu hanya
   boleh dipakai di server (environment variable tanpa prefiks `NEXT_PUBLIC_`).

## 2. Jalankan skema

Buka SQL Editor, tempel isi `supabase/schema.sql`, lalu jalankan. Skrip membuat:

- `public.keris` — katalog + kolom tata kelola konten.
- `public.istilah_kamus` — kamus.
- `public.hasil_scan` — riwayat, memiliki `user_id` (nullable sesuai dokumen).
- RLS: katalog/kamus dapat dibaca publik; `hasil_scan` hanya milik pengguna login.
- Bucket privat `keris-images` (8 MB, JPEG/PNG/WebP) dengan kebijakan per folder
  `auth.uid()`.

Perubahan di luar Bagian 8 dokumen proyek: `status_konten`, `verifikasi_pakar`,
`catatan_pakar`, dan `sumber` pada kamus. Ini diperlukan aturan konten AGENTS.md.

## 3. Isi seed

```bash
npm run seed:supabase
```

Tempel `supabase/seed.sql` ke SQL Editor, atau gunakan Supabase CLI:

```bash
supabase db execute --file supabase/seed.sql
```

Seed idempoten (`on conflict ... do update`), sehingga dapat dijalankan ulang setelah
data JSON berubah.

## 4. Verifikasi

- [ ] `select count(*) from keris;` → 6
- [ ] `select count(*) from istilah_kamus;` → 34
- [ ] Semua baris `status_konten = 'draf'` dan `verifikasi_pakar = false`.
- [ ] Pengguna anonim dapat membaca keris/kamus, tidak dapat menulis.
- [ ] Pengguna login hanya melihat `hasil_scan` miliknya sendiri.
- [ ] Bucket `keris-images` privat; unggahan hanya ke folder `auth.uid()`.

## 5. Integrasi aplikasi (belum aktif)

Aplikasi saat ini memakai katalog JSON dan galeri `localStorage`. Untuk mengaktifkan
Supabase:

1. Tambahkan `lib/supabase/client.ts` dan `server.ts` (belum dibuat karena kredensial
   belum ada).
2. Aktifkan autentikasi bila Q7 dijawab "perlu login".
3. Pindahkan galeri ke API Route server dengan klien yang memakai sesi pengguna —
   jangan pernah mengekspos `service_role` ke browser.
4. Simpan gambar ke bucket privat dan gunakan signed URL.
5. Tambahkan tes integrasi + RLS sebelum menandai T5.1/T5.2 selesai.

## Catatan keamanan

- Jangan mengubah RLS menjadi `using (true)` pada `hasil_scan`.
- Jangan membuat bucket publik untuk gambar pengguna.
- Jangan menyimpan gambar pengguna di log.
- Jika skema sudah dipakai di produksi, perubahan harus melalui migrasi + cadangan
  (AGENTS.md Bagian 3.3 dan 14).
