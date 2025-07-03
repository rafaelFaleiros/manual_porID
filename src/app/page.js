'use client';

import { useState } from 'react';

export default function Home() {
  const [serial, setSerial] = useState('');
  const [error, setError]   = useState('');
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

      {/* Conteúdo principal */}
      <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-blue-900 to-teal-700 px-4 pt-16">
        {/* Título logo abaixo da navbar */}
        <h2 className="text-white text-xl md:text-2xl font-medium mb-6">
          Informe o número de série do equipamento
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Input */}
          <input
            type="text"
            value={serial}
            onChange={e => setSerial(e.target.value.trim().toUpperCase())}
            placeholder="Ex: ABC123456"
            required
            className="
              w-full
              h-14
              px-4
              rounded-xl
              bg-white bg-opacity-20
              text-white text-lg
              placeholder-white placeholder-opacity-70
              border-0
              focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
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
              bg-[#4b79aa]
              text-white text-lg font-semibold
              rounded-xl
              border-0
              shadow-lg
              hover:bg-[#3a6588]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition ease-in-out duration-200
            "
          >
            {loading ? 'Verificando…' : 'Baixar Manual'}
          </button>

          {/* Mensagem de erro */}
          {error && (
            <p className="text-red-300 text-center mt-2">{error}</p>
          )}
        </form>
      </main>
    </>
  );
}
