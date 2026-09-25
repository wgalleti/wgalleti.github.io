<script setup>
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
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
const scrolled = ref(false)

// Links são âncoras na home; fora dela, voltam para /#âncora.
const hashHref = (anchor) => (route.path === '/' ? `#${anchor}` : `/#${anchor}`)
const links = [
  { anchor: 'frentes', key: 'navFrentes' },
  { anchor: 'ia', key: 'navIa' },
  { anchor: 'projetos', key: 'navProjects' },
  { anchor: 'sobre', key: 'navAbout' },
  { anchor: 'contato', key: 'navContact' },
]

const onScroll = () => { scrolled.value = window.scrollY > 24 }
const onNav = () => { mobileOpen.value = false }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    :style="scrolled || mobileOpen
      ? 'background: rgba(10,6,24,0.78); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(45,31,94,0.6)'
      : 'background: transparent; border-bottom: 1px solid transparent'"
  >
    <div class="mx-auto max-w-[1440px] flex items-center justify-between gap-6 h-[76px] lg:h-[84px] px-6 lg:pl-14 lg:pr-16">
      <a :href="hashHref('topo')" class="flex items-center gap-2.5 no-underline" aria-label="wgalleti — início" @click="onNav">
        <WgLogo :width="36" :height="32" gradient-id="hdr-grad" />
        <Wordmark :size="20" />
      </a>

      <nav class="hidden lg:flex items-center gap-1 p-1.5 rounded-full mono text-[13px]" style="border: 1px solid rgba(61,44,120,0.7); background: rgba(17,10,38,0.6)">
        <a
          v-for="l in links"
          :key="l.anchor"
          :href="hashHref(l.anchor)"
          class="px-[18px] py-2.5 rounded-full text-text-soft hover:text-text hover:bg-white/5 no-underline transition-colors"
          @click="onNav"
        >{{ t(l.key) }}</a>
      </nav>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1.5 mono text-[12.5px]" role="group" aria-label="Idioma / Language">
          <button
            type="button"
            class="min-w-[28px] min-h-[28px] transition-colors"
            :class="currentLang === 'pt' ? 'text-text font-bold' : 'text-muted hover:text-cyan'"
            :aria-pressed="currentLang === 'pt'"
            @click="emit('changeLang', 'pt')"
          >pt</button>
          <span class="text-border-strong" aria-hidden="true">/</span>
          <button
            type="button"
            class="min-w-[28px] min-h-[28px] transition-colors"
            :class="currentLang === 'en' ? 'text-text font-bold' : 'text-muted hover:text-cyan'"
            :aria-pressed="currentLang === 'en'"
            @click="emit('changeLang', 'en')"
          >en</button>
        </div>

        <a
          :href="t('whatsappUrl')"
          target="_blank"
          rel="noopener"
          class="hidden sm:inline-flex items-center h-[46px] px-[22px] rounded-full text-[14px] font-bold no-underline transition-transform hover:-translate-y-px"
          style="background: #EDEAFF; color: #0A0618"
        >{{ t('navCta') }}</a>

        <button
          type="button"
          class="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-muted hover:text-text"
          :aria-expanded="mobileOpen"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="lg:hidden" style="border-top: 1px solid rgba(45,31,94,0.6)">
      <nav class="flex flex-col gap-1 px-6 py-4 mono text-[15px]">
        <a
          v-for="l in links"
          :key="l.anchor"
          :href="hashHref(l.anchor)"
          class="py-3 text-text-soft hover:text-text no-underline"
          @click="onNav"
        >{{ t(l.key) }}</a>
        <a
          :href="t('whatsappUrl')"
          target="_blank"
          rel="noopener"
          class="mt-2 inline-flex items-center justify-center h-12 rounded-full text-[15px] font-bold no-underline"
          style="background: #EDEAFF; color: #0A0618"
          @click="onNav"
        >{{ t('navCta') }}</a>
      </nav>
    </div>
  </header>
</template>
