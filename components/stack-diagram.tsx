'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * The two métiers as three planes floating in real 3D space: interfaces
 * and business core resting on sovereign infrastructure. On reveal the
 * plates separate out of a single stack; the whole assembly then tilts
 * with the cursor on a long lagged ease, so it reads as an object you
 * are turning in your hands rather than a drawing. Motes of value rise
 * through the layers, control settles back down.
 *
 * CSS 3D transforms only — the pointer just writes two angles.
 */

const PLATES = [
  {
    z: 96,
    accent: 'var(--blue)',
    fill: 'oklch(0.48 0.19 262 / 7%)',
    label: 'Interfaces & produits',
    labelTop: '11%',
    delay: 360,
  },
  {
    z: 0,
    accent: 'oklch(0.21 0.03 264 / 55%)',
    fill: 'oklch(0.21 0.03 264 / 5%)',
    label: 'Cœur métier',
    labelTop: '46%',
    delay: 180,
  },
  {
    z: -96,
    accent: 'var(--red)',
    fill: 'oklch(0.55 0.22 27 / 7%)',
    label: 'Infrastructure souveraine',
    labelTop: '81%',
    delay: 0,
  },
]

export function StackDiagram({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = node.parentElement ?? node
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        node.style.setProperty('--tilt-x', `${(-y * 13).toFixed(2)}deg`)
        node.style.setProperty('--tilt-z', `${(x * 20).toFixed(2)}deg`)
      })
    }
    const onLeave = () => {
      node.style.setProperty('--tilt-x', '0deg')
      node.style.setProperty('--tilt-z', '0deg')
    }
    target.addEventListener('mousemove', onMove)
    target.addEventListener('mouseleave', onLeave)
    return () => {
      target.removeEventListener('mousemove', onMove)
      target.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={cn('stack-scene', className)} aria-hidden="true">
      <div className="stack-3d">
        <div className="stack-shadow" />
        {PLATES.map((plate) => (
          <div
            key={plate.z}
            className="stack-plate"
            style={
              {
                '--pz': `${plate.z}px`,
                '--plate-accent': plate.accent,
                '--plate-fill': plate.fill,
                '--plate-delay': `${plate.delay}ms`,
              } as CSSProperties
            }
          >
            <div className="stack-plate__face" />
            <span className="stack-node" style={{ top: 0, left: 0 }} />
            <span className="stack-node" style={{ top: 0, right: 0 }} />
            <span className="stack-node" style={{ bottom: 0, right: 0 }} />
            <span className="stack-node" style={{ bottom: 0, left: 0 }} />
          </div>
        ))}
        {/* Value rises through the layers, control settles back down */}
        <span className="stack-mote stack-mote--up" />
        <span className="stack-mote stack-mote--down" />
      </div>

      <div className="stack-labels">
        {PLATES.map((plate) => (
          <span
            key={plate.label}
            className="stack-label"
            style={{ top: plate.labelTop, '--plate-delay': `${plate.delay + 500}ms` } as CSSProperties}
          >
            <span className="stack-label__tick" style={{ background: plate.accent }} />
            {plate.label}
          </span>
        ))}
      </div>
    </div>
  )
}
