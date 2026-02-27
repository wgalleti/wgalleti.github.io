<script setup>
import { inject } from 'vue'

const technologies = inject('technologies')
const emit = defineEmits(['edit', 'add'])

const moveUp = (i) => {
  if (i === 0) return
  const arr = [...technologies.value]
  ;[arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
  technologies.value = arr
}

const moveDown = (i) => {
  if (i === technologies.value.length - 1) return
  const arr = [...technologies.value]
  ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
  technologies.value = arr
}

const deleteTech = (i) => {
  const tech = technologies.value[i]
  if (confirm(`Delete "${tech.name}"?`)) {
    technologies.value = technologies.value.filter((_, idx) => idx !== i)
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
      <span class="text-xs text-slate-500 font-display">{{ technologies.length }} technologies</span>
      <button @click="emit('add')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/20 text-brand-300 text-xs font-display font-medium hover:bg-brand-500/30 transition-colors">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        Add
      </button>
    </div>

    <!-- List -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="(tech, i) in technologies"
        :key="tech.slug + i"
        class="flex items-center gap-3 px-5 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group"
      >
        <!-- Icon preview -->
        <img
          :src="`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`"
          :alt="tech.name"
          class="w-6 h-6 flex-shrink-0"
          loading="lazy"
        />

        <!-- Name + slug -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-display font-medium text-slate-200 truncate">{{ tech.name }}</p>
          <p class="text-[10px] text-slate-500 font-mono">{{ tech.slug }}</p>
        </div>

        <!-- Color swatch -->
        <div class="w-5 h-5 rounded-md border border-white/10 flex-shrink-0" :style="{ backgroundColor: tech.color }"></div>

        <!-- Actions -->
        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button @click="moveUp(i)" :disabled="i === 0" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors disabled:opacity-20 disabled:pointer-events-none">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
          </button>
          <button @click="moveDown(i)" :disabled="i === technologies.length - 1" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.06] transition-colors disabled:opacity-20 disabled:pointer-events-none">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <button @click="emit('edit', tech)" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-brand-300 hover:bg-brand-500/10 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button @click="deleteTech(i)" class="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>

      <div v-if="!technologies.length" class="flex flex-col items-center justify-center py-12 text-slate-600">
        <svg class="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        <p class="text-sm font-display">No technologies yet</p>
      </div>
    </div>
  </div>
</template>
