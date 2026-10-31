import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/scan", label: "Scan Keris" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kamus", label: "Kamus" },
  { href: "/keris", label: "Jenis Keris" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sepia-200/80 bg-parchment/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg py-1 text-sepia-900"
          aria-label="Keris AI — kembali ke beranda"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sepia-900 text-gold-300">
            <BrandMark className="h-7 w-7" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-bold tracking-tight">Keris AI</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-sepia-600 sm:block">
              Warisan Nusantara
            </span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-sepia-800 transition hover:bg-sepia-100 hover:text-sepia-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-gold-500/50 bg-gold-300/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-sepia-800 sm:inline-flex">
            Mode demo
          </span>
          <Link href="/scan" className="btn-primary !min-h-10 !px-4 !py-2 text-xs">
            Mulai Scan
          </Link>
        </div>
      </div>
    </header>
  );
}
