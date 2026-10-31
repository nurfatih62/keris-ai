import { describe, expect, it } from "vitest";

import { checkRateLimit, resetRateLimit } from "@/lib/api/rate-limit";

describe("pembatas laju", () => {
  it("mengizinkan permintaan sampai batas lalu menolak", () => {
    resetRateLimit();
    const now = 1_800_000_000_000;
    for (let index = 0; index < 20; index += 1) {
      const result = checkRateLimit("klien", now + index, 20, 60_000);
      expect(result.allowed).toBe(true);
    }
    const blocked = checkRateLimit("klien", now + 21, 20, 60_000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("mengizinkan kembali setelah jendela waktu lewat", () => {
    resetRateLimit();
    const now = 1_800_000_000_000;
    for (let index = 0; index < 20; index += 1) {
      checkRateLimit("klien-2", now, 20, 60_000);
    }
    expect(checkRateLimit("klien-2", now + 1_000, 20, 60_000).allowed).toBe(false);
    expect(checkRateLimit("klien-2", now + 61_000, 20, 60_000).allowed).toBe(true);
  });

  it("memisahkan kuota antar klien", () => {
    resetRateLimit();
    expect(checkRateLimit("a", 1_800_000_000_000, 1).allowed).toBe(true);
    expect(checkRateLimit("a", 1_800_000_000_001, 1).allowed).toBe(false);
    expect(checkRateLimit("b", 1_800_000_000_002, 1).allowed).toBe(true);
  });
});
