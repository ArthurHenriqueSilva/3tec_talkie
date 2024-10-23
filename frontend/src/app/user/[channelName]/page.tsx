"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useSocket } from "@/context/Socket";

export default function UserPage() {
  const { channelName, disconnectSocket, sendAudio } = useSocket();
  const [isMicActive, setIsMicActive] = useState(false);
  const router = useRouter();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const toggleMic = () => {
    setIsMicActive((prev) => !prev);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          event.data.arrayBuffer().then((audioBuffer) => {
            sendAudio(audioBuffer);
          });
        }
      };

      mediaRecorder.start();
      console.log("Recording started");
    });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log("Recording stopped");
    }
  };

  useEffect(() => {
    if (isMicActive) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => {
      if (mediaRecorderRef.current) {
        stopRecording();
      }
    };
  }, [isMicActive]);

  const handleDisconnect = () => {
    disconnectSocket();
    router.push("/");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="mb-4 text-2xl">Canal: {channelName}</h1>
      <button onClick={toggleMic} className="text-5xl">
        {isMicActive ? (
          <i className="fa-solid fa-microphone"></i>
        ) : (
          <i className="fa-solid fa-microphone-slash"></i>
        )}
      </button>
      <button
        onClick={handleDisconnect}
        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
      >
        Leave Channel
      </button>
    </div>
  );
}
