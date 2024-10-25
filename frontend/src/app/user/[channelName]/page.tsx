// UserPage.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="mb-4 text-2xl">Canal: {channelName}</h1>

      <Mic isMicActive={isMicActive} setIsMicActive={setIsMicActive} />

      <button
        onClick={handleDisconnect}
        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Leave Channel
      </button>
    </div>
  );
}
