// Vídeo de explicação do case.
// - Toca sozinho quando o bloco aparece na tela e pausa quando sai (volta de onde parou; se terminou, recomeça).
// - Tenta tocar COM som. Navegadores só permitem som automático depois que a pessoa já clicou ou tocou na página; se bloquear,
//   toca mudo e liga o som no primeiro clique, toque ou tecla em qualquer lugar (ou no botão de som).
// - O arquivo leve (caseVideoInline) toca no bloco; o de qualidade (caseVideo) só carrega em "Ampliar", dentro de um <dialog>.
// - Com "reduzir movimento" ligado nada toca sozinho: a pessoa aperta o play.
const ICON = {
  on: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6M17.8 6.7a7.3 7.3 0 0 1 0 10.6"/></svg>',
  off: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>',
  zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>',
};

const lock = (locked) => document.dispatchEvent(new CustomEvent('kzn:lock', { detail: { locked } }));

export function initCaseVideo(config) {
  const box = document.querySelector('[data-case-video]');
  if (!box || !config.caseVideo) return;
  const cover = box.querySelector('.poster__img')?.getAttribute('src') || '';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const inlineSrc = config.caseVideoInline || config.caseVideo;

  let video;
  let inView = false;
  let userPaused = false;
  let soundBlocked = false;
  let dlg;

  /* ── controles sobre o bloco ── */
  const ctl = document.createElement('div');
  ctl.className = 'vctl';
  const soundBtn = document.createElement('button');
  soundBtn.type = 'button';
  soundBtn.className = 'vctl__btn vctl__sound';
  const zoomBtn = document.createElement('button');
  zoomBtn.type = 'button';
  zoomBtn.className = 'vctl__btn';
  zoomBtn.setAttribute('aria-label', 'Ampliar o vídeo');
  zoomBtn.innerHTML = ICON.zoom;
  ctl.append(soundBtn, zoomBtn);
  box.append(ctl);

  const paintSound = () => {
    const muted = !video || video.muted;
    soundBtn.innerHTML = (muted ? ICON.off : ICON.on) + (muted && soundBlocked ? '<span>Ativar som</span>' : '');
    soundBtn.setAttribute('aria-label', muted ? 'Ativar o som do vídeo' : 'Desativar o som do vídeo');
    soundBtn.classList.toggle('is-attn', muted && soundBlocked);
  };
  paintSound();

  const ensureVideo = () => {
    if (video) return video;
    video = document.createElement('video');
    video.className = 'poster__video';
    video.src = inlineSrc;
    if (cover) video.poster = cover;
    video.playsInline = true;
    video.preload = 'auto';
    video.setAttribute('aria-label', 'Vídeo de explicação do case KZN');
    video.addEventListener('playing', () => box.classList.add('is-live', 'is-playing'));
    video.addEventListener('pause', () => box.classList.remove('is-playing'));
    video.addEventListener('ended', () => box.classList.remove('is-playing'));
    video.addEventListener('volumechange', paintSound);
    box.insertBefore(video, ctl);
    return video;
  };

  const play = async () => {
    if (dlg?.open) return;
    const v = ensureVideo();
    if (v.ended) v.currentTime = 0;
    try {
      await v.play(); // com som, se o navegador deixar
      soundBlocked = false;
    } catch (err) {
      if (err?.name === 'AbortError') return;
      v.muted = true;
      soundBlocked = true;
      try {
        await v.play();
      } catch {
        /* nem mudo tocou (economia de dados, por exemplo): fica o botão de play */
      }
    }
    paintSound();
  };
  const pause = () => video?.pause();

  // O som é liberado no primeiro gesto da pessoa em qualquer lugar da página
  const unlock = () => {
    ['pointerdown', 'pointerup', 'touchend', 'keydown'].forEach((t) => window.removeEventListener(t, unlock, true));
    if (video && !video.paused && video.muted && soundBlocked) {
      video.muted = false;
      soundBlocked = false;
      paintSound();
    }
  };
  ['pointerdown', 'pointerup', 'touchend', 'keydown'].forEach((t) => window.addEventListener(t, unlock, { capture: true, passive: true }));

  /* ── toca ao entrar, pausa ao sair ── */
  if (!reduce && 'IntersectionObserver' in window) {
    new IntersectionObserver(
      ([en]) => {
        if (en.intersectionRatio >= 0.5 && !inView) {
          inView = true;
          userPaused = false;
          play();
        } else if (en.intersectionRatio < 0.2 && inView) {
          inView = false;
          pause();
        }
      },
      { threshold: [0, 0.2, 0.5, 1] },
    ).observe(box);
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
    else if (inView && !userPaused) play();
  });

  /* ── toque no vídeo: pausa/retoma; sem ter começado, é o play ── */
  box.addEventListener('click', (e) => {
    if (e.composedPath().includes(ctl)) return; // o ícone do botão é trocado durante o clique: o caminho do evento é o que vale
    if (!video || video.paused) {
      userPaused = false;
      if (video) video.muted = false;
      soundBlocked = false;
      play();
    } else {
      userPaused = true;
      pause();
    }
  });
  box.addEventListener('keydown', (e) => {
    if (e.target !== box || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    box.click();
  });
  soundBtn.addEventListener('click', () => {
    ensureVideo();
    video.muted = !video.muted;
    soundBlocked = false;
    if (video.paused) play();
    paintSound();
  });

  /* ── "Ampliar": o vídeo em qualidade, em janela própria ── */
  const buildDialog = () => {
    dlg = document.createElement('dialog');
    dlg.className = 'vdlg';
    dlg.setAttribute('aria-label', 'Vídeo de explicação do case KZN');
    const v = document.createElement('video');
    v.src = config.caseVideo;
    if (cover) v.poster = cover;
    v.controls = true;
    v.playsInline = true;
    v.preload = 'metadata';
    const x = document.createElement('button');
    x.type = 'button';
    x.className = 'vdlg__close';
    x.setAttribute('aria-label', 'Fechar vídeo');
    x.innerHTML = ICON.close;
    x.addEventListener('click', () => dlg.close());
    dlg.append(v, x);
    dlg.addEventListener('click', (e) => e.target === dlg && dlg.close());
    dlg.addEventListener('close', () => {
      const t = v.currentTime;
      v.pause();
      lock(false);
      if (video && t) video.currentTime = Math.min(t, video.duration || t);
      zoomBtn.focus({ preventScroll: true });
      if (inView && !userPaused) play();
    });
    document.body.append(dlg);
  };
  zoomBtn.addEventListener('click', () => {
    if (!dlg) buildDialog();
    const t = video?.currentTime || 0;
    pause();
    lock(true);
    dlg.showModal();
    const v = dlg.querySelector('video');
    const go = () => {
      if (t) v.currentTime = t;
      v.muted = false;
      v.play().catch(() => {});
    };
    if (v.readyState >= 1) go();
    else v.addEventListener('loadedmetadata', go, { once: true });
  });
}
