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
        <img src="/logo.png" alt="Logo da Empresa" className="h-10 mx-auto" />
      </header>

      <main className="flex flex-col items-center justify-start min-h-screen bg-[#04394E] px-4 pt-16">
        {/* Título */}
        <h2 className="text-white text-xl font-medium mb-6">
          Informe o número de série do equipamento
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          {/* Input */}
          <input
            type="text"
            value={serial}
            onChange={e => setSerial(e.target.value.trim().toUpperCase())}
            placeholder="Digite o número de série"
            required
            className="
              w-full
              h-14
              px-4
              rounded-lg
              border
              border-white
              bg-transparent
              text-white text-lg
              placeholder-white placeholder-opacity-60
              focus:outline-none focus:ring-2 focus:ring-white
              transition
            "
          />

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-14
              flex items-center justify-center
              bg-[#5A7FCF]
              text-white text-lg font-medium
              rounded-lg
              hover:bg-[#4970B0]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? 'Verificando…' : 'Enviar'}
          </button>

          {error && (
            <p className="text-red-300 text-center mt-2">{error}</p>
          )}
        </form>
      </main>
    </>
  );
}
