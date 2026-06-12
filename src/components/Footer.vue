<script setup>
import { inject } from 'vue'
import WgLogo from './WgLogo.vue'
import Wordmark from './Wordmark.vue'

defineProps({
  currentLang: { type: String, default: 'pt' },
})

const t = inject('t')
</script>

<template>
  <footer class="border-t border-border-soft relative z-10">
    <div
      class="container-shell flex items-center justify-between flex-wrap"
      style="padding-top: 28px; padding-bottom: 28px; gap: 20px;"
    >
      <div class="flex items-center" style="gap: 10px;">
        <WgLogo :width="26" :height="23" gradient-id="ftr-grad" />
        <Wordmark :size="14" />
        <span class="font-mono text-faint" style="font-size: 11.5px; margin-left: 8px;">{{ t('tagline') }}</span>
      </div>
      <span class="font-mono text-faint" style="font-size: 11px;">{{ t('footerCopyright') }}</span>
    </div>
  </footer>
</template>
