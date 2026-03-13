<script setup>
defineProps({
  items: { type: Array, required: true },
  lang: { type: String, required: true }
})
</script>

<template>
  <section v-if="items.length" class="relative overflow-hidden py-16 md:py-20">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none"></div>
    <div class="container-section relative z-10">
      <div class="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div class="reveal">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-display font-medium text-slate-300 mb-6">
            {{ lang === 'pt' ? 'Perguntas frequentes' : 'Frequently asked questions' }}
          </span>
          <h2 class="heading-section text-white mb-6">
            {{ lang === 'pt' ? 'Perguntas que ajudam a tirar a decisao do caminho' : 'Questions that remove friction from the decision' }}
          </h2>
        </div>
        <div class="grid gap-4">
          <article v-for="item in items" :key="item.q" class="reveal rounded-[1.5rem] border border-white/[0.06] bg-white/[0.035] p-6">
            <h3 class="mb-3 text-base font-display font-semibold text-white">{{ item.q }}</h3>
            <p class="text-sm text-slate-400 font-body leading-relaxed">{{ item.a }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
