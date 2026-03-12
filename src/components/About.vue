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
      <div class="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div class="reveal">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
            {{ t('aboutTag') }}
          </span>
          <h2 class="heading-section text-white mb-6 max-w-2xl">{{ t('aboutTitle') }}</h2>
          <p class="text-lg text-slate-400 max-w-2xl font-body leading-relaxed mb-8">{{ t('aboutDescription') }}</p>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6">
              <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-brand-300 mb-3">{{ t('aboutMission') }}</p>
              <p class="text-sm text-slate-300 font-body leading-relaxed">{{ t('aboutMissionText') }}</p>
            </div>
            <div class="rounded-3xl border border-white/[0.06] bg-white/[0.03] p-6">
              <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-accent-300 mb-3">{{ t('aboutVision') }}</p>
              <p class="text-sm text-slate-300 font-body leading-relaxed">{{ t('aboutVisionText') }}</p>
            </div>
          </div>
        </div>

        <div class="grid gap-5">
          <div class="card-glass p-8 reveal reveal-delay-1">
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10">
                <svg class="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-display font-bold text-white mb-4">{{ t('aboutValues') }}</h3>
                <ul class="space-y-3">
                  <li class="flex items-center gap-2.5 text-sm text-slate-300 font-body">
                    <span class="w-2 h-2 rounded-full bg-brand-400 flex-shrink-0"></span>
                    {{ t('aboutValue1') }}
                  </li>
                  <li class="flex items-center gap-2.5 text-sm text-slate-300 font-body">
                    <span class="w-2 h-2 rounded-full bg-accent-400 flex-shrink-0"></span>
                    {{ t('aboutValue2') }}
                  </li>
                  <li class="flex items-center gap-2.5 text-sm text-slate-300 font-body">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
                    {{ t('aboutValue3') }}
                  </li>
                  <li class="flex items-center gap-2.5 text-sm text-slate-300 font-body">
                    <span class="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></span>
                    {{ t('aboutValue4') }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2 reveal reveal-delay-2">
            <div class="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-brand-500/10 to-transparent p-6">
              <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">15+</p>
              <p class="text-lg font-display font-bold text-white">Anos construindo software com contexto de negocio</p>
            </div>
            <div class="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-accent-500/10 to-transparent p-6">
              <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">B2B + Produto</p>
              <p class="text-lg font-display font-bold text-white">Experiencia em operacao, servico e produto digital</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
