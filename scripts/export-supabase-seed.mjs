import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const kerisDir = join(root, "data", "keris");
const kamusPath = join(root, "data", "kamus", "istilah.json");
const outputPath = join(root, "supabase", "seed.sql");

function sqlString(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlArray(values) {
  return `array[${values.map(sqlString).join(", ")}]::text[]`;
}

const kerisFiles = readdirSync(kerisDir)
  .filter((name) => name.endsWith(".json"))
  .sort();
const kerisEntries = kerisFiles.map((name) =>
  JSON.parse(readFileSync(join(kerisDir, name), "utf8")),
);
const kamusEntries = JSON.parse(readFileSync(kamusPath, "utf8"));

const lines = [
  "-- Berkas ini dihasilkan oleh `npm run seed:supabase`.",
  "-- Jangan diedit manual; ubah data di data/keris dan data/kamus.",
  "begin;",
  "",
];

for (const entry of kerisEntries) {
  lines.push(
    "insert into public.keris (",
    "  nama, kategori, asal_daerah, bentuk_bilah, jumlah_luk, ornamen,",
    "  bagian, makna_filosofis, nilai_budaya, sumber_referensi,",
    "  gambar_referensi, status_konten, verifikasi_pakar, catatan_pakar, dibuat_pada",
    ") values (",
    `  ${sqlString(entry.nama)}, ${sqlString(entry.kategori)}, ${sqlString(entry.asalDaerah)},`,
    `  ${sqlString(entry.bentukBilah)}, ${entry.jumlahLuk === null ? "null" : entry.jumlahLuk}, ${sqlArray(entry.ornamen)},`,
    `  ${sqlString(JSON.stringify(entry.bagian))}::jsonb,`,
    `  ${sqlString(entry.maknaFilosofis)}, ${sqlString(entry.nilaiBudaya)},`,
    `  ${sqlString(entry.sumberReferensi.join("; "))},`,
    `  ${entry.gambarReferensi === null ? "null" : sqlString(entry.gambarReferensi)},`,
    `  ${sqlString(entry.statusKonten)}, ${entry.verifikasiPakar ? "true" : "false"},`,
    `  ${sqlString(entry.catatanPakar)}, ${sqlString(entry.dibuatPada)}`,
    ")",
    "on conflict (kategori) do update set",
    "  nama = excluded.nama,",
    "  asal_daerah = excluded.asal_daerah,",
    "  bentuk_bilah = excluded.bentuk_bilah,",
    "  jumlah_luk = excluded.jumlah_luk,",
    "  ornamen = excluded.ornamen,",
    "  bagian = excluded.bagian,",
    "  makna_filosofis = excluded.makna_filosofis,",
    "  nilai_budaya = excluded.nilai_budaya,",
    "  sumber_referensi = excluded.sumber_referensi,",
    "  gambar_referensi = excluded.gambar_referensi,",
    "  status_konten = excluded.status_konten,",
    "  verifikasi_pakar = excluded.verifikasi_pakar,",
    "  catatan_pakar = excluded.catatan_pakar;",
    "",
  );
}

for (const entry of kamusEntries) {
  lines.push(
    "insert into public.istilah_kamus (",
    "  istilah, definisi, kategori, sumber, status_konten, verifikasi_pakar",
    ") values (",
    `  ${sqlString(entry.istilah)}, ${sqlString(entry.definisi)}, ${sqlString(entry.kategori)},`,
    `  ${sqlArray(entry.sumber ?? [])}, ${sqlString(entry.statusKonten)}, ${entry.verifikasiPakar ? "true" : "false"}`,
    ")",
    "on conflict (istilah) do update set",
    "  definisi = excluded.definisi,",
    "  kategori = excluded.kategori,",
    "  sumber = excluded.sumber,",
    "  status_konten = excluded.status_konten,",
    "  verifikasi_pakar = excluded.verifikasi_pakar;",
    "",
  );
}

lines.push("commit;", "");
writeFileSync(outputPath, lines.join("\n"), "utf8");
console.log(
  `Seed dibuat: ${outputPath} (${kerisEntries.length} keris, ${kamusEntries.length} istilah)`,
);
