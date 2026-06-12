<script setup>
import { defineAsyncComponent, provide, ref, watch } from 'vue'
import Header from './components/Header.vue'
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

// Reactive data stores (mantidos para as páginas de produto legadas)
const products = ref(JSON.parse(JSON.stringify(productsData)))
const technologies = ref(JSON.parse(JSON.stringify(technologiesData)))

provide('t', t)
provide('currentLang', currentLang)
provide('products', products)
provide('technologies', technologies)

// Admin panel — dev only (tree-shaken em produção)
const AdminPanel = import.meta.env.DEV
  ? defineAsyncComponent(() => import('./components/admin/AdminPanel.vue'))
  : null

const changeLanguage = (lang) => {
  currentLang.value = lang
  localStorage.setItem('preferredLanguage', lang)
}

watch(currentLang, (newLang) => {
  document.documentElement.setAttribute('lang', newLang === 'pt' ? 'pt-BR' : 'en')
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen flex flex-col relative bg-void text-text">
    <AnimatedBackground />

    <div class="relative z-10 flex flex-col min-h-screen">
      <Header
        :current-lang="currentLang"
        @change-lang="changeLanguage"
      />

      <router-view />

      <Footer :current-lang="currentLang" />
    </div>

    <!-- Dev-only admin panel -->
    <component v-if="AdminPanel" :is="AdminPanel" />
  </div>
</template>
