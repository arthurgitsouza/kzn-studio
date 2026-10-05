// Barra de menu da capa: três menus suspensos, menu móvel, scroll-spy e estado "rolou".
// O logo recolhe/abre por CSS (.is-scrolled) e no hover; aqui só mantemos o estado.
const FINE = '(hover: hover) and (pointer: fine)';

export function initHeader() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const toggle = nav.querySelector('.nav__toggle');
  const sheet = document.getElementById('sheet');
  const inertTargets = [...document.querySelectorAll('main, footer')];

  // O CSS controla visibilidade/transições (hidden só serve para o caso sem JS)
  sheet?.removeAttribute('hidden');

  /* ── estado "rolou" ── */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── menus suspensos (um aberto por vez) ── */
  const items = [...nav.querySelectorAll('.has-menu')].map((li) => ({
    li,
    btn: li.querySelector('.nav__link--btn'),
    menu: li.querySelector('.menu'),
    timer: 0,
  }));
  const setMenu = (it, open) => {
    it.menu.classList.toggle('is-open', open);
    it.btn.setAttribute('aria-expanded', String(open));
  };
  const closeAll = (except) => items.forEach((it) => it !== except && setMenu(it, false));

  items.forEach((it) => {
    it.btn.addEventListener('click', () => {
      const open = it.btn.getAttribute('aria-expanded') !== 'true';
      closeAll(it);
      setMenu(it, open);
    });
    if (window.matchMedia(FINE).matches) {
      it.li.addEventListener('pointerenter', () => {
        clearTimeout(it.timer);
        closeAll(it);
        setMenu(it, true);
      });
      it.li.addEventListener('pointerleave', () => {
        it.timer = setTimeout(() => setMenu(it, false), 160);
      });
    }
    it.li.addEventListener('focusout', (e) => {
      if (!it.li.contains(e.relatedTarget)) setMenu(it, false);
    });
  });
  document.addEventListener('pointerdown', (e) => {
    items.forEach((it) => !it.li.contains(e.target) && setMenu(it, false));
  });

  /* ── menu móvel ── */
  const setSheet = (open) => {
    if (!sheet || !toggle) return;
    sheet.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = open ? 'hidden' : '';
    inertTargets.forEach((el) => (open ? el.setAttribute('inert', '') : el.removeAttribute('inert')));
    document.dispatchEvent(new CustomEvent('kzn:lock', { detail: { locked: open } }));
    if (open) markCurrent();
  };
  // Destaca (em vermelho) o item do menu da seção que está no meio da tela
  const markCurrent = () => {
    const mid = window.innerHeight * 0.45;
    sheet.querySelectorAll('.sheet__nav a').forEach((a) => {
      const r = document.querySelector(a.getAttribute('href'))?.getBoundingClientRect();
      const here = r && r.top <= mid && r.bottom > mid;
      if (here) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };
  toggle?.addEventListener('click', () => setSheet(!sheet.classList.contains('is-open')));

  // Focus trap simples dentro do menu móvel
  sheet?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = [toggle, ...sheet.querySelectorAll('a[href]')].filter(Boolean);
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  toggle?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !e.shiftKey || !sheet?.classList.contains('is-open')) return;
    const links = sheet.querySelectorAll('a[href]');
    e.preventDefault();
    links[links.length - 1].focus();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (sheet?.classList.contains('is-open')) {
      setSheet(false);
      toggle.focus();
    }
    const open = items.find((it) => it.menu.classList.contains('is-open'));
    if (open) {
      setMenu(open, false);
      open.btn.focus();
    }
  });
  document.addEventListener('kzn:close-menus', () => {
    closeAll();
    if (sheet?.classList.contains('is-open')) setSheet(false);
  });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => {
    if (e.matches && sheet?.classList.contains('is-open')) setSheet(false);
  });

  /* ── scroll-spy: o menu que contém a seção atual fica sublinhado ── */
  const byMenu = (id) => items.find((it) => it.btn.getAttribute('aria-controls') === id)?.btn;
  const map = {
    estrategia: byMenu('menu-plan'),
    criatividade: byMenu('menu-sites'),
    metodo: byMenu('menu-explore'),
    case: byMenu('menu-explore'),
    clientes: byMenu('menu-explore'),
    contato: byMenu('menu-explore'),
    faq: byMenu('menu-explore'),
  };
  if ('IntersectionObserver' in window) {
    const ids = Object.keys(map);
    const active = new Set();
    const render = () => {
      Object.values(map).forEach((el) => el?.removeAttribute('aria-current'));
      const current = ids.filter((id) => active.has(id)).pop();
      if (current) map[current]?.setAttribute('aria-current', 'true');
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => (en.isIntersecting ? active.add(en.target.id) : active.delete(en.target.id)));
        render();
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* ── logo abre completo uma vez ao entrar (vitrine no desktop) ── */
  const brand = nav.querySelector('.brand');
  if (brand && document.documentElement.classList.contains('motion') && window.matchMedia(FINE).matches) {
    document.addEventListener(
      'kzn:ready',
      () => {
        setTimeout(() => {
          brand.classList.add('is-open');
          setTimeout(() => brand.classList.remove('is-open'), 2600);
        }, 900);
      },
      { once: true },
    );
  }
}
