<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Specialties from './components/Specialties.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'

const data = {
  name: 'William Gallëti',
  title: 'Estrategista de Sistemas',
  description: 'Crio sistemas que otimizam processos, automatizam tarefas e liberam equipes para focar no que realmente importa.',
  specialties: [
    '🔧 Desenvolvimento Full Stack com Nuxt e Django',
    '⚙️ Automação com Celery e integração de sistemas',
    '🧠 Arquitetura orientada a impacto e performance',
    '🚀 Projetos com foco em produtividade e ROI'
  ]
}

onMounted(() => {
  // Initialize ScrollReveal with different directions
  ScrollReveal().reveal('[data-sr-left]', {
    distance: '100px',
    duration: 1000,
    origin: 'left',
    easing: 'ease-out',
    interval: 100,
    cleanup: true,
    delay: 200
  })

  ScrollReveal().reveal('[data-sr-right]', {
    distance: '100px',
    duration: 1000,
    origin: 'right',
    easing: 'ease-out',
    interval: 100,
    cleanup: true,
    delay: 200
  })

  ScrollReveal().reveal('[data-sr-bottom]', {
    distance: '50px',
    duration: 1000,
    origin: 'bottom',
    easing: 'ease-out',
    interval: 100,
    cleanup: true,
    delay: 200
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <AnimatedBackground />
    <div class="relative z-10">
      <Header :name="data.name" :title="data.title" />
      <main class="flex-grow">
        <Hero :description="data.description" />
        <Specialties :specialties="data.specialties" />
        <Contact />
      </main>
      <Footer :name="data.name" />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
