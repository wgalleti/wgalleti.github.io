<script setup>
import { computed, inject } from 'vue'
import SectionNode from './SectionNode.vue'

const t = inject('t')

const layerStyles = [
  { z: '0px', delay: '0s', border: '1.5px solid #3D2C78', bg: 'rgba(29,18,66,0.85)', color: '#8E87B3', tag: '#3D2C78' },
  { z: '70px', delay: '-0.5s', border: '1.5px solid #5B47C2', bg: 'rgba(40,26,92,0.75)', color: '#B6AED6', tag: '#5B47C2' },
  { z: '140px', delay: '-1s', border: '1.5px solid #8B5CF6', bg: 'rgba(76,48,160,0.55)', color: '#EDEAFF', tag: '#A78BFA' },
  { z: '210px', delay: '-1.5s', border: '2px solid #22D3EE', bg: 'rgba(34,211,238,0.12)', color: '#22D3EE', tag: '#22D3EE', glow: true },
]
const layers = computed(() => t('iaLayers').map((l, i) => ({ ...l, ...layerStyles[i] })))
const flow = computed(() => t('iaFlow'))
</script>

<template>
  <section id="ia" class="relative" style="padding-top: 40px; padding-bottom: 40px">
    <SectionNode />
    <div class="h-reveal relative mx-4 lg:ml-[130px] lg:mr-[60px] rounded-[32px] lg:rounded-[40px] overflow-hidden" style="border: 1px solid #2D1F5E; background: radial-gradient(120% 90% at 85% 50%, #22124F 0%, #120A2A 45%, #0B0620 100%)">
      <div class="absolute left-0 right-0 bottom-0" style="height: 1px; background: linear-gradient(90deg, rgba(139,92,246,0), #8B5CF6, rgba(34,211,238,0))"></div>
      <div class="grid lg:grid-cols-2 gap-6 items-center p-7 sm:p-12 lg:p-[72px]">
        <div class="flex flex-col gap-6 relative z-10">
          <span class="h-eyebrow">02 — {{ t('iaEyebrow') }}</span>
          <h2 class="h-title-xl">{{ t('iaTitle1') }}<br>{{ t('iaTitle2') }}</h2>
          <p class="m-0 text-text-soft" style="font-size: clamp(18px, 1.7vw, 22px); line-height: 1.45">{{ t('iaSub1') }}<br>{{ t('iaSub2') }}</p>
          <div class="flex flex-wrap items-center gap-2.5 mt-2 mono text-[13px]">
            <template v-for="(step, i) in flow" :key="step">
              <span
                class="rounded-xl"
                :style="i === flow.length - 1
                  ? 'padding: 10px 14px; border: 1px solid #22D3EE; color: #22D3EE; background: rgba(34,211,238,0.08)'
                  : 'padding: 10px 14px; border: 1px solid #3D2C78; background: rgba(10,6,24,0.6)'"
              >{{ step }}</span>
              <span v-if="i < flow.length - 1" :style="{ color: i === flow.length - 2 ? '#22D3EE' : '#6B7FE8' }" aria-hidden="true">→</span>
            </template>
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <span v-for="u in t('iaUseCases')" :key="u" class="h-chip">{{ u }}</span>
          </div>
        </div>

        <!-- pilha isométrica: o pipeline do agente -->
        <div class="relative flex items-center justify-center h-[420px] sm:h-[520px] lg:h-[600px]" style="perspective: 1400px" aria-hidden="true">
          <div class="relative scale-[0.7] sm:scale-[0.85] lg:scale-100" style="width: 300px; height: 300px; transform-style: preserve-3d">
            <div class="relative w-full h-full" style="transform: rotateX(58deg) rotateZ(-42deg); transform-style: preserve-3d">
              <div class="absolute rounded-[30px]" style="inset: -30px; background: radial-gradient(closest-side, rgba(139,92,246,0.35), rgba(139,92,246,0)); transform: translateZ(-20px)"></div>
              <div
                v-for="l in layers"
                :key="l.title"
                class="h-lay absolute inset-0 rounded-[22px] mono box-border"
                :style="{ '--z': l.z, animationDelay: l.delay, border: l.border, background: l.bg, color: l.color, padding: '22px', fontSize: '16px', boxShadow: l.glow ? '0 0 60px rgba(34,211,238,0.25)' : 'none' }"
              >
                {{ l.title }}
                <div v-if="l.tags.length" class="mt-[18px] flex gap-2 text-[11px]">
                  <span v-for="tag in l.tags" :key="tag" class="rounded-md" :style="{ padding: '4px 8px', border: '1px solid ' + l.tag }">{{ tag }}</span>
                </div>
                <div v-else class="mt-[18px] text-[11px]" style="color: #B6E9F3">{{ t('iaReviewed') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
