import { describe, expect, it } from "vitest";

import type { AnalyzeResponse } from "@/lib/api/types";
import {
  ScanStorageError,
  deleteGalleryItem,
  getGallery,
  getGalleryItem,
  getSessionScan,
  isInGallery,
  parseScanRecord,
  saveSessionScan,
  saveToGallery,
  type ScanRecord,
} from "@/lib/storage/scan-store";

class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  failOnSet = false;
  failCount = 0;

  get length(): number {
    return this.data.size;
  }

  clear(): void {
    this.data.clear();
  }

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.data.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }

  setItem(key: string, value: string): void {
    if (this.failOnSet) {
      this.failOnSet = false;
      throw new DOMException("Kuota penuh", "QuotaExceededError");
    }
    if (this.failCount > 0) {
      this.failCount -= 1;
      throw new DOMException("Kuota penuh", "QuotaExceededError");
    }
    this.data.set(key, value);
  }
}

function makeResult(overrides: Partial<AnalyzeResponse> = {}): AnalyzeResponse {
  return {
    id: "scan-1",
    dibuatPada: "2026-10-31T10:00:00.000Z",
    mode: "demo",
    gambarUrl: null,
    kualitas: {
      status: "baik",
      lebar: 1200,
      tinggi: 900,
      catatan: ["Resolusi gambar memadai."],
    },
    hasil: {
      label: "keris-bali",
      nama: "Keris Bali",
      skorKeyakinan: 0.82,
      kandidat: [{ slug: "keris-bali", nama: "Keris Bali", skor: 0.82 }],
      tidakDikenali: false,
      ambangKeyakinan: 0.55,
      mode: "demo",
      model: "mock-heuristic-v0.1",
      catatan: "Demo.",
    },
    keris: null,
    alternatif: [],
    ...overrides,
  };
}

function makeRecord(id = "scan-1", createdAt = "2026-10-31T10:00:00.000Z"): ScanRecord {
  return {
    id,
    dibuatPada: createdAt,
    gambarDataUrl: "data:image/jpeg;base64,AAAA",
    hasil: makeResult({ id, dibuatPada: createdAt }),
  };
}

describe("penyimpanan sesi", () => {
  it("menyimpan dan membaca hasil sesi", () => {
    const storage = new MemoryStorage();
    saveSessionScan(makeRecord(), storage);
    expect(getSessionScan("scan-1", storage)?.hasil.hasil.nama).toBe("Keris Bali");
  });

  it("mengembalikan null untuk data rusak", () => {
    const storage = new MemoryStorage();
    storage.setItem("keris:scan-rusak", "{bukan json");
    expect(getSessionScan("rusak", storage)).toBeNull();
  });

  it("menolak rekaman tanpa hasil analisis", () => {
    expect(parseScanRecord({ id: "x", dibuatPada: "2026-01-01", hasil: {} })).toBeNull();
  });

  it("membuang data gambar yang bukan data URL gambar", () => {
    const record = parseScanRecord({ ...makeRecord(), gambarDataUrl: "javascript:alert(1)" });
    expect(record?.gambarDataUrl).toBeNull();
  });
});

describe("galeri", () => {
  it("menyimpan tanpa duplikat dan mengurutkan terbaru", () => {
    const storage = new MemoryStorage();
    saveToGallery(makeRecord("lama", "2026-10-01T10:00:00.000Z"), storage);
    saveToGallery(makeRecord("baru", "2026-10-31T10:00:00.000Z"), storage);
    saveToGallery(makeRecord("baru", "2026-10-31T10:00:00.000Z"), storage);

    const gallery = getGallery(storage);
    expect(gallery.map((item) => item.id)).toEqual(["baru", "lama"]);
    expect(isInGallery("baru", storage)).toBe(true);
    expect(getGalleryItem("baru", storage)?.id).toBe("baru");
  });

  it("menghapus item dari galeri", () => {
    const storage = new MemoryStorage();
    saveToGallery(makeRecord("a"), storage);
    saveToGallery(makeRecord("b", "2026-10-30T10:00:00.000Z"), storage);
    const remaining = deleteGalleryItem("a", storage);
    expect(remaining.map((item) => item.id)).toEqual(["b"]);
    expect(getGallery(storage).map((item) => item.id)).toEqual(["b"]);
  });

  it("membatasi galeri pada 30 hasil terbaru", () => {
    const storage = new MemoryStorage();
    for (let index = 0; index < 35; index += 1) {
      const day = String((index % 28) + 1).padStart(2, "0");
      const id = `scan-${index}`;
      saveToGallery(
        makeRecord(id, `2026-10-${day}T10:00:00.000Z`),
        storage,
      );
    }
    expect(getGallery(storage)).toHaveLength(30);
  });

  it("menyimpan tanpa gambar ketika kuota penuh", () => {
    const storage = new MemoryStorage();
    storage.failOnSet = true;
    const outcome = saveToGallery(makeRecord(), storage);
    expect(outcome.imageDropped).toBe(true);
    expect(outcome.record.gambarDataUrl).toBeNull();
    expect(getGallery(storage)[0]?.gambarDataUrl).toBeNull();
  });

  it("melempar error yang jelas ketika kuota tetap penuh", () => {
    const storage = new MemoryStorage();
    storage.failCount = 2;
    expect(() => saveToGallery(makeRecord(), storage)).toThrowError(ScanStorageError);
    try {
      saveToGallery(makeRecord("lain"), storage);
    } catch (error) {
      expect(error).toBeInstanceOf(ScanStorageError);
      expect((error as ScanStorageError).code).toBe("penyimpanan_penuh");
    }
  });

  it("mengabaikan entri galeri yang rusak", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      "keris:gallery:v1",
      JSON.stringify([makeRecord("valid"), { id: "rusak" }, null]),
    );
    expect(getGallery(storage).map((item) => item.id)).toEqual(["valid"]);
  });
});
