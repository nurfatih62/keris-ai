import type { Metadata } from "next";

import { ResultLoader } from "@/components/result/result-loader";

export const metadata: Metadata = {
  title: "Detail Galeri",
  robots: { index: false, follow: false },
};

export default async function GaleriDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ResultLoader id={id} origin="galeri" />;
}
