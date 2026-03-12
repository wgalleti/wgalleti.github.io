<script setup>
import { inject } from 'vue'

defineProps({
  currentLang: String
})

const t = inject('t')

const steps = [
  {
    number: '01',
    titleKey: 'processStep1Title',
    descKey: 'processStep1Desc'
  },
  {
    number: '02',
    titleKey: 'processStep2Title',
    descKey: 'processStep2Desc'
  },
  {
    number: '03',
    titleKey: 'processStep3Title',
    descKey: 'processStep3Desc'
  },
  {
    number: '04',
    titleKey: 'processStep4Title',
    descKey: 'processStep4Desc'
  }
]
</script>

<template>
  <section id="process" class="section-padding relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.1),transparent_28%)] pointer-events-none"></div>

    <div class="container-section relative z-10">
      <div class="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div class="reveal">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-accent-500/10 text-accent-300 border border-accent-500/20 mb-6">
            {{ t('processTag') }}
          </span>
          <h2 class="heading-section text-white mb-6">{{ t('processTitle') }}</h2>
          <p class="text-lg text-slate-400 font-body leading-relaxed max-w-xl">
            {{ t('processDescription') }}
          </p>
        </div>

        <div class="grid gap-4">
          <article
            v-for="(step, index) in steps"
            :key="step.number"
            class="card-glass p-6 md:p-7 reveal"
            :class="`reveal-delay-${index + 1}`"
          >
            <div class="flex flex-col gap-4 md:flex-row md:items-start">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/[0.08] text-sm font-display font-bold text-accent-300">
                {{ step.number }}
              </div>
              <div>
                <h3 class="text-xl font-display font-bold text-white mb-2">
                  {{ t(step.titleKey) }}
                </h3>
                <p class="text-sm md:text-base text-slate-400 font-body leading-relaxed">
                  {{ t(step.descKey) }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
