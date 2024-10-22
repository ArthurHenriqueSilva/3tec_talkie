import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Talkie",
  description: "Projeto de Inovação - 3Tecnos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <Header />

        <main className="flex flex-grow items-center justify-center">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
