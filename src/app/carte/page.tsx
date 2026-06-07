"use client"

import dynamic from "next/dynamic"
import { useState } from "react"
import { MapPin, Layers, Filter, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { projects, STATUS_COLORS, ProjectStatus } from "@/lib/dnatu-data"

const GuineaMap = dynamic(() => import("@/components/guinea-map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-100">
      <div className="text-center">
        <div className="h-10 w-10 rounded-full border-4 border-[#0f2c4a] border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Chargement de la carte…</p>
      </div>
    </div>
  ),
})

const ALL_STATUSES: ProjectStatus[] = ["En cours", "En retard", "Planifié", "Terminé", "Suspendu"]

const STATUS_BADGE: Record<ProjectStatus, string> = {
  "En cours":  "bg-blue-50 border-blue-200 text-blue-700",
  "Planifié":  "bg-purple-50 border-purple-200 text-purple-700",
  "En retard": "bg-red-50 border-red-200 text-red-700",
  "Terminé":   "bg-green-50 border-green-200 text-green-700",
  "Suspendu":  "bg-gray-50 border-gray-200 text-gray-700",
}

export default function CartePage() {
  const [activeFilters, setActiveFilters] = useState<Set<ProjectStatus>>(new Set(ALL_STATUSES))

  const toggleFilter = (s: ProjectStatus) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })
  }

  const statusCounts = ALL_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = projects.filter((p) => p.status === s).length
    return acc
  }, {})

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#0f2c4a]" />
              Carte SIG Interactive
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Géolocalisation de {projects.length} projets sur le territoire guinéen
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-500">Cliquez sur un marqueur pour les détails</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Panel */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col overflow-y-auto flex-shrink-0">
          {/* Filters */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-700">Filtrer par statut</h2>
            </div>
            <div className="space-y-2">
              {ALL_STATUSES.map((s) => (
                <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                      activeFilters.has(s) ? "ring-2 ring-offset-1" : "opacity-40"
                    }`}
                    style={{
                      backgroundColor: activeFilters.has(s) ? STATUS_COLORS[s] : "#e2e8f0",
                    }}
                    onClick={() => toggleFilter(s)}
                  >
                    {activeFilters.has(s) && (
                      <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between" onClick={() => toggleFilter(s)}>
                    <span className="text-xs text-slate-700 group-hover:text-slate-900">{s}</span>
                    <span
                      className="text-xs font-bold rounded-full px-1.5"
                      style={{ color: STATUS_COLORS[s] }}
                    >
                      {statusCounts[s] || 0}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Layers */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-700">Couches SIG</h2>
            </div>
            <div className="space-y-2">
              {[
                { label: "Projets DNATU",      active: true  },
                { label: "Délimitations admin.", active: true  },
                { label: "Réseaux routiers",    active: false },
                { label: "Zones foncières",     active: false },
                { label: "Orthophotos",         active: false },
              ].map((layer) => (
                <div key={layer.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm ${layer.active ? "bg-[#0f2c4a]" : "bg-slate-200"}`} />
                  <span className="text-xs text-slate-600">{layer.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project list */}
          <div className="p-4 flex-1">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">Projets ({projects.length})</h2>
            <div className="space-y-2">
              {projects
                .filter((p) => activeFilters.has(p.status))
                .map((p) => (
                  <div
                    key={p.id}
                    className="p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <p className="text-xs font-medium text-slate-800 line-clamp-1">{p.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: STATUS_COLORS[p.status] }}
                      />
                      <span className="text-[10px] text-slate-500">{p.region}</span>
                      <span className="text-[10px] text-slate-400 ml-auto">{p.physicalProgress}%</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <GuineaMap />

          {/* Legend overlay */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 border border-slate-200 z-[1000]">
            <p className="text-xs font-semibold text-slate-700 mb-2">Légende</p>
            <div className="space-y-1.5">
              {ALL_STATUSES.map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: STATUS_COLORS[s] }}
                  />
                  <span className="text-[10px] text-slate-600">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
