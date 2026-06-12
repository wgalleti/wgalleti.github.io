<script setup>
// "wgalleti" minúsculo, Archivo 900, tracking −3%, ponto final ciano.
defineProps({
  size: { type: [String, Number], default: 17 },
})
</script>

<template>
  <span
    class="font-display font-black text-text"
    :style="{ fontSize: typeof size === 'number' ? size + 'px' : size, letterSpacing: '-0.03em', lineHeight: 1 }"
  >wgalleti<span class="text-cyan">.</span></span>
</template>
