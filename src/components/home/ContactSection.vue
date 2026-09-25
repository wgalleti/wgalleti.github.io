<script setup>
import { inject } from 'vue'
import SectionNode from './SectionNode.vue'

const t = inject('t')
const LOGO = 'M8 38 C14 22, 26 20, 26 32 C26 44, 12 46, 14 34 C16 24, 30 22, 36 34 L46 64 L57 28 L68 64 L79 22'
</script>

<template>
  <section id="contato" class="relative" style="padding-top: 40px; padding-bottom: 60px">
    <SectionNode />
    <div
      class="h-reveal relative mx-4 lg:ml-[130px] lg:mr-[60px] rounded-[32px] lg:rounded-[40px] overflow-hidden flex flex-col items-center text-center gap-8 px-6 py-16 lg:py-[70px]"
      style="border: 1px solid #3D2C78; background: radial-gradient(90% 120% at 50% 0%, #2A1766 0%, #140B34 50%, #0A0618 100%)"
    >
      <svg class="w-[150px] h-[133px] lg:w-[200px] lg:h-[178px]" viewBox="0 0 90 80" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="contact-grad" x1="8" y1="40" x2="82" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#8B5CF6" /><stop offset="100%" stop-color="#22D3EE" />
          </linearGradient>
        </defs>
        <path :d="LOGO" stroke="#2D1F5E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <path class="h-draw" pathLength="100" :d="LOGO" stroke="url(#contact-grad)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <circle class="h-glow" cx="79" cy="22" r="4" fill="#22D3EE" />
      </svg>
      <span class="h-eyebrow">07 — {{ t('contactEyebrow') }}</span>
      <h2 class="m-0 font-black" style="font-size: clamp(52px, 8vw, 104px); line-height: 0.95; letter-spacing: -0.05em">{{ t('contactTitle') }}<span class="text-cyan">?</span></h2>
      <div class="flex flex-wrap items-center justify-center gap-7">
        <a :href="t('whatsappUrl')" target="_blank" rel="noopener" class="h-btn-primary" style="height: 60px; padding: 0 32px; font-size: 17px">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" /></svg>
          {{ t('contactCta') }}
        </a>
        <a href="mailto:william.galleti@gmail.com" class="mono text-[15px] text-text-soft hover:text-cyan no-underline">william.galleti@gmail.com</a>
      </div>
    </div>
  </section>
</template>
