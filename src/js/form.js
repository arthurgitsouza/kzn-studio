// Formulário de qualificação → abre o WhatsApp com a mensagem pronta (sem backend).
import { waUrl, trackLead } from './contact.js';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function maskPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function buildMessage(data) {
  const params = new URLSearchParams(location.search);
  const utm = UTM_KEYS.filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)}`);
  const lines = [
    'Olá, KZN! Vim pelo site e quero conversar sobre o momento da minha empresa.',
    '',
    `*Nome:* ${data.nome}`,
    `*Empresa:* ${data.empresa}`,
    `*WhatsApp:* ${data.whatsapp}`,
    `*Instagram/site:* ${data.perfil || 'não informado'}`,
    `*Procuro:* ${data.procura}`,
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

  phone.addEventListener('input', () => {
    phone.value = maskPhone(phone.value);
  });

  const fieldOf = (el) => el.closest('.field');
  const errEl = (id) => document.getElementById(id);

  const setError = (field, errId, msg) => {
    const err = errEl(errId);
    field.classList.toggle('has-error', !!msg);
    field.querySelector('input')?.setAttribute('aria-invalid', msg ? 'true' : 'false');
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
      const ok = !!form.elements.procura.value;
      return setError(fieldOf(form.elements.procura[0]), 'e-procura', ok ? '' : 'Escolha uma opção.');
    },
    faturamento: () => {
      const ok = !!form.elements.faturamento.value;
      return setError(fieldOf(form.elements.faturamento[0]), 'e-fat', ok ? '' : 'Escolha uma faixa de faturamento.');
    },
    investimento: () => {
      const ok = !!form.elements.investimento.value;
      return setError(fieldOf(form.elements.investimento[0]), 'e-inv', ok ? '' : 'Escolha uma faixa de investimento.');
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
      (bad.querySelector('input') || bad).focus?.();
      bad.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
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
