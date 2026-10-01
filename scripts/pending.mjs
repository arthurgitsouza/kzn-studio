// Lista tudo que ainda é placeholder antes de publicar.
// Roda automaticamente ao final de `npm run build` (ou: npm run pending).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config } from '../src/config.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

const items = [];
const add = (what, where) => items.push({ what, where });

if (/^5598?0+$/.test(config.whatsapp.number.replace(/\D/g, ''))) add('WhatsApp é o número de exemplo', 'src/config.js → whatsapp.number');
if (!config.instagram) add('Instagram não informado (link do rodapé leva ao formulário)', 'src/config.js → instagram');
if (!config.email) add('E-mail não informado', 'src/config.js → email');
if (!config.portfolio) add('Link do portfólio não informado', 'src/config.js → portfolio');
if (/\.example/.test(config.siteUrl)) add('Domínio final (canonical, Open Graph, JSON-LD)', 'src/config.js → siteUrl');
if (!config.tracking.gtmId && !config.tracking.ga4Id && !config.tracking.metaPixelId) add('Nenhum ID de rastreamento (GTM/GA4/Pixel)', 'src/config.js → tracking');
if (!config.teamPhotosReady) add('Fotos em alta definição dos responsáveis por cada serviço (opcional; os cards funcionam sem foto)', 'index.html (.svc) + teamPhotosReady: true');

[...html.matchAll(/data-pending="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((v, i, a) => a.indexOf(v) === i && !/^Foto do respons/.test(v))
  .forEach((v) => add(v, 'index.html'));

console.log('\n┌─ PENDÊNCIAS ANTES DE PUBLICAR ' + '─'.repeat(30));
if (!items.length) console.log('│ Nada pendente.');
items.forEach((i, n) => console.log(`│ ${String(n + 1).padStart(2)}. ${i.what}\n│     → ${i.where}`));
if (config.showPlaceholders && items.some((i) => i.where === 'index.html')) {
  console.log('│\n│ showPlaceholders está TRUE: blocos de exemplo aparecem marcados.\n│ Sem material real, ponha showPlaceholders: false para escondê-los.');
}
console.log('└' + '─'.repeat(60) + '\n');
