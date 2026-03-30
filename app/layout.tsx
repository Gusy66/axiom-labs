import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import { Providers } from "@/app/providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroDrive | Performance cognitiva de alta precisao",
  description:
    "Protocolos nootropicos personalizados para foco, energia mental e recuperacao cognitiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
