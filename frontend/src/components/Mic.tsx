// MicrophoneControl.tsx
"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSocket } from "@/context/Socket";

type MicProps = {
  isMicActive: boolean;
  setIsMicActive: (active: boolean) => void;
};

export default function Mic({ isMicActive, setIsMicActive }: MicProps) {
  const { sendAudio } = useSocket();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = useCallback(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
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
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });
    } else {
      console.error("getUserMedia is not supported on this browser.");
    }
  }, [sendAudio]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log("Recording stopped");
    }
  }, []);

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
  }, [isMicActive, startRecording, stopRecording]);

  // Pressione e segure para iniciar/parar gravação
  const handleMicMouseDown = () => setIsMicActive(true);
  const handleMicMouseUp = () => setIsMicActive(false);

  // Tecla de atalho para iniciar/parar gravação (exemplo: "K")
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k") {
        setIsMicActive(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k") {
        setIsMicActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setIsMicActive]);

  return (
    <button
      onMouseDown={handleMicMouseDown}
      onMouseUp={handleMicMouseUp}
      className="text-5xl"
    >
      {isMicActive ? (
        <i className="fa-solid fa-microphone animate-pulse text-green-500"></i>
      ) : (
        <i className="fa-solid fa-microphone-slash"></i>
      )}
    </button>
  );
}
