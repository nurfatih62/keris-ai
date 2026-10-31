import type { AnalyzeResponse, ApiError } from "@/lib/api/types";
import { getClientKey, checkRateLimit } from "@/lib/api/rate-limit";
import { AMBANG_KEYAKINAN, classifyKeris } from "@/lib/ai/classifier";
import { getKerisBySlug } from "@/lib/data/catalog";
import {
  MAX_IMAGE_BYTES,
  validateImage,
  type ImageValidationIssue,
} from "@/lib/image/validation";

export const runtime = "nodejs";
export const maxDuration = 30;

function errorResponse(
  status: number,
  kode: string,
  pesan: string,
  extraHeaders?: Record<string, string>,
): Response {
  const body: ApiError = { error: { kode, pesan } };
  return Response.json(body, { status, headers: extraHeaders });
}

function issueToResponse(issues: ImageValidationIssue[]): Response {
  const hasOversize = issues.some((issue) => issue.code === "terlalu_besar");
  const hasFormat = issues.some(
    (issue) => issue.code === "format_tidak_didukung" || issue.code === "mime_tidak_cocok",
  );
  const status = hasOversize ? 413 : hasFormat ? 415 : 400;
  const message = issues.map((issue) => issue.message).join(" ");
  const code = issues[0]?.code ?? "gambar_tidak_valid";
  return errorResponse(status, code, message);
}

function qualityFromDimensions(width: number, height: number): AnalyzeResponse["kualitas"] {
  const shortest = Math.min(width, height);
  const ratio = width / Math.max(1, height);
  const catatan: string[] = [];

  if (shortest >= 800) {
    catatan.push("Resolusi gambar memadai.");
  } else if (shortest >= 500) {
    catatan.push("Resolusi gambar cukup, tetapi detail kecil mungkin sulit terbaca.");
  } else {
    catatan.push("Resolusi gambar rendah; detail bilah dan ornamen bisa hilang.");
  }

  if (ratio > 3 || ratio < 1 / 3) {
    catatan.push("Bingkai gambar sangat melebar; pastikan seluruh bilah terlihat jelas.");
  }

  return {
    status: shortest >= 800 ? "baik" : shortest >= 500 ? "cukup" : "kurang",
    lebar: width,
    tinggi: height,
    catatan,
  };
}

export async function POST(request: Request): Promise<Response> {
  const rate = checkRateLimit(getClientKey(request));
  if (!rate.allowed) {
    return errorResponse(
      429,
      "terlalu_banyak_permintaan",
      "Terlalu banyak permintaan. Coba lagi beberapa saat lagi.",
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_IMAGE_BYTES + 1_500_000) {
    return errorResponse(
      413,
      "terlalu_besar",
      "Ukuran unggahan melebihi batas 8 MB. Kompres atau pilih gambar lain.",
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    console.error("Gagal membaca form analisis", error);
    return errorResponse(400, "form_tidak_valid", "Permintaan tidak dapat dibaca.");
  }

  const file = formData.get("gambar");
  if (!(file instanceof File)) {
    return errorResponse(400, "gambar_tidak_ada", "Silakan pilih gambar keris terlebih dahulu.");
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return errorResponse(
      413,
      "terlalu_besar",
      "Ukuran gambar melebihi batas 8 MB. Kompres atau pilih gambar lain.",
    );
  }

  let bytes: Uint8Array;
  try {
    bytes = new Uint8Array(await file.arrayBuffer());
  } catch (error) {
    console.error("Gagal membaca berkas gambar", error);
    return errorResponse(400, "gambar_tidak_terbaca", "Gambar tidak dapat dibaca. Coba berkas lain.");
  }

  const validation = validateImage(bytes, file.type);
  if (!validation.ok || !validation.info) {
    return issueToResponse(validation.issues);
  }

  const rawFilename = formData.get("namaAsli");
  const filename =
    typeof rawFilename === "string" ? rawFilename.slice(0, 160) : undefined;

  try {
    const hasil = await classifyKeris({
      buffer: bytes,
      mimeType: validation.info.mime,
      filename,
    });

    const keris = getKerisBySlug(hasil.label) ?? null;
    const alternatif = hasil.kandidat
      .filter((kandidat) => kandidat.slug !== hasil.label)
      .map((kandidat) => {
        const entry = getKerisBySlug(kandidat.slug);
        return entry
          ? {
              slug: entry.slug,
              nama: entry.nama,
              asalDaerah: entry.asalDaerah,
              skor: kandidat.skor,
            }
          : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    const response: AnalyzeResponse = {
      id: crypto.randomUUID(),
      dibuatPada: new Date().toISOString(),
      mode: "demo",
      gambarUrl: null,
      kualitas: qualityFromDimensions(validation.info.width, validation.info.height),
      hasil: { ...hasil, ambangKeyakinan: AMBANG_KEYAKINAN },
      keris,
      alternatif,
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error("Analisis gambar gagal", error);
    return errorResponse(
      500,
      "analisis_gagal",
      "Layanan analisis sedang bermasalah. Silakan coba lagi.",
    );
  }
}

export function GET(): Response {
  return errorResponse(
    405,
    "metode_tidak_didukung",
    "Gunakan metode POST untuk menganalisis gambar.",
    { Allow: "POST" },
  );
}
