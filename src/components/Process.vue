<script setup>
import { inject } from 'vue'

const t = inject('t')

// Ícones: balão / lápis / escudo-check
const ICONS = [
  '<path d="M20 14a2 2 0 0 1-2 2H9.5L5 19.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8z"></path><path d="M9 10h.01M12 10h.01M15 10h.01"></path>',
  '<path d="M4 20l1.2-4.2L16.4 4.6a2.1 2.1 0 0 1 3 3L8.2 18.8 4 20z"></path><path d="M14.5 6.5l3 3"></path>',
  '<path d="M12 3l7 2.8v5.4c0 4.3-2.9 7.3-7 8.8-4.1-1.5-7-4.5-7-8.8V5.8L12 3z"></path><path d="M9.2 11.8l2 2 3.8-3.8"></path>',
]

const steps = [
  { num: '01', titleKey: 'line1Title', descKey: 'line1Desc', color: '#8B5CF6', stroke: '#A78BFA', chipClass: 'icon-chip', icon: ICONS[0] },
  { num: '02', titleKey: 'line2Title', descKey: 'line2Desc', color: '#6B7FE8', stroke: '#8FA2F0', chipClass: 'icon-chip icon-chip-mid', icon: ICONS[1] },
  { num: '03', titleKey: 'line3Title', descKey: 'line3Desc', color: '#22D3EE', stroke: '#22D3EE', chipClass: 'icon-chip icon-chip-cyan', icon: ICONS[2] },
]
</script>

<template>
  <section
    id="processo"
    class="container-shell flex flex-col"
    style="padding-top: 110px; gap: 36px;"
  >
    <div class="reveal flex flex-col" style="gap: 14px;">
      <span class="eyebrow">{{ t('lineEyebrow') }}</span>
      <h2 class="h2-section">{{ t('lineTitle') }}</h2>
    </div>

    <div class="reveal">
      <svg width="100%" height="56" viewBox="0 0 1000 56" fill="none" preserveAspectRatio="none" style="display: block;">
        <defs>
          <linearGradient id="procGrad" x1="0" y1="28" x2="1000" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#22D3EE" />
          </linearGradient>
        </defs>
        <path
          d="M12 32 C18 16, 32 14, 32 26 C32 38, 16 40, 18 28 C20 18, 36 16, 44 28 L972 28"
          stroke="url(#procGrad)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
        <circle cx="984" cy="28" r="5" fill="#22D3EE" />
      </svg>

      <div class="line-grid" style="padding-top: 20px;">
        <article
          v-for="step in steps"
          :key="step.num"
          class="line-card"
        >
          <div class="flex items-center justify-between">
            <span class="font-mono" :style="{ fontSize: '28px', fontWeight: 700, color: step.color }">{{ step.num }}</span>
            <div :class="step.chipClass">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" :stroke="step.stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" v-html="step.icon" />
            </div>
          </div>
          <h3 class="m-0" style="font-size: 19px; font-weight: 600;">{{ t(step.titleKey) }}</h3>
          <p class="text-muted m-0" style="font-size: 14.5px; line-height: 1.6;">{{ t(step.descKey) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 18px;
}

.line-card {
  background: #110A26;
  border: 1px solid #2D1F5E;
  border-radius: 18px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
