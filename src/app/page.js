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
            className="h-14 px-4 border-2 border-white rounded-lg bg-transparent text-white text-base placeholder-white/60 focus:outline-none"
          />

          {/* Botão estilizado */}
          <button
            type="submit"
            disabled={loading}
            className="h-14 rounded-lg bg-[#5A7FCF] text-white text-base font-medium cursor-pointer transition-colors duration-200 hover:bg-[#4b79aa] disabled:opacity-60 disabled:cursor-not-allowed"
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