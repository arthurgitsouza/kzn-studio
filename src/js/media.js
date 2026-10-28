// Vídeo de explicação do case: quando config.caseVideo tem um arquivo, o tile vira um player de verdade.
export function initCaseVideo(config) {
  const box = document.querySelector('[data-case-video]');
  if (!box || !config.caseVideo) return;
  const play = box.querySelector('.video__play');
  const start = () => {
    const v = document.createElement('video');
    v.src = config.caseVideo;
    v.controls = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.setAttribute('aria-label', 'Vídeo de explicação do case KZN');
    box.replaceChildren(v);
    box.classList.add('is-playing');
    box.removeAttribute('data-pending');
    v.play().catch(() => {});
  };
  // Mostra o botão de play e só carrega o vídeo no clique (não pesa a página)
  box.querySelector('.poster__ph')?.remove();
  box.removeAttribute('data-pending');
  box.setAttribute('role', 'button');
  box.setAttribute('tabindex', '0');
  box.setAttribute('aria-label', 'Assistir à explicação do case');
  play?.classList.add('is-ready');
  box.addEventListener('click', start, { once: true });
  box.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), start()), { once: true });
}
