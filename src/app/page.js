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

    // Chama a API dinâmica /api/manual/[serial]
    const res = await fetch(`/api/manual/${encodeURIComponent(serial)}`);
    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(json.error || 'Serial inválido');
      return;
    }

    // Redireciona para o link de download
    window.location.href = json.downloadUrl;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">
          DIGITE SEU NÚMERO DE SÉRIE
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={serial}
            onChange={e => setSerial(e.target.value.trim().toUpperCase())}
            placeholder="Por exemplo: ABC123"
            required
            className="border rounded p-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'Baixar Manual'}
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>
      </div>
    </main>
  );
}