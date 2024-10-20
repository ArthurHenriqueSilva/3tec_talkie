import Image from "next/image";

import logo from "@/app/public/3tecnos_logo.png";

import Connect from "./connection/Connect";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between font-[family-name:var(--font-geist-sans)] sm:p-20">
      <header className="flex w-full justify-center">
        <Image src={logo} alt="Logo" className="mx-auto" />
      </header>
      <main className="flex w-full items-center justify-center p-14 sm:items-start">
        <Connect />
      </main>

      <footer className="flex flex-wrap items-center justify-center gap-6">
        <p>Projeto de Inovação - Talkie - 3tecnos</p>
      </footer>
    </div>
  );
}
