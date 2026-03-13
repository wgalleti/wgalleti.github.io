<script setup>
import { onMounted, onUnmounted, inject } from 'vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Process from '../components/Process.vue'
import Services from '../components/Services.vue'
import Technologies from '../components/Technologies.vue'
import Products from '../components/Products.vue'
import Contact from '../components/Contact.vue'

const currentLang = inject('currentLang')

// Scroll reveal observer — scoped to this view's lifecycle
let observer = null

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
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <main class="flex-grow">
    <Hero :current-lang="currentLang" />
    <div class="section-shell">
      <div class="ambient-orb top-20 left-[8%] h-40 w-40 bg-brand-500/40"></div>
      <About :current-lang="currentLang" />
    </div>
    <div class="section-shell">
      <Process :current-lang="currentLang" />
    </div>
    <div class="section-shell">
      <div class="ambient-orb top-32 right-[10%] h-44 w-44 bg-accent-500/35"></div>
      <Services :current-lang="currentLang" />
    </div>
    <div class="section-shell">
      <Technologies :current-lang="currentLang" />
    </div>
    <div class="section-shell">
      <div class="ambient-orb top-24 left-[14%] h-40 w-40 bg-emerald-500/30"></div>
      <Products :current-lang="currentLang" />
    </div>
    <div class="section-shell">
      <Contact :current-lang="currentLang" />
    </div>
  </main>
</template>
