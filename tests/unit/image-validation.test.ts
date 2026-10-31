import { describe, expect, it } from "vitest";

import {
  MAX_IMAGE_BYTES,
  assessPhotoQuality,
  sniffImage,
  validateImage,
} from "@/lib/image/validation";

function pngHeader(width: number, height: number): Buffer {
  const buffer = Buffer.alloc(33);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(buffer, 0);
  buffer.writeUInt32BE(13, 8);
  buffer.write("IHDR", 12, "ascii");
  buffer.writeUInt32BE(width, 16);
  buffer.writeUInt32BE(height, 20);
  buffer[24] = 8;
  buffer[25] = 6;
  return buffer;
}

function jpegHeader(width: number, height: number): Buffer {
  const buffer = Buffer.alloc(21);
  buffer.set([0xff, 0xd8, 0xff, 0xc0, 0x00, 0x11, 0x08], 0);
  buffer.writeUInt16BE(height, 7);
  buffer.writeUInt16BE(width, 9);
  buffer[11] = 3;
  return buffer;
}

function webpHeader(width: number, height: number): Buffer {
  const buffer = Buffer.alloc(30);
  buffer.write("RIFF", 0, "ascii");
  buffer.writeUInt32LE(22, 4);
  buffer.write("WEBP", 8, "ascii");
  buffer.write("VP8X", 12, "ascii");
  buffer.writeUInt32LE(10, 16);
  const widthMinusOne = width - 1;
  const heightMinusOne = height - 1;
  buffer[24] = widthMinusOne & 0xff;
  buffer[25] = (widthMinusOne >> 8) & 0xff;
  buffer[26] = (widthMinusOne >> 16) & 0xff;
  buffer[27] = heightMinusOne & 0xff;
  buffer[28] = (heightMinusOne >> 8) & 0xff;
  buffer[29] = (heightMinusOne >> 16) & 0xff;
  return buffer;
}

describe("sniffImage", () => {
  it("membaca dimensi PNG", () => {
    expect(sniffImage(pngHeader(1024, 768))).toEqual({
      mime: "image/png",
      width: 1024,
      height: 768,
    });
  });

  it("membaca dimensi JPEG dari marker SOF", () => {
    expect(sniffImage(jpegHeader(800, 600))).toEqual({
      mime: "image/jpeg",
      width: 800,
      height: 600,
    });
  });

  it("membaca dimensi WebP VP8X", () => {
    expect(sniffImage(webpHeader(1200, 900))).toEqual({
      mime: "image/webp",
      width: 1200,
      height: 900,
    });
  });

  it("menolak data yang bukan gambar", () => {
    expect(sniffImage(Buffer.from("bukan gambar"))).toBeNull();
  });
});

describe("validateImage", () => {
  it("menerima gambar yang valid", () => {
    const result = validateImage(pngHeader(800, 600), "image/png");
    expect(result.ok).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("menolak berkas kosong", () => {
    const result = validateImage(new Uint8Array(), "image/png");
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.code).toBe("kosong");
  });

  it("menolak format yang tidak didukung", () => {
    const result = validateImage(Buffer.from("GIF89a"), "image/gif");
    expect(result.ok).toBe(false);
    expect(result.issues.some((issue) => issue.code === "format_tidak_didukung")).toBe(true);
  });

  it("menolak ketidakcocokan tipe MIME", () => {
    const result = validateImage(pngHeader(800, 600), "image/jpeg");
    expect(result.ok).toBe(false);
    expect(result.issues.some((issue) => issue.code === "mime_tidak_cocok")).toBe(true);
  });

  it("menolak gambar yang terlalu kecil", () => {
    const result = validateImage(pngHeader(120, 120), "image/png");
    expect(result.ok).toBe(false);
    expect(result.issues.some((issue) => issue.code === "dimensi_terlalu_kecil")).toBe(true);
    expect(result.info?.width).toBe(120);
  });

  it("menolak gambar yang melebihi batas ukuran", () => {
    const oversized = Buffer.alloc(MAX_IMAGE_BYTES + 1);
    pngHeader(800, 600).copy(oversized, 0);
    const result = validateImage(oversized, "image/png");
    expect(result.ok).toBe(false);
    expect(result.issues.some((issue) => issue.code === "terlalu_besar")).toBe(true);
  });
});

describe("assessPhotoQuality", () => {
  it("menilai foto gelap dan buram sebagai kurang", () => {
    const result = assessPhotoQuality({
      width: 1200,
      height: 900,
      brightness: 0.1,
      sharpness: 0.01,
    });
    expect(result.status).toBe("kurang");
    expect(result.catatan.length).toBeGreaterThanOrEqual(2);
  });

  it("menilai foto terang dan tajam sebagai baik", () => {
    const result = assessPhotoQuality({
      width: 1600,
      height: 1200,
      brightness: 0.55,
      sharpness: 0.12,
    });
    expect(result.status).toBe("baik");
    expect(result.catatan).toEqual(["Kualitas foto tampak baik untuk dianalisis."]);
  });

  it("memberi catatan untuk resolusi rendah", () => {
    const result = assessPhotoQuality({
      width: 400,
      height: 400,
      brightness: 0.5,
      sharpness: 0.1,
    });
    expect(result.status).toBe("cukup");
    expect(result.catatan.some((note) => note.includes("Resolusi"))).toBe(true);
  });
});
