<script setup>
import { onMounted, onUnmounted, inject } from 'vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Services from '../components/Services.vue'
import Technologies from '../components/Technologies.vue'
import Products from '../components/Products.vue'
import Contact from '../components/Contact.vue'

const currentLang = inject('currentLang')

// Scroll reveal observer — scoped to this view's lifecycle
let observer = null
let mutationObserver = null

onMounted(() => {
  observer = new IntersectionObserver(
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

  mutationObserver = new MutationObserver(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el))
  })
  mutationObserver.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (mutationObserver) {
    mutationObserver.disconnect()
  }
})
</script>

<template>
  <main class="flex-grow">
    <Hero :current-lang="currentLang" />
    <About :current-lang="currentLang" />
    <Services :current-lang="currentLang" />
    <Technologies :current-lang="currentLang" />
    <Products :current-lang="currentLang" />
    <Contact :current-lang="currentLang" />
  </main>
</template>
