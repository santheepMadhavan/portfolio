import { useEffect, useRef } from 'react'
import { skillLinks, skills } from '../data/skills'

const HUES = [222, 338, 158, 38, 272]
const isDark = () => {
  const t = document.documentElement.dataset.theme
  return t ? t === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
}

function buildGraph() {
  const nodes = []
  const byLabel = new Map()
  const edges = []
  skills.forEach((g, gi) => {
    const hub = { id: `hub-${gi}`, label: g.group, group: gi, hub: true, r: 15, x: 0, y: 0, vx: 0, vy: 0, phase: gi }
    nodes.push(hub)
    g.items.forEach((label, i) => {
      const n = { id: `${gi}-${i}`, label, group: gi, hub: false, r: 4.5, x: 0, y: 0, vx: 0, vy: 0, phase: gi * 7 + i }
      nodes.push(n)
      byLabel.set(label, n)
      edges.push({ a: hub, b: n, kind: 'hub' })
    })
  })
  skillLinks.forEach(([a, b]) => {
    const A = byLabel.get(a)
    const B = byLabel.get(b)
    if (A && B) edges.push({ a: A, b: B, kind: 'link' })
  })
  const adj = new Map(nodes.map((n) => [n, new Set([n])]))
  edges.forEach((e) => {
    adj.get(e.a).add(e.b)
    adj.get(e.b).add(e.a)
  })
  return { nodes, edges, adj }
}

/**
 * Force-directed skill graph on a 2D canvas: five clusters (one per skill
 * group), cross-links between related skills, hover to trace connections,
 * drag to throw nodes around. `focus` highlights one cluster.
 */
