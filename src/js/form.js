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
    '*O que procuro:*',
    ...procura.map((item) => `• ${item}`),
    '',
    `*Faturamento médio mensal:* ${data.faturamento}`,
    `*Investimento mensal em marketing:* ${data.investimento}`,
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
    investimento: () => {
      const ok = !!form.elements.investimento.value;
      return setError(fieldOf(form.elements.investimento), 'e-inv', ok ? '' : 'Escolha uma faixa de investimento.');
    },
  };

  // Campo que já está com erro revalida sozinho enquanto o usuário corrige
  const revalidate = (e) => {
    const name = e.target.name;
    if (checks[name] && fieldOf(e.target)?.classList.contains('has-error')) checks[name]();
  };
  form.addEventListener('input', revalidate);
  form.addEventListener('change', revalidate);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const results = Object.values(checks).map((c) => c());
    if (results.includes(false)) {
      const bad = form.querySelector('.has-error');
      (bad.querySelector('input, select') || bad).focus?.();
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
