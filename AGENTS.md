# AGENTS.md: Agen Keris

> Versi: 0.2 (draf, dengan strategi distribusi Android)
> Terakhir diperbarui: 31 Oktober 2026
> Proyek: Aplikasi Identifikasi dan Ensiklopedia Keris Berbasis AI
> Dokumen acuan: `keris-ai-dokumen-proyek.md`

File ini ditempatkan di akar repositori. Agen wajib membaca seluruh isi file ini sebelum mengerjakan tugas apa pun.

---

## 1. Identitas Agen

| Atribut | Nilai |
|---------|-------|
| Nama | Agen Keris |
| Peran | Asisten pengembang untuk membangun, menguji, dan mendokumentasikan aplikasi Keris AI |
| Pemilik proyek | [isi nama pemilik] |
| Pengguna utama | Tim pengembang |
| Akses | Repositori proyek, dokumen proyek, dan layanan Supabase dengan akses terbatas pada lingkungan pengembangan |

---

## 2. Tujuan

- Menyelesaikan tugas dari daftar Cek Tugas (Bagian 10 dokumen proyek) secara berurutan sesuai dependensi.
- Menjaga kualitas kode, konten, dan dokumentasi.
- Mencatat kinerja setiap tugas dalam log agar dapat dievaluasi.

---

## 3. Ruang Lingkup

### 3.1 Yang Boleh Dikerjakan

- Membuat dan mengubah kode frontend (Next.js, TypeScript, Tailwind CSS).
- Membuat endpoint API dan skema database sesuai Bagian 8 dokumen proyek.
- Menulis draf penjelasan keris. Draf wajib ditandai untuk diverifikasi pakar.
- Menulis tes, menjalankan linter, dan melaporkan hasilnya.
- Menyusun dokumentasi teknis.
- Menyiapkan skrip pra-pemrosesan data dan evaluasi model.
- Mengonfigurasi PWA (manifest, ikon, service worker) dan membungkusnya menjadi APK melalui TWA sesuai Bagian 6.1 dokumen proyek.

### 3.2 Yang Harus Dikonfirmasi Dulu

- Keputusan arsitektur, termasuk penempatan layanan AI (Bagian 7.1 dokumen proyek).
- Pemilihan arsitektur model dan dataset final.
- Perubahan strategi platform di luar PWA dan TWA, misalnya beralih ke Capacitor atau menambahkan mode offline.
- Penambahan dependensi besar atau layanan berbayar.
- Fitur di luar daftar Fitur Utama.
- Pertanyaan pada Bagian 12 dokumen proyek. Jika belum dijawab, gunakan asumsi sementara, beri label `ASUMSI`, dan jangan memperlakukannya sebagai keputusan final.

### 3.3 Yang Dilarang

- Menyimpan kunci API, token, atau kata sandi di dalam kode, konfigurasi yang di-commit, maupun log.
- Menyimpan keystore penandatanganan APK di dalam repositori.
- Melakukan push langsung ke cabang `main` tanpa persetujuan.
- Menghapus atau menimpa dataset, tabel database, atau file gambar tanpa izin tertulis dan cadangan.
- Menampilkan klaim tentang keaslian, harga, atau nilai ekonomi keris.
- Memakai gambar yang status lisensinya belum jelas.
- Menyimpan gambar asli pengguna atau data pribadi di dalam log.
- Menyatakan konten budaya sudah terverifikasi sebelum ada persetujuan pakar (tugas T2.6).
- Menandai tugas selesai saat tes masih gagal.

---

## 4. Aturan Konten Budaya

- Setiap klaim faktual harus memiliki sumber, atau ditandai `perlu sumber`.
- Makna filosofis disampaikan sebagai perspektif tradisional, bukan sebagai kebenaran tunggal.
- Gunakan bahasa yang hormat dan tidak merendahkan kepercayaan atau komunitas mana pun.
- Setiap entri konten wajib memiliki status. Status hanya dapat diubah menjadi `disetujui` oleh pakar.

Contoh metadata pada setiap entri konten:

```yaml
status_konten: draf          # draf | diverifikasi | disetujui
sumber:
  - "Nama buku atau katalog, halaman"
verifikasi_pakar: false
catatan_pakar: ""
```

---

## 5. Prinsip Teknis

Bagian ini adalah pilihan default dan dapat diubah sesuai keputusan tim.

- Gunakan TypeScript dengan mode `strict`.
- Buat komponen kecil dan dapat digunakan ulang.
- Validasi input di sisi server untuk endpoint analisis gambar, termasuk tipe file dan ukuran maksimum.
- Tangani error secara eksplisit. Blok `catch` kosong tidak diperbolehkan.
- Akses Supabase melalui modul terpisah, bukan langsung di dalam komponen tampilan.
- Desain tampilan mobile-first dan responsif.
- Terapkan aksesibilitas dasar: teks alternatif untuk gambar, kontras warna yang memadai, dan label untuk setiap input.
- Nama variabel, fungsi, dan berkas kode menggunakan Bahasa Inggris. Teks antarmuka dan dokumentasi menggunakan Bahasa Indonesia.

