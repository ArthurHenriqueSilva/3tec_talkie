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
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const startRecordingChunk = useCallback(() => {
    if (!mediaStreamRef.current) return;

    const mediaRecorder = new MediaRecorder(mediaStreamRef.current);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        event.data.arrayBuffer().then((audioBuffer) => {
          sendAudio(audioBuffer);
          console.log("Sent audio data"); // Log do envio do áudio
        });
      }
    };

    mediaRecorder.onstart = () => console.log("Recording started");
    mediaRecorder.onstop = () => console.log("Recording stopped");

    mediaRecorder.start();
    setTimeout(() => mediaRecorder.stop(), 1000);
  }, [sendAudio]);

  const startContinuousRecording = useCallback(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          intervalIdRef.current = setInterval(startRecordingChunk, 1000); // Intervalo de 1 segundo
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });
    } else {
      console.error("getUserMedia is not supported on this browser.");
    }
  }, [startRecordingChunk]);

  const stopContinuousRecording = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isMicActive) {
      startContinuousRecording();
    } else {
      stopContinuousRecording();
    }

    return () => {
      stopContinuousRecording();
    };
  }, [isMicActive, startContinuousRecording, stopContinuousRecording]);

  // Iniciar ou parar a gravação ao pressionar o mouse
  const handleMicMouseDown = () => setIsMicActive(true);
  const handleMicMouseUp = () => setIsMicActive(false);

  // Atalhos de teclado para iniciar/parar a gravação
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
