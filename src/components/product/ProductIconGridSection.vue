<script setup>
defineProps({
  badge: { type: String, required: true },
  title: { type: String, required: true },
  badgeClass: { type: String, required: true },
  iconWrapClass: { type: String, required: true },
  iconColorClass: { type: String, required: true },
  sectionClass: { type: String, default: '' },
  items: { type: Array, required: true },
  layout: { type: String, default: 'grid' },
  leading: { type: String, default: '' }
})
</script>

<template>
  <section v-if="items.length" class="section-padding relative overflow-hidden" :class="sectionClass">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none"></div>
    <div class="container-section relative z-10">
      <div :class="layout === 'split' ? 'grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start' : ''">
        <div class="reveal" :class="layout === 'split' ? '' : 'text-center mb-16'">
          <span :class="['inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium border mb-6', badgeClass]">{{ badge }}</span>
          <h2 class="heading-section text-white mb-6">{{ title }}</h2>
          <p v-if="leading" class="text-base md:text-lg text-slate-300 font-body leading-relaxed">{{ leading }}</p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" :class="layout === 'split' ? 'lg:grid-cols-2' : ''">
          <div
            v-for="(item, index) in items"
            :key="item.title"
            class="group reveal rounded-[1.75rem] border border-white/[0.06] bg-white/[0.035] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.05]"
            :class="`reveal-delay-${Math.min(index + 1, 6)}`"
          >
            <div :class="['mb-4 flex h-10 w-10 items-center justify-center rounded-xl', iconWrapClass]">
              <svg :class="['w-5 h-5', iconColorClass]" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                <path :d="item.iconPath"/>
              </svg>
            </div>
            <h3 class="mb-2 text-base font-display font-semibold text-white">{{ item.title }}</h3>
            <p class="text-sm text-slate-400 font-body leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
