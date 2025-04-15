<script setup>
import { ref, computed } from 'vue'
import { clearCache } from '../utils/youtube'

const props = defineProps({
  videos: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  hasError: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh'])

// Timestamp when cache was last refreshed (initially null)
const lastRefreshed = ref(null)

// Calculate the cache age for display
const cacheAge = computed(() => {
  if (!lastRefreshed.value) {
    try {
      // Try to get cache timestamp from localStorage
      const cachedData = localStorage.getItem(`youtube_wGalleti`)
      if (cachedData) {
        const { timestamp } = JSON.parse(cachedData)
        lastRefreshed.value = new Date(timestamp)
      }
    } catch (error) {
      console.error('Error getting cache timestamp:', error)
    }
  }
  
  if (!lastRefreshed.value) return null
  
  const now = new Date()
  const diffMs = now - lastRefreshed.value
  const diffMins = Math.floor(diffMs / (1000 * 60))
  
  if (diffMins < 60) {
    return `${diffMins} minutos atrás`
  } else {
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) {
      return `${diffHours} horas atrás`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays} dias atrás`
    }
  }
})

// Handle refresh button click
function handleRefresh() {
  lastRefreshed.value = new Date()
  emit('refresh', true)
}
</script>

<template>
  <section class="section-container mt-12">
    <div class="card" data-sr-left>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold gradient-text">Canal no YouTube</h2>
        
        <div class="flex items-center">
          <button 
            @click="handleRefresh" 
            :disabled="isLoading"
            class="flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                 :class="{ 'animate-spin': isLoading }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Loading state -->
      <div v-if="isLoading" class="flex flex-col items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-300">Carregando vídeos...</p>
      </div>
      
      <!-- Error state -->
      <div v-else-if="hasError" class="flex flex-col items-center py-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="text-red-500 dark:text-red-400 font-medium">Não foi possível carregar os vídeos</p>
        <p class="mt-2 text-gray-600 dark:text-gray-300 max-w-md">
          Verifique sua conexão com a internet ou tente novamente mais tarde.
        </p>
      </div>
      
      <!-- Empty state -->
      <div v-else-if="videos.length === 0" class="flex flex-col items-center py-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <p class="text-gray-600 dark:text-gray-300">Nenhum vídeo encontrado</p>
      </div>
      
      <!-- Videos grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div 
          v-for="(video, index) in videos" 
          :key="video.id"
          class="flex flex-col p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg"
          :data-sr-right="index % 2 === 0"
          :data-sr-left="index % 2 !== 0"
        >
          <a 
            :href="`https://www.youtube.com/watch?v=${video.id}`" 
            target="_blank" 
            rel="noopener noreferrer"
            class="group"
          >
            <div class="relative overflow-hidden rounded-md mb-3">
              <img 
                :src="video.thumbnail" 
                :alt="video.title" 
                class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40">
                <div class="rounded-full bg-red-600 p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 class="font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mb-2">{{ video.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ video.description }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {{ new Date(video.publishedAt).toLocaleDateString() }}
            </p>
          </a>
        </div>
      </div>
      
      <!-- Channel link button -->
      <div v-if="!isLoading && !hasError && videos.length > 0" class="text-center mt-8">
        <a 
          href="https://www.youtube.com/@wGalleti" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
          Ver todos os vídeos
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 