<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import WgLogo from './WgLogo.vue'

const props = defineProps({
  currentLang: String
})

const emit = defineEmits(['changeLang'])
const t = inject('t')

const scrolled = ref(false)
const mobileOpen = ref(false)

const sections = [
  { id: 'about', key: 'navAbout' },
  { id: 'services', key: 'navServices' },
  { id: 'tech', key: 'navTech' },
  { id: 'products', key: 'navProducts' },
  { id: 'contact', key: 'navContact' },
]

const onScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const toggleLang = () => {
  emit('changeLang', props.currentLang === 'pt' ? 'en' : 'pt')
}

const scrollTo = (id) => {
  mobileOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const whatsappUrl = 'https://wa.me/5565999448004?text=' + encodeURIComponent('Olá! Vim pelo site da wGalleti Tech e gostaria de saber mais sobre as soluções de vocês.')
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      scrolled
        ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06] py-3'
        : 'bg-transparent py-5'
    ]"
  >
    <div class="container-section flex items-center justify-between">
      <a href="#" class="relative z-50" @click.prevent="window.scrollTo({ top: 0, behavior: 'smooth' })">
        <WgLogo size="sm" />
      </a>

      <nav class="hidden lg:flex items-center gap-1">
        <button
          v-for="s in sections"
          :key="s.id"
          @click="scrollTo(s.id)"
          class="px-4 py-2 text-sm font-body text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-300"
        >
          {{ t(s.key) }}
        </button>
      </nav>

      <div class="hidden lg:flex items-center gap-3">
        <button
          @click="toggleLang"
          class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-medium text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded-lg border border-white/[0.06] transition-all duration-300"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
          {{ currentLang === 'pt' ? 'EN' : 'PT' }}
        </button>

        <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-whatsapp !py-2.5 !px-5 !text-xs">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {{ t('navCta') }}
        </a>
      </div>

      <button
        @click="mobileOpen = !mobileOpen"
        class="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
      >
        <span :class="['block w-6 h-0.5 bg-white transition-all duration-300 origin-center', mobileOpen ? 'rotate-45 translate-y-2' : '']"></span>
        <span :class="['block w-6 h-0.5 bg-white transition-all duration-300', mobileOpen ? 'opacity-0 scale-0' : '']"></span>
        <span :class="['block w-6 h-0.5 bg-white transition-all duration-300 origin-center', mobileOpen ? '-rotate-45 -translate-y-2' : '']"></span>
      </button>
    </div>

    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="mobileOpen" class="fixed inset-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6">
        <button
          v-for="s in sections"
          :key="s.id"
          @click="scrollTo(s.id)"
          class="text-2xl font-display font-semibold text-slate-300 hover:text-white transition-colors"
        >
          {{ t(s.key) }}
        </button>
        <div class="flex items-center gap-4 mt-6">
          <button @click="toggleLang" class="btn-secondary !text-sm">
            {{ currentLang === 'pt' ? 'English' : 'Português' }}
          </button>
          <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-whatsapp !text-sm">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
