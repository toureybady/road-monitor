"use client"

import { CssGroupedBars, SvgDonut } from "@/components/mini-charts"
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  projects, getTotalBudget, getTotalDisbursed,
  getAverageFinancialProgress, FinancingSource,
} from "@/lib/dnatu-data"

const SOURCE_COLORS: Record<string, string> = {
  "Budget national":  "#0f2c4a",
  "Banque mondiale":  "#3b82f6",
  "BAD":              "#10b981",
  "PNUD":             "#8b5cf6",
  "Union européenne": "#f59e0b",
  "AFD":              "#ec4899",
  "EXIM Bank Chine":  "#ef4444",
  "BID":              "#06b6d4",
  "FADES":            "#84cc16",
  "BOAD":             "#f97316",
}

function aggregateFinancing() {
  const map: Record<string, number> = {}
  projects.forEach((p) =>
    p.financingSources.forEach((fs) => {
      map[fs.source] = (map[fs.source] || 0) + fs.amount
    })
  )
  return Object.entries(map)
    .map(([source, amount]) => ({ source, amount }))
    .sort((a, b) => b.amount - a.amount)
}

function budgetByRegion() {
  const map: Record<string, { budget: number; disbursed: number }> = {}
  projects.forEach((p) => {
    if (!map[p.region]) map[p.region] = { budget: 0, disbursed: 0 }
    map[p.region].budget   += p.budgetTotal
    map[p.region].disbursed += p.disbursed
  })
  return Object.entries(map).map(([region, d]) => ({
    region,
    budget:    Math.round(d.budget / 1000),
    decaisse:  Math.round(d.disbursed / 1000),
  }))
}

