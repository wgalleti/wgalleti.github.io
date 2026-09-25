<script setup>
import { computed, inject, ref } from 'vue'
import { useNetwork3D } from '@/composables/useNetwork3D'

const t = inject('t')
const canvas = ref(null)
const labels = computed(() => t('netLabels'))
useNetwork3D(canvas, labels)
</script>

<template>
  <section id="topo" class="relative overflow-hidden" style="min-height: 100svh">
    <div
      class="h-glow absolute rounded-full pointer-events-none"
      style="right: -80px; top: 120px; width: 720px; height: 720px; background: radial-gradient(closest-side, rgba(139,92,246,0.28), rgba(34,211,238,0.06) 60%, rgba(10,6,24,0))"
    ></div>
    <canvas
      ref="canvas"
      role="img"
      :aria-label="t('heroNetAria')"
      class="absolute right-0 top-[38%] h-[62%] lg:top-0 lg:h-full w-full lg:w-[60%] opacity-50 lg:opacity-100"
    ></canvas>

    <div class="home-shell relative z-10 flex flex-col justify-center" style="min-height: 100svh; padding-top: 120px; padding-bottom: 56px">
      <div class="flex flex-col gap-8 max-w-[700px]">
        <span class="mono text-[13px] uppercase text-muted" style="letter-spacing: 0.2em">{{ t('heroKicker') }}</span>
        <h1 class="m-0 font-black" style="font-size: clamp(52px, 7.2vw, 92px); line-height: 0.98; letter-spacing: -0.045em">
          {{ t('heroL1') }}<br>{{ t('heroL2') }}<br><span class="h-grad-text">{{ t('heroL3') }}</span>
        </h1>
        <p class="m-0 text-text-soft" style="font-size: clamp(18px, 1.6vw, 21px); line-height: 1.5">{{ t('heroSub') }}</p>
        <div class="flex flex-wrap gap-3.5">
          <a :href="t('whatsappUrl')" target="_blank" rel="noopener" class="h-btn-primary">
            {{ t('heroCta') }}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a href="#projetos" class="h-btn-ghost">{{ t('heroCta2') }}</a>
        </div>
      </div>

      <div class="flex flex-wrap items-end justify-between gap-6 mt-16 lg:mt-24">
        <div class="flex gap-10 sm:gap-14">
          <div class="flex items-baseline gap-2.5"><span class="text-[30px] font-black">15+</span><span class="mono text-[12px] text-muted">{{ t('heroStatYears') }}</span></div>
          <div class="flex items-baseline gap-2.5"><span class="text-[30px] font-black">50+</span><span class="mono text-[12px] text-muted">{{ t('heroStatProjects') }}</span></div>
          <div class="flex items-baseline gap-2.5"><span class="text-[30px] font-black">8</span><span class="mono text-[12px] text-muted">{{ t('heroStatSectors') }}</span></div>
        </div>
        <span class="hidden lg:inline mono text-[12px] text-muted">{{ t('heroHint') }}</span>
      </div>
    </div>
  </section>
</template>
