// Composable: anima a logo no <canvas>. Porte direto da classe Component
// do protótipo (Site wgalleti.dc.html). O relógio da timeline e os ângulos
// vivem fora do template — refs em closure — para sobreviver a re-renders.
import { onMounted, onBeforeUnmount } from 'vue'

export function useLogoCanvas(canvasRef) {
  let raf = null
  let logoStart = null
  let mx = 0.5
  let my = 0.5
  let ry = 0
  let rx = 0
  let onMouse = null

  const cubic = (p0, p1, p2, p3, t) => {
    const u = 1 - t
    return [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ]
  }

  const segs = [
    ['c', [8, 38], [14, 22], [26, 20], [26, 32]],
    ['c', [26, 32], [26, 44], [12, 46], [14, 34]],
    ['c', [14, 34], [16, 24], [30, 22], [36, 34]],
    ['l', [36, 34], [46, 64]],
    ['l', [46, 64], [57, 28]],
    ['l', [57, 28], [68, 64]],
    ['l', [68, 64], [79, 22]],
  ]

  const pts2 = []
  const keyIdx = [0]
  segs.forEach((s) => {
    const n = s[0] === 'c' ? 26 : 16
    const startI = pts2.length ? 1 : 0
    for (let i = startI; i <= n; i += 1) {
      const t = i / n
      if (s[0] === 'c') pts2.push(cubic(s[1], s[2], s[3], s[4], t))
      else pts2.push([s[1][0] + (s[2][0] - s[1][0]) * t, s[1][1] + (s[2][1] - s[1][1]) * t])
    }
    keyIdx.push(pts2.length - 1)
  })

  const cx = 43.5
  const cy = 43
  const N = pts2.length
  const pts = pts2.map((p, i) => ({
    fx: p[0] - cx,
    fy: p[1] - cy,
    t: i / (N - 1),
  }))

  const lerpC = (t, alpha) => {
    const r = Math.round(139 + (34 - 139) * t)
    const g = Math.round(92 + (211 - 92) * t)
    const b = Math.round(246 + (238 - 246) * t)
    return `rgba(${r},${g},${b},${alpha})`
  }

  // Timeline (ms): DOTS → TRACE → SETTLE → HOLD → FADE → PAUSE
  const DOTS = 1400
  const TRACE = 6500
  const SETTLE = 1400
  const HOLD = 18000
  const FADE = 1800
  const PAUSE = 2400
  const T1 = DOTS
  const T2 = T1 + TRACE
  const T3 = T2 + SETTLE
  const T4 = T3 + HOLD
  const T5 = T4 + FADE
  const TOTAL = T5 + PAUSE

  const clamp01 = (v) => Math.max(0, Math.min(1, v))
  const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2

  const start = (el) => {
    if (!el) return
    const ctx = el.getContext('2d')
    const reduced = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) ry = -0.18

    const frame = (now) => {
      if (canvasRef.value !== el) return
      const rect = el.getBoundingClientRect()
      if (rect.width < 10) {
        raf = requestAnimationFrame(frame)
        return
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const pw = Math.floor(rect.width * dpr)
      if (el.width !== pw) {
        el.width = pw
        el.height = Math.floor(rect.height * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const W = rect.width
      const H = rect.height
      ctx.clearRect(0, 0, W, H)

      if (logoStart == null) logoStart = now
      const tc = reduced ? T3 + 10 : (now - logoStart) % TOTAL
      const traceP = reduced ? 1 : easeInOutSine(clamp01((tc - T1) / TRACE))
      const settleP = reduced ? 1 : clamp01((tc - T2) / SETTLE)
      let master = 1
      if (!reduced && tc > T4) master = 1 - clamp01((tc - T4) / FADE)

      const tRy = (mx - 0.5) * 0.2 + Math.sin(now * 0.00016) * 0.06
      const tRx = (0.5 - my) * 0.1 + Math.cos(now * 0.00013) * 0.03
      ry += (tRy - ry) * 0.025
      rx += (tRx - rx) * 0.025

      if (master <= 0.002) {
        raf = requestAnimationFrame(frame)
        return
      }

      const scale = Math.min(W, H) / 112
      const persp = 380
      const proj = (x, y, z) => {
        const X1 = x * Math.cos(ry) + z * Math.sin(ry)
        const Z1 = -x * Math.sin(ry) + z * Math.cos(ry)
        const Y1 = y * Math.cos(rx) - Z1 * Math.sin(rx)
        const Z2 = y * Math.sin(rx) + Z1 * Math.cos(rx)
        const f = persp / (persp + Z2 * scale)
        return [W / 2 + X1 * scale * f, H / 2 + Y1 * scale * f, f]
      }

      const cur = pts.map((pt) => ({
        f: proj(pt.fx, pt.fy, 0),
        b: proj(pt.fx, pt.fy, -14),
        t: pt.t,
      }))

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      const drawn = Math.max(1, Math.round((N - 1) * traceP) + 1)

      // Linha-eco atrás + conexões verticais nos vértices
      if (settleP > 0) {
        for (let i = 1; i < drawn; i += 1) {
          const a = cur[i - 1]
          const b = cur[i]
          ctx.beginPath()
          ctx.moveTo(a.b[0], a.b[1])
          ctx.lineTo(b.b[0], b.b[1])
          ctx.strokeStyle = lerpC(b.t, 0.15 * settleP * master)
          ctx.lineWidth = Math.max(0.6, (1.5 * b.b[2] * scale) / 4)
          ctx.stroke()
        }
        keyIdx.forEach((k) => {
          const c = cur[k]
          ctx.beginPath()
          ctx.moveTo(c.f[0], c.f[1])
          ctx.lineTo(c.b[0], c.b[1])
          ctx.strokeStyle = `rgba(168,139,250,${0.24 * settleP * master})`
          ctx.lineWidth = 1
          ctx.stroke()
        })
      }

      // Linha principal
      for (let i = 1; i < drawn; i += 1) {
        const a = cur[i - 1]
        const b = cur[i]
        ctx.beginPath()
        ctx.moveTo(a.f[0], a.f[1])
        ctx.lineTo(b.f[0], b.f[1])
        ctx.strokeStyle = lerpC(b.t, master)
        ctx.lineWidth = Math.max(1.2, (4.8 * b.f[2] * scale) / 4)
        ctx.stroke()
      }

      // Vértices-chave acendem em stagger
      keyIdx.forEach((k, j) => {
        const a = reduced ? 1 : clamp01((tc - j * 150) / 480)
        if (a <= 0) return
        const c = cur[k]
        const grow = 0.5 + 0.5 * a
        ctx.beginPath()
        ctx.arc(c.f[0], c.f[1], Math.max(1.5, (2.6 * c.f[2] * scale) / 4) * grow, 0, 6.2832)
        ctx.fillStyle = lerpC(pts[k].t, 0.9 * a * master)
        ctx.fill()
      })

      // Ponta-guia luminoso durante o traço
      if (traceP > 0 && traceP < 1) {
        const tip = cur[drawn - 1]
        ctx.beginPath()
        ctx.arc(tip.f[0], tip.f[1], (3 * scale) / 4, 0, 6.2832)
        ctx.fillStyle = lerpC(pts[drawn - 1].t, 0.95 * master)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(tip.f[0], tip.f[1], (7.5 * scale) / 4, 0, 6.2832)
        ctx.strokeStyle = lerpC(pts[drawn - 1].t, 0.22 * master)
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Ponto final ciano (após traço completo)
      if (traceP >= 1) {
        const e = cur[N - 1]
        const pulse = 1 + Math.sin(now * 0.001) * 0.04
        ctx.beginPath()
        ctx.arc(e.f[0], e.f[1], Math.max(3, ((4.6 * scale) / 4) * e.f[2]) * pulse, 0, 6.2832)
        ctx.fillStyle = `rgba(34,211,238,${Math.max(0.15, settleP) * master})`
        ctx.fill()
      }

      if (!reduced) raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
  }

  onMounted(() => {
    onMouse = (e) => {
      mx = e.clientX / window.innerWidth
      my = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    start(canvasRef.value)
  })

  onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
    if (onMouse) window.removeEventListener('mousemove', onMouse)
  })
}
