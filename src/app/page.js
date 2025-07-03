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
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-center">
          <img src="/logo.png" alt="Logo da Empresa" className="h-10 mr-4" />
          <h1 className="text-xl font-semibold">Central de Manuais</h1>
        </div>
      </header>

      {/* Content */}
      <section className="flex-grow flex items-center justify-center bg-blue-50">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full mx-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
            DIGITE O NÚMERO DE SÉRIE DO SEU EQUIPAMENTO
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={serial}
              onChange={e => setSerial(e.target.value.trim().toUpperCase())}
              placeholder="Ex: ABC123"
              required
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 disabled:opacity-50 transition"
            >
              {loading ? 'Verificando...' : 'Baixar Manual'}
            </button>

            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto text-center text-gray-600">
          © {new Date().getFullYear()} Betta Hidroturbinas. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}