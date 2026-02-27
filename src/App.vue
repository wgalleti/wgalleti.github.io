<script setup>
import { onMounted, ref, watch, computed, provide, defineAsyncComponent } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Services from './components/Services.vue'
import Technologies from './components/Technologies.vue'
import Products from './components/Products.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import { useI18n } from './utils/i18n'
import productsData from './data/products.json'
import technologiesData from './data/technologies.json'

const currentLang = ref(localStorage.getItem('preferredLanguage') || 'pt')

const t = (key) => {
  const i18n = useI18n(currentLang.value)
  return i18n.t(key)
}

// Reactive data stores
const products = ref(JSON.parse(JSON.stringify(productsData)))
const technologies = ref(JSON.parse(JSON.stringify(technologiesData)))

// Provide translation function and data to all children
provide('t', t)
provide('currentLang', currentLang)
provide('products', products)
provide('technologies', technologies)

// Admin panel - dev only (tree-shaken in production build)
const AdminPanel = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./components/admin/AdminPanel.vue'))
  : null

const changeLanguage = (lang) => {
  currentLang.value = lang
  localStorage.setItem('preferredLanguage', lang)
}

watch(currentLang, (newLang) => {
  document.documentElement.setAttribute('lang', newLang)
}, { immediate: true })

// Scroll reveal observer
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

  const mutationObserver = new MutationObserver(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
  })
  mutationObserver.observe(document.body, { childList: true, subtree: true })
})

const whatsappUrl = 'https://wa.me/5565999448004?text=' + encodeURIComponent('Olá! Vim pelo site da wGalleti Tech e gostaria de saber mais sobre as soluções de vocês.')
</script>

<template>
  <div class="min-h-screen flex flex-col relative noise-overlay">
    <AnimatedBackground />

    <div class="relative z-10">
      <Header
        :current-lang="currentLang"
        @change-lang="changeLanguage"
      />

      <main class="flex-grow">
        <Hero :current-lang="currentLang" />
        <About :current-lang="currentLang" />
        <Services :current-lang="currentLang" />
        <Technologies :current-lang="currentLang" />
        <Products :current-lang="currentLang" />
        <Contact :current-lang="currentLang" />
      </main>

      <Footer :current-lang="currentLang" />
    </div>

    <!-- Dev-only admin panel -->
    <component v-if="AdminPanel" :is="AdminPanel" />

    <!-- Floating WhatsApp Button -->
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center text-white hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all duration-300 animate-float"
      title="WhatsApp"
    >
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  </div>
</template>
