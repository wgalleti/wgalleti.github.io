<script setup>
import { inject } from 'vue'

defineProps({
  currentLang: String
})

const t = inject('t')
</script>

<template>
  <section id="about" class="section-padding relative overflow-hidden">
    <div class="container-section relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16 reveal">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
          {{ t('aboutTag') }}
        </span>
        <h2 class="heading-section text-white mb-6">{{ t('aboutTitle') }}</h2>
        <p class="text-lg text-slate-400 max-w-3xl mx-auto font-body leading-relaxed">{{ t('aboutDescription') }}</p>
      </div>

      <!-- Mission / Vision / Values -->
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <!-- Mission -->
        <div class="card-glass p-8 group reveal reveal-delay-1">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <svg class="w-7 h-7 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-display font-bold text-white mb-3">{{ t('aboutMission') }}</h3>
          <p class="text-slate-400 font-body leading-relaxed text-sm">{{ t('aboutMissionText') }}</p>
        </div>

        <!-- Vision -->
        <div class="card-glass p-8 group reveal reveal-delay-2">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500/20 to-accent-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <svg class="w-7 h-7 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-display font-bold text-white mb-3">{{ t('aboutVision') }}</h3>
          <p class="text-slate-400 font-body leading-relaxed text-sm">{{ t('aboutVisionText') }}</p>
        </div>

        <!-- Values -->
        <div class="card-glass p-8 group reveal reveal-delay-3">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <svg class="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h3 class="text-xl font-display font-bold text-white mb-3">{{ t('aboutValues') }}</h3>
          <ul class="space-y-2.5">
            <li class="flex items-center gap-2.5 text-sm text-slate-400 font-body">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0"></span>
              {{ t('aboutValue1') }}
            </li>
            <li class="flex items-center gap-2.5 text-sm text-slate-400 font-body">
              <span class="w-1.5 h-1.5 rounded-full bg-accent-400 flex-shrink-0"></span>
              {{ t('aboutValue2') }}
            </li>
            <li class="flex items-center gap-2.5 text-sm text-slate-400 font-body">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
              {{ t('aboutValue3') }}
            </li>
            <li class="flex items-center gap-2.5 text-sm text-slate-400 font-body">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"></span>
              {{ t('aboutValue4') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
