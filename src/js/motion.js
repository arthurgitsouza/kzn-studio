// Motor de movimento: Lenis ↔ GSAP (ticker) + ScrollTrigger.
// Só é carregado quando o usuário NÃO pediu movimento reduzido.
// Só transform e opacity são animados (as cores do "Atrair/Comunicar/Converter" usam transição de cor, em texto).
// Regra de ouro: toda seção REFAZ suas animações cada vez que o usuário passa por ela, descendo ou subindo.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const FINE = '(hover: hover) and (pointer: fine)';

// Tempos (em segundos) da sequência de cores da segunda seção. Mexa só aqui.
const SEQ = {
  delay: 1, //     espera depois que o bloco Atrair/Comunicar/Converter aparece na tela
  step: 1.7, //    quanto cada palavra (Atrair, Comunicar, Converter) fica vermelha
  linkGap: 0.2, // pausa entre a última palavra e o link
  linkHold: 1.5, // quanto o link "Conheça nossa forma de trabalhar" fica vermelho
};

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
  reveals();
  scrubWords();
  method();
  counters();
  subheroColors();
  svcLive();

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

/* Elemento dentro de algo "colado" (position: sticky: a capa e os painéis laterais).
   A posição desses elementos não acompanha o scroll, então eles não podem ser escondidos
   pelo gatilho do próprio elemento: o reset deles é feito pela seção (ou pela capa). */
const isStuck = (el) => {
  for (let n = el; n && n !== document.body; n = n.parentElement) if (getComputedStyle(n).position === 'sticky') return true;
  return false;
};

/* Entrada e saída refeitas: toca ao entrar (descendo OU subindo) e volta ao estado inicial quando sai de vista. */
function replayOn(el, { start = 'top 92%', play, reset, resetToo = true }) {
  ScrollTrigger.create({ trigger: el, start, onEnter: play, onEnterBack: play });
  if (resetToo) ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onLeave: reset, onLeaveBack: reset });
}

const playBlocks = (els) =>
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
  });

const resetBlock = (el) => {
  gsap.killTweensOf(el);
  el.classList.remove('is-in');
  gsap.set(el, { clearProps: 'opacity,transform' });
};

const playSplit = (el) => el.classList.add('is-in');
const resetSplit = (el) => el.classList.remove('is-in');

/* Títulos por palavra (máscara) e blocos que sobem (fade + translate com stagger) */
function reveals() {
  const sel = '[data-reveal], [data-reveal-group] > *';

  // Títulos
  document.querySelectorAll('[data-split]').forEach((el) => {
    replayOn(el, { play: () => playSplit(el), reset: () => resetSplit(el), resetToo: !isStuck(el) });
  });

  // Blocos: tocam em lotes (stagger); o reset é por elemento, exceto os "colados"
  ScrollTrigger.batch(sel, {
    start: 'top 92%',
    interval: 0.08,
    batchMax: 6,
    onEnter: playBlocks,
    onEnterBack: playBlocks,
  });
  document.querySelectorAll(sel).forEach((el) => {
    if (isStuck(el)) return;
    ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onLeave: () => resetBlock(el), onLeaveBack: () => resetBlock(el) });
  });

  // Elementos "colados" fora da capa: resetam quando a SEÇÃO inteira sai de vista
  document.querySelectorAll('main > .section').forEach((sec) => {
    const stuck = [...sec.querySelectorAll(`[data-split], ${sel}`)].filter(isStuck);
    if (!stuck.length) return;
    const reset = () => stuck.forEach((el) => (el.hasAttribute('data-split') ? resetSplit(el) : resetBlock(el)));
    ScrollTrigger.create({ trigger: sec, start: 'top bottom', end: 'bottom top', onLeave: reset, onLeaveBack: reset });
  });

  heroReplay(sel);
}

/* Capa: a entrada refaz quando o usuário volta para o topo (depois de ter passado da capa) */
function heroReplay(sel) {
  const hero = document.querySelector('.hero');
  const next = hero?.nextElementSibling;
  if (!hero || !next) return;
  const splits = [...hero.querySelectorAll('[data-split]')];
  const blocks = [...hero.querySelectorAll(sel)];
  let armed = false;
  const replay = () => {
    splits.forEach(resetSplit);
    blocks.forEach(resetBlock);
    void hero.offsetWidth; // força o navegador a registrar o estado inicial antes de animar
    requestAnimationFrame(() => {
      splits.forEach(playSplit);
      playBlocks(blocks);
    });
  };
  ScrollTrigger.create({
    trigger: next,
    start: 'top bottom',
    end: 'top top',
    onUpdate: (s) => {
      if (s.progress > 0.7) armed = true;
      else if (armed && s.progress < 0.25) {
        armed = false;
        replay();
      }
    },
  });
}

