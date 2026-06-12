# Handoff: Rebrand wgalleti.io — "a Linha" (one-page site + identidade)

## Overview
Nova identidade pessoal de **William Galleti** (desenvolvedor freelancer, "tecnologia que resolve") e redesign do site `wgalleti.github.io` como one-page bilíngue (PT/EN). Conceito da marca: **"Todo problema é um nó. Eu desato com código."** — a logo é uma linha única que entra emaranhada (nó) e sai como um W resoluto, terminando num ponto ciano ("problema encerrado").

Codebase alvo: o repositório existente `wgalleti/wgalleti.github.io` (**Vue 3 + Vite + Tailwind**). Recriar as telas usando os padrões já existentes do repo (componentes Vue, Tailwind config, i18n por `provide/inject` já presente no App.vue).

## About the Design Files
Os arquivos neste pacote são **referências de design criadas em HTML** (protótipos navegáveis), NÃO código de produção para copiar diretamente:

- `Site wgalleti.dc.html` — o site one-page completo (PT + EN), incluindo a lógica das animações em JavaScript (classe `Component` no fim do arquivo — a lógica de canvas é portável quase 1:1 para um composable Vue).
- `Brand Book.dc.html` — o brand book com todas as regras da identidade.
- `image-slot.js` — placeholder de imagem usado apenas no protótipo (substituir por `<img>` real com a foto do William).

A tarefa é **recriar o design no codebase Vue existente**: componentes Vue SFC, Tailwind para estilo (estender o `tailwind.config.js` com os tokens abaixo), e os canvas de animação como composables/`onMounted`.

## Fidelity
**High-fidelity.** Cores, tipografia, espaçamentos, copy e animações são finais. Recriar pixel-perfect.

## Design Tokens

### Cores (estender no tailwind.config.js)
| Token | Hex | Uso |
|---|---|---|
| `void` | `#0A0618` | Fundo global (~70% da interface) |
| `surface` | `#110A26` | Cards |
| `border` | `#2D1F5E` | Bordas, divisores |
| `border-strong` | `#3D2C78` | Bordas de hover/botões secundários |
| `violet` | `#8B5CF6` | Marca, ações, interativo |
| `cyan` | `#22D3EE` | Destaque, "resolvido", ponto final |
| `text` | `#EDEAFF` | Texto principal |
| `text-soft` | `#B6AED6` | Texto de parágrafos |
| `muted` | `#8E87B3` | Texto de apoio/labels |
| `faint` | `#4A3D78` | Microtexto, créditos |
| `success` | `#34D399` | Confirmações ("✓ resolvido") |

**Gradiente-assinatura:** `linear-gradient(100deg, #8B5CF6, #22D3EE)` — usar SOMENTE em: logo, destaque do H1 (background-clip: text) e CTAs primários. Nunca em fundos grandes.

### Tipografia (Google Fonts)
- **Archivo** — display e texto. H1: 62px/900/-0.03em (line-height 1.04); H2: 42px/900/-0.02em; H3: 19px/600; corpo: 14.5–17.5px/400, line-height 1.6–1.65.
- **JetBrains Mono** — sotaque técnico: eyebrows (12px, uppercase, letter-spacing 0.18–0.2em), labels, terminal, chips da stack. Nunca em parágrafos longos.
- Wordmark: "wgalleti" minúsculo, Archivo 900, tracking −3.5%, ponto final sempre ciano (`wgalleti.`).

### Outros
- Radius: cards 18px, botões 11px, chips 100px (pill), ícones-container 12px.
- Easing padrão: `cubic-bezier(0.16, 1, 0.3, 1)`; durações 300–800ms; sem bounce.
- Largura de conteúdo: max-width 1180px, padding lateral 32px.
- Respeitar `prefers-reduced-motion` em TODAS as animações (logo renderizada estática montada; matrix parado ou removido).

## A Logo (SVG)
Traçado único, stroke 5 (em viewBox 90×80), pontas redondas, gradiente violeta→ciano, ponto final ciano r=4:

```svg
<svg viewBox="0 0 90 80" fill="none">
  <defs>
    <linearGradient id="g" x1="8" y1="40" x2="82" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#8B5CF6"/><stop offset="100%" stop-color="#22D3EE"/>
    </linearGradient>
  </defs>
  <path d="M8 38 C14 22, 26 20, 26 32 C26 44, 12 46, 14 34 C16 24, 30 22, 36 34 L46 64 L57 28 L68 64 L79 22"
        stroke="url(#g)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="79" cy="22" r="4" fill="#22D3EE"/>
</svg>
```

Regras (ver Brand Book): nunca esticar, rotacionar, aplicar glow pesado ou trocar cores. Abaixo de 32px usar só o W simples (path `M6 6 L18 42 L30 14 L42 42 L54 6` em viewBox 60×48). Área de proteção: 2× o diâmetro do ponto, todos os lados.

## Screens / Views (one-page, ordem do scroll)

