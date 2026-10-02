# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Vite + JavaScript puro (ES modules) + GSAP/ScrollTrigger + Lenis, deploy em Cloudflare Pages com caminhos relativos. Definido pelo `PROMPT-MODELO.md` do estúdio e já implementado; não há reescrita para framework.

## Users
Donos e gestores de empresas de São Luís (MA) e região que precisam de marketing que gere contato e venda, de pequenas a médias (a faixa de faturamento do formulário vai de "até R$ 30 mil" a "acima de R$ 1 milhão por mês"). Chegam por Instagram, indicação ou anúncio, no celular na maioria das vezes, decidindo em segundos se o KZN parece sério e se vale preencher o formulário.

## Product Purpose
Landing page de conversão do **KZN Marketing Studio**. Leva o visitante ao formulário de qualificação (nome, empresa, WhatsApp, o que procura, faturamento, investimento), que abre uma conversa no WhatsApp. Sucesso = lead qualificado, não visita.

## Positioning
Operação de marketing integrada: planejamento estratégico, tráfego pago (Meta Ads), design e criativos, landing pages e sites trabalhando como uma coisa só, em vez de peças soltas de fornecedores diferentes. A equipe analisa cada projeto antes de aceitar uma parceria.

## Operating Context
Conteúdo vem do PDF do cliente "Landing Page de Conversão Kzn Studio" (hero, subhero, serviços, estratégia + aquisição, criatividade + conversão, case KZN, prova social, formulário, rodapé). Contatos e rastreamento vivem em `src/config.js`. O desenvolvedor (Jarth) entrega o site ao cliente e o material real chega depois.

## Capabilities and Constraints
- Sem backend: o formulário valida no cliente e abre `wa.me` com a mensagem pronta (+ UTMs).
- Serviços: Planejamento estratégico, Tráfego pago, Design & Criativos, Landing Pages & Sites. Cada card terá a foto da pessoa responsável (a enviar).
- Só uma foto recebida: a da capa do cliente (equipe em volta da mesa de planejamento, `10.webp`/`21.webp`, 1920x1080, com grão no arquivo). Ela entra no hero **exatamente como o cliente enviou** (byte a byte, sem redução de ruído nem nitidez): uma versão tratada foi testada em 01/10/2026 e o cliente achou a qualidade baixa. O 1280 é só uma redução em qualidade 94. Para o resto do site não há foto.
- Placeholders marcados "Exemplo" para: números do case, logos de clientes, depoimentos, fotos da equipe. Nada disso pode ser inventado.
- WhatsApp, Instagram, e-mail, portfólio, domínio e IDs de rastreamento ainda não foram informados.
- Mobile-first, sem rolagem horizontal em 390, 820, 1440 e 1920 px; respeitar `prefers-reduced-motion`.
- Sem símbolos japoneses em lugar nenhum (decisão do usuário).

## Brand Commitments
- Logos do kit: Extended (KZN + MARKETING STUDIO, branca), blocos Tag, em `public/brand/`. O logo anima no desktop: recolhido mostra KZN e abre completo ao passar o mouse.
- Paleta: preto e vermelho (#e4111d). Fundo majoritariamente preto (decisão do usuário e do cliente em 01/10/2026), alternando dois tons de preto; branco só no cartão do formulário.
- **Tipografia: Poppins**, única família (a fonte que o cliente usou na capa dele).
- **Direção visual (decisão do usuário, 01/10/2026):** design **minimalista, limpo e sólido**, no estilo da Nouhau (barra de menu em pílula com efeito vidro, 3 menus suspensos e botão sem setas, títulos discretos, cards limpos) e do site que já fizemos para o Exclusive Car (`C:\dev\exclusive-car`: preto + branco + vermelho, tipografia grande, botões vermelhos em pílula com seta). Botões bonitos e bem acabados.
- **Proibido:** grão/ruído criado por nós, brilhos borrados, design pesado. Vidro só na barra do menu e nos menus suspensos (pedido do cliente). A foto da capa não leva filtro nenhum por cima.
- **A foto da capa do cliente deve aparecer no hero** (decisão do usuário em 01/10/2026, depois de uma versão sem foto). O restante do layout não segue o design da capa dele: segue o estilo limpo da Nouhau e do Exclusive Car.
- Os cards de serviço **não** mostram uma pessoa por card (desenho rejeitado pelo usuário). Fotos reais, quando existirem, entram como opção do card.

- O case mantém o desenho que o cliente preferiu: fundo preto, duas etiquetas do logo inclinadas (branca e preta) e uma barra com 4 métricas (hoje exemplos marcados).

## Evidence on Hand
- PDF do cliente com todos os textos; kit de marca; referências de estilo: Nouhau (nouhau.pro) e o site do Exclusive Car. A capa enviada pelo cliente é só referência de texto.
- Ausentes e proibidos de inventar: clientes, depoimentos, números do case, nome das pessoas dos cards, endereço, contatos reais.

## Product Principles
1. Limpo antes de impressionante: tipografia, espaço e um vermelho só; nada pesado ou granulado.
2. Prova antes de promessa: onde não há dado real, mostrar o espaço marcado, nunca um número inventado.
3. Uma operação, não peças soltas: as seções devem parecer partes de uma mesma campanha.
4. O caminho até o formulário é curto e sempre visível.
5. Honestidade de copy: nada de prazo milagroso ou resultado garantido.

## Accessibility & Inclusion
Contraste WCAG AA, navegação completa por teclado (menu, FAQ, carrossel de serviços, formulário), foco visível, skip-link, `prefers-reduced-motion` respeitado.
