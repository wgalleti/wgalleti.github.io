<script setup>
import { inject } from 'vue'

defineProps({
  currentLang: String
})

const t = inject('t')
const technologies = inject('technologies')
</script>

<template>
  <section id="tech" class="section-padding relative overflow-hidden">
    <div class="relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16 reveal container-section">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
          {{ t('techTag') }}
        </span>
        <h2 class="heading-section text-white mb-6">{{ t('techTitle') }}</h2>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto font-body">{{ t('techDescription') }}</p>
      </div>

      <!-- Infinite carousel -->
      <div class="relative">
        <!-- Fade edges -->
        <div class="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none bg-gradient-to-r from-slate-950 to-transparent"></div>
        <div class="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none bg-gradient-to-l from-slate-950 to-transparent"></div>

        <!-- Scrolling track -->
        <div class="carousel-track reveal">
          <div
            v-for="tech in technologies"
            :key="'a-' + tech.slug"
            class="carousel-item group"
          >
            <div class="card-glass px-8 py-6 flex flex-col items-center gap-4 group-hover:scale-105 group-hover:border-white/[0.12] transition-all duration-300">
              <div class="w-14 h-14 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <img
                  :src="`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`"
                  :alt="tech.name"
                  class="w-12 h-12"
                  loading="lazy"
                />
              </div>
              <span class="text-sm font-display font-medium text-slate-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">{{ tech.name }}</span>
            </div>
          </div>
          <!-- Duplicate for seamless loop -->
          <div
            v-for="tech in technologies"
            :key="'b-' + tech.slug"
            class="carousel-item group"
            aria-hidden="true"
          >
            <div class="card-glass px-8 py-6 flex flex-col items-center gap-4 group-hover:scale-105 group-hover:border-white/[0.12] transition-all duration-300">
              <div class="w-14 h-14 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <img
                  :src="`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`"
                  :alt="tech.name"
                  class="w-12 h-12"
                  loading="lazy"
                />
              </div>
              <span class="text-sm font-display font-medium text-slate-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: scroll 30s linear infinite;
}

.carousel-track:hover {
  animation-play-state: paused;
}

.carousel-item {
  flex-shrink: 0;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
