'use client';

import { useState } from 'react';

export default function Home() {
  const [serial, setSerial] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch(`/api/manual/${encodeURIComponent(serial)}`);
    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(json.error || 'Serial inválido');
      return;
    }
    window.location.href = json.downloadUrl;
  }

  return (
    <>
      {/* Navbar */}
      <header className="bg-[#4b79aa] py-4 shadow-md">
        <img src="/logo.png" alt="Logo da Empresa" className="h-12 mx-auto" />
      </header>

      {/* Conteúdo */}
      <main className="flex flex-col items-center justify-start min-h-screen bg-[#04394E] px-4 pt-20">
        <h2 className="text-white text-2xl font-semibold mb-8">
          Informe o número de série do equipamento
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs flex flex-col gap-4"
        >
          {/* Input estilizado */}
          <input
            type="text"
            value={serial}
            onChange={(e) =>
              setSerial(e.target.value.trim().toUpperCase())
            }
            placeholder="Digite o número de série"
            required
            className=" 
              w-full h-14 px-4
              rounded-x5
              border-2 border-white
              bg-transparent
              text-white text-lg
              placeholder-white placeholder-opacity-50
              focus:outline-none focus:ring-2 focus:ring-white
              transition
            "
          />

          {/* Botão estilizado */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full h-14 px-4
              rounded-xl
              bg-blue-600 hover:bg-blue-700
              text-white text-lg font-medium
              flex items-center justify-center
              transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? 'Verificando…' : 'Enviar'}
          </button>

          {error && (
            <p className="text-red-400 text-sm text-center mt-1">
              {error}
            </p>
          )}
        </form>
      </main>
    </>
  );
}
