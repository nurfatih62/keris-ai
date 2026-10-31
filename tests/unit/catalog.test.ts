import { describe, expect, it } from "vitest";

import {
  filterKamus,
  kamusEntries,
  kerisEntries,
} from "@/lib/data/catalog";
import { KAMUS_KATEGORI, KONTEN_STATUS } from "@/lib/content/schema";

describe("katalog keris", () => {
  it("memuat enam kategori sementara", () => {
    expect(kerisEntries).toHaveLength(6);
  });

  it("tidak memiliki slug duplikat", () => {
    const slugs = kerisEntries.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("setiap entri memiliki sumber, status, dan penanda verifikasi", () => {
    for (const entry of kerisEntries) {
      expect(entry.sumberReferensi.length).toBeGreaterThan(0);
      expect(KONTEN_STATUS).toContain(entry.statusKonten);
      expect(entry.verifikasiPakar).toBe(false);
      expect(entry.gambarReferensi).toBeNull();
      expect(Object.keys(entry.bagian).length).toBeGreaterThanOrEqual(6);
    }
  });

  it("setiap sumber menyebut halaman/inventaris yang perlu dilengkapi", () => {
    for (const entry of kerisEntries) {
      for (const source of entry.sumberReferensi) {
        expect(source.toLowerCase()).toContain("perlu dilengkapi");
      }
    }
  });
});

describe("kamus", () => {
  it("memuat seluruh kategori yang dikenal", () => {
    const categories = new Set(kamusEntries.map((entry) => entry.kategori));
    for (const category of KAMUS_KATEGORI) {
      expect(categories.has(category)).toBe(true);
    }
  });

  it("mencari istilah berdasarkan nama dan definisi", () => {
    const byName = filterKamus(kamusEntries, "pamor", "semua");
    expect(byName.length).toBeGreaterThan(0);
    expect(byName.every((entry) => entry.istilah.toLowerCase().includes("pamor") || entry.definisi.toLowerCase().includes("pamor"))).toBe(true);

    const byDefinition = filterKamus(kamusEntries, "lekukan", "semua");
    expect(byDefinition.some((entry) => entry.id === "luk")).toBe(true);
  });

  it("memfilter berdasarkan kategori", () => {
    const results = filterKamus(kamusEntries, "", "bagian");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((entry) => entry.kategori === "bagian")).toBe(true);
  });

  it("mengembalikan hasil kosong untuk kata yang tidak ada", () => {
    expect(filterKamus(kamusEntries, "zzzz-tidak-ada", "semua")).toEqual([]);
  });

  it("semua entri masih berstatus draf dan belum diverifikasi", () => {
    expect(kamusEntries.every((entry) => entry.statusKonten === "draf")).toBe(true);
    expect(kamusEntries.every((entry) => entry.verifikasiPakar === false)).toBe(true);
  });
});
