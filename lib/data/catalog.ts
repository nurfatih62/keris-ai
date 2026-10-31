import istilahData from "@/data/kamus/istilah.json";
import bali from "@/data/keris/keris-bali.json";
import bugis from "@/data/keris/keris-bugis.json";
import madura from "@/data/keris/keris-madura.json";
import majapahit from "@/data/keris/keris-majapahit.json";
import minangkabau from "@/data/keris/keris-minangkabau.json";
import patani from "@/data/keris/keris-patani.json";
import {
  kamusEntrySchema,
  kerisEntrySchema,
  type KamusEntry,
  type KerisEntry,
  type KamusKategori,
} from "@/lib/content/schema";

const rawKeris = [majapahit, bali, bugis, minangkabau, madura, patani];

export const kerisEntries: KerisEntry[] = kerisEntrySchema.array().parse(rawKeris);
export const kamusEntries: KamusEntry[] = kamusEntrySchema.array().parse(istilahData);

export function getKerisBySlug(slug: string): KerisEntry | undefined {
  return kerisEntries.find((entry) => entry.slug === slug);
}

export function getKerisByKategori(kategori: string): KerisEntry | undefined {
  return kerisEntries.find(
    (entry) => entry.kategori.toLowerCase() === kategori.toLowerCase(),
  );
}

export function getKerisByNama(nama: string): KerisEntry | undefined {
  return kerisEntries.find(
    (entry) => entry.nama.toLowerCase() === nama.toLowerCase(),
  );
}

export type DictionaryFilter = "semua" | KamusKategori;

export function filterKamus(
  entries: readonly KamusEntry[],
  query: string,
  kategori: DictionaryFilter,
): KamusEntry[] {
  const normalized = query.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesCategory = kategori === "semua" || entry.kategori === kategori;
    if (!matchesCategory) return false;
    if (!normalized) return true;
    return (
      entry.istilah.toLowerCase().includes(normalized) ||
      entry.definisi.toLowerCase().includes(normalized)
    );
  });
}

export const kamusKategoriList: KamusKategori[] = [
  "istilah",
  "jenis",
  "bentuk",
  "ornamen",
  "bagian",
  "filosofi",
];
