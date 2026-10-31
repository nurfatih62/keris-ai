"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { AnalyzeResponse, ApiError } from "@/lib/api/types";
import {
  ImagePrepareError,
  prepareImage,
  type PreparedImage,
} from "@/lib/image/client";
import { saveSessionScan } from "@/lib/storage/scan-store";

type Stage = "idle" | "preparing" | "ready" | "analyzing" | "error";

const qualityTone: Record<PreparedImage["assessment"]["status"], string> = {
  baik: "border-emerald-300 bg-emerald-50 text-emerald-800",
  cukup: "border-amber-300 bg-amber-50 text-amber-800",
  kurang: "border-red-300 bg-red-50 text-red-800",
};

const qualityLabel: Record<PreparedImage["assessment"]["status"], string> = {
  baik: "Kualitas foto baik",
  cukup: "Kualitas foto cukup",
  kurang: "Kualitas foto kurang",
};

export function ScanClient() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("idle");
  const [prepared, setPrepared] = useState<PreparedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<string | null>(null);
  const filenameRef = useRef<string>("");
  const requestIdRef = useRef(0);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  async function loadFile(file: File) {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setStage("preparing");
    setError(null);

    try {
      const next = await prepareImage(file);
      if (requestIdRef.current !== requestId) {
        URL.revokeObjectURL(next.previewUrl);
        return;
      }
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      previewRef.current = next.previewUrl;
      filenameRef.current = file.name;
      setPrepared(next);
      setStage("ready");
    } catch (cause) {
      if (requestIdRef.current !== requestId) return;
      const message =
        cause instanceof ImagePrepareError
          ? cause.message
          : "Gambar tidak dapat diproses. Coba gambar lain.";
      setError(message);
      setPrepared(null);
      setStage("error");
    }
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) void loadFile(file);
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void loadFile(file);
  }

  function reset() {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
    setPrepared(null);
    setError(null);
    setStage("idle");
    filenameRef.current = "";
  }

  async function analyze() {
    if (!prepared || stage === "analyzing") return;
    setStage("analyzing");
    setError(null);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 45_000);

    try {
      const formData = new FormData();
      formData.append("gambar", prepared.blob, "scan.jpg");
      formData.append("namaAsli", filenameRef.current);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      let payload: unknown = null;
      try {
        payload = await response.json();
      } catch (parseError) {
        console.error("Respons analisis bukan JSON", parseError);
      }

      if (!response.ok) {
        const apiError = payload as ApiError | null;
        throw new Error(
          apiError?.error?.pesan ??
            "Analisis gagal diproses. Silakan coba lagi beberapa saat lagi.",
        );
      }

      const result = payload as AnalyzeResponse | null;
      if (!result || !result.id || !result.hasil) {
        throw new Error("Respons analisis tidak lengkap. Silakan coba lagi.");
      }

      saveSessionScan({
        id: result.id,
        dibuatPada: result.dibuatPada,
        gambarDataUrl: prepared.dataUrl,
        hasil: result,
      });

      router.push(`/hasil/${result.id}`);
    } catch (cause) {
      const message =
        cause instanceof DOMException && cause.name === "AbortError"
          ? "Analisis memakan waktu terlalu lama. Periksa koneksi lalu coba lagi."
          : cause instanceof Error
            ? cause.message
            : "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.";
      setError(message);
      setStage("ready");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const busy = stage === "preparing" || stage === "analyzing";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <section className="card" aria-labelledby="unggah-judul">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Langkah 1</p>
            <h2 id="unggah-judul" className="mt-1 font-serif text-2xl font-bold text-sepia-950">
              Pilih foto keris
            </h2>
          </div>
          <span className="chip !border-gold-500/40 !bg-gold-300/15">Mode demo</span>
        </div>

        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={`mt-5 rounded-2xl border-2 border-dashed p-5 transition sm:p-6 ${
            dragActive
              ? "border-gold-500 bg-gold-300/10"
              : "border-sepia-300 bg-sepia-50/60"
          }`}
        >
          {prepared ? (
            <div className="animate-fade">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prepared.previewUrl}
                alt="Pratinjau foto yang akan dianalisis"
                className="mx-auto max-h-[420px] w-auto rounded-xl border border-sepia-200 object-contain shadow-sm"
              />
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${qualityTone[prepared.assessment.status]}`}
                >
                  {qualityLabel[prepared.assessment.status]}
                </span>
                <span className="chip">
                  {prepared.width} × {prepared.height} px
                </span>
                <span className="chip">{(prepared.blob.size / 1024).toFixed(0)} KB</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 text-center sm:py-12">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sepia-900 text-gold-300">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M8 12h8" />
                </svg>
              </span>
              <p className="mt-4 font-serif text-lg font-bold text-sepia-950">
                Ambil foto langsung atau unggah gambar
              </p>
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-sepia-600">
                Anda juga dapat menyeret gambar ke area ini. Format JPEG, PNG, atau
                WebP, maksimum 8 MB.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => cameraInputRef.current?.click()}
                  disabled={busy}
                >
                  Buka Kamera
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={busy}
                >
                  Pilih dari Galeri
                </button>
              </div>
            </div>
          )}
        </div>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          capture="environment"
          onChange={onFileChange}
          className="sr-only"
          aria-label="Ambil foto keris dengan kamera"
          tabIndex={-1}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFileChange}
          className="sr-only"
          aria-label="Pilih gambar keris dari galeri"
          tabIndex={-1}
        />

        {prepared ? (
          <div className="mt-5 rounded-xl border border-sepia-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-sepia-900">Pemeriksaan kualitas</p>
              <span
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${qualityTone[prepared.assessment.status]}`}
              >
                {qualityLabel[prepared.assessment.status]}
              </span>
            </div>
            <ul className="mt-2 space-y-1 text-xs leading-relaxed text-sepia-600">
              {prepared.assessment.catatan.map((note) => (
                <li key={note} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-sepia-500">
              Pemeriksaan ini bersifat saran otomatis dan tidak menggantikan penilaian manusia.
            </p>
          </div>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
          >
            <p className="font-semibold">Gambar belum dapat diproses</p>
            <p className="mt-1 leading-relaxed">{error}</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn-primary flex-1"
            onClick={() => void analyze()}
            disabled={!prepared || busy}
          >
            {stage === "analyzing" ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-sepia-200 border-t-transparent"
                  aria-hidden="true"
                />
                Menganalisis…
              </>
            ) : stage === "preparing" ? (
              "Menyiapkan gambar…"
            ) : (
              "Analisis Gambar"
            )}
          </button>
          {prepared ? (
            <button type="button" className="btn-secondary" onClick={reset} disabled={busy}>
              Hapus
            </button>
          ) : null}
        </div>
        <p aria-live="polite" className="sr-only">
          {stage === "analyzing"
            ? "Sedang menganalisis gambar."
            : stage === "preparing"
              ? "Sedang menyiapkan gambar."
              : ""}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-sepia-500">
          Dengan menekan Analisis Gambar, Anda memahami bahwa hasil merupakan perkiraan
          dan bukan penilaian keaslian atau nilai keris.
        </p>
      </section>

      <aside className="space-y-4">
        <section className="card" aria-labelledby="panduan-judul">
          <p className="eyebrow">Panduan</p>
          <h2 id="panduan-judul" className="mt-1 font-serif text-xl font-bold text-sepia-950">
            Foto yang baik membantu hasil
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-sepia-700">
            {[
              "Gunakan cahaya alami yang lembut; hindari bayangan keras.",
              "Ambil dari beberapa sudut, termasuk tampak samping bilah.",
              "Pastikan seluruh bilah, hulu, dan sarung terlihat.",
              "Letakkan keris pada latar polos yang kontras.",
              "Tahan perangkat dengan stabil agar gambar tidak buram.",
            ].map((tip) => (
              <li key={tip} className="flex gap-2.5">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-600"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm3.7 6.7-4.2 4.2a1 1 0 0 1-1.4 0L5.9 10.7l1.4-1.4 1.5 1.5 3.5-3.5 1.4 1.4Z" />
                </svg>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card" aria-labelledby="komponen-judul">
          <p className="eyebrow">Hasil</p>
          <h2 id="komponen-judul" className="mt-1 font-serif text-xl font-bold text-sepia-950">
            Enam komponen identifikasi
          </h2>
          <ol className="mt-4 grid grid-cols-2 gap-2 text-xs text-sepia-700">
            {[
              "Jenis keris",
              "Asal daerah",
              "Bentuk & luk",
              "Ornamen",
              "Bagian keris",
              "Makna budaya",
            ].map((item, index) => (
              <li key={item} className="rounded-lg bg-sepia-50 px-2.5 py-2">
                <span className="mr-1 font-serif font-bold text-gold-700">{index + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-sepia-200 bg-sepia-900 p-5 text-sepia-100">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
            Privasi
          </p>
          <p className="mt-2 text-sm leading-relaxed text-sepia-200">
            Pada mode demo, gambar diproses sementara untuk analisis dan tidak disimpan
            di server. Riwayat galeri hanya tersimpan di penyimpanan browser perangkat
            ini setelah Anda menekan Simpan.
          </p>
        </section>
      </aside>
    </div>
  );
}
