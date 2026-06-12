<script setup>
// Logo "a linha" — traçado único violet→cyan terminando em ponto ciano.
// Variante `mini`: W simples para uso abaixo de 32px (favicon, UI compacta).
defineProps({
  width: { type: [String, Number], default: 32 },
  height: { type: [String, Number], default: 28 },
  mini: { type: Boolean, default: false },
  gradientId: { type: String, default: 'wg-grad' },
})
</script>

<template>
  <svg
    v-if="!mini"
    :width="width"
    :height="height"
    viewBox="0 0 90 80"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="gradientId" x1="8" y1="40" x2="82" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#8B5CF6" />
        <stop offset="100%" stop-color="#22D3EE" />
      </linearGradient>
    </defs>
    <path
      d="M8 38 C14 22, 26 20, 26 32 C26 44, 12 46, 14 34 C16 24, 30 22, 36 34 L46 64 L57 28 L68 64 L79 22"
      :stroke="`url(#${gradientId})`"
      stroke-width="5.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
    <circle cx="79" cy="22" r="4.5" fill="#22D3EE" />
  </svg>

  <svg
    v-else
    :width="width"
    :height="height"
    viewBox="0 0 60 48"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="`${gradientId}-mini`" x1="6" y1="24" x2="54" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#8B5CF6" />
        <stop offset="100%" stop-color="#22D3EE" />
      </linearGradient>
    </defs>
    <path
      d="M6 6 L18 42 L30 14 L42 42 L54 6"
      :stroke="`url(#${gradientId}-mini)`"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
  </svg>
</template>
