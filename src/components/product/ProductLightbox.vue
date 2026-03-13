<script setup>
defineProps({
  open: { type: Boolean, default: false },
  gallery: { type: Array, required: true },
  productName: { type: String, required: true },
  currentIndex: { type: Number, default: 0 }
})

defineEmits(['close', 'prev', 'next'])
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8" @click.self="$emit('close')">
        <div class="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" @click="$emit('close')"></div>
        <div class="relative w-full max-w-5xl animate-scale-in">
          <button @click="$emit('close')" class="absolute -top-12 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/10 text-slate-400 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div class="relative overflow-hidden rounded-xl border border-white/[0.08] shadow-2xl">
            <img :src="gallery[currentIndex]" :alt="`${productName} - ${currentIndex + 1}`" class="h-auto max-h-[80vh] w-full bg-slate-900 object-contain" />
          </div>
          <div v-if="gallery.length > 1" class="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white/70 font-display backdrop-blur-sm">
            {{ currentIndex + 1 }} / {{ gallery.length }}
          </div>
          <button v-if="gallery.length > 1" @click.stop="$emit('prev')" class="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-black/50 text-white/70 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button v-if="gallery.length > 1" @click.stop="$emit('next')" class="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-xl bg-black/50 text-white/70 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
