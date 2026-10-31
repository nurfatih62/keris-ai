import { kontenStatusLabel, type KontenStatus } from "@/lib/content/schema";

const tone: Record<KontenStatus, string> = {
  draf: "border-amber-300 bg-amber-50 text-amber-800",
  diverifikasi: "border-sky-300 bg-sky-50 text-sky-800",
  disetujui: "border-emerald-300 bg-emerald-50 text-emerald-800",
};

export function ContentStatusBadge({
  status,
  className = "",
}: {
  status: KontenStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${tone[status]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {kontenStatusLabel[status]}
    </span>
  );
}
