// Gera src/assets/icons.svg (injetado inline no HTML pelo vite.config.js) (sprite) a partir dos ícones Phosphor (peso "regular", uma só família).
// Rode `npm run icons` depois de mudar a lista abaixo.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'node_modules/@phosphor-icons/core/assets/regular');
const dirBold = join(root, 'node_modules/@phosphor-icons/core/assets/bold');
// Só estes dois vêm em peso bold: a seta do botão da capa e as setas do menu (como na referência do cliente)
const bold = ['arrow-right', 'caret-down'];

const icons = [
  'arrow-right',
  'arrow-down',
  'arrow-up-right',
  'caret-down',
  'plus',
  'check-circle',
  'whatsapp-logo',
  'instagram-logo',
  'envelope-simple',
  'folder-simple',
  'map-pin',
  'quotes',
  'megaphone-simple',
  'compass',
  'chart-bar',
  'target',
  'calendar-blank',
  'eye',
  'image',
  'device-mobile',
  'browser',
  'globe-simple',
  'pen-nib',
];

const symbols = icons.map((name) => {
  const svg = readFileSync(join(dir, `${name}.svg`), 'utf8');
  const viewBox = /viewBox="([^"]+)"/.exec(svg)[1];
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  return `<symbol id="i-${name}" viewBox="${viewBox}">${inner}</symbol>`;
});

const boldSymbols = bold.map((name) => {
  const svg = readFileSync(join(dirBold, `${name}-bold.svg`), 'utf8');
  const viewBox = /viewBox="([^"]+)"/.exec(svg)[1];
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  return `<symbol id="i-${name}-bold" viewBox="${viewBox}">${inner}</symbol>`;
});
symbols.push(...boldSymbols);

const out = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols.join('\n')}\n</svg>\n`;
writeFileSync(join(root, 'src/assets/icons.svg'), out);
console.log(`icons.svg: ${icons.length} ícones Phosphor (regular)`);
