# KZN Marketing Studio: landing page de conversão (versão "Limpo")

Design minimalista e sólido: fundo quase todo preto (dois tons), com um vermelho e branco só onde importa. Sem grão, sem brilho borrado; vidro só na barra do menu. Única fonte: **Poppins**. Referências de estilo: Nouhau e o site do Exclusive Car. Vite + JavaScript puro + GSAP/ScrollTrigger + Lenis. Sem framework, sem backend.

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
| Textos, FAQ, etapas da solução e do processo | `index.html` (seção por seção, comentada) |
| Números do case | `index.html` → `.metric__val` (`XX mil+`). Para contagem animada use `data-count="120" data-suffix=" mil+"` |
| Logos de clientes e depoimentos | `index.html` → `.logos` e `.quotes` (hoje são blocos de exemplo marcados) |
| Canais do contato (WhatsApp, Instagram, e-mail) | `src/config.js`: o cartão do canal sem link configurado some sozinho |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` (cada seção escolhe `on-dark`, `on-light` ou `on-gray`; `section--alt` troca para o segundo tom de preto. Para testar uma seção clara, troque `on-dark` por `on-light`) |
| Logos | `public/brand/` |
| Imagem de compartilhamento (WhatsApp/LinkedIn) | `public/og.jpg` (1200×630) |

**Fotos:** a foto da capa do cliente fica em `public/hero/` (o arquivo original é `cover-1920.webp`; o de 1280 px é uma redução). Os **cards de serviço** usam as fotos recortadas dos membros em `public/team/` (WebP com fundo transparente: `kaua`, `rian`, `flaesio`, `paulinho`, `arthur`) e os ícones das ferramentas em `public/tools/` (PNG de 47 px do cliente). Para trocar uma foto, sobrescreva o arquivo com o mesmo nome (mantenha o fundo transparente e o corte na cintura). **No celular** (tela até 639 px) o card fica mais alto que 9:16 para o palco ter a mesma proporção do desktop; se mudar um valor em px das variáveis de posição, repita o equivalente em `cqw` no bloco `@media (max-width: 639px)` logo abaixo (a conta está no comentário). No toque, a borda do texto gira no card que está na tela e a seta vira uma vez por visita (`svcLive()` em `src/js/motion.js`). **Para mexer na posição (x e y) e no tamanho dos membros e dos ícones**, edite o bloco comentado "POSIÇÃO DOS MEMBROS E DOS ÍCONES" em `src/styles/sections.css` (variáveis `--right`, `--bottom`, `--h`, e `--back-*`/`--front-*` no Design & Criativos). A luz vermelha atrás de cada membro é CSS (`.svc__stage::before` em `src/styles/sections.css`), não faz parte da foto. As fotos entregues são pequenas (290–370 px de largura; só a do Rian é grande): para telas de alta densidade vale pedir os originais em tamanho maior.

**Blocos de exemplo:** logos, depoimentos e números do case aparecem com a etiqueta "Exemplo" enquanto `showPlaceholders: true`. Sem material real na hora de publicar, ponha `showPlaceholders: false` e eles somem.

**Formulário:** compacto (nome, empresa, WhatsApp, Instagram/site, "O que você procura?" com **várias opções**, e duas listas suspensas para faturamento e investimento). Valida e abre o WhatsApp com a mensagem formatada: rótulos em negrito e uma lista com marcadores para o que a pessoa procura, mais as UTMs da URL. Não há backend; se quiser guardar os leads em planilha/CRM, o ponto de ligação é `src/js/form.js`.

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
- A **capa é tela cheia e fica presa no topo** (`position: sticky`): a segunda seção sobe por cima dela. O efeito é conduzido pelo scroll em `heroCurtain()` (`src/js/motion.js`). O botão "Ver nossos resultados" usa `data-offset="0"` para encostar o case no topo.
- **Toda animação de seção se refaz** a cada visita, descendo ou subindo (`reveals()` em `src/js/motion.js`). A sequência de cores da 2ª seção (Atrair → Comunicar → Converter → link) usa os tempos do objeto `SEQ` no topo desse arquivo: `delay` (espera, hoje 1 s depois que o bloco aparece na tela), `step` (tempo de cada palavra), `linkGap` e `linkHold`.
- **Borrões vermelhos** nas seções pretas: `.section::before` e `::after` em `src/styles/sections.css` (tamanho, posição e intensidade).
- **Menu do celular** (`.sheet` em `src/styles/components.css`, marcação em `index.html`, destaque da seção atual em `src/js/header.js`): vidro com desfoque forte, borrões vermelhos e 4 itens. Para trocar os itens, edite a lista `.sheet__nav` no `index.html`.
- **Sem o azul do toque no celular:** `-webkit-tap-highlight-color` transparente em `src/styles/tokens.css`.
- **Ordem da página** (documento "ANÁLISE LP KZN STUDIO", 28/10/2026): capa, prova imediata (`#prova`), autoridade (`#operacao`), dor (`#problema`), solução (`#solucao`), serviços, case, processo (`#processo`), clientes, formulário (`#contato`), FAQ.
- **Números do case:** em `index.html`, seção `#case` (`data-count`, `data-prefix`, `data-suffix`, `data-decimals`). Os da prova imediata (`#prova`) ainda são exemplo: troque o texto e apague a etiqueta `tag-ph` e o `data-pending` de cada um.
- **Peças e vídeo do case:** cada espaço da galeria tem um comentário no HTML com o `<img>` para colocar no lugar do tile de exemplo (arquivos em `public/case/`). O vídeo entra em `src/config.js` → `caseVideo: '/case/arquivo.mp4'` (o tile vira um player, só carrega no clique).
- **Formulário em 2 etapas:** `src/js/form.js` (`STEP_CHECKS` define os campos de cada etapa). Os valores das opções são os mesmos do `data-service` dos cards de serviço.

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
