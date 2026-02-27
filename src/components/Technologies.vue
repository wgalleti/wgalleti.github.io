<script setup>
import { inject } from 'vue'

defineProps({
  currentLang: String
})

const t = inject('t')
const technologies = inject('technologies')
</script>

<template>
  <section id="tech" class="section-padding relative">
    <div class="container-section relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16 reveal">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
          {{ t('techTag') }}
        </span>
        <h2 class="heading-section text-white mb-6">{{ t('techTitle') }}</h2>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto font-body">{{ t('techDescription') }}</p>
      </div>

      <!-- Tech grid -->
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
        <div
          v-for="tech in technologies"
          :key="tech.slug"
          class="card-glass p-5 flex flex-col items-center gap-3 group reveal hover:scale-105 transition-all duration-300"
        >
          <div class="w-10 h-10 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <img
              :src="`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`"
              :alt="tech.name"
              class="w-8 h-8"
              loading="lazy"
            />
          </div>
          <span class="text-xs font-display font-medium text-slate-400 group-hover:text-white transition-colors duration-300 text-center leading-tight">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
