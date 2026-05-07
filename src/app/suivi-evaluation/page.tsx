"use client"

import { useState } from "react"
import { ClipboardCheck, Target, TrendingUp, Camera, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { projects, kpiIndicators } from "@/lib/dnatu-data"

const CATEGORY_COLORS: Record<string, string> = {
  Performance: "bg-blue-50 text-blue-700 border-blue-200",
  Finance:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  Territorial: "bg-violet-50 text-violet-700 border-violet-200",
  Habitat:     "bg-amber-50 text-amber-700 border-amber-200",
  Impact:      "bg-rose-50 text-rose-700 border-rose-200",
  Partenariat: "bg-cyan-50 text-cyan-700 border-cyan-200",
}

export default function SuiviEvaluationPage() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const toggle = (id: string) => setExpandedProject((prev) => (prev === id ? null : id))

  const totalIndicators = projects.reduce((s, p) => s + p.indicators.length, 0)
  const onTrack = kpiIndicators.filter((k) => (k.current / k.target) * 100 >= 70).length
  const atRisk  = kpiIndicators.filter((k) => (k.current / k.target) * 100 < 50).length

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-[#0f2c4a]" />
          Suivi-Évaluation Axé sur les Résultats
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Cadre logique, indicateurs SMART et évaluation de l'impact territorial
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Summary KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Projets suivis",        value: String(projects.length),    icon: ClipboardCheck, color: "text-blue-600",    bg: "bg-blue-50"    },
            { label: "Indicateurs actifs",    value: String(totalIndicators),   icon: Target,         color: "text-violet-600",  bg: "bg-violet-50"  },
            { label: "KPI en bonne voie",     value: String(onTrack),           icon: TrendingUp,     color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "KPI à risque",          value: String(atRisk),            icon: Camera,         color: "text-red-600",     bg: "bg-red-50"     },
          ].map((k) => (
            <Card key={k.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-lg ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`h-5 w-5 ${k.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{k.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Global KPIs */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-sm font-semibold">Indicateurs Clés de Performance (KPI) Nationaux</CardTitle>
            <CardDescription className="text-xs">Baselines, cibles et valeurs actuelles</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-4">
            {kpiIndicators.map((kpi) => {
              const pct = Math.min(Math.round((kpi.current / kpi.target) * 100), 100)
              const isGood = pct >= 70
              const isWarn = pct >= 50 && pct < 70
              return (
                <div key={kpi.id} className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-medium text-slate-800">{kpi.name}</p>
                        <Badge variant="outline" className={`text-[10px] ${CATEGORY_COLORS[kpi.category] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
                          {kpi.category}
                        </Badge>
                        <span className="text-[10px] text-slate-400">{kpi.periodicity}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-sm font-bold ${isGood ? "text-emerald-600" : isWarn ? "text-amber-600" : "text-red-600"}`}>
                        {kpi.current} {kpi.unit}
                      </p>
                      <p className="text-[10px] text-slate-400">cible: {kpi.target}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all ${isGood ? "bg-emerald-500" : isWarn ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                      <span>Base: {kpi.baseline}</span>
                      <span className={`font-medium ${isGood ? "text-emerald-600" : isWarn ? "text-amber-600" : "text-red-600"}`}>
                        {pct}% de la cible
                      </span>
                      <span>Cible: {kpi.target} {kpi.unit}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Per-project indicators */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-sm font-semibold">Indicateurs par Projet</CardTitle>
            <CardDescription className="text-xs">Cliquez sur un projet pour voir ses indicateurs et risques</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {projects
              .filter((p) => p.indicators.length > 0)
              .map((p) => {
                const isOpen = expandedProject === p.id
                const avgPct = Math.round(
                  p.indicators.reduce((s, ind) => s + (ind.current / ind.target) * 100, 0) / p.indicators.length
                )
                return (
                  <div key={p.id} className="border border-slate-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggle(p.id)}
                      className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0 text-left">
                        <div
                          className="w-2 h-8 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              p.status === "En retard" ? "#ef4444" :
                              p.status === "Terminé"   ? "#22c55e" :
                              p.status === "Planifié"  ? "#8b5cf6" : "#3b82f6",
                          }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{p.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <MapPin className="h-2.5 w-2.5 text-slate-400" />
                            <span className="text-[10px] text-slate-500">{p.region}</span>
                            <span className="text-[10px] text-slate-400">•</span>
                            <span className="text-[10px] text-slate-500">{p.indicators.length} indicateurs</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <p className={`text-xs font-bold ${avgPct >= 70 ? "text-emerald-600" : avgPct >= 50 ? "text-amber-600" : "text-red-600"}`}>
                            {avgPct}%
                          </p>
                          <p className="text-[10px] text-slate-400">atteinte</p>
                        </div>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 bg-slate-50 p-3 space-y-4">
                        {/* Indicators */}
                        <div>
                          <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            Indicateurs de résultats
                          </p>
                          <div className="space-y-3">
                            {p.indicators.map((ind) => {
                              const pct = Math.min(Math.round((ind.current / ind.target) * 100), 100)
                              return (
                                <div key={ind.id}>
                                  <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-700">{ind.name}</span>
                                    <span className="font-semibold text-slate-800">
                                      {ind.current} / {ind.target} {ind.unit}
                                    </span>
                                  </div>
                                  <Progress value={pct} className="h-2" />
                                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                                    <span>Base: {ind.baseline} {ind.unit}</span>
                                    <span>{pct}% — MàJ: {new Date(ind.lastUpdate).toLocaleDateString("fr-FR")}</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Activities summary */}
                        {p.activities.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-2">Activités</p>
                            <div className="space-y-1.5">
                              {p.activities.map((a) => (
                                <div key={a.id} className="flex items-center gap-2 text-xs">
                                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-400" />
                                  <span className="flex-1 text-slate-700 truncate">{a.name}</span>
                                  <Progress value={a.progress} className="h-1.5 w-20 flex-shrink-0" />
                                  <span className="text-slate-500 font-medium w-8 text-right">{a.progress}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Risks */}
                        {p.risks.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-slate-600 mb-2">Risques identifiés</p>
                            <div className="space-y-2">
                              {p.risks.map((r) => (
                                <div key={r.id} className={`p-2 rounded border text-xs ${
                                  r.status === "Actif"   ? "bg-red-50 border-red-200" :
                                  r.status === "Atténué" ? "bg-amber-50 border-amber-200" :
                                  "bg-green-50 border-green-200"
                                }`}>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className={`text-[9px] ${
                                      r.probability === "Élevé" ? "bg-red-100 text-red-700 border-red-200" :
                                      r.probability === "Moyen" ? "bg-amber-100 text-amber-700 border-amber-200" :
                                      "bg-green-100 text-green-700 border-green-200"
                                    }`}>P: {r.probability}</Badge>
                                    <Badge variant="outline" className={`text-[9px] ${
                                      r.impact === "Élevé" ? "bg-red-100 text-red-700 border-red-200" :
                                      r.impact === "Moyen" ? "bg-amber-100 text-amber-700 border-amber-200" :
                                      "bg-green-100 text-green-700 border-green-200"
                                    }`}>I: {r.impact}</Badge>
                                    <span className={`ml-auto font-medium ${
                                      r.status === "Actif" ? "text-red-700" : r.status === "Atténué" ? "text-amber-700" : "text-green-700"
                                    }`}>{r.status}</span>
                                  </div>
                                  <p className="text-slate-700 font-medium">{r.description}</p>
                                  <p className="text-slate-500 mt-0.5">Mesure: {r.mitigation}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
