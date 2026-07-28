'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { getMessages } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * The company's proposition drawn in the same dot language as the Europe
 * map: two axes — conseil coming in from above, souveraineté from below —
 * converge on a single node and continue as one rising trajectory. Light
 * travels each branch in turn, meets at the node, and carries on upward.
 * The dots lift toward the cursor exactly like the map does.
 *
 * Structure and pulses are CSS; only the lift needs JavaScript.
 */

const W = 560
const H = 340
const NODE = { x: 250, y: 170 }

/** Pointer influence, in viewBox units. */
const RADIUS = 104
const LIFT = 23

type Pt = { x: number; y: number }

/** Points along a quadratic bezier, evenly spaced in t. */
function sample(from: Pt, cp: Pt, to: Pt, n: number, skipFirst = false): Pt[] {
  const out: Pt[] = []
  for (let i = skipFirst ? 1 : 0; i <= n; i++) {
    const t = i / n
    const u = 1 - t
    out.push({
      x: u * u * from.x + 2 * u * t * cp.x + t * t * to.x,
      y: u * u * from.y + 2 * u * t * cp.y + t * t * to.y,
    })
  }
  return out
}

const BRANCH_A = sample({ x: 42, y: 72 }, { x: 152, y: 72 }, NODE, 13)
const BRANCH_B = sample({ x: 42, y: 268 }, { x: 152, y: 268 }, NODE, 13)
const TRAJECTORY = sample(NODE, { x: 386, y: 168 }, { x: 522, y: 74 }, 19, true)

/** Seconds between one dot lighting up and the next along a branch. */
const STEP = 0.075
const CYCLE = 4
/** The branches arrive together, then the trajectory carries on. */
const TRAJECTORY_OFFSET = (BRANCH_A.length - 1) * STEP

const FIELD_GAP = 22
const FIELD_MARGIN = 14

/** Faint background dots, minus any that would crowd the flow. */
const FIELD: Pt[] = (() => {
  const flow = [...BRANCH_A, ...BRANCH_B, ...TRAJECTORY, NODE]
  const out: Pt[] = []
  for (let y = FIELD_MARGIN; y <= H - FIELD_MARGIN; y += FIELD_GAP) {
    for (let x = FIELD_MARGIN; x <= W - FIELD_MARGIN; x += FIELD_GAP) {
      if (flow.some((p) => Math.hypot(p.x - x, p.y - y) < 15)) continue
      out.push({ x, y })
    }
  }
  return out
})()

const smoothstep = (v: number) => {
  const c = Math.min(1, Math.max(0, v))
  return c * c * (3 - 2 * c)
}

/** Entrance runs left to right across the whole drawing. */
const entrance = (x: number) => `${Math.round((x / W) * 520)}ms`

export function HeroFlow({ className }: { className?: string }) {
  const t = getMessages().heroFlow
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = Array.from(svg.querySelectorAll<SVGElement>('[data-dot]')).map((el) => ({
      el,
      x: Number(el.dataset.x),
      y: Number(el.dataset.y),
      lifted: false,
    }))

    const target = svg.closest('[data-flow-surface]') ?? svg
    let raf = 0
    let pointer: Pt | null = null

    const apply = () => {
      raf = 0
      for (const dot of nodes) {
        const f = pointer
          ? smoothstep(1 - Math.hypot(dot.x - pointer.x, dot.y - pointer.y) / RADIUS)
          : 0
        if (f <= 0.004) {
          if (dot.lifted) {
            dot.el.style.transform = ''
            dot.lifted = false
          }
          continue
        }
        dot.el.style.transform = `translateY(${(-f * f * LIFT).toFixed(2)}px) scale(${(1 + f * 1.2).toFixed(3)})`
        dot.lifted = true
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const onMove = (event: Event) => {
      const e = event as MouseEvent
      const rect = svg.getBoundingClientRect()
      pointer = {
        x: ((e.clientX - rect.left) / rect.width) * W,
        y: ((e.clientY - rect.top) / rect.height) * H,
      }
      schedule()
    }
    const onLeave = () => {
      pointer = null
      schedule()
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
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className={cn('flow-svg', className)}
      role="img"
      aria-label={t.label}
      style={{ '--cycle': `${CYCLE}s` } as CSSProperties}
    >
      {FIELD.map((p) => (
        <circle
          key={`f${p.x}-${p.y}`}
          data-dot
          data-x={p.x}
          data-y={p.y}
          className="flow-dot flow-field"
          cx={p.x}
          cy={p.y}
          r={1.6}
          style={{ '--d': entrance(p.x) } as CSSProperties}
        />
      ))}

      {[
        /* The two axes arrive in their own colours; what leaves the node
           belongs to neither — it is the single trajectory they make. */
        { pts: BRANCH_A, tone: 'var(--blue)', prefix: 'a', offset: 0, rest: 0.42 },
        { pts: BRANCH_B, tone: 'var(--red)', prefix: 'b', offset: 0, rest: 0.42 },
        {
          pts: TRAJECTORY,
          tone: 'var(--foreground)',
          prefix: 't',
          offset: TRAJECTORY_OFFSET,
          rest: 0.5,
        },
      ].map(({ pts, tone, prefix, offset, rest }) =>
        pts.map((p, i) => (
          <g
            key={`${prefix}${i}`}
            data-dot
            data-x={p.x}
            data-y={p.y}
            className="flow-dot"
            style={{ '--d': entrance(p.x) } as CSSProperties}
          >
            <circle
              className="flow-beam"
              cx={p.x}
              cy={p.y}
              r={prefix === 't' && i === pts.length - 1 ? 3.8 : 2.5}
              fill={tone}
              style={
                {
                  '--o': rest,
                  '--pd': `${(offset + i * STEP).toFixed(3)}s`,
                } as CSSProperties
              }
            />
          </g>
        )),
      )}

      {/* Where the two axes become one */}
      <g
        data-dot
        data-x={NODE.x}
        data-y={NODE.y}
        className="flow-dot"
        style={{ '--d': entrance(NODE.x) } as CSSProperties}
      >
        <circle
          className="flow-node-ring"
          cx={NODE.x}
          cy={NODE.y}
          r={9}
          style={{ '--pd': `${TRAJECTORY_OFFSET.toFixed(3)}s` } as CSSProperties}
        />
        <circle
          className="flow-beam"
          cx={NODE.x}
          cy={NODE.y}
          r={4}
          fill="var(--blue)"
          style={{ '--o': 0.85, '--pd': `${TRAJECTORY_OFFSET.toFixed(3)}s` } as CSSProperties}
        />
      </g>
    </svg>
  )
}
