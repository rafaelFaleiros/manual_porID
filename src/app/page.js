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
      
      if (!res.ok) {
        setError(json.error || 'Serial inválido ou não encontrado.');
        setLoading(false);
        return;
      }
      
      window.location.href = json.downloadUrl;
    } catch (err) {
      setError('Ocorreu um erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Navbar */}
      <header className="bg-[#4b79aa] py-4 shadow-md">
        <img
          src="/logo.png"
          alt="Logo da Empresa"
          className="h-12 mx-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/200x50/4b79aa/FFFFFF?text=Logo';
          }}
        />
      </header>

      {/* Conteúdo */}
      <main className="flex flex-col items-center justify-start min-h-screen bg-[#04394E] px-4 pt-20">
        <h2 className="text-white text-2xl font-semibold mb-8 text-center">
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
              rounded-xl 
              border-2 border-white 
              bg-transparent 
              text-white text-lg 
              placeholder-white placeholder-opacity-70 
              focus:outline-none focus:ring-2 focus:ring-white 
              transition duration-200
            "
          />

          {/* Botão com o mesmo estilo e tamanho do input */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full h-14 px-4 
              rounded-xl 
              bg-[#5A7FCF] 
              text-white text-lg font-medium 
              flex items-center justify-center 
              shadow-lg 
              hover:bg-[#4B79AA] hover:-translate-y-0.5 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A7FCF] focus:ring-offset-[#04394E]
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
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
