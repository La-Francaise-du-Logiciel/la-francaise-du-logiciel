'use client'

import { useEffect, useRef } from 'react'
import { CAPITALS, EUROPE_DOTS, FRANCE_COUNT, GRID_H, GRID_W } from '@/components/europe-dots'

/**
 * Europe as a particle map, rasterized from real Natural Earth geography.
 * The continent assembles dot by dot radiating out from Paris when scrolled
 * into view; France is picked out in blue; pulses of data travel arcs
 * between European capitals — and never leave the map. Once assembled, the
 * static dots are cached on an offscreen layer so each frame stays cheap.
 * Paused offscreen, fully static under reduced motion.
 */

const NEUTRAL = '60, 68, 92'
const BLUE = '37, 66, 178'
const RED = '209, 60, 42'

interface Dot {
  x: number
  y: number
  /** Normalized distance from Paris, used to stagger the build-in. */
  d: number
  color: string
  size: number
}

interface Arc {
  pts: { x: number; y: number }[]
  t: number
  color: string
}

const GROW = 0.7
const TRAVEL = 1.2
const FADE = 0.7
const LIFE = GROW + TRAVEL + FADE

const smoothstep = (v: number) => {
  const c = Math.min(1, Math.max(0, v))
  return c * c * (3 - 2 * c)
}

export function EuropeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = 1
    let dots: Dot[] = []
    let nodes: { x: number; y: number }[] = []
    let arcs: Arc[] = []
    let layer: HTMLCanvasElement | null = null
    let reveal = reduceMotion ? 1 : 0
    let spawnIn = 0.4
    let time = 0
    let ox = 0
    let oy = 0
    const pointer = { x: 0.5, y: 0.5 }

    const build = () => {
      /* Bleed to the full canvas width; when the map is taller than the
         canvas, center the crop on the band just north of Paris. The CSS
         masks on the container fade the cropped edges out smoothly. */
      const scale = width / GRID_W
      const mapH = GRID_H * scale
      const offX = 0
      const offY =
        mapH <= height
          ? (height - mapH) / 2
          : Math.min(0, Math.max(height - mapH, height / 2 - 455 * scale))

      nodes = CAPITALS.map((c) => ({ x: offX + c.x * scale, y: offY + c.y * scale }))
      const paris = nodes[0]

      const baseSize = scale > 0.85 ? 2.1 : 1.5
      dots = []
      let maxD = 1
      for (let i = 0; i < EUROPE_DOTS.length; i += 2) {
        const gx = EUROPE_DOTS[i]
        const gy = EUROPE_DOTS[i + 1]
        const x = offX + gx * scale
        const y = offY + gy * scale
        if (y < -24 || y > height + 24) continue
        /* The viewport cuts arctic Norway and western Russia mid-land:
           fade dots approaching those borders so the crop reads softly. */
        const edge = Math.min(1, gy / 44, (GRID_W - gx) / 44, gx / 30)
        if (edge <= 0.02) continue
        const isFrance = i < FRANCE_COUNT * 2
        const a = (isFrance ? 0.55 : 0.34) * edge * (0.82 + Math.random() * 0.18)
        const d = Math.hypot(x - paris.x, y - paris.y)
        if (d > maxD) maxD = d
        dots.push({
          x,
          y,
          d,
          color: `rgba(${isFrance ? BLUE : NEUTRAL}, ${a.toFixed(3)})`,
          size: isFrance ? baseSize + 0.2 : baseSize,
        })
      }
      for (const dot of dots) dot.d /= maxD
      arcs = []
      layer = null
    }

    const buildLayer = () => {
      layer = document.createElement('canvas')
      layer.width = width * dpr
      layer.height = height * dpr
      const lctx = layer.getContext('2d')
      if (!lctx) return
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      for (const dot of dots) {
        lctx.fillStyle = dot.color
        lctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size)
      }
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      if (reduceMotion) draw(0)
    }

    const spawnArc = () => {
      /* Paris anchors most journeys. */
      const i = Math.random() < 0.6 ? 0 : 1 + Math.floor(Math.random() * (nodes.length - 1))
      let j = i
      while (j === i) j = Math.floor(Math.random() * nodes.length)
      const from = nodes[i]
      const to = nodes[j]
      const dx = to.x - from.x
      const dy = to.y - from.y
      const len = Math.hypot(dx, dy) || 1
      const k = len * (0.16 + Math.random() * 0.1) * (Math.random() < 0.5 ? 1 : -1)
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
      arcs.push({ pts, t: 0, color: Math.random() < 0.15 ? RED : BLUE })
    }

    const draw = (dt: number) => {
      time += dt
      ox += ((pointer.x - 0.5) * 12 - ox) * 0.04
      oy += ((pointer.y - 0.5) * 8 - oy) * 0.04
      if (reveal < 1) reveal = Math.min(1, reveal + dt / 2)

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.translate(ox, oy)

      if (reveal >= 1) {
        if (!layer) buildLayer()
        if (layer) ctx.drawImage(layer, 0, 0, width, height)
      } else {
        for (const dot of dots) {
          const appear = smoothstep((reveal * 1.15 - dot.d) / 0.12)
          if (appear <= 0.02) continue
          ctx.globalAlpha = appear
          ctx.fillStyle = dot.color
          ctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size)
        }
        ctx.globalAlpha = 1
      }

      /* Capitals breathe; Paris carries a slow vermilion sonar ring. */
      nodes.forEach((n, i) => {
        const breathe = reduceMotion ? 0 : Math.sin(time * 1.6 + i * 1.7) * 0.4
        ctx.fillStyle = i === 0 ? `rgba(${RED}, ${0.9 * reveal})` : `rgba(${BLUE}, ${0.7 * reveal})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, (i === 0 ? 2.6 : 1.9) + breathe, 0, Math.PI * 2)
        ctx.fill()
      })
      if (!reduceMotion && reveal > 0.3) {
        const p = (time % 3) / 3
        const paris = nodes[0]
        ctx.strokeStyle = `rgba(${RED}, ${(1 - p) * 0.35 * reveal})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(paris.x, paris.y, 4 + p * 26, 0, Math.PI * 2)
        ctx.stroke()
      }

      if (!reduceMotion) {
        spawnIn -= dt
        if (reveal > 0.55 && spawnIn <= 0 && arcs.length < 5) {
          spawnArc()
          spawnIn = 0.4 + Math.random() * 0.8
        }

        for (const arc of arcs) {
          arc.t += dt
          const grow = Math.min(1, arc.t / GROW)
          const fade = arc.t > GROW + TRAVEL ? 1 - (arc.t - GROW - TRAVEL) / FADE : 1
          const upto = Math.max(2, Math.floor(arc.pts.length * (1 - Math.pow(1 - grow, 3))))
          ctx.strokeStyle = `rgba(${arc.color}, ${0.32 * fade})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(arc.pts[0].x, arc.pts[0].y)
          for (let n = 1; n < upto; n++) ctx.lineTo(arc.pts[n].x, arc.pts[n].y)
          ctx.stroke()

          if (arc.t > GROW && arc.t <= GROW + TRAVEL) {
            const p = (arc.t - GROW) / TRAVEL
            const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
            const pt = arc.pts[Math.min(47, Math.floor(eased * 47))]
            const glow = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 8)
            glow.addColorStop(0, `rgba(${arc.color}, 0.5)`)
            glow.addColorStop(1, `rgba(${arc.color}, 0)`)
            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = `rgba(${arc.color}, 0.95)`
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 1.7, 0, Math.PI * 2)
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
