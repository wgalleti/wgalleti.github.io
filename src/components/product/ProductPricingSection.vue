<script setup>
import { computed } from 'vue'

const props = defineProps({
  plans: { type: Array, required: true },
  lang: { type: String, required: true },
  whatsappUrl: { type: String, required: true }
})

const localized = (value, fallback = '') => {
  if (!value) return fallback
  if (typeof value === 'string') return value
  return value[props.lang] || value.pt || fallback
}

const getPlanFeatures = (plan) => {
  if (Array.isArray(plan.features)) return plan.features
  return plan.features?.[props.lang] || plan.features?.pt || []
}

const comparisonRows = computed(() => {
  const labels = []

  props.plans.forEach((plan) => {
    getPlanFeatures(plan).forEach((feature) => {
      if (!labels.includes(feature)) labels.push(feature)
    })
  })

  return labels.map((feature) => ({
    feature,
    availability: props.plans.map((plan) => getPlanFeatures(plan).includes(feature))
  }))
})

</script>

<template>
  <section v-if="plans.length" class="section-padding relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none"></div>
    <div class="container-section relative z-10">
      <div class="text-center mb-16 reveal">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-6">
          {{ lang === 'pt' ? 'Planos' : 'Pricing' }}
        </span>
        <h2 class="heading-section text-white mb-6">
          {{ lang === 'pt' ? 'Comparativo de planos para escalar com clareza' : 'Plan comparison built to scale with clarity' }}
        </h2>
        <p class="mx-auto max-w-2xl font-body text-base leading-relaxed text-slate-400">
          {{ lang === 'pt'
            ? 'A pagina SaaS agora trabalha a decisao com mais forca comercial: contraste entre ofertas, destaque do plano principal e leitura rapida do que muda entre elas.'
            : 'The SaaS page now supports the buying decision more aggressively: sharper offer contrast, a clearer primary plan, and faster understanding of what changes between tiers.'
          }}
        </p>
      </div>

      <div class="grid gap-6 max-w-5xl mx-auto" :class="plans.length === 1 ? 'max-w-md' : plans.length === 2 ? 'sm:grid-cols-2 max-w-3xl' : 'sm:grid-cols-2 lg:grid-cols-3'">
        <div v-for="(plan, i) in plans" :key="localized(plan.name, `plan-${i}`)" class="relative reveal" :class="`reveal-delay-${Math.min(i + 1, 6)}`">
          <div v-if="plan.popular" class="pricing-glow absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 opacity-40 blur-[2px]"></div>
          <div class="relative h-full overflow-hidden rounded-2xl border transition-all duration-500" :class="plan.popular ? 'bg-slate-900 border-brand-400/30' : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-brand-400/20'">
            <div v-if="plan.popular" class="bg-gradient-to-r from-brand-500 to-accent-500 py-2 text-center">
              <span class="text-xs font-display font-bold uppercase tracking-wider text-white">{{ lang === 'pt' ? 'Mais Popular' : 'Most Popular' }}</span>
            </div>

            <div class="p-6 sm:p-8">
              <h3 class="mb-2 text-xl font-display font-bold text-white">{{ localized(plan.name) }}</h3>
              <div class="mb-6">
                <span class="break-words text-3xl font-display font-extrabold text-gradient md:text-4xl">{{ plan.price }}</span>
              </div>
              <p class="mb-5 text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500">{{ lang === 'pt' ? 'Inclui' : 'Includes' }}</p>
              <ul class="mb-8 space-y-3">
                <li v-for="feat in getPlanFeatures(plan)" :key="feat" class="flex items-start gap-3 text-sm text-slate-300 font-body">
                  <svg class="mt-0.5 w-5 h-5 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  {{ feat }}
                </li>
              </ul>
              <a :href="whatsappUrl" target="_blank" rel="noopener" class="block w-full text-center text-sm sm:text-base" :class="plan.popular ? 'btn-primary justify-center' : 'btn-secondary justify-center'">
                {{ lang === 'pt' ? 'Começar agora' : 'Get started' }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="comparisonRows.length && plans.length > 1" class="reveal mt-10 overflow-hidden rounded-[1.8rem] border border-white/[0.06] bg-white/[0.03]">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-white/[0.06] text-left">
            <thead class="bg-white/[0.03]">
              <tr>
                <th class="px-5 py-4 text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {{ lang === 'pt' ? 'Comparativo rapido' : 'Quick comparison' }}
                </th>
                <th
                  v-for="plan in plans"
                  :key="localized(plan.name)"
                  class="px-5 py-4 text-sm font-display font-semibold text-white"
                >
                  {{ localized(plan.name) }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/[0.06]">
              <tr v-for="row in comparisonRows" :key="row.feature">
                <td class="px-5 py-4 text-sm font-body text-slate-300">{{ row.feature }}</td>
                <td v-for="(enabled, index) in row.availability" :key="`${row.feature}-${index}`" class="px-5 py-4">
                  <span
                    class="inline-flex h-7 w-7 items-center justify-center rounded-full"
                    :class="enabled ? 'bg-emerald-500/12 text-emerald-300' : 'bg-white/[0.04] text-slate-600'"
                  >
                    <svg v-if="enabled" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-glow {
  background-size: 200% 100%;
  animation: pricingShift 4s ease-in-out infinite;
}

@keyframes pricingShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>
