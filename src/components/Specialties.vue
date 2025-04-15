<script setup>
import { computed } from 'vue'
import { useI18n } from '../utils/i18n'

const props = defineProps({
  specialties: {
    type: Array,
    default: () => []
  },
  currentLang: {
    type: String,
    default: 'pt'
  }
})

// Create a computed property for the translation function
const t = computed(() => {
  const { t } = useI18n(props.currentLang)
  return t
})
</script>

<template>
  <section class="section-container mt-12">
    <div class="card" data-sr-left>
      <h2 class="text-2xl font-semibold mb-6 gradient-text">{{ t('mySpecialties') }}</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <li 
          v-for="(item, index) in specialties" 
          :key="index"
          class="flex items-start p-4 rounded-lg bg-purple-50 dark:bg-gray-700 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg"
          :data-sr-right="index % 2 === 0"
          :data-sr-left="index % 2 !== 0"
        >
          <span class="text-gray-800 dark:text-gray-200">{{ item }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.gradient-text {
  background-image: linear-gradient(to right, #8B5CF6, #EC4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style> 