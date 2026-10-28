---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief: landing de conversão KZN (index.html)

Scope: página única, modo Persuade. Visitante: dono ou gestor de empresa em São Luís (MA), quase sempre no celular. Ação: preencher o formulário (abre WhatsApp). Prova disponível: kit de marca e textos do PDF; números, clientes, depoimentos e fotos são placeholders marcados. Restrições: Poppins é a única família; sem grão; vidro só na barra do menu e no menu do celular, e luz vermelha só nos borrões das seções pretas e atrás dos membros nos cards de serviço (as únicas exceções, pedidas pelo cliente); sem kanji; sem foto granulada; Vite + JS puro + GSAP/Lenis; sem rolagem horizontal em 390/820/1440/1920.

Memorable moment: o botão vermelho em pílula, sem ícones, em que uma cor mais escura varre o fundo no hover, a segunda tela subindo por cima da capa, como uma cortina (como no tarqstudio.com), e, na segunda tela, Atrair, Comunicar e Converter ficando vermelhos um de cada vez (a cada visita).

Unresolved: fotos dos membros em maior resolução (as entregues têm ~300 px de largura), logos, números do case, contatos reais.

## Direction contract

THESIS: Uma página limpa de agência em que só a tipografia e um vermelho fazem o trabalho: seções quase todas em preto (dois tons que se alternam) com borrões vermelhos dispersos nos cantos, o vermelho aparece em botão, palavra de destaque e no painel do case. Recusa a capa-foto escura com título centralizado do cliente, cards de vidro e qualquer textura. Dials: variância 5, movimento 5, densidade 3. Pinada pelo usuário (referências Nouhau e Exclusive Car), sem sorteio de direção.

OWN-WORLD: Preto #08080a e #101013 (alternados), branco #ffffff só no cartão do formulário, cinza #f5f5f6 disponível como tema; vermelho #e4111d em botão, destaque, números do case e nos borrões das seções (texto vermelho: #ff4651 no escuro, #d4101b no claro). Tudo sólido, sem gradiente decorativo, exceto os dois borrões radiais por seção; sombras só com deslocamento e blur curto. Poppins: títulos 600 e 700, tracking de -0.03em, corpo 400. Formas: botões e chips em pílula, cards 24px, campos 14px, barra do menu em pílula. Botão primário: pílula vermelha lisa, sem ícone, com varredura de cor no hover; ícones Phosphor regular só fora dos botões.

STORY: O visitante entende em segundos que o KZN integra estratégia, mídia, criativo e página como uma operação só, vê as quatro frentes, se identifica com o problema (partes soltas), entende a solução e o processo em etapas e chega ao formulário sem atrito.

FIRST VIEWPORT: A foto da capa do cliente (equipe em volta da mesa, com o degradê vermelho/preto dele e um escurecimento leve de CSS pedido pelo cliente) ocupa a tela inteira (100svh) e fica presa no topo; a segunda seção (prova imediata) sobe por cima dela como uma cortina. Barra de menu em pílula com efeito vidro no topo (logo só KZN, que abre completo no hover do desktop; Resultados, Como trabalhamos, Serviços e o botão vermelho "Entre em contato"). Título centralizado em Poppins 700, "vender melhor." em vermelho; subtítulo; dois botões: "Quero uma análise do meu marketing" (vermelho, vai ao formulário) e "Ver nossos resultados ↓" (contorno, desce até o case). Nada mais: sem faixa, sem tagline.

FORM: Layout limpo editorial em seções sólidas alternadas (posição 1 do pinado pelo usuário), seed: pinned-by-user. Interação-assinatura: botões em pílula sem ícones com varredura de cor no hover; revelação de títulos por palavra com máscara; as linhas vermelhas da solução e do processo se preenchem etapa por etapa ao rolar. Movimento: transform e opacity apenas.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
