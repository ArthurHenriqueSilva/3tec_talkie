import Image from "next/image";
import Link from "next/link";

import logo from "@/app/public/3tecnos_logo.png";

export default function Header() {
  return (
    <header className="fixed left-0 top-2 flex w-full justify-center">
      <Link href={"/"} className="cursor-pointer">
        <Image src={logo} priority alt="Logo" className="mx-auto" />
      </Link>
    </header>
  );
}
