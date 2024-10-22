"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function UserPage() {
  const { channelName } = useParams();
  const [isMicActive, setIsMicActive] = useState(false);

  const toggleMic = () => {
    setIsMicActive((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl">Canal: {channelName}</h1>
      <button onClick={toggleMic} className="text-5xl">
        {isMicActive ? (
          <i className="fa-solid fa-microphone"></i>
        ) : (
          <i className="fa-solid fa-microphone-slash"></i>
        )}
      </button>
    </div>
  );
}
