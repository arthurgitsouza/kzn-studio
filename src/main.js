import '@fontsource/poppins/latin-300.css';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import 'lenis/dist/lenis.css';
import './styles/tokens.css';
import './styles/components.css';
import './styles/sections.css';

import { config } from './config.js';
import { applyConfig } from './js/contact.js';
import { splitHeadings } from './js/split.js';
import { initPreloader } from './js/preloader.js';
import { initHeader } from './js/header.js';
import { initFaq } from './js/faq.js';
import { initForm } from './js/form.js';
import { initAnchors } from './js/anchors.js';

const root = document.documentElement;
const motion = root.classList.contains('motion'); // definido no <head>: false se prefers-reduced-motion

applyConfig(config);
initHeader();
initFaq();
initForm(config);
initAnchors();

if (motion) {
  splitHeadings();
  const ready = initPreloader();
  import('./js/motion.js')
    .then((m) => m.initMotion({ ready }))
    .catch((err) => {
      // Se o movimento falhar por qualquer motivo, a página inteira aparece sem animação.
      console.error('[KZN] movimento indisponível:', err);
      root.classList.add('failsafe');
      root.classList.remove('is-loading');
    });
}
