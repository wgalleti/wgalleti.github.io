<script setup>
import { computed, inject } from 'vue'

defineProps({
  currentLang: String
})

const t = inject('t')
const technologies = inject('technologies')

const coreStack = computed(() => technologies.value.slice(0, 6))
const productStack = computed(() => technologies.value.slice(6))
</script>

<template>
  <section id="tech" class="section-padding relative overflow-hidden">
    <div class="container-section relative z-10">
      <div class="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div class="reveal">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6">
            {{ t('techTag') }}
          </span>
          <h2 class="heading-section text-white mb-6">{{ t('techTitle') }}</h2>
          <p class="text-lg text-slate-400 max-w-xl font-body leading-relaxed mb-8">{{ t('techDescription') }}</p>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-5">
              <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-brand-300 mb-2">{{ t('techPillar1Label') }}</p>
              <p class="text-sm text-slate-300 font-body leading-relaxed">{{ t('techPillar1Text') }}</p>
            </div>
            <div class="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-5">
              <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-accent-300 mb-2">{{ t('techPillar2Label') }}</p>
              <p class="text-sm text-slate-300 font-body leading-relaxed">{{ t('techPillar2Text') }}</p>
            </div>
            <div class="rounded-[1.75rem] border border-white/[0.06] bg-white/[0.03] p-5">
              <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-emerald-300 mb-2">{{ t('techPillar3Label') }}</p>
              <p class="text-sm text-slate-300 font-body leading-relaxed">{{ t('techPillar3Text') }}</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6">
          <div class="reveal reveal-delay-1 rounded-[2rem] border border-white/[0.06] bg-white/[0.035] p-6">
            <div class="flex items-center justify-between gap-4 mb-5">
              <div>
                <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">{{ t('techGroup1Label') }}</p>
                <h3 class="text-xl font-display font-bold text-white">{{ t('techGroup1Title') }}</h3>
              </div>
              <div class="hidden sm:block text-right">
                <p class="text-2xl font-display font-bold text-white">{{ coreStack.length }}</p>
                <p class="text-xs text-slate-500 font-body">{{ t('techGroup1Meta') }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div
                v-for="tech in coreStack"
                :key="tech.slug"
                class="rounded-2xl border border-white/[0.06] bg-slate-950/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12]"
              >
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                  <img
                    :src="`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`"
                    :alt="tech.name"
                    class="h-8 w-8"
                    loading="lazy"
                  />
                </div>
                <p class="text-sm font-display font-semibold text-white">{{ tech.name }}</p>
              </div>
            </div>
          </div>

          <div class="reveal reveal-delay-2 rounded-[2rem] border border-white/[0.06] bg-white/[0.035] p-6">
            <div class="flex items-center justify-between gap-4 mb-5">
              <div>
                <p class="text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500 mb-2">{{ t('techGroup2Label') }}</p>
                <h3 class="text-xl font-display font-bold text-white">{{ t('techGroup2Title') }}</h3>
              </div>
              <div class="hidden sm:block text-right">
                <p class="text-2xl font-display font-bold text-white">{{ productStack.length }}</p>
                <p class="text-xs text-slate-500 font-body">{{ t('techGroup2Meta') }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div
                v-for="tech in productStack"
                :key="tech.slug"
                class="rounded-2xl border border-white/[0.06] bg-slate-950/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12]"
              >
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04]">
                  <img
                    :src="`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`"
                    :alt="tech.name"
                    class="h-8 w-8"
                    loading="lazy"
                  />
                </div>
                <p class="text-sm font-display font-semibold text-white">{{ tech.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
