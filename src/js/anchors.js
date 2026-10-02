// Âncoras internas: Lenis quando existir, rolagem nativa caso contrário.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

// Marca o serviço no formulário (a seleção é múltipla: soma ao que já estiver marcado)
export function selectService(value) {
  const boxes = [...document.querySelectorAll('input[name="procura"]')];
  const box = boxes.find((r) => r.value === value);
  if (!box) return;
  box.checked = true;
  boxes.filter((b) => b.value === 'Ainda não sei exatamente').forEach((b) => (b.checked = false));
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
        // #inicio: a capa fica "colada" no topo (sticky), então a posição dela nunca muda ao rolar.
        // Por isso o logo e o "Voltar ao topo" vão direto para o topo da página.
        if (id === '#inicio') lenis.scrollTo(0, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
        else lenis.scrollTo(target, { offset: pad - landing, duration: 1.35, easing: (t) => 1 - Math.pow(1 - t, 4) });
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