export default function SkillGraph({ focus, className = '' }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const focusRef = useRef(focus)

  useEffect(() => {
    focusRef.current = focus
  }, [focus])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const { nodes, edges, adj } = buildGraph()

    let W = 0
    let H = 0
    let dpr = 1
    let hover = null
    let drag = null
    let visible = true
    let alpha = 1
    let raf = 0
    let palette = null
    let tick = 0

    const readPalette = () => {
      const dark = isDark()
      const cs = getComputedStyle(document.documentElement)
      palette = {
        dark,
        ink: cs.getPropertyValue('--ink').trim() || '#14161b',
        muted: cs.getPropertyValue('--muted').trim() || '#5d6372',
        group: HUES.map((h) => `hsl(${h} ${dark ? 85 : 72}% ${dark ? 70 : 48}%)`),
        groupSoft: HUES.map((h) => `hsl(${h} ${dark ? 85 : 72}% ${dark ? 70 : 48}% / 0.16)`),
      }
    }
    readPalette()
    const themeObs = new MutationObserver(readPalette)
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const anchors = () =>
      HUES.map((_, i) => {
        const a = -Math.PI / 2 + (i / HUES.length) * Math.PI * 2
        return { x: W / 2 + Math.cos(a) * W * 0.34, y: H / 2 + Math.sin(a) * H * 0.31 }
      })
    let anchorPts = []

    const seed = () => {
      anchorPts = anchors()
      nodes.forEach((n) => {
        const a = anchorPts[n.group]
        n.x = n.hub ? W / 2 : a.x * 0.35 + (W / 2) * 0.65 + (Math.random() - 0.5) * 30
        n.y = n.hub ? H / 2 : a.y * 0.35 + (H / 2) * 0.65 + (Math.random() - 0.5) * 30
        n.vx = n.vy = 0
      })
    }

    const step = (a, t) => {
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j]
          let dx = p.x - q.x
          let dy = p.y - q.y
          const d2 = dx * dx + dy * dy + 0.01
          if (d2 > 260 * 260) continue
          const d = Math.sqrt(d2)
          const k = ((p.hub || q.hub ? 2600 : 900) / d2) * a
          dx /= d
          dy /= d
          p.vx += dx * k
          p.vy += dy * k
          q.vx -= dx * k
          q.vy -= dy * k
        }
      }
      for (const e of edges) {
        const dx = e.b.x - e.a.x
        const dy = e.b.y - e.a.y
        const d = Math.sqrt(dx * dx + dy * dy) || 1
        const L = e.kind === 'hub' ? Math.min(W, H) * 0.2 : Math.min(W, H) * 0.34
        const k = (e.kind === 'hub' ? 0.03 : 0.0012) * (d - L) * a
        const fx = (dx / d) * k
        const fy = (dy / d) * k
        e.a.vx += fx
        e.a.vy += fy
        e.b.vx -= fx
        e.b.vy -= fy
      }
      for (const n of nodes) {
        if (n.hub) {
          const an = anchorPts[n.group]
          n.vx += (an.x - n.x) * 0.08 * a
          n.vy += (an.y - n.y) * 0.08 * a
        } else {
          n.vx += (W / 2 - n.x) * 0.0004 * a
          n.vy += (H / 2 - n.y) * 0.0004 * a
        }
        if (!reduced) {
          n.vx += Math.sin(t * 0.0006 + n.phase * 1.7) * 0.012
          n.vy += Math.cos(t * 0.0005 + n.phase * 2.3) * 0.012
        }
        if (n === drag) continue
        n.vx *= 0.82
        n.vy *= 0.82
        n.x = Math.min(W - 16 - (n.hub ? n.lw / 2 : n.lw + n.r + 7), Math.max(n.hub ? 16 + n.lw / 2 : 20, n.x + n.vx))
        n.y = Math.min(H - 26, Math.max(26, n.y + n.vy))
      }
    }

    const measure = () => {
      for (const n of nodes) {
        ctx.font = n.hub ? '600 14px "Bricolage Grotesque Variable", sans-serif' : '11px "Geist Variable", sans-serif'
        n.lw = ctx.measureText(n.label).width
      }
    }
    const box = (n) =>
      n.hub
        ? { l: n.x - n.lw / 2 - 4, r: n.x + n.lw / 2 + 4, t: n.y - n.r, b: n.y + n.r + 24 }
        : { l: n.x - n.r - 2, r: n.x + n.r + 7 + n.lw, t: n.y - 8, b: n.y + 8 }
    const collide = () => {
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i]
        const A = box(p)
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j]
          const B = box(q)
          const ox = Math.min(A.r, B.r) - Math.max(A.l, B.l)
          const oy = Math.min(A.b, B.b) - Math.max(A.t, B.t)
          if (ox <= 0 || oy <= 0) continue
          const pushY = oy < ox * 0.6
          const dir = pushY ? Math.sign(p.y - q.y || Math.random() - 0.5) : Math.sign(p.x - q.x || Math.random() - 0.5)
          const amt = (pushY ? oy : ox) * 0.12
          if (pushY) {
            if (p !== drag) p.y += dir * amt
            if (q !== drag) q.y -= dir * amt
          } else {
            if (p !== drag) p.x += dir * amt
            if (q !== drag) q.x -= dir * amt
          }
        }
      }
    }

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      W = r.width
      H = r.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      measure()
      seed()
      alpha = 1
      if (reduced) for (let i = 0; i < 320; i++) { step(1 - i / 400, 0); collide() }
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H)
      const f = focusRef.current
      const lit = hover ? adj.get(hover) : null
      const dim = (n) => (lit ? !lit.has(n) : f != null && n.group !== f)

      ctx.lineWidth = 1
      for (const e of edges) {
        const on = lit ? lit.has(e.a) && lit.has(e.b) && (e.a === hover || e.b === hover) : f != null && (e.a.group === f || e.b.group === f) && e.kind === 'hub'
        ctx.globalAlpha = on ? 0.9 : dim(e.a) && dim(e.b) ? 0.05 : e.kind === 'hub' ? 0.22 : 0.12
        ctx.strokeStyle = e.kind === 'link' && !on ? palette.muted : palette.group[e.a.group]
        ctx.setLineDash(on && !reduced ? [5, 5] : e.kind === 'link' ? [2, 4] : [])
        ctx.lineDashOffset = on && !reduced ? -t * 0.03 : 0
        ctx.beginPath()
        ctx.moveTo(e.a.x, e.a.y)
        ctx.lineTo(e.b.x, e.b.y)
        ctx.stroke()
      }
      ctx.setLineDash([])

      ctx.textBaseline = 'middle'
      for (const n of nodes) {
        const faded = dim(n)
        const hot = n === hover
        ctx.globalAlpha = faded ? 0.18 : 1
        const col = palette.group[n.group]
        if (n.hub || hot) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.2)
          g.addColorStop(0, palette.groupSoft[n.group])
          g.addColorStop(1, 'transparent')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 3.2, 0, 7)
          ctx.fill()
        }
        ctx.fillStyle = n.hub ? col : hot ? col : palette.dark ? '#0d0e12' : '#ffffff'
        ctx.strokeStyle = col
        ctx.lineWidth = n.hub ? 0 : 1.6
        ctx.beginPath()
        ctx.arc(n.x, n.y, hot && !n.hub ? n.r + 2 : n.r, 0, 7)
        ctx.fill()
        if (!n.hub) ctx.stroke()

        ctx.fillStyle = palette.ink
        if (n.hub) {
          ctx.font = '600 14px "Bricolage Grotesque Variable", "Geist Variable", sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(n.label, n.x, n.y + n.r + 16)
        } else {
          ctx.font = `${hot ? 600 : 400} ${hot ? 13 : 11}px "Geist Variable", system-ui, sans-serif`
          ctx.textAlign = 'left'
          ctx.globalAlpha = faded ? 0.12 : hot || lit?.has(n) ? 1 : 0.72
          ctx.fillText(n.label, n.x + n.r + 5, n.y)
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (!visible || document.hidden) return
      if (tick++ % 60 === 0) readPalette()
      if (!reduced) {
        alpha += (0.06 - alpha) * 0.012
        step(Math.max(alpha, 0.06), t)
        collide()
      }
      draw(t)
    }

    const local = (e) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const pick = (x, y) => {
      let best = null
      let bd = Infinity
      for (const n of nodes) {
        const d = Math.hypot(n.x - x, n.y - y)
        const reach = n.r + (n.hub ? 14 : 12)
        if (d < reach && d < bd) {
          best = n
          bd = d
        }
      }
      return best
    }
    const onMove = (e) => {
      const p = local(e)
      if (drag) {
        drag.x = p.x
        drag.y = p.y
        alpha = Math.max(alpha, 0.25)
        return
      }
      hover = pick(p.x, p.y)
      canvas.style.cursor = hover ? 'grab' : 'default'
    }
    const onDown = (e) => {
      const p = local(e)
      const n = pick(p.x, p.y)
      if (!n) return
      drag = n
      canvas.setPointerCapture(e.pointerId)
      canvas.style.cursor = 'grabbing'
    }
    const onUp = () => {
      drag = null
      canvas.style.cursor = hover ? 'grab' : 'default'
    }
    const onLeave = () => {
      if (!drag) hover = null
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    canvas.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting
      if (visible) alpha = Math.max(alpha, 0.5) // re-energise when scrolled back into view
    })
    io.observe(wrap)
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      themeObs.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} aria-hidden="true" style={{ touchAction: 'pan-y', display: 'block' }} />
    </div>
  )
}
