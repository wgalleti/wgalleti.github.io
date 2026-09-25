// Rede 3D do hero: esfera de pontos (Fibonacci) + "hubs" com rótulo,
// arestas entre vizinhos, pulsos viajando e ligações entre hubs.
// Gira devagar, segue o mouse, pausa fora da tela e respeita reduced-motion.
import { onBeforeUnmount, onMounted, unref } from 'vue'

const HUB_DIRS = [
  [-0.55, -0.45, -0.7],
  [0.25, -0.2, -0.95],
  [0.7, 0.35, -0.6],
  [-0.35, 0.55, -0.75],
  [0.1, 0.85, -0.5],
  [-0.9, 0.1, -0.4],
  [0.75, -0.6, -0.3],
]

export function useNetwork3D(canvasRef, labelsRef) {
  let raf = null
  let ro = null
  let io = null
  let visible = true
  let started = false
  const mouse = { x: 0.5, y: 0.5 }

  const onMove = (e) => {
    mouse.x = e.clientX / Math.max(1, window.innerWidth)
    mouse.y = e.clientY / Math.max(1, window.innerHeight)
  }

  onMounted(() => {
    const cv = unref(canvasRef)
    if (!cv) return
    const ctx = cv.getContext('2d')
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // ── geometria ──
    const pts = []
    const N = 150
    const ga = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = ga * i
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, hub: -1 })
    }
    HUB_DIRS.forEach((h, k) => {
      const l = Math.hypot(h[0], h[1], h[2])
      pts.push({ x: h[0] / l, y: h[1] / l, z: h[2] / l, hub: k })
    })

    const edges = []
    const adj = pts.map(() => [])
    const seen = new Set()
    pts.forEach((p, i) => {
      const k = p.hub >= 0 ? 5 : 3
      pts
        .map((q, j) => [j, (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2])
        .filter((a) => a[0] !== i)
        .sort((a, b) => a[1] - b[1])
        .slice(0, k)
        .forEach(([j]) => {
          const key = i < j ? `${i}_${j}` : `${j}_${i}`
          if (seen.has(key)) return
          seen.add(key)
          edges.push([i, j])
          adj[i].push(j)
          adj[j].push(i)
        })
    })

    const hubIdx = pts.map((p, i) => (p.hub >= 0 ? i : -1)).filter((i) => i >= 0)
    const links = hubIdx.map((h, a) => [h, hubIdx[(a + 1) % hubIdx.length]])
    links.push([hubIdx[0], hubIdx[1]], [hubIdx[1], hubIdx[3]])
    const linkPulses = links.map(() => ({ t: Math.random(), sp: 0.004 + Math.random() * 0.004 }))
    const pulses = Array.from({ length: 16 }, () => {
      const s = Math.floor(Math.random() * pts.length)
      return { a: s, b: adj[s][0], t: Math.random(), sp: 0.006 + Math.random() * 0.01 }
    })

    // ── tamanho ──
    let W = 0, H = 0, R = 0, cx = 0, cy = 0
    const persp = 1000
    const resize = () => {
      const rect = cv.getBoundingClientRect()
      W = Math.max(1, rect.width)
      H = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.min(W, H) * (W > 700 ? 0.33 : 0.38)
      cx = W > 700 ? W * 0.56 : W * 0.5
      cy = H * 0.5
      if (reduced) draw(0)
    }

    let ry = 0, rx = -0.2, t0 = null

    const proj = (p, cY, sY, cX, sX) => {
      const x = p.x * cY + p.z * sY
      let z = -p.x * sY + p.z * cY
      const y = p.y * cX - z * sX
      z = p.y * sX + z * cX
      const s = persp / (persp + z * R)
      return { x: cx + x * R * s, y: cy + y * R * s, z, s }
    }
    const col = (x, a) => {
      const k = Math.max(0, Math.min(1, (x - (cx - R)) / (2 * R)))
      const r = Math.round(139 + (34 - 139) * k)
      const g = Math.round(92 + (211 - 92) * k)
      const b = Math.round(246 + (238 - 246) * k)
      return `rgba(${r},${g},${b},${a.toFixed(3)})`
    }

    const draw = (t) => {
      const labels = unref(labelsRef) || []
      const tY = t * 0.00011 + (mouse.x - 0.5) * 0.9
      const tX = -0.2 + (mouse.y - 0.5) * 0.5
      ry += (tY - ry) * 0.04
      rx += (tX - rx) * 0.04
      const cY = Math.cos(ry), sY = Math.sin(ry), cX = Math.cos(rx), sX = Math.sin(rx)
      const P = pts.map((p) => proj(p, cY, sY, cX, sX))
      ctx.clearRect(0, 0, W, H)

      // órbita
      const oc = Math.cos(ry * 0.6), os = Math.sin(ry * 0.6), tc = Math.cos(0.9), ts = Math.sin(0.9)
      ctx.beginPath()
      for (let i = 0; i <= 120; i++) {
        const a = (i / 120) * Math.PI * 2
        const q = proj({ x: Math.cos(a) * 1.32, y: 0.18 * Math.sin(a), z: Math.sin(a) * 1.32 }, oc, os, tc, ts)
        if (i === 0) ctx.moveTo(q.x, q.y)
        else ctx.lineTo(q.x, q.y)
      }
      ctx.strokeStyle = 'rgba(139,92,246,0.18)'
      ctx.lineWidth = 1
      ctx.stroke()
      const oa = t * 0.0005
      const oq = proj({ x: Math.cos(oa) * 1.32, y: 0.18 * Math.sin(oa), z: Math.sin(oa) * 1.32 }, oc, os, tc, ts)
      ctx.beginPath()
      ctx.arc(oq.x, oq.y, 4 * oq.s, 0, Math.PI * 2)
      ctx.fillStyle = '#22D3EE'
      ctx.fill()

      // arestas
      ctx.lineWidth = 1
      for (const [i, j] of edges) {
        const a = P[i], b = P[j]
        const depth = 1 - ((a.z + b.z) / 2 + 1) / 2
        ctx.strokeStyle = col((a.x + b.x) / 2, 0.04 + 0.26 * depth)
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      // ligações entre temas (hubs)
      links.forEach(([i, j], k) => {
        const a = P[i], b = P[j]
        const mx = (a.x + b.x) / 2 + (cx - (a.x + b.x) / 2) * 0.35
        const my = (a.y + b.y) / 2 + (cy - (a.y + b.y) / 2) * 0.35
        ctx.strokeStyle = 'rgba(167,139,250,0.22)'
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.quadraticCurveTo(mx, my, b.x, b.y)
        ctx.stroke()
        const lp = linkPulses[k]
        if (!reduced) lp.t = (lp.t + lp.sp) % 1
        const u = lp.t
        const px = (1 - u) ** 2 * a.x + 2 * (1 - u) * u * mx + u * u * b.x
        const py = (1 - u) ** 2 * a.y + 2 * (1 - u) * u * my + u * u * b.y
        ctx.beginPath()
        ctx.arc(px, py, 2.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34,211,238,0.9)'
        ctx.fill()
      })

      // nós
      P.forEach((q, i) => {
        if (pts[i].hub >= 0) return
        const depth = 1 - (q.z + 1) / 2
        ctx.beginPath()
        ctx.arc(q.x, q.y, (1 + 1.8 * depth) * q.s, 0, Math.PI * 2)
        ctx.fillStyle = col(q.x, 0.25 + 0.7 * depth)
        ctx.fill()
      })

      // pulsos
      for (const p of pulses) {
        if (!reduced) p.t += p.sp
        if (p.t >= 1) {
          p.a = p.b
          const nb = adj[p.a]
          p.b = nb[Math.floor(Math.random() * nb.length)]
          p.t = 0
        }
        const a = P[p.a], b = P[p.b]
        const depth = 1 - ((a.z + b.z) / 2 + 1) / 2
        ctx.beginPath()
        ctx.arc(a.x + (b.x - a.x) * p.t, a.y + (b.y - a.y) * p.t, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,211,238,${(0.25 + 0.75 * depth).toFixed(3)})`
        ctx.fill()
      }

      // hubs + rótulos
      ctx.font = '500 13px "JetBrains Mono", ui-monospace, monospace'
      hubIdx.forEach((i) => {
        const q = P[i]
        const depth = 1 - (q.z + 1) / 2
        const al = 0.25 + 0.75 * depth
        ctx.beginPath()
        ctx.arc(q.x, q.y, 11 * q.s, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(34,211,238,${(al * 0.5).toFixed(3)})`
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(q.x, q.y, 5 * q.s, 0, Math.PI * 2)
        ctx.fillStyle = col(q.x, al)
        ctx.fill()
        const label = labels[pts[i].hub]
        if (!label) return
        const w = ctx.measureText(label).width
        const lx = q.x + 16, ly = q.y - 10
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(lx - 8, ly - 12, w + 16, 24, 12)
        else ctx.rect(lx - 8, ly - 12, w + 16, 24)
        ctx.fillStyle = `rgba(10,6,24,${(0.75 * al).toFixed(3)})`
        ctx.fill()
        ctx.strokeStyle = `rgba(61,44,120,${al.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = `rgba(237,234,255,${al.toFixed(3)})`
        ctx.fillText(label, lx, ly + 4.5)
      })
    }

    const loop = (ts) => {
      if (t0 === null) t0 = ts
      if (visible) draw(ts - t0)
      raf = requestAnimationFrame(loop)
    }

    resize()
    ro = new ResizeObserver(resize)
    ro.observe(cv)
    window.addEventListener('mousemove', onMove, { passive: true })

    if (reduced) {
      draw(0)
      return
    }
    io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true
    })
    io.observe(cv)
    started = true
    raf = requestAnimationFrame(loop)
  })

  onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf)
    ro?.disconnect()
    io?.disconnect()
    window.removeEventListener('mousemove', onMove)
    started = false
  })

  return { isRunning: () => started }
}
