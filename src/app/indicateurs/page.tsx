"use client"

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts"
import { BarChart3, TrendingUp, TrendingDown, Minus, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { kpiIndicators, projects } from "@/lib/dnatu-data"

const CATEGORY_COLORS: Record<string, string> = {
  Performance: "#3b82f6",
  Finance:     "#10b981",
  Territorial: "#8b5cf6",
  Habitat:     "#f59e0b",
  Impact:      "#ef4444",
  Partenariat: "#06b6d4",
}

const TREND_ICON: Record<string, React.ElementType> = {
  up:     TrendingUp,
  down:   TrendingDown,
  stable: Minus,
}

const TREND_COLOR: Record<string, string> = {
  up:     "text-green-600",
  down:   "text-red-600",
  stable: "text-slate-500",
}

function radarData() {
  return kpiIndicators.map((k) => ({
    indicator: k.name.split(" ").slice(0, 3).join(" "),
    actuel:    Math.round((k.current / k.target) * 100),
    cible:     100,
  }))
}

function barData() {
  return kpiIndicators.map((k) => ({
    name:   k.name.length > 30 ? k.name.slice(0, 30) + "…" : k.name,
    actuel: Math.round((k.current / k.target) * 100),
    fill:   CATEGORY_COLORS[k.category] ?? "#94a3b8",
  }))
}

export default function IndicateursPage() {
  const onTrack  = kpiIndicators.filter((k) => (k.current / k.target) * 100 >= 70).length
  const atRisk   = kpiIndicators.filter((k) => (k.current / k.target) * 100 < 50).length
  const warning  = kpiIndicators.filter((k) => {
    const p = (k.current / k.target) * 100
    return p >= 50 && p < 70
  }).length

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[#0f2c4a]" />
          Indicateurs Clés de Performance (KPI)
        </h1>
        <p className="text-sm text-slate-500">Tableau de bord stratégique – Vision nationale DNATU 2026</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Status summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "En bonne voie",  value: onTrack, threshold: "≥70% cible", color: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500" },
            { label: "À surveiller",   value: warning, threshold: "50-70% cible", color: "text-amber-600",  bg: "bg-amber-50",   bar: "bg-amber-500"   },
            { label: "À risque",       value: atRisk,  threshold: "<50% cible",   color: "text-red-600",    bg: "bg-red-50",     bar: "bg-red-500"     },
          ].map((k) => (
            <Card key={k.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`w-2 h-8 rounded-full ${k.bar} mb-3`} />
                <p className={`text-3xl font-bold ${k.color}`}>{k.value}</p>
                <p className="text-xs font-medium text-slate-600">{k.label}</p>
                <p className="text-[10px] text-slate-400">{k.threshold}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Progress bar chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold">Atteinte des Cibles par KPI</CardTitle>
              <CardDescription className="text-xs">% de la cible atteint</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pb-3">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={barData()} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 9 }} width={170} />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Bar dataKey="actuel" name="% Cible atteint" radius={[0, 4, 4, 0]}>
                    {barData().map((entry, i) => (
                      <rect key={i} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radar chart */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold">Radar de Performance Multidimensionnel</CardTitle>
              <CardDescription className="text-xs">Actuel vs cible (100%)</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pb-3">
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 9 }} />
                  <Radar name="Actuel" dataKey="actuel" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                  <Radar name="Cible"  dataKey="cible"  stroke="#10b981" fill="#10b981" fillOpacity={0.08} strokeDasharray="5 5" />
                  <Tooltip formatter={(v) => `${v}%`} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed KPI table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-sm font-semibold">Tableau Détaillé des KPI</CardTitle>
            <CardDescription className="text-xs">Baselines, cibles, valeurs actuelles et tendances</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Indicateur</th>
                    <th className="text-center px-3 py-2.5 text-slate-500 font-medium">Catégorie</th>
                    <th className="text-right px-3 py-2.5 text-slate-500 font-medium">Baseline</th>
                    <th className="text-right px-3 py-2.5 text-slate-500 font-medium">Cible</th>
                    <th className="text-right px-3 py-2.5 text-slate-500 font-medium">Actuel</th>
                    <th className="px-3 py-2.5 text-slate-500 font-medium">Progression</th>
                    <th className="text-center px-3 py-2.5 text-slate-500 font-medium">Tendance</th>
                    <th className="text-center px-3 py-2.5 text-slate-500 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiIndicators.map((kpi) => {
                    const pct = Math.min(Math.round((kpi.current / kpi.target) * 100), 100)
                    const isGood = pct >= 70
                    const isWarn = pct >= 50 && pct < 70
                    const TrendIcon = TREND_ICON[kpi.trend] ?? Minus
                    return (
                      <tr key={kpi.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-800">{kpi.name}</p>
                          <p className="text-slate-400 text-[10px]">{kpi.periodicity}</p>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{
                              backgroundColor: (CATEGORY_COLORS[kpi.category] ?? "#94a3b8") + "20",
                              color: CATEGORY_COLORS[kpi.category] ?? "#94a3b8",
                            }}
                          >
                            {kpi.category}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right text-slate-500">{kpi.baseline} {kpi.unit}</td>
                        <td className="px-3 py-3 text-right font-semibold text-slate-700">{kpi.target} {kpi.unit}</td>
                        <td className="px-3 py-3 text-right font-bold text-slate-900">{kpi.current} {kpi.unit}</td>
                        <td className="px-3 py-3 w-32">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-100 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${isGood ? "bg-emerald-500" : isWarn ? "bg-amber-500" : "bg-red-500"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className={`text-[10px] font-bold w-7 text-right ${isGood ? "text-emerald-600" : isWarn ? "text-amber-600" : "text-red-600"}`}>
                              {pct}%
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <TrendIcon className={`h-4 w-4 mx-auto ${TREND_COLOR[kpi.trend]}`} />
                        </td>
                        <td className="px-3 py-3 text-center">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              isGood ? "bg-green-50 border-green-200 text-green-700" :
                              isWarn ? "bg-amber-50 border-amber-200 text-amber-700" :
                              "bg-red-50 border-red-200 text-red-700"
                            }`}
                          >
                            {isGood ? "✓ Bonne voie" : isWarn ? "! Surveiller" : "✗ À risque"}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
