document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('serial-form');
    const input = document.getElementById('serial');
    const errorP = document.getElementById('error');
    const btn = document.getElementById('submit-btn');
    
    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorP.textContent = '';
    btn.disabled = true;
    btn.textContent = 'Verificando…';

try {
    const value = input.value.trim().toUpperCase();
    const res = await fetch(`/api/manual/${encodeURIComponent(value)}`);
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.error || 'Serial inválido');
    }
    window.location.href = data.downloadUrl;
  } catch (err) {
    errorP.textContent = err.message;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Enviar';
  }

});
});