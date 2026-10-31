# Dataset Gambar Keris

Folder ini sengaja kosong. Dataset belum dikumpulkan (T1.1–T1.5).

## Struktur

```text
train/<kelas>/*.jpg
val/<kelas>/*.jpg
test/<kelas>/*.jpg
metadata.csv
```

## Metadata

Gunakan `manifest.example.csv` sebagai format awal. Setiap gambar wajib memiliki:

- `file` — path relatif terhadap folder dataset
- `class` — harus sama dengan nama folder kelas
- `split` — train/val/test
- `source` — nama buku, museum, atau sumber lain
- `license` — lisensi atau izin tertulis
- `author` — pemilik/penulis gambar (boleh "tidak diketahui" bila sumber jelas)
- `date` — tanggal pengambilan
- `sha256` — opsional; validator menghitung sendiri
- `notes` — catatan, misalnya batas penggunaan

## Aturan

- Jangan mencampur satu gambar di lebih dari satu split.
- Hindari duplikat dan gambar buram; validator memeriksa duplikat berdasarkan hash.
- Jangan memakai gambar tanpa lisensi.
- Jangan menyimpan data pribadi di nama berkas.
- Simpan cadangan dataset di luar repositori.
