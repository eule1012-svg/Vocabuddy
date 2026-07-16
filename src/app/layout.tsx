import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vocabuddy",
  description: "用母语理解，用目标语言成长。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
