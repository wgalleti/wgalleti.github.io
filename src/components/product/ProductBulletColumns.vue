<script setup>
defineProps({
  columns: { type: Array, required: true }
})
</script>

<template>
  <section v-if="columns.some((column) => column.items.length)" class="section-padding relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none"></div>
    <div class="container-section relative z-10">
      <div class="grid gap-6 lg:grid-cols-3">
        <div
          v-for="(column, index) in columns"
          :key="column.label"
          v-show="column.items.length"
          class="reveal rounded-[1.75rem] border border-white/[0.06] bg-white/[0.035] p-6"
          :class="index > 0 ? `reveal-delay-${Math.min(index, 2)}` : ''"
        >
          <p :class="['mb-4 text-xs font-display font-semibold uppercase tracking-[0.22em]', column.colorClass]">{{ column.label }}</p>
          <ul class="space-y-3">
            <li v-for="item in column.items" :key="item" class="flex gap-3 text-sm text-slate-300 font-body leading-relaxed">
              <span :class="['mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full', column.dotClass]"></span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