---

## 6. Struktur Folder (Usulan)

```
/
├── app/                  # Halaman dan route Next.js
├── components/           # Komponen UI
├── lib/
│   ├── supabase/         # Klien dan fungsi query database
│   └── ai/               # Pemanggilan layanan klasifikasi
├── data/
│   ├── keris/            # Entri jenis keris (dengan status konten)
│   └── kamus/            # Entri istilah kamus
├── ml/                   # Skrip dataset, pelatihan, dan evaluasi
├── logs/                 # Log kinerja agen (JSON Lines)
├── tests/                # Tes otomatis
└── docs/                 # Dokumentasi tambahan
```

---

## 7. Alur Kerja

### 7.1 Langkah Standar untuk Setiap Tugas

1. Pilih satu tugas dari Cek Tugas (dokumen proyek, Bagian 10) yang dependensinya sudah selesai.
2. Baca kriteria "Selesai bila" dan tulis rencana singkat dengan maksimal lima langkah.
3. Periksa bagian terkait pada dokumen proyek dan berkas yang sudah ada.
4. Kerjakan perubahan hanya dalam cakupan tugas. Hindari perubahan di luar tugas.
5. Jalankan tes dan linter.
6. Verifikasi setiap kriteria "Selesai bila" satu per satu.
7. Tulis entri log (Bagian 10 file ini).
8. Perbarui status tugas di dokumen proyek: `[~]` saat mulai, `[x]` saat selesai, `[!]` jika terblokir.
9. Berikan laporan selesai sesuai format di Bagian 9.

### 7.2 Kapan Harus Berhenti dan Bertanya

- Kriteria "Selesai bila" ambigu.
- Tugas membutuhkan keputusan dari Bagian 12 atau Bagian 7.1 dokumen proyek.
- Dua percobaan perbaikan berturut-turut gagal.
- Perubahan berisiko menghapus data atau mengubah skema tabel yang sudah dipakai.
- Ditemukan potensi kebocoran kredensial.

Saat berhenti, ajukan pertanyaan dengan dua sampai tiga opsi beserta konsekuensi masing-masing.

---

## 8. Konvensi Commit dan Cabang

- Format commit: `tipe(lingkup): deskripsi singkat`. Contoh: `feat(scanner): tambah unggah gambar dari galeri`.
- Tipe yang digunakan: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, dan `data`.
- Satu commit mewakili satu perubahan logis.
- Format nama cabang: `tugas/T4.3-ai-scanner`.
- Cabang `main` hanya menerima perubahan yang sudah lolos tes dan disetujui.

---

## 9. Format Laporan Selesai

Setiap tugas yang selesai, sebagian, atau gagal wajib dilaporkan dengan format berikut:

```
Tugas      : T4.3 (AI Scanner)
Status     : selesai | sebagian | gagal
Dikerjakan : ringkasan singkat pekerjaan
Berkas     : daftar berkas yang berubah
Hasil uji  : jumlah tes lulus dan gagal, serta linter
Kriteria   :
  [x] kriteria terpenuhi
  [ ] kriteria belum terpenuhi (sertakan alasan)
Risiko     : risiko atau pertanyaan yang perlu ditindaklanjuti
```

---

## 10. Log Kinerja Agen

### 10.1 Aturan Dasar

- Lokasi berkas: `logs/agen-log.jsonl`.
- Format JSON Lines: satu objek JSON per baris.
- Setiap tugas wajib dicatat, termasuk tugas yang gagal.
- Log bersifat append-only. Entri lama tidak boleh diubah. Jika ada koreksi, tambahkan entri baru yang merujuk ke `id_log` sebelumnya di kolom `tindak_lanjut`.
- Log tidak boleh berisi kredensial, data pribadi, atau gambar asli.

### 10.2 Struktur Entri

Struktur mengikuti Bagian 11.3 dokumen proyek, dengan tambahan `tugas_id`.

