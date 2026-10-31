# Asumsi dan Keputusan Tertunda

Dokumen proyek Bagian 12 belum dijawab. Sesuai AGENTS.md, pekerjaan memakai asumsi
sementara berlabel **ASUMSI**. Asumsi ini tidak boleh dianggap keputusan final.

| Kode | Asumsi | Alasan | Pertanyaan terkait |
|------|--------|--------|--------------------|
| A1 | Enam kategori awal: Majapahit, Bali, Bugis, Minangkabau, Madura, Patani | Cakupan kecil agar realistis; dapat berubah | Q1, Q6, T0.3 |
| A2 | Klasifikasi memilih dari kategori tetap | Lebih realistis untuk tahap awal | Q1 |
| A3 | Aplikasi berjalan online | PWA + API Route; belum ada mode offline penuh | Q3 |
| A4 | Galeri = riwayat pribadi di perangkat, tanpa login | Menghindari keputusan autentikasi yang belum ada | Q4, Q7 |
| A5 | Hasil hanya ditampilkan di aplikasi, belum ekspor PDF | Tidak ada fitur di luar daftar Fitur Utama | Q5 |
| A6 | Antarmuka hanya Bahasa Indonesia | Sesuai dokumen proyek | Q8 |
| A7 | Layanan AI ditempatkan di API Route Next.js (sementara) | Paling sederhana untuk klasifier demo | Q10, Bagian 7.1 |
| A8 | Format JPEG/PNG/WebP, maksimum 8 MB, minimum 300 piksel | Batas awal yang aman untuk browser | Kebutuhan 3.2 |
| A9 | Ambang "tidak dikenali" 0,55 | Nilai sementara; final menunggu evaluasi T3.4 | T3.4 |
| A10 | Target respons analisis < 5 detik di lingkungan lokal | Belum ada target resmi | T6.4 |
| A11 | Belum memakai gambar referensi apa pun | Lisensi belum jelas; dilarang AGENTS.md | T1.1 |
| A12 | Distribusi APK langsung (bukan Google Play) | Paling sederhana untuk tahap uji | Q12 |
| A13 | Tidak ada fitur native khusus | TWA dianggap cukup sampai dibuktikan sebaliknya | Q13 |
| A14 | Penyimpanan galeri memakai `localStorage`, maksimum 30 hasil | Kuota browser terbatas; tanpa login | Q4, Q7 |

## Keputusan yang diminta dari pemilik proyek

1. **Q1/Q6** — kategori final dan jumlah kelas yang didukung.
2. **Q7** — perlu login atau tidak; menentukan apakah galeri cloud/Supabase Storage
   diaktifkan.
3. **Q10/Q11** — penempatan layanan AI dan anggaran hosting/model.
4. **Q9** — pakar/narasumber untuk T2.6.
5. **Q12** — jalur distribusi APK dan akun penandatanganan.
6. **Q13** — kebutuhan fitur native yang menentukan TWA vs Capacitor.

## Tugas yang terblokir atau menunggu

| Tugas | Blokir |
|-------|--------|
| T0.1, T0.3 | Jawaban pemilik proyek dan persetujuan kategori |
| T1.1–T1.4 | Dataset gambar dan lisensi belum tersedia |
| T1.5 | Sebagian: format metadata siap, dataset belum ada |
| T2.1 | Sebagian: skema siap, proyek Supabase/kredensial belum tersedia |
| T2.6 | Pakar belum ditunjuk |
| T3.1–T3.5 | Sebagian untuk T3.1: kerangka baseline ada; dataset dan keputusan arsitektur model belum ada |
| T5.1–T5.2 | Supabase Storage, login, dan kredensial |
| T6.2–T6.3, T6.5 | Model terlatih, perangkat Android fisik, dan responden uji |
| T6.4 | Sebagian: performa lokal terukur, target resmi belum disepakati |
| T7.1, T7.2, T7.4–T7.6 | Akun Vercel/Play, domain HTTPS, keystore, perangkat, dan persetujuan akhir |

Skema Supabase dan panduan TWA sudah disiapkan agar tugas-tugas tersebut dapat
dilanjutkan tanpa menulis ulang fondasi.
