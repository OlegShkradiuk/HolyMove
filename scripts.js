// ===== Theme toggle (light/dark) =====
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const LS_KEY = 'hm_theme';
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function apply(theme){
    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', theme === 'dark');
    localStorage.setItem(LS_KEY, theme);
  }

  const stored = localStorage.getItem(LS_KEY);
  apply(stored || (prefersDark ? 'dark' : 'light'));

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    apply(current === 'dark' ? 'light' : 'dark');
  });
})();

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Simple form validation and demo submit =====
(function(){
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');

  function setError(id, msg){
    const small = form.querySelector(`.form__error[data-for="${id}"]`);
    if(small){ small.textContent = msg || ''; }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';

    let valid = true;
    ['name','phone','from','to','weight','type'].forEach(id => {
      const el = form.elements[id];
      if(!el || !el.value.trim()){
        setError(id, 'Обязательное поле');
        valid = false;
      } else {
        setError(id, '');
      }
    });
    const weight = Number(form.elements['weight'].value);
    if(weight <= 0){ setError('weight','Введите положительное число'); valid = false; }

    if(!valid) return;

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.createdAt = new Date().toISOString();

    // === Backend-ready: send to your API later ===
    // Example:
    // const res = await fetch('/api/quote', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });
    // const data = await res.json();

    console.log('[demo] sending payload:', payload);
    status.textContent = 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.';
    form.reset();
  });
})();
