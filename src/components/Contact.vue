<script setup>
import { inject, onBeforeUnmount, ref, watch } from 'vue'
import { terminalPhrases } from '../utils/i18n'

const t = inject('t')
const currentLang = inject('currentLang')

// Terminal state — viv  fora do template para sobreviver a re-renders.
const typed = ref('')
const showResult = ref(false)

let typeToken = 0
let phraseIdx = 0
let timer = null

function startTyping() {
  if (timer) clearTimeout(timer)
  const token = ++typeToken
  const phrases = terminalPhrases[currentLang.value] || terminalPhrases.pt
  const str = phrases[phraseIdx % phrases.length]

  const typeChar = (pos) => {
    if (token !== typeToken) return
    typed.value = str.slice(0, pos)
    showResult.value = false
    if (pos < str.length) {
      timer = setTimeout(() => typeChar(pos + 1), 48 + Math.random() * 55)
    } else {
      timer = setTimeout(() => {
        if (token !== typeToken) return
        showResult.value = true
        timer = setTimeout(() => erase(str.length), 2800)
      }, 420)
    }
  }

  const erase = (pos) => {
    if (token !== typeToken) return
    if (pos <= 0) {
      typed.value = ''
      showResult.value = false
      phraseIdx += 1
      timer = setTimeout(() => startTyping(), 600)
      return
    }
    typed.value = str.slice(0, pos - 1)
    showResult.value = false
    timer = setTimeout(() => erase(pos - 1), 16)
  }

  typeChar(0)
}

// Inicia e reinicia ao trocar idioma
watch(
  currentLang,
  () => {
    phraseIdx = 0
    typed.value = ''
    showResult.value = false
    startTyping()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  typeToken += 1
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <section
    id="contato"
    class="container-shell contact-grid"
    style="padding-top: 110px; padding-bottom: 90px;"
  >
    <!-- Esquerda -->
    <div class="reveal flex flex-col" style="gap: 22px;">
      <span class="eyebrow">{{ t('contactEyebrow') }}</span>
      <h2 class="m-0" style="font-size: 48px; font-weight: 900; letter-spacing: -0.025em; line-height: 1.06;">
        {{ t('contactTitle1') }}<br />{{ t('contactTitle2') }}<span class="text-cyan">.</span>
      </h2>
      <p class="text-muted m-0" style="font-size: 16.5px; line-height: 1.65; max-width: 460px;">
        {{ t('contactDesc') }}
      </p>

      <div class="flex flex-col items-start" style="gap: 16px;">
        <a
          :href="t('whatsappUrl')"
          target="_blank"
          rel="noopener"
          class="btn-brand"
          style="font-size: 15.5px; padding: 16px 30px;"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {{ t('contactCta') }}
        </a>
        <a
          href="mailto:william.galleti@gmail.com"
          class="font-mono text-muted no-underline transition-colors hover:text-cyan"
          style="font-size: 13.5px;"
        >william.galleti@gmail.com →</a>
      </div>
    </div>

    <!-- Direita: terminal -->
    <div
      class="reveal terminal-window"
    >
      <div
        class="flex items-center"
        style="gap: 8px; padding: 13px 18px; border-bottom: 1px solid #1E1440;"
      >
        <span class="dot dot-violet"></span>
        <span class="dot dot-violet"></span>
        <span class="dot dot-cyan"></span>
        <span class="font-mono text-faint" style="font-size: 11.5px; margin-left: 10px;">{{ t('terminalTitle') }}</span>
      </div>
      <div
        class="terminal-body font-mono"
      >
        <div><span class="text-violet">$</span> <span class="text-text">{{ t('terminalCommand') }}</span></div>
        <div class="text-muted">{{ t('terminalPrompt') }}</div>
        <div class="text-text">
          "{{ typed }}<span class="cursor"></span>"
        </div>
        <div v-if="showResult" class="text-success">{{ t('terminalSuccess') }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 44px;
  align-items: center;
}

.terminal-window {
  background: #06030F;
  border: 1px solid #2D1F5E;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 64px -24px rgba(0, 0, 0, 0.6);
}

.terminal-body {
  padding: 24px 26px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 13.5px;
  line-height: 1.7;
  min-height: 150px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot-violet { background: #3D2C78; }
.dot-cyan   { background: #22D3EE; }

.cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #22D3EE;
  vertical-align: -2px;
  animation: cursorBlink 1.1s step-end infinite;
}

@keyframes cursorBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .cursor { animation: none; }
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
