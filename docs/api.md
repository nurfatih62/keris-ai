# API Analisis

## `POST /api/analyze`

Menganalisis satu gambar dan mengembalikan prediksi demo beserta data katalog.

- Content-Type: `multipart/form-data`
- Field gambar: `gambar` (wajib)
- Field petunjuk demo: `namaAsli` (opsional, maksimum 160 karakter)
- Batas: 8 MB; JPEG/PNG/WebP; minimum 300×300; maksimum 8000×8000
- Pembatas laju: 20 permintaan/menit per IP (per instance)
- Runtime: Node.js; durasi maksimum 30 detik

### Contoh

```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "gambar=@foto-keris.jpg" \
  -F "namaAsli=foto-keris.jpg"
```

### Respons 200

```json
{
  "id": "0f7c2f7e-...",
  "dibuatPada": "2026-10-31T12:00:00.000Z",
  "mode": "demo",
  "gambarUrl": null,
  "kualitas": {
    "status": "baik",
    "lebar": 1200,
    "tinggi": 900,
    "catatan": ["Resolusi gambar memadai."]
  },
  "hasil": {
    "label": "keris-bali",
    "nama": "Keris Bali",
    "skorKeyakinan": 0.82,
    "kandidat": [
      { "slug": "keris-bali", "nama": "Keris Bali", "skor": 0.82 },
      { "slug": "keris-bugis", "nama": "Keris Bugis", "skor": 0.66 },
      { "slug": "keris-patani", "nama": "Keris Patani", "skor": 0.54 }
    ],
    "tidakDikenali": false,
    "ambangKeyakinan": 0.55,
    "mode": "demo",
    "model": "mock-heuristic-v0.1",
    "catatan": "Prediksi ini berasal dari klasifier demo..."
  },
  "keris": { "slug": "keris-bali", "nama": "Keris Bali", "..." : "..." },
  "alternatif": [
    { "slug": "keris-bugis", "nama": "Keris Bugis", "asalDaerah": "...", "skor": 0.66 }
  ]
}
```

Gambar tidak dikembalikan dan tidak disimpan. `gambarUrl` selalu `null` pada mode demo.

### Error

| Status | Kode | Penyebab |
|--------|------|----------|
| 400 | `gambar_tidak_ada` | Field `gambar` tidak ada |
| 400 | `gambar_tidak_valid` / `dimensi_*` | Gambar rusak atau dimensi tidak memenuhi syarat |
| 413 | `terlalu_besar` | Melebihi 8 MB |
| 415 | `format_tidak_didukung` / `mime_tidak_cocok` | Format atau MIME tidak sesuai |
| 429 | `terlalu_banyak_permintaan` | Melebihi pembatas laju; lihat `Retry-After` |
| 500 | `analisis_gagal` | Kegagalan internal |

Bentuk error:

```json
{ "error": { "kode": "gambar_tidak_ada", "pesan": "Silakan pilih gambar keris terlebih dahulu." } }
```

`GET /api/analyze` mengembalikan 405 dengan header `Allow: POST`.

## Mengganti klasifier demo

1. Implementasikan `classifyKeris(input: ClassifyInput): Promise<ClassificationResult>`
   di `lib/ai/` (misalnya panggilan ke layanan inferensi).
2. Pastikan label yang dikembalikan sama dengan `keris.kategori` di katalog.
3. Pertahankan `mode`, `model`, `ambangKeyakinan`, dan bentuk `kandidat`.
4. Hapus petunjuk nama berkas dari jalur produksi.
5. Tambahkan tes akurasi dan catat metrik di log (T3.3–T3.5, T6.2).
