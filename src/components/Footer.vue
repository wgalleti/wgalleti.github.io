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
  <footer class="relative z-10">
    <div class="mx-auto max-w-[1440px] px-6 lg:pl-[160px] lg:pr-[120px]">
      <div class="flex items-center justify-between flex-wrap gap-5 py-8" style="border-top: 1px solid #1E1440">
        <div class="flex items-center gap-2.5">
          <WgLogo :width="26" :height="23" gradient-id="ftr-grad" />
          <Wordmark :size="15" />
          <span class="mono text-muted text-[12px] ml-2">{{ t('tagline') }}</span>
        </div>
        <span class="mono text-muted text-[12px]">{{ t('footerCopyright') }}</span>
      </div>
    </div>
  </footer>
</template>
