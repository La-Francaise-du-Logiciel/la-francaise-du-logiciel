import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/**
 * Blueprint of the two métiers as an exploded stack: business software
 * (interfaces + cœur métier) resting on sovereign infrastructure. Each
 * plate draws itself in when revealed (stroke draw + fill fade) and then
 * floats gently; each surface carries its own schematic — UI panels on
 * top, a service graph in the middle, server blocks at the base — while
 * pulses of value travel the rails and a dotted orbit circles the core.
 * Pure SVG + CSS keyframes, static under reduced motion.
 */

const HW = 150
const HH = 42
const CX = 250

/* Map plate-surface coordinates (a, b ∈ [-1, 1]) to screen space. */
const pt = (cy: number, a: number, b: number) => ({
  x: CX + ((a - b) * HW) / 2,
  y: cy + ((a + b) * HH) / 2,
})

const surfPoly = (cy: number, ca: number, cb: number, ha: number, hb: number) => {
  const corners = [
    pt(cy, ca - ha, cb - hb),
    pt(cy, ca + ha, cb - hb),
    pt(cy, ca + ha, cb + hb),
    pt(cy, ca - ha, cb + hb),
  ]
  return corners.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ')
}

const diamond = (cy: number, s: number) =>
  `M ${CX} ${cy - HH * s} L ${CX + HW * s} ${cy} L ${CX} ${cy + HH * s} L ${CX - HW * s} ${cy} Z`

const PLATES = [
  { cy: 88, accent: 'var(--blue)', fill: 'oklch(0.48 0.19 262 / 5%)', label: 'Interfaces & produits', delay: 480, floatDelay: 0 },
  { cy: 170, accent: 'var(--foreground)', fill: 'oklch(0.21 0.03 264 / 4%)', label: 'Cœur métier', delay: 240, floatDelay: 900 },
  { cy: 252, accent: 'var(--red)', fill: 'oklch(0.55 0.22 27 / 5%)', label: 'Infrastructure souveraine', delay: 0, floatDelay: 1800 },
]

/* Top plate: three UI panels. */
const PANELS: [number, number, number, number][] = [
  [-0.38, -0.02, 0.3, 0.4],
  [0.32, -0.3, 0.24, 0.2],
  [0.36, 0.22, 0.24, 0.2],
]

/* Middle plate: a small service graph around a central node. */
const GRAPH_CENTER: [number, number] = [-0.02, -0.02]
const GRAPH_NODES: [number, number][] = [
  [-0.52, 0.12],
  [0.02, -0.48],
  [0.18, 0.42],
  [0.56, -0.08],
]

/* Bottom plate: server blocks, drawn as small isometric cubes. */
const CUBES: [number, number, number][] = [
  [0.34, 0.28, 15],
  [-0.22, 0.46, 13],
  [-0.48, 0.1, 11],
]

