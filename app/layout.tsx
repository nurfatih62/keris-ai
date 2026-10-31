import type { Metadata, Viewport } from "next";

import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { PwaRegister } from "@/components/pwa-register";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteDescription =
  "Kenali jenis, asal, bentuk, ornamen, dan makna budaya keris melalui foto. Ensiklopedia keris Nusantara dengan status konten yang jelas.";

export const metadata: Metadata = {
  title: {
    default: "Keris AI — Identifikasi dan Ensiklopedia Keris",
    template: "%s · Keris AI",
  },
  description: siteDescription,
  applicationName: "Keris AI",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "Keris AI",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Keris AI — Identifikasi dan Ensiklopedia Keris",
    description: siteDescription,
    type: "website",
    locale: "id_ID",
    siteName: "Keris AI",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3d271a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-parchment text-ink antialiased">
        <a className="skip-link" href="#konten">
          Lewati ke konten utama
        </a>
        <SiteHeader />
        <main id="konten" className="flex-1 pb-24 md:pb-0">
          {children}
        </main>
        <SiteFooter />
        <BottomNav />
        <PwaRegister />
      </body>
    </html>
  );
}
