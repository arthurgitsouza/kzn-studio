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

  // Vídeo de explicação do case (Sessão 7). Coloque o arquivo em public/case/ e o caminho aqui, ex.: '/case/explicacao.mp4'.
  // Vazio = o tile mostra o aviso "Exemplo" e a pendência aparece na lista do build.
  caseVideo: '',

  // Fotos dos membros nos cards de serviço: entregues pelo cliente em 16/10/2026 (public/team e public/tools).
  // As fotos são pequenas (290–370 px de largura; só a do Rian é grande). Quando chegarem os originais em tamanho maior,
  // sobrescreva os arquivos de public/team (WebP com fundo transparente) e marque true (só afeta o aviso do build).
  teamPhotosHiRes: false,
};
