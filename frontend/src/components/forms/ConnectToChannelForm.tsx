"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSocket } from "@/context/Socket";
import { Channel } from "@/interface/Channel";
import { api } from "@/proxy/proxy";

export default function ConnectToChannelForm() {
  const [channelName, setChannelName] = useState("");
  const [password, setPassword] = useState("");
  const [channelExists, setChannelExists] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { connectSocket } = useSocket();
  const router = useRouter();

  const checkChannelExists = async () => {
    if (!channelName) return;

    try {
      const response = await api.get(`/api/channels/name/${channelName}`);
      if (response.status === 200) {
        setChannelExists(true);
      }
    } catch (error) {
      setChannelExists(false);
    }
  };

  const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/api/channels/connect", {
        name: channelName,
        password,
      });
      connectSocket(channelName);
      router.push(`/user/${channelName}`);
    } catch (error) {
      console.error("Erro ao conectar ao canal:", error);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await api.get("/api/channels");
      if (response.status === 200) {
        setChannels(response.data);
        setFilteredChannels(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar canais:", error);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    checkChannelExists();
    setFilteredChannels(
      channels.filter((channel) =>
        channel.name.toLowerCase().includes(channelName.toLowerCase()),
      ),
    );
  }, [channelName, channels]);

  const handleChannelClick = (channel: Channel) => {
    setChannelName(channel.name);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-[20rem] rounded border bg-white p-4 shadow-2xl">
      <form
        onSubmit={handleConnect}
        className="relative mx-auto flex flex-col gap-2 p-4"
      >
        <div>
          <label htmlFor="channelName" className="block text-sm font-medium">
            Nome do Canal
          </label>
          <div className="mb-4 flex flex-row items-center rounded border border-gray-300">
            <i className="fa-solid fa-headset mx-2 text-gray-500"></i>
            <input
              type="text"
              id="channelName"
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
              className="block w-[90%] p-2 focus:outline-none focus:ring-0"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Senha
          </label>
          <div className="mb-4 flex flex-row items-center rounded border border-gray-300">
            <i className="fa-solid fa-key mx-2 text-gray-500"></i>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-[90%] p-2 focus:outline-none focus:ring-0"
              required
              disabled={!channelExists}
            />
          </div>
        </div>
        {showDropdown && filteredChannels.length > 0 && (
          <ul className="absolute top-16 z-10 w-[90%] rounded border border-gray-300 bg-white p-2 shadow-lg">
            {filteredChannels.map((channel) => (
              <li
                key={channel.id}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleChannelClick(channel)}
              >
                {channel.name}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Connect
        </button>
        <button
          onClick={() => router.push("/channels/create")}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
}
