<script setup>
defineProps({
  product: { type: Object, required: true },
  gallery: { type: Array, required: true },
  isSaas: { type: Boolean, default: false },
  isConfidential: { type: Boolean, default: false },
  tagline: { type: String, required: true },
  whatsappUrl: { type: String, required: true },
  lang: { type: String, required: true }
})

defineEmits(['openLightbox'])
</script>

<template>
  <section class="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28" :class="isConfidential ? 'confidential-theme' : isSaas ? 'saas-theme' : ''">
    <div class="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-slate-950 to-slate-950"></div>
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>
    <div class="absolute -top-[20%] -right-[10%] h-[50vw] w-[50vw] rounded-full bg-brand-700/[0.08] blur-[120px] pointer-events-none"></div>
    <div class="absolute -bottom-[20%] -left-[10%] h-[40vw] w-[40vw] rounded-full bg-accent-500/[0.06] blur-[100px] pointer-events-none"></div>

    <div class="container-section relative z-10">
      <div class="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div class="order-2 lg:order-1">
          <div class="mb-6 animate-fade-in">
            <span v-if="product.highlight" class="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/20 px-3 py-1.5 text-[11px] font-display font-bold text-emerald-300">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {{ lang === 'pt' ? 'Projeto atual' : 'Current project' }}
            </span>
            <span v-else-if="isConfidential" class="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/20 px-3 py-1.5 text-[11px] font-display font-bold text-amber-300">
              {{ lang === 'pt' ? 'Case confidencial' : 'Confidential case' }}
            </span>
            <span v-else-if="isSaas" class="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/20 px-3 py-1.5 text-[11px] font-display font-bold text-cyan-300">
              {{ lang === 'pt' ? 'Produto SaaS' : 'SaaS product' }}
            </span>
          </div>

          <h1 class="heading-display mb-6 text-4xl leading-[1.1] animate-slide-up sm:text-5xl md:text-6xl">
            <span class="text-gradient">{{ product.name }}</span>
          </h1>

          <p class="mb-8 text-lg leading-relaxed text-slate-300 font-body animate-slide-up md:text-xl" style="animation-delay: 0.1s">
            {{ tagline }}
          </p>

          <div class="mb-10 grid gap-4 animate-slide-up sm:grid-cols-3" style="animation-delay: 0.16s">
            <div class="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] p-4">
              <p class="mb-2 text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500">{{ lang === 'pt' ? 'Tipo' : 'Type' }}</p>
              <p class="text-sm font-display font-semibold text-white">
                {{ isConfidential
                  ? (lang === 'pt' ? 'Case confidencial' : 'Confidential case')
                  : isSaas
                    ? (lang === 'pt' ? 'Produto SaaS' : 'SaaS product')
                    : (lang === 'pt' ? 'Case entregue' : 'Delivered case')
                }}
              </p>
            </div>
            <div class="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] p-4">
              <p class="mb-2 text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500">{{ lang === 'pt' ? 'Formato' : 'Format' }}</p>
              <p class="text-sm font-display font-semibold text-white">
                {{ product.technologies.includes('Flutter')
                  ? (lang === 'pt' ? 'Web + aplicativo' : 'Web + mobile app')
                  : (lang === 'pt' ? 'Plataforma web' : 'Web platform')
                }}
              </p>
            </div>
            <div class="rounded-[1.5rem] border border-white/[0.06] bg-white/[0.03] p-4">
              <p class="mb-2 text-[11px] font-display font-semibold uppercase tracking-[0.22em] text-slate-500">{{ lang === 'pt' ? 'Stack base' : 'Core stack' }}</p>
              <p class="text-sm font-display font-semibold text-white">{{ product.technologies.slice(0, 2).join(' + ') }}</p>
            </div>
          </div>

          <div class="mb-10 flex flex-wrap gap-2 animate-slide-up" style="animation-delay: 0.2s">
            <span v-for="tech in product.technologies" :key="tech" class="badge-tech !text-xs !px-3 !py-1.5">{{ tech }}</span>
          </div>

          <div class="flex flex-col gap-4 animate-slide-up sm:flex-row" style="animation-delay: 0.3s">
            <a v-if="product.url && !product.confidential" :href="product.url" target="_blank" rel="noopener" class="btn-primary text-base !py-4 !px-8">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              {{ lang === 'pt' ? 'Ver produto' : 'Open product' }}
            </a>
            <a v-if="product.confidential && product.clientUrl" :href="product.clientUrl" target="_blank" rel="noopener" class="btn-secondary text-base !py-4 !px-8">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
              {{ lang === 'pt' ? 'Site do cliente' : 'Client website' }}
            </a>
            <a :href="whatsappUrl" target="_blank" rel="noopener" class="btn-whatsapp text-base !py-4 !px-8">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {{ lang === 'pt' ? 'Falar no WhatsApp' : 'Chat on WhatsApp' }}
            </a>
          </div>
        </div>

        <div class="order-1 lg:order-2 animate-fade-in" style="animation-delay: 0.2s">
          <div v-if="gallery.length > 0" class="relative group">
            <div class="relative overflow-hidden rounded-xl border border-white/[0.08] shadow-2xl shadow-brand-500/10">
              <div class="flex items-center gap-3 border-b border-white/[0.06] bg-slate-800/80 px-4 py-3 backdrop-blur-sm">
                <div class="flex items-center gap-1.5">
                  <div class="h-3 w-3 rounded-full bg-red-500/60"></div>
                  <div class="h-3 w-3 rounded-full bg-yellow-500/60"></div>
                  <div class="h-3 w-3 rounded-full bg-green-500/60"></div>
                </div>
                <div class="mx-4 flex-1">
                  <div class="truncate rounded-md bg-slate-900/60 px-3 py-1 font-mono text-[11px] text-slate-500">
                    {{ product.url || `${product.name.toLowerCase().replace(/\s+/g, '')}.app` }}
                  </div>
                </div>
              </div>
              <div class="relative aspect-video cursor-pointer overflow-hidden bg-gradient-to-br from-brand-950 to-slate-900" @click="$emit('openLightbox', 0)">
                <img :src="gallery[0]" :alt="product.name" class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" loading="eager" />
                <div class="absolute inset-0 flex items-center justify-center bg-brand-900/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span class="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-display font-medium text-white backdrop-blur-sm">
                    <svg class="inline-block w-4 h-4 mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    {{ lang === 'pt' ? 'Ampliar' : 'Enlarge' }}
                  </span>
                </div>
              </div>
            </div>
            <div class="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-brand-500/20 via-accent-500/10 to-brand-500/20 blur-2xl opacity-40 transition-opacity duration-700 group-hover:opacity-60"></div>
          </div>

          <div v-else class="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-brand-950 to-slate-900">
            <div class="text-center">
              <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500/10">
                <svg class="w-10 h-10 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <p class="text-sm text-slate-500 font-body">
                {{ product.confidential ? (lang === 'pt' ? 'Projeto confidencial' : 'Confidential project') : (lang === 'pt' ? 'Preview em breve' : 'Preview coming soon') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
  </section>
</template>

<style scoped>
.saas-theme::before,
.confidential-theme::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.saas-theme::before {
  background: radial-gradient(circle at top right, rgba(14, 165, 233, 0.12), transparent 28%);
}

.confidential-theme::before {
  background: radial-gradient(circle at top right, rgba(245, 158, 11, 0.12), transparent 28%);
}
</style>
