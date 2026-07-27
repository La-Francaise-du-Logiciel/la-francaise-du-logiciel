'use client'

import { useEffect, useRef } from 'react'
import { CAPITALS, EUROPE_DOTS, FRANCE_COUNT, GRID_H, GRID_W } from '@/components/europe-dots'

/**
 * Europe as a particle map, rasterized from real Natural Earth geography.
 * The continent assembles dot by dot radiating out from Paris when scrolled
 * into view, with France picked out in blue. At rest it is perfectly still;
 * under the cursor the dots behave like a magnetic field — they push away,
 * brighten and swell, and settle back as the pointer moves on.
 *
 * Once assembled, the resting map is cached on an offscreen layer. Each
 * frame blits that layer, punches a hole around the cursor, and redraws
 * only the few hundred dots inside it, so interaction stays cheap no
 * matter how dense the map is. Paused offscreen, static under reduced
 * motion.
 */

const NEUTRAL = '60, 68, 92'
const BLUE = '37, 66, 178'
const RED = '209, 60, 42'

/** Pointer influence radius, and how far a dot at the center is pushed. */
const RADIUS = 96
const PUSH = 17
const CELL = 110

interface Dot {
  x: number
  y: number
  /** Normalized distance from Paris, used to stagger the build-in. */
  d: number
  a: number
  isFrance: boolean
  size: number
  color: string
}

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
    let layer: HTMLCanvasElement | null = null
    /** Dot indices bucketed by cell, so the cursor only tests nearby dots. */
    let buckets = new Map<number, number[]>()
    let cols = 0
    let reveal = reduceMotion ? 1 : 0
    let time = 0

    /* Raw pointer, the eased pointer the field actually follows, and how
       strongly the field is engaged (fades out when the cursor leaves). */
    const raw = { x: 0, y: 0, inside: false }
    let px = -9999
    let py = -9999
    let influence = 0

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
          a,
          isFrance,
          size: isFrance ? baseSize + 0.2 : baseSize,
          color: `rgba(${isFrance ? BLUE : NEUTRAL}, ${a.toFixed(3)})`,
        })
      }

      cols = Math.ceil(width / CELL) + 1
      buckets = new Map()
      dots.forEach((dot, i) => {
        dot.d /= maxD
        const key = Math.floor(dot.x / CELL) + Math.floor(dot.y / CELL) * cols
        const bucket = buckets.get(key)
        if (bucket) bucket.push(i)
        else buckets.set(key, [i])
      })
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

    /** Displacement + emphasis for a point inside the cursor's field. */
    const field = (x: number, y: number) => {
      const dx = x - px
      const dy = y - py
      const dist = Math.hypot(dx, dy)
      if (dist > RADIUS) return null
      const f = smoothstep(1 - dist / RADIUS) * influence
      if (f <= 0.002) return null
      const push = f * f * PUSH
      const inv = dist < 0.001 ? 0 : 1 / dist
      return { ox: dx * inv * push, oy: dy * inv * push, f }
    }

    const drawDot = (dot: Dot) => {
      const f = field(dot.x, dot.y)
      if (!f) {
        ctx.fillStyle = dot.color
        ctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size)
        return
      }
      /* Energized: brighter, a touch larger, and pulled toward French blue. */
      const size = dot.size * (1 + f.f * 0.75)
      const a = Math.min(0.95, dot.a + f.f * 0.5)
      const tint = dot.isFrance ? BLUE : f.f > 0.35 ? BLUE : NEUTRAL
      ctx.fillStyle = `rgba(${tint}, ${a})`
      ctx.fillRect(dot.x + f.ox - size / 2, dot.y + f.oy - size / 2, size, size)
    }

    const draw = (dt: number) => {
      time += dt

      /* The field lags the cursor slightly, which gives it a springy feel. */
      if (raw.inside) {
        if (px < -9000) {
          px = raw.x
          py = raw.y
        }
        px += (raw.x - px) * 0.16
        py += (raw.y - py) * 0.16
        influence += (1 - influence) * 0.12
      } else {
        influence += (0 - influence) * 0.08
      }

      if (reveal < 1) reveal = Math.min(1, reveal + dt / 2)

      ctx.clearRect(0, 0, width, height)

      if (reveal < 1) {
        for (const dot of dots) {
          const appear = smoothstep((reveal * 1.15 - dot.d) / 0.12)
          if (appear <= 0.02) continue
          ctx.globalAlpha = appear
          ctx.fillStyle = dot.color
          ctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size)
        }
        ctx.globalAlpha = 1
      } else {
        if (!layer) buildLayer()
        if (layer) ctx.drawImage(layer, 0, 0, width, height)

        if (influence > 0.004) {
          /* Punch a hole around the cursor and redraw just those dots. */
          const hole = RADIUS + PUSH + 6
          ctx.save()
          ctx.globalCompositeOperation = 'destination-out'
          ctx.beginPath()
          ctx.arc(px, py, hole, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()

          const c0 = Math.floor((px - hole) / CELL)
          const c1 = Math.floor((px + hole) / CELL)
          const r0 = Math.floor((py - hole) / CELL)
          const r1 = Math.floor((py + hole) / CELL)
          const holeSq = hole * hole
          for (let r = r0; r <= r1; r++) {
            for (let c = c0; c <= c1; c++) {
              const bucket = buckets.get(c + r * cols)
              if (!bucket) continue
              for (const i of bucket) {
                const dot = dots[i]
                const dx = dot.x - px
                const dy = dot.y - py
                if (dx * dx + dy * dy <= holeSq) drawDot(dot)
              }
            }
          }
        }
      }

      /* Capitals ride the same field; Paris is the vermilion anchor. */
      nodes.forEach((n, i) => {
        const breathe = reduceMotion ? 0 : Math.sin(time * 1.6 + i * 1.7) * 0.35
        const f = field(n.x, n.y)
        const x = n.x + (f?.ox ?? 0)
        const y = n.y + (f?.oy ?? 0)
        const boost = (f?.f ?? 0) * 1.4
        ctx.fillStyle = i === 0 ? `rgba(${RED}, ${0.9 * reveal})` : `rgba(${BLUE}, ${0.7 * reveal})`
        ctx.beginPath()
        ctx.arc(x, y, (i === 0 ? 2.6 : 1.9) + breathe + boost, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      raw.x = e.clientX - rect.left
      raw.y = e.clientY - rect.top
      raw.inside = true
    }
    const onLeave = () => {
      raw.inside = false
    }
    if (!reduceMotion) {
      canvas.addEventListener('mousemove', onMove)
      canvas.addEventListener('mouseleave', onLeave)
    }

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
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="h-full w-full" />
}
