'use client'

import { useEffect, useRef } from 'react'

/**
 * A quiet blueprint grid. The base grid is nearly static and very faint, so at
 * rest it reads as a subtle engineering texture rather than an animation. A
 * soft highlight gently reveals a little more of the grid where the cursor is,
 * easing in and out. When the pointer is idle (or on touch devices) the
 * highlight drifts very slowly so the surface feels alive without demanding
 * attention. Fully static when the user prefers reduced motion.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointerRef = useRef({ x: 0.5, y: 0.4, active: false, lastMove: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Offscreen layer used to soft-mask the highlighted grid.
    const layer = document.createElement('canvas')
    const lctx = layer.getContext('2d')
    if (!lctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const GAP = 40 // grid spacing in px

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      for (const c of [canvas, layer]) {
        c.width = width * dpr
        c.height = height * dpr
        c.style.width = `${width}px`
        c.style.height = `${height}px`
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    // Track the pointer over the hero section (moves bubble up from children).
    const section = canvas.closest('section')
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current.x = (e.clientX - rect.left) / rect.width
      pointerRef.current.y = (e.clientY - rect.top) / rect.height
      pointerRef.current.active = true
      pointerRef.current.lastMove = performance.now()
    }
    const onLeave = () => (pointerRef.current.active = false)
    section?.addEventListener('mousemove', onMove)
    section?.addEventListener('mouseleave', onLeave)

    // Eased highlight position (in px) and strength.
    let hx = width * 0.5
    let hy = height * 0.4
    let strength = 0

    const drawGrid = (
      context: CanvasRenderingContext2D,
      color: string,
      lineWidth: number,
    ) => {
      context.strokeStyle = color
      context.lineWidth = lineWidth
      context.beginPath()
      for (let y = 0; y <= height; y += GAP) {
        context.moveTo(0, y)
        context.lineTo(width, y)
      }
      for (let x = 0; x <= width; x += GAP) {
        context.moveTo(x, 0)
        context.lineTo(x, height)
      }
      context.stroke()
    }

    let raf = 0
    let t = 0

    const frame = () => {
      t += 0.005
      const now = performance.now()
      const idle = !pointerRef.current.active || now - pointerRef.current.lastMove > 2200

      // Target: follow the pointer, or drift slowly in a wide, calm path.
      let tx: number
      let ty: number
      if (idle) {
        tx = (0.5 + 0.28 * Math.cos(t * 0.6)) * width
        ty = (0.42 + 0.2 * Math.sin(t * 0.45)) * height
      } else {
        tx = pointerRef.current.x * width
        ty = pointerRef.current.y * height
      }
      hx += (tx - hx) * 0.05
      hy += (ty - hy) * 0.05

      // Highlight is a touch stronger when actively hovering.
      const targetStrength = pointerRef.current.active && !idle ? 1 : 0.55
      strength += (targetStrength - strength) * 0.04

      ctx.clearRect(0, 0, width, height)

      // Base grid: extremely faint, essentially static.
      drawGrid(ctx, 'rgba(60, 68, 92, 0.05)', 1)

      // Highlight grid on the offscreen layer, then soft-mask it to a disc
      // around the eased highlight point and composite it over the base.
      lctx.clearRect(0, 0, width, height)
      drawGrid(lctx, 'rgba(37, 66, 178, 0.5)', 1)
      lctx.globalCompositeOperation = 'destination-in'
      const radius = Math.min(width, height) * 0.42
      const grad = lctx.createRadialGradient(hx, hy, 0, hx, hy, radius)
      const peak = 0.32 * strength
      grad.addColorStop(0, `rgba(0, 0, 0, ${peak})`)
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      lctx.fillStyle = grad
      lctx.fillRect(0, 0, width, height)
      lctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(layer, 0, 0, width, height)

      if (!reduceMotion) raf = requestAnimationFrame(frame)
    }

    frame()

    return () => {
      window.removeEventListener('resize', onResize)
      section?.removeEventListener('mousemove', onMove)
      section?.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Vignette so the grid fades gracefully into the page edges */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_60%,var(--background)_100%)]" />
    </div>
  )
}
