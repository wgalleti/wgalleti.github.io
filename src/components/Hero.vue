<script setup>
import { computed } from 'vue'
import { useI18n } from '../utils/i18n'

const props = defineProps({
  description: String,
  currentLang: {
    type: String,
    default: 'pt'
  }
})

// Get translations
const t = computed(() => {
  const { t } = useI18n(props.currentLang)
  return t
})
</script>

<template>
  <section class="relative bg-gradient-to-br from-purple-100 to-violet-100 dark:from-gray-800 dark:to-gray-700 py-12 md:py-20">
    <div class="section-container text-center px-4 md:px-0">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 gradient-text" data-sr-left>{{ t('solutionsTransform') }}</h2>
      <p class="text-base md:text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mb-6 md:mb-8" data-sr-right>{{ description }}</p>
      <div data-sr-bottom>
        <lottie-player 
          src="https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json"
          background="transparent"
          speed="1"
          class="w-64 h-64 md:w-96 md:h-96 mx-auto"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
  </section>
</template> 