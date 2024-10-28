"use client";

import { useRouter } from "next/navigation";
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
  const [passwVisible, setPasswVisible] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: CreateChannelFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post("/api/channels", data);
      setSuccess(true);
      reset();
    } catch (err) {
      setError("Falha ao criar Canal");
    } finally {
      setLoading(false);
    }
  };

  function redirect() {
    router.push("/");
  }

  const handlePasswVisible = () => {
    setPasswVisible(!passwVisible);
  };

  return (
    <div className="relative mt-20 w-full max-w-[20rem] rounded border bg-white p-4 shadow-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mx-auto flex flex-col gap-2 p-4"
      >
        <h2 className="mx-auto mb-4 text-center text-xl font-semibold">
          Criando novo Canal
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 p-2 text-red-700">{error}</div>
        )}
        {success && (
          <div className="mb-4 bg-green-100 p-2 text-green-700">
            Channel created successfully!
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Nome *
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

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Senha *
          </label>
          <div className="mb-4 flex flex-row items-center rounded border border-gray-300">
            <i className="fa-solid fa-key mx-2 text-gray-500"></i>
            <input
              id="password"
              type={passwVisible ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              className="block w-[90%] p-2 focus:outline-none focus:ring-0"
            />
            <i
              onClick={handlePasswVisible}
              className={`fa-solid ${passwVisible ? "fa-eye" : "fa-eye-slash"}  mr-2 cursor-pointer text-gray-500 hover:text-gray-400`}
            ></i>
          </div>

          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Criando Canal..." : "Criar Canal"}
        </button>
        <button
          onClick={redirect}
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
          Conectar-se a Canal existente
        </button>
      </form>
    </div>
  );
}
