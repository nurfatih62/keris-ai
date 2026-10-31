# Konten Budaya

## Prinsip

- Setiap klaim faktual memiliki sumber atau ditandai `perlu sumber`.
- Makna filosofis disampaikan sebagai perspektif tradisional, bukan kebenaran tunggal.
- Bahasa hormat; tidak merendahkan kepercayaan atau komunitas mana pun.
- Tidak ada klaim keaslian, harga, atau nilai ekonomi keris.
- Status konten hanya dapat menjadi `disetujui` oleh pakar (T2.6).

## Siklus status

```text
draf ──► diverifikasi ──► disetujui
  ▲            │              │
  └── revisi ◄─┴──────────────┘
```

| Status | Arti | Boleh tampil? |
|--------|------|---------------|
| `draf` | Ditulis agen; sumber belum lengkap | Ya, dengan label jelas |
| `diverifikasi` | Sudah diperiksa, menunggu persetujuan | Ya, dengan label |
| `disetujui` | Disetujui pakar | Ya |

Saat ini **seluruh entri berstatus `draf` dan `verifikasiPakar: false`**. Status ini
ditampilkan di halaman detail, hasil identifikasi, kamus, dan footer.

## Struktur entri keris

`data/keris/*.json` divalidasi oleh `lib/content/schema.ts`:

| Field | Keterangan |
|-------|------------|
| `slug` | ID unik untuk URL |
| `nama`, `kategori` | Nama tampilan dan label model |
| `asalDaerah` | Daerah/gaya |
| `bentukBilah` | Deskripsi bentuk |
| `jumlahLuk`, `keteranganLuk` | Angka contoh (null bila bervariasi) + penjelasan |
| `ornamen` | Daftar ornamen |
| `bagian` | Objek penjelasan bilah, luk, pamor, hulu, warangka, mendak, dll. |
| `maknaFilosofis`, `nilaiBudaya` | Narasi budaya |
| `sumberReferensi` | Daftar sumber; wajib tidak kosong |
| `gambarReferensi` | `null` sampai ada aset berlisensi |
| `statusKonten`, `verifikasiPakar`, `catatanPakar` | Tata kelola konten |

## Sumber

Sumber awal yang dipakai (lihat `docs/referensi.md`):

- Haryono Haryoguritno, *Keris Jawa: Antara Mistik dan Nalar* (2006).
- H. Bambang Harsrinuksmo, *Ensiklopedia Keris* (2004).
- Edward Frey, *The Kris: Mystic Weapon of the Malay World* (1988).
- Catatan koleksi museum (Museum Nasional, Museum Bali, Museum La Galigo,
  Museum Adityawarman).

**Keterbatasan:** nomor halaman, nomor inventaris, dan edisi yang tepat belum dilengkapi.
Setiap sumber diberi akhiran “halaman perlu dilengkapi”. Ini harus diselesaikan sebelum
T2.6.

## Gambar

Belum ada gambar referensi yang dipakai. Ikon dan ilustrasi di antarmuka dibuat sendiri
melalui `scripts/generate-icons.mjs`. Gambar pengguna tidak disimpan di server dan tidak
masuk log. Jangan menambahkan gambar dari internet tanpa lisensi/izin tertulis.

## Daftar periksa verifikasi pakar (T2.6)

- [ ] Identitas dan kredensial pakar dicatat.
- [ ] Setiap klaim faktual dicocokkan dengan sumber/halaman.
- [ ] Istilah lokal dan ejaan diperiksa.
- [ ] Narasi filosofis dinilai tidak menyederhanakan atau menyesatkan.
- [ ] Perbedaan tafsir antardaerah dicatat.
- [ ] Lisensi gambar diverifikasi.
- [ ] Status diubah menjadi `disetujui` hanya oleh pakar.
- [ ] `catatanPakar` diisi untuk setiap entri.
- [ ] Log agen mencatat tinjauan (`ditinjau_oleh`).

## Menambah entri

1. Buat `data/keris/<slug>.json` sesuai skema.
2. Tambahkan impor di `lib/data/catalog.ts`.
3. Perbarui `KEYWORDS` di `lib/ai/classifier.ts` bila perlu (khusus demo).
4. Jalankan `npm test`, `npm run lint`, dan `npm run seed:supabase`.
5. Tambahkan istilah terkait ke `data/kamus/istilah.json`.
6. Jangan menandai `disetujui` tanpa pakar.
