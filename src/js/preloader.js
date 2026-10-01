// Preloader curto: tempo mínimo (a marca aparece) e máximo (nunca trava a página).
const MIN = 1150;
const MAX = 2800;

export function initPreloader() {
  const el = document.getElementById('preloader');
  const root = document.documentElement;

  return new Promise((resolve) => {
    if (!el) {
      root.classList.remove('is-loading');
      resolve();
      return;
    }
    const loaded = new Promise((r) => {
      if (document.readyState === 'complete') r();
      else window.addEventListener('load', () => r(), { once: true });
    });
    const fonts = (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).catch(() => {});
    const min = new Promise((r) => setTimeout(r, MIN));
    const max = new Promise((r) => setTimeout(r, MAX));

    Promise.race([Promise.all([loaded, fonts, min]), max]).then(() => {
      el.classList.add('is-done');
      root.classList.remove('is-loading');
      document.dispatchEvent(new CustomEvent('kzn:ready'));
      // Revela o hero enquanto a cortina ainda está subindo
      setTimeout(resolve, 380);
      setTimeout(() => el.remove(), 1300);
    });
  });
}
