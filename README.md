# KZN Marketing Studio: landing page de conversão (versão "Limpo")

Design minimalista e sólido: fundo quase todo preto (dois tons), com um vermelho e branco só onde importa. Sem grão, sem vidro, sem brilho borrado. Única fonte: **Poppins**. Referências de estilo: Nouhau e o site do Exclusive Car. Vite + JavaScript puro + GSAP/ScrollTrigger + Lenis. Sem framework, sem backend.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5175
npm run build      # gera ./dist e lista as pendências antes de publicar
npm run preview    # serve o ./dist para conferir a versão de produção
npm run icons      # regenera o sprite de ícones (src/assets/icons.svg) a partir do Phosphor
```

## Onde trocar cada coisa

| O quê | Onde |
|---|---|
| WhatsApp, Instagram, e-mail, portfólio, domínio, GTM/GA4/Pixel | `src/config.js` (único lugar; o HTML usa `data-wa`, `data-ig`, `data-mail`, `data-portfolio`) |
| Textos, FAQ, passos do método | `index.html` (seção por seção, comentada) |
| Números do case | `index.html` → `.metric__val` (`XX mil+`). Para contagem animada use `data-count="120" data-suffix=" mil+"` |
| Logos de clientes e depoimentos | `index.html` → `.logos` e `.quotes` (hoje são blocos de exemplo marcados) |
| Canais do contato (WhatsApp, Instagram, e-mail) | `src/config.js`: o cartão do canal sem link configurado some sozinho |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` (cada seção escolhe `on-dark`, `on-light` ou `on-gray`; `section--alt` troca para o segundo tom de preto. Para testar uma seção clara, troque `on-dark` por `on-light`) |
| Logos | `public/brand/` |
| Imagem de compartilhamento (WhatsApp/LinkedIn) | `public/og.jpg` (1200×630) |

**Fotos:** a foto da capa do cliente fica em `public/hero/` (3 tamanhos, já com redução de ruído; o arquivo original dele tem grão, então **peça o original em alta definição** para trocar: basta sobrescrever `cover-1920.webp`, `cover-1280.webp` e `cover-800.webp`). O resto do site funciona sem fotos. Cada card de serviço é vertical **9:16** (o tamanho do vídeo do Exclusive Car: até ~380 px de largura, ~667 px de altura em monitor grande) e já tem espaço para uma foto HD em **retrato 1080×1920**: coloque `<img class="svc__photo" src="..." alt="..." />` dentro do `<a class="svc">` e a foto cobre o card inteiro (um véu escuro garante a leitura do título e do texto). Sem foto, o card mostra o ícone do serviço. Depois marque `teamPhotosReady: true` em `src/config.js`.

**Blocos de exemplo:** logos, depoimentos e números do case aparecem com a etiqueta "Exemplo" enquanto `showPlaceholders: true`. Sem material real na hora de publicar, ponha `showPlaceholders: false` e eles somem.

**Formulário:** valida e abre o WhatsApp com a mensagem pronta (nome, empresa, WhatsApp, Instagram/site, o que procura, faturamento, investimento e UTMs da URL). Não há backend; se quiser guardar os leads em planilha/CRM, o ponto de ligação é `src/js/form.js`.

## Publicar no Cloudflare Pages

1. Suba a pasta para um repositório Git (ou use o upload direto do `dist`).
2. Cloudflare Pages → *Create project* → conecte o repositório.
3. **Build command:** `npm run build` · **Build output directory:** `dist`
4. Antes do primeiro deploy: ajuste `siteUrl` e o WhatsApp em `src/config.js`.

Os caminhos são relativos (`base: './'`), então funciona em domínio próprio ou subpasta. `public/_headers` já define cache e cabeçalhos básicos.

## Como a animação está montada

- **Lenis** dá o scroll suave e é movido pelo ticker do **GSAP**, que também alimenta o ScrollTrigger.
- Títulos entram por palavra com máscara; o CSS tem uma **rede de segurança**: se o JS falhar ou demorar mais de 6,5 s, tudo aparece sem animação.
- Preloader com tempo **mínimo 1,15 s** e **máximo 2,8 s**: nunca trava a página.
- Só `transform` e `opacity` são animados; efeitos de mouse (botões magnéticos) só em `hover: hover`.
- `prefers-reduced-motion`: sem Lenis, sem GSAP, sem preloader, tudo visível de imediato (o módulo de movimento nem é baixado).
- O logo do menu mostra só **KZN** (também no celular) e, no desktop com mouse, abre completo ("MARKETING STUDIO") ao passar o mouse; abre sozinho uma vez ao entrar.
- A **capa é tela cheia e fica presa no topo** (`position: sticky`): a segunda seção sobe por cima dela. O efeito é conduzido pelo scroll em `heroCurtain()` (`src/js/motion.js`). O botão "Saiba mais" usa `data-offset="0"` para encostar a segunda tela no topo.

## Estrutura

```
index.html            conteúdo e marcação semântica
src/config.js         contatos, rastreamento, flags
src/main.js           ponto de entrada
src/styles/           tokens.css → components.css → sections.css (camadas @layer)
src/js/               header, faq, form, anchors, preloader, split, contact, motion (GSAP+Lenis)
src/assets/icons.svg  sprite de ícones Phosphor (regular), injetado inline no build
scripts/pending.mjs   lista de pendências (roda no fim do npm run build)
public/               logos, favicon, og.jpg, _headers, robots.txt
```
