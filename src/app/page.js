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
      <header className="bg-gradient-to-r from-blue-700 to-teal-500 p-6">
        <img src="/logo.png" alt="Logo da Empresa" className="h-12 mx-auto" />
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white px-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-semibold text-center mb-6">
            DIGITE O NÚMERO DE SÉRIE
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={serial}
              onChange={e => setSerial(e.target.value.trim().toUpperCase())}
              placeholder="Ex: ABC123"
              required
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-teal-400 rounded-lg font-medium hover:bg-teal-500 disabled:opacity-50 transition"
            >
              {loading ? 'Verificando...' : 'Baixar Manual'}
            </button>

            {error && (
              <p className="text-red-300 text-sm text-center">{error}</p>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