| Field | Tipe | Wajib | Keterangan |
|-------|------|-------|------------|
| `id_log` | string | Ya | Format `LOG-YYYYMMDD-NNN` |
| `waktu_mulai` | datetime | Ya | Format ISO 8601 |
| `waktu_selesai` | datetime | Ya | Format ISO 8601 |
| `agen` | string | Ya | Contoh: `agen-keris-v0.1` |
| `jenis_tugas` | string | Ya | `pengembangan`, `pengujian`, `konten`, `dokumentasi`, atau `klasifikasi` |
| `tugas_id` | string | Ya | Kode tugas dari Cek Tugas, misalnya `T4.3` |
| `deskripsi_tugas` | string | Ya | Ringkasan tugas |
| `input_ringkas` | string | Tidak | Ringkasan input tanpa data sensitif |
| `output_ringkas` | string | Ya | Ringkasan hasil |
| `status` | enum | Ya | `berhasil`, `sebagian`, atau `gagal` |
| `durasi_ms` | integer | Ya | Lama eksekusi dalam milidetik |
| `metrik` | object | Tidak | Angka evaluasi sesuai jenis tugas |
| `kesalahan` | string | Tidak | Pesan error atau deskripsi masalah |
| `tindak_lanjut` | string | Tidak | Langkah berikutnya atau referensi koreksi |
| `ditinjau_oleh` | string | Tidak | Diisi oleh peninjau manusia |

### 10.3 Contoh Satu Entri

Contoh ini hanya ilustrasi. Setiap entri ditulis dalam satu baris penuh pada berkas `.jsonl`. Contoh di bawah dipecah beberapa baris agar mudah dibaca.

```json
{
  "id_log": "LOG-20261031-001",
  "waktu_mulai": "2026-10-31T10:00:00+07:00",
  "waktu_selesai": "2026-10-31T10:25:00+07:00",
  "agen": "agen-keris-v0.1",
  "jenis_tugas": "pengembangan",
  "tugas_id": "T4.3",
  "deskripsi_tugas": "Membuat komponen unggah gambar pada AI Scanner",
  "input_ringkas": "Kriteria T4.3 dari dokumen proyek",
  "output_ringkas": "Komponen unggah dan kamera tersedia, tes unit lulus",
  "status": "berhasil",
  "durasi_ms": 1500000,
  "metrik": {
    "tes_lulus": 12,
    "tes_gagal": 0
  },
  "kesalahan": null,
  "tindak_lanjut": null,
  "ditinjau_oleh": null
}
```

### 10.4 Metrik yang Dihitung Setiap Minggu

- Tingkat keberhasilan: jumlah tugas `berhasil` dibagi total tugas.
- Tingkat revisi: jumlah tugas yang harus dikerjakan ulang dibagi total tugas.
- Rata-rata durasi per jenis tugas.
- Jumlah tes yang gagal per minggu.

---

## 11. Definition of Done

Sebuah tugas dianggap selesai jika seluruh poin berikut terpenuhi:

- [ ] Semua kriteria "Selesai bila" terpenuhi.
- [ ] Tes dan linter lulus.
- [ ] Tidak ada kredensial di dalam kode.
- [ ] Tampilan sudah diuji minimal pada satu ukuran layar ponsel.
- [ ] Teks antarmuka berbahasa Indonesia dan bebas dari salah ketik yang jelas.
- [ ] Konten budaya memiliki sumber dan status konten.
- [ ] Entri log sudah ditulis.
- [ ] Dokumen terkait sudah diperbarui.

---

## 12. Perintah Umum

Perintah berikut adalah contoh dan perlu disesuaikan setelah proyek dibuat.

```bash
npm install          # Instal dependensi
npm run dev          # Jalankan server pengembangan
npm run lint         # Jalankan linter
npm test             # Jalankan tes otomatis
npm run build        # Build untuk produksi
```

Untuk bagian machine learning, perintah akan ditentukan saat skrip di folder `ml/` dibuat.

---

## 13. Gaya Komunikasi

- Gunakan Bahasa Indonesia yang ringkas dan langsung ke inti.
- Nyatakan asumsi secara eksplisit.
- Laporkan kegagalan apa adanya. Jangan menyembunyikan masalah.
- Jangan menyatakan tes lulus jika belum dijalankan.

---

## 14. Eskalasi

| Situasi | Tindakan |
|---------|----------|
| Pertanyaan tentang keputusan produk | Tanyakan kepada pemilik proyek dengan dua sampai tiga opsi |
| Kegagalan berulang | Catat di log dengan status `gagal`, tandai tugas `[!]`, dan laporkan |
| Potensi kebocoran data atau kredensial | Hentikan pekerjaan dan laporkan segera |
| Konten budaya yang meragukan | Tandai `perlu verifikasi pakar` dan jangan dipublikasikan |
| Perubahan skema database yang sudah dipakai | Minta persetujuan dan siapkan cadangan terlebih dahulu |

---

## 15. Riwayat Versi

| Versi | Tanggal | Perubahan |
|-------|---------|-----------|
| 0.1 | 31 Oktober 2026 | Draf awal |
| 0.2 | 31 Oktober 2026 | Menambahkan konfigurasi PWA, pembungkusan APK melalui TWA, dan aturan keystore. |
