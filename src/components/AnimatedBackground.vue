<script setup>
// Matrix rain do brand book — glifos 01<>[]{}/+= + katakana, alpha máx 0.17.
// 2/3 colunas violeta, 1/3 ciano. DPR cap 1.25. Orbs ambient com pulso de 9s.
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref(null)
let cleanup = null

const chars = '01<>[]{}/+=アイウエオカキクケコサシスセソタチツ'

onMounted(() => {
  const el = canvasRef.value
  if (!el) return
  const ctx = el.getContext('2d')
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let w = 0
  let h = 0
  let cols = []
  let font = 16
  let raf = null

  const resize = () => {
    w = window.innerWidth
    h = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    el.width = Math.floor(w * dpr)
    el.height = Math.floor(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    font = w < 768 ? 14 : 16
    const n = Math.ceil(w / (font * 1.7))
    cols = Array.from({ length: n }, (_, i) => ({
      x: i * font * 1.7,
      y: Math.random() * h,
      sp: 0.35 + Math.random() * 0.4,
      len: 5 + Math.floor(Math.random() * 7),
      gl: Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]),
      sw: 0,
    }))
  }

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    ctx.font = `500 ${font}px JetBrains Mono, monospace`
    ctx.textBaseline = 'top'
    cols.forEach((c, ci) => {
      const violet = ci % 3 !== 0
      for (let o = 0; o < c.len; o += 1) {
        const y = c.y - o * font * 1.1
        if (y < -font || y > h + font) continue
        const a = o === 0 ? 0.17 : Math.max(0.015, 0.095 - o * 0.013)
        ctx.fillStyle = violet
          ? `rgba(139,92,246,${a})`
          : `rgba(34,211,238,${a})`
        ctx.fillText(c.gl[o % c.gl.length], c.x, y)
      }
      c.y += c.sp
      c.sw += 1
      if (c.sw > 6) {
        c.sw = 0
        c.gl[Math.floor(Math.random() * c.gl.length)] = chars[Math.floor(Math.random() * chars.length)]
      }
      if (c.y - c.len * font > h + font * 2) {
        c.y = -Math.random() * h * 0.3
        c.sp = 0.35 + Math.random() * 0.4
      }
    })
    if (!reduced) raf = requestAnimationFrame(draw)
  }

  resize()
  window.addEventListener('resize', resize)
  if (reduced) {
    draw() // desenha um frame estático
  } else {
    draw()
  }

  cleanup = () => {
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  }
})

onBeforeUnmount(() => {
  if (cleanup) cleanup()
})
</script>

<template>
  <!-- Camada fixa atrás de todo o conteúdo -->
  <div class="bg-stack" aria-hidden="true">
    <canvas ref="canvasRef" class="matrix-canvas"></canvas>
    <div class="orbs">
      <div class="orb orb-violet"></div>
      <div class="orb orb-cyan"></div>
    </div>
  </div>
</template>

<style scoped>
.bg-stack {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.matrix-canvas {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  animation: orbPulse 9s ease-in-out infinite;
}

.orb-violet {
  top: -30%;
  left: -15%;
  width: 64vw;
  height: 64vw;
  background: rgba(109, 40, 217, 0.07);
}

.orb-cyan {
  bottom: -25%;
  right: -15%;
  width: 50vw;
  height: 50vw;
  background: rgba(34, 211, 238, 0.05);
  animation-delay: 4s;
}

@keyframes orbPulse {
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; }
}
</style>
