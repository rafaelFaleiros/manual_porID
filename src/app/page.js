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
      <header className="bg-[var(--cor-primaria)] py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-center">
          <img src="/logo.png" alt="Logo da Empresa" className="h-12" />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow flex flex-col items-center justify-center bg-[var(--cor-secundaria)] text-white min-h-screen px-4 pt-16">
        <h1 className="text-3xl font-semibold mb-8">
          Informe o número de série do equipamento
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
          <input
            type="text"
            value={serial}
            onChange={e => setSerial(e.target.value.trim().toUpperCase())}
            placeholder="Digite o número de série"
            required
            className="w-full h-14 px-4 rounded-xl border-2 border-white bg-transparent text-white text-lg placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processando…' : 'Enviar'}
          </button>

          {error && <p className="text-red-300 text-center text-sm">{error}</p>}
        </form>
      </main>

      {/* Footer opcional */}
      <footer className="bg-[var(--cor-primaria)] py-2 text-center">
        <p className="text-sm">&copy; 2025 Sua Empresa. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}