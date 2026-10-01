// Motor de movimento: Lenis ↔ GSAP (ticker) + ScrollTrigger.
// Só é carregado quando o usuário NÃO pediu movimento reduzido.
// Só transform e opacity são animados; efeitos de mouse só em hover: hover.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const FINE = '(hover: hover) and (pointer: fine)';

export async function initMotion({ ready }) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ── Scroll suave: Lenis dirigido pelo ticker do GSAP ── */
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  window.__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop(); // parado enquanto o preloader cobre a tela

  document.addEventListener('kzn:lock', (e) => (e.detail.locked ? lenis.stop() : lenis.start()));

  await ready;
  lenis.start();
  clearTimeout(window.__kznFailsafe); // o JS assumiu: a rede de segurança não é mais necessária

  heroCurtain();
  splitReveal();
  blockReveal();
  scrubWords();
  method();
  flow();
  counters();

  if (window.matchMedia(FINE).matches) magnetic();

  const refresh = () => ScrollTrigger.refresh();
  if (document.readyState === 'complete') requestAnimationFrame(refresh);
  else window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready?.then(refresh).catch(() => {});
}

/* Capa: enquanto a próxima seção sobe por cima, a foto se aproxima, o conteúdo recua e a capa escurece (só transform e opacity) */
function heroCurtain() {
  const hero = document.querySelector('.hero');
  const next = hero?.nextElementSibling;
  if (!hero || !next) return;
  const img = hero.querySelector('.hero__media img');
  const inner = hero.querySelector('.hero__inner');
  const shade = hero.querySelector('.hero__shade');
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
  });
  tl.to(img, { scale: 1.12 }, 0).to(inner, { yPercent: -7, opacity: 0.25 }, 0).to(shade, { opacity: 0.78 }, 0);
}

/* Títulos por palavra com máscara (a classe .is-in dispara a transição CSS) */
function splitReveal() {
  document.querySelectorAll('[data-split]').forEach((el) => {
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => el.classList.add('is-in') });
  });
}

/* Blocos pequenos sobem com stagger (fade + translate), em grupos */
function blockReveal() {
  ScrollTrigger.batch('[data-reveal], [data-reveal-group] > *', {
    start: 'top 92%',
    once: true,
    interval: 0.08,
    batchMax: 6,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.085,
        overwrite: 'auto',
        onComplete() {
          els.forEach((el) => {
            el.classList.add('is-in');
            gsap.set(el, { clearProps: 'opacity,transform' });
          });
        },
      }),
  });
}

/* Texto que acende palavra por palavra enquanto você rola */
function scrubWords() {
  document.querySelectorAll('[data-scrub]').forEach((p) => {
    const words = p.querySelectorAll('.sw');
    if (!words.length) return;
    gsap.to(words, {
      opacity: 1,
      ease: 'none',
      stagger: 0.2,
      duration: 1,
      scrollTrigger: { trigger: p, start: 'top 86%', end: 'bottom 56%', scrub: true },
    });
  });
}

/* Método: cada passo acende (linha vermelha e verbo) conforme você chega nele */
function method() {
  document.querySelectorAll('.step').forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 78%',
      onEnter: () => step.classList.add('is-on'),
      onLeaveBack: () => step.classList.remove('is-on'),
    });
  });
}

/* "Antes da mídia": cada item é marcado em sequência */
function flow() {
  const el = document.getElementById('flow');
  if (!el) return;
  const nodes = [...el.querySelectorAll('.flow__node')];
  ScrollTrigger.create({
    trigger: el,
    start: 'top 70%',
    end: 'bottom 58%',
    onUpdate: (s) => nodes.forEach((n, i) => n.classList.toggle('is-on', s.progress >= (i / nodes.length) * 0.92 && s.progress > 0)),
  });
}

/* Números do case: contagem só quando houver valor real (data-count="120") */
function counters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    if (Number.isNaN(end)) return;
    const { prefix = '', suffix = '' } = el.dataset;
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(o, {
          v: end,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = prefix + Math.round(o.v).toLocaleString('pt-BR') + suffix),
        }),
    });
  });
}

/* Botões magnéticos (desktop com mouse) */
function magnetic() {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.16);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.24);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}
