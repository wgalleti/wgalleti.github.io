<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref(null)
const matrixCanvas = ref(null)
let animationId = null
let matrixAnimationId = null
let mouseX = 0
let mouseY = 0

onMounted(() => {
  // === Particle system ===
  const ctx = canvas.value.getContext('2d')
  let width = window.innerWidth
  let height = window.innerHeight

  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.value.width = width
    canvas.value.height = height
  }

  resize()
  window.addEventListener('resize', resize)

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '124, 58, 237' : '14, 165, 233',
  }))

  const handleMouse = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }
  window.addEventListener('mousemove', handleMouse)

  const draw = () => {
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.08
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    particles.forEach(p => {
      const dx = mouseX - p.x
      const dy = mouseY - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 200) {
        p.vx -= dx * 0.00005
        p.vy -= dy * 0.00005
      }

      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = width
      if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      if (p.y > height) p.y = 0

      p.vx *= 0.999
      p.vy *= 0.999

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`
      ctx.fill()
    })

    animationId = requestAnimationFrame(draw)
  }

  draw()

  // === Matrix rain ===
  const mCtx = matrixCanvas.value.getContext('2d')
  let mWidth = window.innerWidth
  let mHeight = document.documentElement.scrollHeight

  const fontSize = 22
  const columns = Math.floor(mWidth / fontSize)

  // Characters: katakana + latin + digits + symbols
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|;:<>?'

  // Each column has its own drop position and speed
  const drops = Array.from({ length: columns }, () => ({
    y: Math.random() * -100,
    speed: 0.4 + Math.random() * 0.8,
    opacity: 0.04 + Math.random() * 0.06,
    chars: Array.from({ length: 30 }, () => chars[Math.floor(Math.random() * chars.length)]),
    charTimer: 0,
    active: Math.random() > 0.3
  }))

  const resizeMatrix = () => {
    mWidth = window.innerWidth
    mHeight = document.documentElement.scrollHeight
    matrixCanvas.value.width = mWidth
    matrixCanvas.value.height = mHeight
  }

  resizeMatrix()
  window.addEventListener('resize', resizeMatrix)

  let lastTime = 0
  const drawMatrix = (timestamp) => {
    const delta = timestamp - lastTime

    // Throttle to ~20fps for subtle, dreamy feel
    if (delta > 50) {
      lastTime = timestamp

      // Soft fade instead of full clear — creates trail effect
      mCtx.fillStyle = 'rgba(10, 10, 26, 0.08)'
      mCtx.fillRect(0, 0, mWidth, mHeight)

      mCtx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]

        if (!drop.active) {
          // Random chance to activate
          if (Math.random() < 0.008) drop.active = true
          continue
        }

        // Draw a trail of characters
        const trailLen = 18 + Math.floor(Math.random() * 10)
        for (let j = 0; j < trailLen; j++) {
          const charY = drop.y - j
          if (charY < 0 || charY * fontSize > mHeight) continue

          const char = drop.chars[j % drop.chars.length]

          // Head character brighter, trail fades
          let alpha
          if (j === 0) {
            alpha = drop.opacity * 3.5
          } else if (j === 1) {
            alpha = drop.opacity * 2.5
          } else {
            alpha = drop.opacity * (1 - j / trailLen)
          }

          // Purple hue with slight variation
          const hue = 270 + Math.sin(i * 0.3 + timestamp * 0.0003) * 15
          mCtx.fillStyle = `hsla(${hue}, 70%, 65%, ${alpha})`
          mCtx.fillText(char, i * fontSize, charY * fontSize)
        }

        // Advance drop
        drop.y += drop.speed

        // Occasionally change characters for flicker effect
        drop.charTimer++
        if (drop.charTimer > 4) {
          drop.charTimer = 0
          const idx = Math.floor(Math.random() * drop.chars.length)
          drop.chars[idx] = chars[Math.floor(Math.random() * chars.length)]
        }

        // Reset when off screen
        const maxRow = mHeight / fontSize
        if (drop.y - 20 > maxRow) {
          drop.y = Math.random() * -40
          drop.speed = 0.4 + Math.random() * 0.8
          drop.opacity = 0.04 + Math.random() * 0.06
          drop.active = Math.random() > 0.2
        }
      }
    }

    matrixAnimationId = requestAnimationFrame(drawMatrix)
  }

  // Small delay so page renders first
  setTimeout(() => {
    matrixAnimationId = requestAnimationFrame(drawMatrix)
  }, 500)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    cancelAnimationFrame(matrixAnimationId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('resize', resizeMatrix)
    window.removeEventListener('mousemove', handleMouse)
  })
})
</script>

<template>
  <!-- Matrix rain — full page height, behind everything -->
  <canvas ref="matrixCanvas" class="absolute top-0 left-0 w-full z-0 pointer-events-none" style="opacity: 0.85"></canvas>

  <!-- Particle network -->
  <canvas ref="canvas" class="fixed inset-0 z-0 pointer-events-none" style="opacity: 0.7"></canvas>

  <!-- Gradient orbs -->
  <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div class="absolute -top-[40%] -left-[20%] w-[80vw] h-[80vw] rounded-full bg-brand-700/[0.07] blur-[120px] animate-pulse-slow"></div>
    <div class="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-accent-500/[0.05] blur-[120px] animate-pulse-slow" style="animation-delay: 2s"></div>
    <div class="absolute top-[40%] left-[50%] w-[40vw] h-[40vw] rounded-full bg-brand-500/[0.04] blur-[100px] animate-float"></div>
  </div>
</template>
