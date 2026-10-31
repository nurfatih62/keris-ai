import type { AnalyzeResponse } from "@/lib/api/types";

const GALLERY_KEY = "keris:gallery:v1";
const SCAN_PREFIX = "keris:scan:";
const MAX_GALLERY_ITEMS = 30;
const MAX_IMAGE_DATA_LENGTH = 3_500_000;

export interface ScanRecord {
  id: string;
  dibuatPada: string;
  gambarDataUrl: string | null;
  hasil: AnalyzeResponse;
}

export interface SaveResult {
  record: ScanRecord;
  imageDropped: boolean;
}

export class ScanStorageError extends Error {
  readonly code: "penyimpanan_tidak_tersedia" | "penyimpanan_penuh" | "data_tidak_valid";

  constructor(code: ScanStorageError["code"], message: string) {
    super(message);
    this.name = "ScanStorageError";
    this.code = code;
  }
}

function isAnalyzeResponse(value: unknown): value is AnalyzeResponse {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<AnalyzeResponse>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.dibuatPada === "string" &&
    typeof candidate.hasil === "object" &&
    candidate.hasil !== null &&
    typeof candidate.hasil.nama === "string" &&
    typeof candidate.hasil.skorKeyakinan === "number" &&
    typeof candidate.kualitas === "object" &&
    candidate.kualitas !== null
  );
}

export function parseScanRecord(raw: unknown): ScanRecord | null {
  if (typeof raw !== "object" || raw === null) return null;
  const candidate = raw as Partial<ScanRecord>;
  if (
    typeof candidate.id !== "string" ||
    candidate.id.length === 0 ||
    typeof candidate.dibuatPada !== "string" ||
    !isAnalyzeResponse(candidate.hasil)
  ) {
    return null;
  }

  const image =
    typeof candidate.gambarDataUrl === "string" &&
    candidate.gambarDataUrl.startsWith("data:image/") &&
    candidate.gambarDataUrl.length <= MAX_IMAGE_DATA_LENGTH
      ? candidate.gambarDataUrl
      : null;

  return {
    id: candidate.id,
    dibuatPada: candidate.dibuatPada,
    gambarDataUrl: image,
    hasil: candidate.hasil,
  };
}

function getBrowserStorage(kind: "local" | "session"): Storage {
  if (typeof window === "undefined") {
    throw new ScanStorageError(
      "penyimpanan_tidak_tersedia",
      "Penyimpanan hanya tersedia di browser.",
    );
  }
  return kind === "local" ? window.localStorage : window.sessionStorage;
}

function readJson(storage: Storage, key: string): unknown {
  const raw = storage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function saveSessionScan(
  record: ScanRecord,
  storage: Storage = getBrowserStorage("session"),
): void {
  try {
    storage.setItem(`${SCAN_PREFIX}${record.id}`, JSON.stringify(record));
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      try {
        storage.setItem(
          `${SCAN_PREFIX}${record.id}`,
          JSON.stringify({ ...record, gambarDataUrl: null }),
        );
        return;
      } catch {
        throw new ScanStorageError(
          "penyimpanan_penuh",
          "Ruang penyimpanan browser penuh. Hapus riwayat lama terlebih dahulu.",
        );
      }
    }
    throw new ScanStorageError(
      "penyimpanan_tidak_tersedia",
      "Hasil tidak dapat disimpan sementara di browser ini.",
    );
  }
}

export function getSessionScan(
  id: string,
  storage: Storage = getBrowserStorage("session"),
): ScanRecord | null {
  const raw = readJson(storage, `${SCAN_PREFIX}${id}`);
  return parseScanRecord(raw);
}

export function clearSessionScan(
  id: string,
  storage: Storage = getBrowserStorage("session"),
): void {
  storage.removeItem(`${SCAN_PREFIX}${id}`);
}

export function getGallery(
  storage: Storage = getBrowserStorage("local"),
): ScanRecord[] {
  const raw = readJson(storage, GALLERY_KEY);
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => parseScanRecord(item))
    .filter((item): item is ScanRecord => item !== null)
    .sort((a, b) => b.dibuatPada.localeCompare(a.dibuatPada));
}

export function getGalleryItem(
  id: string,
  storage: Storage = getBrowserStorage("local"),
): ScanRecord | null {
  return getGallery(storage).find((item) => item.id === id) ?? null;
}

function persistGallery(records: ScanRecord[], storage: Storage): void {
  try {
    storage.setItem(GALLERY_KEY, JSON.stringify(records));
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new ScanStorageError(
        "penyimpanan_penuh",
        "Ruang penyimpanan browser penuh. Hapus beberapa hasil lama terlebih dahulu.",
      );
    }
    throw new ScanStorageError(
      "penyimpanan_tidak_tersedia",
      "Galeri tidak dapat diakses pada browser ini.",
    );
  }
}

export function saveToGallery(
  record: ScanRecord,
  storage: Storage = getBrowserStorage("local"),
): SaveResult {
  const existing = getGallery(storage).filter((item) => item.id !== record.id);
  let imageDropped = false;

  try {
    persistGallery([record, ...existing].slice(0, MAX_GALLERY_ITEMS), storage);
    return { record, imageDropped };
  } catch (error) {
    if (!(error instanceof ScanStorageError) || error.code !== "penyimpanan_penuh") {
      throw error;
    }
    imageDropped = true;
    const withoutImages = [record, ...existing]
      .slice(0, MAX_GALLERY_ITEMS)
      .map((item) => ({ ...item, gambarDataUrl: null }));
    persistGallery(withoutImages, storage);
    return {
      record: { ...record, gambarDataUrl: null },
      imageDropped,
    };
  }
}

export function deleteGalleryItem(
  id: string,
  storage: Storage = getBrowserStorage("local"),
): ScanRecord[] {
  const remaining = getGallery(storage).filter((item) => item.id !== id);
  persistGallery(remaining, storage);
  return remaining;
}

export function isInGallery(
  id: string,
  storage: Storage = getBrowserStorage("local"),
): boolean {
  return getGallery(storage).some((item) => item.id === id);
}
