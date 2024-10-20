"use client";

import { useState } from "react";

import { socket } from "./Socket";

export default function Connect() {
  const [channel, setChannel] = useState("general");
  const [input, setInput] = useState("");

  // useEffect(() => {
  //   socket.emit("joinChannel", { channelName: channel });
  // }, [channel]);

  const handleChannelChange = () => {
    setChannel(input);
  };

  return (
    <div className="flex w-[40%] flex-col gap-12 rounded bg-[#12375e] p-2 py-6">
      <h1 className="mx-auto text-2xl font-extrabold text-white">
        Insert the Channel
      </h1>
      <div className="mx-auto flex w-[50%] flex-col gap-10">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="24"
              height="24"
              className="text-white"
            >
              <path
                fill="#12375e"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM241 119c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l31 31L120 184c-13.3 0-24 10.7-24 24s10.7 24 24 24l118.1 0-31 31c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9l-72-72z"
              />
            </svg>
          </span>
          <input
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            type="text"
            id="channel"
            placeholder="Insert Channel here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button
          onClick={handleChannelChange}
          className="rounded-lg bg-white p-2 text-[#12375e] hover:font-bold"
        >
          Enter Channel
        </button>
      </div>
    </div>
  );
}
