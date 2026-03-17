import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Snippet Manager",
  description: "OAuth-powered snippet manager built with Next.js App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