/* Texto que acende palavra por palavra enquanto você rola (acompanha o scroll nos dois sentidos) */
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

/* Processo e solução: cada passo acende (linha vermelha, número e título) ao chegar nele e apaga ao sair de vista */
function method() {
  document.querySelectorAll('.step, .op').forEach((step) => {
    replayOn(step, {
      start: 'top 78%',
      play: () => step.classList.add('is-on'),
      reset: () => step.classList.remove('is-on'),
    });
  });
}

/* Números do case: contagem só quando houver valor real (data-count="120"); recomeça a cada visita */
function counters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    if (Number.isNaN(end)) return;
    const { prefix = '', suffix = '' } = el.dataset;
    const dec = Number(el.dataset.decimals || 0);
    const fmt = (v) => v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    const o = { v: 0 };
    let tween;
    const play = () => {
      tween?.kill();
      o.v = 0;
      tween = gsap.to(o, {
        v: end,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => (el.textContent = prefix + fmt(dec ? o.v : Math.round(o.v)) + suffix),
      });
    };
    ScrollTrigger.create({ trigger: el, start: 'top 90%', onEnter: play, onEnterBack: play });
  });
}

/* Segunda seção: assim que o bloco Atrair/Comunicar/Converter aparece na tela, espera 1 s e pinta de
   vermelho UMA palavra por vez (Atrair → Comunicar → Converter); uma só fica vermelha de cada vez.
   Depois o link "Conheça nossa forma de trabalhar" fica vermelho por um instante. Refaz a cada visita. */
function subheroColors() {
  const sec = document.getElementById('operacao');
  if (!sec) return;
  const words = [...sec.querySelectorAll('.triad__item strong')];
  const trigger = sec.querySelector('.triad') || sec;
  const link = sec.querySelector('.link-text');
  if (!words.length) return;
  const all = [...words, link].filter(Boolean);
  let tl;

  const clear = () => {
    tl?.kill();
    tl = null;
    all.forEach((el) => el.classList.remove('is-lit'));
  };
  const play = () => {
    clear();
    tl = gsap.timeline({ delay: SEQ.delay });
    words.forEach((w, i) => {
      tl.call(() => w.classList.add('is-lit'), null, i * SEQ.step);
      tl.call(() => w.classList.remove('is-lit'), null, (i + 1) * SEQ.step);
    });
    if (link) {
      const t = words.length * SEQ.step + SEQ.linkGap;
      tl.call(() => link.classList.add('is-lit'), null, t);
      tl.call(() => link.classList.remove('is-lit'), null, t + SEQ.linkHold);
    }
  };

  ScrollTrigger.create({ trigger, start: 'top 88%', end: 'bottom 12%', onEnter: play, onEnterBack: play, onLeave: clear, onLeaveBack: clear });
}

/* Cards de serviço no toque (celular/tablet, sem hover): o card que está na tela ganha o anel vermelho girando na borda do
   painel de texto (.is-live) e a seta vira e fica vermelha UMA vez (.is-hit) quando cada card é visto, inclusive ao arrastar
   de lado. Ao sair da seção tudo reinicia, e ao voltar a animação se refaz. No desktop com mouse quem manda é o :hover (CSS). */
function svcLive() {
  const grid = document.querySelector('.svc-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.svc')];
  const touch = window.matchMedia(`(hover: none), (max-width: 639px)`);
  const seen = new Set();

  const clear = () => {
    seen.clear();
    cards.forEach((c) => c.classList.remove('is-live', 'is-hit'));
  };

  // card "ativo" = pelo menos 60% dele visível na tela (conta o recorte da fileira que rola de lado)
  const io = new IntersectionObserver(
    (entries) => {
      if (!touch.matches) return;
      entries.forEach((e) => {
        const on = e.isIntersecting && e.intersectionRatio >= 0.6;
        e.target.classList.toggle('is-live', on);
        if (on && !seen.has(e.target)) {
          seen.add(e.target);
          e.target.classList.add('is-hit');
        }
      });
    },
    { threshold: [0, 0.6, 1] },
  );
  cards.forEach((c) => io.observe(c));

  // saiu da seção por completo: reinicia (a seta volta ao normal fora da vista e vira de novo na próxima visita)
  new IntersectionObserver(
    (entries) => entries.forEach((e) => !e.isIntersecting && clear()),
    { threshold: 0 },
  ).observe(grid);

  touch.addEventListener('change', () => {
    if (!touch.matches) clear();
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
