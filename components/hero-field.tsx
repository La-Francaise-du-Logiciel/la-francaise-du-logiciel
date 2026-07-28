'use client'

import { useEffect, useRef } from 'react'

/**
 * The two métiers as one surface. Two wave sources, conseil in blue above
 * and souveraineté in vermilion below, interfere continuously across the
 * panel; where they meet the colour resolves to neutral. It fades out
 * against the headline on its left and runs off the right of the page.
 *
 * Canvas 2D, paused when offscreen, still under reduced motion. The dots
 * also lift toward the cursor, matching the Europe map.
 */

const NEUTRAL: RGB = [96, 104, 128]
const BLUE: RGB = [37, 66, 178]
const RED: RGB = [201, 62, 45]

/** Grid pitch in CSS pixels: small and tight. */
const GAP = 12
const DOT = 1.5

/** Wave shape: crest spacing and how fast crests travel outward. */
const WAVELENGTH = 96
const PERIOD = 5.2
/** How quickly each source's contribution falls off with distance. */
const REACH = 320
/** Width of the band where the two colours meet; smaller is more polarized. */
const BLEND = 150

const RADIUS = 108
const LIFT = 20

type RGB = [number, number, number]

const smoothstep = (v: number) => {
  const c = Math.min(1, Math.max(0, v))
  return c * c * (3 - 2 * c)
}

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let cells: { x: number; y: number; edge: number; delay: number }[] = []
    let time = reduceMotion ? 1.9 : 0
    let reveal = reduceMotion ? 1 : 0

    const pointer = { x: 0, y: 0, inside: false }
    let px = 0
    let py = 0
    let influence = 0

    const build = () => {
      cells = []
      const cols = Math.max(1, Math.floor((width - GAP) / GAP))
      const rows = Math.max(1, Math.floor((height - GAP) / GAP))
      const offX = (width - cols * GAP) / 2
      const offY = (height - rows * GAP) / 2
      const diag = Math.hypot(width, height) || 1

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = offX + c * GAP
          const y = offY + r * GAP
          /* Fades toward the text on the left and softly top and bottom;
             the right runs off the page, so it keeps its full strength. */
          const edge = smoothstep(x / 70) * smoothstep(Math.min(y, height - y) / 44)
          if (edge <= 0.01) continue
          cells.push({ x, y, edge, delay: (x + y * 0.35) / diag })
        }
      }
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

    const k = (Math.PI * 2) / WAVELENGTH
    const omega = (Math.PI * 2) / PERIOD

    const draw = (dt: number) => {
      time += dt
      if (reveal < 1) reveal = Math.min(1, reveal + dt / 1.5)

      if (pointer.inside) {
        px += (pointer.x - px) * 0.16
        py += (pointer.y - py) * 0.16
        influence += (1 - influence) * 0.12
      } else {
        influence += (0 - influence) * 0.07
      }

      /* The two sources drift slowly, so the pattern never repeats visibly. */
      const ax = width * (0.3 + 0.07 * Math.cos(time * 0.21))
      const ay = height * (0.26 + 0.09 * Math.sin(time * 0.17))
      const bx = width * (0.26 + 0.08 * Math.sin(time * 0.19))
      const by = height * (0.76 + 0.08 * Math.cos(time * 0.23))

      ctx.clearRect(0, 0, width, height)

      for (const cell of cells) {
        const appear = smoothstep((reveal * 1.5 - cell.delay) / 0.35)
        if (appear <= 0.02) continue

        const d1 = Math.hypot(cell.x - ax, cell.y - ay)
        const d2 = Math.hypot(cell.x - bx, cell.y - by)
        const f1 = 1 / (1 + d1 / REACH)
        const f2 = 1 / (1 + d2 / REACH)
        const w1 = Math.sin(k * d1 - omega * time) * f1
        const w2 = Math.sin(k * d2 - omega * time + 1.1) * f2
        /* Crests read bright, troughs fade back into the paper. */
        const amp = Math.pow(smoothstep((w1 + w2) * 0.95 + 0.46), 1.35)

        const lift = influence > 0.004 ? field(cell.x, cell.y) : null
        const boost = lift?.f ?? 0

        const size = DOT * (0.55 + amp * 1.05 + boost * 1.1)
        const alpha = (0.07 + amp * 0.46 + boost * 0.34) * cell.edge * appear

        /* Colour by which source is nearer, running red to neutral to blue
           rather than straight red to blue, which would go muddy purple
           across the whole middle of the panel. */
        const tone = smoothstep((d2 - d1) / BLEND / 2 + 0.5)
        const hue: RGB =
          tone < 0.5
            ? [
                RED[0] + (NEUTRAL[0] - RED[0]) * (tone * 2),
                RED[1] + (NEUTRAL[1] - RED[1]) * (tone * 2),
                RED[2] + (NEUTRAL[2] - RED[2]) * (tone * 2),
              ]
            : [
                NEUTRAL[0] + (BLUE[0] - NEUTRAL[0]) * ((tone - 0.5) * 2),
                NEUTRAL[1] + (BLUE[1] - NEUTRAL[1]) * ((tone - 0.5) * 2),
                NEUTRAL[2] + (BLUE[2] - NEUTRAL[2]) * ((tone - 0.5) * 2),
              ]
        const mixIn = Math.min(1, amp * 0.85 + boost * 0.5)
        const r = NEUTRAL[0] + (hue[0] - NEUTRAL[0]) * mixIn
        const g = NEUTRAL[1] + (hue[1] - NEUTRAL[1]) * mixIn
        const b = NEUTRAL[2] + (hue[2] - NEUTRAL[2]) * mixIn

        ctx.fillStyle = `rgba(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(cell.x, cell.y - (lift?.lift ?? 0), size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const field = (x: number, y: number) => {
      const dist = Math.hypot(x - px, y - py)
      if (dist > RADIUS) return null
      const f = smoothstep(1 - dist / RADIUS) * influence
      if (f <= 0.002) return null
      return { lift: f * f * LIFT, f }
    }

    resize()
    window.addEventListener('resize', resize)

    const surface = canvas.closest('[data-flow-surface]') ?? canvas
    const onMove = (event: Event) => {
      const e = event as MouseEvent
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      if (!pointer.inside) {
        px = pointer.x
        py = pointer.y
      }
      pointer.inside = true
    }
    const onLeave = () => {
      pointer.inside = false
    }
    if (!reduceMotion) {
      surface.addEventListener('mousemove', onMove)
      surface.addEventListener('mouseleave', onLeave)
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
      { threshold: 0.05 },
    )
    observer.observe(canvas)

    return () => {
      window.removeEventListener('resize', resize)
      surface.removeEventListener('mousemove', onMove)
      surface.removeEventListener('mouseleave', onLeave)
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
}
