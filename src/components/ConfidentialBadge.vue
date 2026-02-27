<script setup>
defineProps({
  size: { type: String, default: 'md' } // sm (card), lg (modal)
})
</script>

<template>
  <div :class="['confidential-badge relative', size === 'lg' ? 'w-full h-full' : 'w-full h-full']">
    <!-- Animated grid background -->
    <div class="absolute inset-0 overflow-hidden opacity-20">
      <div class="grid-scan"></div>
    </div>

    <!-- Hex pattern -->
    <svg class="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexPattern" x="0" y="0" width="28" height="49" patternUnits="userSpaceOnUse">
          <path d="M14 0l14 8v16l-14 8L0 24V8z" fill="none" stroke="#7C3AED" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexPattern)"/>
    </svg>

    <!-- Scan line animation -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="scan-line"></div>
    </div>

    <!-- Center content -->
    <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
      <!-- Animated shield SVG -->
      <div :class="['relative', size === 'lg' ? 'w-28 h-28' : 'w-16 h-16']">
        <!-- Outer ring pulse -->
        <div class="absolute inset-0 rounded-full border border-brand-500/20 animate-ping" style="animation-duration: 3s;"></div>

        <!-- Shield SVG -->
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full shield-float">
          <defs>
            <linearGradient id="shieldGrad" x1="30" y1="10" x2="90" y2="110">
              <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.8"/>
              <stop offset="50%" stop-color="#8B5CF6" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.8"/>
            </linearGradient>
            <linearGradient id="shieldFill" x1="40" y1="20" x2="80" y2="100">
              <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.08"/>
              <stop offset="100%" stop-color="#0EA5E9" stop-opacity="0.04"/>
            </linearGradient>
            <filter id="shieldGlow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          <!-- Shield shape -->
          <path
            d="M60 12L20 32v28c0 24.5 17 47 40 52 23-5 40-27.5 40-52V32L60 12z"
            fill="url(#shieldFill)"
            stroke="url(#shieldGrad)"
            stroke-width="1.5"
            filter="url(#shieldGlow)"
            class="shield-path"
          />

          <!-- Inner shield line -->
          <path
            d="M60 22L28 38v24c0 20 14 38.5 32 43 18-4.5 32-23 32-43V38L60 22z"
            fill="none"
            stroke="url(#shieldGrad)"
            stroke-width="0.5"
            stroke-dasharray="4 4"
            opacity="0.4"
            class="shield-dash"
          />

          <!-- Lock icon inside shield -->
          <rect x="48" y="52" width="24" height="18" rx="3" fill="none" stroke="url(#shieldGrad)" stroke-width="1.5" class="lock-body"/>
          <path d="M52 52V46a8 8 0 0116 0v6" fill="none" stroke="url(#shieldGrad)" stroke-width="1.5" stroke-linecap="round" class="lock-shackle"/>
          <!-- Keyhole -->
          <circle cx="60" cy="60" r="2.5" fill="#7C3AED" opacity="0.8" class="keyhole-pulse"/>
          <path d="M60 62v4" stroke="#7C3AED" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>

          <!-- Corner circuit nodes -->
          <circle cx="20" cy="32" r="2" fill="#7C3AED" opacity="0.5" class="node-blink"/>
          <circle cx="100" cy="32" r="2" fill="#0EA5E9" opacity="0.5" class="node-blink" style="animation-delay: 0.5s"/>
          <circle cx="60" cy="12" r="2" fill="#8B5CF6" opacity="0.5" class="node-blink" style="animation-delay: 1s"/>

          <!-- Data lines from nodes -->
          <line x1="22" y1="32" x2="35" y2="32" stroke="#7C3AED" stroke-width="0.5" opacity="0.3" class="data-line"/>
          <line x1="98" y1="32" x2="85" y2="32" stroke="#0EA5E9" stroke-width="0.5" opacity="0.3" class="data-line" style="animation-delay: 0.7s"/>
        </svg>
      </div>

      <!-- Label -->
      <div :class="['mt-3 text-center', size === 'lg' ? 'mt-5' : 'mt-2']">
        <span :class="['font-display font-semibold text-brand-300 block', size === 'lg' ? 'text-sm' : 'text-[10px]']">
          <slot name="label">NDA</slot>
        </span>
      </div>
    </div>

    <!-- Corner decorations -->
    <svg class="absolute top-2 left-2 w-5 h-5 text-brand-500/20" viewBox="0 0 20 20" fill="none">
      <path d="M0 8V0h8" stroke="currentColor" stroke-width="1"/>
    </svg>
    <svg class="absolute top-2 right-2 w-5 h-5 text-brand-500/20" viewBox="0 0 20 20" fill="none">
      <path d="M20 8V0h-8" stroke="currentColor" stroke-width="1"/>
    </svg>
    <svg class="absolute bottom-2 left-2 w-5 h-5 text-brand-500/20" viewBox="0 0 20 20" fill="none">
      <path d="M0 12v8h8" stroke="currentColor" stroke-width="1"/>
    </svg>
    <svg class="absolute bottom-2 right-2 w-5 h-5 text-brand-500/20" viewBox="0 0 20 20" fill="none">
      <path d="M20 12v8h-8" stroke="currentColor" stroke-width="1"/>
    </svg>
  </div>
</template>

<style scoped>
/* Scan line sweeping down */
.scan-line {
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.6), rgba(14, 165, 233, 0.4), transparent);
  box-shadow: 0 0 20px 4px rgba(124, 58, 237, 0.15);
  animation: scanDown 4s ease-in-out infinite;
}

@keyframes scanDown {
  0%, 100% { top: -2px; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: calc(100% + 2px); opacity: 0; }
}

/* Grid background scroll */
.grid-scan {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image:
    linear-gradient(rgba(124, 58, 237, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.15) 1px, transparent 1px);
  background-size: 24px 24px;
  animation: gridScroll 20s linear infinite;
}

@keyframes gridScroll {
  0% { transform: translate(0, 0); }
  100% { transform: translate(24px, 24px); }
}

/* Shield float */
.shield-float {
  animation: shieldFloat 4s ease-in-out infinite;
}

@keyframes shieldFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* Shield path glow pulse */
.shield-path {
  animation: shieldGlow 3s ease-in-out infinite;
}

@keyframes shieldGlow {
  0%, 100% { filter: url(#shieldGlow) drop-shadow(0 0 4px rgba(124, 58, 237, 0.3)); }
  50% { filter: url(#shieldGlow) drop-shadow(0 0 12px rgba(124, 58, 237, 0.5)); }
}

/* Dashed inner line rotation */
.shield-dash {
  animation: dashMove 8s linear infinite;
}

@keyframes dashMove {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 80; }
}

/* Keyhole pulse */
.keyhole-pulse {
  animation: keyholePulse 2s ease-in-out infinite;
}

@keyframes keyholePulse {
  0%, 100% { r: 2.5; opacity: 0.8; }
  50% { r: 3.5; opacity: 1; }
}

/* Circuit node blink */
.node-blink {
  animation: nodeBlink 2s ease-in-out infinite;
}

@keyframes nodeBlink {
  0%, 100% { opacity: 0.3; r: 2; }
  50% { opacity: 0.8; r: 3; }
}

/* Data lines */
.data-line {
  animation: dataFlow 1.5s ease-in-out infinite;
}

@keyframes dataFlow {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.6; }
}
</style>
