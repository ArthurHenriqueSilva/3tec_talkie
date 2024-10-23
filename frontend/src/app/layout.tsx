import "./globals.css";

import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SocketProvider } from "@/context/Socket";

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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </head>
      <body className={"flex min-h-screen flex-col antialiased"}>
        <SocketProvider>
          <Header />

          <main className="flex flex-grow items-center justify-center">
            {children}
          </main>

          <Footer />
        </SocketProvider>
      </body>
    </html>
  );
}
