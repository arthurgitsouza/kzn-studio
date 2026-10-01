// FAQ em acordeão — 1 item aberto por vez, com setas/Home/End entre perguntas.
export function initFaq() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  const items = [...list.querySelectorAll('.faq__item')];
  const buttons = items.map((i) => i.querySelector('.faq__q'));

  const set = (item, open) => {
    item.classList.toggle('is-open', open);
    item.querySelector('.faq__q').setAttribute('aria-expanded', String(open));
  };

  items.forEach((item) => {
    item.querySelector('.faq__q').addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      items.forEach((other) => set(other, other === item && willOpen));
    });
  });

  list.addEventListener('keydown', (e) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    const go = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: buttons.length - 1 }[e.key];
    if (go === undefined) return;
    e.preventDefault();
    buttons[(go + buttons.length) % buttons.length].focus();
  });
}
