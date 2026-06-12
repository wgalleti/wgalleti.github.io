<script setup>
import { inject, nextTick, onMounted, onUnmounted, watch } from 'vue'
import Hero from '../components/Hero.vue'
import Knots from '../components/Knots.vue'
import Process from '../components/Process.vue'
import Technologies from '../components/Technologies.vue'
import CuriosityLink from '../components/CuriosityLink.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'

const currentLang = inject('currentLang')

// IntersectionObserver — reveals (opacity 0→1 + translateY 28→0).
// Elementos já visíveis no load não animam (entram diretamente em visible).
let observer = null

const setupReveals = () => {
  if (observer) observer.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.classList.contains('is-visible')) return
    const rect = el.getBoundingClientRect()
    // Já visível no load: pula a animação.
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('is-visible')
      return
    }
    observer.observe(el)
  })
}

onMounted(() => {
  // Pequeno delay para garantir que os filhos renderizaram.
  setTimeout(setupReveals, 150)
})

// Ao trocar idioma os nós são re-renderizados; reaplica observer.
watch(currentLang, () => {
  nextTick(() => setTimeout(setupReveals, 150))
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <main class="flex-grow">
    <Hero />
    <Knots />
    <Process />
    <Technologies />
    <CuriosityLink />
    <About />
    <Contact />
  </main>
</template>
