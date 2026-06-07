"use client"

import { useState } from "react"
import { projects, STATUS_COLORS } from "@/lib/dnatu-data"
import type { ProjectStatus } from "@/lib/dnatu-data"

type RegionName = "Conakry" | "Boké" | "Kindia" | "Mamou" | "Labé" | "Faranah" | "Kankan" | "Nzérékoré"

const REGION_POS: Record<RegionName, [number, number]> = {
  "Boké":      [102, 75],
  "Conakry":   [52,  195],
  "Kindia":    [135, 172],
  "Mamou":     [178, 172],
  "Labé":      [210, 118],
  "Faranah":   [250, 210],
  "Kankan":    [315, 170],
  "Nzérékoré": [288, 265],
}

const OUTLINE =
  "M65,28 L185,18 L355,58 L402,112 L392,182 L362,252 L298,296 L242,288 L192,282 L158,268 L102,242 L62,202 L30,178 L34,148 L50,108 L65,75 Z"

const ALL_STATUSES: ProjectStatus[] = ["En cours", "En retard", "Terminé", "Planifié", "Suspendu"]

export default function GuineaMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(null)

  const byRegion = Object.fromEntries(
    (Object.keys(REGION_POS) as RegionName[]).map((r) => [
      r,
      projects.filter((p) => p.region === r),
    ])
  )

  const popup = hoveredId ? projects.find((p) => p.id === hoveredId) : null

  return (
    <div className="w-full h-full relative bg-slate-100 overflow-hidden">
      <svg viewBox="0 0 420 310" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <rect width="420" height="310" fill="#dbeafe" />
        <path d={OUTLINE} fill="#f0fdf4" stroke="#64748b" strokeWidth="1.5" />

        {(Object.entries(REGION_POS) as [RegionName, [number, number]][]).map(([region, [cx, cy]]) => {
          const rp = byRegion[region] || []
          const active = selectedRegion === region
          return (
            <g key={region} onClick={() => setSelectedRegion(active ? null : region)} style={{ cursor: "pointer" }}>
              <circle cx={cx} cy={cy} r={active ? 20 : 16}
                fill={active ? "#0f2c4a" : "#1a4a7a"} stroke="white" strokeWidth="2" opacity="0.9" />
              <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fontWeight="bold" fill="white">
                {rp.length}
              </text>
              <text x={cx} y={cy + (active ? 28 : 24)} textAnchor="middle"
                fontSize="7" fill="#1e293b" fontWeight={active ? "bold" : "normal"}>
                {region}
              </text>
              {rp.map((p, i) => {
                const angle = (i / Math.max(rp.length, 1)) * 2 * Math.PI - Math.PI / 2
                const px = cx + 30 * Math.cos(angle)
                const py = cy + 30 * Math.sin(angle)
                return (
                  <circle key={p.id} cx={px} cy={py}
                    r={hoveredId === p.id ? 6 : 5}
                    fill={STATUS_COLORS[p.status as ProjectStatus]}
                    stroke="white" strokeWidth="1.5"
                    onMouseEnter={() => setHoveredId(p.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ cursor: "pointer" }}
                  />
                )
              })}
            </g>
          )
        })}

        {ALL_STATUSES.map((s, i) => (
          <g key={s} transform={`translate(8,${8 + i * 14})`}>
            <circle cx={5} cy={5} r={4} fill={STATUS_COLORS[s as ProjectStatus]} stroke="white" strokeWidth="1" />
            <text x={12} y={9} fontSize="7" fill="#475569">{s}</text>
          </g>
        ))}
      </svg>

      {popup && (
        <div className="absolute top-4 right-4 bg-white border border-slate-200 rounded-lg shadow-lg p-3 w-52 z-10 pointer-events-none">
          <p className="text-xs font-semibold text-slate-800 leading-snug">{popup.name}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{popup.code}</p>
          <hr className="my-1.5" />
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Statut</span>
              <span className="font-semibold" style={{ color: STATUS_COLORS[popup.status as ProjectStatus] }}>
                {popup.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Région</span>
              <span className="font-medium">{popup.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Avancement</span>
              <span className="font-medium">{popup.physicalProgress}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
