<script setup>
import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import WgLogo from './WgLogo.vue'
import Wordmark from './Wordmark.vue'

defineProps({
  currentLang: { type: String, required: true },
})
const emit = defineEmits(['changeLang'])
const t = inject('t')
const route = useRoute()

const mobileOpen = ref(false)

// Os links de navegação são âncoras na home. Quando estamos em outra rota
// (ex.: produto), apontamos para /#... para voltar à home + âncora.
const hashHref = (anchor) => (route.path === '/' ? `#${anchor}` : `/#${anchor}`)

const onNav = () => {
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 border-b border-border/60"
    style="background: rgba(10,6,24,0.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);"
  >
    <div class="container-shell flex items-center justify-between gap-6" style="padding-top: 14px; padding-bottom: 14px;">
      <!-- Esquerda: símbolo + wordmark -->
      <a :href="hashHref('topo')" class="flex items-center gap-3 no-underline" @click="onNav">
        <WgLogo :width="32" :height="28" gradient-id="hdr-grad" />
        <Wordmark :size="17" />
      </a>

      <!-- Centro: nav desktop -->
      <nav class="hidden md:flex items-center gap-7">
        <a :href="hashHref('problemas')" class="nav-link" @click="onNav">{{ t('navKnot') }}</a>
        <a :href="hashHref('processo')" class="nav-link" @click="onNav">{{ t('navProcess') }}</a>
        <a :href="hashHref('stack')" class="nav-link" @click="onNav">{{ t('navStack') }}</a>
        <a :href="hashHref('sobre')" class="nav-link" @click="onNav">{{ t('navAbout') }}</a>
      </nav>

      <!-- Direita: toggle idioma + CTA -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5 font-mono text-[12px]" aria-label="Toggle language">
          <button
            type="button"
            class="transition-colors"
            :class="currentLang === 'pt' ? 'text-text font-bold' : 'text-muted hover:text-cyan'"
            @click="emit('changeLang', 'pt')"
          >pt</button>
          <span class="text-border-strong">/</span>
          <button
            type="button"
            class="transition-colors"
            :class="currentLang === 'en' ? 'text-text font-bold' : 'text-muted hover:text-cyan'"
            @click="emit('changeLang', 'en')"
          >en</button>
        </div>

        <a
          :href="hashHref('contato')"
          class="hidden sm:inline-flex items-center text-[13px] font-semibold text-white no-underline"
          style="background: linear-gradient(100deg, #8B5CF6, #22D3EE); padding: 9px 18px; border-radius: 9px;"
          @click="onNav"
        >{{ t('navCta') }}</a>

        <button
          type="button"
          class="md:hidden inline-flex items-center justify-center w-9 h-9 rounded text-muted hover:text-text"
          :aria-expanded="mobileOpen"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="mobileOpen"
      class="md:hidden border-t border-border/60"
      style="background: rgba(10,6,24,0.92); backdrop-filter: blur(14px);"
    >
      <nav class="container-shell flex flex-col gap-1 py-4">
        <a :href="hashHref('problemas')" class="nav-link py-2" @click="onNav">{{ t('navKnot') }}</a>
        <a :href="hashHref('processo')" class="nav-link py-2" @click="onNav">{{ t('navProcess') }}</a>
        <a :href="hashHref('stack')" class="nav-link py-2" @click="onNav">{{ t('navStack') }}</a>
        <a :href="hashHref('sobre')" class="nav-link py-2" @click="onNav">{{ t('navAbout') }}</a>
        <a
          :href="hashHref('contato')"
          class="mt-2 inline-flex items-center justify-center text-[13px] font-semibold text-white no-underline"
          style="background: linear-gradient(100deg, #8B5CF6, #22D3EE); padding: 11px 18px; border-radius: 9px;"
          @click="onNav"
        >{{ t('navCta') }}</a>
      </nav>
    </div>
  </header>
</template>
