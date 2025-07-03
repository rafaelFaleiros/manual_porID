import Head from 'next/head';

export default function Home() {
return (
<>

Consulta de Manual
{/* importa o CSS puro */}
<header className="navbar">
    <img src="/download/logo.png" alt="Logo da Empresa" className="logo" />
  </header>

  <main className="container">
    <h1>Informe o número de série do equipamento</h1>

    <form id="serial-form">
      <input
        type="text"
        id="serial"
        placeholder="Digite o número de série"
        required
      />
      <button type="submit" id="submit-btn">Enviar</button>
    </form>

    <p className="error-message" id="error"></p>
  </main>

  {/* importa o JS puro */}
  <script src="/download/script.js"></script>
</>
);
}