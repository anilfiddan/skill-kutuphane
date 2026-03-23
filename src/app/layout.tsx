import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skill Kütüphanesi — Şirket İçi Araç Seti",
  description:
    "1000+ profesyonel skill ile iş süreçlerinizi hızlandırın. Yapay zeka, pazarlama, geliştirme, satış ve daha fazlası.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
