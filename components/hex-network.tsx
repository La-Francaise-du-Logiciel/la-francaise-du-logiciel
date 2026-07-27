'use client'

import { useEffect, useRef } from 'react'

/**
 * L'Hexagone as a particle network. Dots build in radially from the center
 * when scrolled into view (like Stripe's globe assembling itself), then
 * pulses of data travel arcs between nodes — and never leave the hexagon.
 * The whole drawing drifts a few pixels against the cursor. Canvas 2D,
 * paused offscreen, fully static under reduced motion.
 */

const NEUTRAL = '60, 68, 92'
const BLUE = '37, 66, 178'
const RED = '209, 60, 42'

interface Dot {
  x: number
  y: number
  /** Normalized distance from center, used to stagger the build-in. */
  d: number
  r: number
  a: number
}

interface Arc {
  pts: { x: number; y: number }[]
  t: number
  color: string
}

const GROW = 0.7
const TRAVEL = 1.1
const FADE = 0.7
const LIFE = GROW + TRAVEL + FADE

const smoothstep = (v: number) => {
  const c = Math.min(1, Math.max(0, v))
  return c * c * (3 - 2 * c)
}

export function HexNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dots: Dot[] = []
    let nodes: { x: number; y: number }[] = []
    let arcs: Arc[] = []
    let reveal = reduceMotion ? 1 : 0
    let spawnIn = 0.4
    let time = 0
    let ox = 0
    let oy = 0
    const pointer = { x: 0.5, y: 0.5 }

    const build = () => {
      const R = Math.min(width * 0.4, height * 0.46)
      const cx = width / 2
      const cy = height / 2
      /* Pointy-top hexagon, slightly squashed — l'Hexagone. */
      const verts = Array.from({ length: 6 }, (_, i) => {
        const ang = (Math.PI / 180) * (-90 + i * 60)
        return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) * 0.94 }
      })
      const inHex = (x: number, y: number) => {
        let inside = false
        for (let i = 0, j = 5; i < 6; j = i++) {
          const { x: xi, y: yi } = verts[i]
          const { x: xj, y: yj } = verts[j]
          if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
        }
        return inside
      }

      dots = []
      const s = 15
      for (let row = 0, y = cy - R; y <= cy + R; y += s * 0.87, row++) {
        for (let x = cx - R + (row % 2) * (s / 2); x <= cx + R; x += s) {
          if (!inHex(x, y)) continue
          dots.push({
            x,
            y,
            d: Math.hypot(x - cx, y - cy) / R,
            r: 1 + Math.random() * 0.6,
            a: 0.12 + Math.random() * 0.12,
          })
        }
      }
      /* Denser dots along the edges so the outline reads crisply. */
      for (let i = 0; i < 6; i++) {
        const a = verts[i]
        const b = verts[(i + 1) % 6]
        const steps = Math.round(Math.hypot(b.x - a.x, b.y - a.y) / 7)
        for (let k = 0; k <= steps; k++) {
          const x = a.x + ((b.x - a.x) * k) / steps
          const y = a.y + ((b.y - a.y) * k) / steps
          dots.push({ x, y, d: 1, r: 1.2, a: 0.32 })
        }
      }

      const inward = (v: { x: number; y: number }, f: number) => ({
        x: cx + (v.x - cx) * f,
        y: cy + (v.y - cy) * f,
      })
      nodes = [
        { x: cx + R * 0.02, y: cy - R * 0.18 },
        ...verts.map((v) => inward(v, 0.84)),
        { x: cx - R * 0.46, y: cy + R * 0.08 },
        { x: cx + R * 0.38, y: cy + R * 0.34 },
        { x: cx + R * 0.12, y: cy + R * 0.62 },
        { x: cx - R * 0.22, y: cy - R * 0.52 },
      ]
      arcs = []
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      if (reduceMotion) draw(0)
    }

    const spawnArc = () => {
      /* The central node (Paris) anchors most journeys. */
      const i = Math.random() < 0.55 ? 0 : 1 + Math.floor(Math.random() * (nodes.length - 1))
      let j = i
      while (j === i) j = Math.floor(Math.random() * nodes.length)
      const from = nodes[i]
      const to = nodes[j]
      const dx = to.x - from.x
      const dy = to.y - from.y
      const len = Math.hypot(dx, dy) || 1
      const k = len * (0.18 + Math.random() * 0.12) * (Math.random() < 0.5 ? 1 : -1)
      const cpx = (from.x + to.x) / 2 + (-dy / len) * k
      const cpy = (from.y + to.y) / 2 + (dx / len) * k
      const pts = Array.from({ length: 48 }, (_, n) => {
        const t = n / 47
        const u = 1 - t
        return {
          x: u * u * from.x + 2 * u * t * cpx + t * t * to.x,
          y: u * u * from.y + 2 * u * t * cpy + t * t * to.y,
        }
      })
      arcs.push({ pts, t: 0, color: Math.random() < 0.18 ? RED : BLUE })
    }

    const draw = (dt: number) => {
      time += dt
      ox += ((pointer.x - 0.5) * 14 - ox) * 0.04
      oy += ((pointer.y - 0.5) * 10 - oy) * 0.04
      if (reveal < 1) reveal = Math.min(1, reveal + dt / 1.6)

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.translate(ox, oy)

      for (const dot of dots) {
        const appear = smoothstep((reveal * 1.15 - dot.d) / 0.15)
        if (appear <= 0.01) continue
        ctx.fillStyle = `rgba(${NEUTRAL}, ${dot.a * appear})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
        ctx.fill()
      }

      nodes.forEach((n, i) => {
        const breathe = reduceMotion ? 0 : Math.sin(time * 1.6 + i * 1.7) * 0.4
        ctx.fillStyle = `rgba(${BLUE}, ${0.55 * reveal})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2 + breathe, 0, Math.PI * 2)
        ctx.fill()
      })

      if (!reduceMotion) {
        spawnIn -= dt
        if (reveal > 0.6 && spawnIn <= 0 && arcs.length < 4) {
          spawnArc()
          spawnIn = 0.5 + Math.random() * 0.9
        }

        for (const arc of arcs) {
          arc.t += dt
          const grow = Math.min(1, arc.t / GROW)
          const fade = arc.t > GROW + TRAVEL ? 1 - (arc.t - GROW - TRAVEL) / FADE : 1
          const upto = Math.max(2, Math.floor(arc.pts.length * (1 - Math.pow(1 - grow, 3))))
          ctx.strokeStyle = `rgba(${arc.color}, ${0.3 * fade})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(arc.pts[0].x, arc.pts[0].y)
          for (let n = 1; n < upto; n++) ctx.lineTo(arc.pts[n].x, arc.pts[n].y)
          ctx.stroke()

          if (arc.t > GROW && arc.t <= GROW + TRAVEL) {
            const p = (arc.t - GROW) / TRAVEL
            const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
            const pt = arc.pts[Math.min(47, Math.floor(eased * 47))]
            const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 9)
            glow.addColorStop(0, `rgba(${arc.color}, 0.5)`)
            glow.addColorStop(1, `rgba(${arc.color}, 0)`)
            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = `rgba(${arc.color}, 0.95)`
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        arcs = arcs.filter((a) => a.t < LIFE)
      }

      ctx.restore()
    }

    resize()
    window.addEventListener('resize', resize)

    const section = canvas.closest('section')
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - rect.left) / rect.width
      pointer.y = (e.clientY - rect.top) / rect.height
    }
    if (!reduceMotion) section?.addEventListener('mousemove', onMove)

    let raf = 0
    let last = 0
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
      last = now
      draw(dt)
      raf = requestAnimationFrame(loop)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting)
        if (visible && !raf && !reduceMotion) {
          last = performance.now()
          raf = requestAnimationFrame(loop)
        } else if (!visible && raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(canvas)

    return () => {
      window.removeEventListener('resize', resize)
      section?.removeEventListener('mousemove', onMove)
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
}
