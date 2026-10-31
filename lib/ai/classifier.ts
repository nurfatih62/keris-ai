import { createHash } from "node:crypto";

import { kerisEntries } from "@/lib/data/catalog";

export const AMBANG_KEYAKINAN = 0.55;
export const MODEL_DEMO = "mock-heuristic-v0.1";

export interface ClassificationCandidate {
  slug: string;
  nama: string;
  skor: number;
}

export interface ClassificationResult {
  label: string;
  nama: string;
  skorKeyakinan: number;
  kandidat: ClassificationCandidate[];
  tidakDikenali: boolean;
  ambangKeyakinan: number;
  mode: "demo";
  model: string;
  catatan: string;
}

export interface ClassifyInput {
  buffer: Uint8Array;
  mimeType: string;
  filename?: string;
}

const KEYWORDS: Record<string, string[]> = {
  "keris-majapahit": ["majapahit", "jawa timur"],
  "keris-bali": ["bali"],
  "keris-bugis": ["bugis", "sulawesi"],
  "keris-minangkabau": ["minang", "minangkabau", "sumatera barat", "padang"],
  "keris-madura": ["madura"],
  "keris-patani": ["patani", "melayu"],
};

function clampScore(value: number): number {
  return Math.round(Math.min(0.98, Math.max(0.05, value)) * 1000) / 1000;
}

function pickFromFilename(filename?: string): string | null {
  if (!filename) return null;
  const normalized = filename.toLowerCase();
  for (const [slug, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return slug;
    }
  }
  return null;
}

/**
 * Klasifikasi demo yang deterministik. Tidak menganalisis isi gambar.
 * Digunakan sampai model computer vision pada Fase 3 tersedia.
 * Nama berkas hanya dipakai sebagai petunjuk demo, bukan sebagai fitur produksi.
 */
export async function classifyKeris(
  input: ClassifyInput,
): Promise<ClassificationResult> {
  if (kerisEntries.length === 0) {
    throw new Error("Katalog keris kosong; klasifikasi tidak dapat dijalankan.");
  }

  const digest = createHash("sha256").update(input.buffer).digest();
  const forcedSlug = pickFromFilename(input.filename);
  const baseIndex = (digest[0] ?? 0) % kerisEntries.length;
  const chosen =
    (forcedSlug
      ? kerisEntries.find((entry) => entry.slug === forcedSlug)
      : kerisEntries[baseIndex]) ?? kerisEntries[0];

  if (!chosen) {
    throw new Error("Katalog keris tidak memiliki entri yang dapat diprediksi.");
  }

  const rawConfidence = 0.42 + ((digest[1] ?? 0) % 50) / 100;
  const confidence =
    !forcedSlug && (digest[2] ?? 0) < 18 ? rawConfidence - 0.18 : rawConfidence;

  const others = kerisEntries.filter((entry) => entry.slug !== chosen.slug);
  const shift = (digest[3] ?? 0) % Math.max(1, others.length);
  const rotated = [...others.slice(shift), ...others.slice(0, shift)].slice(0, 2);

  const kandidat: ClassificationCandidate[] = [
    { slug: chosen.slug, nama: chosen.nama, skor: clampScore(confidence) },
    ...rotated.map((entry, index) => ({
      slug: entry.slug,
      nama: entry.nama,
      skor: clampScore(confidence - 0.16 - index * 0.12),
    })),
  ].sort((a, b) => b.skor - a.skor);

  const top = kandidat[0];
  if (!top) {
    throw new Error("Gagal menyusun kandidat prediksi.");
  }

  return {
    label: top.slug,
    nama: top.nama,
    skorKeyakinan: top.skor,
    kandidat,
    tidakDikenali: top.skor < AMBANG_KEYAKINAN,
    ambangKeyakinan: AMBANG_KEYAKINAN,
    mode: "demo",
    model: MODEL_DEMO,
    catatan:
      "Prediksi ini berasal dari klasifier demo, bukan model computer vision terlatih. Hasil tidak dapat dijadikan dasar penilaian keaslian atau nilai keris.",
  };
}
