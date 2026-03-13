<script setup>
defineProps({
  steps: { type: Array, required: true },
  lang: { type: String, required: true }
})
</script>

<template>
  <section v-if="steps.length" class="relative overflow-hidden py-16 md:py-20">
    <div class="container-section">
      <div class="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div class="reveal">
          <span class="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-display font-medium text-emerald-300">
            {{ lang === 'pt' ? 'Onboarding' : 'Onboarding' }}
          </span>
          <h2 class="heading-section mt-6 text-white">
            {{ lang === 'pt' ? 'Como a entrada do time acontece sem caos operacional' : 'How the team gets started without operational chaos' }}
          </h2>
          <p class="mt-6 max-w-xl font-body text-base leading-relaxed text-slate-400">
            {{ lang === 'pt'
              ? 'A pagina deixa claro que o produto nao termina na venda. Existe um caminho de implantacao para acelerar adesao e reduzir atrito.'
              : 'The page now makes it clear that the product does not end at the sale. There is an implementation path designed to speed up adoption and reduce friction.'
            }}
          </p>
        </div>

        <div class="grid gap-4">
          <article
            v-for="(step, index) in steps"
            :key="step.title"
            class="reveal rounded-[1.6rem] border border-white/[0.06] bg-white/[0.035] p-6 md:p-7"
            :class="index > 0 ? `reveal-delay-${Math.min(index, 3)}` : ''"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500/12 text-sm font-display font-bold text-emerald-300">
                0{{ index + 1 }}
              </div>
              <div>
                <h3 class="mb-2 text-lg font-display font-semibold text-white">{{ step.title }}</h3>
                <p class="font-body text-sm leading-relaxed text-slate-400">{{ step.description }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