function Cube({ cy, ca, cb, h }: { cy: number; ca: number; cb: number; h: number }) {
  const size = 0.15
  const top = pt(cy, ca, cb - size)
  const right = pt(cy, ca + size, cb)
  const bottom = pt(cy, ca, cb + size)
  const left = pt(cy, ca - size, cb)
  const face = (p: { x: number; y: number }[], fill: string) => (
    <polygon
      key={fill}
      points={p.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ')}
      fill={fill}
      stroke="var(--red)"
      strokeOpacity={0.45}
      strokeWidth={0.8}
    />
  )
  const lift = (p: { x: number; y: number }) => ({ x: p.x, y: p.y - h })
  return (
    <g className="iso-detail">
      {face([lift(left), lift(bottom), bottom, left], 'oklch(0.55 0.22 27 / 7%)')}
      {face([lift(bottom), lift(right), right, bottom], 'oklch(0.55 0.22 27 / 13%)')}
      {face([lift(top), lift(right), lift(bottom), lift(left)], 'oklch(0.55 0.22 27 / 4%)')}
    </g>
  )
}

export function StackDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 650 340"
      className={cn('block', className)}
      role="img"
      aria-label="Schéma : interfaces et cœur métier reposant sur une infrastructure souveraine"
    >
      {/* Blueprint corner marks */}
      {(
        [
          [34, 40],
          [616, 40],
          [34, 304],
          [616, 304],
        ] as const
      ).map(([x, y]) => (
        <g key={`${x}-${y}`} className="iso-detail" stroke="var(--border)">
          <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
          <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
        </g>
      ))}

      {/* Dimension line, architect style */}
      <g className="iso-detail" stroke="var(--border)" style={{ '--iso-delay': '1200ms' } as CSSProperties}>
        <line x1={64} y1={PLATES[0].cy} x2={64} y2={PLATES[2].cy} />
        <line x1={58} y1={PLATES[0].cy} x2={70} y2={PLATES[0].cy} />
        <line x1={58} y1={PLATES[1].cy} x2={70} y2={PLATES[1].cy} />
        <line x1={58} y1={PLATES[2].cy} x2={70} y2={PLATES[2].cy} />
      </g>

      {/* Central axis */}
      <line
        x1={CX}
        y1={30}
        x2={CX}
        y2={310}
        stroke="var(--border)"
        strokeDasharray="2 6"
        className="iso-detail"
        style={{ '--iso-delay': '900ms' } as CSSProperties}
      />
      {/* Side rails */}
      {[CX - HW, CX + HW].map((x) => (
        <line
          key={x}
          x1={x}
          y1={PLATES[0].cy}
          x2={x}
          y2={PLATES[2].cy}
          stroke="var(--border)"
          className="iso-detail"
          style={{ '--iso-delay': '1050ms' } as CSSProperties}
        />
      ))}

      {/* Dotted orbit around the core plate */}
      <g className="iso-detail" style={{ '--iso-delay': '1500ms' } as CSSProperties}>
        <ellipse
          cx={CX}
          cy={PLATES[1].cy}
          rx={HW + 28}
          ry={HH + 16}
          fill="none"
          stroke="var(--blue)"
          strokeOpacity={0.4}
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeDasharray="0.5 10"
          className="iso-orbit"
        />
      </g>

      {PLATES.map((plate, pi) => (
        <g
          key={plate.cy}
          className="iso-float"
          style={
            {
              '--iso-delay': `${plate.delay}ms`,
              '--iso-float-delay': `${plate.floatDelay}ms`,
            } as CSSProperties
          }
        >
          {/* Thickness under the two lower edges */}
          <path
            d={`M ${CX - HW} ${plate.cy} L ${CX} ${plate.cy + HH} L ${CX} ${plate.cy + HH + 9} L ${CX - HW} ${plate.cy + 9} Z`}
            fill="oklch(0.21 0.03 264 / 4%)"
            className="iso-detail"
          />
          <path
            d={`M ${CX + HW} ${plate.cy} L ${CX} ${plate.cy + HH} L ${CX} ${plate.cy + HH + 9} L ${CX + HW} ${plate.cy + 9} Z`}
            fill="oklch(0.21 0.03 264 / 6%)"
            className="iso-detail"
          />
          {/* The plate itself, drawing in */}
          <path
            d={diamond(plate.cy, 1)}
            fill={plate.fill}
            stroke={plate.accent}
            strokeWidth={1.1}
            className="iso-plate"
          />

          {/* Surface schematics */}
          {pi === 0 && (
            <g className="iso-detail" style={{ '--iso-delay': '700ms' } as CSSProperties}>
              {PANELS.map(([ca, cb, ha, hb], i) => (
                <polygon
                  key={i}
                  points={surfPoly(plate.cy, ca, cb, ha, hb)}
                  fill="oklch(0.48 0.19 262 / 6%)"
                  stroke="var(--blue)"
                  strokeOpacity={0.5}
                  strokeWidth={0.8}
                />
              ))}
              {/* Content strokes inside the tall panel */}
              {[-0.16, 0.02, 0.2].map((b, i) => {
                const p1 = pt(plate.cy, -0.58, b)
                const p2 = pt(plate.cy, -0.58 + (i === 2 ? 0.24 : 0.4), b)
                return (
                  <line
                    key={b}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="var(--blue)"
                    strokeOpacity={0.45}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                )
              })}
            </g>
          )}
          {pi === 1 && (
            <g className="iso-detail" style={{ '--iso-delay': '820ms' } as CSSProperties}>
              {GRAPH_NODES.map(([a, b], i) => {
                const c = pt(plate.cy, GRAPH_CENTER[0], GRAPH_CENTER[1])
                const n = pt(plate.cy, a, b)
                return (
                  <g key={i}>
                    <line
                      x1={c.x}
                      y1={c.y}
                      x2={n.x}
                      y2={n.y}
                      stroke="var(--foreground)"
                      strokeOpacity={0.22}
                    />
                    <circle cx={n.x} cy={n.y} r={2.2} fill="var(--foreground)" fillOpacity={0.55} />
                  </g>
                )
              })}
              <circle
                cx={pt(plate.cy, GRAPH_CENTER[0], GRAPH_CENTER[1]).x}
                cy={pt(plate.cy, GRAPH_CENTER[0], GRAPH_CENTER[1]).y}
                r={3.4}
                fill="none"
                stroke="var(--foreground)"
                strokeOpacity={0.6}
              />
              <circle
                cx={pt(plate.cy, GRAPH_CENTER[0], GRAPH_CENTER[1]).x}
                cy={pt(plate.cy, GRAPH_CENTER[0], GRAPH_CENTER[1]).y}
                r={1.4}
                fill="var(--foreground)"
              />
            </g>
          )}
          {pi === 2 && (
            <g style={{ '--iso-delay': '940ms' } as CSSProperties}>
              {CUBES.map(([ca, cb, h], i) => (
                <Cube key={i} cy={plate.cy} ca={ca} cb={cb} h={h} />
              ))}
              <path
                d={diamond(plate.cy, 0.62)}
                fill="none"
                stroke="var(--red)"
                strokeOpacity={0.3}
                strokeDasharray="3 5"
                className="iso-detail"
              />
            </g>
          )}

          {/* Corner nodes */}
          {[
            [CX, plate.cy - HH],
            [CX + HW, plate.cy],
            [CX, plate.cy + HH],
            [CX - HW, plate.cy],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={2.4} fill={plate.accent} className="iso-detail" />
          ))}
          <text
            x={CX + HW + 18}
            y={plate.cy + 3.5}
            fill="var(--muted-foreground)"
            fontSize={10}
            letterSpacing="0.12em"
            className="iso-detail font-mono uppercase"
          >
            {plate.label}
          </text>
        </g>
      ))}

      {/* Value rises, control descends */}
      <circle
        cx={CX - HW}
        cy={PLATES[2].cy}
        r={2.4}
        fill="var(--blue)"
        className="iso-pulse iso-pulse-up"
        style={{ '--iso-delay': '1300ms' } as CSSProperties}
      />
      <circle
        cx={CX + HW}
        cy={PLATES[0].cy}
        r={2.4}
        fill="var(--red)"
        className="iso-pulse iso-pulse-down"
        style={{ '--iso-delay': '2400ms' } as CSSProperties}
      />
      <circle
        cx={CX}
        cy={PLATES[0].cy - HH}
        r={2.2}
        fill="var(--blue)"
        className="iso-pulse iso-pulse-axis"
        style={{ '--iso-delay': '3300ms' } as CSSProperties}
      />
      <circle
        cx={CX}
        cy={PLATES[2].cy + HH}
        r={2.2}
        fill="var(--red)"
        className="iso-pulse iso-pulse-axis-up"
        style={{ '--iso-delay': '4600ms' } as CSSProperties}
      />
    </svg>
  )
}
