<script setup>
import { computed, inject } from 'vue'
import SectionNode from './SectionNode.vue'

const t = inject('t')

const shots = computed(() => [
  { name: 'easyimóvel', meta: t('projMetaEasy'), color: '#6B9BF2', img: '/home/easyimovel.jpg', href: null },
  { name: 'workHard', meta: t('projMetaWork'), color: '#A78BFA', img: '/products/workhard/01.png', href: 'https://workhardapp.com.br' },
  { name: 'DojoHub', meta: t('projMetaDojo'), color: '#A78BFA', img: '/products/dojohub/01.jpg', href: 'https://www.dojohub.com.br' },
  { name: 'Zenith BJJ', meta: t('projMetaZenith'), color: '#F5B942', img: '/home/zenith.jpg', href: 'https://www.zenithbjjmt.com.br' },
])
const pillarIcons = [
  'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  'M4 7h10M18 7h2M4 17h2M10 17h10M16 5a2 2 0 1 0 0 4a2 2 0 1 0 0-4M8 15a2 2 0 1 0 0 4a2 2 0 1 0 0-4',
  'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 7v5l3 3',
]
const also = ['wmFinanceiro', 'medHub', 'wSkills', 'primevue-components']
</script>

<template>
  <section id="projetos" class="relative" style="padding-top: 110px; padding-bottom: 40px">
    <SectionNode />
    <div class="home-shell">
      <div class="h-reveal flex flex-col lg:flex-row lg:justify-between lg:items-end gap-5">
        <div class="flex flex-col gap-4">
          <span class="h-eyebrow">04 — {{ t('projEyebrow') }}</span>
          <h2 class="h-title">{{ t('projTitle') }}</h2>
        </div>
        <p class="m-0 lg:mb-2.5 text-[20px] text-text-soft">{{ t('projSub') }}</p>
      </div>

      <!-- destaque: plataforma operacional -->
      <div class="h-reveal mt-14">
      <a
        href="https://web.grupolazarotto.com.br"
        target="_blank"
        rel="noopener"
        class="h-tilt relative block overflow-hidden rounded-[28px] lg:rounded-[32px] no-underline lg:h-[440px]"
        style="border: 1px solid #1F4A3E; background: radial-gradient(110% 120% at 100% 50%, #0F3A31 0%, #0B1A22 45%, #0A0618 100%)"
      >
        <div class="relative z-10 flex flex-col gap-5 p-7 sm:p-12 lg:absolute lg:left-12 lg:top-11 lg:p-0 lg:w-[520px]">
          <span class="mono text-[12.5px]" style="color: #34D399">{{ t('projFeatMeta') }}</span>
          <span class="font-black text-text" style="font-size: clamp(32px, 3.4vw, 46px); line-height: 1.02; letter-spacing: -0.035em">
            {{ t('projFeatTitle1') }}<br><span style="color: #34D399">{{ t('projFeatTitle2') }}</span>
          </span>
          <span class="text-[18px]" style="line-height: 1.5; color: #B6CFC8">{{ t('projFeatSub') }}</span>
          <div class="flex flex-wrap gap-3 mt-2.5">
            <span
              v-for="(p, i) in t('projFeatPillars')"
              :key="p"
              class="inline-flex items-center gap-2 rounded-full text-[14px] font-bold text-text"
              style="padding: 10px 16px; border: 1px solid #1F4A3E; background: rgba(10,6,24,0.5)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="pillarIcons[i]" /></svg>
              {{ p }}
            </span>
          </div>
        </div>
        <div class="relative h-[260px] sm:h-[340px] mx-7 sm:mx-12 lg:mx-0 lg:absolute lg:h-auto lg:left-[610px] lg:-right-10 lg:top-[50px] lg:-bottom-10" style="perspective: 1300px">
          <img
            src="/home/lazarotto-login.jpg"
            :alt="t('projFeatAlt')"
            loading="lazy"
            class="h-shot block w-full h-full object-cover object-left-top rounded-2xl"
            style="border: 1px solid #1F4A3E; box-shadow: -40px 50px 90px -20px rgba(0,0,0,0.8)"
          >
        </div>
        <div
          class="h-fl hidden lg:flex absolute items-center gap-2 mono text-[12px] rounded-[14px] z-20"
          style="left: 560px; bottom: 44px; padding: 10px 14px; border: 1px solid #1F4A3E; background: rgba(8,20,24,0.92); color: #B6CFC8; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6)"
          aria-hidden="true"
        >
          <template v-for="(f, i) in t('projFeatFlow')" :key="f">
            <span :class="i === 2 ? 'text-text' : ''">{{ f }}</span>
            <span v-if="i < 2" style="color: #34D399">→</span>
          </template>
        </div>
      </a>
      </div>

      <!-- demais projetos -->
      <div class="h-reveal mt-6 grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <component
          :is="s.href ? 'a' : 'div'"
          v-for="s in shots"
          :key="s.name"
          :href="s.href || undefined"
          :target="s.href ? '_blank' : undefined"
          :rel="s.href ? 'noopener' : undefined"
          class="h-tilt relative block h-[300px] rounded-[28px] overflow-hidden no-underline"
          style="border: 1px solid #2D1F5E; background: linear-gradient(160deg, #150D31, #0C0720)"
        >
          <div class="absolute z-10 flex flex-col gap-2" style="left: 28px; top: 26px">
            <span class="mono text-[12px]" :style="{ color: s.color }">{{ s.meta }}</span>
            <span class="text-[28px] font-black text-text" style="letter-spacing: -0.03em">{{ s.name }}</span>
          </div>
          <div class="absolute" style="left: 28px; right: -70px; top: 116px; bottom: -70px; perspective: 1000px">
            <img
              :src="s.img"
              :alt="`${t('projScreenAlt')} ${s.name}`"
              loading="lazy"
              class="h-shot block w-full h-full object-cover object-left-top rounded-xl"
              style="border: 1px solid #3D2C78; box-shadow: -30px 40px 70px -20px rgba(0,0,0,0.75)"
            >
          </div>
        </component>
      </div>

      <div class="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 mono text-[13px] text-muted">
        <span class="text-text-soft">{{ t('projAlso') }}</span>
        <span class="h-px w-10" style="background: #2D1F5E"></span>
        <template v-for="(a, i) in also" :key="a">
          <span>{{ a }}</span><span v-if="i < also.length - 1" aria-hidden="true">·</span>
        </template>
      </div>
    </div>
  </section>
</template>
