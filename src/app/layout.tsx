import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anıl Fidan ile Skill Kütüphanesine Doğru",
  description: "1000+ profesyonel skill — şirket içi operasyonel kütüphane.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="overflow-x-hidden">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-white font-sans text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