export default function FinancePage() {
  const totalBudget    = getTotalBudget()
  const totalDisbursed = getTotalDisbursed()
  const disbursRate    = Math.round((totalDisbursed / totalBudget) * 100)
  const avgFin         = getAverageFinancialProgress()
  const financingSources = aggregateFinancing()
  const regionalBudget   = budgetByRegion()

  const overdisbursed = projects.filter((p) => p.financialProgress > p.physicalProgress + 10)
  const underdisbursed = projects.filter((p) => p.physicalProgress > p.financialProgress + 10)

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-bold text-slate-900">Module Financier</h1>
        <p className="text-sm text-slate-500">Suivi budgétaire et décaissements – Portefeuille DNATU</p>
      </div>

      <div className="p-5 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Budget Total Engagé",   value: `${(totalBudget / 1e6).toFixed(2)} Mrd`,    sub: "Millions GNF",           icon: DollarSign,   color: "text-blue-600",    bg: "bg-blue-50"    },
            { label: "Total Décaissé",         value: `${(totalDisbursed / 1e6).toFixed(2)} Mrd`, sub: "Millions GNF",           icon: TrendingUp,   color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Taux de Décaissement",   value: `${disbursRate}%`,                          sub: "vs budget total",        icon: CheckCircle2, color: "text-violet-600",  bg: "bg-violet-50"  },
            { label: "Taux Exécution Fin. Moy.", value: `${avgFin}%`,                             sub: "Moyenne tous projets",   icon: TrendingDown, color: "text-amber-600",   bg: "bg-amber-50"   },
          ].map((k) => (
            <Card key={k.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-lg ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`h-5 w-5 ${k.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{k.value}</p>
                <p className="text-xs font-medium text-slate-600 mt-0.5">{k.label}</p>
                <p className="text-xs text-slate-400">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall progress */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-slate-700">Décaissement Global du Portefeuille</p>
              <span className="text-lg font-bold text-slate-900">{disbursRate}%</span>
            </div>
            <Progress value={disbursRate} className="h-4" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>{(totalDisbursed / 1e6).toFixed(1)} Mrd GNF décaissés</span>
              <span>{(totalBudget / 1e6).toFixed(1)} Mrd GNF budget total</span>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Budget by Region */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold">Budget vs Décaissement par Région</CardTitle>
              <CardDescription className="text-xs">En milliards GNF</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pb-3">
              <CssGroupedBars
                data={regionalBudget}
                labelKey="region"
                series={[
                  { key: "budget",   label: "Budget",   color: "#3b82f6" },
                  { key: "decaisse", label: "Décaissé", color: "#10b981" },
                ]}
                formatter={(v) => `${v} Mrd`}
              />
            </CardContent>
          </Card>

          {/* Financing Sources */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-sm font-semibold">Sources de Financement</CardTitle>
              <CardDescription className="text-xs">Répartition par bailleur</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pb-3">
              <SvgDonut
                data={financingSources.map((fs, i) => ({
                  label: fs.source,
                  value: fs.amount,
                  color: SOURCE_COLORS[fs.source] ?? `hsl(${i * 40}, 70%, 50%)`,
                }))}
              />
              <div className="space-y-1.5 mt-2">
                {financingSources.slice(0, 5).map((fs, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: SOURCE_COLORS[fs.source] ?? "#94a3b8" }}
                      />
                      <span className="text-slate-600 truncate">{fs.source}</span>
                    </div>
                    <span className="font-semibold text-slate-800 ml-2">{(fs.amount / 1000).toFixed(0)} Mrd</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Budget Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-sm font-semibold">Tableau Financier des Projets</CardTitle>
            <CardDescription className="text-xs">Budget, décaissements et taux d'exécution financière</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Projet</th>
                    <th className="text-left px-4 py-2.5 text-slate-500 font-medium">Région</th>
                    <th className="text-right px-4 py-2.5 text-slate-500 font-medium">Budget (Mrd)</th>
                    <th className="text-right px-4 py-2.5 text-slate-500 font-medium">Décaissé (Mrd)</th>
                    <th className="text-right px-4 py-2.5 text-slate-500 font-medium">Taux Fin.</th>
                    <th className="px-4 py-2.5 text-slate-500 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {projects
                    .sort((a, b) => b.budgetTotal - a.budgetTotal)
                    .map((p) => {
                      const diff = p.financialProgress - p.physicalProgress
                      return (
                        <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                          <td className="px-4 py-2.5">
                            <p className="font-medium text-slate-800 line-clamp-1">{p.name}</p>
                            <p className="text-slate-400 text-[10px]">{p.code}</p>
                          </td>
                          <td className="px-4 py-2.5 text-slate-600">{p.region}</td>
                          <td className="px-4 py-2.5 text-right font-semibold text-slate-800">
                            {(p.budgetTotal / 1000).toFixed(0)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-semibold text-emerald-700">
                            {(p.disbursed / 1000).toFixed(0)}
                          </td>
                          <td className="px-4 py-2.5 text-right">
                            <span className={`font-bold ${diff > 10 ? "text-red-600" : diff < -10 ? "text-amber-600" : "text-slate-700"}`}>
                              {p.financialProgress}%
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            {diff > 10 ? (
                              <Badge variant="outline" className="text-[10px] bg-red-50 border-red-200 text-red-700 gap-1">
                                <AlertTriangle className="h-2.5 w-2.5" />Surestimé
                              </Badge>
                            ) : diff < -10 ? (
                              <Badge variant="outline" className="text-[10px] bg-amber-50 border-amber-200 text-amber-700">
                                Lent
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] bg-green-50 border-green-200 text-green-700">
                                Normal
                              </Badge>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {(overdisbursed.length > 0 || underdisbursed.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {overdisbursed.length > 0 && (
              <Card className="border-0 shadow-sm border-l-4 border-l-red-500">
                <CardHeader className="pb-2 px-4 pt-3">
                  <CardTitle className="text-sm font-semibold text-red-700 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Décaissement &gt; Avancement Physique
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-3 space-y-2">
                  {overdisbursed.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 line-clamp-1 flex-1 mr-2">{p.name}</span>
                      <span className="text-red-600 font-bold flex-shrink-0">
                        Fin {p.financialProgress}% / Phy {p.physicalProgress}%
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {underdisbursed.length > 0 && (
              <Card className="border-0 shadow-sm border-l-4 border-l-amber-500">
                <CardHeader className="pb-2 px-4 pt-3">
                  <CardTitle className="text-sm font-semibold text-amber-700 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Avancement Physique &gt; Décaissement
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-3 space-y-2">
                  {underdisbursed.map((p) => (
                    <div key={p.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 line-clamp-1 flex-1 mr-2">{p.name}</span>
                      <span className="text-amber-600 font-bold flex-shrink-0">
                        Phy {p.physicalProgress}% / Fin {p.financialProgress}%
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
