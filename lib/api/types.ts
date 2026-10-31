import type { KerisEntry } from "@/lib/content/schema";

export interface AnalyzeCandidate {
  slug: string;
  nama: string;
  skor: number;
}

export interface AnalyzeResult {
  label: string;
  nama: string;
  skorKeyakinan: number;
  kandidat: AnalyzeCandidate[];
  tidakDikenali: boolean;
  ambangKeyakinan: number;
  mode: "demo";
  model: string;
  catatan: string;
}

export interface AnalyzeAlternative {
  slug: string;
  nama: string;
  asalDaerah: string;
  skor: number;
}

export interface AnalyzeResponse {
  id: string;
  dibuatPada: string;
  mode: "demo";
  gambarUrl: null;
  kualitas: {
    status: "baik" | "cukup" | "kurang";
    lebar: number;
    tinggi: number;
    catatan: string[];
  };
  hasil: AnalyzeResult;
  keris: KerisEntry | null;
  alternatif: AnalyzeAlternative[];
}

export interface ApiError {
  error: {
    kode: string;
    pesan: string;
  };
}
