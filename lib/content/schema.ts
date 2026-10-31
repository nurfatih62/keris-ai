import { z } from "zod";

export const KONTEN_STATUS = ["draf", "diverifikasi", "disetujui"] as const;
export type KontenStatus = (typeof KONTEN_STATUS)[number];

export const KAMUS_KATEGORI = [
  "istilah",
  "jenis",
  "bentuk",
  "ornamen",
  "bagian",
  "filosofi",
] as const;
export type KamusKategori = (typeof KAMUS_KATEGORI)[number];

export const kerisEntrySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  nama: z.string().min(1),
  kategori: z.string().min(1),
  asalDaerah: z.string().min(1),
  bentukBilah: z.string().min(1),
  jumlahLuk: z.number().int().min(0).nullable(),
  keteranganLuk: z.string().min(1),
  ornamen: z.array(z.string().min(1)).min(1),
  bagian: z.record(z.string(), z.string().min(1)),
  maknaFilosofis: z.string().min(1),
  nilaiBudaya: z.string().min(1),
  sumberReferensi: z.array(z.string().min(1)).min(1),
  gambarReferensi: z.string().nullable(),
  statusKonten: z.enum(KONTEN_STATUS),
  verifikasiPakar: z.boolean(),
  catatanPakar: z.string(),
  dibuatPada: z.string().datetime(),
});

export type KerisEntry = z.infer<typeof kerisEntrySchema>;

export const kamusEntrySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  istilah: z.string().min(1),
  definisi: z.string().min(1),
  kategori: z.enum(KAMUS_KATEGORI),
  sumber: z.array(z.string().min(1)).default([]),
  statusKonten: z.enum(KONTEN_STATUS),
  verifikasiPakar: z.boolean(),
});

export type KamusEntry = z.infer<typeof kamusEntrySchema>;

export const kontenStatusLabel: Record<KontenStatus, string> = {
  draf: "Draf — belum diverifikasi pakar",
  diverifikasi: "Terverifikasi — menunggu persetujuan pakar",
  disetujui: "Disetujui pakar",
};
