<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from '../utils/i18n'

const props = defineProps({
  name: String,
  title: String,
  currentLang: {
    type: String,
    default: 'pt'
  }
})

const emit = defineEmits(['changeLanguage'])

// Create local reactive instance of t function
const { t } = useI18n(props.currentLang)

// Watch for language change to update translations
watch(() => props.currentLang, (newLang) => {
  // Force component re-render when language changes
  document.documentElement.setAttribute('lang', newLang)
}, { immediate: true })

const isDark = ref(false)

onMounted(() => {
  // Check system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  // Initialize theme based on system preference
  isDark.value = prefersDark
  setTheme(prefersDark)
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
      isDark.value = e.matches
      setTheme(e.matches)
    }
  })
  
  // Check if user has a saved preference
  const savedTheme = localStorage.getItem('theme-preference')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    setTheme(isDark.value)
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  setTheme(isDark.value)
  
  // Save user preference
  localStorage.setItem('theme-preference', isDark.value ? 'dark' : 'light')
}

const setTheme = (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const switchLanguage = () => {
  // Toggle between 'pt' and 'en'
  const newLang = props.currentLang === 'pt' ? 'en' : 'pt'
  emit('changeLanguage', newLang)
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
    <div class="section-container py-3 md:py-4 px-4 md:px-0">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl md:text-3xl font-bold gradient-text">{{ name }}</h1>
        <div class="flex items-center gap-2 md:gap-4">
          <span class="text-sm md:text-base text-purple-600 dark:text-purple-400 font-semibold hidden sm:inline">{{ title }}</span>
          
          <!-- Language Switcher - showing only the flag of the language you can switch to -->
          <button 
            @click="switchLanguage" 
            class="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :title="props.currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português'"
          >
            <img 
              v-if="props.currentLang === 'pt'" 
              src="/br-flag.svg" 
              alt="Português" 
              class="h-4 w-4 md:h-5 md:w-5" 
            />
            <img 
              v-else 
              src="/us-flag.svg" 
              alt="English" 
              class="h-4 w-4 md:h-5 md:w-5" 
            />
          </button>
          
          <!-- Theme Toggle -->
          <button @click="toggleTheme" class="p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.gradient-text {
  background-image: linear-gradient(to right, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style> 