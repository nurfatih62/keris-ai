-- Skema Supabase untuk Keris AI (T2.1).
-- Jalankan di SQL Editor Supabase pada lingkungan pengembangan.
-- Perintah ini belum dieksekusi karena proyek Supabase belum tersedia.
-- Catatan: kolom tata kelola konten (status_konten, verifikasi_pakar, catatan_pakar)
-- ditambahkan di luar Bagian 8 dokumen proyek agar sesuai aturan konten AGENTS.md.

begin;

create extension if not exists "pgcrypto";

create table if not exists public.keris (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  kategori text not null unique,
  asal_daerah text not null,
  bentuk_bilah text not null,
  jumlah_luk integer check (jumlah_luk is null or jumlah_luk >= 0),
  ornamen text[] not null default '{}',
  bagian jsonb not null default '{}'::jsonb,
  makna_filosofis text not null,
  nilai_budaya text not null,
  sumber_referensi text not null,
  gambar_referensi text,
  status_konten text not null default 'draf'
    check (status_konten in ('draf', 'diverifikasi', 'disetujui')),
  verifikasi_pakar boolean not null default false,
  catatan_pakar text not null default '',
  dibuat_pada timestamptz not null default now()
);

create table if not exists public.istilah_kamus (
  id uuid primary key default gen_random_uuid(),
  istilah text not null unique,
  definisi text not null,
  kategori text not null
    check (kategori in ('istilah', 'jenis', 'bentuk', 'ornamen', 'bagian', 'filosofi')),
  sumber text[] not null default '{}',
  status_konten text not null default 'draf'
    check (status_konten in ('draf', 'diverifikasi', 'disetujui')),
  verifikasi_pakar boolean not null default false,
  dibuat_pada timestamptz not null default now()
);

create table if not exists public.hasil_scan (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  gambar_url text not null,
  keris_id uuid references public.keris (id) on delete set null,
  label_prediksi text not null,
  skor_keyakinan numeric(4, 3) not null
    check (skor_keyakinan >= 0 and skor_keyakinan <= 1),
  disimpan_ke_galeri boolean not null default true,
  dibuat_pada timestamptz not null default now()
);

create index if not exists hasil_scan_user_waktu_idx
  on public.hasil_scan (user_id, dibuat_pada desc);

create index if not exists keris_kategori_idx
  on public.keris (kategori);

alter table public.keris enable row level security;
alter table public.istilah_kamus enable row level security;
alter table public.hasil_scan enable row level security;

drop policy if exists "keris_baca_publik" on public.keris;
create policy "keris_baca_publik"
  on public.keris for select
  to anon, authenticated
  using (true);

drop policy if exists "kamus_baca_publik" on public.istilah_kamus;
create policy "kamus_baca_publik"
  on public.istilah_kamus for select
  to anon, authenticated
  using (true);

drop policy if exists "hasil_scan_baca_milik" on public.hasil_scan;
create policy "hasil_scan_baca_milik"
  on public.hasil_scan for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "hasil_scan_tambah_milik" on public.hasil_scan;
create policy "hasil_scan_tambah_milik"
  on public.hasil_scan for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "hasil_scan_ubah_milik" on public.hasil_scan;
create policy "hasil_scan_ubah_milik"
  on public.hasil_scan for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "hasil_scan_hapus_milik" on public.hasil_scan;
create policy "hasil_scan_hapus_milik"
  on public.hasil_scan for delete
  to authenticated
  using (auth.uid() = user_id);

grant select on public.keris to anon, authenticated;
grant select on public.istilah_kamus to anon, authenticated;
grant select, insert, update, delete on public.hasil_scan to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'keris-images',
  'keris-images',
  false,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "keris_images_unggah_milik" on storage.objects;
create policy "keris_images_unggah_milik"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'keris-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "keris_images_baca_milik" on storage.objects;
create policy "keris_images_baca_milik"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'keris-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "keris_images_hapus_milik" on storage.objects;
create policy "keris_images_hapus_milik"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'keris-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

commit;
