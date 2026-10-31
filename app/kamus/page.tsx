import type { Metadata } from "next";

import { DictionaryClient } from "@/components/kamus/dictionary-client";
import { kamusEntries } from "@/lib/data/catalog";

export const metadata: Metadata = {
  title: "Kamus Keris",
  description:
    "Telusuri istilah, jenis, bentuk, ornamen, bagian, dan filosofi keris Nusantara.",
};

export default function KamusPage() {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="eyebrow">Kamus Keris</p>
        <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Mengenal istilah keris
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-sepia-700 sm:text-base">
          Dari <span className="font-medium">bilah</span> hingga{" "}
          <span className="font-medium">tangguh</span>, pahami istilah yang sering muncul
          dalam pembahasan keris. Setiap entri menandai status verifikasinya.
        </p>
      </div>
      <div className="mt-8">
        <DictionaryClient entries={kamusEntries} />
      </div>
    </div>
  );
}
