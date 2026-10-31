import path from "node:path";

import { expect, test } from "@playwright/test";

const fixture = path.join(__dirname, "..", "fixtures", "keris-bali.png");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
});

test("beranda menampilkan pengenalan dan navigasi", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Keris AI/);
  await expect(
    page.getByRole("heading", { level: 1, name: /Mengenal keris/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Mulai Scan" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navigasi bawah" })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("beranda-ponsel.png"), fullPage: true });
});

test("kamus dapat dicari dan difilter", async ({ page }) => {
  await page.goto("/kamus");
  await expect(page.getByRole("heading", { level: 1, name: /istilah keris/i })).toBeVisible();

  const search = page.getByLabel("Cari istilah atau arti");
  await search.fill("pamor");
  await expect(page.getByRole("heading", { level: 2, name: "Pamor", exact: true })).toBeVisible();
  await expect(page.getByText(/istilah ditampilkan/)).toContainText("untuk");

  await page.getByRole("button", { name: /^Ornamen/ }).click();
  await expect(page.getByRole("button", { name: /^Ornamen/ })).toHaveAttribute("aria-pressed", "true");

  await search.fill("zzzz-tidak-ada");
  await expect(page.getByText("Istilah tidak ditemukan")).toBeVisible();
  await page.getByRole("button", { name: "Tampilkan semua istilah" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "Pamor", exact: true })).toBeVisible();
});

test("halaman detail jenis keris menampilkan sumber dan status", async ({ page }) => {
  await page.goto("/keris");
  await expect(page.getByRole("heading", { level: 1, name: /Jenis keris/i })).toBeVisible();
  await page.locator('a[href="/keris/keris-bali"]').first().click();
  await expect(page.getByRole("heading", { level: 1, name: "Keris Bali" })).toBeVisible();
  await expect(page.getByText(/Draf — belum diverifikasi pakar/).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Makna filosofis" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sumber referensi" })).toBeVisible();
});

test("alur scan, simpan galeri, buka detail, dan hapus", async ({ page }) => {
  await page.goto("/scan");
  await expect(page.getByRole("heading", { level: 1, name: /Pindai keris/i })).toBeVisible();

  await page
    .locator('input[aria-label="Pilih gambar keris dari galeri"]')
    .setInputFiles(fixture);

  await expect(page.getByAltText("Pratinjau foto yang akan dianalisis")).toBeVisible();
  await expect(page.getByText(/Kualitas foto/).first()).toBeVisible();

  await page.getByRole("button", { name: "Analisis Gambar" }).click();
  await page.waitForURL(/\/hasil\/[0-9a-f-]+$/i, { timeout: 45_000 });

  await expect(page.getByRole("heading", { level: 1, name: "Keris Bali" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Rincian identifikasi" })).toBeVisible();
  await expect(page.getByText("Asal daerah atau gaya")).toBeVisible();
  await expect(page.getByText("Makna filosofis dan nilai budaya")).toBeVisible();
  await expect(page.getByText(/Mode demo\./).first()).toBeVisible();

  await page.getByRole("button", { name: "Simpan ke Galeri" }).click();
  await expect(page.getByRole("button", { name: "Tersimpan di Galeri" })).toBeVisible();

  await page.goto("/galeri");
  await expect(page.getByRole("heading", { level: 1, name: /Riwayat pemindaian/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Keris Bali" })).toBeVisible();

  await page.locator('a[href^="/galeri/"]').first().click();
  await expect(page.getByRole("heading", { level: 1, name: "Keris Bali" })).toBeVisible();

  await page.goto("/galeri");
  await page.getByRole("button", { name: "Hapus hasil Keris Bali" }).click();
  await page.getByRole("button", { name: "Ya, hapus" }).click();
  await expect(page.getByText("Hasil pemindaian dihapus dari galeri.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Galeri masih kosong" })).toBeVisible();

  const gallery = await page.evaluate(() =>
    window.localStorage.getItem("keris:gallery:v1"),
  );
  expect(gallery).toBe("[]");
});

test("manifest dan service worker tersedia", async ({ page }) => {
  const manifestResponse = await page.request.get("/manifest.webmanifest");
  expect(manifestResponse.status()).toBe(200);
  const manifest = (await manifestResponse.json()) as {
    name: string;
    icons: { src: string; sizes: string }[];
    start_url: string;
  };
  expect(manifest.name).toContain("Keris AI");
  expect(manifest.start_url).toBe("/");
  expect(manifest.icons.length).toBeGreaterThanOrEqual(3);

  const swResponse = await page.request.get("/sw.js");
  expect(swResponse.status()).toBe(200);
  expect(await swResponse.text()).toContain("keris-ai-v1");
});

test("halaman utama tidak meluap secara horizontal di ponsel dan desktop", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/",
    "/scan",
    "/kamus",
    "/keris",
    "/keris/keris-bali",
    "/galeri",
    "/hasil/tidak-ada",
  ]) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `Halaman ${route} meluap horizontal`).toBeLessThanOrEqual(1);
  }

  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Navigasi bawah" })).toBeVisible();

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.getByRole("navigation", { name: "Navigasi utama" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navigasi bawah" })).toBeHidden();
});
