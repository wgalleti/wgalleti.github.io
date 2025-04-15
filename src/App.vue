<script setup>
import { onMounted, ref, watch, computed } from 'vue'
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
import { useI18n, translations } from './utils/i18n'

// Create a reactive language state
const currentLang = ref(localStorage.getItem('preferredLanguage') || 'pt')

// Get translations based on current language with reactivity
const t = computed(() => {
  const i18n = useI18n(currentLang.value)
  return i18n.t
})

// Function to change language
const changeLanguage = (lang) => {
  currentLang.value = lang
  localStorage.setItem('preferredLanguage', lang)
  updateData()
}

// Define translated data object
const getData = () => {
  return {
    name: 'William Gallëti',
    title: t.value('title'),
    description: t.value('description'),
    bio: t.value('bio'),
    cvLinkPtBr: '/cv.pdf',
    cvLinkEn: '/resume.pdf',
    coverLetterLink: '/carta.pdf',
    specialties: translations[currentLang.value].specialties
  }
}

// Reactive data
const data = ref(getData())

// Update data when language changes
const updateData = () => {
  data.value = getData()
}

// Watch for language changes
watch(currentLang, (newLang) => {
  updateData()
  document.documentElement.setAttribute('lang', newLang)
}, { immediate: true })

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
      <Header 
        :name="data.name" 
        :title="data.title" 
        :current-lang="currentLang"
        @change-language="changeLanguage"
      />
      <main class="flex-grow">
        <Hero :description="data.description" :current-lang="currentLang" />
        <Bio 
          :bio="data.bio" 
          :cv-link-pt-br="data.cvLinkPtBr"
          :cv-link-en="data.cvLinkEn"
          :cover-letter-link="data.coverLetterLink"
          :current-lang="currentLang"
        />
        <Specialties 
          :specialties="data.specialties" 
          :current-lang="currentLang"
        />
        <ProfileDashboard :current-lang="currentLang" />
        <YouTubeVideos 
          :videos="youtubeVideos" 
          :is-loading="isLoading" 
          :has-error="hasError"
          :current-lang="currentLang"
          @refresh="handleRefreshVideos"
        />
        <Contact :current-lang="currentLang" />
        <SocialMedia :current-lang="currentLang" />
      </main>
      <Footer :name="data.name" :current-lang="currentLang" />
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
