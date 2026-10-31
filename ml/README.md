# Modul Machine Learning

> **Status: belum dijalankan.** Dataset gambar dan keputusan arsitektur model belum
> tersedia (Bagian 12 Q1/Q2/Q6/Q10). Skrip di folder ini adalah kerangka untuk Fase 3
> dan **bukan** model produksi. Tidak ada metrik akurasi yang diklaim.

## Struktur dataset yang diharapkan

```text
ml/dataset/
├── train/<kelas>/*.jpg
├── val/<kelas>/*.jpg
├── test/<kelas>/*.jpg
└── metadata.csv          # opsional, lihat manifest.example.csv
```

Kelas harus sama di ketiga split. Rasio awal yang disarankan 70:15:15, tetapi keputusan
final menunggu T1.4. Jangan memasukkan gambar tanpa sumber/lisensi.

## Perintah

```bash
python -m venv .venv
.venv/Scripts/activate        # Windows
pip install -r ml/requirements.txt

# 1. Validasi struktur, duplikat, dan metadata
python ml/scripts/validate_dataset.py --dataset ml/dataset --report ml/laporan-validasi.json

# 2. Baseline (hanya setelah dataset dan arsitektur disetujui)
python ml/scripts/train_baseline.py --dataset ml/dataset --output ml/runs/baseline

# 3. Evaluasi pada data uji
python ml/scripts/evaluate.py \
  --checkpoint ml/runs/baseline/model.pt \
  --test-dir ml/dataset/test \
  --output ml/runs/baseline/evaluasi.json
```

Semua perintah di atas **belum dijalankan** karena tidak ada dataset dan dependensi
Python belum dipasang. Jangan menandai T3.2–T3.5 selesai sebelum ada hasil nyata.

## Keputusan yang masih terbuka

- Arsitektur final dan layanan inferensi (Bagian 7.1) — perlu persetujuan.
- Jumlah kelas dan target akurasi (Q1/Q6, T0.3).
- Ambang "tidak dikenali" — ditetapkan dari evaluasi (T3.4), bukan dari angka demo 0,55.
- Apakah model berjalan di API Route, layanan Python, atau API pihak ketiga.

## Etika data

- Setiap gambar wajib memiliki sumber, lisensi/izin, dan tanggal.
- Jangan memakai gambar dari internet tanpa izin.
- Hapus metadata pribadi dari gambar sebelum masuk dataset.
- Dataset tidak boleh masuk repositori publik tanpa persetujuan lisensi.
- Model hanya mengenali kelas yang ada di dataset; hasil tetap perkiraan.
