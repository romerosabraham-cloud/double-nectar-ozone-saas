import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "double-nectar-ozone",
  description: "AI B2B SaaS con RAG + Grok",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}