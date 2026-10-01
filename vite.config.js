import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { config } from './src/config.js';

// Injeta o sprite de ícones Phosphor (src/assets/icons.svg) inline: sem requisição extra.
const injectIcons = () => ({
  name: 'kzn-inject-icons',
  transformIndexHtml(html) {
    return html.replace('<!--ICONS-->', readFileSync(new URL('./src/assets/icons.svg', import.meta.url), 'utf8'));
  },
});

// Troca %TOKENS% do index.html por valores do src/config.js (uma única fonte de verdade).
const injectConfig = () => ({
  name: 'kzn-inject-config',
  transformIndexHtml(html) {
    return html
      .replaceAll('%SITE_URL%', config.siteUrl.replace(/\/$/, ''))
      .replaceAll('%SITE_NAME%', config.siteName)
      .replaceAll('%CITY%', config.city);
  },
});

// Pré-carrega as fontes latinas (as usadas no texto em português) para a troca de fonte
// não empurrar o layout do hero (CLS). Só no build: o bundle conhece os nomes com hash.
const preloadFonts = () => ({
  name: 'kzn-preload-fonts',
  transformIndexHtml: {
    order: 'post',
    handler(_html, ctx) {
      if (!ctx.bundle) return [];
      return Object.keys(ctx.bundle)
        .filter((f) => /poppins-latin-(400|600|700)-normal.*\.woff2$/.test(f))
        .map((f) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `./${f}` },
          injectTo: 'head-prepend',
        }));
    },
  },
});

export default defineConfig({
  base: './', // caminhos relativos: funciona em qualquer subpasta / Cloudflare Pages
  plugins: [injectIcons(), injectConfig(), preloadFonts()],
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    assetsInlineLimit: 0,
  },
  server: { host: true, port: 5175 },
});
