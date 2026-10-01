// Âncoras internas: Lenis quando existir, rolagem nativa caso contrário.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

export function selectService(value) {
  const radio = [...document.querySelectorAll('input[name="procura"]')].find((r) => r.value === value);
  if (radio) radio.checked = true;
}

export function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const id = a.getAttribute('href');
    if (!id || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();

    if (a.dataset.service) selectService(a.dataset.service);
    document.dispatchEvent(new CustomEvent('kzn:close-menus'));

    // Altura (px) em que a seção deve aterrissar, contada do topo da tela.
    // Padrão 84 (logo abaixo da barra). data-offset="0" encosta a seção no topo (usado pelo "Saiba mais").
    const landing = a.dataset.offset !== undefined ? Number(a.dataset.offset) : 84;
    // O Lenis já soma o scroll-padding-top do <html>; descontamos para o resultado bater com "landing"
    const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

    requestAnimationFrame(() => {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(target, { offset: pad - landing, duration: 1.35, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - landing;
        window.scrollTo({ top: id === '#inicio' ? 0 : top, behavior: reduce.matches ? 'auto' : 'smooth' });
      }
      history.pushState(null, '', id);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}
