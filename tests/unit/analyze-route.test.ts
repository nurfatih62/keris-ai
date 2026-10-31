import { beforeEach, describe, expect, it } from "vitest";

import { GET, POST } from "@/app/api/analyze/route";
import { resetRateLimit } from "@/lib/api/rate-limit";
import type { AnalyzeResponse, ApiError } from "@/lib/api/types";

function pngFile(width = 1200, height = 900, name = "foto-keris-bali.png"): File {
  const header = Buffer.alloc(33);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(header, 0);
  header.writeUInt32BE(13, 8);
  header.write("IHDR", 12, "ascii");
  header.writeUInt32BE(width, 16);
  header.writeUInt32BE(height, 20);
  header[24] = 8;
  header[25] = 6;
  return new File([header], name, { type: "image/png" });
}

function analyzeRequest(file?: File, ip = "10.0.0.1"): Request {
  const form = new FormData();
  if (file) form.set("gambar", file);
  return new Request("http://localhost:3000/api/analyze", {
    method: "POST",
    body: form,
    headers: { "x-forwarded-for": ip },
  });
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

describe("POST /api/analyze", () => {
  beforeEach(() => {
    resetRateLimit();
  });

  it("mengembalikan label, skor, dan data keris", async () => {
    const response = await POST(analyzeRequest(pngFile()));
    expect(response.status).toBe(200);

    const body = await readJson<AnalyzeResponse>(response);
    expect(body.id).toBeTruthy();
    expect(body.mode).toBe("demo");
    expect(body.gambarUrl).toBeNull();
    expect(body.hasil.label).toBe("keris-bali");
    expect(body.hasil.skorKeyakinan).toBeGreaterThan(0);
    expect(body.hasil.skorKeyakinan).toBeLessThanOrEqual(1);
    expect(body.hasil.kandidat).toHaveLength(3);
    expect(body.keris?.nama).toBe("Keris Bali");
    expect(body.kualitas.status).toBe("baik");
    expect(body.kualitas.lebar).toBe(1200);
    expect(body.kualitas.tinggi).toBe(900);
    expect(JSON.stringify(body)).not.toContain("base64");
  });

  it("menolak permintaan tanpa gambar", async () => {
    const response = await POST(analyzeRequest());
    expect(response.status).toBe(400);
    const body = await readJson<ApiError>(response);
    expect(body.error.kode).toBe("gambar_tidak_ada");
  });

  it("menolak format gambar yang tidak didukung", async () => {
    const gif = new File([Buffer.from("GIF89a")], "gambar.gif", { type: "image/gif" });
    const response = await POST(analyzeRequest(gif, "10.0.0.2"));
    expect(response.status).toBe(415);
    const body = await readJson<ApiError>(response);
    expect(body.error.kode).toBe("format_tidak_didukung");
  });

  it("menolak unggahan yang terlalu besar berdasarkan content-length", async () => {
    const request = new Request("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: {
        "content-length": String(20 * 1024 * 1024),
        "x-forwarded-for": "10.0.0.3",
      },
    });
    const response = await POST(request);
    expect(response.status).toBe(413);
  });

  it("menolak metode GET", () => {
    const response = GET();
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");
  });
});
