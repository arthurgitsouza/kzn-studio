// Seção da equipe: ao passar o mouse (ou tocar) em uma pessoa, ou numa linha da lista, ela se separa do grupo.
// Aqui só se troca data-active e as classes is-active; o visual inteiro é CSS (sections.css, bloco "SERVIÇOS: a equipe").
// Ao entrar na seção, um "passeio" destaca cada pessoa uma vez (ensina a interação e mostra todos); qualquer interação o interrompe.
const PUSH = 9; // % da largura de cada pessoa que as outras se afastam, por posição de distância
const TOUR_START = 900;
const TOUR_STEP = 1700;

export function initTeam() {
  const root = document.querySelector('.team');
  const stage = root?.querySelector('[data-team]');
  if (!stage) return;

  const members = [...stage.querySelectorAll('.member')];
  const hits = [...stage.querySelectorAll('.hit')];
  const rows = [...root.querySelectorAll('.row')];
  const caps = [...stage.querySelectorAll('.cap')];
  const ids = members.map((m) => m.dataset.m);
  const touch = window.matchMedia('(hover: none)');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let active = null;
  let leaveTimer = 0;
  let tour = [];

  const set = (id) => {
    clearTimeout(leaveTimer);
    if (id === active) return;
    active = id;
    if (id) root.dataset.active = id;
    else delete root.dataset.active;
    const ai = ids.indexOf(id);
    members.forEach((m, i) => {
      const on = m.dataset.m === id;
      m.classList.toggle('is-active', on);
      m.style.setProperty('--dx', id && !on ? `${(i - ai) * PUSH}%` : '0%');
    });
    rows.forEach((r) => r.classList.toggle('is-active', r.dataset.m === id));
    caps.forEach((c) => c.classList.toggle('is-active', c.dataset.m === id));
  };

  const stopTour = () => {
    tour.forEach(clearTimeout);
    tour = [];
  };
  const byUser = (id) => {
    stopTour();
    set(id);
  };
  const leave = () => {
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => set(null), 120);
  };

  hits.forEach((m) => {
    const id = m.dataset.m;
    m.addEventListener('pointerenter', (e) => e.pointerType !== 'touch' && byUser(id));
    m.addEventListener('pointerleave', (e) => e.pointerType !== 'touch' && leave());
    // No toque, o primeiro toque só destaca; um segundo toque na mesma pessoa segue para o formulário
    m.addEventListener('click', (e) => {
      if (touch.matches && active !== id) {
        e.preventDefault();
        byUser(id);
      }
    });
  });
  rows.forEach((r) => {
    const id = r.dataset.m;
    r.addEventListener('pointerenter', (e) => e.pointerType !== 'touch' && byUser(id));
    r.addEventListener('pointerleave', (e) => e.pointerType !== 'touch' && leave());
    r.addEventListener('focusin', () => byUser(id));
    r.addEventListener('focusout', leave);
  });
  document.addEventListener('pointerdown', (e) => {
    if (active && !e.target.closest('.hit, .row')) {
      stopTour();
      set(null);
    }
  });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && (stopTour(), set(null)));

  // Passeio ao entrar na seção (refaz a cada visita); não roda com movimento reduzido
  if (reduce || !('IntersectionObserver' in window)) return;
  let touring = false;
  new IntersectionObserver(
    ([en]) => {
      if (en.intersectionRatio >= 0.55 && !touring) {
        touring = true;
        stopTour();
        ids.forEach((id, k) => tour.push(setTimeout(() => set(id), TOUR_START + k * TOUR_STEP)));
        tour.push(setTimeout(() => set(null), TOUR_START + ids.length * TOUR_STEP));
      } else if (en.intersectionRatio < 0.2 && touring) {
        touring = false;
        stopTour();
        if (!root.matches(':hover')) set(null);
      }
    },
    { threshold: [0, 0.2, 0.55, 1] },
  ).observe(stage);
}
