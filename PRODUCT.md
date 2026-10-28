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
Conteúdo vem do PDF do cliente "Landing Page de Conversão Kzn Studio" e, desde 28/10/2026, do documento de ajustes **"ANÁLISE LP KZN STUDIO.pdf"** (que manda no que for diferente): hero, prova imediata, autoridade, dor, solução KZN, serviços, case, processo, clientes, formulário em 2 etapas, FAQ. Contatos e rastreamento vivem em `src/config.js`. O desenvolvedor (Jarth) entrega o site ao cliente e o material real chega depois.

## Capabilities and Constraints
- Sem backend: o formulário valida no cliente e abre `wa.me` com a mensagem pronta (+ UTMs).
- Serviços: Planejamento estratégico, Tráfego pago, Design & Criativos, Landing Pages & Sites. Cada card mostra o membro do time responsável recortado sobre uma luz vermelha, com os ícones das ferramentas ao lado (fotos e ícones enviados pelo cliente em 16/10/2026).
- Só uma foto recebida: a da capa do cliente (equipe em volta da mesa de planejamento, `10.webp`/`21.webp`, 1920x1080, com grão no arquivo). Ela entra no hero **exatamente como o cliente enviou** (byte a byte, sem redução de ruído nem nitidez): uma versão tratada foi testada em 01/10/2026 e o cliente achou a qualidade baixa. O 1280 é só uma redução em qualidade 94. Para o resto do site não há foto.
- Placeholders marcados "Exemplo" para: números do case, logos de clientes, depoimentos, fotos da equipe. Nada disso pode ser inventado.
- WhatsApp, Instagram, e-mail, portfólio, domínio e IDs de rastreamento ainda não foram informados.
- Mobile-first, sem rolagem horizontal em 390, 820, 1440 e 1920 px; respeitar `prefers-reduced-motion`.
- Sem símbolos japoneses em lugar nenhum (decisão do usuário).

## Estrutura e copy da página (decisão do cliente, 28/10/2026: "ANÁLISE LP KZN STUDIO.pdf")
Fluxo: Hero → Prova imediata → "Não fazemos peças soltas. Construímos uma operação." → Dor/problema → Solução KZN → Serviços → Case → Processo → Clientes/depoimentos → Formulário → FAQ. Objetivo da página (tráfego pago): uma decisão só, entender a oferta ou falar com o KZN, por isso poucas rotas de fuga.
- **Hero:** "Marketing que conecta estratégia, tráfego e criação para sua empresa vender melhor." / "Unimos planejamento, mídia, design e páginas de conversão em uma operação única para transformar investimento em marketing em crescimento." / botões "Quero uma análise do meu marketing" e "Ver nossos resultados ↓" (leva ao case). Fundo um pouco mais escuro; **o cliente vai mandar uma nova imagem da capa**.
- **Menu:** Resultados (case) | Como trabalhamos (processo) | Serviços | Entre em contato (formulário). Sem submenus.
- **Prova imediata:** título, subtítulo, 4 indicadores (leads, R$ em mídia, projetos, marcas) e fechamento. Os números reais ainda não chegaram: aparecem como exemplo.
- **Autoridade:** igual, sem o link "Conheça nossa forma de trabalhar".
- **Dor / Solução / Processo:** textos exatos do PDF (ver `index.html`).
- **Serviços:** headline "As frentes que fazem a operação acontecer."; cards com os membros.
- **Case:** layout com peças da campanha e vídeo de explicação (arte e vídeo ainda a enviar) + números oficiais: +200 mil impressões, +130 mil visualizações na campanha, +3,7 mil visitas ao perfil, +820 interações.
- **Removidas:** as seções Estratégia + aquisição, Criatividade + conversão e o antigo "Como trabalhamos" (4 verbos).
- **Formulário:** 2 etapas (sobre você / sobre o momento), sem pergunta de investimento, sem cartões de WhatsApp/Instagram/e-mail ao lado (sem CTA duplo).
- **FAQ:** mantido exatamente como estava (a 3ª pergunta ainda cita "faturamento e investimento", mas o formulário não pergunta mais investimento: avisar o cliente).

## Brand Commitments
- Logos do kit: Extended (KZN + MARKETING STUDIO, branca), blocos Tag, em `public/brand/`. O logo anima no desktop: recolhido mostra KZN e abre completo ao passar o mouse.
- Paleta: preto e vermelho (#e4111d). Fundo majoritariamente preto (decisão do usuário e do cliente em 01/10/2026), alternando dois tons de preto; branco só no cartão do formulário.
- **Tipografia: Poppins**, única família (a fonte que o cliente usou na capa dele).
- **Direção visual (decisão do usuário, 01/10/2026):** design **minimalista, limpo e sólido**, no estilo da Nouhau (barra de menu em pílula com efeito vidro e botão sem setas, títulos discretos, cards limpos) e do site que já fizemos para o Exclusive Car (`C:\dev\exclusive-car`: preto + branco + vermelho, tipografia grande, botões vermelhos em pílula com seta). Botões bonitos e bem acabados.
- **Proibido:** grão/ruído criado por nós, design pesado. Vidro só na barra do menu e no menu do celular (pedido do cliente). Brilho borrado só como os **borrões vermelhos** descritos abaixo. A foto da capa leva só um escurecimento leve de CSS (26%, pedido do cliente em 28/10/2026).
- **Borrões vermelhos (pedido do cliente, 04/10/2026):** as seções pretas levam borrões vermelhos dispersos nos cantos, no mesmo vermelho do brilho da capa e no estilo dos borrões azuis/lilases da Tinkar. Estáticos, atrás do conteúdo. É exceção deliberada à regra "sem brilho borrado".
- **Ordem das seções (cliente, 04/10/2026):** o FAQ vem depois do contato, no fim da página.
- **Animação (cliente, 04/10/2026):** toda seção refaz suas animações a cada visita, descendo ou subindo. Na 2ª seção, 1 s depois de o bloco Atrair/Comunicar/Converter aparecer na tela (o cliente achou 2 s demorado), Atrair, Comunicar e Converter ficam vermelhos um por vez e depois o link "Conheça nossa forma de trabalhar" fica vermelho por um instante; tudo volta ao branco.
- **Toque no celular:** sem o retângulo azul do navegador ao tocar em botões e links.
- **A foto da capa do cliente deve aparecer no hero** (decisão do usuário em 01/10/2026, depois de uma versão sem foto). O restante do layout não segue o design da capa dele: segue o estilo limpo da Nouhau e do Exclusive Car.
- **Cards de serviço (decisão do cliente, 16/10/2026):** o layout é o design que ele mesmo fez: título e seta em cima, o membro recortado (PNG com fundo transparente) sobre uma **luz vermelha**, ícones das ferramentas em grade ao lado e um painel escuro com o texto embaixo. Planejamento = Kauã, Tráfego = Rian, Design & Criativos = Flaesio + Paulinho, Landing Pages = Arthur. Isso substitui a regra antiga "sem pessoa por card" (que era sobre um desenho ilustrado, rejeitado em 01/10).

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
