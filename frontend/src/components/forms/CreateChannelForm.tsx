"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { api } from "@/proxy/proxy";
interface CreateChannelFormData {
  name: string;
  password: string;
}

export default function CreateChannelForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateChannelFormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: CreateChannelFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post("/api/channels", data);
      setSuccess(true);
      reset();
    } catch (err) {
      setError("Failed to Create Channel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md rounded bg-white p-4 shadow-2xl"
    >
      <h2 className="mb-4 text-xl font-bold">Create a New Channel</h2>

      {error && <div className="mb-4 bg-red-100 p-2 text-red-700">{error}</div>}
      {success && (
        <div className="mb-4 bg-green-100 p-2 text-green-700">
          Channel created successfully!
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Channel Name
        </label>
        <div className="mb-4 flex flex-row items-center rounded border border-gray-300">
          <i className="fa-solid fa-headset mx-2 text-gray-500"></i>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Channel name is required" })}
            className="block w-[90%] p-2 focus:outline-none focus:ring-0"
          />
        </div>

        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <div className="mb-4 flex flex-row items-center rounded border border-gray-300">
          <i className="fa-solid fa-key mx-2 text-gray-500"></i>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
            className="block w-[90%] p-2 focus:outline-none focus:ring-0"
          />
        </div>

        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="roundedc w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Channel"}
      </button>
    </form>
  );
}
