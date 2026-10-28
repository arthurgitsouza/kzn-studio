// Formulário de qualificação → abre o WhatsApp com a mensagem pronta (sem backend).
import { waUrl, trackLead } from './contact.js';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const UNSURE = 'Ainda não sei exatamente';

function maskPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// Mensagem do WhatsApp: *negrito* nos rótulos e uma lista com marcadores para o que a pessoa procura.
export function buildMessage(data) {
  const params = new URLSearchParams(location.search);
  const utm = UTM_KEYS.filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`);
  const procura = Array.isArray(data.procura) ? data.procura : [data.procura].filter(Boolean);
  const lines = [
    'Olá, KZN! Vim pelo site e quero conversar sobre o momento da minha empresa.',
    '',
    `*Nome:* ${data.nome}`,
    `*Empresa:* ${data.empresa}`,
    `*WhatsApp:* ${data.whatsapp}`,
    `*Instagram/site:* ${data.perfil || 'não informado'}`,
    '',
    '*O que quero melhorar primeiro:*',
    ...procura.map((item) => `• ${item}`),
    '',
    `*Faturamento médio mensal:* ${data.faturamento}`,
  ];
  if (utm.length) lines.push('', `_Origem: ${utm.join(', ')}_`);
  return lines.join('\n');
}

export function initForm(config) {
  const form = document.getElementById('lead-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const phone = form.elements.whatsapp;
  const needs = [...form.querySelectorAll('input[name="procura"]')];

  phone.addEventListener('input', () => {
    phone.value = maskPhone(phone.value);
  });

  // "Ainda não sei exatamente" não combina com as outras opções: marcar uma desmarca a outra.
  form.addEventListener('change', (e) => {
    if (e.target.name !== 'procura' || !e.target.checked) return;
    if (e.target.value === UNSURE) needs.filter((n) => n !== e.target).forEach((n) => (n.checked = false));
    else needs.filter((n) => n.value === UNSURE).forEach((n) => (n.checked = false));
  });

  const fieldOf = (el) => el.closest('.field');
  const errEl = (id) => document.getElementById(id);

  const setError = (field, errId, msg) => {
    const err = errEl(errId);
    field.classList.toggle('has-error', !!msg);
    field.querySelector('input, select')?.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) {
      err.textContent = msg || '';
      err.hidden = !msg;
    }
    return !msg;
  };

  const checks = {
    nome: () => {
      const v = form.elements.nome.value.trim();
      return setError(fieldOf(form.elements.nome), 'e-nome', v.length < 2 ? 'Informe seu nome.' : '');
    },
    empresa: () => {
      const v = form.elements.empresa.value.trim();
      return setError(fieldOf(form.elements.empresa), 'e-empresa', v.length < 2 ? 'Informe o nome da empresa.' : '');
    },
    whatsapp: () => {
      const d = phone.value.replace(/\D/g, '');
      return setError(fieldOf(phone), 'e-whats', d.length < 10 ? 'Informe um WhatsApp com DDD.' : '');
    },
    procura: () => {
      const ok = needs.some((n) => n.checked);
      return setError(fieldOf(needs[0]), 'e-procura', ok ? '' : 'Marque pelo menos uma opção.');
    },
    faturamento: () => {
      const ok = !!form.elements.faturamento.value;
      return setError(fieldOf(form.elements.faturamento), 'e-fat', ok ? '' : 'Escolha uma faixa de faturamento.');
    },
  };
  const STEP_CHECKS = { 1: ['nome', 'empresa', 'whatsapp'], 2: ['procura', 'faturamento'] };

  /* ── duas etapas: 1) sobre você, 2) sobre o momento ── */
  const steps = [...form.querySelectorAll('.form__step')];
  const bars = [...form.querySelectorAll('.form__bar')];
  const stepName = document.getElementById('step-name');
  const NAMES = { 1: 'Etapa 1 de 2 · Sobre você', 2: 'Etapa 2 de 2 · Sobre o momento' };
  let current = 1;
  const goTo = (n, { focus = true } = {}) => {
    current = n;
    steps.forEach((el) => (el.hidden = Number(el.dataset.step) !== n));
    bars.forEach((el, i) => el.classList.toggle('is-on', i < n));
    if (stepName) stepName.textContent = NAMES[n];
    if (focus) {
      const first = steps[n - 1].querySelector('input:not([type="checkbox"]), select, input');
      first?.focus({ preventScroll: true });
      const r = form.getBoundingClientRect();
      if (r.top < 80 || r.bottom > innerHeight) form.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };
  const validate = (n) => STEP_CHECKS[n].map((k) => checks[k]()).every(Boolean);
  form.querySelector('[data-next]')?.addEventListener('click', () => validate(1) && goTo(2));
  form.querySelector('[data-back]')?.addEventListener('click', () => goTo(1));

  // Campo que já está com erro revalida sozinho enquanto o usuário corrige
  const revalidate = (e) => {
    const name = e.target.name;
    if (checks[name] && fieldOf(e.target)?.classList.contains('has-error')) checks[name]();
  };
  form.addEventListener('input', revalidate);
  form.addEventListener('change', revalidate);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Enter na etapa 1 avança em vez de enviar
    if (current === 1) {
      if (validate(1)) goTo(2);
      return;
    }
    const ok = validate(1) && validate(2);
    if (!ok) {
      if (!validate(1)) goTo(1, { focus: false });
      const bad = form.querySelector('.has-error');
      (bad.querySelector('input, select') || bad).focus?.({ preventScroll: true });
      bad.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.procura = fd.getAll('procura');
    const url = waUrl(config, buildMessage(data));

    trackLead();
    const win = window.open(url, '_blank', 'noopener');
    status.hidden = false;
    status.innerHTML = win
      ? 'Abrindo o WhatsApp com as informações do seu negócio… '
      : 'Quase lá! ';
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'Se não abrir, toque aqui para continuar no WhatsApp.';
    status.append(a);
  });
}
