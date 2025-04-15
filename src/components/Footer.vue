<script setup>
import { useI18n } from '../utils/i18n'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  currentLang: {
    type: String,
    default: 'pt'
  }
})

const { t } = useI18n(props.currentLang)

const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-10 py-4 border-t border-gray-200 dark:border-gray-700">
    <div class="section-container text-center text-gray-600 dark:text-gray-400">
      &copy; {{ year }} {{ name }}. {{ t('copyright') }}.
    </div>
  </footer>
</template> 