import React from "react";
export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold mb-6">double-nectar-ozone</h1>
        <p className="text-2xl text-zinc-400 mb-10">
          Tu SaaS de IA con RAG + Grok
        </p>
        <a
          href="/sign-in"
          className="inline-block bg-white text-black font-semibold px-10 py-4 rounded-2xl text-lg hover:bg-gray-200 transition"
        >
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
}