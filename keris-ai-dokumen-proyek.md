# Aplikasi Identifikasi dan Ensiklopedia Keris Berbasis AI

> **Dokumen Proyek Lengkap**
> Versi: 0.3 (draf, dengan catatan implementasi mode demo)
> Terakhir diperbarui: 31 Oktober 2026
> Status: Menunggu konfirmasi kebutuhan (lihat Bagian 12)

---

## Daftar Isi

1. [Gambaran Umum](#1-gambaran-umum)
2. [Tujuan Aplikasi](#2-tujuan-aplikasi)
3. [Fitur Utama](#3-fitur-utama)
4. [Alur Penggunaan Aplikasi](#4-alur-penggunaan-aplikasi)
5. [Konsep Sistem AI](#5-konsep-sistem-ai)
6. [Teknologi yang Direncanakan](#6-teknologi-yang-direncanakan)
7. [Arsitektur Sistem](#7-arsitektur-sistem)
8. [Rancangan Data](#8-rancangan-data)
9. [Rencana Pengembangan (Roadmap)](#9-rencana-pengembangan-roadmap)
10. [Cek Tugas](#10-cek-tugas)
11. [Log Kinerja Agen](#11-log-kinerja-agen)
12. [Hal yang Perlu Dikonfirmasi](#12-hal-yang-perlu-dikonfirmasi)
13. [Risiko dan Mitigasi](#13-risiko-dan-mitigasi)
14. [Kriteria Keberhasilan](#14-kriteria-keberhasilan)
15. [Catatan Etika dan Budaya](#15-catatan-etika-dan-budaya)
16. [Glosarium](#16-glosarium)

---

## 1. Gambaran Umum

Proyek ini merupakan aplikasi edukasi budaya berbasis Artificial Intelligence (AI) yang dirancang untuk membantu pengguna mengenali dan mempelajari keris melalui gambar.

Pengguna dapat mengambil foto keris menggunakan kamera atau mengunggah gambar dari perangkat. Selanjutnya, sistem AI akan menganalisis bentuk, pola, dan ornamen keris untuk memberikan hasil identifikasi beserta informasi pendukung.

Informasi yang ditampilkan meliputi perkiraan jenis keris, asal daerah, ornamen, bagian-bagian keris, serta makna filosofis dan nilai budayanya.

---

## 2. Tujuan Aplikasi

- Membantu pengguna mengenali jenis keris melalui gambar.
- Memperkenalkan keris sebagai salah satu warisan budaya Nusantara.
- Memberikan informasi mengenai bentuk, ornamen, dan bagian keris.
- Menjelaskan makna filosofis dari setiap unsur keris.
- Menyediakan media pembelajaran budaya yang mudah diakses.

---

## 3. Fitur Utama

### 3.1 Home (Beranda)

Menampilkan halaman utama aplikasi, pengenalan singkat, dan navigasi menuju fitur lainnya.

**Kebutuhan turunan:**
- Menampilkan pengenalan singkat tentang keris dan tujuan aplikasi.
- Menyediakan tombol akses cepat ke AI Scanner, Gallery, dan Kamus Keris.

### 3.2 AI Scanner

Memungkinkan pengguna mengambil foto keris menggunakan kamera atau mengunggah gambar dari galeri perangkat untuk diproses oleh AI.

**Kebutuhan turunan:**
- Pengambilan foto langsung dari kamera perangkat.
- Unggah gambar dari galeri perangkat.
- Validasi format dan ukuran gambar (format dan batas ukuran perlu ditetapkan).
- Indikator proses saat analisis berlangsung.
- Peringatan jika gambar bukan keris atau kualitas gambar terlalu rendah.
- Panduan singkat cara mengambil foto yang baik (pencahayaan, sudut, fokus).

### 3.3 Hasil Identifikasi

Menampilkan hasil analisis AI berupa:

| No | Komponen | Keterangan |
|----|----------|------------|
| 1 | Nama atau jenis keris | Label hasil prediksi model |
| 2 | Asal daerah atau gaya keris | Diambil dari database berdasarkan label |
| 3 | Bentuk bilah dan jumlah luk | Ciri visual yang terdeteksi |
| 4 | Identifikasi ornamen | Ornamen yang dikenali pada gambar |
| 5 | Penjelasan bagian-bagian keris | Hulu, bilah, warangka, dan bagian lain |
| 6 | Makna filosofis dan nilai budaya | Penjelasan tradisional dan konteks budaya |

**Kebutuhan turunan:**
- Menampilkan skor keyakinan (confidence) hasil prediksi.
- Menampilkan beberapa kemungkinan jenis jika keyakinan model rendah.
- Menampilkan disclaimer bahwa hasil merupakan perkiraan.
- Tombol "Simpan ke Galeri".

### 3.4 Gallery (Galeri)

Menyimpan riwayat hasil pemindaian keris agar pengguna dapat melihat kembali gambar dan informasi yang pernah diidentifikasi.

**Kebutuhan turunan:**
- Daftar hasil scan yang tersimpan, diurutkan dari yang terbaru.
- Halaman detail untuk setiap hasil scan.
- Fitur hapus hasil scan.

### 3.5 Kamus Keris

Menyediakan kumpulan informasi mengenai istilah, jenis, bentuk, ornamen, bagian-bagian, dan filosofi keris.

**Kebutuhan turunan:**
- Pencarian istilah.
- Filter berdasarkan kategori (istilah, jenis, bentuk, ornamen, bagian, filosofi).

### 3.6 Detail Keris

Menampilkan penjelasan lebih lengkap mengenai jenis keris, unsur pembentuk, ornamen, dan makna filosofisnya.

**Kebutuhan turunan:**
- Gambar referensi jenis keris.
- Daftar sumber referensi untuk setiap entri.
- Tautan dari hasil identifikasi menuju halaman detail jenis yang sesuai.

---

## 4. Alur Penggunaan Aplikasi

### 4.1 Alur Utama

1. Pengguna membuka aplikasi.
2. Pengguna memilih menu Scan Keris.
3. Pengguna mengambil foto atau mengunggah gambar keris.
4. Sistem AI memproses dan menganalisis gambar.
5. Aplikasi menampilkan hasil identifikasi beserta informasi keris.
6. Pengguna dapat membaca penjelasan dan makna filosofisnya.
7. Pengguna dapat menyimpan hasil pemindaian ke dalam galeri.

### 4.2 Alur Alternatif

- **Gambar bukan keris:** sistem menampilkan pesan bahwa objek tidak dikenali dan meminta pengguna mengunggah gambar lain.
- **Keyakinan rendah:** sistem menampilkan beberapa kemungkinan jenis beserta skornya dan menyarankan pengguna memeriksa penjelasan masing-masing.
- **Koneksi terputus:** sistem menampilkan pesan kesalahan dan menyimpan gambar sementara untuk dikirim ulang (bergantung pada keputusan Bagian 12 nomor 3).
- **Layanan AI gagal:** sistem menampilkan pesan kesalahan yang ramah dan menawarkan opsi coba lagi.

---

## 5. Konsep Sistem AI

AI menggunakan teknologi Computer Vision untuk menganalisis gambar berdasarkan karakteristik visual keris, seperti bentuk bilah, pola, dan ornamen.

Hasil analisis kemudian dihubungkan dengan database yang berisi informasi mengenai keris sehingga aplikasi dapat menampilkan penjelasan yang sesuai.

Sistem membutuhkan dataset gambar keris yang memiliki label atau keterangan agar model AI dapat mengenali kategori keris yang didukung.

### 5.1 Alur Pemrosesan

```
Gambar input (kamera / galeri)
        │
        ▼
Pra-pemrosesan (validasi, resize, normalisasi, crop area keris)
        │
        ▼
Model Computer Vision (klasifikasi jenis keris)
        │
        ▼
Hasil prediksi: label + skor keyakinan
        │
        ▼
Pencocokan label dengan database keris
        │
        ▼
Tampilan hasil identifikasi di aplikasi
```

### 5.2 Jenis Tugas AI

| Tugas | Keterangan | Status |
|-------|------------|--------|
| Klasifikasi jenis keris | Memilih satu label dari kategori yang didukung | Direncanakan |
| Ekstraksi ciri visual | Mengenali bentuk bilah, pola, dan ornamen | Perlu dikonfirmasi |
| Deteksi dan crop area keris | Memotong bagian keris jika foto memuat latar belakang | Opsional |
| Penilaian kualitas gambar | Menolak gambar yang buram atau terlalu gelap | Direncanakan |

> **Catatan:** Apakah AI mengidentifikasi secara otomatis atau hanya memilih dari kategori yang sudah disiapkan masih perlu dikonfirmasi (lihat Bagian 12 nomor 1).

### 5.3 Syarat Dataset

- Gambar berlabel per kategori keris.
- Jumlah gambar per kelas perlu ditetapkan (target awal ditentukan setelah pengumpulan data dimulai).
- Variasi sudut, pencahayaan, dan latar belakang agar model tidak bergantung pada kondisi foto tertentu.
- Metadata untuk setiap gambar: sumber, lisensi atau izin penggunaan, dan tanggal pengambilan.
- Pembagian data menjadi tiga bagian: latih, validasi, dan uji. Rasio umum yang dapat dipakai sebagai titik awal adalah sekitar 70:15:15.

### 5.4 Batasan Model

- Model hanya dapat mengenali kategori yang ada di dataset.
- Hasil berupa perkiraan, bukan kepastian.
- Gambar dengan kondisi buruk, sudut ekstrem, pencahayaan minim, atau keris yang sebagian tertutup berpotensi menghasilkan prediksi yang salah.
- Ornamen dan pola yang sangat halus mungkin sulit dikenali pada resolusi rendah.

---

## 6. Teknologi yang Direncanakan

| Lapisan | Teknologi | Peran |
|---------|-----------|-------|
| Frontend | Next.js dan TypeScript | Antarmuka pengguna |
| Styling | Tailwind CSS | Tampilan responsif |
| Backend | Next.js API (Route Handlers) | Endpoint analisis gambar dan data keris |
| Database | Supabase (PostgreSQL) | Data keris, kamus, dan riwayat galeri |
| Penyimpanan gambar | Supabase Storage | Foto yang diambil atau diunggah pengguna |
| AI | Computer Vision / Image Classification | Identifikasi jenis keris dari gambar |
| Deployment | Vercel | Hosting aplikasi web |
| Platform | Web responsif (PWA) yang dibungkus menjadi APK Android | Dibungkus dengan TWA; lihat Bagian 6.1 |

### 6.1 Strategi Distribusi Android (APK)

Aplikasi akan didistribusikan sebagai APK Android. Untuk tahap awal, pendekatan yang dipilih adalah PWA yang dibungkus menggunakan Trusted Web Activity (TWA), dengan Bubblewrap atau PWABuilder sebagai alat pembungkus. Keputusan ini bersifat sementara hingga pertanyaan nomor 3, 12, dan 13 pada Bagian 12 dijawab.

| Pendekatan | Usaha | Cocok jika |
|------------|-------|------------|
| PWA dibungkus TWA (Bubblewrap atau PWABuilder) | Rendah | Aplikasi berjalan online dan ingin cepat sampai ke APK. Dipilih untuk tahap awal. |
| Capacitor | Sedang | Butuh fitur native yang tidak tersedia di browser, atau mode offline |
| Expo (React Native) atau Flutter | Tinggi | Butuh pengalaman native penuh dan performa tinggi |

Ketentuan teknis:

- Next.js tetap menjadi basis kode utama. Tidak ada kode yang ditulis ulang khusus untuk Android.
- Analisis gambar tetap berjalan di server. APK hanya membawa tampilan aplikasi.
- Sebelum dibungkus, aplikasi harus memiliki manifest web, ikon dalam beberapa ukuran, dan service worker dasar.
- Domain produksi wajib menggunakan HTTPS dan terverifikasi melalui Digital Asset Links agar TWA tampil tanpa bilah alamat browser.
- Keystore penandatanganan disimpan di luar repositori dan memiliki cadangan. Kehilangan keystore menyulitkan pembaruan aplikasi.

Pembungkusan dilakukan dalam empat tahap: menyiapkan PWA yang memenuhi syarat, membungkusnya menjadi APK atau AAB, menandatanganinya dengan keystore, lalu menguji instalasi di perangkat Android fisik.

Jika kebutuhan offline atau akses kamera tidak dapat dipenuhi browser, strategi dialihkan ke Capacitor. Next.js kemudian perlu diekspor sebagai situs statis, dan endpoint analisis tetap dipanggil dari server terpisah. Perubahan ini harus disetujui dan dicatat di Riwayat Versi.

---

## 7. Arsitektur Sistem

```
[Pengguna: APK Android (TWA) / Browser]
            │
            ▼
[Frontend Next.js + Tailwind (Vercel)]
            │
            ├──► [Next.js API Route] ──► [Layanan AI: model klasifikasi]
            │            │
            │            ▼
            │     [Supabase Database]
            │
            └──► [Supabase Storage: gambar]
```

### 7.1 Pilihan Penempatan Layanan AI

| Opsi | Kelebihan | Kekurangan |
|------|-----------|------------|
| A. Model dijalankan di dalam API Route | Arsitektur sederhana, satu basis kode | Model berukuran besar sulit dijalankan di serverless function |
| B. Layanan inferensi terpisah (misalnya server Python) | Fleksibel untuk model besar dan library ML | Perlu hosting dan pemeliharaan tambahan |
| C. API pihak ketiga | Cepat dipakai tanpa melatih model sendiri | Bergantung pada layanan eksternal dan biaya per pemakaian |

Pilihan final perlu ditetapkan setelah arsitektur model diketahui (lihat Bagian 12).

---

## 8. Rancangan Data

Rancangan berikut merupakan draf awal dan dapat berubah sesuai keputusan pada Bagian 12.

### 8.1 Tabel `keris`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid | Primary key |
| nama | text | Nama atau jenis keris |
| kategori | text | Label yang digunakan model AI |
| asal_daerah | text | Daerah asal atau gaya |
| bentuk_bilah | text | Deskripsi bentuk bilah |
| jumlah_luk | integer | Jumlah luk pada bilah |
| ornamen | text[] | Daftar ornamen yang umum |
| bagian | jsonb | Penjelasan setiap bagian keris |
| makna_filosofis | text | Penjelasan makna filosofis |
| nilai_budaya | text | Konteks dan nilai budaya |
| sumber_referensi | text | Sumber penjelasan |
| gambar_referensi | text | URL gambar referensi |
| dibuat_pada | timestamptz | Waktu pembuatan entri |

### 8.2 Tabel `hasil_scan` (Galeri)

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid | Primary key |
| user_id | uuid | Pemilik hasil (jika ada fitur login) |
| gambar_url | text | URL gambar di Supabase Storage |
| keris_id | uuid | Referensi ke tabel `keris` (nullable) |
| label_prediksi | text | Label hasil model |
| skor_keyakinan | numeric | Nilai keyakinan model (0 sampai 1) |
| disimpan_ke_galeri | boolean | Penanda apakah pengguna menyimpan hasil |
| dibuat_pada | timestamptz | Waktu pemindaian |

### 8.3 Tabel `istilah_kamus`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | uuid | Primary key |
| istilah | text | Kata atau istilah |
| definisi | text | Penjelasan |
| kategori | text | Istilah, jenis, bentuk, ornamen, bagian, atau filosofi |

---

## 9. Rencana Pengembangan (Roadmap)

| Fase | Nama | Output Utama |
|------|------|--------------|
| 0 | Persiapan dan konfirmasi kebutuhan | Keputusan tertulis atas Bagian 12, daftar kategori keris |
| 1 | Pengumpulan dan pelabelan data | Dataset berlabel dengan metadata |
| 2 | Penyusunan konten keris | Database keris dan kamus istilah yang terverifikasi |
| 3 | Pengembangan model AI | Model klasifikasi yang telah dievaluasi |
| 4 | Pengembangan frontend dan API | Seluruh halaman dan endpoint dasar |
| 5 | Integrasi AI dengan aplikasi | Alur scan dari unggah sampai hasil tampil |
| 6 | Pengujian | Laporan uji fungsional, akurasi, dan performa |
| 7 | Deployment dan dokumentasi | Aplikasi berjalan di Vercel dan dokumentasi lengkap |

> **Ketergantungan:** Fase 2 dapat berjalan paralel dengan Fase 1 dan Fase 3. Fase 5 hanya dapat dimulai setelah Fase 3 dan Fase 4 selesai.

---

## 10. Cek Tugas

Bagian ini digunakan untuk memantau progres pekerjaan dari awal hingga akhir proyek.

### 10.1 Cara Menggunakan Daftar Ini

Setiap tugas memiliki kode unik (misalnya T2.3) dan status berikut:

| Penanda | Arti |
|---------|------|
| `[ ]` | Belum dikerjakan |
| `[~]` | Sedang dikerjakan |
| `[x]` | Selesai |
| `[!]` | Terblokir (perlu keputusan atau bantuan) |

Sebuah tugas hanya boleh ditandai selesai jika kriteria "Selesai bila" terpenuhi. Tugas yang terblokir wajib disertai alasan pada catatan rapat atau log.

### 10.2 Ringkasan Progres

| Fase | Nama | Jumlah Tugas | Selesai | Sebagian | Terblokir | Progres |
|------|------|--------------|---------|----------|-----------|---------|
| 0 | Persiapan | 4 | 1 | 1 | 2 | 25% |
| 1 | Data Gambar | 5 | 0 | 1 | 4 | 0% |
| 2 | Konten Keris | 6 | 4 | 1 | 1 | 67% |
| 3 | Model AI | 5 | 0 | 1 | 4 | 0% |
| 4 | Frontend dan API | 10 | 9 | 1 | 0 | 90% |
| 5 | Integrasi | 4 | 2 | 0 | 2 | 50% |
| 6 | Pengujian | 5 | 1 | 1 | 3 | 20% |
| 7 | Deployment dan APK | 6 | 1 | 1 | 4 | 17% |
| | **Total** | **45** | **18** | **7** | **20** | **40%** |

> Catatan: daftar tugas pada 10.3 berjumlah 45, bukan 46. Angka 46 pada versi dokumen sebelumnya adalah kekeliruan hitung. Angka "Selesai" hanya untuk tugas yang seluruh kriteria "Selesai bila" terpenuhi; konten budaya tetap berstatus draf sampai T2.6.

### 10.3 Daftar Tugas

**Fase 0: Persiapan**

- [!] **T0.1** Konfirmasi seluruh pertanyaan pada Bagian 12.
  - *Selesai bila:* setiap pertanyaan memiliki jawaban tertulis.
  - *Status:* terblokir — 13 pertanyaan belum dijawab pemilik proyek.
- [~] **T0.2** Kumpulkan referensi literatur keris (buku, katalog museum, sumber dari pakar).
  - *Selesai bila:* daftar referensi tersimpan lengkap dengan sumbernya.
  - *Status:* sebagian — daftar awal ada di `docs/referensi.md`; halaman, edisi, dan nomor inventaris belum lengkap.
- [!] **T0.3** Tentukan daftar kategori keris yang didukung.
  - *Selesai bila:* daftar kategori disetujui oleh tim.
  - *Status:* terblokir — enam kategori sementara (`ASUMSI`) belum disetujui tim.
- [x] **T0.4** Siapkan repositori dan lingkungan pengembangan.
  - *Selesai bila:* proyek Next.js, TypeScript, dan Tailwind CSS berjalan secara lokal.
  - *Status:* selesai — Next.js 15, TypeScript strict, Tailwind CSS 3; build dan tes lokal lulus.

**Fase 1: Data Gambar**

- [!] **T1.1** Kumpulkan gambar keris dengan sumber dan izin penggunaan yang jelas.
  - *Selesai bila:* jumlah gambar setiap kelas mencapai target yang disepakati.
  - *Status:* terblokir — belum ada dataset gambar berlisensi.
- [!] **T1.2** Lakukan pelabelan gambar oleh pihak yang memahami keris.
  - *Selesai bila:* seluruh gambar memiliki label yang telah diperiksa.
  - *Status:* terblokir — menunggu dataset dan pelabel ahli.
- [!] **T1.3** Bersihkan data (hapus duplikat, gambar buram, dan label yang salah).
  - *Selesai bila:* tidak ada duplikat dan label telah diverifikasi ulang pada sampel acak.
  - *Status:* terblokir — belum ada data.
- [!] **T1.4** Bagi dataset menjadi data latih, validasi, dan uji.
  - *Selesai bila:* pembagian tercatat dan tidak ada gambar yang muncul di lebih dari satu bagian.
  - *Status:* terblokir — belum ada dataset.
- [~] **T1.5** Dokumentasikan metadata dataset.
  - *Selesai bila:* tersedia ringkasan sumber, jumlah, dan lisensi setiap kelas.
  - *Status:* sebagian — format metadata dan skrip validasi tersedia di `ml/`, tetapi dataset nyata belum ada.

**Fase 2: Konten Keris**

- [~] **T2.1** Desain skema database di Supabase.
  - *Selesai bila:* tabel sesuai Bagian 8 telah dibuat dan diuji.
  - *Status:* sebagian — skema, RLS, dan seed siap di `supabase/`; belum diterapkan/diuji karena proyek Supabase belum tersedia.
- [x] **T2.2** Isi data jenis keris (nama, asal daerah, bentuk, dan ornamen).
  - *Selesai bila:* setiap kategori memiliki entri lengkap.
  - *Status:* selesai untuk enam kategori sementara; semua entri berstatus draf.
- [x] **T2.3** Tulis penjelasan bagian-bagian keris.
  - *Selesai bila:* setiap bagian utama memiliki penjelasan dan sumber.
  - *Status:* selesai dalam bentuk draf; nomor halaman sumber masih perlu dilengkapi.
- [x] **T2.4** Tulis makna filosofis dan nilai budaya setiap jenis.
  - *Selesai bila:* setiap entri memiliki penjelasan dan sumber referensi.
  - *Status:* selesai dalam bentuk draf; belum diverifikasi pakar.
- [x] **T2.5** Susun kamus istilah.
  - *Selesai bila:* istilah pada Glosarium dan istilah tambahan telah dimasukkan.
  - *Status:* selesai — 34 istilah, mencakup 21 istilah glosarium dan 13 istilah tambahan.
- [!] **T2.6** Verifikasi konten oleh pakar atau narasumber.
  - *Selesai bila:* ada catatan persetujuan dari pakar untuk setiap entri.
  - *Status:* terblokir — pakar/narasumber belum ditunjuk.

**Fase 3: Model AI**

- [~] **T3.1** Pilih arsitektur model dan buat baseline.
  - *Selesai bila:* baseline memiliki hasil evaluasi awal.
  - *Status:* sebagian — kerangka baseline MobileNetV3-Small tersedia di `ml/`; belum dijalankan dan arsitektur belum disetujui (Bagian 7.1).
- [!] **T3.2** Latih model awal menggunakan data latih.
  - *Selesai bila:* model menyimpan bobot dan konfigurasi pelatihan.
  - *Status:* terblokir — dataset belum tersedia.
- [!] **T3.3** Evaluasi model menggunakan data uji.
  - *Selesai bila:* metrik pada Bagian 11.4 tercatat di log.
  - *Status:* terblokir — belum ada model terlatih.
- [!] **T3.4** Tentukan ambang keyakinan untuk hasil "tidak dikenali".
  - *Selesai bila:* ambang ditetapkan berdasarkan hasil evaluasi.
  - *Status:* terblokir — ambang demo 0,55 bukan hasil evaluasi.
- [!] **T3.5** Siapkan model untuk dijalankan di layanan inferensi.
  - *Selesai bila:* model dapat dipanggil dan menghasilkan prediksi dari gambar baru.
  - *Status:* terblokir — belum ada model nyata.

**Fase 4: Frontend dan API**

- [x] **T4.1** Siapkan Next.js, TypeScript, dan Tailwind CSS.
  - *Selesai bila:* struktur proyek dasar dapat dijalankan.
  - *Status:* selesai — `npm run dev`, `npm run build`, dan `npm run typecheck` lulus.
- [x] **T4.2** Buat halaman Home.
  - *Selesai bila:* halaman tampil dengan pengenalan dan navigasi.
  - *Status:* selesai — beranda, navigasi atas/bawah, dan bagian etika tersedia.
- [x] **T4.3** Buat AI Scanner (kamera dan unggah galeri).
  - *Selesai bila:* gambar dapat diambil atau diunggah dan dikirim ke API.
  - *Status:* selesai — kamera, unggah, drag-and-drop, pratinjau, dan pemeriksaan kualitas.
- [x] **T4.4** Buat endpoint API analisis gambar.
  - *Selesai bila:* endpoint mengembalikan label, skor, dan data keris.
  - *Status:* selesai untuk klasifier demo; validasi server dan pembatas laju aktif.
- [x] **T4.5** Buat halaman Hasil Identifikasi.
  - *Selesai bila:* keenam komponen hasil tampil dengan benar.
  - *Status:* selesai — enam komponen, kandidat, kualitas, sumber, dan disclaimer.
- [x] **T4.6** Buat halaman Gallery.
  - *Selesai bila:* riwayat scan tampil dan dapat dihapus.
  - *Status:* selesai — galeri lokal maksimum 30 hasil, detail, dan hapus.
- [x] **T4.7** Buat halaman Kamus Keris dengan pencarian dan filter.
  - *Selesai bila:* pencarian dan filter berfungsi.
  - *Status:* selesai — 34 istilah, pencarian, filter kategori, dan keadaan kosong.
- [x] **T4.8** Buat halaman Detail Keris.
  - *Selesai bila:* halaman menampilkan penjelasan lengkap dan sumber.
  - *Status:* selesai — bagian, makna, nilai budaya, sumber, dan status konten.
- [x] **T4.9** Pastikan tampilan responsif di berbagai ukuran layar.
  - *Selesai bila:* seluruh halaman dapat digunakan nyaman di layar ponsel.
  - *Status:* selesai — diuji 390×844 dan 1280×900 tanpa luapan horizontal.
- [~] **T4.10** Siapkan konfigurasi PWA: manifest web, ikon, dan service worker dasar.
  - *Selesai bila:* aplikasi dapat dipasang dari browser Android melalui opsi tambahkan ke layar utama.
  - *Status:* sebagian — manifest, ikon, service worker, dan halaman offline siap; instalasi di perangkat Android belum diuji.

**Fase 5: Integrasi**

- [!] **T5.1** Simpan gambar ke Supabase Storage.
  - *Selesai bila:* URL gambar tersimpan dan dapat diakses.
  - *Status:* terblokir — bucket dan RLS sudah dirancang, tetapi proyek Supabase/kredensial belum tersedia.
- [!] **T5.2** Simpan hasil scan ke tabel `hasil_scan`.
  - *Selesai bila:* data tersimpan saat pengguna memilih simpan ke galeri.
  - *Status:* terblokir — galeri masih lokal; integrasi Supabase menunggu kredensial dan keputusan login (Q7).
- [x] **T5.3** Hubungkan label prediksi dengan data keris.
  - *Selesai bila:* hasil identifikasi menampilkan informasi keris yang sesuai.
  - *Status:* selesai — label dipetakan ke katalog JSON dan ditampilkan pada hasil.
- [x] **T5.4** Tangani error (koneksi, gambar tidak valid, layanan AI gagal).
  - *Selesai bila:* setiap skenario error menampilkan pesan yang jelas.
  - *Status:* selesai — validasi gambar, timeout, error API, dan kuota penyimpanan memiliki pesan; diuji unit/E2E.

**Fase 6: Pengujian**

- [x] **T6.1** Lakukan uji fungsional seluruh fitur.
  - *Selesai bila:* seluruh kasus uji fungsional lulus atau memiliki catatan perbaikan.
  - *Status:* selesai untuk lingkup mode demo — 44 tes unit dan 6 tes E2E lulus.
- [!] **T6.2** Uji akurasi model pada data uji dan gambar baru di luar dataset.
  - *Selesai bila:* hasil dicatat di log dan dibandingkan dengan target.
  - *Status:* terblokir — belum ada model/dataset; klasifier demo tidak boleh diklaim akurat.
- [!] **T6.3** Uji di perangkat Android dengan browser utama.
  - *Selesai bila:* alur scan dapat diselesaikan di perangkat fisik.
  - *Status:* terblokir — belum ada perangkat Android fisik dalam lingkungan ini.
- [~] **T6.4** Uji performa, khususnya waktu respons analisis.
  - *Selesai bila:* waktu respons berada dalam target yang disepakati.
  - *Status:* sebagian — respons lokal 31–35 ms (warm) dan 1,6 s (cold); target resmi belum disepakati.
- [!] **T6.5** Uji keterbacaan konten oleh pengguna umum.
  - *Selesai bila:* responden uji memahami penjelasan tanpa bantuan tambahan.
  - *Status:* terblokir — belum ada responden uji.

**Fase 7: Deployment dan APK**

- [!] **T7.1** Deploy aplikasi ke Vercel.
  - *Selesai bila:* aplikasi dapat diakses melalui URL publik.
  - *Status:* terblokir — akun/akses Vercel belum tersedia.
- [~] **T7.2** Atur environment variable untuk Supabase dan layanan AI.
  - *Selesai bila:* aplikasi berjalan di produksi tanpa menampilkan kunci rahasia di kode.
  - *Status:* sebagian — `.env.example` dan dokumentasi tersedia; environment produksi belum diatur.
- [x] **T7.3** Lengkapi README dan dokumentasi.
  - *Selesai bila:* dokumen cara instalasi, penggunaan, dan pemeliharaan tersedia.
  - *Status:* selesai — README, arsitektur, API, konten, pengujian, Supabase, PWA/TWA, dan status tugas.
- [!] **T7.4** Lakukan serah terima dan pelaporan akhir.
  - *Selesai bila:* laporan akhir disetujui oleh pemangku kepentingan.
  - *Status:* terblokir — persetujuan pemangku kepentingan belum ada.
- [!] **T7.5** Bungkus PWA menjadi APK atau AAB menggunakan TWA, lalu tandatangani dengan keystore.
  - *Selesai bila:* APK dapat dipasang dan dibuka di perangkat Android fisik tanpa bilah alamat browser.
  - *Status:* terblokir — butuh domain HTTPS, Android SDK, dan keystore (tidak disimpan di repositori).
- [!] **T7.6** Siapkan Digital Asset Links dan simpan keystore beserta cadangannya di luar repositori.
  - *Selesai bila:* file assetlinks.json dapat diakses dari domain produksi dan cadangan keystore tersimpan dengan aman.
  - *Status:* terblokir — butuh sertifikat penandatangan produksi dan domain tetap.

### 10.4 Catatan Implementasi (31 Oktober 2026)

Ringkasan pekerjaan yang sudah masuk ke repositori pada cabang `tugas/T4-frontend-api`:

- Aplikasi Next.js 15 + React 19 + TypeScript strict + Tailwind CSS 3 dengan halaman
  Beranda, Scan, Hasil, Galeri, Kamus, dan Detail Keris.
- Endpoint `POST /api/analyze` dengan validasi magic bytes/MIME/dimensi/ukuran,
  pembatas laju, serta klasifier demo deterministik `mock-heuristic-v0.1`.
- Konten: 6 entri keris dan 34 istilah kamus, seluruhnya `draf` dan
  `verifikasiPakar: false`.
- PWA: manifest, ikon 192/512/maskable, service worker, dan halaman offline.
- Supabase: skema, RLS, bucket privat, dan seed SQL siap; **belum diterapkan**.
- ML: kerangka validasi dataset, baseline MobileNetV3-Small, dan evaluasi;
  **belum dijalankan** karena dataset dan keputusan arsitektur belum ada.
- Dokumentasi: README dan `docs/` (asumsi, arsitektur, konten, API, Supabase,
  PWA/TWA, pengujian, referensi, status).
- Hasil verifikasi: 44 tes unit lulus, 6 tes E2E lulus, TypeScript lulus,
  ESLint 0 error/0 warning, build produksi 16 rute.
- Performa lokal endpoint (bukan jaminan produksi): sekitar 31–35 ms setelah
  kompilasi hangat, sekitar 1,6 detik pada permintaan pertama.

Yang **tidak** diklaim: akurasi model, verifikasi budaya oleh pakar, instalasi
Android/APK, penerapan Supabase, dan deployment publik. Semua itu tercatat sebagai
tugas terblokir atau sebagian pada 10.2–10.3 dan di `docs/status.md`.

---

## 11. Log Kinerja Agen

Bagian ini mengatur cara mencatat dan mengevaluasi kinerja agen selama proyek berlangsung.

### 11.1 Tujuan

Log kinerja agen mencatat setiap aktivitas agen, baik model AI identifikasi maupun agen otomatis yang membantu pengembangan (misalnya pembuatan komponen, pengujian, atau penyusunan draf konten). Tujuannya:

- Mengetahui tingkat keberhasilan setiap jenis tugas.
- Mengidentifikasi pola kesalahan yang berulang.
- Menjadi bahan evaluasi sebelum setiap fase dinyatakan selesai.
- Menjadi jejak audit (audit trail) untuk keputusan teknis.

### 11.2 Jenis Agen yang Dicatat

| Agen | Contoh Aktivitas | Metrik Utama |
|------|------------------|--------------|
| Model Klasifikasi Keris | Prediksi jenis keris dari gambar | Akurasi top-1, top-3, waktu inferensi |
| Agen Pengembangan | Pembuatan komponen, perbaikan bug | Tingkat keberhasilan tugas, jumlah revisi |
| Agen Pengujian | Menjalankan skenario uji | Jumlah kasus uji, tingkat kegagalan |
| Agen Konten | Penyusunan draf penjelasan keris | Tingkat revisi oleh pakar, temuan kesalahan fakta |

> Daftar agen ini bersifat contoh dan dapat disesuaikan dengan kebutuhan tim.

### 11.3 Struktur Catatan Log

| Field | Tipe | Wajib | Keterangan |
|-------|------|-------|------------|
| `id_log` | string | Ya | Format `LOG-YYYYMMDD-NNN` |
| `waktu_mulai` | datetime | Ya | Format ISO 8601 |
| `waktu_selesai` | datetime | Ya | Format ISO 8601 |
| `agen` | string | Ya | Nama atau ID agen beserta versinya |
| `jenis_tugas` | string | Ya | Klasifikasi, pengembangan, pengujian, atau konten |
| `deskripsi_tugas` | string | Ya | Ringkasan tugas |
| `input_ringkas` | string | Tidak | Ringkasan input tanpa data pribadi |
| `output_ringkas` | string | Ya | Ringkasan hasil |
| `status` | enum | Ya | `berhasil`, `sebagian`, atau `gagal` |
| `durasi_ms` | integer | Ya | Lama eksekusi dalam milidetik |
| `metrik` | object | Tidak | Angka evaluasi sesuai jenis agen |
| `kesalahan` | string | Tidak | Pesan error atau deskripsi masalah |
| `tindak_lanjut` | string | Tidak | Langkah perbaikan yang direncanakan |
| `ditinjau_oleh` | string | Tidak | Nama peninjau |

### 11.4 Contoh Entri Log

Berikut contoh format dalam bentuk JSON. Nilai yang ada hanya ilustrasi, bukan hasil nyata.

```json
{
  "id_log": "LOG-20261031-001",
  "waktu_mulai": "2026-10-31T09:00:00+07:00",
  "waktu_selesai": "2026-10-31T09:04:30+07:00",
  "agen": "model-klasifikasi-keris-v0.1",
  "jenis_tugas": "klasifikasi",
  "deskripsi_tugas": "Evaluasi model pada data uji batch 3",
  "input_ringkas": "120 gambar data uji",
  "output_ringkas": "Akurasi top-1 dan top-3 dihitung per kelas",
  "status": "berhasil",
  "durasi_ms": 270000,
  "metrik": {
    "akurasi_top1": 0.72,
    "akurasi_top3": 0.88
  },
  "kesalahan": null,
  "tindak_lanjut": "Tambah data latih untuk kelas dengan akurasi terendah",
  "ditinjau_oleh": null
}
```

### 11.5 Metrik Kinerja

| Metrik | Definisi | Target |
|--------|----------|--------|
| Akurasi top-1 | Proporsi prediksi peringkat pertama yang benar | Ditetapkan setelah baseline |
| Akurasi top-3 | Proporsi label yang benar berada di tiga peringkat teratas | Ditetapkan setelah baseline |
| Presisi dan recall per kelas | Kualitas prediksi untuk setiap jenis keris | Ditetapkan setelah baseline |
| Tingkat "tidak dikenali" | Proporsi hasil di bawah ambang keyakinan | Ditetapkan pada T3.4 |
| Waktu respons analisis | Waktu dari unggah gambar sampai hasil tampil | Ditetapkan pada T6.4 |
| Tingkat keberhasilan tugas agen | Jumlah tugas berstatus `berhasil` dibagi total tugas | Ditetapkan oleh tim |
| Tingkat revisi | Jumlah tugas yang harus dikerjakan ulang dibagi total tugas | Ditetapkan oleh tim |
| Tingkat kesalahan konten | Temuan pakar dibagi total entri konten | Ditetapkan oleh tim |

### 11.6 Jadwal Peninjauan

- **Harian** (selama fase aktif): memeriksa log yang berstatus `gagal` dan menentukan tindak lanjut.
- **Mingguan**: merekap metrik dan membandingkannya dengan target.
- **Akhir setiap fase**: evaluasi menyeluruh sebelum lanjut ke fase berikutnya.

### 11.7 Templat Rekap Mingguan

| Minggu | Total Tugas | Berhasil | Sebagian | Gagal | Tingkat Keberhasilan | Temuan Utama | Tindak Lanjut |
|--------|-------------|----------|----------|-------|----------------------|--------------|---------------|
| | | | | | | | |

### 11.8 Aturan Pencatatan

- Setiap tugas yang dijalankan wajib dicatat, termasuk yang gagal.
- Log tidak boleh berisi data pribadi pengguna atau gambar asli. Cukup gunakan referensi ID.
- Status `sebagian` digunakan jika hanya sebagian tujuan tugas tercapai.
- Log bersifat tambah-saja (append-only). Entri lama tidak diubah. Jika ada koreksi, tambahkan entri baru yang merujuk ke ID sebelumnya.

---

## 12. Hal yang Perlu Dikonfirmasi

### 12.1 Pertanyaan Utama

| No | Pertanyaan | Catatan | Status |
|----|------------|---------|--------|
| 1 | Apakah AI mengidentifikasi gambar secara otomatis atau menggunakan kategori keris yang sudah disiapkan? | Klasifikasi dengan kategori tetap lebih realistis untuk tahap awal | Belum dijawab |
| 2 | Apakah dataset gambar dan informasi keris sudah tersedia? | Jika belum, perlu rencana pengumpulan dan pelabelan | Belum dijawab |
| 3 | Apakah aplikasi harus selalu menggunakan koneksi internet? | Saat ini diasumsikan online (`ASUMSI`). Jika harus offline, strategi berpindah ke Capacitor dan model dijalankan di perangkat (lihat Bagian 6.1) | Belum dijawab |
| 4 | Apakah galeri berisi riwayat hasil scan atau koleksi keris yang disediakan aplikasi? | Riwayat pribadi memerlukan fitur login atau penyimpanan perangkat | Belum dijawab |
| 5 | Apakah hasil identifikasi cukup ditampilkan di aplikasi atau perlu dibuat menjadi dokumen? | Jika perlu dokumen, tambahkan fitur ekspor PDF | Belum dijawab |
| 6 | Berapa banyak jenis keris yang harus bisa dikenali? | Menentukan ukuran dataset dan target akurasi | Belum dijawab |

### 12.2 Pertanyaan Tambahan yang Disarankan

| No | Pertanyaan | Alasan | Status |
|----|------------|--------|--------|
| 7 | Apakah pengguna perlu login? | Memengaruhi tabel `hasil_scan` dan keamanan data | Belum dijawab |
| 8 | Apakah aplikasi hanya tersedia dalam Bahasa Indonesia atau juga dalam bahasa lain? | Memengaruhi konten dan biaya terjemahan | Belum dijawab |
| 9 | Siapa pakar atau narasumber yang memverifikasi konten? | Diperlukan untuk T2.6 | Belum dijawab |
| 10 | Di mana layanan AI dijalankan: di dalam API Route atau sebagai layanan terpisah? | Memengaruhi arsitektur dan biaya hosting (lihat Bagian 7.1) | Belum dijawab |
| 11 | Apakah ada anggaran untuk layanan pihak ketiga atau hosting tambahan? | Memengaruhi pilihan opsi A, B, atau C | Belum dijawab |
| 12 | Bagaimana APK akan didistribusikan: melalui Google Play atau dibagikan langsung sebagai berkas APK? | Google Play memerlukan akun pengembang dan biaya pendaftaran satu kali. Berbagi langsung lebih sederhana untuk tahap uji. | Belum dijawab |
| 13 | Apakah ada fitur native (misalnya kontrol kamera khusus atau notifikasi) yang wajib tersedia? | Menentukan apakah TWA sudah cukup atau perlu beralih ke Capacitor (lihat Bagian 6.1) | Belum dijawab |

---

## 13. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Dataset terbatas atau tidak seimbang | Akurasi rendah pada kelas tertentu | Tambah data, augmentasi, dan evaluasi per kelas |
| Kesalahan informasi budaya | Pengguna menerima informasi yang keliru | Verifikasi pakar dan pencantuman sumber |
| Hasil prediksi dianggap pasti | Kepercayaan berlebihan pada hasil AI | Tampilkan skor keyakinan dan disclaimer |
| Model terlalu berat untuk serverless | Deployment gagal atau respons lambat | Gunakan layanan inferensi terpisah atau kompresi model |
| Masalah hak cipta gambar | Risiko hukum | Gunakan sumber berlisensi atau izin tertulis |
| Koneksi internet tidak stabil | Pengalaman pengguna buruk | Kompresi gambar sebelum unggah, indikator loading, dan opsi offline jika disepakati |
| Gambar berkualitas rendah | Identifikasi gagal | Validasi kualitas gambar dan panduan pengambilan foto |
| Cakupan kategori terlalu luas di awal | Waktu pengembangan membengkak | Mulai dari jumlah kategori kecil lalu tambah bertahap |
| Keystore APK hilang | Pembaruan aplikasi tidak dapat dilakukan dengan paket yang sama | Simpan keystore di tempat aman dan buat cadangan terenkripsi |
| Verifikasi Digital Asset Links gagal | APK tampil dengan bilah alamat browser | Pastikan domain HTTPS aktif dan assetlinks.json sesuai dengan package name dan sidik jari sertifikat |

---

## 14. Kriteria Keberhasilan

- Pengguna dapat menyelesaikan alur scan dari awal sampai hasil tampil tanpa bantuan.
- Enam komponen hasil identifikasi tampil untuk setiap kategori yang didukung.
- Konten keris telah diverifikasi oleh pakar.
- Metrik akurasi mencapai target yang disepakati (Bagian 11.5).
- Aplikasi dapat diakses melalui browser di perangkat Android dengan tampilan yang nyaman.
- Dokumentasi tersedia untuk pengembangan lanjutan.

---

## 15. Catatan Etika dan Budaya

- Keris merupakan warisan budaya yang bagi sebagian masyarakat memiliki nilai adat dan spiritual. Konten harus disampaikan dengan hormat dan tidak menyederhanakan makna secara keliru.
- Makna filosofis bersifat tradisional dan dapat berbeda antar daerah atau komunitas. Penjelasan dalam aplikasi sebaiknya ditampilkan sebagai salah satu perspektif, bukan kebenaran tunggal.
- Hasil AI adalah perkiraan. Cantumkan disclaimer pada halaman hasil identifikasi.
- Hindari klaim tentang nilai ekonomi atau keaslian pusaka (misalnya harga atau keaslian keris), kecuali sudah ditinjau oleh ahli.
- Cantumkan sumber dan atribusi untuk setiap gambar dan penjelasan.

---

## 16. Glosarium

| Istilah | Arti |
|---------|------|
| Keris | Senjata tikam tradisional dari Nusantara yang juga berfungsi sebagai pusaka dan simbol budaya |
| Bilah | Badan keris yang tajam, bagian utama yang ditempa dari logam |
| Luk | Lekukan pada bilah keris |
| Pamor | Pola pada permukaan bilah yang muncul dari perpaduan dan pelipatan logam saat penempaan |
| Hulu | Gagang atau pegangan keris |
| Warangka | Sarung keris |
| Empu | Pengrajin atau pembuat keris yang ahli |
| Ornamen | Hiasan pada keris, termasuk ukiran dan motif |
| Skor keyakinan (confidence) | Tingkat keyakinan model terhadap prediksinya, biasanya antara 0 dan 1 |
| Akurasi top-1 | Persentase prediksi peringkat pertama yang benar |
| Akurasi top-3 | Persentase label yang benar berada di tiga peringkat teratas |
| Pra-pemrosesan | Tahap menyiapkan gambar sebelum dianalisis model |
| Computer Vision | Bidang AI yang memungkinkan komputer memahami isi gambar |
| PWA | Progressive Web App, aplikasi web yang dapat dipasang seperti aplikasi biasa |
| TWA | Trusted Web Activity, cara menampilkan PWA di dalam aplikasi Android tanpa bilah alamat browser |
| APK | Paket instalasi aplikasi Android yang dapat langsung dipasang di perangkat |
| AAB | Android App Bundle, format unggah aplikasi ke Google Play |
| Keystore | Berkas kunci untuk menandatangani aplikasi Android |
| Digital Asset Links | Berkas verifikasi yang menghubungkan domain dengan aplikasi Android |
| Capacitor | Framework untuk membungkus aplikasi web menjadi aplikasi native dengan akses ke fitur perangkat |
| Append-only | Sifat log yang hanya menambah catatan dan tidak mengubah catatan lama |

---

## Riwayat Versi

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 0.1 | 31 Oktober 2026 | Draf awal |
| 0.2 | 31 Oktober 2026 | Menambahkan strategi distribusi Android melalui PWA dan TWA (Bagian 6.1), tugas T4.10, T7.5, dan T7.6, risiko terkait APK, serta pertanyaan 12 dan 13. |
| 0.3 | 31 Oktober 2026 | Memperbarui status 45 tugas (18 selesai, 7 sebagian, 20 terblokir), menambahkan catatan implementasi 10.4, dan mengoreksi jumlah tugas dari 46 menjadi 45. |

---

*Dokumen ini merupakan rancangan awal proyek. Detail fitur, dataset, teknologi AI, dan platform akhir masih perlu disepakati sebelum proses pengembangan dimulai.*
