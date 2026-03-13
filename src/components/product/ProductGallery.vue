<script setup>
defineProps({
  gallery: { type: Array, required: true },
  productName: { type: String, required: true },
  lang: { type: String, required: true }
})

defineEmits(['openLightbox'])
</script>

<template>
  <section v-if="gallery.length > 1" class="relative py-12 md:py-16">
    <div class="container-section">
      <div class="reveal">
        <div class="mb-6 flex items-end justify-between gap-4">
          <div>
            <p class="mb-2 text-xs font-display font-semibold uppercase tracking-[0.22em] text-slate-500">{{ lang === 'pt' ? 'Interface' : 'Interface' }}</p>
            <h2 class="flex items-center gap-2 text-lg font-display font-semibold text-white">
              <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              {{ lang === 'pt' ? 'Galeria do produto' : 'Product gallery' }}
            </h2>
          </div>
          <span class="text-xs text-slate-500 font-body">{{ gallery.length }} {{ lang === 'pt' ? 'telas' : 'screens' }}</span>
        </div>

        <div class="scrollbar-thin flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          <button
            v-for="(img, idx) in gallery"
            :key="idx"
            class="group relative flex-shrink-0 snap-start cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300"
            :class="[idx === 0 ? 'border-brand-400/40' : 'border-white/[0.08] hover:border-brand-400/30']"
            @click="$emit('openLightbox', idx)"
          >
            <img :src="img" :alt="`${productName} - ${idx + 1}`" class="h-40 w-64 object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            <div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
              <svg class="w-8 h-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar { height: 6px; }
.scrollbar-thin::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(124, 58, 237, 0.3); border-radius: 3px; }
.scrollbar-thin::-webkit-scrollbar-thumb:hover { background: rgba(124, 58, 237, 0.5); }
</style>
