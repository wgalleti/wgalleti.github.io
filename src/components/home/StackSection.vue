<script setup>
import { inject } from 'vue'
import SectionNode from './SectionNode.vue'

const t = inject('t')

const rowA = ['Python', 'Django', 'DRF', 'Go', 'Celery', 'PostgreSQL', 'Redis', 'FastAPI']
const rowB = ['Vue 3', 'PrimeVue', 'Nuxt', 'HTMX', 'Tailwind', 'Flutter', 'Dart', 'Supabase']
const rowC = ['Claude', 'OpenAI', 'Gemini', 'Claude Code', 'Codex', 'MediaPipe', 'Docker', 'AWS', 'Cloudflare']
const rows = [
  { items: [...rowA, ...rowA], cls: 'h-mq', border: '#3D2C78', color: '#EDEAFF' },
  { items: [...rowB, ...rowB], cls: 'h-mq2', border: '#2D1F5E', color: '#B6AED6' },
  { items: [...rowC, ...rowC], cls: 'h-mq3', border: '#1E1440', color: '#8E87B3' },
]
</script>

<template>
  <section id="stack" class="relative overflow-hidden" style="padding-top: 110px; padding-bottom: 20px">
    <SectionNode />
    <div class="home-shell h-reveal flex flex-col lg:flex-row lg:justify-between lg:items-end gap-5">
      <div class="flex flex-col gap-4">
        <span class="h-eyebrow">05 — {{ t('stackEyebrow') }}</span>
        <h2 class="h-title">{{ t('stackTitle') }}</h2>
      </div>
      <p class="m-0 lg:mb-2.5 text-[20px] text-text-soft">{{ t('stackSub') }}</p>
    </div>

    <!-- faixas de tecnologia sobre um plano inclinado -->
    <div class="h-fade-x relative mt-10 h-[260px] sm:h-[360px]" style="perspective: 900px">
      <p class="sr-only">{{ [...rowA, ...rowB, ...rowC].join(', ') }}</p>
      <div class="absolute flex flex-col gap-4 sm:gap-[22px]" style="left: -200px; right: -200px; top: 20px; transform: rotateX(48deg); transform-origin: center 40%" aria-hidden="true">
        <div v-for="(r, i) in rows" :key="i" class="flex gap-4 sm:gap-[18px] w-max" :class="r.cls">
          <span
            v-for="(x, j) in r.items"
            :key="j"
            class="shrink-0 mono rounded-full text-[18px] sm:text-[26px]"
            :style="{ padding: '16px 28px', border: '1px solid ' + r.border, background: 'rgba(17,10,38,0.85)', color: r.color }"
          >{{ x }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
