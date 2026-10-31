import type { Metadata } from "next";

import { ResultLoader } from "@/components/result/result-loader";

export const metadata: Metadata = {
  title: "Hasil Identifikasi",
  description:
    "Lihat hasil identifikasi keris: jenis, asal daerah, bentuk bilah, ornamen, bagian, dan makna budaya.",
  robots: { index: false, follow: false },
};

export default async function HasilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ResultLoader id={id} />;
}
