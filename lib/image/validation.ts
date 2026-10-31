export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const MIN_IMAGE_DIMENSION = 300;
export const MAX_IMAGE_DIMENSION = 8000;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type ImageMime = (typeof ALLOWED_IMAGE_TYPES)[number];

export interface ImageInfo {
  mime: ImageMime;
  width: number;
  height: number;
}

export type ImageErrorCode =
  | "kosong"
  | "terlalu_besar"
  | "format_tidak_didukung"
  | "mime_tidak_cocok"
  | "dimensi_terlalu_kecil"
  | "dimensi_terlalu_besar";

export interface ImageValidationIssue {
  code: ImageErrorCode;
  message: string;
}

export interface ImageValidationResult {
  ok: boolean;
  info: ImageInfo | null;
  issues: ImageValidationIssue[];
}

export function isAllowedMime(value: string): value is ImageMime {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(value);
}

function isPng(bytes: Uint8Array): boolean {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return signature.every((byte, index) => bytes[index] === byte);
}

function isJpeg(bytes: Uint8Array): boolean {
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

function isWebp(bytes: Uint8Array): boolean {
  if (bytes.length < 16) return false;
  const riff = String.fromCharCode(...bytes.slice(0, 4));
  const webp = String.fromCharCode(...bytes.slice(8, 12));
  return riff === "RIFF" && webp === "WEBP";
}

function readUint32BE(bytes: Uint8Array, offset: number): number {
  return (
    ((bytes[offset] ?? 0) << 24) |
    ((bytes[offset + 1] ?? 0) << 16) |
    ((bytes[offset + 2] ?? 0) << 8) |
    (bytes[offset + 3] ?? 0)
  ) >>> 0;
}

function readUint24LE(bytes: Uint8Array, offset: number): number {
  return (
    (bytes[offset] ?? 0) |
    ((bytes[offset + 1] ?? 0) << 8) |
    ((bytes[offset + 2] ?? 0) << 16)
  );
}

function readUint16BE(bytes: Uint8Array, offset: number): number {
  return ((bytes[offset] ?? 0) << 8) | (bytes[offset + 1] ?? 0);
}

function readUint16LE(bytes: Uint8Array, offset: number): number {
  return (bytes[offset] ?? 0) | ((bytes[offset + 1] ?? 0) << 8);
}

function parsePng(bytes: Uint8Array): ImageInfo | null {
  if (bytes.length < 24 || !isPng(bytes)) return null;
  const chunkType = String.fromCharCode(...bytes.slice(12, 16));
  if (chunkType !== "IHDR") return null;
  return {
    mime: "image/png",
    width: readUint32BE(bytes, 16),
    height: readUint32BE(bytes, 20),
  };
}

function parseJpeg(bytes: Uint8Array): ImageInfo | null {
  if (bytes.length < 4 || !isJpeg(bytes)) return null;

  let offset = 2;
  while (offset + 4 <= bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = bytes[offset + 1] ?? 0;
    if (marker === 0xff) {
      offset += 1;
      continue;
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }
    if (marker === 0xd9 || marker === 0xda) break;

    const segmentLength = readUint16BE(bytes, offset + 2);
    if (segmentLength < 2) break;

    const isStartOfFrame =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);

    if (isStartOfFrame && offset + 9 <= bytes.length) {
      const height = readUint16BE(bytes, offset + 5);
      const width = readUint16BE(bytes, offset + 7);
      return { mime: "image/jpeg", width, height };
    }

    offset += 2 + segmentLength;
  }

  return null;
}

