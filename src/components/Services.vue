<script setup>
import { inject } from 'vue'

defineProps({
  currentLang: String
})

const t = inject('t')

const serviceIcons = [
  // Web Systems
  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
  // Mobile Apps
  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
  // Process Automation
  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>',
  // Technical Consulting
  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>',
  // APIs & Integrations
  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
  // Cloud & DevOps
  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>'
]

const gradients = [
  'from-brand-500/20 to-brand-600/10',
  'from-accent-500/20 to-accent-600/10',
  'from-emerald-500/20 to-emerald-600/10',
  'from-amber-500/20 to-amber-600/10',
  'from-rose-500/20 to-rose-600/10',
  'from-cyan-500/20 to-cyan-600/10',
]

const iconColors = [
  'text-brand-400',
  'text-accent-400',
  'text-emerald-400',
  'text-amber-400',
  'text-rose-400',
  'text-cyan-400',
]

const whatsappUrl = 'https://wa.me/5565999448004?text=' + encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da wGalleti Tech.')
</script>

<template>
  <section id="services" class="section-padding relative overflow-hidden">
    <!-- Background accent -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none"></div>

    <div class="container-section relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16 reveal">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
          {{ t('servicesTag') }}
        </span>
        <h2 class="heading-section text-white mb-6">{{ t('servicesTitle') }}</h2>
        <p class="text-lg text-slate-400 max-w-2xl mx-auto font-body">{{ t('servicesDescription') }}</p>
      </div>

      <!-- Services grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(_, i) in 6"
          :key="i"
          class="card-glass p-7 group reveal"
          :class="['reveal-delay-' + (i + 1)]"
        >
          <!-- Icon -->
          <div :class="['w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500', gradients[i]]">
            <svg :class="['w-6 h-6', iconColors[i]]" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="serviceIcons[i]"></svg>
          </div>

          <!-- Content -->
          <h3 class="text-lg font-display font-bold text-white mb-2">{{ t('service' + (i + 1) + 'Title') }}</h3>
          <p class="text-sm text-slate-400 font-body leading-relaxed">{{ t('service' + (i + 1) + 'Desc') }}</p>

          <!-- Hover arrow -->
          <div class="mt-5 flex items-center gap-2 text-xs font-display font-medium text-brand-400 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <a :href="whatsappUrl" target="_blank" rel="noopener" class="hover:underline">{{ t('learnMore') }}</a>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
