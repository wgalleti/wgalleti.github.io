<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const particleCanvas = ref(null)
const matrixCanvas = ref(null)

let particleFrame = null
let matrixFrame = null
let mouseX = 0
let mouseY = 0
let cleanup = () => {}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const particleEl = particleCanvas.value
  const matrixEl = matrixCanvas.value

  const particleCtx = particleEl.getContext('2d')
  const matrixCtx = matrixEl.getContext('2d')

  const setCanvasSize = (canvasEl, ctx, width, height, maxDpr = 1.5) => {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr)
    canvasEl.width = Math.floor(width * dpr)
    canvasEl.height = Math.floor(height * dpr)
    canvasEl.style.width = `${width}px`
    canvasEl.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  let width = window.innerWidth
  let height = window.innerHeight

  const particleCount = 48
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    radius: Math.random() * 1.4 + 0.6,
    color: Math.random() > 0.45 ? '124, 58, 237' : '14, 165, 233',
    alpha: Math.random() * 0.22 + 0.08
  }))

  const chars = '01<>[]{}/+=-アイウエオカキクケコサシスセソタチツテトナニヌネノ'
  let columns = []
  let columnCount = 0
  let fontSize = 16

  const resetColumns = () => {
    columnCount = Math.ceil(width / fontSize)
    columns = Array.from({ length: columnCount }, (_, index) => ({
      x: index * fontSize,
      y: Math.random() * height,
      speed: 0.45 + Math.random() * 0.35,
      length: 6 + Math.floor(Math.random() * 8),
      glyphs: Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]),
      swapCounter: 0
    }))
  }

  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    setCanvasSize(particleEl, particleCtx, width, height)
    setCanvasSize(matrixEl, matrixCtx, width, height, 1.25)
    fontSize = width < 768 ? 14 : 16
    resetColumns()
  }

  const handleMouse = (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
  }

  const drawParticles = () => {
    particleCtx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.hypot(dx, dy)

        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.07
          particleCtx.beginPath()
          particleCtx.moveTo(particles[i].x, particles[i].y)
          particleCtx.lineTo(particles[j].x, particles[j].y)
          particleCtx.strokeStyle = `rgba(124, 58, 237, ${alpha})`
          particleCtx.lineWidth = 0.5
          particleCtx.stroke()
        }
      }
    }

    particles.forEach((particle) => {
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const dist = Math.hypot(dx, dy)

      if (dist < 180) {
        particle.vx -= dx * 0.00003
        particle.vy -= dy * 0.00003
      }

      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < -20) particle.x = width + 20
      if (particle.x > width + 20) particle.x = -20
      if (particle.y < -20) particle.y = height + 20
      if (particle.y > height + 20) particle.y = -20

      particle.vx *= 0.995
      particle.vy *= 0.995

      particleCtx.beginPath()
      particleCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      particleCtx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`
      particleCtx.fill()
    })

    if (!prefersReducedMotion) {
      particleFrame = window.requestAnimationFrame(drawParticles)
    }
  }

  const drawMatrix = () => {
    matrixCtx.clearRect(0, 0, width, height)
    matrixCtx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`
    matrixCtx.textBaseline = 'top'

    columns.forEach((column, columnIndex) => {
      for (let offset = 0; offset < column.length; offset += 1) {
        const y = column.y - offset * fontSize * 1.08

        if (y < -fontSize || y > height + fontSize) continue

        const glyph = column.glyphs[offset % column.glyphs.length]
        const alpha = offset === 0 ? 0.22 : Math.max(0.02, 0.12 - offset * 0.013)
        const hue = 195 + (columnIndex % 5) * 8

        matrixCtx.fillStyle = offset === 0
          ? `hsla(${hue}, 90%, 78%, ${alpha})`
          : `hsla(${hue}, 72%, 62%, ${alpha})`
        matrixCtx.fillText(glyph, column.x, y)
      }

      column.y += column.speed
      column.swapCounter += 1

      if (column.swapCounter > 5) {
        column.swapCounter = 0
        const glyphIndex = Math.floor(Math.random() * column.glyphs.length)
        column.glyphs[glyphIndex] = chars[Math.floor(Math.random() * chars.length)]
      }

      if (column.y - column.length * fontSize > height + fontSize * 2) {
        column.y = -Math.random() * height * 0.35
        column.speed = 0.45 + Math.random() * 0.35
        column.length = 6 + Math.floor(Math.random() * 8)
      }
    })

    if (!prefersReducedMotion) {
      matrixFrame = window.requestAnimationFrame(drawMatrix)
    }
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', handleMouse, { passive: true })

  drawParticles()
  drawMatrix()

  cleanup = () => {
    window.cancelAnimationFrame(particleFrame)
    window.cancelAnimationFrame(matrixFrame)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', handleMouse)
  }
})

onUnmounted(() => {
  cleanup()
})
</script>

<template>
  <canvas ref="matrixCanvas" class="fixed inset-0 z-0 pointer-events-none opacity-55"></canvas>
  <canvas ref="particleCanvas" class="fixed inset-0 z-0 pointer-events-none opacity-80"></canvas>

  <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div class="absolute -top-[38%] -left-[16%] h-[72vw] w-[72vw] rounded-full bg-brand-700/[0.06] blur-[120px] animate-pulse-slow"></div>
    <div class="absolute -bottom-[28%] -right-[18%] h-[54vw] w-[54vw] rounded-full bg-accent-500/[0.05] blur-[120px] animate-pulse-slow" style="animation-delay: 2s"></div>
    <div class="absolute top-[34%] left-[50%] h-[34vw] w-[34vw] rounded-full bg-emerald-500/[0.035] blur-[100px] animate-float"></div>
  </div>
</template>
