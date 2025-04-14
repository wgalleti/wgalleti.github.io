<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  name: String,
  title: String
})

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
</script>

<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
    <div class="section-container py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold gradient-text">{{ name }}</h1>
        <div class="flex items-center gap-4">
          <span class="text-purple-600 dark:text-purple-400 font-semibold">{{ title }}</span>
          <button @click="toggleTheme" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template> 