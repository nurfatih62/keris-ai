import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  assessPhotoQuality,
  type PhotoQualityAssessment,
  type PhotoQualityMetrics,
} from "@/lib/image/validation";

export interface PreparedImage {
  blob: Blob;
  previewUrl: string;
  dataUrl: string;
  width: number;
  height: number;
  quality: PhotoQualityMetrics;
  assessment: PhotoQualityAssessment;
}

export class ImagePrepareError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImagePrepareError";
  }
}

const MAX_UPLOAD_DIMENSION = 1600;
const QUALITY_SAMPLE_DIMENSION = 320;

function loadBitmap(file: File): Promise<ImageBitmap> {
  if (typeof createImageBitmap !== "function") {
    return Promise.reject(
      new ImagePrepareError("Browser ini belum mendukung pemrosesan gambar."),
    );
  }
  return createImageBitmap(file).catch(() => {
    throw new ImagePrepareError(
      "Gambar tidak dapat dibuka. Gunakan format JPEG, PNG, atau WebP.",
    );
  });
}

function createCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function measureQuality(bitmap: ImageBitmap): PhotoQualityMetrics {
  const scale = Math.min(
    1,
    QUALITY_SAMPLE_DIMENSION / Math.max(bitmap.width, bitmap.height),
  );
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new ImagePrepareError("Canvas tidak tersedia untuk memeriksa kualitas foto.");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  const data = context.getImageData(0, 0, width, height).data;
  const gray = new Float32Array(width * height);
  let brightnessTotal = 0;

  for (let index = 0; index < width * height; index += 1) {
    const offset = index * 4;
    const value =
      0.299 * (data[offset] ?? 0) +
      0.587 * (data[offset + 1] ?? 0) +
      0.114 * (data[offset + 2] ?? 0);
    gray[index] = value;
    brightnessTotal += value;
  }

  let gradientTotal = 0;
  let samples = 0;
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      const left = gray[index - 1] ?? 0;
      const right = gray[index + 1] ?? 0;
      const up = gray[index - width] ?? 0;
      const down = gray[index + width] ?? 0;
      gradientTotal += Math.abs(right - left) + Math.abs(down - up);
      samples += 2;
    }
  }

  return {
    width: bitmap.width,
    height: bitmap.height,
    brightness: brightnessTotal / (width * height) / 255,
    sharpness: samples > 0 ? gradientTotal / samples / 255 : 0,
  };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new ImagePrepareError("Gambar tidak dapat diubah menjadi data lokal."));
      }
    };
    reader.onerror = () => reject(new ImagePrepareError("Gambar gagal dibaca."));
    reader.readAsDataURL(blob);
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new ImagePrepareError("Gambar gagal dikompres."));
        }
      },
      "image/jpeg",
      0.85,
    );
  });
}

export async function prepareImage(file: File): Promise<PreparedImage> {
  if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    throw new ImagePrepareError("Format gambar harus JPEG, PNG, atau WebP.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new ImagePrepareError("Ukuran gambar melebihi 8 MB. Pilih gambar yang lebih kecil.");
  }
  if (file.size === 0) {
    throw new ImagePrepareError("Berkas gambar kosong.");
  }

  const bitmap = await loadBitmap(file);
  try {
    if (bitmap.width < 300 || bitmap.height < 300) {
      throw new ImagePrepareError("Resolusi gambar minimal 300 × 300 piksel.");
    }

    const quality = measureQuality(bitmap);
    const assessment = assessPhotoQuality(quality);

    const scale = Math.min(
      1,
      MAX_UPLOAD_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    if (!context) {
      throw new ImagePrepareError("Gambar tidak dapat diproses di browser ini.");
    }
    context.drawImage(bitmap, 0, 0, width, height);

    const blob = await canvasToBlob(canvas);
    const dataUrl = await blobToDataUrl(blob);
    const previewUrl = URL.createObjectURL(blob);

    return {
      blob,
      previewUrl,
      dataUrl,
      width,
      height,
      quality: { ...quality, width, height },
      assessment,
    };
  } finally {
    bitmap.close();
  }
}
