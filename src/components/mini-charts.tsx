"use client"

export type BarSeries = { key: string; label: string; color: string }

export function CssGroupedBars({
  data,
  labelKey,
  series,
  formatter = (v) => String(v),
}: {
  data: Record<string, unknown>[]
  labelKey: string
  series: BarSeries[]
  formatter?: (v: number) => string
}) {
  const maxVal = Math.max(1, ...data.flatMap((r) => series.map((s) => Number(r[s.key]) || 0)))
  return (
    <div className="space-y-3 py-1">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mb-1">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
      {data.map((row, i) => (
        <div key={i} className="space-y-0.5">
          <p className="text-xs text-slate-500 font-medium">{String(row[labelKey])}</p>
          {series.map((s) => {
            const val = Number(row[s.key]) || 0
            return (
              <div key={s.key} className="flex items-center gap-2">
                <div className="flex-1 h-3.5 bg-slate-100 rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm" style={{ width: `${(val / maxVal) * 100}%`, background: s.color }} />
                </div>
                <span className="text-xs text-slate-600 w-16 text-right shrink-0">{formatter(val)}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export function SvgDonut({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  if (total === 0) return null
  const R = 52, r = 30, cx = 70, cy = 65
  let angle = -Math.PI / 2
  const arcs = data.map((d) => {
    const sweep = (d.value / total) * 2 * Math.PI
    const large = sweep > Math.PI ? 1 : 0
    const x1 = cx + R * Math.cos(angle), y1 = cy + R * Math.sin(angle)
    const x2 = cx + R * Math.cos(angle + sweep), y2 = cy + R * Math.sin(angle + sweep)
    const ix1 = cx + r * Math.cos(angle + sweep), iy1 = cy + r * Math.sin(angle + sweep)
    const ix2 = cx + r * Math.cos(angle), iy2 = cy + r * Math.sin(angle)
    const path = `M${x1} ${y1}A${R} ${R} 0 ${large} 1 ${x2} ${y2}L${ix1} ${iy1}A${r} ${r} 0 ${large} 0 ${ix2} ${iy2}Z`
    angle += sweep
    return { ...d, path }
  })
  return (
    <svg width="140" height="130" viewBox="0 0 140 130" className="mx-auto">
      {arcs.map((arc, i) => (
        <path key={i} d={arc.path} fill={arc.color} stroke="white" strokeWidth="1" />
      ))}
    </svg>
  )
}

export function SvgAreaLines({
  data,
  xKey,
  series,
  maxY = 100,
}: {
  data: Record<string, unknown>[]
  xKey: string
  series: { key: string; label: string; color: string }[]
  maxY?: number
}) {
  const W = 320, H = 160
  const pad = { t: 8, r: 8, b: 28, l: 32 }
  const w = W - pad.l - pad.r
  const h = H - pad.t - pad.b
  const n = data.length
  const xPos = (i: number) => pad.l + (n < 2 ? w / 2 : (i / (n - 1)) * w)
  const yPos = (v: number) => pad.t + h - Math.min(v / maxY, 1) * h
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={pad.l} y1={yPos(v)} x2={pad.l + w} y2={yPos(v)} stroke="#f0f0f0" />
          <text x={pad.l - 4} y={yPos(v) + 3} textAnchor="end" fontSize="8" fill="#94a3b8">{v}%</text>
        </g>
      ))}
      {series.map((s) => {
        const pts = data.map((d, i) => ({ x: xPos(i), y: yPos(Number(d[s.key]) || 0) }))
        const line = pts.map((p) => `${p.x},${p.y}`).join(" ")
        const area = [...pts.map((p) => `${p.x},${p.y}`), `${pts[pts.length - 1].x},${yPos(0)}`, `${pts[0].x},${yPos(0)}`].join(" ")
        return (
          <g key={s.key}>
            <polygon points={area} fill={s.color} fillOpacity="0.1" />
            <polyline points={line} fill="none" stroke={s.color} strokeWidth="2" />
          </g>
        )
      })}
      {data.map((d, i) => (
        <text key={i} x={xPos(i)} y={H - 6} textAnchor="middle" fontSize="8" fill="#94a3b8">
          {String(d[xKey])}
        </text>
      ))}
      {series.map((s, i) => (
        <g key={s.key} transform={`translate(${pad.l + i * 100}, ${H - 2})`}>
          <line x1="0" y1="-4" x2="12" y2="-4" stroke={s.color} strokeWidth="2" />
          <text x="15" y="-1" fontSize="8" fill="#64748b">{s.label}</text>
        </g>
      ))}
    </svg>
  )
}

export function CssHorizBars({ data }: { data: { label: string; value: number; color: string }[] }) {
  return (
    <div className="space-y-2 py-1">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 truncate w-40 shrink-0">{d.label}</span>
          <div className="flex-1 h-3.5 bg-slate-100 rounded-sm overflow-hidden">
            <div className="h-full rounded-sm" style={{ width: `${Math.min(d.value, 100)}%`, background: d.color }} />
          </div>
          <span className="text-[10px] font-semibold text-slate-700 w-10 text-right shrink-0">{d.value}%</span>
        </div>
      ))}
    </div>
  )
}