### 1. Header (fixo)
- `position: fixed`, fundo `rgba(10,6,24,0.72)` + `backdrop-filter: blur(14px)`, borda inferior `rgba(45,31,94,0.6)`.
- Esquerda: símbolo (32×28) + wordmark 17px. Centro: nav em JetBrains Mono 12.5px, cor muted, hover → text ("o nó", "como trabalho", "stack", "quem sou"). Direita: toggle `pt / en` (ativo em branco bold, inativo muted, hover ciano) + CTA gradiente "vamos conversar" (13px/600, padding 9×18, radius 9px).

### 2. Hero (min-height 96vh, grid 1.05fr/0.95fr)
- Coluna esquerda: eyebrow ciano ("william galleti — desenvolvedor · 15 anos desatando nós") → H1 62px "Todo problema é um nó." + linha 2 com gradiente em background-clip text ("Eu desato com código.") → parágrafo 17.5px text-soft → 2 CTAs (primário gradiente c/ ícone WhatsApp "Me conta seu problema", hover translateY(-2px) + sombra `0 12px 32px -10px rgba(139,92,246,0.55)`; secundário borda border-strong "Ver como trabalho", hover borda violeta + bg `rgba(139,92,246,0.08)`) → régua de stats (15+ anos / 50+ projetos / 30+ clientes; número 30px/900, label mono 11.5px muted) com borda superior.
- Coluna direita: **canvas da animação da logo** (quadrado, max 530px) + microcaption mono 11px faint "// a marca reage ao seu mouse".

### 3. "O nó" — cards de problemas (grid auto-fit minmax(330px, 1fr))
6 cards (surface, borda border, radius 18px, padding 28px; hover: translateY(-4px) + borda `#4A39A0`, transição 0.4s):
- Header do card: ícone de linha 22px (stroke `#A78BFA` 1.6, container 44×44 radius 12 bg `rgba(139,92,246,0.1)` borda `rgba(139,92,246,0.2)`) + label mono violeta "nó #0N".
- H3 19px com o problema NA VOZ DO CLIENTE (aspas), parágrafo 14.5px muted com a solução, rodapé mono 12px ciano "→ serviço · tecnologias".
- Conteúdo PT: #01 planilha/WhatsApp→sistemas web (python, django, vue); #02 app/balcão→apps flutter; #03 tarefas repetitivas→automação/APIs; #04 caixa-preta do dev anterior→resgate técnico; #05 deploy tenso→cloud & devops. (EN equivalente no protótipo.)
- 6º card (CTA): fundo `linear-gradient(135deg, rgba(139,92,246,0.12), rgba(34,211,238,0.08))`, borda border-strong, ícone balão ciano, "Seu nó não está aqui?" + link mono ciano para WhatsApp.

