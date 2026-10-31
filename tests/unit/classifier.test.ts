import { describe, expect, it } from "vitest";

import { AMBANG_KEYAKINAN, MODEL_DEMO, classifyKeris } from "@/lib/ai/classifier";

const sample = Buffer.from("gambar-keris-demo-untuk-pengujian");

describe("classifyKeris", () => {
  it("deterministik untuk input yang sama", async () => {
    const first = await classifyKeris({ buffer: sample, mimeType: "image/png" });
    const second = await classifyKeris({ buffer: sample, mimeType: "image/png" });
    expect(second).toEqual(first);
  });

  it("memakai nama berkas sebagai petunjuk mode demo", async () => {
    const result = await classifyKeris({
      buffer: sample,
      mimeType: "image/jpeg",
      filename: "foto-keris-bali.jpg",
    });
    expect(result.label).toBe("keris-bali");
    expect(result.nama).toBe("Keris Bali");
  });

  it("menghasilkan tiga kandidat terurut menurun", async () => {
    const result = await classifyKeris({ buffer: sample, mimeType: "image/png" });
    expect(result.kandidat).toHaveLength(3);
    const scores = result.kandidat.map((candidate) => candidate.skor);
    expect([...scores].sort((a, b) => b - a)).toEqual(scores);
    for (const candidate of result.kandidat) {
      expect(candidate.skor).toBeGreaterThanOrEqual(0.05);
      expect(candidate.skor).toBeLessThanOrEqual(0.98);
    }
    expect(result.mode).toBe("demo");
    expect(result.model).toBe(MODEL_DEMO);
    expect(result.ambangKeyakinan).toBe(AMBANG_KEYAKINAN);
  });

  it("dapat menghasilkan keyakinan rendah di bawah ambang", async () => {
    let found = false;
    for (let index = 0; index < 400 && !found; index += 1) {
      const result = await classifyKeris({
        buffer: Buffer.from(`contoh-${index}`),
        mimeType: "image/png",
      });
      if (result.tidakDikenali) {
        found = true;
        expect(result.skorKeyakinan).toBeLessThan(AMBANG_KEYAKINAN);
      }
    }
    expect(found).toBe(true);
  });
});
