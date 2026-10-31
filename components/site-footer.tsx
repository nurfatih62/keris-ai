import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-sepia-200 bg-sepia-950 text-sepia-100">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sepia-800 text-gold-300">
              <BrandMark className="h-7 w-7" />
            </span>
            <p className="font-serif text-xl font-bold">Keris AI</p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-sepia-300">
            Media pembelajaran budaya untuk mengenali dan memahami keris Nusantara.
            Hasil identifikasi adalah perkiraan, bukan penilaian keaslian atau nilai
            ekonomi.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-[11px] font-medium text-gold-300">
            Konten berstatus draf — menunggu verifikasi pakar
          </p>
        </div>
        <nav aria-label="Tautan jelajah">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Jelajah
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-sepia-200">
            <li><Link className="hover:text-gold-300" href="/scan">Scan Keris</Link></li>
            <li><Link className="hover:text-gold-300" href="/galeri">Galeri</Link></li>
            <li><Link className="hover:text-gold-300" href="/kamus">Kamus Keris</Link></li>
            <li><Link className="hover:text-gold-300" href="/keris">Jenis Keris</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Catatan etika
          </p>
          <p className="mt-4 text-sm leading-relaxed text-sepia-300">
            Makna filosofis disampaikan sebagai perspektif tradisional. Kami tidak
            menampilkan klaim keaslian, harga, atau nilai ekonomi keris.
          </p>
          <p className="mt-4 text-xs text-sepia-400">
            © 2026 Keris AI · Mode demo pengembangan
          </p>
        </div>
      </div>
    </footer>
  );
}
