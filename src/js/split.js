// Divide textos em palavras preservando <em>/<strong> dentro do título.
// [data-split]  → <span.w><span.wi>palavra</span></span> (máscara + translateY)
// [data-scrub]  → <span.sw>palavra</span> (opacidade acende com o scroll)

function walk(node, makeWord) {
  [...node.childNodes].forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((tok) => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) frag.append(' ');
        else frag.append(makeWord(tok));
      });
      n.replaceWith(frag);
    } else if (n.nodeType === Node.ELEMENT_NODE && n.tagName !== 'BR') {
      walk(n, makeWord);
    }
  });
}

export function splitHeadings(root = document) {
  root.querySelectorAll('[data-split]').forEach((el) => {
    let i = 0;
    walk(el, (tok) => {
      const w = document.createElement('span');
      w.className = 'w';
      const inner = document.createElement('span');
      inner.className = 'wi';
      inner.style.setProperty('--i', i++);
      inner.textContent = tok;
      w.append(inner);
      return w;
    });
  });
  root.querySelectorAll('[data-scrub]').forEach((el) => {
    walk(el, (tok) => {
      const s = document.createElement('span');
      s.className = 'sw';
      s.textContent = tok;
      return s;
    });
  });
}
