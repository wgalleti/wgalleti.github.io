<script setup>
import { inject } from 'vue'

const products = inject('products')
const emit = defineEmits(['edit', 'add'])

const moveUp = (i) => {
  if (i === 0) return
  const arr = [...products.value]
  ;[arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
  products.value = arr
}

const moveDown = (i) => {
  if (i === products.value.length - 1) return
  const arr = [...products.value]
  ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
  products.value = arr
}

const deleteProduct = (i) => {
  const product = products.value[i]
  if (confirm(`Delete "${product.name}"?`)) {
    products.value = products.value.filter((_, idx) => idx !== i)
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
      <span class="text-xs text-slate-500 font-display">{{ products.length }} products</span>
      <button @click="emit('add')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/20 text-brand-300 text-xs font-display font-medium hover:bg-brand-500/30 transition-colors">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Add
      </button>
    </div>

    <!-- List -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="(product, i) in products"
        :key="product.id + i"
        class="flex items-center gap-3 px-5 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group"
      >
        <!-- Thumbnail -->
        <div class="w-10 h-10 rounded-lg bg-brand-950 border border-white/[0.06] flex-shrink-0 overflow-hidden">
          <img
            v-if="product.images && product.images.length"
            :src="product.images[0]"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg v-if="product.confidential" class="w-4 h-4 text-brand-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <svg v-else class="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"/></svg>
          </div>
        </div>

        <!-- Name + badges -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-display font-medium text-slate-200 truncate">{{ product.name }}</p>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span v-if="product.featured" class="text-[9px] px-1.5 py-0.5 rounded bg-brand-500/15 text-brand-400 font-display font-medium">Featured</span>
            <span v-if="product.confidential" class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-display font-medium">NDA</span>
            <span class="text-[10px] text-slate-600 font-mono">{{ product.id }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button @click="moveUp(i)" :disabled="i === 0" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors disabled:opacity-20 disabled:pointer-events-none">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
          </button>
          <button @click="moveDown(i)" :disabled="i === products.length - 1" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors disabled:opacity-20 disabled:pointer-events-none">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <button @click="emit('edit', product)" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-brand-300 hover:bg-brand-500/10 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button @click="deleteProduct(i)" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>

      <div v-if="!products.length" class="flex flex-col items-center justify-center py-12 text-slate-600">
        <svg class="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
        <p class="text-sm font-display">No products yet</p>
      </div>
    </div>
  </div>
</template>
