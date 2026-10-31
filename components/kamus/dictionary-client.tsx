"use client";

import { useMemo, useState } from "react";

import type { KamusEntry, KamusKategori } from "@/lib/content/schema";
import {
  filterKamus,
  kamusKategoriList,
  type DictionaryFilter,
} from "@/lib/data/catalog";

const categoryLabels: Record<KamusKategori, string> = {
  istilah: "Istilah",
  jenis: "Jenis",
  bentuk: "Bentuk",
  ornamen: "Ornamen",
  bagian: "Bagian",
  filosofi: "Filosofi",
};

export function DictionaryClient({ entries }: { entries: KamusEntry[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<DictionaryFilter>("semua");

  const results = useMemo(() => filterKamus(entries, query, filter), [entries, query, filter]);
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of entries) {
      map.set(entry.kategori, (map.get(entry.kategori) ?? 0) + 1);
    }
    return map;
  }, [entries]);

  function reset() {
    setQuery("");
    setFilter("semua");
  }

  return (
    <div>
      <div className="rounded-2xl border border-sepia-200 bg-white/75 p-4 sm:p-5">
        <label htmlFor="cari-istilah" className="field-label">
          Cari istilah atau arti
        </label>
        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sepia-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            id="cari-istilah"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Contoh: pamor, luk, warangka…"
            className="text-input !pl-12"
            autoComplete="off"
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-sepia-500">
            Filter kategori
          </p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter kategori kamus">
            <button
              type="button"
              onClick={() => setFilter("semua")}
              aria-pressed={filter === "semua"}
              className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                filter === "semua"
                  ? "border-sepia-900 bg-sepia-900 text-sepia-50"
                  : "border-sepia-200 bg-white text-sepia-700 hover:border-sepia-400"
              }`}
            >
              Semua ({entries.length})
            </button>
            {kamusKategoriList.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                  filter === category
                    ? "border-sepia-900 bg-sepia-900 text-sepia-50"
                    : "border-sepia-200 bg-white text-sepia-700 hover:border-sepia-400"
                }`}
              >
                {categoryLabels[category]} ({counts.get(category) ?? 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <p className="text-sm text-sepia-600" aria-live="polite">
          {results.length} istilah ditampilkan
          {query.trim() ? ` untuk “${query.trim()}”` : ""}.
        </p>
        {(query || filter !== "semua") && (
          <button type="button" onClick={reset} className="text-xs font-semibold text-sepia-800 underline hover:text-gold-700">
            Reset filter
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-sepia-300 bg-white/60 p-10 text-center">
          <p className="font-serif text-xl font-bold text-sepia-950">Istilah tidak ditemukan</p>
          <p className="mt-2 text-sm text-sepia-600">
            Coba kata kunci lain atau pilih kategori yang berbeda.
          </p>
          <button type="button" onClick={reset} className="btn-secondary mt-4">
            Tampilkan semua istilah
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {results.map((entry) => (
            <article
              key={entry.id}
              className="rounded-2xl border border-sepia-200 bg-white/80 p-5 transition hover:border-gold-500/40"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="font-serif text-lg font-bold text-sepia-950">{entry.istilah}</h2>
                <span className="chip !text-[10px]">{categoryLabels[entry.kategori]}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-sepia-700">{entry.definisi}</p>
              {entry.sumber.length > 0 ? (
                <details className="mt-3 text-[11px] text-sepia-500">
                  <summary className="cursor-pointer font-medium text-sepia-600 hover:text-sepia-900">
                    Sumber
                  </summary>
                  <ul className="mt-1.5 space-y-1 pl-4">
                    {entry.sumber.map((source) => (
                      <li key={source} className="list-disc">{source}</li>
                    ))}
                  </ul>
                </details>
              ) : null}
              <p className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                Draf — belum diverifikasi pakar
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
