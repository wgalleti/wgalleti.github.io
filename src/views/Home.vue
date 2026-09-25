<script setup>
import { inject, nextTick, onMounted, onUnmounted, watch } from 'vue'
import HeroSection from '../components/home/HeroSection.vue'
import FrentesSection from '../components/home/FrentesSection.vue'
import IaServicesSection from '../components/home/IaServicesSection.vue'
import ArbitragemSection from '../components/home/ArbitragemSection.vue'
import ProjectsSection from '../components/home/ProjectsSection.vue'
import StackSection from '../components/home/StackSection.vue'
import AboutSection from '../components/home/AboutSection.vue'
import ContactSection from '../components/home/ContactSection.vue'

const currentLang = inject('currentLang')

// Reveal ao rolar: o que já está visível no load entra direto.
let observer = null
const setupReveals = () => {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  document.querySelectorAll('.h-reveal').forEach((el) => {
    if (el.classList.contains('is-visible')) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.classList.add('is-visible')
      return
    }
    observer.observe(el)
  })
}

onMounted(() => setTimeout(setupReveals, 120))
watch(currentLang, () => nextTick(() => setTimeout(setupReveals, 120)))
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <main class="flex-grow">
    <div class="relative mx-auto max-w-[1440px]">
      <!-- A linha: conecta todas as seções (telas largas) -->
      <div class="hidden lg:block absolute pointer-events-none" style="left: 71px; width: 2px; top: 100svh; bottom: 60px; z-index: 2" aria-hidden="true">
        <div class="absolute inset-0" style="background: #1E1440"></div>
        <div class="h-spine-flow absolute inset-0"></div>
        <div class="h-spine-dot absolute rounded-full" style="left: -4px; width: 10px; height: 10px; margin-top: -5px; background: #22D3EE; box-shadow: 0 0 18px 4px rgba(34,211,238,0.6)"></div>
      </div>

      <HeroSection />
      <FrentesSection />
      <IaServicesSection />
      <ArbitragemSection />
      <ProjectsSection />
      <StackSection />
      <AboutSection />
      <ContactSection />
    </div>
  </main>
</template>
