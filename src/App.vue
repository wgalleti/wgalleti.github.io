<script setup>
import { onMounted, ref } from 'vue'
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Bio from './components/Bio.vue'
import Specialties from './components/Specialties.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import ProfileDashboard from './components/ProfileDashboard.vue'
import YouTubeVideos from './components/YouTubeVideos.vue'
import SocialMedia from './components/SocialMedia.vue'
import { fetchYouTubeVideos } from './utils/youtube'

const data = {
  name: 'William Gallëti',
  title: 'Estrategista de Sistemas',
  description: 'Crio sistemas que otimizam processos, automatizam tarefas e liberam equipes para focar no que realmente importa.',
  bio: 'Com mais de 10 anos de estrada entre desenvolvimento e estratégia, eu projeto sistemas como um arquiteto que já construiu com as próprias mãos. Meu diferencial é unir visão de negócio com profundidade técnica.\n\nDa interface ao banco de dados, entrego soluções que reduzem atrito operacional, aumentam produtividade e liberam equipes para o que realmente importa.',
  cvLink: '/cv.docx',
  specialties: [
    '🔧 Desenvolvimento Full Stack com Nuxt e Django',
    '⚙️ Automação com Celery e integração de sistemas',
    '🧠 Arquitetura orientada a impacto e performance',
    '🚀 Projetos com foco em produtividade e ROI'
  ]
}

const youtubeVideos = ref([])
const isLoading = ref(false)
const hasError = ref(false)

// Function to fetch YouTube videos (with option to force refresh)
async function loadYouTubeVideos(forceRefresh = false) {
  try {
    isLoading.value = true
    hasError.value = false
    youtubeVideos.value = await fetchYouTubeVideos('wGalleti', 6, forceRefresh)
  } catch (error) {
    console.error('Failed to load videos:', error)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

// Handle refresh request from YouTubeVideos component
function handleRefreshVideos() {
  loadYouTubeVideos(true)
}

onMounted(async () => {
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
  
  // Fetch YouTube videos
  await loadYouTubeVideos()
})
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <AnimatedBackground />
    <div class="relative z-10">
      <Header :name="data.name" :title="data.title" />
      <main class="flex-grow">
        <Hero :description="data.description" />
        <Bio :bio="data.bio" :cv-link="data.cvLink" />
        <Specialties :specialties="data.specialties" />
        <ProfileDashboard />
        <YouTubeVideos 
          :videos="youtubeVideos" 
          :is-loading="isLoading" 
          :has-error="hasError"
          @refresh="handleRefreshVideos"
        />
        <Contact />
        <SocialMedia />
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
