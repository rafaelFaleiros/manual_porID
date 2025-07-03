const form = document.getElementById('serial-form');
const input = document.getElementById('serial');
const errorEl = document.getElementById('error');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorEl.textContent = '';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processando...';

  const serialValue = input.value.trim().toUpperCase();
  try {
    const res = await fetch(`/api/manual/${encodeURIComponent(serialValue)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Serial inválido');
    window.location.href = data.downloadUrl;
  } catch (err) {
    errorEl.textContent = err.message;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';
  }
});