### 4. "A linha" — processo
- SVG decorativo full-width: a linha da marca começando com o nó e correndo reta até um ponto ciano (ver protótipo, viewBox 1000×56).
- 3 cards: número mono 28px (cores: #8B5CF6 / #6B7FE8 / #22D3EE) + ícone à direita (balão / lápis / escudo-check) + H3 + parágrafo. Copy: "Você me conta o problema" / "Eu desenho a solução" / "Entrego e fico por perto".

### 5. Stack — chips pill
Chips: mono 13.5px, borda border, radius 100px, padding 11×19, hover borda violeta. Cada chip tem o logo oficial da tecnologia 16×16 (no protótipo via `cdn.simpleicons.org/<slug>/<hex>` — no codebase, baixar os SVGs do simple-icons como assets locais): Python `#4B8BBE`, Django `#44B78B`, FastAPI `#009688`, JavaScript `#F7DF1E`, Vue.js `#4FC08D`, Nuxt `#00DC82`, React `#61DAFB`, Next.js `#FFFFFF`, Flutter `#54C5F8`, Dart `#29B6F6`, Go `#00ADD8`, Supabase `#3FCF8E`.

### 6. "Quem sou" — card único
Surface, radius 22px, padding 48px, grid 240px/1fr. Foto circular 220px (substituir o image-slot por foto real) + caption mono "mato grosso, brasil". Texto: eyebrow ciano → H2 36px "Sou o William. Você fala direto comigo." → 2 parágrafos (15.5px text-soft, line-height 1.7) → links mono "github ↗ / linkedin ↗" (muted, hover ciano).

### 7. Contato — grid 1fr/1fr
- Esquerda: eyebrow → H2 48px "Me conta seu problema." (ponto ciano) → parágrafo → CTA WhatsApp gradiente + e-mail mono.
- Direita: **terminal animado** — janela `#06030F`, borda border, radius 16px, header com 3 dots (2 roxos `#3D2C78` + 1 ciano) e título mono "wgalleti — terminal". Corpo mono 13.5px: linha `$ wgalleti resolve --novo` → `> descreva o nó:` → frase digitando com cursor ciano piscando (block 8×16px, blink 1.1s step-end) → quando completa, linha verde `✓ isso tem solução — me chama no whatsapp`.

### 8. Footer
Borda superior `#1E1440`, símbolo + wordmark 14px + tagline mono "tecnologia que resolve", direita: "© 2026 william galleti · cnpj 50.326.042/0001-95".

## Interactions & Behavior

### Animação de montagem da logo (canvas, hero)
A peça central. Pontos 3D amostrados ao longo do path da logo (segmentos cúbicos do nó: `[8,38]→c(14,22)(26,20)(26,32)`, `→c(26,44)(12,46)(14,34)`, `→c(16,24)(30,22)(36,34)`; depois linhas retas `→[46,64]→[57,28]→[68,64]→[79,22]`; ~26 amostras por curva, 16 por reta), centro em (43.5, 43), projeção perspectiva (persp=380) com rotação Y/X.

**Timeline (loop, total ~31.5s):**
1. **0–1.4s** — os 8 vértices-chave acendem um a um nas posições finais (stagger 150ms, fade+grow 480ms). Sem movimento de partículas.
2. **1.4–7.9s** — a linha é traçada ponto a ponto (easeInOutSine) com um ponto-guia luminoso na ponta (dot r≈3 + anel r≈7.5 a 22% alpha).
3. **7.9–9.3s** — profundidade 3D entra em fade: linha-eco atrás (z=−14, ~15% alpha) + conexões verticais nos vértices (`rgba(168,139,250,0.24)`); ponto final ciano acende.
4. **9.3–27.3s** — **hold de 18s** montada; rotação idle quase imperceptível (`sin(t·0.00016)·0.06` rad) + parallax do mouse (`(mx−0.5)·0.2` rad em Y, `(0.5−my)·0.1` em X, lerp 0.025/frame).
5. **27.3–29.1s** — fade out 1.8s → **pausa 2.4s** → reinicia.

Gradiente da linha interpolado por ponto: `rgb(139→34, 92→211, 246→238)`. Stroke principal ~4.8 escalado pela perspectiva; lineCap/lineJoin round.

⚠️ **Lições do protótipo:** o relógio da timeline deve viver fora do ciclo de render (não reiniciar em re-render — no Vue, guardar em ref fora do template); listener de `mousemove` no `window` (passive), normalizado 0–1.

### Matrix rain (canvas fixo, fundo, z-index 0)
Glifos `01<>[]{}/+=` + katakana, JetBrains Mono 16px (14px <768px), colunas a cada `font*1.7`, velocidade lenta 0.35–0.75 px/frame, trilhas de 5–12 glifos. Cores: 2/3 das colunas violeta, 1/3 ciano; alpha máx **0.17** na cabeça, decaindo até 0.015 (regra do brand book: ≤18%, é atmosfera). Glifos trocam aleatoriamente a cada ~6 frames. DPR cap 1.25. Dois orbs ambient fixos com blur 110px (violeta 7%, ciano 5%) pulsando em 9s.

### Reveals de scroll
Elementos com `data-reveal`: IntersectionObserver (threshold 0.1), entram com `opacity 0→1` + `translateY(28px)→0`, 0.8s no easing padrão, uma única vez. Elementos já visíveis no load não animam.

### Terminal (contato)
Frases ciclando (PT: "minha loja ainda controla estoque no caderno", "preciso de um app pra ontem", "o sistema cai toda sexta às 18h", "quero parar de digitar nota fiscal na mão"; EN equivalentes). Digita char a char (48–103ms), pausa 420ms, mostra a linha de sucesso, segura 2.8s, apaga rápido (16ms/char), espera 600ms, próxima frase. Trocar idioma reinicia o ciclo.

### i18n
Toggle pt/en re-renderiza todo o conteúdo (usar o sistema provide/inject já existente no App.vue do repo). Links WhatsApp com mensagens pré-preenchidas por idioma (`https://wa.me/5565999448004?text=...`).

## State Management
- `lang: 'pt' | 'en'` (persistir em localStorage como o site atual já faz, se aplicável).
- Terminal: `typed: string`, `showResult: boolean`, índice de frase (interno).
- Logo: relógio de timeline + alvo/atual de rotação (refs fora do template).
- Sem fetch de dados; tudo estático.

## Assets
- Logo: SVGs inline (código acima e variações no Brand Book — mono clara, sobre claro, ícone W).
- Ícones de linha: SVGs inline 24×24, stroke 1.6, desenhados no protótipo (copiar paths do HTML).
- Logos da stack: simple-icons (baixar como assets locais, não usar CDN em produção).
- Ícone WhatsApp: path inline no protótipo.
- Foto do William: **pendente** — o protótipo usa um placeholder circular 220px.
- Favicon: W simples sobre gradiente (especificado no Brand Book, seção Aplicações).

## Files
- `Site wgalleti.dc.html` — protótipo completo do site (markup PT nas linhas iniciais, EN duplicado abaixo; lógica JS das animações na classe `Component` ao final).
- `Brand Book.dc.html` — identidade completa: essência, logo (anatomia/variações/proteção/nunca), cor, tipografia, voz (✓/✕), aplicações, motion.
- `image-slot.js` — só para o protótipo; não portar.
