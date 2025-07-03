'use client';

import { useState } from 'react';
import './globals.css';

export default function HomePage() {
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
      <header className="navbar">
        <div className="navbar__container">
          <img src="/logo.png" alt="Logo da Empresa" className="navbar__logo" />
        </div>
      </header>

      <main className="main-content">
        <h1 className="main-content__title">
          Informe o número de série do equipamento
        </h1>

        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            value={serial}
            onChange={e => setSerial(e.target.value.trim().toUpperCase())}
            placeholder="Digite o número de série"
            required
            className="form-container__input"
          />

          <button
            type="submit"
            disabled={loading}
            className="form-container__button"
          >
            {loading ? 'Verificando…' : 'Enviar'}
          </button>

          {error && (
            <p className="form-container__error">
              {error}
            </p>
          )}
        </form>
      </main>
    </>
  );
}
