import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const [packageName, fingerprint] = process.argv.slice(2);

if (!packageName || !fingerprint) {
  console.error(
    "Pemakaian: node scripts/generate-assetlinks.mjs <package.name> <SHA256_FINGERPRINT>",
  );
  process.exit(1);
}

const normalizedFingerprint = fingerprint.trim().toUpperCase();
if (!/^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(normalizedFingerprint)) {
  console.error(
    "Sidik jari harus 32 pasang heksadesimal dipisahkan titik dua, contoh AA:BB:...:FF.",
  );
  process.exit(1);
}

const targetDir = resolve(here, "..", "public", ".well-known");
const targetFile = resolve(targetDir, "assetlinks.json");

if (existsSync(targetFile)) {
  console.error(
    "Berkas assetlinks.json sudah ada. Hapus secara sadar sebelum membuat ulang.",
  );
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });
const payload = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: packageName,
      sha256_cert_fingerprints: [normalizedFingerprint],
    },
  },
];

writeFileSync(targetFile, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Dibuat: ${targetFile}`);
console.log("Berkas ini diabaikan Git; unggah ke domain produksi secara aman.");
