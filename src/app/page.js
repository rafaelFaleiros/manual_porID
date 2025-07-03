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

    try {
      const res = await fetch(`/api/manual/${encodeURIComponent(serial)}`);
      const json = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(json.error || 'Serial inválido');
      }
      window.location.href = json.downloadUrl;
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <header className="bg-[#4b79aa] py-4 shadow-md">
        <img src="/logo.png" alt="Logo da Empresa" className="h-10 mx-auto" />
      </header>

      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-teal-700 px-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-10 max-w-sm w-full shadow-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            DIGITE O NÚMERO DE SÉRIE
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Input com estilo profissional */}
            <input
              type="text"
              value={serial}
              onChange={e => setSerial(e.target.value.toUpperCase())}
              placeholder="Ex: ABC123456"
              required
              className="
                w-full
                h-14
                px-5
                rounded-2xl
                bg-white bg-opacity-20
                placeholder-white placeholder-opacity-70
                text-white text-lg
                focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50
                transition
              "
            />

            {/* Botão com cor da navbar e sombra suave */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-14
                flex items-center justify-center
                bg-[#4b79aa]
                text-white text-lg font-semibold
                rounded-2xl
                shadow-xl
                hover:bg-[#3a6588]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition ease-in-out duration-200
              "
            >
              {loading ? 'Verificando…' : 'Baixar Manual'}
            </button>

            {error && (
              <p className="text-red-300 text-center mt-2">{error}</p>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
