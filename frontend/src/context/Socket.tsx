"use client";

import { createContext, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";

import { url } from "@/proxy/proxy";

interface SocketProps {
  socket: Socket | null;
  channelName: string;
  connectSocket: (channelName: string) => void;
  disconnectSocket: () => void;
  sendAudio: (audio: ArrayBuffer) => void;
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

const SocketContext = createContext<SocketProps | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [channelName, setChannelName] = useState<string>("");

  const connectSocket = (channelName: string) => {
    const newSocket = io(`${url}`);
    setSocket(newSocket);
    setChannelName(channelName);

    newSocket.emit("joinChannel", { channelId: channelName });

    newSocket.on("audioData", (audio: ArrayBuffer) => {
      console.log("Received audio data from another client");
      playAudio(audio);
    });
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.emit("leaveChannel", { channelId: channelName });
      socket.disconnect();
      setSocket(null);
      setChannelName("");
      console.log("Socket disconnected and left channel");
    }
  };

  const sendAudio = (audio: ArrayBuffer) => {
    if (socket) {
      socket.emit("audioData", { channelId: channelName, audio });
      console.log("Sent audio data");
    }
  };

  const playAudio = (audioData: ArrayBuffer) => {
    console.log("audioData: ", audioData);
    const audioContext = new AudioContext();
    // console.log("audioContext", audioContext);
    audioContext.decodeAudioData(audioData, (buffer) => {
      // console.log("buffer: ", buffer);
      const source = audioContext.createBufferSource();
      // console.log("source: ", source);
      source.buffer = buffer;
      // console.log("source with buffer: ", source);
      source.connect(audioContext.destination);
      source.start();
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        channelName,
        connectSocket,
        disconnectSocket,
        sendAudio,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
