// ─────────────────────────────────────────────────────────────
// KZN Studio — configuração central.
// Contatos, rastreamento e flags vivem aqui. Nunca espalhe número
// de WhatsApp, @ ou e-mail pelo HTML: use data-wa / data-ig / data-mail.
// Este arquivo é ESM puro (sem window) para o Node também conseguir ler.
// ─────────────────────────────────────────────────────────────
export const config = {
  siteName: 'KZN Marketing Studio',
  siteUrl: 'https://kznstudio.example', // PENDENTE: domínio final (usado em OG/canonical)
  city: 'São Luís, MA',

  whatsapp: {
    number: '5598000000000', // PENDENTE: DDI + DDD + número, só dígitos (ex.: 5598912345678)
    message: 'Olá! Vim pelo site da KZN Studio e quero estruturar meu marketing.',
  },
  instagram: '', // PENDENTE: URL completa, ex.: https://instagram.com/seuperfil
  email: '', //     PENDENTE: ex.: contato@kznstudio.com.br
  portfolio: '', // PENDENTE: link do portfólio (Behance, Drive, site…)
  address: '', //   opcional
  mapsUrl: '', //   opcional

  // Rastreamento — deixe vazio para não carregar nada.
  tracking: {
    gtmId: '', //       GTM-XXXXXXX
    ga4Id: '', //       G-XXXXXXXXXX
    metaPixelId: '', // 1234567890
  },

  // true  = mostra blocos de exemplo marcados (logos, depoimentos, números do case).
  // false = esconde tudo que ainda é placeholder (use quando for publicar sem esse material).
  showPlaceholders: true,

  // Fotos HD dos responsáveis (opcional): ponha <img class="svc__photo"> dentro do card e marque true (só afeta o aviso do build).
  teamPhotosReady: false,
};
