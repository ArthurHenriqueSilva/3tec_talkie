"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Mic from "@/components/Mic";
import { useSocket } from "@/context/Socket";
export default function UserPage() {
  const { channelName, disconnectSocket } = useSocket();
  const [isMicActive, setIsMicActive] = useState(false);
  const router = useRouter();

  const handleDisconnect = () => {
    disconnectSocket();
    router.push("/");
  };

  useEffect(() => {
    if (!channelName) {
      router.push("/");
    }
  });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="relative flex w-56 flex-col gap-10 rounded border bg-white p-4 shadow-2xl">
        <h1 className="mb-4 rounded border border-gray-200 bg-gray-200 p-2 text-center text-2xl">
          {channelName}
        </h1>

        <Mic isMicActive={isMicActive} setIsMicActive={setIsMicActive} />

        <button
          onClick={handleDisconnect}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Desconectar
        </button>
      </div>
    </div>
  );
}
