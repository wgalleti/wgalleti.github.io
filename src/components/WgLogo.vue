<script setup>
defineProps({
  size: { type: String, default: 'md' }
})

const sizes = {
  sm: 'h-7',
  md: 'h-9',
  lg: 'h-12',
  xl: 'h-16'
}
</script>

<template>
  <div class="flex items-center gap-3 group">
    <!-- Logo Mark - Stylized W with circuit/bracket motif -->
    <div :class="['relative flex-shrink-0', sizes[size] || sizes.md]" class="aspect-square">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stop-color="#7C3AED"/>
            <stop offset="50%" stop-color="#8B5CF6"/>
            <stop offset="100%" stop-color="#0EA5E9"/>
          </linearGradient>
          <linearGradient id="logoGradHover" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stop-color="#A78BFA"/>
            <stop offset="100%" stop-color="#38BDF8"/>
          </linearGradient>
        </defs>
        <!-- Shield/Bracket background -->
        <rect x="2" y="2" width="44" height="44" rx="12" fill="#0a0a1a" stroke="url(#logoGrad)" stroke-width="1.5" class="transition-all duration-500 group-hover:stroke-[2]"/>
        <!-- W mark -->
        <path d="M13 16L18.5 34L24 22L29.5 34L35 16" stroke="url(#logoGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" class="transition-all duration-500"/>
        <!-- Circuit dots -->
        <circle cx="10" cy="24" r="1.5" fill="#7C3AED" opacity="0.6"/>
        <circle cx="38" cy="24" r="1.5" fill="#0EA5E9" opacity="0.6"/>
        <circle cx="24" cy="10" r="1.5" fill="#8B5CF6" opacity="0.6"/>
        <circle cx="24" cy="38" r="1.5" fill="#38BDF8" opacity="0.6"/>
      </svg>
    </div>
    <!-- Wordmark -->
    <div class="flex flex-col leading-none">
      <span class="font-display font-bold text-white tracking-tight" :class="size === 'lg' || size === 'xl' ? 'text-xl' : 'text-base'">
        wGalleti
      </span>
      <span class="font-display font-medium text-brand-400 tracking-[0.2em] uppercase" :class="size === 'lg' || size === 'xl' ? 'text-[0.65rem]' : 'text-[0.55rem]'">
        Tech
      </span>
    </div>
  </div>
</template>
