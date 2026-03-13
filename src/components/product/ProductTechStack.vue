<script setup>
defineProps({
  technologies: { type: Array, required: true },
  lang: { type: String, required: true }
})
</script>

<template>
  <section class="relative py-16 md:py-20">
    <div class="container-section">
      <div class="reveal">
        <div class="rounded-[2rem] border border-white/[0.06] bg-white/[0.03] p-8 md:p-10">
          <div class="flex flex-col gap-6 md:flex-row md:items-center">
            <div class="flex-1">
              <h3 class="mb-2 text-lg font-display font-semibold text-white">{{ lang === 'pt' ? 'Construído com' : 'Built with' }}</h3>
              <p class="text-sm text-slate-400 font-body">{{ lang === 'pt' ? 'As tecnologias que tornam isso possível' : 'The technologies that make it possible' }}</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <span v-for="tech in technologies" :key="tech" class="rounded-xl border border-brand-500/20 bg-brand-500/10 px-5 py-2.5 text-sm font-display font-medium text-brand-200 transition-all duration-300 hover:border-brand-400/30 hover:bg-brand-500/20">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
