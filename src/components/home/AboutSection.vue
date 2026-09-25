<script setup>
import { inject } from 'vue'
import SectionNode from './SectionNode.vue'

const t = inject('t')
</script>

<template>
  <section id="sobre" class="relative" style="padding-top: 110px; padding-bottom: 80px">
    <SectionNode />
    <div class="home-shell h-reveal grid lg:grid-cols-[460px_1fr] gap-14 lg:gap-[100px] items-center">
      <div class="relative mx-auto lg:mx-0 w-[300px] h-[375px] sm:w-[400px] sm:h-[500px]" style="perspective: 1200px">
        <div class="h-fl absolute inset-0" style="transform-style: preserve-3d">
          <div class="absolute rounded-[28px]" style="left: 11%; top: 9%; width: 89%; height: 91%; border: 1.5px solid #22D3EE; opacity: 0.5"></div>
          <div class="absolute rounded-[28px]" style="left: 5.5%; top: 4.5%; width: 89%; height: 91%; border: 1.5px solid #8B5CF6; opacity: 0.7"></div>
          <img
            src="/image.jpeg"
            alt="William Galleti"
            loading="lazy"
            class="absolute left-0 top-0 block object-cover rounded-[28px]"
            style="width: 89%; height: 91%; object-position: center 16%; box-shadow: 0 50px 90px -40px rgba(139,92,246,0.6)"
          >
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <span class="h-eyebrow">06 — {{ t('aboutEyebrow') }}</span>
        <h2 class="h-title-xl">{{ t('aboutTitle') }}</h2>
        <p class="m-0 text-text-soft" style="font-size: clamp(21px, 2vw, 26px); line-height: 1.4">{{ t('aboutSub1') }}<br>{{ t('aboutSub2') }}</p>
        <div class="flex flex-wrap gap-2.5 mt-2">
          <span v-for="c in t('aboutChips')" :key="c" class="mono text-[13px] text-text rounded-full" style="padding: 10px 16px; border: 1px solid #2D1F5E">{{ c }}</span>
        </div>
        <div class="flex gap-8 mt-5 mono text-[14px]">
          <a href="https://github.com/wgalleti" target="_blank" rel="noopener" class="text-text-soft hover:text-cyan no-underline">github ↗</a>
          <a href="https://www.linkedin.com/in/wgalleti" target="_blank" rel="noopener" class="text-text-soft hover:text-cyan no-underline">linkedin ↗</a>
        </div>
      </div>
    </div>
  </section>
</template>
