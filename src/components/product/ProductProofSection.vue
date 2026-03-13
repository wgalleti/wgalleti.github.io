<script setup>
defineProps({
  items: { type: Array, required: true },
  lang: { type: String, required: true }
})
</script>

<template>
  <section v-if="items.length" class="section-padding relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none"></div>
    <div class="container-section relative z-10">
      <div class="mb-12 text-center reveal">
        <span class="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-display font-medium text-cyan-300">
          {{ lang === 'pt' ? 'Prova de maturidade' : 'Proof of maturity' }}
        </span>
        <h2 class="heading-section mt-6 text-white">
          {{ lang === 'pt' ? 'Sinais de que o produto foi pensado para operacao real' : 'Signals that this product was designed for real operations' }}
        </h2>
      </div>

      <div class="grid gap-6 lg:grid-cols-3">
        <article
          v-for="(item, index) in items"
          :key="item.title"
          class="reveal overflow-hidden rounded-[1.9rem] border border-white/[0.07] bg-white/[0.035] p-7"
          :class="index > 0 ? `reveal-delay-${Math.min(index, 2)}` : ''"
        >
          <p class="mb-4 text-xs font-display font-semibold uppercase tracking-[0.22em] text-cyan-300">{{ item.label }}</p>
          <h3 class="mb-3 text-xl font-display font-semibold text-white">{{ item.title }}</h3>
          <p class="font-body leading-relaxed text-slate-400">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
