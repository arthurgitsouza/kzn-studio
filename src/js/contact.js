// Liga contatos e rastreamento a partir de src/config.js.
// O HTML nunca tem número/@/e-mail: só data-wa, data-ig, data-mail, data-portfolio.

export function waUrl(config, text) {
  const n = String(config.whatsapp.number).replace(/\D/g, '');
  const msg = encodeURIComponent(text ?? config.whatsapp.message);
  return `https://wa.me/${n}?text=${msg}`;
}

function setLink(el, href) {
  if (href) {
    el.setAttribute('href', href);
    return true;
  }
  // Não configurado: não deixa link quebrado — leva ao formulário.
  el.setAttribute('href', '#contato');
  el.removeAttribute('target');
  el.removeAttribute('rel');
  el.dataset.unset = 'true';
  const quick = el.closest('.channels li');
  if (quick) quick.hidden = true;
  return false;
}

export function applyConfig(config) {
  document.body.classList.toggle('show-ph', !!config.showPlaceholders);

  document.querySelectorAll('[data-wa]').forEach((a) => setLink(a, waUrl(config, a.dataset.waText)));
  document.querySelectorAll('[data-ig]').forEach((a) => setLink(a, config.instagram));
  document.querySelectorAll('[data-mail]').forEach((a) => setLink(a, config.email ? `mailto:${config.email}` : ''));
  document.querySelectorAll('[data-portfolio]').forEach((a) => setLink(a, config.portfolio));
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

  injectTracking(config.tracking || {});

  if (import.meta.env?.DEV && /^5598?0+$/.test(String(config.whatsapp.number))) {
    console.info('[KZN] WhatsApp ainda é o número de exemplo — troque em src/config.js');
  }
}

function injectTracking({ gtmId, ga4Id, metaPixelId }) {
  const add = (src) => {
    const s = document.createElement('script');
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  };
  window.dataLayer = window.dataLayer || [];

  if (gtmId) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    add(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
  }
  if (ga4Id) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga4Id);
    add(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`);
  }
  if (metaPixelId) {
    const f = window;
    if (!f.fbq) {
      const n = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      add('https://connect.facebook.net/en_US/fbevents.js');
    }
    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');
  }
}

export function trackLead() {
  try {
    window.dataLayer?.push({ event: 'generate_lead', form: 'kzn-lead' });
    window.gtag?.('event', 'generate_lead');
    window.fbq?.('track', 'Lead');
  } catch {
    /* rastreamento nunca pode quebrar o envio */
  }
}