function parseWebp(bytes: Uint8Array): ImageInfo | null {
  if (bytes.length < 30 || !isWebp(bytes)) return null;
  const chunkType = String.fromCharCode(...bytes.slice(12, 16));

  if (chunkType === "VP8X") {
    return {
      mime: "image/webp",
      width: readUint24LE(bytes, 24) + 1,
      height: readUint24LE(bytes, 27) + 1,
    };
  }

  if (chunkType === "VP8L") {
    if (bytes[20] !== 0x2f) return null;
    const bits = readUint32BE(bytes, 21);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >>> 14) & 0x3fff) + 1;
    return { mime: "image/webp", width, height };
  }

  if (chunkType === "VP8 ") {
    if (
      bytes[23] !== 0x9d ||
      bytes[24] !== 0x01 ||
      bytes[25] !== 0x2a
    ) {
      return null;
    }
    return {
      mime: "image/webp",
      width: readUint16LE(bytes, 26) & 0x3fff,
      height: readUint16LE(bytes, 28) & 0x3fff,
    };
  }

  return null;
}

export function sniffImage(buffer: Uint8Array): ImageInfo | null {
  return parsePng(buffer) ?? parseJpeg(buffer) ?? parseWebp(buffer);
}

export function validateImage(
  buffer: Uint8Array,
  declaredMime?: string,
): ImageValidationResult {
  const issues: ImageValidationIssue[] = [];

  if (buffer.length === 0) {
    return {
      ok: false,
      info: null,
      issues: [{ code: "kosong", message: "Berkas gambar kosong." }],
    };
  }

  if (buffer.length > MAX_IMAGE_BYTES) {
    issues.push({
      code: "terlalu_besar",
      message: "Ukuran gambar melebihi batas 8 MB. Kompres atau pilih gambar lain.",
    });
  }

  const info = sniffImage(buffer);

  if (!info) {
    issues.push({
      code: "format_tidak_didukung",
      message: "Format gambar tidak didukung. Gunakan JPEG, PNG, atau WebP.",
    });
    return { ok: false, info: null, issues };
  }

  if (declaredMime && isAllowedMime(declaredMime) && declaredMime !== info.mime) {
    issues.push({
      code: "mime_tidak_cocok",
      message: "Isi berkas tidak sesuai dengan tipe gambar yang dinyatakan.",
    });
  }

  if (info.width < MIN_IMAGE_DIMENSION || info.height < MIN_IMAGE_DIMENSION) {
    issues.push({
      code: "dimensi_terlalu_kecil",
      message: `Resolusi gambar terlalu kecil (minimum ${MIN_IMAGE_DIMENSION}×${MIN_IMAGE_DIMENSION} piksel).`,
    });
  }

  if (info.width > MAX_IMAGE_DIMENSION || info.height > MAX_IMAGE_DIMENSION) {
    issues.push({
      code: "dimensi_terlalu_besar",
      message: `Dimensi gambar terlalu besar (maksimum ${MAX_IMAGE_DIMENSION} piksel per sisi).`,
    });
  }

  return { ok: issues.length === 0, info, issues };
}

export type PhotoQualityStatus = "baik" | "cukup" | "kurang";

export interface PhotoQualityMetrics {
  width: number;
  height: number;
  brightness: number;
  sharpness: number;
}

export interface PhotoQualityAssessment {
  status: PhotoQualityStatus;
  catatan: string[];
}

export function assessPhotoQuality(
  metrics: PhotoQualityMetrics,
): PhotoQualityAssessment {
  const catatan: string[] = [];
  let critical = false;

  if (metrics.brightness < 0.22) {
    catatan.push("Foto tampak terlalu gelap. Ambil foto dengan cahaya yang cukup.");
    critical = true;
  } else if (metrics.brightness > 0.92) {
    catatan.push("Foto tampak terlalu terang. Kurangi cahaya langsung atau pantulan.");
    critical = true;
  }

  if (metrics.sharpness < 0.035) {
    catatan.push("Foto tampak buram. Pegang perangkat dengan stabil dan pastikan fokus.");
    critical = true;
  }

  if (Math.min(metrics.width, metrics.height) < 600) {
    catatan.push("Resolusi foto rendah. Gunakan kamera utama atau gambar yang lebih besar.");
  }

  if (catatan.length === 0) {
    catatan.push("Kualitas foto tampak baik untuk dianalisis.");
  }

  return {
    status: critical ? "kurang" : catatan.length > 1 ? "cukup" : "baik",
    catatan,
  };
}
